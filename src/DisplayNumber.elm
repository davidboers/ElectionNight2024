module DisplayNumber exposing (..)

import List exposing (reverse, concat, intersperse, take, drop)

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