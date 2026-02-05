"use client";

import dynamic from "next/dynamic";
import { FC } from "react";

// Dynamically import map component to prevent SSR issues
const MapWithTooltip = dynamic(
  () => import("./MapWithTooltip"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-gray-500">Loading map...</div>
      </div>
    )
  }
);

const MapClient: FC = () => {
  return (
    <div className="h-[75vh] w-full">
      <MapWithTooltip />
    </div>
  );
};

export default MapClient;