// // components/OurTeam.js
// import Image from "next/image";

// const teamMembers = [
//   { name: "Member 1", role: "Developer", image: "/team2.png" },
//   { name: "Member 2", role: "Designer", image: "/team3.png" },
//   { name: "Member 3", role: "Manager", image: "/team4.png" },
//   { name: "Member 4", role: "HR", image: "/team5.png" },
//   { name: "Member 5", role: "Support", image: "/team6.png" },
//   { name: "Member 6", role: "CEO", image: "/team7.png" },
// ];

// export default function Team() {
//   return (
//     <section className="my-12 py-16 bg-white text-center">
//       <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
//         Get to know
//       </h2>
//       <p className="text-2xl md:text-4xl font-semibold text-green-500  mt-2">
//         our team
//       </p>
//       <div className="flex justify-center space-x-2 py-10">
//         <div className="border-3 rounded-2xl border-green-500 w-3"></div>
//         <div className="border-3 rounded-2xl border-green-500 w-10"></div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {teamMembers.map((member, index) => (
//           <div
//             key={index}
//             className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
//           >
//             <Image
//               src={member.image}
//               alt={member.name}
//               width={400}
//               height={400}
//               className="w-full h-80 object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// components/OurTeam.js
import Image from "next/image";

const teamMembers = [
  {
    name: "Member 1",
    role: "Developer",
    image: "/team2.png",
    description: "Expert in frontend and backend development.",
  },
  {
    name: "Member 2",
    role: "Designer",
    image: "/team3.png",
    description: "Creative UI/UX designer with modern ideas.",
  },
  {
    name: "Member 3",
    role: "Manager",
    image: "/team4.png",
    description: "Ensures smooth project execution and delivery.",
  },
  {
    name: "Member 4",
    role: "HR",
    image: "/team5.png",
    description: "Manages talent and company culture.",
  },
  {
    name: "Member 5",
    role: "Support",
    image: "/team6.png",
    description: "Always ready to help our customers.",
  },
  {
    name: "Member 6",
    role: "CEO",
    image: "/team7.png",
    description: "Visionary leader driving company growth.",
  },
];

export default function Team() {
  return (
    <section className="my-12 py-16 bg-white text-center">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
        Get to know
      </h2>
      <p className="text-2xl md:text-4xl font-semibold text-green-500 mt-2">
        our team
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-10">
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
              height={400}
              className="w-full h-80 object-cover"
            />

            {/* Hover Card Overlay */}
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white px-4 opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-green-400 font-medium mt-1">
                {member.role}
              </p>
              <p className="text-sm mt-3">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

