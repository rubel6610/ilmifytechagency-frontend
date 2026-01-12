"use client";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const highlightedCountries = [
  { name: "USA", coords: [-100, 40], id: "USA" },
  { name: "UK", coords: [-2, 54], id: "GBR" },
  { name: "Canada", coords: [-106, 56], id: "CAN" },
  { name: "Russia", coords: [100, 60], id: "RUS" },
  { name: "Japan", coords: [138, 38], id: "JPN" },
  { name: "Pakistan", coords: [69, 30], id: "PAK" },
  { name: "Germany", coords: [10, 51], id: "DEU", xOff: 14, yOff: 0 },
  { name: "Israel", coords: [35, 31], id: "ISR" },
  { name: "Nepal", coords: [84, 28], id: "NPL", xOff: 10, yOff: -10 },
];

const AnimatedMap = () => {
  return (
    <section className="w-full bg-[#F9F9F9] py-10 md:py-20 xl:py-30 px-4 md:px-10 lg:px-20 border-slate-900">
      {/* Title & Description */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
          Our <span className="text-green-400">Global</span> Reach
        </h2>
        <p className="text-slate-400 text-sm md:text-lg leading-relaxed italic">
          Empowering businesses across borders. From our headquarters in Trishal, 
          we deliver world-class digital solutions to clients in these major global hubs.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative w-full max-w-6xl mx-auto bg-slate-900/50 rounded-4xl p-4 md:p-8  shadow-[0_0_50px_-12px_rgba(56,189,248,0.3)] overflow-hidden">
        <div className="w-full h-full max-h-100 md:max-h-150 flex items-center justify-center">
          <ComposableMap 
            projectionConfig={{ 
                scale: 140,
            }}
            className="w-full h-auto drop-shadow-2xl"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isHighlighted = highlightedCountries.find(
                    c => c.id === geo.id || c.name === geo.properties.name
                  );
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHighlighted ? "#4ade80" : "#1e293b"}
                      stroke={isHighlighted ? "#ffffff" : "#0f172a"}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { 
                            fill: isHighlighted ? "#22c55e" : "#2d3748", 
                            outline: "none", 
                            cursor: isHighlighted ? "pointer" : "default" 
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Markers */}
            {highlightedCountries.map(({ name, coords, xOff, yOff }) => (
              <Marker key={name} coordinates={coords}>
                <circle r={2.5} fill="#ffffff" className="animate-pulse" />
                <text
                  textAnchor="middle"
                  x={xOff || 0} 
                  y={yOff || -12}
                  className="fill-white text-[8px] md:text-[10px] font-medium pointer-events-none select-none uppercase tracking-tighter"
                  style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
                >
                  {name}
                </text>
              </Marker>
            ))}

            {/* Trishal Hub */}
            <Marker coordinates={[90.4219, 24.5245]}>
              <g className="animate-bounce">
                <circle r={6} fill="#ef4444" fillOpacity={0.3} />
                <circle r={3} fill="#ef4444" stroke="#ffffff" strokeWidth={1} />
              </g>
              <text 
                textAnchor="middle" 
                y={18} 
                className="fill-rose-500 text-[10px] md:text-[12px] font-bold tracking-widest uppercase"
              >
                Bangladesh
              </text>
            </Marker>
          </ComposableMap>
        </div>

        {/* Floating Stats or Badge */}
        <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 hidden sm:block">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-xl">
                <p className="text-green-400 text-2xl font-black italic">8+</p>
                <p className="text-white text-[10px] uppercase font-bold">Countries Served</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedMap;