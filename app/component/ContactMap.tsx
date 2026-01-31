"use client";

import { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// Your Maptiler API key (get one free at https://www.maptiler.com/cloud/)
const MAPTILER_API_KEY = "1Y7AV7C8b5MpvIzg6mjj";

const ContactMap = () => {
  const [markerPosition] = useState({
    lat: 24.583045,
    lng: 90.390682,
  });

  return (
    <div className="w-full h-[70vh]">
      <Map
        initialViewState={{
          latitude: markerPosition.lat,
          longitude: markerPosition.lng,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`}
        mapboxAccessToken={undefined} // Not needed for Maptiler
      >
        <Marker 
          latitude={markerPosition.lat} 
          longitude={markerPosition.lng} 
          anchor="bottom"
        />
      </Map>
    </div>
  );
};

export default ContactMap;