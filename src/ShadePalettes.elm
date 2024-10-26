module ShadePalettes exposing (..)

displayColor : Float -> Float -> Float -> String
displayColor r g b =
    "rgb("
        ++ String.fromFloat r
        ++ ", "
        ++ String.fromFloat g
        ++ ", "
        ++ String.fromFloat b
        ++ ")"

tintFunc : Float -> Float -> Float -> Float
tintFunc share h0 h1 =
    (1.0 - share) * (h1 - h0) + h0        

getPartyShade : String -> Float -> String
getPartyShade pty share =
    let
        {-
        Democrats:
            Lowest:  rgb(204, 230, 255)
            Highest: rgb(  0,  32,  64)

        Republicans:
            Lowest:  rgb(255, 204, 204)
            Highest: rgb( 64,   0,   0)
        -}

        tint = tintFunc share
    in
    case pty of
        "dem" -> displayColor (tint 0  204) (tint 32 230) (tint 64 255)
        "gop" -> displayColor (tint 64 255) (tint 0  204) (tint 0  204)
        _     -> displayColor (tint 0  255) (tint 0  255) (tint 0  255)

getResponseShade : String -> Float -> String
getResponseShade pty share =
    let
        {-
        Yes:
            Lowest:  rgb(204, 230, 255)
            Highest: rgb(  0,  32,  64)

        No:
            Lowest:  rgb(255, 204, 204)
            Highest: rgb( 64,   0,   0)
        -}

        tint = tintFunc share
    in
    case pty of
        "Yes" -> displayColor (tint 0  0  ) (tint 0  255) (tint 0  0  )
        "No"  -> displayColor (tint 0  255) (tint 0  0  ) (tint 0  0  )
        _     -> displayColor (tint 0  255) (tint 0  255) (tint 0  255)
        
{- For turnout and progress maps -}
getMetaShade : Float -> String
getMetaShade share =
    let
        tint = tintFunc share
    in
    displayColor 0 0 (tint 0 255)