import Expertise from "@/components/services/Expertise";
import WeAre from "@/components/services/WeAre";
import WeDo from "@/components/services/WeDo";
import React from "react";

const Services = () => {
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
};

export default Services;
