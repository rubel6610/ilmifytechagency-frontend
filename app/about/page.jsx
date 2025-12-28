import Agency from "../component/about/Agency";
import Project from "../component/about/Project";
import Question from "../component/about/Question";
import Team from "../component/about/Team";
import Vission from "../component/about/Vission";


export default function AboutPage() {
  return (
    <main>
      <div>
        <h2 className="text-3xl  md:text-4xl lg:text-5xl font-semibold text-center bg-[#F9F9F9] py-14 text-[#00D9A6]">About Page</h2>
      </div>
      <Agency />
      <Vission />
      <Team />
      <Question />
      <Project />
    </main>
  );
}
