module DisplayNumber exposing (..)

import List exposing (reverse, concat, intersperse, take, drop)
import String exposing (left)

displayNumber : Int -> String
displayNumber n =
    let
        breakUp part =
            case part of
                [] ->
                    []
                    
                _ ->
                    (take 3 part) :: (breakUp <| drop 3 part)
    in
    n
        |> String.fromInt
        |> String.toList
        |> reverse
        |> breakUp
        |> intersperse [',']
        |> concat
        |> reverse
        |> String.fromList

displayPct : Int -> Int -> String
displayPct n d = 
    if d == 0 then
        "-"
    else
        (toFloat n) / (toFloat d) * 100
            |> String.fromFloat
            |> left 4

displayPctRnd : Int -> Int -> String
displayPctRnd n d =
    if d == 0 then
        "0%"

    else
        ((toFloat n) / (toFloat d) * 100
            |> round
            |> String.fromInt)
            ++ ("%")