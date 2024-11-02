module Contest exposing (Candidate, Contest, fetchMeta, fetchResult, Meta, mergeMetas, Summary, smallContestResults, fipsToName, County, officeIs, isReferendum, ContestMeta, countyToContest, contestWinner, displayCalls, getCalls, fetchPreviousResults, tpSwing, pairToCandidate)

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
import List exposing (sum)
import List exposing (sortBy)
import List exposing (reverse)
import Html exposing (br)
import Html exposing (td)
import ShadePalettes exposing (partyColor)
import DisplayNumber exposing (displayNumber)
import DisplayNumber exposing (displayPct)
import Html exposing (Attribute)
import List.Extra exposing (find)
import List exposing (filterMap)
import ShadePalettes exposing (responseColor)
import List exposing (head)
import Html exposing (div)
import Time exposing (Posix)
import Iso8601
import Time exposing (toHour)
import Time exposing (Zone)
import Time exposing (utc)
import Time exposing (toMinute)
import List exposing (filter)

type alias Summary =
    List Contest


-- Contest 

type alias Contest =
    { id : String
    , progress : Float
    , timestamp : String
    , evs : Maybe Int
    , results : List Candidate
    , calls : List Call
    , meta : Maybe ContestMeta
    , counties : Maybe (List County)
    }

type alias Meta =
    { candidates : Dict String CandidateMeta
    , races : Dict String ContestMeta
    }

type alias ContestMeta = 
    { office : Office
    , fips : String
    , district : Maybe String 
    , isSpecial : Bool
    , isUncontested : Bool
    , isReferendum : Bool
    , holdingParty : String
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
                Just {name, short_name, party, isIncumbent} ->
                    { cnd | name = name
                          , short_name = short_name
                          , party = Just <| smallPartyCandidates party cnd.cnd_id 
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
    , short_name : String
    , party : Maybe String
    , winner : Bool -- isWinner
    , isIncumbent : Bool
    }

type alias CandidateMeta =
    { name : String
    , short_name : String
    , party : String
    , isIncumbent : Bool 
    }


-- County

type alias County =
    { county_fips : String
    , progress : Float
    , results : Dict String Int -- keys: Candidate IDs and values: votes
    , swing_from : Dict String Int
    , geo : Maybe String
    , name : Maybe String
    }

{- Re-creates the contest object with the results of the county -}
countyToContest : Contest -> County -> Contest 
countyToContest c county =
    let
        makeCandidate (cnd_id, votes) =
            find ((==) cnd_id << .cnd_id) c.results
                    |> Maybe.map (\cnd ->
                            { cnd | votes = votes }
                        )
    in
    
    { c | progress = county.progress
        , id = Maybe.withDefault county.county_fips county.name
        , results =
            filterMap makeCandidate (Dict.toList county.results)
    }

pairToCandidate : List Candidate -> (String, Int) -> Maybe Candidate
pairToCandidate results (cnd_id, votes) =
    find (\cnd -> cnd.cnd_id == cnd_id) results
        |> Maybe.map (\cnd ->
            { votes = votes
            , cnd_id = cnd_id
            , name = cnd.name
            , short_name = cnd.short_name
            , party = cnd.party
            , winner = cnd.winner
            , isIncumbent = cnd.isIncumbent
            })


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
    Json.Decode.map8 Contest
        (field "id" string)
        (at ["progress", "pct"] float)
        (field "timestamp" string)
        (maybe (field "evs" int))
        (field "results" (list candidate))
        (field "calls" (list decodeCall))
        (succeed Nothing)
        (succeed Nothing)

candidate : Decoder Candidate
candidate =
    Json.Decode.map7 Candidate
        (field "votes" int)
        (field "id" string)
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
            Json.Decode.map4 CandidateMeta
                (field "fullName" string)
                (field "shortName" string)
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
                third : Candidate
                third =
                    { votes = sum <| map .votes others
                    , cnd_id = "others"
                    , name = "Others"
                    , short_name = "Others"
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
        color = 
            if member cnd.name ["Yes", "No"]
                then responseColor cnd.name
                else partyColor <| Maybe.withDefault "oth" cnd.party
    in
    [ td 
        [ style "background-color" color
        , style "width" "5px"
        ] 
        []
    , td
        smallRowStyle
        [ text cnd.short_name ]
    , td
        smallRowStyle
        [ text <| displayNumber cnd.votes ]
    , td
        smallRowStyle
        [ text <| displayPct cnd.votes total_votes ]
    ]


-- Election calls

type alias Call =
    { caller_id : String
    , c_id : String
    , subject_id : String
    , timestamp : Posix
    , type_ : String
    }


decodeCall : Decoder Call
decodeCall =
    Json.Decode.map5 Call
        (field "callerId" string)
        (field "contestId" string)
        (field "subjectId" string)
        (field "timestamp" Iso8601.decoder)
        (field "type" string)


getCallsContest : Contest -> List (Contest, Call)
getCallsContest c =
    map (\call -> (c, call)) c.calls

getCalls : List Contest -> List (Contest, Call)
getCalls summary = 
    concatMap getCallsContest summary
        |> sortBy (Time.posixToMillis << .timestamp << Tuple.second)

displayCalls : List (Contest, Call) -> List (Html msg)
displayCalls calls = 
    map displayCall calls

displayCall : (Contest, Call) -> Html msg
displayCall (c, call) =
    case c.meta of
        Just meta ->
            if meta.isReferendum then
                text "Referendum"

            else
                let
                    office = meta.office
                    office_str =
                        Office.toString office
                            |> String.toUpper
                    state = fipsToName meta.fips
                    winner = contestWinner c
                    winning_party = Maybe.andThen .party winner
                        |> Maybe.withDefault meta.holdingParty
                    gain = winning_party /= meta.holdingParty
                in
                div []
                    [ div 
                        [ style "color" "gray" ]
                        [ text <| displayTimestamp call.timestamp ] 
                    , div
                        [ style "background-color" (partyColor winning_party)
                        ]
                        [ text office_str
                        , text " - "
                        , text state -- Should change this to racename
                        , text ": "
                        , br [] []
                        , text (String.toUpper winning_party)
                        , if gain
                            then text <| " gain from " ++ meta.holdingParty
                            else text " hold"
                        ]

                    ]

        Nothing ->
            text "No meta"


-- Previous results

fetchPreviousResults : (Result Http.Error String -> msg) -> Cmd msg
fetchPreviousResults msg =
    Http.get
        { url = "./swing_from.csv"
        , expect = Http.expectString msg
        }

{- Party swing in favor of a particular party. 
-}
contestSwing : List Candidate -> List Candidate -> String -> Float
contestSwing before now pty =
    let
        total_now = sum <| map .votes now
        total_before = sum <| map .votes before
        votes_now = sum <| map .votes <| filter (\cnd -> cnd.party == Just pty) now
        votes_before =  sum <| map .votes <| filter (\cnd -> cnd.party == Just pty) before
        share_now = (toFloat votes_now) / (toFloat total_now)
        share_before = (toFloat votes_before) / (toFloat total_before)
    in
    share_now - share_before

{- Two party swing between the Democrats and Republicans, with a positive figure indicating a swing to the Democrats.
-}
tpSwing : List Candidate -> List Candidate -> Float
tpSwing before now =
    (contestSwing before now "dem") - (contestSwing before now "gop")


-- Timestamp display

displayTimeElement : (Zone -> Posix -> Int) -> Posix -> String
displayTimeElement func posix =
    String.fromInt (func utc posix)

displayTimestamp : Posix -> String
displayTimestamp posix =
    displayTimeElement toHour posix
        ++ ":"
        ++ displayTimeElement toMinute posix


-- Small party candidates

smallPartyCandidates : String -> String -> String
smallPartyCandidates default_party cnd_id =
    case cnd_id of
        "69459" -> "lib" -- Chase Oliver
        "895" -> "grn" -- Jill Stein
        "61513" -> "con" -- Randall Terry
        "73180" -> "psl" -- Claudia de la Cruz
        "167760" -> "swp" -- Rochele Fruit
        "69442" -> "sep" -- Joseph Kishore

        -- Utah gubernatorial
        "44473" -> "lib"

        -- Montana gubernatorial
        "167872" -> "lib"

        -- Missouri gubernatorial
        "62422" -> "lib"
        "131746" -> "grn"

        -- Indiana gubernatorial
        "69533" -> "lib"

        -- West Virginia gubernatorial
        "69619" -> "lib"
        "166876" -> "grn"
        "155104" -> "con"

        -- North Carolina gubernatorial
        "166375" -> "grn"
        "166374" -> "lib"
        "167551" -> "con"

        -- New Hampshire gubernatorial
        "168217" -> "lib"
        
        -- Arizona Senate
        "167853" -> "grn"

        -- Connecticut Senate
        "69655" -> "grn"

        -- Florida Senate
        "167867" -> "lib"
        "167868" -> "ind"
        "71777" -> "ind"

        -- Hawaii Senate
        "71492" -> "grn"

        -- Indiana Senate
        "732" -> "lib"

        -- Maryland Senate
        "166877" -> "lib"

        -- Michigan Senate
        "168022" -> "lib"
        "168024" -> "grn"
        "168023" -> "con"

        -- Minnesota Senate
        "167707" -> "lib"

        -- Missouri Senate
        "167941" -> "lib"
        "131752" -> "grn"

        -- Montana Senate
        "130039" -> "lib"
        "68680" -> "grn"

        -- Nevada Senate
        "132873" -> "lib"
        "1348" -> "con"

        -- New Jersey Senate
        "60050" -> "lib"
        "166841" -> "grn"
        "166842" -> "swp"
        "60901" -> "lib"

        -- Pennsylvania Senate
        "167810" -> "grn"
        "167811" -> "con"
        "167809" -> "lib"
        
        -- Texas Senate
        "69634" -> "lib"

        -- Vermont Senate
        "167778" -> "lib"

        -- West Virginia Senate
        "62658" -> "lib"

        -- Arizona House
        "167854" -> "grn"
        "167855" -> "grn"
        "167577" -> "grn"

        -- Arkansas House
        "104074" -> "lib"
        "167499" -> "lib"

        -- Colorado House
        "62893" -> "lib"
        "168013" -> "lib"
        "164306" -> "lib"
        "71795" -> "con"
        "168016" -> "lib"
        "167354" -> "ind"
        "71789" -> "lib"
        "168018" -> "lib"

        -- Connnecticut House
        "71820" -> "grn"

        -- Florida House
        "167869" -> "ind"
        "71588" -> "ind"
        "167870" -> "lib"

        -- Hawaii House
        "166496" -> "lib"
        "166495" -> "ind"

        -- Idaho House
        "167082" -> "lib"
        "112913" -> "con"
        "112486" -> "con"
        "167083" -> "lib"

        -- Indiana House
        "167501" -> "lib"
        "71635" -> "lib"
        "167502" -> "lib"
        "167503" -> "lib"
        "167506" -> "lib"
        "65433" -> "lib"
        "71633" -> "lib"
        "70022" -> "lib"
        "167505" -> "lib"

        -- Iowa House
        "167897" -> "ind"
        
        -- Kansas House
        "167749" -> "lib"
        "69293" -> "lib"

        -- Louisiana House
        "118439" -> "ind"

        -- Maryland House
        "166878" -> "lib"
        "65572" -> "lib"
        "166879" -> "lib"
        "65573" -> "grn"
        "58668" -> "lib"

        -- Michigan House
        "71660" -> "lib"
        "167758" -> "lib"
        "167759" -> "con"
        "130509" -> "lib"
        "71745" -> "con"
        "167761" -> "grn"
        "59834" -> "grn"
        "127269" -> "lib"
        "167762" -> "lib"
        "167763" -> "lib"
        "167764" -> "con"
        "64441" -> "grn"
        "167765" -> "lib"
        "69512" -> "lib"
        "1321" -> "grn"
        "129641" -> "grn"
        "167766" -> "lib"
        "71669" -> "con"

        -- Missouri House
        "167943" -> "lib"
        "65814" -> "grn"
        "167945" -> "lib"
        "167946" -> "grn"
        "131332" -> "grn"
        "167947" -> "lib"
        "60807" -> "lib"
        "167948" -> "grn"
        "130357" -> "lib"
        "167949" -> "lib"
        "65817" -> "grn"
        "50436" -> "lib"
        "167950" -> "lib"

        -- Montana House
        "167340" -> "lib"

        -- Nevada House
        "166653" -> "lib"
        "64034" -> "ind"
        "166654" -> "ind"
        "166656" -> "ind"
        "132867" -> "lib"
        "166655" -> "con"
        "132597" -> "con"
        "166658" -> "lib"
        "60752" -> "con"

        -- New Jersey House
        "166845" -> "grn"
        "166847" -> "grn"
        "71520" -> "lib"
        "58874" -> "grn"
        "134586" -> "grn"
        "134588" -> "lib"
        "166851" -> "grn"
        "67760" -> "lib"
        "166854" -> "lib"
        "51584" -> "grn"
        "166856" -> "lib"
        "166855" -> "lib"
        "166857" -> "grn"
        "71530" -> "swp"
        "166858" -> "grn"
        "166859" -> "lib"
        "166861" -> "grn"
        "166863" -> "grn"
        "166865" -> "grn"
        "166866" -> "lib"

        -- North Carolina House
        "34158" -> "lib"
        "166370" -> "grn"
        "166371" -> "lib"
        "136179" -> "lib"
        "68325" -> "con"
        "166372" -> "ind"
        "167550" -> "con"
        "166373" -> "lib"

        -- Ohio House
        "168203" -> "ind"

        -- Oregon House
        "167316" -> "con"
        "167318" -> "grn"
        "64477" -> "ind"
        "167319" -> "grn"
        "167608" -> "lib"

        -- South Carolina House
        "69446" -> "con"
        "167757" -> "lib"

        -- Texas House
        "157656" -> "lib"
        "167507" -> "lib"
        "167508" -> "lib"
        "65546" -> "lib"
        "65015" -> "lib"
        "69627" -> "lib"

        -- Utah
        "68829" -> "lib"
        "70425" -> "con"
        "167350" -> "lib"
        "167351" -> "ind"

        -- Wisconsin
        "167715" -> "grn"

        -- Wyoming
        "69551" -> "con"
        "62702" -> "lib"


        _ -> 
            default_party