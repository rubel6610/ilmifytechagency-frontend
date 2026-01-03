"use client";
import HeroSection from "./component/HeroSection";
import ServicesSection from "./component/ServicesSection";
import WhoWeAre from "./component/WhoWeAre";
// import Showcase from "./showcase/page";
import WeLoveWhatWeDo from "./component/WeLoveWhatWeDo";
import Support from "./component/Support";
import DigitalFutures from "./component/DigitalFutures";
import BlogPostSection from "./component/BlogPostSection";
import ContactCards from "./component/ContactCards";
import LogoSlider from "./component/LogoSlider";
import Section from "./component/Section";
import ShowcaseSection from "./component/ShowcaseSection";

export default function Home() {
  return (
    <main className="overflow-hidden mt-25 md:mt-28">
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
        <ShowcaseSection />
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
