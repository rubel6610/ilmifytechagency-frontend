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
import ShowcaseSection from "./component/ShowcaseSection";
import OverviewSection from "./component/OverviewSection";

export default function Home() {
  return (
    <main className="overflow-hidden mt-25 md:mt-30 lg:mt-32">
<<<<<<< HEAD
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
        <OverviewSection/>
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
=======
      {/* hero section */}
      <HeroSection />
      {/* Service section */}
      <ServicesSection />
      {/* who we are */}
      <WhoWeAre />
      {/* Showcase section */}
      <ShowcaseSection />
      {/* we love what we do */}
      <WeLoveWhatWeDo />
      {/* Support */}
      <Support />
      {/* Digital Futures */}
      <DigitalFutures />
      {/* BlogPostSection */}
      <BlogPostSection />
      {/* Contact Cards */}
      <ContactCards />
      {/* Logo Slider */}
      <LogoSlider />
>>>>>>> d58ffacb913c038a32d5279cc2222edaadc11e04
    </main>
  );
}
