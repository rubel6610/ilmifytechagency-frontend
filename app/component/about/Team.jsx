"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";

const teamMembers = [
  {
    name: "Tufael Ahmed Zuarder",
    role: "Operation Manager",
    image: "/team2.png",
    description:
      "Tufael Ahmed Zuarder is an experienced Operation Manager with a proven track record of optimizing operational processes and driving efficiency within organizations.",
  },
  {
    name: "DEXTER MATTHEW",
    role: "Designer",
    image: "/team3.png",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics",
  },
  {
    name: "RANDY SMITH",
    role: "Project Manager",
    image: "/team4.png",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
  },
  {
    name: "ANGELO GARNER",
    role: "Co-founder",
    image: "/team5.png",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
  },
  {
    name: "JIMMIE BENEDICT",
    role: "Frontend Developer",
    image: "/team6.png",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
  },
  {
    name: "JANET GARNER",
    role: "Founder",
    image: "/team7.png",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
  },
];

export default function Team() {
  const slideUpVariants = {
    hidden: { y: 50, opacity: 0 }, // start 50px below and invisible
    visible: {
      y: 0, // final position
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }, // smooth animation
    },
  };
  return (
    <section className="max-w-400 mx-auto my-12 py-24 bg-white text-center">

      <motion.h2
        className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }} // animate once when 60% visible
        variants={slideUpVariants}
      >
        Get to know
        <br />
        <br />
        <span className="text-[#00D9A6]">our team</span>
      </motion.h2>

      <div className="flex space-x-2 py-10 justify-center">
        <div className="border-3 rounded-2xl border-[#98DD5F] w-3"></div>
        <div className="border-3 rounded-2xl border-[#98DD5F] w-10"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden shadow-lg"
          >
            {/* Image */}
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={500}
              className="w-full h-72 lg:h-96 object-cover px-4"
            />

            {/* Hover Card Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-12 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-[#00D9A6]/90 to-[#97DD60] to-99%">
              <h3 className="text-2xl font-medium">{member.name}</h3>
              <p className="font-medium mt-1">{member.role}</p>
              <p className="text-start text-sm mt-3 py-4">
                {member.description}
              </p>
              <div className="border border-gray-100 w-full mt-10 mb-6"></div>
              <div className="flex space-x-4 text-lg">
                <FaFacebookF />
                <FaTwitter />
                <FaPinterestP />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// "use client";

// import Image from "next/image";
// import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
// import { motion } from "framer-motion";

// const teamMembers = [
//   {
//     name: "Tufael Ahmed Zuarder",
//     role: "Operation Manager",
//     image: "/team2.png",
//     description:
//       "Tufael Ahmed Zuarder is an experienced Operation Manager with a proven track record of optimizing operational processes and driving efficiency within organizations.",
//   },
//   {
//     name: "DEXTER MATTHEW",
//     role: "Designer",
//     image: "/team3.png",
//     description:
//       "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics",
//   },
//   {
//     name: "RANDY SMITH",
//     role: "Project Manager",
//     image: "/team4.png",
//     description:
//       "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
//   },
//   {
//     name: "ANGELO GARNER",
//     role: "Co-founder",
//     image: "/team5.png",
//     description:
//       "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
//   },
//   {
//     name: "JIMMIE BENEDICT",
//     role: "Frontend Developer",
//     image: "/team6.png",
//     description:
//       "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
//   },
//   {
//     name: "JANET GARNER",
//     role: "Founder",
//     image: "/team7.png",
//     description:
//       "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
//   },
// ];

// export default function Team() {
//   // Overlay motion variants
//   const overlayVariants = {
//     hidden: { opacity: 0, scaleY: 0, originY: 0.5 }, // start from center
//     visible: { opacity: 1, scaleY: 1, originY: 0.5, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   return (
//     <section className="my-12 py-24 bg-white text-center">
//       <h2 className="text-2xl md:text-5xl font-semibold text-gray-800">Get to know</h2>
//       <p className="text-2xl md:text-5xl font-semibold text-green-500 mt-2">our team</p>

//       <div className="flex space-x-2 py-10 justify-center">
//         <div className="border-3 rounded-2xl border-[#98DD5F] w-3"></div>
//         <div className="border-3 rounded-2xl border-[#98DD5F] w-10"></div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-10">
//         {teamMembers.map((member, index) => (
//           <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg">
//             {/* Image */}
//             <Image
//               src={member.image}
//               alt={member.name}
//               width={400}
//               height={500}
//               className="w-full h-96 object-cover"
//             />

//             {/* Hover Overlay using Framer Motion */}
//             <motion.div
//               initial="hidden"
//               whileHover="visible"
//               variants={overlayVariants}
//               className="absolute inset-0 bg-black/70 flex flex-col justify-center items-start text-white px-12"
//             >
//               <h3 className="text-2xl font-medium">{member.name}</h3>
//               <p className="font-medium mt-1">{member.role}</p>
//               <p className="text-start text-sm mt-3 py-4">{member.description}</p>
//               <div className="border border-gray-100 w-full mt-10 mb-6"></div>
//               <div className="flex space-x-4 text-lg">
//                 <FaFacebookF />
//                 <FaTwitter />
//                 <FaPinterestP />
//               </div>
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// "use client"; // must be at the top

// import Image from "next/image";
// import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
// import { motion } from "framer-motion";

// const teamMembers = [
//   {
//     name: "Tufael Ahmed Zuarder",
//     role: "Operation Manager",
//     image: "/team2.png",
//     description:
//       "Tufael Ahmed Zuarder is an experienced Operation Manager with a proven track record of optimizing operational processes and driving efficiency within organizations.",
//   },
//   // ... other members
// ];

// export default function Team() {
//   // Framer Motion variants for overlay
//   const overlayVariants = {
//     hidden: { opacity: 0, scaleY: 0, originY: 0.5 },
//     visible: { opacity: 1, scaleY: 1, originY: 0.5, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   return (
//     <section className="my-12 py-24 bg-white text-center">
//       <h2 className="text-2xl md:text-5xl font-semibold text-gray-800">Get to know</h2>
//       <p className="text-2xl md:text-5xl font-semibold text-green-500 mt-2">our team</p>

//       <div className="flex space-x-2 py-10 justify-center">
//         <div className="border-3 rounded-2xl border-[#98DD5F] w-3"></div>
//         <div className="border-3 rounded-2xl border-[#98DD5F] w-10"></div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-10">
//         {teamMembers.map((member, index) => (
//           <div
//             key={index}
//             className="relative rounded-lg overflow-hidden shadow-lg"
//           >
//             {/* Image */}
//             <Image
//               src={member.image}
//               alt={member.name}
//               width={400}
//               height={500}
//               className="w-full h-96 object-cover"
//             />

//             {/* Hover Overlay */}
//             <motion.div
//               initial="hidden"
//               variants={overlayVariants}
//               whileHover="visible" // animate when hovering THIS motion.div
//               className="absolute inset-0 bg-black/70 flex flex-col justify-center items-start text-white px-8 md:px-12"
//             >
//               <h3 className="text-2xl font-medium">{member.name}</h3>
//               <p className="font-medium mt-1">{member.role}</p>
//               <p className="text-start text-sm mt-3 py-4">{member.description}</p>
//               <div className="border border-gray-100 w-full mt-10 mb-6"></div>
//               <div className="flex space-x-4 text-lg">
//                 <FaFacebookF />
//                 <FaTwitter />
//                 <FaPinterestP />
//               </div>
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
