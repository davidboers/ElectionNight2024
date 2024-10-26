module BallotQuestionMeta exposing (BallotQuestionMeta, decodeBallotQuestionMeta, passageExplanation)

import Json.Decode exposing (Decoder, field, string, float, succeed, maybe, oneOf, bool)
import DisplayNumber exposing (displayNumber)
import Html exposing (Html)
import Html exposing (text)
import Html exposing (span)
import Html exposing (br)
import List exposing (intersperse)
import String exposing (left)

type alias BallotQuestionMeta =
    { short_summary : String
    , long_summary : String
    , yes_tag : Maybe String
    , no_tag : Maybe String
    , threshold : Float
    , total_voter_threshold : Maybe Float
    , competing : Bool
    }

decodeBallotQuestionMeta : Decoder BallotQuestionMeta
decodeBallotQuestionMeta =
    Json.Decode.map7 BallotQuestionMeta
        (field "short-summary" string)
        (field "long-summary" string)
        (maybe (field "yes-tag" string))
        (maybe (field "no-tag" string))
        (oneOf [field "threshold" float, succeed 0.5])
        (maybe (field "total-vote-threshold" float))
        (oneOf [field "competing" bool, succeed False])

displayPct : Float -> String
displayPct flt = 
    flt * 100
        |> String.fromFloat
        |> left 2
    

passageExplanationThreshold : BallotQuestionMeta -> String
passageExplanationThreshold bq_meta =
    if bq_meta.threshold == 0.5
        then "needs a simple majority"
        else "must pass with at least " ++ (displayPct bq_meta.threshold) ++ "% of the vote"

passageExplanationTotVoterThreshold : BallotQuestionMeta -> Maybe String
passageExplanationTotVoterThreshold bq_meta =
    case bq_meta.total_voter_threshold of
        Just total_voter_threshold -> 
            let
                pct = displayPct total_voter_threshold
            in
            Just <| "must be approved by at least " ++ pct ++ "% of total ballots cast (including blank votes)"

        Nothing -> 
            Nothing

passageExplanationCompeting : BallotQuestionMeta -> Maybe String
passageExplanationCompeting bq_meta =
    if bq_meta.competing
        then Just "needs more 'Yes' votes than the competing measure"
        else Nothing 

passageExplanation : BallotQuestionMeta -> Html Never
passageExplanation bq_meta =
    case 
        ( passageExplanationThreshold bq_meta
        , passageExplanationTotVoterThreshold bq_meta
        , passageExplanationCompeting bq_meta) of
        (thres_expl, Nothing, Nothing) ->
            text <| "This measure " ++ thres_expl ++ " to be enacted"
        
        (thres_expl, Just tot_thres_expl, Nothing) ->
            span [] (intersperse (br [] []) <|
                [ text <| "This measure:"
                , text <| "• " ++ thres_expl ++ ", and"
                , text <| "• " ++ tot_thres_expl
                , text <| "In order to be enacted"
                ])

        (thres_expl, Nothing, Just passage_expl) ->
            span [] (intersperse (br [] []) <|
                [ text <| "This measure:"
                , text <| "• " ++ thres_expl ++ ", and"
                , text <| "• " ++ passage_expl
                , text <| "In order to be enacted"
                ])

        (thres_expl, Just tot_thres_expl, Just passage_expl) ->
            span [] (intersperse (br [] []) <|
                [ text <| "This measure:"
                , text <| "• " ++ thres_expl ++ ","
                , text <| "• " ++ tot_thres_expl ++ ", and"
                , text <| "• " ++ passage_expl
                , text <| "In order to be enacted"
                ])
    