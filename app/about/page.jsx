import Agency from "../component/about/Agency";
import Project from "../component/about/Project";
import Question from "../component/about/Question";
import Team from "../component/about/Team";
import Vision from "../component/about/Vision";

export default function AboutPage() {
  return (
    <main className="mb-30">
      <div>
        <h2 className="text-3xl  md:text-4xl lg:text-5xl font-semibold text-center bg-[#F9F9F9] py-14 text-[#00D9A6]">
          About Page
        </h2>
      </div>
      <Agency />
      <Vision />
      <Team />
      <Question />
      <Project />
    </main>
  );
}
