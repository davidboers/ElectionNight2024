module Georgia exposing (..)

import Json.Decode exposing (at, Decoder, list, field, string, int)
import Http
import Office exposing (Office)
import Contest exposing (Contest, Candidate)
import String exposing (contains)
import String exposing (dropRight)
import Office exposing (Office(..))
import List exposing (length)

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

-- Fetch Georgia Contests

fetchResult : (Result Http.Error GeorgiaSummary -> msg) -> Cmd msg
fetchResult msg =
    Http.get
        { url = "https://results.enr.clarityelections.com/GA/115465/314082/json/sum.json"
        , expect = Http.expectJson msg georgiaSummaryDecoder
        } 

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


-- Convert to Contest

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
    , calls = []
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