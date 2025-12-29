"use client";

import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const ContactMap = () => {
  return (
    <div className="w-full h-[70vh]">
      <Map
        initialViewState={{
          latitude: 24.583045,
          longitude: 90.390682,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=1Y7AV7C8b5MpvIzg6mjj"
      >
        <Marker latitude={24.583045} longitude={90.390682} />
      </Map>
    </div>
  );
};

export default ContactMap;
