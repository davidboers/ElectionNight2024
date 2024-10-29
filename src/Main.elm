module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Html exposing (a, br, Html, div, text, progress, span, table, td, th, tr)
import Html.Attributes exposing (align, colspan, name, rowspan, style)
import Html.Events exposing (onMouseOver, onClick)
import Http exposing (Error(..))
import Json.Decode exposing (Decoder, field, list, int, string, at, dict, fail, float, maybe, succeed)
import List exposing (filter, filterMap, foldl, head, length, map, member, partition, reverse, sortBy, sortWith, sum)
import List.Extra exposing (find, zip)
import Platform.Cmd exposing (batch)
import String exposing (contains, dropRight, left, right, startsWith, replace)
import Svg exposing (g, path, svg)
import Svg.Attributes exposing (d, fill, stroke, strokeWidth, transform, viewBox)
import Time exposing (every)
import Tuple exposing (pair)

import BallotQuestionMeta exposing (BallotQuestionMeta, decodeBallotQuestionMeta, passageExplanation)
import DisplayNumber exposing (displayNumber)
import GeoJson exposing (featureToSvg, GeoJson, geoJsonDecoder)
import Georgia exposing (GeorgiaContest, GeorgiaCounty, GeorgiaSummary, georgiaCounties, georgiaSummaryDecoder)
import ShadePalettes exposing (getPartyShade, getResponseShade)
import Office exposing (Office(..))
import Office exposing (isGeorgia)
import ShadePalettes exposing (getMetaShade)
import Html exposing (li)
import List exposing (sort)
import List.Extra exposing (unique)
import Html exposing (ul)
import ViewBox exposing (ViewBox(..))
import ViewBox exposing (zoomDecoder)
import ViewBox exposing (defaultBViewBox)
import Html exposing (Attribute)
import Contest exposing (..)
import ShadePalettes exposing (partyColor)
import Html.Events exposing (onMouseEnter)
import Html.Events exposing (onMouseLeave)

-- Model
type alias Model =
    { data : Summary
    , office_selected : Office
    , highlight_race : Maybe String 
    , map_data : Maybe Map
    , filter_state : Maybe String
    , bq_meta : Maybe (Dict String BallotQuestionMeta)
    , zoom_coords : Maybe (Dict String ViewBox)
    , county_map_showing : MapShowing
    , state_map_showing : MapShowing
    , county_selected : Maybe County
    , err : Maybe Http.Error
    }

type MapShowing
    = WinnerShare
    | Progress

type alias Map =
    Dict String RaceShape

type alias RaceShape =
    { abvr : String
    , geo : Maybe String
    , block : (Int, Int) 
    }

contestWinner : Contest -> Maybe Candidate
contestWinner c =
    case Maybe.map .isUncontested c.meta of
        Just True ->
            case c.results of
                [x] -> Just x
                _   -> Nothing -- Unreachable

        _ ->
            let
                --winners = filter .winner c.results
                winners = 
                    case head <| reverse <| sortBy .votes c.results of
                        Just a  -> [a]
                        Nothing -> []
            in
            case winners of
                [x] -> Just x
                _   -> Nothing -- No multi-winner elections this year
        
compareContests : Contest -> Contest -> Order
compareContests a b =
    case (a.meta, b.meta) of
        (Nothing, _) -> LT
        (_, Nothing) -> GT
        (Just a_meta, Just b_meta) ->
            let
                compareSpecial = 
                    case (a_meta.isSpecial, b_meta.isSpecial) of
                        (True, False) -> GT
                        (False, True) -> LT
                        _             -> EQ
            in
                case compare a_meta.fips b_meta.fips of
                    LT -> LT
                    GT -> GT
                    EQ ->
                        case ( Maybe.andThen String.toInt <| a_meta.district
                             , Maybe.andThen String.toInt <| b_meta.district
                             ) of
                            (Just district_a, Just district_b) ->
                                case compare district_a district_b of
                                    LT -> LT
                                    GT -> GT
                                    EQ -> compareSpecial
                            _ -> compareSpecial  

fromGeorgia : GeorgiaContest -> Contest 
fromGeorgia gc =
    let
        progress = (toFloat gc.precincts_reporting) / (toFloat gc.total_precincts)
        results = List.map2 fromGeorgiaCandidate gc.candidates gc.votes

        getParty cnd_name = 
            if contains "(Rep)" cnd_name then
                Just "gop"
            else if contains "(Dem)" cnd_name then
                Just "dem"
            else if contains "(Lib)" cnd_name then
                Just "lib"
            else
                Just "oth"

        stripTags : String -> String
        stripTags =
            String.replace "(I)" ""
                >> String.replace "(Rep)" ""
                >> String.replace "(Dem)" ""
                >> String.replace "(Lib)" ""
                >> String.trim

        fromGeorgiaCandidate : String -> Int -> Candidate
        fromGeorgiaCandidate cnd_name votes =
            { votes = votes
            , cnd_id = stripTags cnd_name
            , name = stripTags cnd_name
            , party = getParty cnd_name
            , winner = False
            , isIncumbent = contains "(I)" cnd_name
            }          

        k =
            gc.version -- rename
                |> dropRight 2
                |> String.toInt
                |> Maybe.withDefault 0

        (office, district) =
            if k > 500 && k < 700 then -- State House
                ( StateHouse
                , Just <| String.fromInt <| (k - 500)
                )

            else if k > 400 && k < 500 then -- State Senate
                ( StateSenate
                , Just <| String.fromInt <| (k - 400)
                )

            else if contains "Statewide Referendum Question" gc.name || contains "Proposed Constitutional Amendment" gc.name then -- Ballot Questions
                ( GeorgiaQuestions
                , Nothing
                )

            else
                ( President
                , Nothing
                )

        name =
            gc.version
    in
    { id = name
    , progress = progress
    , timestamp = gc.version
    , evs = Nothing
    , results = results
    , meta = Just
        { office = office
        , fips = "13"
        , district = district
        , isSpecial = False
        , isUncontested = length results == 1
        , isReferendum = Office.isReferendum office
        , holdingParty = "gop" -- Very wrong
        }
    , counties = Nothing
    }

fromGeorgiaCounties : Contest -> GeorgiaCounty -> County
fromGeorgiaCounties c county =
    let
        progress = (toFloat county.precincts_reporting) / (toFloat county.total_precincts)
        results = zip (map .name c.results) county.votes |> Dict.fromList
    in
    { county_fips = "" -- Yeesh. Maybe just remove?
    , progress = progress
    , results = results
    , geo = Nothing
    , name = Just (county.name ++ " County")
    }

sortSummary : Summary -> Summary
sortSummary summary =
    sortWith compareContests summary

skipState : Model -> Contest -> Bool
skipState model c =
    case c.meta of
        Just meta ->
            if member model.office_selected [StateSenate, StateHouse] then
                case model.filter_state of
                    Just fips -> not <| member fips (filterMap .name <| Maybe.withDefault [] c.counties)
                    Nothing   -> False

            else
                case model.filter_state of
                    Just fips -> fips /= meta.fips
                    Nothing   -> False
        Nothing ->
            False -- Really?

                            
-- Main
main : Program () Model Msg
main =
    Browser.document 
        { init = always ( init, fetchResult President )
        , update = update
        , subscriptions = subscriptions
        , view = \model -> 
            { title = "Election Night 2024"
            , body = [ view model ]
            }
        }

init : Model
init =
    { data = []
    , office_selected = President
    , highlight_race = Nothing
    , map_data = Nothing 
    , filter_state = Nothing
    , bq_meta = Nothing
    , zoom_coords = Nothing
    , county_map_showing = WinnerShare
    , state_map_showing = WinnerShare
    , county_selected = Nothing
    , err = Nothing
    }

subscriptions : Model -> Sub Msg
subscriptions _ =
    every (5 * 1000) (always Cycle)

-- Update
type Msg
    = FetchData
    | SelectOffice Office
    | ResultFetched (Result Http.Error Summary)
    | GeorgiaResultFetched (Result Http.Error GeorgiaSummary)
    | MetaFetched (Result Http.Error Meta)
    | MapFetched (Result Http.Error Map)
    | ZoomFetched (Result Http.Error (Dict String ViewBox))
    | CountyFetched String (Result Http.Error (List County))
    | GeorgiaCountyFetched (Result Http.Error (Dict String (List County)))
    | CountyMapFetched String (Result Http.Error GeoJson)
    | BallotQuestionMetaFetched (Result Http.Error (Dict String BallotQuestionMeta))
    | HoverRace String
    | SelectState (Maybe String)
    | CountyMapShowing MapShowing
    | StateMapShowing MapShowing
    | SelectCounty (Maybe County)
    | Cycle

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        FetchData ->
            (model, Cmd.none)

        SelectOffice office ->
            (   { model | office_selected = office 
                        , filter_state = Nothing
                }
            , fetchResult office
            )

        ResultFetched (Ok results) ->
            ({ model | data = results }, fetchMeta model.office_selected )

        GeorgiaResultFetched (Ok results) ->
            ({ model | data = map fromGeorgia results 
                                |> filter (Maybe.withDefault False << Maybe.map (\v -> v.office == model.office_selected) << .meta)
                                -- ^^ Very bad
                     }
            , if member model.office_selected [GeorgiaQuestions]
                then batch [ fetchMap model, fetchBallotQuestionMeta model ]
                else if member model.office_selected [StateSenate, StateHouse]
                    then batch [ fetchMap model, fetchZoom model ]
                    else fetchMap model
            )

        MetaFetched (Ok meta) ->
            ({ model | data = sortSummary <| mergeMetas meta model.data }
            , if member model.office_selected [AbortionQuestions, RCVQuestions, OtherQuestions]
                then batch [ fetchMap model, fetchBallotQuestionMeta model ]
                else if model.office_selected == House
                    then batch [ fetchMap model, fetchZoom model ]
                    else fetchMap model
            )

        MapFetched (Ok map_data) ->
            let
                new_model = { model | map_data = Just map_data }
            in
            ( new_model
            , if model.office_selected == House
                then Cmd.none
                else if isGeorgia model.office_selected 
                    then fetchGeorgiaCounties new_model.data
                    else batch <| map (fetchCounties model) new_model.data
            )

        ZoomFetched (Ok zoom_coords) ->
            ( { model | zoom_coords = Just zoom_coords }
            , Cmd.none
            )

        CountyFetched c_id (Ok counties) ->
            let
                updateContest data = 
                    case data of
                        (x::xs) ->
                            if x.id == c_id
                                then { x | counties = Just counties } :: xs
                                else x :: updateContest xs

                        [] ->
                            []      
                
                fips = find (\v -> v.id == c_id) model.data
                        |> Maybe.andThen .meta
                        |> Maybe.map .fips
                        |> Maybe.withDefault "00"
            in
            ({ model | data = updateContest model.data }, fetchCountyMap fips)

        GeorgiaCountyFetched (Ok counties_set) -> 
            ({ model | data = map (\c -> { c | counties = Dict.get c.id counties_set }) model.data }
            , fetchCountyMap "13"
            )

        CountyMapFetched fips (Ok geojson) ->
            let
                addGeo : County -> County
                addGeo county =
                    let
                        feature = find (\v -> v.code == county.county_fips || Just v.name == county.name) geojson.features
                    in
                    { county 
                        | geo = Maybe.map featureToSvg feature
                        , name = Maybe.map .name feature
                    }

                updateContest data = 
                    case data of
                        (x::xs) ->
                            case x.meta of
                                Just meta ->                            
                                    if meta.fips == fips
                                        then { x | counties = Maybe.map (map addGeo) x.counties } :: updateContest xs
                                        else x :: updateContest xs

                                Nothing ->
                                    updateContest xs

                        [] ->
                            []      
            in
            ({ model | data = updateContest model.data }
            , Cmd.none
            )

        BallotQuestionMetaFetched (Ok bq_meta) ->
            ({ model | bq_meta = Just bq_meta }
            , Cmd.none
            )

        CountyMapFetched c_id (Err (BadBody str)) -> ({ model | err = Just <| BadBody <| str ++ " " ++ c_id }, Cmd.none)

        ResultFetched (Err e)             -> ({ model | err = Just e }, fetchMeta model.office_selected)  -- Really fetchMeta?
        GeorgiaResultFetched (Err e)      -> ({ model | err = Just e }, Cmd.none)
        MetaFetched (Err e)               -> ({ model | err = Just e }, Cmd.none)
        MapFetched (Err e)                -> ({ model | err = Just e }, Cmd.none)
        ZoomFetched (Err e)               -> ({ model | err = Just e }, Cmd.none)
        CountyFetched _ (Err e)           -> ({ model | err = Just e }, Cmd.none)
        GeorgiaCountyFetched (Err e)      -> ({ model | err = Just e }, Cmd.none)
        CountyMapFetched _ (Err e)        -> ({ model | err = Just e }, Cmd.none)
        BallotQuestionMetaFetched (Err e) -> ({ model | err = Just e }, Cmd.none)

        CountyMapShowing new_showing ->
            ( { model | county_map_showing = new_showing }
            , Cmd.none
            )

        StateMapShowing new_showing ->
            ( { model | state_map_showing = new_showing }
            , Cmd.none
            )

        HoverRace c_id -> 
            let
                bringToFront data =
                    case data of
                        (x::xs) ->
                            if x.id == c_id
                                then x :: xs
                                else bringToFront xs ++ [x]
                        
                        _ ->
                            data
            in
            ( 
                { model | highlight_race = Just c_id 
                        , data = bringToFront model.data
                }
            , Cmd.none
            )

        SelectState fips ->
            ( { model | filter_state = fips }
            , Cmd.none
            )

        SelectCounty county_selected ->
            ({ model | county_selected = county_selected }, Cmd.none)

        Cycle ->
            let 
                cycle data =
                    case data of
                        (x::xs) -> xs ++ [x]
                        _ -> data

                excludeFromCycle c =
                    case c.meta of
                        Nothing -> True
                        Just meta -> 
                            skipState model c 
                            || meta.isUncontested
           
                mergeTuple (a, b) =
                    a ++ b
            in
            case model.county_selected of
                Just _ ->
                    (model, Cmd.none)

                Nothing ->
                    ( { model | data = cycle <| mergeTuple <| partition (not << excludeFromCycle) model.data }
                    , Cmd.none
                    )


-- View
view : Model -> Html Msg
view model =
    div [ style "padding" "10px" ]
        [ case model.err of
            Just err -> 
                div [] [ text (errorToString err) ]

            Nothing ->
                case filter (not << skipState model) model.data of
                    (x::_ as summary) ->
                        let
                            fips = Maybe.withDefault "00" <| Maybe.map .fips <| x.meta

                            bViewBox = 
                                if member model.office_selected [StateSenate, StateHouse]
                                    then pickViewBox model <| Maybe.withDefault "" model.filter_state
                                    else pickViewBox model fips
                        in
                        
                        div [ style "font-family" "arial" ]
                            [ div [] 
                                [ nav model
                                , aggr model summary
                                ]
                            , br [] []
                            , br [] []
                            , div
                                [ style "display" "flex" ]
                                [ div [] [ pres model x ] 
                                , div 
                                    [ style "width" "500px" ]
                                    [ displayMapToggleButtons 
                                        (mapAUnit fips)
                                        CountyMapShowing 
                                        model.county_map_showing
                                    , svg 
                                        [ viewBox "0 0 600 400"
                                        ] 
                                        [ countyMap model.county_map_showing x ]
                                    , countyTable model.county_selected
                                    ]
                                , if not (Office.isReferendum model.office_selected)
                                    then div
                                        [ style "display" "flex" 
                                        , style "width" "700px"
                                        ]
                                        [ div []
                                            [ displayMapToggleButtons 
                                                (mapBUnit model)
                                                StateMapShowing 
                                                model.state_map_showing
                                            , svg
                                                [ viewBox <| ViewBox.toString <| bViewBox
                                                , style "width" "500px"
                                                , style "height" "400px"
                                                ] 
                                                [ g [] (map (statePath model) summary) 
                                                ]
                                            ]
                                        , if member model.office_selected [House, StateSenate, StateHouse]
                                            then groupList model
                                            else span [] []
                                        ]
                                        
                                    
                                    else g [] [] 
                                ]
                            ]           

                    _ ->
                        div [] [ text "Sorry, there are no races." ]  
        ]

mapAUnit : String -> String  
mapAUnit state_fips =
    if member state_fips [ "09" -- Connecticut
                         , "23" -- Maine
                         , "25" -- Massachusetts
                         , "33" -- New Hampshire
                         , "44" -- Rhode Island
                         , "50" -- Vermont
                         ] then
        "municipalities"

    else if state_fips == "02" then -- Alaska
        "state"

    else if state_fips == "11" then -- Washington D.C.
        "District"
    
    else if state_fips == "22" then -- Louisiana
        "parishes"

    else
        "counties"

mapBUnit : Model -> String
mapBUnit model =
    if member model.office_selected [House, StateSenate, StateHouse]
        then "districts"
        else "states"

countyTable : Maybe County -> Html Msg
countyTable m_county =
    case m_county of
        Just county ->
            div [ style "position" "absolute" 
                ]
                []

        Nothing ->
            div [ style "opacity" "0" ]
                []

groupListItem :  Maybe String -> String -> Html Msg
groupListItem selected fips =
    let
        selected_style = 
            case selected of
                Just a -> 
                    if a == fips
                        then selectedStyle ++ 
                                [ onClick <| SelectState Nothing
                                , style "border-radius" "6px"
                                ]
                        else [ onClick <| SelectState (Just fips) ]
                Nothing -> [ onClick <| SelectState (Just fips) ]
    in
    li  (
        [ style "cursor" "pointer"
        , style "list-style" "none"
        , style "padding" "3px"
        ] ++ selected_style)
        [ text <| fipsToName fips ]
        

groupList : Model -> Html Msg
groupList model =
    let
        groups =
            if member model.office_selected [StateSenate, StateHouse] then
                Maybe.map Dict.keys model.zoom_coords
                    |> Maybe.withDefault []
                    -- Could we merge these two?
            else
                filterMap .meta model.data
                    |> map .fips
                    |> sort
                    |> unique
    in
    ul
        [ style "height" "400px"
        , style "width" "max-content"
        , style "overflow" "scroll"
        ]
        (map (groupListItem model.filter_state) groups)

pickViewBox : Model -> String -> ViewBox
pickViewBox model fips =
    case (model.filter_state, model.zoom_coords) of
        (Just _, Just zoom_coords) -> 
            case Dict.get fips zoom_coords of
                Just a -> a
                Nothing -> defaultBViewBox
            
        _ -> 
            defaultBViewBox

colorPalette : Candidate -> List Candidate -> (Float -> String) -> String
colorPalette winner results palette_func = 
     let
        total = sum <| map .votes results
        winner_votes = winner.votes
        winner_share = (toFloat winner_votes) / (toFloat total)

        premium = 0.5
        share_a = (winner_share - premium) / (1.0 - premium)

        tie = 
            results
                |> map .votes
                |> filter ((==) winner_votes) 
                |> length
                |> (>) 1
    in
    if total == 0
        then "white"
        else if tie
            then "gold"
            else palette_func share_a

questionColorPalette : List Candidate -> String
questionColorPalette results =
    case sortBy .votes results |> reverse of
        [winner, _] ->
            colorPalette winner results (getResponseShade winner.name)

        _ -> "white"

partyColorPalette : List Candidate -> String
partyColorPalette results =
    case sortBy .votes results |> reverse of
        [] -> "purple"

        [winner] ->
            getPartyShade (Maybe.withDefault "oth" winner.party) 1

        (winner :: _) ->
            colorPalette winner results (getPartyShade (Maybe.withDefault "oth" winner.party))

selectedStyle : List (Attribute msg)
selectedStyle =
    [ style "outline" "1px solid black"
    , style "background-color" "gray"
    , style "color" "white"
    ]

notSelectedStyle : List (Attribute msg)
notSelectedStyle =
    [ style "outline" "1px solid lightgray"
    , style "background-color" "white"
    , style "color" "black"
    ]

toggleButtonStyle : (a -> msg) -> a -> List (Attribute msg)
toggleButtonStyle toggleMsg option =
    [ style "display" "inline" 
    , style "padding" "inherit"
    , style "cursor" "pointer"
    , onClick (toggleMsg option)
    ]

displayMapToggleButtons : String -> (MapShowing -> Msg) -> MapShowing -> Html Msg
displayMapToggleButtons unit_name toggleMsg current =
    let
        extra_style option =
            if current == option 
                then selectedStyle
                else notSelectedStyle

        button_style option =
            let
                (radius_attribute_top, radius_attribute_bottom) =
                    case option of
                        WinnerShare -> ("border-top-left-radius", "border-bottom-left-radius")
                        Progress    -> ("border-top-right-radius", "border-bottom-right-radius")
            in
            (toggleButtonStyle toggleMsg option) ++
                [ style radius_attribute_top "8px"
                , style radius_attribute_bottom "8px"
                ] ++ extra_style option
    in
    div [] 
        [ div 
            [ style "text-align" "center" 
            , style "padding-top" "5px"
            ]
            [ text <| "Shade " ++ unit_name ++ " by:" ]
        , div
            [ style "display" "flex" 
            , style "align-items" "center"
            , style "justify-content" "center"
            , style "padding" "10px"
            ]
            [ div 
                (button_style WinnerShare)
                [ text "Leader's Share" ]
            , div 
                (button_style Progress)
                [ text "% Reporting" ]
            ]
        ]

statePath : Model -> Contest -> Html Msg
statePath model c =
    let
        color =
            case model.state_map_showing of
                WinnerShare ->
                    if isReferendum c
                        then questionColorPalette c.results
                        else partyColorPalette c.results

                Progress ->
                    getMetaShade c.progress

        outline =
            case model.highlight_race of
                Just a -> 
                    if c.id == a
                        then "2px"
                        else "0.5px"
                
                Nothing ->
                    "1px"

    in
        case Maybe.andThen (Dict.get c.id) model.map_data of
            Just map_data -> 
                case map_data.geo of -- Change this to some way of switching between geo and rectangles
                    Just geo ->
                        g [] 
                            [ path
                                [ d geo
                                , fill color
                                , stroke "white"
                                , strokeWidth outline
                                , Svg.Attributes.id c.id 
                                , onMouseOver (HoverRace c.id)
                                ]
                                []
                            ]

                    Nothing ->
                        let
                            (x, y) = map_data.block
                            x1 = x * 50
                            y1 = y * 50
                            translation = "translate(" ++ (String.fromInt x1) ++ ", " ++ (String.fromInt y1) ++ ")"
                            txt = 
                                Svg.text_
                                    [ transform "translate(5, 12.5)"
                                    , Svg.Attributes.fontSize "20px"
                                    ]
                                    [ Svg.text map_data.abvr ]
                        in
                        g [ transform translation ] 
                            [ path
                                [ d "M0,0 L0,50 L50,50 L50,0 Z"
                                , fill color
                                , stroke "lightgray"
                                , strokeWidth outline
                                , Svg.Attributes.id c.id 
                                , onMouseOver (HoverRace c.id)
                                ]
                                []
                            , txt
                            ]

            Nothing ->
                g [] []

countyMap : MapShowing -> Contest -> Html Msg
countyMap map_showing c =
    case c.counties of
        Just counties -> g [] (map (countyPath map_showing c) counties)
        Nothing -> g [] []

countyPath : MapShowing -> Contest -> County -> Html Msg
countyPath map_showing c county =
    case county.geo of
        Just geo -> 
            let
                results = Dict.toList county.results
                            |> filterMap pairToCandidate

                pairToCandidate : (String, Int) -> Maybe Candidate
                pairToCandidate (cnd_id, votes) =
                    find (\cnd -> cnd.cnd_id == cnd_id) c.results
                        |> Maybe.map (\cnd ->
                            { votes = votes
                            , cnd_id = cnd_id
                            , name = cnd.name
                            , party = cnd.party
                            , winner = cnd.winner
                            , isIncumbent = cnd.isIncumbent
                            })

                color =
                    case map_showing of
                        WinnerShare ->
                            if isReferendum c
                                then questionColorPalette results
                                else partyColorPalette results

                        Progress ->
                            getMetaShade county.progress
            in
            path 
                [ d geo
                , fill color
                , stroke "white"
                , strokeWidth "0.5px"
                , Svg.Attributes.id county.county_fips
                , onMouseEnter (SelectCounty (Just county))
                , onMouseLeave (SelectCounty Nothing)
                ] 
                []

        Nothing  -> g [] [ text <| Maybe.withDefault "Not found in geojson file" county.name ]

errorToString : Http.Error -> String
errorToString error =
    case error of
        BadUrl url ->
            "The URL " ++ url ++ " was invalid"
        Timeout ->
            "Unable to reach the server, try again"
        NetworkError ->
            "Unable to reach the server, check your network connection"
        BadStatus 500 ->
            "The server had a problem, try again later"
        BadStatus 400 ->
            "Verify your information and try again"
        BadStatus _ ->
            "Unknown error"
        BadBody errorMessage ->
            errorMessage

-- Fetch Data

fetchResult : Office -> Cmd Msg
fetchResult office =
    if Office.isGeorgia office then
        Http.get
            { url = "https://results.enr.clarityelections.com/GA/115465/314082/json/sum.json"
            , expect = Http.expectJson GeorgiaResultFetched georgiaSummaryDecoder
            } 
    
    else 
        Contest.fetchResult ResultFetched office

fetchMeta : Office -> Cmd Msg
fetchMeta =
    Contest.fetchMeta MetaFetched

fetchMap : Model -> Cmd Msg
fetchMap model =
    Http.get
        { url = "./map.json"
        , expect = Http.expectJson MapFetched (field (Office.toString model.office_selected) mapDecoder)
        }

fetchZoom : Model -> Cmd Msg
fetchZoom model =
    Http.get
        { url = "./zoom.json"
        , expect = Http.expectJson ZoomFetched (field (Office.toString model.office_selected) (dict zoomDecoder))
        }

fetchCounties : Model -> Contest -> Cmd Msg
fetchCounties model c =
    Http.get
        --{ url = "https://www.politico.com/election-data/pebble/results/live/" ++ electionDateForLink ++ "/contests/" ++ c.id ++ "/counties.json"
        { url = "./temp-2024/" ++ Office.toString model.office_selected ++ "/" ++ (replace ":" "_" c.id) ++ "/counties.json"
        , expect = Http.expectJson (CountyFetched c.id) (field "counties" (list countyDecoder))
        }
        {-let
            fips = Maybe.withDefault "00" <| Maybe.map .fips <| c.meta
        in
        Http.get
            { url = "https://www.politico.com/2020-statewide-results/" ++ fips ++ "/potus-counties.json"
            , expect = Http.expectJson (CountyFetched c.id) (field "races" (list countyDecoder))
            }-}

fetchGeorgiaCounties : Summary -> Cmd Msg
fetchGeorgiaCounties summary =
    Http.get
        { url = "https://results.enr.clarityelections.com/GA/115465/314082/json/details.json"
        , expect = Http.expectJson GeorgiaCountyFetched (field "Contests" (decodeGeorgiaDetailedContests summary))
        } 

fetchCountyMap : String -> Cmd Msg
fetchCountyMap fips =
    Http.get
        { url = "./county-maps/state_counties_" ++ fips ++ ".json"
        , expect = Http.expectJson (CountyMapFetched fips) geoJsonDecoder
        }

fetchBallotQuestionMeta : Model -> Cmd Msg
fetchBallotQuestionMeta model =
    Http.get
        { url = "./ballot-questions.json"
        , expect = Http.expectJson BallotQuestionMetaFetched (field (Office.toString model.office_selected) (dict decodeBallotQuestionMeta))
        }


-- JSON Decoder

mapDecoder : Decoder Map
mapDecoder =
    dict raceShape

raceShape : Decoder RaceShape
raceShape =
    Json.Decode.map3 RaceShape
        (field "abvr" string)
        (maybe (field "geo" string))
        (field "block" <| Json.Decode.map2 pair
            (field "x" int)
            (field "y" int))

countyDecoder : Decoder County
countyDecoder =
    let
        candidatePair : Decoder (Dict String Int)
        candidatePair =
            Json.Decode.map2 pair
                (field "id" string)
                (field "votes" int)
                |> list
                |> Json.Decode.map Dict.fromList
    in
    Json.Decode.map5 County
        (field "id" string)
        (at ["progress", "pct"] float)
        (field "results" candidatePair)
        (succeed Nothing)
        (succeed Nothing)
        {-(field "countyFips" string)
        (succeed 100.0)
        (field "candidates" candidatePair)
        (succeed Nothing)
        (succeed Nothing)-}

{- For one contest -}
fromGeorgiaCountiesDecoder : Contest -> Decoder (List County)
fromGeorgiaCountiesDecoder c =
    georgiaCounties
        |> Json.Decode.map (List.map (fromGeorgiaCounties c))

decodeGeorgiaDetailedContest : Summary -> Decoder (Maybe (String, List County))
decodeGeorgiaDetailedContest summary =
    Json.Decode.andThen
        (\k -> maybe
            (case find (\v -> v.id == k) summary of
                Just c ->
                    Json.Decode.map2 pair
                        (succeed k)
                        (fromGeorgiaCountiesDecoder c)

                Nothing ->
                    fail <| "No contest found in summary with the id: " ++ k
            )
        )
        (field "K" string) 
    
decodeGeorgiaDetailedContests : Summary -> Decoder (Dict String (List County))
decodeGeorgiaDetailedContests summary =
    list (decodeGeorgiaDetailedContest summary)
        |> Json.Decode.map (filterMap identity)
        |> Json.Decode.map (Dict.fromList)


-- Displays

displayPct : Int -> Int -> String
displayPct n d = 
    if d == 0 then
        "-"
    else
        (toFloat n) / (toFloat d) * 100
            |> String.fromFloat
            |> left 4

displayPctRnd : Int -> Int -> String
displayPctRnd n d =
    if d == 0 then
        "0%"

    else
        ((toFloat n) / (toFloat d) * 100
            |> round
            |> String.fromInt)
            ++ ("%")

resolveEvs : Contest -> Int
resolveEvs c =
    case c.meta of
        Nothing -> 0
        Just meta ->
            case meta.fips of
                "01" -> 9
                "02" -> 3
                "04" -> 11
                "05" -> 6
                "06" -> 55
                "08" -> 9 --"Colorado"
                "09" -> 7 -- Connecticut
                "10" -> 3 -- Delaware
                "11" -> 3 -- District of Columbia
                "12" -> 29 --"Florida"
                "13" -> 16 -- Georgia
                "15" -> 4
                "16" -> 4
                "17" -> 20 --"Illinois"
                "18" -> 11 --"Indiana"
                "19" -> 6
                "20" -> 6
                "21" -> 8 --"Kentucky"
                "22" -> 8 --"Louisiana"
                "23" -> 4 --"Maine"
                "24" -> 10 --"Maryland"
                "25" -> 11 --"Massachusetts"
                "26" -> 16 --"Michigan"
                "27" -> 10 --"Minnesota"
                "28" -> 6 --"Mississippi"
                "29" -> 10 --"Missouri"
                "30" -> 3 --"Montana"
                "31" -> 5 --"Nebraska"
                "32" -> 6 --"Nevada"
                "33" -> 4 --"New Hampshire"
                "34" -> 14 --"New Jersey"
                "35" -> 3 --"New Mexico"
                "36" -> 29 --"New York"
                "37" -> 15 --"North Carolina"
                "38" -> 3 --"North Dakota"
                "39" -> 18 --"Ohio"
                "40" -> 7 --"Oklahoma"
                "41" -> 7 --"Oregon"
                "42" -> 20 --"Pennsylvania"
                "44" -> 4 --"Rhode Island"
                "45" -> 9 --"South Carolina"
                "46" -> 3 --"South Dakota"
                "47" -> 11 --"Tennessee"
                "48" -> 38 --"Texas"
                "49" -> 6 --"Utah"
                "50" -> 3 --"Vermont"
                "51" -> 13 --"Virginia"
                "53" -> 12 --"Washington"
                "54" -> 5 --"West Virginia"
                "55" -> 10 --"Wisconsin"
                "56" -> 3 --"Wyoming"
                _ -> 0

displayRaceName : Model -> String -> ContestMeta -> Html Msg
displayRaceName model c_id meta =
    let
        state = fipsToName meta.fips

        office2 =
            -- Change from chamber names to officeholder titles?
            case meta.office of
                President -> "President"
                House -> "House"
                Senate -> "Senate"
                Governor -> "Governor"
                StateSenate -> "State Senate"
                StateHouse -> "State House"
                _ -> "Referendum" -- Unreachable

        district = 
            case meta.district of
                Just "00" ->
                    "At-Large"

                Just a ->
                    if startsWith "0" a 
                        then right 1 a
                        else a

                Nothing ->
                    ""

        special =
            if meta.isSpecial
                then " (Special)"
                else ""
    in
    if member meta.office [House, President] then 
        text <|   
            office2 ++ " - " ++ state ++ " " ++ district ++ special
        
    else if member meta.office [StateHouse, StateSenate] then
        text <|   
            office2 ++ " District " ++ district ++ special

    else if meta.isReferendum then
        case Maybe.andThen (Dict.get c_id) model.bq_meta of
            Just bq_meta -> 
                div []
                    [ text <| state ++ " - " ++ bq_meta.short_summary
                    , br [] []
                    , div
                        [ style "font-weight" "normal" 
                        , style "padding" "10px"
                        ]
                        [ text bq_meta.long_summary ]
                    ]

            Nothing -> 
                text state
    
    else
        text <|   
            office2 ++ " - " ++ state ++ special

nav : Model -> Html Msg
nav model =
    div
        []
        [ table
            [ style "left" "2%"
            , style "position" "absolute"
            ]
            [ tr [] 
                [ td 
                    (navStyle ++ [ colspan 2, onClick <| SelectOffice President ])
                    [ text "President" ] 
                , td
                    (navStyle ++ [ colspan 2, onClick <| SelectOffice Governor ])
                    [ text "Governors" ]
                ]
            , tr [] 
                [ td 
                    (navStyle ++ [ onClick <| SelectOffice Senate ])
                    [ text "Senate" ] 
                , td
                    (navStyle ++ [ onClick <| SelectOffice House ])
                    [ text "House" ]
                , td 
                    (navStyle ++ [ onClick <| SelectOffice StateSenate ])
                    [ text "State Senate" ] 
                , td
                    (navStyle ++ [ onClick <| SelectOffice StateHouse ])
                    [ text "State House" ]
                ]
            ]
        , table
            [ style "right" "2%"
            , style "position" "absolute"
            ]
            [ tr [] 
                [ td 
                    (navStyle ++ [ onClick <| SelectOffice GeorgiaQuestions ])
                    [ text "Georgia Referenda" ] 
                , td
                    (navStyle ++ [ onClick <| SelectOffice AbortionQuestions ])
                    [ text "Abortion Referenda" ]
                ]
            , tr [] 
                [ td 
                    (navStyle ++ [ onClick <| SelectOffice RCVQuestions ])
                    [ text "RCV Referenda" ] 
                , td
                    (navStyle ++ [ onClick <| SelectOffice OtherQuestions ])
                    [ text "Other Referenda" ]
                ]
            ]
        ]

navStyle : List (Attribute Msg)
navStyle =
    [ style "padding" "10px"
    , style "text-align" "center"
    , style "cursor" "pointer"
    , style "border" "1px solid black"
    , style "border-radius" "8px"
    , style "width" "10px"
    ]

aggr : Model -> Summary -> Html Msg
aggr model summary =
    let
        dem_color = partyColor "dem"
        oth_color = partyColor "oth"
        und_color = "#ffffff"
        gop_color = partyColor "gop"

        bars dem_seat_shr oth_seat_shr und_seat_shr gop_seat_shr maj =
            div 
                [ style "border" "1px solid black"
                , style "height" "50px" 
                , style "display" "flex"
                ]
                [ div 
                    [ style "width" dem_seat_shr
                    , style "background-color" dem_color
                    , style "height" "inherit" 
                    ] 
                    []
                , div 
                    [ style "width" oth_seat_shr 
                    , style "background-color" oth_color
                    , style "height" "inherit" 
                    ] 
                    []     
                , div 
                    [ style "width" und_seat_shr 
                    , style "background-color" und_color
                    , style "height" "inherit" 
                    ] 
                    []              
                , div 
                    [ style "width" gop_seat_shr
                    , style "background-color" gop_color
                    , style "height" "inherit" 
                    ] 
                    []  
                , div 
                    [ style "display" "block"
                    , style "position" "absolute"
                    , style "left" "50%" 
                    , style "height" "inherit"
                    ]
                    [ div
                        [ style "height" "inherit"
                        , style "border-left" "2px dashed black"
                        ]
                        []
                    , span 
                        [ style "text-align" "center" 
                        , style "display" "block"
                        , style "padding-top" "5px"
                        , style "margin-left" "-80%"
                        , style "height" "normal"
                        ]
                        [ text <| String.fromInt maj ++ " to win" ]
                    ]
                ]    
    in
    case model.office_selected of
        GeorgiaQuestions ->
            br [] [] -- Maybe a row of squares for each question?

        AbortionQuestions ->
            br [] [] -- Decide?

        RCVQuestions ->
            br [] [] -- Decide?

        OtherQuestions ->
            div []
                [ br [] []
                , br [] []
                , br [] []
                , br [] []
                , br [] []
                , br [] []
                ]

        President ->
            let
                isWinner pty c =
                    case contestWinner c of
                        Just a -> 
                            let
                                winner_party = Maybe.withDefault "oth" a.party
                            in
                            pty == winner_party

                        Nothing ->
                            False

                count_evs pty =
                    filter (isWinner pty) summary
                        |> filterMap .evs
                        |> sum

                total_evs = 538

                kamala_evs = count_evs "dem"
                oth_evs = count_evs "oth"
                und_evs = total_evs - kamala_evs - oth_evs - trump_evs
                trump_evs = count_evs "gop"

                kamala_evs_share = displayPctRnd kamala_evs total_evs
                oth_evs_share = displayPctRnd oth_evs total_evs
                und_evs_share = displayPctRnd und_evs total_evs
                trump_evs_share = displayPctRnd trump_evs total_evs

                {-candidate_votes c_id =     Make new Contest for national popular vote?
                    concatMap .results summary 
                        |> filter ((==) c_id << .c_id)
                        |> map .votes
                        |> sum -}
            in
            div [ style "padding-left" "25%" 
                , style "padding-right" "25%" ] 
                [ div [ align "center" ] 
                    [ text <| String.toUpper <| Office.toString model.office_selected ]
                , div
                    [ style "display" "flex" 
                    , style "font-weight" "bold"
                    , style "padding" "5px"
                    ]               
                    [ div
                        [ style "color" dem_color
                        , style "width" "50%"
                        ] 
                        [ text "Kamala Harris" ]
                    , div
                        [ style "text-align" "right"
                        , style "color" gop_color
                        , style "width" "50%"
                        ] 
                        [ text "Donald Trump" ]
                    ]
                , bars kamala_evs_share oth_evs_share und_evs_share trump_evs_share 270 
                ]

        _ ->
            let 
                winners = filterMap contestWinner summary
                total_seats = length <| filter (Maybe.withDefault False << Maybe.map (not << .isSpecial) << .meta) summary

                party_count pty =
                    winners
                        |> map .party
                        |> map (\v ->
                            case v of
                                Just "dem" -> "dem"
                                Just "gop" -> "gop"
                                _          -> "oth"
                            )
                        |> filter ((==) pty)
                        |> length

                net pty c =
                    let
                        a = Maybe.map .holdingParty c.meta
                        b = Maybe.andThen .party <| contestWinner c
                    in
                    case (a, b) of
                        (_, Nothing) -> -- Not called yet
                            0

                        (Just holdingParty, Just winningParty) ->
                            if holdingParty == winningParty
                                then 0
                                else if winningParty == pty
                                    then 1
                                    else -1

                        (Nothing, Just winningParty) ->  -- New seat
                            if winningParty == pty
                                then 1
                                else 0
                            
                pty_chg pty = foldl (\c -> (+) (net pty c)) 0 summary
                dem_chg = pty_chg "dem"
                gop_chg = pty_chg "gop"

                displayPartyChange chg =
                    case compare chg 0 of
                        EQ -> div [] []
                        LT -> div [] [ text <| String.fromInt chg ]
                        GT -> div [] [ text <| "+" ++ String.fromInt chg ]

                dem_seats = party_count "dem"
                oth_seats = party_count "oth"
                und_seats = total_seats - dem_seats - oth_seats - gop_seats -- Undeclared
                gop_seats = party_count "gop"

                dem_seat_shr = displayPctRnd dem_seats total_seats
                oth_seat_shr = displayPctRnd oth_seats total_seats
                und_seat_shr = displayPctRnd und_seats total_seats
                gop_seat_shr = displayPctRnd gop_seats total_seats

                maj = toFloat total_seats / 2
                    |> floor
                    |> (+) 1
            in
            div 
                [ style "padding-left" "25%" 
                , style "padding-right" "25%" 
                ] 
                [ div [ align "center" ] 
                    [ text <| String.toUpper <| Office.toString model.office_selected ]  -- Office name
                , div                                                           -- Party names
                    [ style "display" "flex" 
                    , style "font-weight" "bold"
                    , style "padding" "5px"
                    ]               
                    [ div
                        [ style "color" dem_color
                        , style "width" "50%"
                        ] 
                        [ text "Dem" ]
                    , div
                        [ style "text-align" "right"
                        , style "color" gop_color
                        , style "width" "50%"
                        ] 
                        [ text "GOP" ]
                    ]
                , bars dem_seat_shr oth_seat_shr und_seat_shr gop_seat_shr maj                                                                
                , div                                                       -- Party Seat counts
                    [ style "display" "flex" 
                    , style "font-weight" "bold"
                    , style "padding" "5px"
                    ]         
                    [ div 
                        [ style "color" dem_color
                        , style "width" "50%"
                        ] 
                        [ text <| String.fromInt dem_seats ++ " seats" ]
                    , div 
                        [ style "text-align" "right" 
                        , style "color" gop_color
                        , style "width" "50%"
                        ] 
                        [ text <| String.fromInt gop_seats ]
                    ]
                , div                                                       -- Party Seat changes
                    [ style "display" "flex" 
                    --, style "font-weight" "bold"
                    , style "padding" "5px"
                    ]         
                    [ div 
                        [ style "width" "50%"
                        ] 
                        [ displayPartyChange dem_chg ]
                    , div 
                        [ style "text-align" "right" 
                        , style "width" "50%"
                        ] 
                        [ displayPartyChange gop_chg ]
                    ]
                ]
        

pres : Model -> Contest -> Html Msg
pres model c =
    let 
        winner = contestWinner c
        isWinner cnd =
            case winner of
                Just a ->  cnd == a
                Nothing -> False

        party_color cnd =
            if isReferendum c then
                case cnd.name of
                    "Yes" -> "#008800"
                    "No"  -> "#ff0000"
                    _     -> "#cccccc" -- Puerto Rico?
            
            else
                Maybe.withDefault "na" cnd.party 
                    |> partyColor

        shade_color =
             if isReferendum c then
                case Maybe.map .name winner of
                    Just "Yes" -> "#8bc34a"
                    Just "No"  -> "#ff9090"
                    _          -> "#cccccc"
            
            else
                "gold"

        shade cnd =
            if isWinner cnd
                then [ style "background-color" shade_color ]
                else []

        bq_meta = 
            model.bq_meta 
                |> Maybe.andThen (Dict.get c.id)

        displayName : Candidate -> Html Msg
        displayName cnd =
            if isReferendum c
                then let
                        tag_maybe = 
                            bq_meta 
                                |> Maybe.andThen 
                                    (case cnd.name of
                                        "Yes" -> .yes_tag
                                        "No"  -> .no_tag
                                        _     -> always Nothing
                                    )
                    in
                    case tag_maybe of
                        Just tag -> span []
                                        [ text cnd.name
                                        , span 
                                            [ style "font-size" "15px" 
                                            , style "padding-left" "5px"
                                            ]
                                            [ text tag ]
                                        ]
                        _        -> text cnd.name
                

                else if cnd.isIncumbent
                        then text <| cnd.name ++ "*"
                        else text <| cnd.name
            
        racename = Maybe.map (displayRaceName model c.id) c.meta
            |> Maybe.withDefault (text c.id)

        raceHeader =
            tr []
                [ th [ colspan 10 ] 
                     [ racename ] 
                ]
                
        bordered = 
            [ style "border-bottom-width" "thin"
            , style "border-bottom-color" "black"
            , style "border-bottom-style" "solid"
            , style "padding" "10px"
            ]

        header = 
            if isReferendum c then
                tr []
                    [ th (style "width" "7px"  :: bordered) []
                    , th (style "width" "200px" :: bordered) [ text "Response" ]
                    , th (style "width" "85px" :: bordered) [ text "Votes" ]
                    , th (style "width" "20px" :: bordered) [ text "Share" ]
                    ]

            else
                tr []
                    [ th (style "width" "7px"  :: bordered) []
                    , th (style "width" "200px" :: bordered) [ text "Candidate" ]
                    , th (style "width" "20px" :: bordered) [ text "Party" ]
                    , th (style "width" "85px" :: bordered) [ text "Votes" ]
                    , th (style "width" "20px" :: bordered) [ text "Share" ]
                    ]

        row cnd =
            tr (shade cnd) <| 
                [ td 
                    ( style "background-color" (party_color cnd) :: bordered)
                    [] 

                , td bordered                     [ displayName cnd ]

                , if isReferendum c
                    then text ""
                    else td (align "center" :: bordered) [ text <| left 3 <| Maybe.withDefault "na" cnd.party ]

                , td (align "right" :: bordered)  [ text <| displayNumber cnd.votes ]

                , td (align "right" :: bordered)  [ text <| displayPct cnd.votes total_v ]
                ] 

        footer_left =
            if model.office_selected == President then
                th [ colspan 2, rowspan 3 ] 
                    [ text 
                        (case c.evs of
                            Just 1 -> "1 EV"
                            Just a -> String.fromInt a ++ " EVs"
                            Nothing -> String.fromInt <| resolveEvs c
                        )
                    ]

            else if Office.isReferendum model.office_selected then
                th [ rowspan 3 ] []

            else 
                th [ colspan 2, rowspan 3 ] []

        footers =
            [ tr []
                [ footer_left
                , th [] [ text "Total" ]
                , th [] [ text <| displayNumber total_v ]
                ]
            , tr [ style "display" <| if length sorted == 1 then "none" else "default" ]
                [ th [] [ text "Margin" ]
                , th [] [ text <| displayNumber margin ]
                , th [] [ text <| displayPct margin total_v ]
                ]
            , tr []
                [ th [] [ text "Progress" ]
                , th [] [ text <| (String.fromInt <| round <| c.progress * 100) ++ "%" ]
                ]
            ] ++
            ( if isReferendum c then
                [ tr []
                    [ td 
                        [ colspan 10 
                        --, style "text-align" "center"
                        , style "padding" "10px"
                        , style "font-size" "15px"
                        ]
                        [ Html.map never <| Maybe.withDefault (text "No BQ meta") <| Maybe.map passageExplanation bq_meta
                        ]
                    ]
                ]

            else
                []
            )

        total_v = sum <| map .votes c.results

        margin =
            case sorted of
                (w :: s :: _) -> w.votes - s.votes
                _ -> 0
            
        sorted = List.reverse <| sortBy .votes c.results
    in
    table [ style "border-collapse" "collapse" ]
        ([raceHeader, header] ++ (map row sorted) ++ footers)
