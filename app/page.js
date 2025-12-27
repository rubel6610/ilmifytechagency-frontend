import React from "react";
import ContactCards from "./component/ContactCards";
import ServicesSection from "./component/ServicesSection";
import WhoWeAre from "./component/WhoWeAre";

const Home = () => {
  return (
    <div className="">
      <ServicesSection/>
      <WhoWeAre/>
      <ContactCards/>
    </div>
  );
};

export default Home;
