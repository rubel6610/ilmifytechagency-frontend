"use client";

import dynamic from "next/dynamic";

// Dynamically import map to prevent SSR crash
const MapWithTooltip = dynamic(
  () => import("./MapWithTooltip"),
  { ssr: false }
);

export default function MapClient() {
  return (
    <div className="h-[75vh] w-full  ">
      <MapWithTooltip />
    </div>
  );
}


// "use client";

// import dynamic from "next/dynamic";

// const MapWithTooltip = dynamic(
//   () => import("./MapWithTooltip"),
//   { ssr: false }
// );

// export default function MapClient() {
//   return <MapWithTooltip />;
// }
