import React from "react";
import MapClient from "./MapClient";

import FormElement from "./FormElement";
import ContactCard from "./ContactCard";


const Contact = () => {
  return (
    <div className="overflow-visible">
      {/* HEADER */}
      <h1 className=" text-primary py-10 text-[43px]  sm:text-[43px] text-center bg-[#F9F9F9] font-bold">
        Contact Page
      </h1>
       <div className="lg:mt-17">
         <MapClient />
       </div>
  
      <div className="h-10" />
        <ContactCard />
      {/* FORM */}
      <FormElement />
    </div>
  );
};

export default Contact;
