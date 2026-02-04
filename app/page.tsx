"use client";
import HeroSection from "./component/HeroSection";
import ServicesSection from "./component/ServicesSection";
import WhoWeAre from "./component/WhoWeAre";
import WeLoveWhatWeDo from "./component/WeLoveWhatWeDo";
import Support from "./component/Support";
import DigitalFutures from "./component/DigitalFutures";
import ContactCards from "./component/ContactCards";
import LogoSlider from "./component/LogoSlider";
import ShowcaseSection from "./component/ShowcaseSection";
import OverviewSection from "./component/OverviewSection";
import dynamic from 'next/dynamic';
import BlogCard from "./blog/components/BlogCard";
import { useGetBlogsQuery } from "@/redux/service/blogApi";
import Link from "next/link";

const AnimatedMap = dynamic(() => import('./component/AnimatedMap'), { 
  ssr: false 
});

export default function Home() {
  // Fetch only 2 blogs for homepage
  const { data: blogResponse, isLoading } = useGetBlogsQuery({ 
    page: 1, 
    limit: 2 
  });

  const blogs = blogResponse?.data?.blogs || [];
  
  return (
    <main className="overflow-hidden mt-25 md:mt-30 lg:mt-32">
      <HeroSection />

      <ServicesSection />
      
      <WhoWeAre />

      <ShowcaseSection />

      <WeLoveWhatWeDo />

      <Support />

      <OverviewSection />

      <DigitalFutures />

      {/* Blog Section */}
      <section className="bg-background py-16">
        <div className="max-w-400 mx-auto px-4 md:px-10 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Latest <span className="text-[#00D9A6]">Insights</span>
            </h2>
            <p className="text-gray-600">Discover our recent articles and updates</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
            </div>
          ) : (
            <BlogCard 
              blogs={blogs}
              showAnimation={true}
              gridCols="2"
              maxBlogs={2}
            />
          )}

          <div className="text-center mt-28">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              View All Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <AnimatedMap />

      <ContactCards />

      <LogoSlider />
    </main>
  );
}
