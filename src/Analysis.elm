module Analysis exposing (..)

{- Things I want to be able to analyize

* In each state, compare the results for both parties across Presidential, Senatorial, Gubernatorial, and US House races, as well as any abortion referenda.
* In each state and nationwide, compare the historical popular vote results for each party for President.
* Turnout?

-}

import Array exposing (Array)
import Browser
import Contest exposing (Candidate, Contest, fetchMeta, fetchResult, Meta, mergeMetas, Summary)
import Dict exposing (Dict)
import DisplayNumber exposing (displayNumber)
import Html exposing (Attribute, br, h2, Html, div, text)
import Html.Attributes exposing (style)
import Http
import Json.Decode exposing (Decoder, dict, array, string, field, float)
import List exposing (concat, concatMap, drop, filter, filterMap, head, length, map, map2, partition, range, sum)
import List.Extra exposing (find, greedyGroupsOf)
import Main
import Office exposing (Office(..))
import Platform.Cmd exposing (batch)
import ShadePalettes exposing (partyColor)
import String exposing (left, split)
import Svg exposing (circle, line, svg, Svg, text_)
import Svg.Attributes exposing (cx, cy, fill, r, stroke, strokeWidth, x, x1, x2, y, y1, y2)


-- Model

type alias Model =
    { party : Party
    , state : String
    , analysis : Analysis
    , pres : List Contest
    , senate : List Contest
    , house : List Contest
    , gov : List Contest
    , abortion : List Contest
    , hist_pres : Maybe HistPres
    , err : Maybe Http.Error
    }

type Analysis
    = StateComparison
    | Presidential


-- Msg

type Msg
    = ToggleAnalysis
    | SelectParty Party
    | SelectState String
    | ResultFetched Office (Result Http.Error Summary)
    | MetaFetched Office (Result Http.Error Meta)
    | HistFetched (Result Http.Error HistPres)


-- Party

type Party
    = Democratic
    | Republican

partyToString : Party -> String
partyToString party =
    case party of
        Democratic -> "dem"
        Republican -> "gop"

isParty : Party -> Candidate -> Bool
isParty party j =
    case (party, j.party) of
        (Democratic, Just "dem") -> True
        (Republican, Just "gop") -> True
        _                        -> False


-- Historical presidential results

type alias HistPres =
    { nominees : Dict String (Array String)
    , state_results : Dict String (Dict String (Array Float))
    }


-- Main

main : Program () Model Msg
main =
    Browser.document 
        { init = init
        , update = update
        , subscriptions = always Sub.none
        , view = \model -> 
            { title = "Election Night 2024 - Analysis"
            , body = [ view model ]
            }
        }

init : () -> (Model, Cmd Msg)
init _ =
    ( Model Democratic "11" Presidential [] [] [] [] [] Nothing Nothing
    , batch 
        [ fetchResult (ResultFetched President) President 
        , fetchResult (ResultFetched Senate) Senate
        , fetchResult (ResultFetched House) House 
        , fetchResult (ResultFetched Governor) Governor
        , fetchResult (ResultFetched AbortionQuestions) AbortionQuestions
        , fetchHistPres
        ]
    )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        ToggleAnalysis ->
            (model, Cmd.none)

        SelectParty party ->
            ({ model | party = party }, Cmd.none)

        SelectState state ->
            ({ model | state = state }, Cmd.none)

        ResultFetched President (Ok summary)         -> ({ model | pres = summary }    , fetchMeta (MetaFetched President) President)
        ResultFetched Senate (Ok summary)            -> ({ model | senate = summary }  , fetchMeta (MetaFetched Senate) Senate)
        ResultFetched House (Ok summary)             -> ({ model | house = summary }   , fetchMeta (MetaFetched House) House)
        ResultFetched Governor (Ok summary)          -> ({ model | gov = summary }     , fetchMeta (MetaFetched Governor) Governor)
        ResultFetched AbortionQuestions (Ok summary) -> ({ model | abortion = summary }, fetchMeta (MetaFetched AbortionQuestions) AbortionQuestions)

        ResultFetched _ (Ok _) -> -- Unreachable
            (model, Cmd.none)

        ResultFetched _ (Err e) ->
            ({ model | err = Just e }, Cmd.none)

        MetaFetched President (Ok meta)         -> ({ model | pres = mergeMetas meta model.pres }, Cmd.none)
        MetaFetched Senate    (Ok meta)         -> ({ model | senate = mergeMetas meta model.senate }, Cmd.none)
        MetaFetched House     (Ok meta)         -> ({ model | house = mergeMetas meta model.house }, Cmd.none)
        MetaFetched Governor  (Ok meta)         -> ({ model | gov = mergeMetas meta model.gov }, Cmd.none)
        MetaFetched AbortionQuestions (Ok meta) -> ({ model | abortion = mergeMetas meta model.abortion }, Cmd.none)

        MetaFetched _ (Ok _) -> -- Unreachable
            (model, Cmd.none)

        MetaFetched _ (Err e) ->
            ({ model | err = Just e }, Cmd.none)

        HistFetched (Ok hist) ->
            ({ model | hist_pres = Just hist }, Cmd.none)

        HistFetched (Err e) ->
            ({ model | err = Just e }, Cmd.none)

fetchHistPres : Cmd Msg
fetchHistPres =
    Http.get
        { url = "./hist-pres.json"
        , expect = Http.expectJson HistFetched decodePresidential
        }


-- View

view : Model -> Html Msg
view model =
    div
        [ style "width" "1500px" 
        , style "font-family" "arial"
        ]
        [ h2 [ style "text-align" "center" ] 
            [ text <| Contest.fipsToName model.state ]
        , div
            [ style "display" "flex" 
            , style "align-items" "center"
            , style "justify-content" "center"
            , style "padding" "10px"
            ]
            [ div 
                (toggleButtonStyle model.party Democratic)
                [ text "DEM" ]
            , div 
                (toggleButtonStyle model.party Republican)
                [ text "GOP" ]
            ]
        , 
        case model.analysis of
            StateComparison -> stateComparison model
            Presidential    -> presidential model
        ]
    


-- State Comparison

stateComparison : Model -> Html Msg
stateComparison model =
    case (model.pres, model.senate, (model.house, model.gov, model.abortion)) of
        ([], _ , (_ , _ , _ )) -> loading
        (_ , [], (_ , _ , _ )) -> loading
        (_ , _ , ([], _ , _ )) -> loading
        (_ , _ , (_ , [], _ )) -> loading
        (_ , _ , (_ , _ , [])) -> loading

        (pres, senate, (house, gov, abortion)) ->
            [pres, senate, house, gov, abortion]
                |> concat
                |> filter (isState model)
                |> mergeHouseContests
                |> compareState model

mergeHouseContests : Summary -> Summary
mergeHouseContests summary =
    let
        (house, non_house) = summary
            |> partition (\c -> Maybe.withDefault False <| Maybe.map ((==) House) <| Maybe.map .office c.meta)

        results = concatMap .results house
    in
    { id = "house"
    , progress = 0
    , timestamp = ""
    , evs = Nothing
    , results = results
    , meta = Just
        { office = House
        , fips = ""
        , district = Nothing
        , isSpecial = False
        , isUncontested = length results == 1
        , isReferendum = False
        , holdingParty = ""
        }
    , counties = Nothing
    }
    :: non_house

selectedStyle : Party -> List (Attribute msg)
selectedStyle party =
    [ style "outline" "1px solid black"
    , style "background-color" (partyColor party)
    , style "color" "white"
    ]

notSelectedStyle : Party -> List (Attribute msg)
notSelectedStyle _ =
    [ style "outline" "1px solid lightgray"
    , style "background-color" "white"
    , style "color" "black"
    ]

toggleButtonStyle : Party -> Party -> List (Attribute Msg)
toggleButtonStyle current option = 
    let
        extra_style =
            if current == option 
                then selectedStyle option
                else notSelectedStyle option
    in
    (Main.toggleButtonStyle SelectParty option)
        ++ extra_style

compareState : Model -> List Contest -> Html Msg
compareState model contests =
    div [] (map (displayBar model) contests)

displayBar : Model -> Contest -> Html Msg  
displayBar model c =
    case c.meta of
        Just meta ->
            let
                office =
                    Office.toString meta.office

                barHeight = 50
                spacing = 10

                candidates =
                    filter (isParty model.party) c.results

                total : Float
                total = 
                    map .votes c.results
                        |> sum
                        |> toFloat

                votes : Float
                votes =
                    candidates
                        |> map .votes
                        |> sum
                        |> toFloat

                share =
                    votes / total * 100
                        |> round

                rowStyle =
                    [ style "padding" (String.fromInt spacing ++ "px")
                    , style "display" "flex"
                    , style "width" "inherit"
                    , style "height" (String.fromInt barHeight ++ "px")
                    , style "border-right" "2px solid black"
                    ]

                leftStyle =
                    [ style "width" "150px" 
                    , style "text-align" "center"
                    , style "border-right" "2px solid black"
                    ] 
            in
            case candidates of
                [] -> 
                    div rowStyle
                        [ div 
                            leftStyle
                            [ text office ]
                        , div
                            [ style "text-wieght" "italics" ] 
                            [ text "Did not contest" ]
                        ]
                        
                cnds ->
                    let
                        cnd_name =
                            case cnds of
                                [cnd] -> cnd.name
                                _     -> String.fromInt (length cnds) ++ " candidates"
                    in
                    div rowStyle
                        [ div leftStyle
                            [ text office 
                            , br [] []
                            , text cnd_name
                            ]
                        , div
                            [ style "width" (String.fromInt share ++ "%")
                            , style "height" (String.fromInt barHeight ++ "px")
                            , style "background-color" (partyColor model.party)
                            ]
                            []
                        , div
                            [ style "padding-left" "3px"
                            , style "padding-top" "10px"
                            ]
                            [ text <| displayNumber (round votes)
                            , br [] []
                            , text <| String.fromInt share ++ "%" 
                            ]
                        ]

        Nothing ->
            div []
                [ text <| "No meta: " ++ c.id
                , br [] []
                ]
    

-- Presidential

electionYears : Array String
electionYears =
    range 1976 2024
      |> greedyGroupsOf 4
      |> filterMap head
      |> map String.fromInt
      |> Array.fromList

numElections : Int
numElections =
    Array.length electionYears

decodePresidential : Decoder HistPres
decodePresidential =
    Json.Decode.map2 HistPres
        (field "nominees" (dict (array string)))
        (field "state-results" (dict (dict (array float))))

presidential : Model -> Html Msg
presidential model =
    case (model.pres, model.hist_pres) of
        ([], _) -> loading
        (_, Nothing) -> loading

        (pres, Just hist_pres) -> 
            case find (isState model) pres of
                Just pres_state -> 
                    div [ style "padding" "30px" ]
                        [ div 
                            [ style "height" "550px" 
                            , style "width" "inherit"
                            , style "border-bottom" "2px solid black"
                            ]
                            [ case Dict.get model.state hist_pres.state_results 
                                    |> Maybe.andThen (Dict.get (partyToString model.party))
                                of
                                Just array ->
                                    svg 
                                        [ style "width" "100%" 
                                        , style "height" "inherit" 
                                        ]
                                        (graphPresHist model.party array pres_state)

                                Nothing ->
                                    div [] [ text "State or party not found" ]
                            ]
                        , bottomRow model hist_pres
                        ]

                Nothing -> 
                    div []
                        [ text "Cannot find 2024 Presidential contest from that state." ]

graphPresHist : Party -> Array Float -> Contest -> List (Svg Msg)
graphPresHist party array pres_state =
    let
        coord : Int -> Float -> (Float, Float)
        coord x y =
            ( toFloat x * equalPct - (equalPct / 2)
            , (1 - y) * 100
            )

        coords = 
            map2 coord (range 1 numElections) full_array

        full_array =
            Array.toList array ++ [share2024]  

        votes2024 =
            find (isParty party) pres_state.results
                |> Maybe.map .votes
                |> Maybe.withDefault 0
                |> toFloat

        total2024 =
            map .votes pres_state.results
                |> sum
                |> toFloat

        share2024 =
            votes2024 / total2024

        point (x, y) =
            circle
                [ cx <| String.fromFloat x ++ "%"
                , cy <| String.fromFloat y ++ "%"
                , r "5"
                , fill (partyColor party)
                ] 
                []

        line_ (x1_, y1_) (x2_, y2_) =
            line
                [ x1 <| String.fromFloat x1_ ++ "%"
                , y1 <| String.fromFloat y1_ ++ "%"
                , x2 <| String.fromFloat x2_ ++ "%"
                , y2 <| String.fromFloat y2_ ++ "%"
                , stroke (partyColor party)
                , strokeWidth "2"
                ]
                []

        verticalAxis (x, _) =
            line
                [ x1 <| String.fromFloat x ++ "%"
                , y1 "0%"
                , x2 <| String.fromFloat x ++ "%"
                , y2 "100%"
                , stroke "lightgray"
                , strokeWidth "1"
                ]
                []

        shareText (x_, y_) s =
            text_
                [ x <| String.fromFloat (x_ - 1) ++ "%" 
                , y <| String.fromFloat (y_ - 3) ++ "%" 
                ]
                [ String.fromFloat (s * 100) 
                    |> left 5
                    |> Svg.text
                ]

    in
    [ map verticalAxis coords
    , map2 line_ coords (drop 1 coords)
    , map point coords
    , map2 shareText coords full_array
    ] |> concat

bottomRow : Model -> HistPres -> Html Msg
bottomRow model hist_pres =
    case Dict.get (partyToString model.party) hist_pres.nominees of
        Just nominees ->
            div
                [ style "width" "inherit"
                , style "display" "flex"
                ]
                (mapArray2 (presNominee model) electionYears nominees |> Array.toList)

        Nothing ->
            div
                []
                [ text "Party not found" ]

mapArray2 : (a -> b -> c) -> Array a -> Array b -> Array c
mapArray2 func a b =
    List.map2 func (Array.toList a) (Array.toList b)
        |> Array.fromList

presNominee : Model -> String -> String -> Html Msg
presNominee model year nominee =
    div [ style "width" <| (String.fromFloat equalPct) ++ "%" 
        , style "text-align" "center"
        , style "padding" "5px"
        ] 
        [ div
            [ style "font-size" "15px" ] 
            [ text year ]
        , div
            [ style "height" "125px" 
            , style "border" "1px solid black"
            ]
            []
        , div
            [ style "font-size" "20px" ]
            [ text nominee ]
        ]

nomineeLastName : String -> String
nomineeLastName name =
    case split ". " name of
        _ :: xs -> nomineeLastName (String.concat xs)
        _       -> name

equalPct : Float
equalPct =
    1 / (toFloat numElections) * 100

-- Both

loading : Html Msg
loading =
    div [] [ text "Loading..." ]

isState : Model -> Contest -> Bool
isState model c =
    let
        c_fips = Maybe.map .fips c.meta
            |> Maybe.withDefault "00"
    in
    c_fips == model.state

partyColor : Party -> String
partyColor party =
    case party of
        Democratic -> ShadePalettes.partyColor "dem"
        Republican -> ShadePalettes.partyColor "gop"