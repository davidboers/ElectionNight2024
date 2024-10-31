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


-- Party colors

partyColor : String -> String
partyColor party =
    case party of
        "gop" -> "#cf222c"
        "dem" -> "#1a80c4"
        "lib" -> "#fed105"
        "grn" -> "#17aa5c"
        "psl" -> "#ff0000"
        "asp" -> "#F37120" -- American Solidarity Party
        "con" -> "#A356DE" -- Constitution Party
        "phb" -> "#FF00FF" -- Prohibition Party
        "soc" -> "#CD3700" -- Socialist Party USA
        "swp" -> "#AA0000" -- Socialist Workers Party
        "sep" -> "#D30101" -- Socialist Equality Party
        _ -> "#cccccc"

dem_color_dark : String
dem_color_dark =
    "#1a4e92"

gop_color_dark : String
gop_color_dark =
    "#96222c"

responseColor : String -> String
responseColor cnd =
    case cnd of
        "Yes" -> "#008800"
        "No"  -> "#ff0000"
        _     -> "#cccccc" -- Puerto Rico?