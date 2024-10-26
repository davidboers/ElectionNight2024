module GeoJson exposing (..)

import Json.Decode as Decode exposing (Decoder, field, at)


-- Thanks to ChatGPT for making this possible!


-- MODEL


type alias GeoJson =
    { type_ : String
    , features : List Feature
    }


type alias Feature =
    { type_ : String
    , geometry : Geometry
    , code : String
    , name : String
    }


type Geometry
    = Point PointCoordinates
    | LineString (List PointCoordinates)
    | Polygon (List (List PointCoordinates))
    | MultiPolygon (List (List (List PointCoordinates)))


type alias PointCoordinates =
    (Float, Float)


-- DECODERS

geoJsonDecoder : Decoder GeoJson
geoJsonDecoder =
    Decode.map2 GeoJson
        (field "type" Decode.string)
        (field "features" (Decode.list featureDecoder))


featureDecoder : Decoder Feature
featureDecoder =
    Decode.map4 Feature
        (field "type" Decode.string)
        (field "geometry" geometryDecoder)
        (at ["properties", "code"] Decode.string)
        (at ["properties", "name"] Decode.string)


geometryDecoder : Decoder Geometry
geometryDecoder =
    Decode.oneOf
        [ Decode.map Point (field "coordinates" pointCoordinatesDecoder)
        , Decode.map LineString (field "coordinates" (Decode.list pointCoordinatesDecoder))
        , Decode.map Polygon (field "coordinates" (Decode.list (Decode.list pointCoordinatesDecoder)))
        , Decode.map MultiPolygon (field "coordinates" (Decode.list (Decode.list (Decode.list pointCoordinatesDecoder))))
        ]


pointCoordinatesDecoder : Decoder PointCoordinates
pointCoordinatesDecoder =
    let
        makePair : List Float -> (Float, Float)
        makePair l =
            case l of
                [a, b] -> Tuple.pair a b
                [a]    -> (a, 0)
                _      -> (0, 0)
    in
    
    Decode.map (makePair) (Decode.list Decode.float)


-- Convert


featureToSvg : Feature -> String
featureToSvg feature =
    let
        makeDCoord coord =
            "M " ++ String.join " L " (List.map (pointToString >> Tuple.first) coord)
    in
    case feature.geometry of
        Point _ ->
            {-let
                (x, y) = coordinates
            in
            circle [ Html.Attributes.cx (String.fromFloat x), Html.Attributes.cy (String.fromFloat y), Html.Attributes.r "5", Html.Attributes.fill "blue" ] [] -}
            "Add"

        LineString points ->
            makeDCoord points

        Polygon rings ->
            List.map (\ring -> makeDCoord ring ++ " Z") rings
                |> String.join " " 

        MultiPolygon rings_of_rings ->
            List.map (\group -> List.map makeDCoord group) rings_of_rings
                |> List.concat
                |> String.join " "

pointToString : PointCoordinates -> (String, String)
pointToString (x, y) =
    (String.fromFloat x ++ " " ++ String.fromFloat y, "")
