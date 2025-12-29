import React from "react";
import MapClient from "./MapClient";

import FormElement from "./FormElement";
import ContactCard from "./ContactCard";


const Contact = () => {
  return (
    <div className="overflow-visible">
      {/* HEADER */}
      <h1 className=" text-[55px] text-primary py-48 md:py-16 text-center bg-[#F9F9F9] font-bold">
        Contact Page
      </h1>
       <div className="">
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
