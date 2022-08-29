import React from "react";
import "../css/Map.css";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

export default function Map({ coords }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCPrLDWy7O8v0kS-r0y01REB1H10l332gQ",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading ...</div>;
  return <DrawMap coords={coords}></DrawMap>;
}

function DrawMap({ coords }) {
  return (
    <GoogleMap
      id="map"
      zoom={12}
      center={coords}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: "terrain",
      }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}
