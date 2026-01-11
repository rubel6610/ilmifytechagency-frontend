import Agency from "./components/Agency";
import Project from "./components/Project";
import Question from "./components/Question";
import Team from "./components/Team";
import Vision from "./components/Vision";

export default function AboutPage() {
  return (
    <main className="my-30">
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
