module Contest exposing (..)

import Dict exposing (Dict)
import Office exposing (Office(..), officeDecoder)
import List exposing (member, concatMap)
import Http
import Json.Decode exposing (Decoder, at, list, float, maybe, succeed, field, string, int, oneOf, bool, dict)
import List exposing (map)
import Tuple exposing (pair)
import String exposing (contains)

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