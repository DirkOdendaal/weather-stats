import React from "react";
import "../css/Map.css";
import { GoogleMap, useLoadScript, Marker, } from "@react-google-maps/api";

export default function Map({ newcoords }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCPrLDWy7O8v0kS-r0y01REB1H10l332gQ",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading ...</div>;
  return <DrawMap newcoords={newcoords}></DrawMap>;
}

function DrawMap({ newcoords }) {
  return (
    <GoogleMap
      id="map"
      zoom={12}
      center={newcoords}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: "terrain",
      }}
      mapContainerClassName="map-container"
    >
      {/* <Marker position={coords}></Marker> */}
    </GoogleMap>
  );
}
