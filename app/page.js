"use client";
import HeroSection from "./component/HeroSection";
import ServicesSection from "./component/ServicesSection";
import WhoWeAre from "./component/WhoWeAre";
import Showcase from "./showcase/page";
import WeLoveWhatWeDo from "./component/WeLoveWhatWeDo";
import Support from "./component/Support";
import DigitalFutures from "./component/DigitalFutures";
import BlogPostSection from "./component/BlogPostSection";
import ContactCards from "./component/ContactCards";
import LogoSlider from "./component/LogoSlider";
import Section from "./component/Section";

export default function Home() {
  return (
    <main className="overflow-hidden mt-30">
      <Section>
        <HeroSection />
      </Section>

      <Section>
        <ServicesSection />
      </Section>

      <Section>
        <WhoWeAre />
      </Section>

      <Section>
        <Showcase />
      </Section>

      <Section>
        <WeLoveWhatWeDo />
      </Section>

      <Section>
        <Support />
      </Section>

      <Section>
        <DigitalFutures />
      </Section>

      <Section>
        <BlogPostSection />
      </Section>

      <Section>
        <ContactCards />
      </Section>

      <Section>
        <LogoSlider />
      </Section>
    </main>
  );
}
