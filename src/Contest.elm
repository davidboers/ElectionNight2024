module Contest exposing (..)

import Dict exposing (Dict)
import Office exposing (Office(..), officeDecoder)
import List exposing (member, concatMap)
import Http
import Json.Decode exposing (Decoder, at, list, float, maybe, succeed, field, string, int, oneOf, bool, dict)
import List exposing (map)
import Tuple exposing (pair)
import String exposing (contains)
import Html exposing (Html)
import Html exposing (table)
import Html.Attributes exposing (style)
import Html exposing (tr)
import Html.Attributes exposing (colspan)
import Html exposing (text)
import Html exposing (th)
import Html exposing (tbody)
import List exposing (sum)
import List exposing (sortBy)
import List exposing (reverse)
import Html exposing (br)
import Html exposing (td)
import ShadePalettes exposing (partyColor)
import DisplayNumber exposing (displayNumber)
import DisplayNumber exposing (displayPct)
import Html exposing (Attribute)

type alias Summary =
    List Contest

type alias ContestMeta = 
    { office : Office
    , fips : String
    , district : Maybe String 
    , isSpecial : Bool
    , isUncontested : Bool
    , isReferendum : Bool
    , holdingParty : String
    }


-- Contest 

type alias Contest =
    { id : String
    , progress : Float
    , timestamp : String
    , evs : Maybe Int
    , results : List Candidate
    , meta : Maybe ContestMeta
    , counties : Maybe (List County)
    }


isReferendum : Contest -> Bool
isReferendum c = 
    Maybe.map .isReferendum c.meta
        |> Maybe.withDefault False


mergeMeta : Meta -> Contest -> Contest
mergeMeta meta c =
    { c | meta = Dict.get c.id meta.races
        , results = map (\cnd ->
            case Dict.get cnd.cnd_id meta.candidates of
                Just {name, party, isIncumbent} ->
                    { cnd | name = name
                            , party = Just party 
                            , isIncumbent = isIncumbent
                            }

                Nothing ->
                    cnd
            ) 
        c.results 
    }

mergeMetas : Meta -> Summary -> Summary
mergeMetas meta =
    map (mergeMeta meta)

officeIs : Office -> Contest -> Bool
officeIs office c =
    c.meta
        |> Maybe.map (\v -> v.office == office)
        |> Maybe.withDefault False

-- Candidate

type alias Candidate =
    { votes : Int
    , cnd_id : String
    , name : String -- Default: cnd_id
    , party : Maybe String
    , winner : Bool   -- isWinner
    , isIncumbent : Bool
    }

type alias County =
    { county_fips : String
    , progress : Float
    , results : Dict String Int -- keys: Candidate IDs and values: votes
    , geo : Maybe String
    , name : Maybe String
    }

type alias Meta =
    { candidates : Dict String CandidateMeta
    , races : Dict String ContestMeta
    }

type alias CandidateMeta =
    { name : String
    , party : String
    , isIncumbent : Bool 
    }


-- Fetch and Decode

electionDateForLink : String
electionDateForLink =
    "2024-11-05"
    --"2020-11-03"

fetchResult : (Result Http.Error Summary -> msg) -> Office -> Cmd msg
fetchResult msg office =
    if member office [President, Senate, House, Governor] then
        -- Politico 
        Http.get
            --{ url = "https://www.politico.com/election-data/pebble/results/live/" ++ electionDateForLink ++ "/collections/" ++ electionDateForLink ++ "-collection-" ++ office ++ "/summaries.json"
            { url = "./temp-2024/" ++ electionDateForLink ++ "-collection-" ++ Office.toString office ++ "/summaries.json"
            , expect = Http.expectJson msg summaryDecoder
            } 

    else if Office.isReferendum office && not (Office.isGeorgia office) then
        Http.get
            { url = "./temp-2024/" ++ Office.toString office ++ ".json"
            , expect = Http.expectJson msg summaryDecoder
            }
        
    else 
        Cmd.none -- Theoretically unreachable

summaryDecoder : Decoder Summary
summaryDecoder =
    at ["contests"] <|
        list contest

contest : Decoder Contest
contest =
    Json.Decode.map7 Contest
        (field "id" string)
        (at ["progress", "pct"] float)
        (field "timestamp" string)
        (maybe (field "evs" int))
        (field "results" (list candidate))
        (succeed Nothing)
        (succeed Nothing)

candidate : Decoder Candidate
candidate =
    Json.Decode.map6 Candidate
        (field "votes" int)
        (field "id" string)
        (field "id" string)
        (maybe (field "party" string))
        (succeed False)
        (succeed False)

fetchMeta : (Result Http.Error Meta -> msg) -> Office -> Cmd msg
fetchMeta msg office =
    if Office.isReferendum office && not (Office.isGeorgia office) then
        Http.get
            { url = "./temp-2024/" ++ Office.toString office ++ "-meta.json"
            , expect = Http.expectJson msg metaDecoder
            }
        
    else 
        Http.get
            --{ url = "https://www.politico.com/election-data/pebble/metadata/" ++ electionDateForLink ++ "/collections/" ++ electionDateForLink ++ "-collection-" ++ office ++ "/combined.json"
            { url = "./temp-2024/" ++ electionDateForLink ++ "-collection-" ++ Office.toString office ++ "/combined.json"
            , expect = Http.expectJson msg metaDecoder
            }

metaDecoder : Decoder Meta
metaDecoder =
    let
        decodeCandidateMeta : Decoder (Dict String CandidateMeta)
        decodeCandidateMeta = 
            Json.Decode.map3 CandidateMeta
                (field "fullName" string)
                (field "party" string)
                (oneOf [field "isIncumbent" bool, succeed False])
                |> dict

        decodeContestMeta : Decoder (String, ContestMeta)
        decodeContestMeta =
            Json.Decode.map2 pair 
                (field "id" string)
                (Json.Decode.map7 ContestMeta
                    (field "office" officeDecoder)
                    (field "stateFips" string)
                    (maybe (field "districtNumber" string))
                    (field "isSpecial" bool)
                    (field "isUncontested" bool)
                    (field "isBallot" bool)
                    (oneOf [field "holdingParty" string, succeed "oth"])) 
    in
    Json.Decode.map2 Meta 
        (list (field "candidates" decodeCandidateMeta)
            |> Json.Decode.map (Dict.fromList << concatMap Dict.toList))
        (list (field "contest" decodeContestMeta)
            |> Json.Decode.map Dict.fromList)


-- State fips

fipsToName : String -> String
fipsToName fips =
    case fips of
        "01" -> "Alabama"
        "02" -> "Alaska"
        "04" -> "Arizona"
        "05" -> "Arkansas"
        "06" -> "California"
        "08" -> "Colorado"
        "09" -> "Connecticut"
        "10" -> "Delaware"
        "11" -> "District of Columbia"
        "12" -> "Florida"
        "13" -> "Georgia"
        "15" -> "Hawaii"
        "16" -> "Idaho"
        "17" -> "Illinois"
        "18" -> "Indiana"
        "19" -> "Iowa"
        "20" -> "Kansas"
        "21" -> "Kentucky"
        "22" -> "Louisiana"
        "23" -> "Maine"
        "24" -> "Maryland"
        "25" -> "Massachusetts"
        "26" -> "Michigan"
        "27" -> "Minnesota"
        "28" -> "Mississippi"
        "29" -> "Missouri"
        "30" -> "Montana"
        "31" -> "Nebraska"
        "32" -> "Nevada"
        "33" -> "New Hampshire"
        "34" -> "New Jersey"
        "35" -> "New Mexico"
        "36" -> "New York"
        "37" -> "North Carolina"
        "38" -> "North Dakota"
        "39" -> "Ohio"
        "40" -> "Oklahoma"
        "41" -> "Oregon"
        "42" -> "Pennsylvania"
        "44" -> "Rhode Island"
        "45" -> "South Carolina"
        "46" -> "South Dakota"
        "47" -> "Tennessee"
        "48" -> "Texas"
        "49" -> "Utah"
        "50" -> "Vermont"
        "51" -> "Virginia"
        "53" -> "Washington"
        "54" -> "West Virginia"
        "55" -> "Wisconsin"
        "56" -> "Wyoming"
        _ -> 
            if contains " County" fips
                then fips --replace " County" "" fips
                else fips


-- Contest results small

smallContestResults : (Contest -> String) -> Contest -> Html msg
smallContestResults getname c =
    let
        total_votes =
            sum <| map .votes c.results

        sorted_results =
            c.results
                |> sortBy .votes
                |> reverse
    in
    ( tr 
        []
        [ th 
            [ colspan 10 ]
            [ text (getname c) 
            ]
        ]
    ) :: (smallRows total_votes sorted_results) ++
        [ tr 
            []
            [ th [] []
            , th [] [ text "Total Votes" ]
            , th [ colspan 2 ] [ text <| displayNumber total_votes ]
            ]
        , tr
            []
            [ th [] []
            , th [] [ text "Progress" ]
            , th [ colspan 2 ] [ text <| (String.fromInt <| round <| c.progress * 100) ++ "%" ]
            ]
        ]
        |> table 
            [ style "border-collapse" "collapse" 
            , style "max-width" "fit-content"
            , style "display" "inline"
            ]

smallRows : Int -> List Candidate -> List (Html msg)
smallRows total_votes sorted_results =
    case sorted_results of
        [] -> 
            [ text "No candidates." ] 

        [uncontested] -> -- Shouldn't be any uncontested races
            [ tr [] (smallCandidate total_votes uncontested)
            ]

        [first, second] ->
            [ tr [] (smallCandidate total_votes first)
            , tr [] (smallCandidate total_votes second)
            ]

        [first, second, third] ->
            [ tr [] (smallCandidate total_votes first)
            , tr [] (smallCandidate total_votes second)
            , tr [] (smallCandidate total_votes third)
            ]

        first :: second :: others ->
            let
                third =
                    { votes = sum <| map .votes others
                    , cnd_id = "others"
                    , name = "Others"
                    , party = Just "oth"
                    , winner = False
                    , isIncumbent = False
                    }
            in
            [ tr [] (smallCandidate total_votes first)
            , tr [] (smallCandidate total_votes second)
            , tr [] (smallCandidate total_votes third)
            ]

smallRowStyle : List (Attribute msg)
smallRowStyle =
    [ style "padding" "4px"
    , style "border-bottom" "1px solid black"
    , style "border-top" "1px solid black"
    , style "max-width" "fit-content"
    ]


smallCandidate : Int -> Candidate -> List (Html msg)
smallCandidate total_votes cnd =
    let
        color = partyColor <| Maybe.withDefault "oth" cnd.party
    in
    [ td 
        [ style "background-color" color
        , style "width" "5px"
        ] 
        []
    , td
        smallRowStyle
        [ text cnd.name ]
    , td
        smallRowStyle
        [ text <| displayNumber cnd.votes ]
    , td
        smallRowStyle
        [ text <| displayPct cnd.votes total_votes ]
    ]