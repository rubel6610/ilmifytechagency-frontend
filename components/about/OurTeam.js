// components/OurTeam.js
import Image from "next/image";

const teamMembers = [
  { name: "Member 1", role: "Developer", image: "/team2.png" },
  { name: "Member 2", role: "Designer", image: "/team3.png" },
  { name: "Member 3", role: "Manager", image: "/team4.png" },
  { name: "Member 4", role: "HR", image: "/team5.png" },
  { name: "Member 5", role: "Support", image: "/team6.png" },
  { name: "Member 6", role: "CEO", image: "/team7.png" },
];

export default function OurTeam() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-2xl font-semibold text-gray-800">Get to know</h2>
      <p className="text-green-500 font-medium mt-2">our team</p>
      <div className="mt-6 w-20 h-1 bg-green-500 mx-auto mb-10 rounded"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
