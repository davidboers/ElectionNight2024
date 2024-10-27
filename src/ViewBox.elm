module ViewBox exposing (..)

import String exposing (split, join)
import List exposing (map)

import Json.Decode exposing (Decoder, string, andThen, succeed, fail)

type ViewBox = ViewBox Int Int Int Int

defaultBViewBox : ViewBox
defaultBViewBox =
    ViewBox 0 0 950 700

zoomDecoder : Decoder ViewBox
zoomDecoder =
    string |>
        andThen (\v ->
            let
                int_list =
                    split " " v
                        |> map (String.toInt)
            in
            case int_list of
                [ Just x, Just y, Just w, Just h ] -> succeed <| ViewBox x y w h
                _                                  -> fail v          
        )

toString : ViewBox -> String
toString vb =
    case vb of
        (ViewBox x y w h) ->
            [x, y, w, h]
                |> map String.fromInt
                |> join " "