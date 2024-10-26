module Office exposing (Office(..), staticOffice, toString, isGeorgia, isReferendum)

import List exposing (member)

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


staticOffice : Office
staticOffice =
    House


toString : Office -> String
toString office =
    case office of
        President         -> "president"
        House             -> "house"
        Senate            -> "senate"
        Governor          -> "governor"
        StateSenate       -> "" 
        StateHouse        -> ""
        AbortionQuestions -> "abortion-questions"
        RCVQuestions      -> "rcv-questions"
        GeorgiaQuestions  -> ""


{- This function only resolves to true if the respective results need to be pulled from the Georgia Secretary of State's website.
-}
isGeorgia : Office -> Bool
isGeorgia office =
    member office [StateSenate, StateHouse, GeorgiaQuestions]


isReferendum : Office -> Bool
isReferendum office =
    member office [AbortionQuestions, RCVQuestions, GeorgiaQuestions]