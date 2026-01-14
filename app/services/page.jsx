import React from "react";
import Expertise from "./components/Expertise";
import WeAre from "./components/WeAre";
import WeDo from "./components/WeDo";


export default function Services() {
  return (

       <div className="my-30">
      <h1 className="text-3xl md:text-5xl font-semibold text-center bg-[#F9F9F9] py-14 text-[#00D9A6]">
        Services
      </h1>
      <WeAre />
      <WeDo />
      <Expertise />
    </div>

   
  );
}
