import Image from "next/image";
import Team from "@/components/about/Team";
import Question from "@/components/about/Question";
import Agency from "@/components/about/Agency";
import Vission from "@/components/about/Vission";
import Project from "@/components/about/Project";

export default function AboutPage() {
  return (
    <main>
      <div>
        <h2 className="text-3xl md:text-5xl font-semibold text-center bg-[#F9F9F9] py-14 text-[#00D9A6]">About Page</h2>
      </div>
      <Agency />
      <Vission />
      <Team />
      <Question />
      <Project />
    </main>
  );
}
