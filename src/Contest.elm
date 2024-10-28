module Contest exposing (..)

import Dict exposing (Dict)
import Office exposing (Office)

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