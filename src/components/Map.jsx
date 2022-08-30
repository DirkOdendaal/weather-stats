import React from "react";
import "../css/Map.css";

export default function Map({ newcoords, isLoaded, GoogleMap }) {
  
  return <DrawMap newcoords={newcoords} GoogleMap={GoogleMap}></DrawMap>;
}

function DrawMap({ newcoords, GoogleMap }) {
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
    ></GoogleMap>
  );
}
