import React from "react";
import ContactCards from "./component/ContactCards";
import ServicesSection from "./component/ServicesSection";
import WhoWeAre from "./component/WhoWeAre";
import WeLoveWhatWeDo from "./component/WeLoveWhatWeDo";
import Support from "./component/Support";
import DigitalFutures from "./component/DigitalFutures";
import LogoSlider from "./component/LogoSlider";
import ShowcaseSection from "./component/ShowcaseSection";

const Home = () => {
  return (
    <div className="">
      <ServicesSection/>
      <WhoWeAre/>
      <ShowcaseSection/>
      <WeLoveWhatWeDo/>
      <Support/>
      <DigitalFutures/>
      <ContactCards/>
      <LogoSlider/>
    </div>
  );
};

export default Home;
