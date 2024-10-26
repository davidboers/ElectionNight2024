module Georgia exposing (..)

import Json.Decode exposing (at, Decoder, list, field, string, int)

type alias GeorgiaSummary =
    List GeorgiaContest

-- Contests

type alias GeorgiaContest =
    { name : String
    , candidates : List String
    , votes : List Int
    , precincts_reporting : Int
    , total_precincts : Int
    , version : String
    }

georgiaSummaryDecoder : Decoder GeorgiaSummary
georgiaSummaryDecoder =
    at ["Contests"] <|
        list georgiaContest

georgiaContest : Decoder GeorgiaContest
georgiaContest =
    Json.Decode.map6 GeorgiaContest
        (field "C" string) -- Office ("C"ontest)
        (field "CH" (list string)) -- Candidates
        (field "V" (list int)) -- Votes
        (field "PR" int) -- Precincts reporting
        (field "TP" int) -- Total precincts
        (field "K" string) -- Id

-- Counties

type alias GeorgiaCounty =
    { name : String
    , votes : List Int
    , precincts_reporting : Int
    , total_precincts : Int
    }

test : List String -> List (List Int) -> List Int -> List Int -> List GeorgiaCounty
test =
    List.map4 GeorgiaCounty

georgiaCounties : Decoder (List GeorgiaCounty)
georgiaCounties =
    Json.Decode.map4 test
        (field "P" (list string))
        (field "V" (list (list int)))
        (field "PX" (list int))
        (field "PY" (list int))