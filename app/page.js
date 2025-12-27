import React from "react";
import ContactCards from "./component/ContactCards";
import ServicesSection from "./component/ServicesSection";
import WhoWeAre from "./component/WhoWeAre";
import WeLoveWhatWeDo from "./component/WeLoveWhatWeDo";

const Home = () => {
  return (
    <div className="">
      <ServicesSection/>
      <WhoWeAre/>
      <WeLoveWhatWeDo/>
      <ContactCards/>
    </div>
  );
};

export default Home;
