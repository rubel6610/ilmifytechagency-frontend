import React from "react";
import Expertise from "../component/services/Expertise";
import WeAre from "../component/services/WeAre";
import WeDo from "../component/services/WeDo";

export default function Services() {
  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-semibold text-center bg-[#F9F9F9] py-14 text-[#00D9A6]">
        Services
      </h1>
      <WeAre />
      <WeDo />
      <Expertise />
    </div>
  );
}
