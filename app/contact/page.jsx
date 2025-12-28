import React from "react";
import MapClient from "../component/MapClient";
import ContactCard from "./ContactCard";
import FormElement from "./FormElement";
import ContactMap from "../component/ContactMap";

const Contact = () => {
  return (
    <div className="overflow-visible">
      {/* HEADER */}
      <h1 className="text-[43px] text-primary py-12 text-center bg-[#F9F9F9] font-bold">
        Contact Page
      </h1>

      {/* MAP */}
      <section className="h-[70vh] w-full">
        {/* <MapClient /> */}
        <MapClient />
      </section>


      {/* SPACER (VERY IMPORTANT) */}
      {/* This creates space so cards are NOT hidden */}
      <div className="h-40" />

      {/* CONTACT CARDS */}
      <section className="-mt-40 relative z-20">
        <ContactCard />
      </section>

      {/* FORM */}
      <FormElement />
    </div>
  );
};

export default Contact;
