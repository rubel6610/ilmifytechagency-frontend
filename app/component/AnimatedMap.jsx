"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, Marker, Tooltip, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import worldData from "./world-data.json";

const highlightedCountries = [
  { name: "United States", label: "USA", id: "USA", coords: [37.0902, -95.7129] },
  { name: "Canada", label: "Canada", id: "CAN", coords: [56.1304, -106.3468] },
  { name: "Japan", label: "Japan", id: "JPN", coords: [36.2048, 138.2529] },
  { name: "United Kingdom", label: "England", id: "GBR", coords: [55.3781, -3.436] },
  { name: "Germany", label: "Germany", id: "DEU", coords: [51.1657, 10.4515] },
  { name: "Israel", label: "Israel", id: "ISR", coords: [31.0461, 34.8516] },
  { name: "Pakistan", label: "Pakistan", id: "PAK", coords: [30.3753, 69.3451] },
  { name: "Nepal", label: "Nepal", id: "NPL", coords: [28.3949, 84.124] },
  { name: "Russia", label: "Russia", id: "RUS", coords: [61.524, 105.3188] },
];

// Map view updater component
const MapViewUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.5 });
  }, [center, zoom, map]);
  
  return null;
};

const AnimatedMap = () => {
  const [mapConfig, setMapConfig] = useState({
    zoom: 2.65,
    center: [60, 20],
    iconSize: 24,
    tooltipOffset: -20
  });
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        // Extra Small Mobile
        setMapConfig({
          zoom: 0.8,
          center: [70, 20],
          iconSize: 16,
          tooltipOffset: -14
        });
      } else if (width < 640) {
        // Small Mobile
        setMapConfig({
          zoom: 1.0,
          center: [25, 30],
          iconSize: 18,
          tooltipOffset: -16
        });
      } else if (width < 768) {
        // Large Mobile
        setMapConfig({
          zoom: 1.3,
          center: [30, 20],
          iconSize: 20,
          tooltipOffset: -18
        });
      } else if (width < 1024) {
        // Tablet
        setMapConfig({
          zoom: 1.6,
          center: [60, 18],
          iconSize: 22,
          tooltipOffset: -20
        });
      } else if (width < 1280) {
        // Small Desktop / Laptop
        setMapConfig({
          zoom: 2,
          center: [60, 20],
          iconSize: 24,
          tooltipOffset: -20
        });
      } else if (width < 1536) {
        // Large Desktop
        setMapConfig({
          zoom: 2.5,
          center: [65, 20],
          iconSize: 24,
          tooltipOffset: -20
        });
      } else {
        // Extra Large / 2K+
        setMapConfig({
          zoom: 2.65,
          center: [57, 20],
          iconSize: 24,
          tooltipOffset: -20
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic icon based on screen size
  const getLocationIcon = () => {
    const size = mapConfig.iconSize;
    return L.divIcon({
      className: "custom-location-icon",
      html: `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#EF4444" stroke="white" stroke-width="1"/>
          <circle cx="12" cy="9" r="2.5" fill="white"/>
        </svg>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
    });
  };

  const geojsonStyle = (feature) => {
    const isHighlighted = highlightedCountries.some(
      (c) => (feature.id && c.id === feature.id) || (feature.properties && c.name === feature.properties.name)
    );

    return {
      fillColor: isHighlighted ? "#22c55e" : "#1e293b",
      weight: 1,
      opacity: 0.5,
      color: "#64748b",
      fillOpacity: isHighlighted ? 0.6 : 0.2,
    };
  };

  // SSR guard
  if (!isMounted) {
    return (
      <section className="w-full bg-[#020617] py-12 md:py-20">
        <div className="max-w-400 mx-auto text-center mb-8 md:mb-12 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-6xl text-white mb-6">
            Our <span className="text-green-500">Global</span> Reach
          </h2>
        </div>
        <div className="relative h-87.5 sm:h-100 md:h-125 lg:h-150 xl:h-187.5 max-w-400 px-4 md:px-8 mx-auto rounded-2xl sm:rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800 bg-[#020617] animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-500">Loading Map...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#020617] pb-8 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-400 mx-auto text-center mb-6 sm:mb-8 md:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6">
          Our <span className="text-green-500">Global</span> Reach
        </h2>
        <p className="text-[16px] text-gray-400">Delivering digital solutions to clients in the world’s most impactful economies.</p>
      </div>

      <div className="relative h-87.5 sm:h-100 md:h-125 lg:h-150 xl:h-187.5 max-w-400 px-2 sm:px-4 md:px-8 mx-auto">
        <div className="h-full w-full rounded-xl sm:rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
          <MapContainer
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            zoomSnap={0.1}
            zoomDelta={0.1}
            minZoom={0.5}
            maxZoom={5}
            scrollWheelZoom={false}
            dragging={true}
            doubleClickZoom={true}
            touchZoom={true}
            className="h-full w-full bg-[#020617]"
            zoomControl={false}
            attributionControl={false}
          >
            <MapViewUpdater center={mapConfig.center} zoom={mapConfig.zoom} />
            
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            />

            {worldData && <GeoJSON data={worldData} style={geojsonStyle} />}

            {highlightedCountries.map((country) => (
              <Marker 
                key={country.name} 
                position={country.coords} 
                icon={getLocationIcon()}
              >
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, mapConfig.tooltipOffset]}
                  className="custom-tooltip"
                >
                  <span className="country-label">
                    {country.label}
                  </span>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #020617 !important;
          outline: none;
        }
        
        .custom-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        
        .custom-tooltip::before {
          display: none !important;
        }
        
        .country-label {
          font-weight: 700;
          color: white;
          background: rgba(15, 23, 42, 0.95);
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid #334155;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          white-space: nowrap;
          font-size: 9px;
        }
        
        @media (min-width: 480px) {
          .country-label {
            font-size: 10px;
            padding: 4px 10px;
          }
        }
        
        @media (min-width: 768px) {
          .country-label {
            font-size: 11px;
            padding: 5px 12px;
            border-radius: 6px;
          }
        }
        
        @media (min-width: 1024px) {
          .country-label {
            font-size: 12px;
          }
        }
        
        .leaflet-bar a {
          background: #1e293b !important;
          color: white !important;
          border: 1px solid #334155 !important;
        }
        
        .leaflet-bar a:hover {
          background: #334155 !important;
        }
        
        .custom-location-icon {
          background: none !important;
          border: none !important;
        }
        
        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .leaflet-container {
            touch-action: pan-x pan-y;
          }
        }
        
        /* Hide zoom control on small screens */
        @media (max-width: 640px) {
          .leaflet-control-zoom {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default AnimatedMap;