import React from "react";
import ContactCards from "./component/ContactCards";
import ServicesSection from "./component/ServicesSection";
import WhoWeAre from "./component/WhoWeAre";
import WeLoveWhatWeDo from "./component/WeLoveWhatWeDo";
import Support from "./component/Support";
import DigitalFutures from "./component/DigitalFutures";
import LogoSlider from "./component/LogoSlider";
import HeroSection from "./component/HeroSection";
import BlogPostSection from "./component/BlogPostSection";
import Showcase from "./showcase/page";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection/>
      <ServicesSection/>
      <WhoWeAre/>
      <Showcase/>
      <WeLoveWhatWeDo/>
      <Support/>
      <DigitalFutures/>
      <BlogPostSection/>
      <ContactCards/>
      <LogoSlider/>
    </div>
  );
};

export default Home;
