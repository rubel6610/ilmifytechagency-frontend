"use client";

import dynamic from "next/dynamic";

const MapWithTooltip = dynamic(
  () => import("./MapWithTooltip"),
  { ssr: false }
);

export default function MapClient() {
  return <MapWithTooltip />;
}
