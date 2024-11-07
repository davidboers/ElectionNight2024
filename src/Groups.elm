module Groups exposing (..)

import Contest exposing (Summary)
import Contest exposing (fipsToName, Candidate, County)
import List exposing (filter, member, concatMap, map, sum, map2)
import Html exposing (div, Html, text, table, tr, td, th, span, br)
import Html.Attributes exposing (style)
import Analysis exposing (loading)
import Analysis exposing (Msg)
import Http
import Browser
import ShadePalettes exposing (partyColor)
import ShadePalettes exposing (getPartyShade)
import Contest exposing (fetchResult)
import Office exposing (Office(..))
import Json.Decode exposing (list, field, string, Decoder)
import Html.Attributes exposing (rowspan)
import Html.Attributes exposing (colspan)
import List exposing (length)
import List.Extra exposing (find)
import Main exposing (fetchCounties)
import Contest exposing (Contest)
import Main exposing (countyDecoder)
import Contest exposing (Meta)
import Main exposing (sortSummary)
import Contest exposing (mergeMetas)
import Contest exposing (fetchMeta)
import List exposing (filterMap)
import List exposing (concat)
import Dict
import Contest exposing (fetchPreviousResults)
import Main exposing (insertHistResults)


-- Groups

type alias Axis =
    { name : String
    , groups : List Group
    }

type alias Group =
    { name : String
    , units : List String
    }

fetchAxies : Cmd Msg
fetchAxies =
    Http.get
        { url = "./state-agg.json"
        , expect = Http.expectJson AxiesFetched (list decodeAxis)
        } 

decodeAxis : Decoder Axis
decodeAxis =
    Json.Decode.map2 Axis
        (field "name" string)
        (field "groups" (list decodeGroup))

decodeGroup : Decoder Group
decodeGroup =
    Json.Decode.map2 Group
        (field "name" string)
        (field "states" (list string))

fetchCounties : Contest -> Cmd Msg
fetchCounties c =
    Http.get
        { url = "https://www.politico.com/election-data/results__2024-11-05__contests__" ++ c.id ++ "__counties/data.json"
        --{ url = "./temp-2024/" ++ Office.toString model.office_selected ++ "/" ++ (replace ":" "_" c.id) ++ "/counties.json"
        , expect = Http.expectJson (CountyFetched c.id) (field "counties" (list countyDecoder))
        }

-- Tally

type alias Tally =
    { harris : (Int, Int)
    , trump : (Int, Int)
    , kennedy : (Int, Int)
    , stein : (Int, Int)
    , oliver : (Int, Int)
    , west : (Int, Int)
    , other : (Int, Int)
    }

harrisID = "64984"
trumpID = "8639"
kennedyID = "71841"
steinID = "895"
oliverID = "69459"
westID = "71845"

ids = [harrisID, trumpID, kennedyID, steinID, oliverID, westID]
tally_funcs = [.harris, .trump, .kennedy, .stein, .oliver, .west, .other]
parties = ["dem", "gop", "ind", "grn", "lib", "ind", "oth"]

tallyTotalHelper :  ((Int, Int) -> Int) -> Tally -> Int
tallyTotalHelper tplfunc t =
    map (\func -> func t) tally_funcs
        |> map tplfunc
        |> sum

tallyTotalNow : Tally -> Int
tallyTotalNow =
    tallyTotalHelper Tuple.first

tallyTotalLast : Tally -> Int
tallyTotalLast =
    tallyTotalHelper Tuple.second

cndShare : Tally -> (Tally -> (Int, Int)) -> (Float, Float)
cndShare t cmd =
    let
        (now, last) = cmd t
        (total_now, total_last) = (tallyTotalNow t, tallyTotalLast t)

        shr_now = toFloat now / toFloat total_now
        last_shr = toFloat last / toFloat total_last
    in
    ( shr_now
    , shr_now - last_shr
    )

tally : Summary -> Maybe Group -> Tally
tally summary filter_group =
    let
        filtered_contests = 
            case filter_group of
                Just group ->
                    filter (\c -> member (fipsToName <| Maybe.withDefault "00" <| Maybe.map .fips c.meta) group.units) summary

                Nothing ->
                    summary

        allresults = concatMap .results filtered_contests

        filterCandidates : String -> List Candidate
        filterCandidates cnd_id =
            filter (\cnd -> cnd.cnd_id == cnd_id) allresults

        tallyCandidate : String -> Int
        tallyCandidate cnd_id =
            sum <| map .votes <| filterCandidates cnd_id

        counties : List County
        counties =
            filterMap .counties filtered_contests
                |> concat

        tallyCandidateLast : String -> Int
        tallyCandidateLast cnd_id =
            counties
                |> filterMap (Dict.get cnd_id << .swing_from)
                |> sum

        tallyOthers =
            sum <| map .votes <| filter (\cnd -> not <| member cnd.cnd_id ids) allresults 

        tallyOthersLast : Int
        tallyOthersLast =
            counties
                |> concatMap (Dict.toList << .swing_from)
                |> filter (\(cnd_id, _) -> not <| member cnd_id ids)
                |> map Tuple.second
                |> sum
    in
    { harris  = (tallyCandidate harrisID, tallyCandidateLast harrisID)
    , trump   = (tallyCandidate trumpID, tallyCandidateLast trumpID)
    , kennedy = (tallyCandidate kennedyID, tallyCandidateLast kennedyID)
    , stein   = (tallyCandidate steinID, tallyCandidateLast steinID)
    , oliver  = (tallyCandidate oliverID, tallyCandidateLast oliverID)
    , west    = (tallyCandidate westID, tallyCandidateLast westID)
    , other   = (tallyOthers, tallyOthersLast)
    }   

-- Model

type alias Model =
    { axies : List Axis
    , summary : Summary
    , err : Maybe Http.Error
    }

type Msg
    = ResultFetched (Result Http.Error Summary)
    | MetaFetched (Result Http.Error Meta)
    | CountyFetched String (Result Http.Error (List County))
    | PreviousFetched (Result Http.Error String)
    | AxiesFetched (Result Http.Error (List Axis))


-- View

view : Model -> Html Msg
view model =
    case (model.axies, model.summary, model.err) of
        (_, _, Just (Http.BadBody msg)) -> text msg
        (_, _, Just _) -> text "Error"

        ([], _ , _) -> loading
        (_ , [], _) -> loading

        (axies, summary, Nothing) ->
            div [ style "font-family" "arial" ]
                [ table 
                    [ style "border-collapse" "collapse" 
                    ]
                    (candidateHeaders summary ++
                     (concatMap (displayAxis summary) axies))
                ]

candidateHeaders : Summary -> List (Html Msg)
candidateHeaders summary =
    let
        top_style = [ style "width" "100px" ]
        color_style = [ style "height" "5px" ]
    in
    [ tr []
        [ th [ rowspan 2 ] []
        , th top_style [ text "Harris" ]
        , th top_style [ text "Trump" ]
        , th top_style [ text "Kennedy" ]
        , th top_style [ text "Stein" ]
        , th top_style [ text "Oliver" ]
        , th top_style [ text "West" ]
        , th top_style [ text "Other" ]
        ]
    , tr []
        ( map 
            (\pty -> th (( style "background-color" (partyColor pty) ) :: color_style) [])
            parties
        )
    , displayGroup summary Nothing
    ]

displayAxis : Summary -> Axis -> List (Html Msg)
displayAxis summary axis =
    ( tr
        []
        [ th [] [] 
        , th 
            [ colspan (length parties) 
            , style "border" "1px solid gray"
            ] 
            [ text axis.name ]
        ]
    ) :: (map (displayGroup summary) <| map Just axis.groups)

displayGroup : Summary -> Maybe Group -> Html Msg
displayGroup summary group =
    let
        name =
            case group of
                Just a -> a.name
                Nothing -> "NPV"
    in
    tr []
        ((th [] [ text name ]) ::
         map2 shareCell
            (map (cndShare (tally summary group)) tally_funcs)
            parties
        )

shareCell : (Float, Float) -> String -> Html Msg
shareCell (now, chg) pty =
    td
        [ if member pty ["dem", "gop"]
            then style "background-color" (getPartyShade pty now)
            else style "background-color" "white"
        , style "text-align" "center"
        , style "border" "1px solid gray"
        ]
        [ text (displayPct now)
        , br [] []
        , span 
            [ style "font-size" "12px" ] 
            [ if chg >= 0 
                then text <| "+" ++ (displayPct chg) 
                else text (displayPct chg) 
            ]
        ]

displayPct : Float -> String
displayPct flt =
    (toFloat <| round (flt * 1000)) / 10
        |> String.fromFloat

loading : Html Msg
loading =
    div [ style "font-family" "arial" ]
        [ text "Loading..." ]


-- Main

main : Program () Model Msg
main =
    Browser.document 
        { init = init
        , update = update
        , subscriptions = always Sub.none
        , view = \model -> 
            { title = "Groups of states"
            , body = [ view model ]
            }
        }

init : () -> (Model, Cmd Msg)
init _ =
    (Model [] [] Nothing, Cmd.batch [ fetchResult ResultFetched President, fetchAxies ])

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        ResultFetched (Ok summary) ->
            ({ model | summary = summary }, fetchMeta MetaFetched President)

        ResultFetched (Err e) ->
            ({ model | err = Just e }, Cmd.none)

        MetaFetched (Ok meta) ->
            let
                summary = sortSummary <| mergeMetas meta model.summary
            in
            ({ model | summary = summary }
            , Cmd.batch ((fetchPreviousResults PreviousFetched) :: map fetchCounties summary)
            )

        MetaFetched (Err e) ->
            ({ model | err = Just e }, Cmd.none)

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
            in
            ({ model | summary = updateContest model.summary }, Cmd.none)

        CountyFetched _ (Err e) ->
            ({ model | err = Just e }, Cmd.none)

        PreviousFetched (Ok txt) ->
            ({ model | summary = insertHistResults model.summary President txt }, Cmd.none)

        PreviousFetched (Err e) ->
            ({ model | err = Just e }, Cmd.none)

        AxiesFetched (Ok axies) ->
            ({ model | axies = axies }, Cmd.none)

        AxiesFetched (Err e) ->
            ({ model | err = Just e }, Cmd.none)