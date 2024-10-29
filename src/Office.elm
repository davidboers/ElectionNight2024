module Office exposing (Office(..), toString, isGeorgia, isReferendum, officeDecoder)

import List exposing (member)
import Json.Decode exposing (Decoder, string, fail, succeed)

type Office
    = President
    | House
    | Senate
    | Governor
    | StateSenate
    | StateHouse
    | AbortionQuestions
    | RCVQuestions
    | GeorgiaQuestions
    | OtherQuestions


{-staticOffice : Office
staticOffice =
    President-}


toString : Office -> String
toString office =
    case office of
        President         -> "president"
        House             -> "house"
        Senate            -> "senate"
        Governor          -> "governor"
        StateSenate       -> "State Senate" 
        StateHouse        -> "State House"
        AbortionQuestions -> "abortion-questions"
        RCVQuestions      -> "rcv-questions"
        GeorgiaQuestions  -> "Georgia Ballot Questions"
        OtherQuestions    -> "other-questions"

{- This function only resolves to true if the respective results need to be pulled from the Georgia Secretary of State's website.
-}
isGeorgia : Office -> Bool
isGeorgia office =
    member office [StateSenate, StateHouse, GeorgiaQuestions]


isReferendum : Office -> Bool
isReferendum office =
    member office [AbortionQuestions, RCVQuestions, GeorgiaQuestions, OtherQuestions]


officeDecoder : Decoder Office
officeDecoder =
    string |> Json.Decode.andThen (\v ->
        case v of
            "president"          -> succeed President
            "house"              -> succeed House
            "senate"             -> succeed Senate
            "governor"           -> succeed Governor
            "State Senate"       -> succeed StateSenate 
            "State House"        -> succeed StateHouse
            "abortion-questions" -> succeed AbortionQuestions
            "rcv-questions"      -> succeed RCVQuestions
            "GeorgiaQuestions"   -> succeed GeorgiaQuestions
            "other-questions"    -> succeed OtherQuestions
            _                    -> fail v
    )
    