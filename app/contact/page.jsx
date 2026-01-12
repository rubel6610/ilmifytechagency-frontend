import React from "react";
import MapClient from "./components/MapClient";
import ContactCard from "./components/ContactCard";
import FormElement from "./components/FormElement";

const Contact = () => {
  return (

      <div className="overflow-hidden my-30 z-[-100]">
        {/* HEADER */}
        <h1 className=" text-primary py-10 text-[43px]  sm:text-[43px] text-center bg-[#F9F9F9] font-bold">
          Contact Page
        </h1>
      <p className="lg:w-400 sm:mx-8 pt-13 md:mx-8 lg:mx-auto text-lg md:text-xl text-gray-700 leading-relaxed text-center font-light">
        At <span className="font-semibold text-primary">iLMiFY</span>, we craft digital experiences that don&apos;t  just exist—they <span className="font-medium text-secondary">resonate</span>. From the pixel-perfect precision of <span className="font-medium">graphic design</span> to the intelligent architecture of <span className="font-medium">AI solutions</span>, we transform your vision into tangible, market-leading reality.
      </p>
        <div className="h-10" />
        <FormElement />
        <ContactCard />
        {/* FORM */}
        <div className="lg:mt-17">
          <MapClient />
        </div>
      </div>
  
  );
};

export default Contact;
