"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/lib/leafletIcon";
import CtrlScrollZoom from "./CtrlScrollZoom";

const MapWithTooltip = () => {
  const position = [24.583045, 90.390682];
  const [showHint, setShowHint] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <div className="relative w-full h-[70vh]">
      {/* Overlay message */}
      {showHint && (
        <div className="absolute inset-0  flex items-center justify-center bg-black/40 text-white text-sm pointer-events-none text-center px-4">
          {isTouch ? (
            <>Use <b>two fingers</b> to zoom in</>
          ) : (
            <>Use <b>Ctrl</b> + scroll to zoom the map</>
          )}
        </div>
      )}

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <CtrlScrollZoom setShowHint={setShowHint} isTouch={isTouch} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={position}>
          <Tooltip direction="top">IllimifyTech Agency</Tooltip>
          <Popup>IllimifyTech Agency</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapWithTooltip;



// "use client";

// import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "@/lib/leafletIcon";

// const MapWithTooltip = () => {
//   const position = [24.583045, 90.390682];

//   return (
//     <MapContainer
//       center={position}
//       zoom={13}
//       style={{ height: '70vh', width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />

//       <Marker position={position}>
//         <Tooltip direction="top">IllimifyTech Agency</Tooltip>
//         <Popup>IllimifyTech Agency</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapWithTooltip;