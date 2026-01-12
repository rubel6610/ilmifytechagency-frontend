// "use client";

// import Image from "next/image";
// import SecondaryButton from "@/app/component/button/SecondaryButton";
// import majorServiceData from "./majorServiceData";

// export default function MajorService({ slug }) {
//   const service = majorServiceData.find((s) => s.slug === slug);

//   if (!service) return null;
//   return (
//     <section className="w-full py-20 bg-white">
//       <div className="container mx-auto px-8 space-y-20">
//         <div className="space-y-8">
//           {/* Heading */}
//           <h2 className="text-3xl md:text-5xl font-bold text-center">
//             {service.category}{" "}
//             <span className="text-[#00D9A6]">CMS Services</span>
//           </h2>

//           {/* Divider */}
//           <div className="flex justify-center items-center space-x-2">
//             <div className="border-2 border-[#00C950] w-10"></div>
//             <div className="border-2 border-[#00C950] w-1"></div>
//           </div>

//           {/* Description & Image */}
//           <div className="flex flex-col lg:flex-row items-center md:space-x-10 space-y-6 md:space-y-0">
//             <div className="lg:w-1/2 text-gray-700 text-justify">
//               <p className="mb-4">{service.description}</p>
//               <p className="mb-4 font-semibold text-gray-800">
//                 Here is s a list of potential {service.platform} website
//                 services you can offer:
//               </p>

//               {/* Features List */}
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-600">
//                 {service.features.map((feature, idx) => (
//                   <li key={idx}>{feature}</li>
//                 ))}
//               </ul>

//               {/* CTA Button */}
//               <div className="mt-6 text-center md:text-left">
//                 <SecondaryButton
//                   className="bg-[#00D9A6] text-white px-6 py-3 rounded-full hover:bg-[#00C950]"
//                   address="/contact"
//                   label="Get Started"
//                 />
//               </div>
//             </div>

//             {/* Image */}
//             <div className="lg:w-1/2 relative h-72 md:h-96 w-full">
//               <Image
//                 src={service.image}
//                 alt={service.title}
//                 fill
//                 className="object-contain rounded-xl shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import SecondaryButton from "@/app/component/button/SecondaryButton";
// import majorServiceData from "./majorServiceData";

// export default function MajorService({ slug }) {
//   // ✅ Get ALL services under same slug
//   const services = majorServiceData.filter((service) => service.slug === slug);

//   if (!services.length) return null;

//   return (
//     <section className="w-full py-20 bg-white">
//       <div className="container mx-auto px-8 space-y-20">
//         {/* ================= Page Heading ================= */}
//         <div className="text-center space-y-6">
//           <h2 className="text-3xl md:text-5xl font-bold">
//             {slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//           </h2>

//           <div className="flex justify-center items-center space-x-2">
//             <div className="border-2 border-[#00C950] w-10"></div>
//             <div className="border-2 border-[#00C950] w-1"></div>
//           </div>
//         </div>

//         {/* ================= CMS Services List ================= */}
//         {services.map((service) => (
//           <div
//             key={service.id}
//             className="flex flex-col lg:flex-row items-center gap-10"
//           >
//             {/* TEXT */}
//             <div className="lg:w-1/2 text-gray-700">
//               <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>

//               <p className="mb-4 text-justify">{service.description}</p>

//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-600">
//                 {service.features.map((feature, idx) => (
//                   <li key={idx}>{feature}</li>
//                 ))}
//               </ul>

//               <div className="mt-6">
//                 <SecondaryButton
//                   className="bg-[#00D9A6] text-white px-6 py-3 rounded-full hover:bg-[#00C950]"
//                   address="/contact"
//                   label="Get Started"
//                 />
//               </div>
//             </div>

//             {/* IMAGE */}
//             <div className="lg:w-1/2 relative h-72 md:h-96 w-full">
//               <Image
//                 src={service.image}
//                 alt={service.title}
//                 fill
//                 className="object-contain rounded-xl shadow-lg"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import SecondaryButton from "@/app/component/button/SecondaryButton";
import majorServiceData from "./majorServiceData";

export default function MajorService({ slug }) {
  const services = majorServiceData.filter(
    (service) => service.slug === slug
  );

  if (!services.length) return null;

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-8 space-y-28">
        {/* ================= Page Heading ================= */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            {slug
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </h2>

          <div className="flex justify-center items-center space-x-2">
            <div className="border-2 border-[#00C950] w-10"></div>
            <div className="border-2 border-[#00C950] w-1"></div>
          </div>
        </div>

        {/* ================= Services ================= */}
        {services.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row items-center gap-10 ${
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* TEXT */}
              <div
                className={`lg:w-1/2 text-gray-700 ${
                  !isEven ? "lg:text-left" : ""
                }`}
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {service.title}
                </h3>

                <p className="mb-4 text-justify lg:text-inherit">
                  {service.description}
                </p>

                <ul
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-600 ${
                    !isEven ? "lg:list-inside" : ""
                  }`}
                >
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                <div
                  className={`mt-6 ${
                    !isEven ? "lg:flex lg:justify-start" : ""
                  }`}
                >
                  <SecondaryButton
                    className="bg-[#00D9A6] text-white px-6 py-3 rounded-full hover:bg-[#00C950]"
                    address="/contact"
                    label="Get Started"
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div className="lg:w-1/2 relative h-72 md:h-96 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
