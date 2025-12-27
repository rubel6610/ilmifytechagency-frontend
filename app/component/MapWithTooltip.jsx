"use client";

import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/lib/leafletIcon";

const MapWithTooltip = () => {
  const position = [24.583045, 90.390682];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={position}>
        <Tooltip direction="top">IllimifyTech Agency</Tooltip>
        <Popup>IllimifyTech Agency</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithTooltip;
