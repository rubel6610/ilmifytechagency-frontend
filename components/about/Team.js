import Image from "next/image";

const teamMembers = [
  {
    name: "Tufael Ahmed Zuarder",
    role: "Operation Manager",
    image: "/team2.png",
    description: "Tufael Ahmed Zuarder is an experienced Operation Manager with a proven track record of optimizing operational processes and driving efficiency within organizations.",
  },
  {
    name: "DEXTER MATTHEW",
    role: "Designer",
    image: "/team3.png",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics",
  },
  {
    name: "RANDY SMITH",
    role: "Project Manager",
    image: "/team4.png",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
  },
  {
    name: "ANGELO GARNER",
    role: "Co-founder",
    image: "/team5.png",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
  },
  {
    name: "JIMMIE BENEDICT",
    role: "Frontend Developer",
    image: "/team6.png",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
  },
  {
    name: "JANET GARNER",
    role: "Founder",
    image: "/team7.png",
    description: "Far far away, behind the word mountains, far from the countries Vokalia and Conson, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics.",
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

