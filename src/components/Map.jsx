import React from "react";
import "../css/Map.css";

export default function Map({ newcoords, GoogleMap, Marker }) {
  if (newcoords == null) {
    return <div>Loading ..</div>
  }
  return (
    <DrawMap
      newcoords={newcoords}
      GoogleMap={GoogleMap}
      Marker={Marker}
    ></DrawMap>
  );
}

function DrawMap({ newcoords, GoogleMap, Marker }) {
  return (
    <GoogleMap
      id="map"
      zoom={8}
      center={newcoords}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: "terrain",
      }}
      mapContainerClassName="map-container"
    >
      <Marker position={newcoords} />
    </GoogleMap>
  );
}
