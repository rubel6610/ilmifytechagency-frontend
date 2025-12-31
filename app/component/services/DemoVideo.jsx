import React from "react";

export default function DemoVideo() {
  return (
    <div className="w-full">
      <video
        src="/assets/videos/demo-video2.mov" // public/assets/videos/...
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto rounded-xl shadow-lg"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
