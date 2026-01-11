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
        <p className="w-350 my-6 mx-auto">Let’s Build Something Great Together
At iLMiFY, we help businesses grow with innovative digital solutions. From eye-catching graphic design and strategic digital marketing to custom web, app, and AI development, we provide services that make your brand stand out and reach your audience effectively.
Whether you need a new website, a mobile app, a brand refresh, or advanced AI solutions, our expert team delivers tailored, scalable, and results-driven solutions.
Reach out today to discuss your project — let’s turn your ideas into reality and take your business to the next level.</p>
      <p className="w-350 mx-auto text-lg md:text-xl text-gray-700 leading-relaxed text-center font-light">
        At <span className="font-semibold text-primary">iLMiFY</span>, we craft digital experiences that don't just exist—they <span className="font-medium text-secondary">resonate</span>. From the pixel-perfect precision of <span className="font-medium">graphic design</span> to the intelligent architecture of <span className="font-medium">AI solutions</span>, we transform your vision into tangible, market-leading reality.
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
