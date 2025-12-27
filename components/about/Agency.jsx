// "use client";
// import { Button } from "../ui/button";
// import Image from "next/image";
// import { Typewriter } from "react-simple-typewriter";

// export default function Agency() {
//   return (
//     <div className="container mx-auto my-28  px-4 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#F9F9F9]">
//       {/* Left Content */}
//       <div>
//         <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
//           <span className="text-gray-800">
//             <Typewriter
//               words={["We are a creative"]}
//               loop={1}
//               cursor={false}
//               typeSpeed={80}
//             />
//           </span>
//           <br />
//           <span className="text-gray-800 pr-2">
//             <Typewriter
//               words={["web"]}
//               loop={1}
//               cursor={false}
//               typeSpeed={100}
//               delaySpeed={2200}
//             />
//           </span>

//           <span className="text-green-500">
//             <Typewriter
//               words={["design agency"]}
//               loop={1}
//               cursor={false}
//               typeSpeed={80}
//               delaySpeed={100}
//             />
//           </span>
//         </h1>

//         <div className="flex space-x-2 py-10">
//           <div className="border-3 rounded-2xl border-green-500 w-3"></div>
//           <div className="border-3 rounded-2xl border-green-500 w-10"></div>
//         </div>

//         <p className=" text-gray-600 leading-relaxed">
//           At iLMiFY, we transform ideas into powerful digital solutions. Our
//           team of creative designers, skilled developers, and strategic
//           marketers works together to deliver modern websites, mobile apps,
//           branding, and digital marketing services that help businesses grow and
//           stand out.
//         </p>
//         <p className="mt-6 text-gray-600 leading-relaxed">
//           We believe in innovation, transparency, and results. Every project is
//           a partnership, where we focus on understanding your goals and turning
//           them into impactful digital experiences. With iLMiFY by your side, you
//           don’t just get a service. You gain a trusted technology partner for
//           your business success.
//         </p>

//         <Button className="mt-8 bg-green-500 hover:bg-[#1B1B1B] text-white rounded-full px-8 py-6 ">
//           GET IN TOUCH
//         </Button>
//       </div>

//       {/* Right Image */}
//       <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden">
//         <Image
//           src="/team1.jpg" // replace with your image path
//           alt="Team discussion"
//           fill
//           className="object-cover rounded-lg"
//           priority
//         />
//       </div>
//     </div>
//   );
// }


"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export default function Agency() {
  return (
    <div className="container mx-auto my-28 px-4 md:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#F9F9F9]">
      
      {/* Left Content */}
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          <span className="text-gray-800">
            <Typewriter
              words={["We are a creative"]}
              loop={1}
              cursor={false}
              typeSpeed={80}
            />
          </span>
          <br />
          <span className="text-gray-800 pr-2">
            <Typewriter
              words={["web"]}
              loop={1}
              cursor={false}
              typeSpeed={100}
              delaySpeed={2200}
            />
          </span>

          <span className="text-green-500">
            <Typewriter
              words={["design agency"]}
              loop={1}
              cursor={false}
              typeSpeed={80}
              delaySpeed={100}
            />
          </span>
        </h1>

        <div className="flex space-x-2 py-10">
          <div className="border-3 rounded-2xl border-green-500 w-3"></div>
          <div className="border-3 rounded-2xl border-green-500 w-10"></div>
        </div>

        <p className="text-gray-600 leading-relaxed">
          At iLMiFY, we transform ideas into powerful digital solutions. Our team
          of creative designers, skilled developers, and strategic marketers
          works together to deliver modern websites, mobile apps, branding, and
          digital marketing services that help businesses grow.
        </p>

        <p className="mt-6 text-gray-600 leading-relaxed">
          We believe in innovation, transparency, and results. Every project is a
          partnership focused on long-term success.
        </p>

        <Button className="mt-8 bg-green-500 hover:bg-[#1B1B1B] text-white rounded-full px-8 py-6">
          GET IN TOUCH
        </Button>
      </div>

      {/* Right Image (Animated Reveal) */}
      <motion.div
        className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/team1.jpg"
          alt="Team discussion"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </motion.div>
    </div>
  );
}
