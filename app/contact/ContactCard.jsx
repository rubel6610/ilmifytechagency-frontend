import React from "react";
import { VscLocation } from "react-icons/vsc";
import { TfiMobile } from "react-icons/tfi";
import { IoMdTime } from "react-icons/io";

// Card data
const cards = [
  {
    title: "ADDRESS",
    icon: VscLocation,
    paragraph: "30 N GOULD ST STE R, SHERIDAN, WY 82801",
  },
  {
    title: "PHONE & EMAIL",
    icon: TfiMobile,
    paragraph: "+1 307 269 6920",
    paragraph2: "info@ilmifytech.com",
  },
  {
    title: "WORKING HOURS",
    icon: IoMdTime,
    paragraph: "Monday - Friday 09.00 - 23.00",
    paragraph2: "Sunday 09.00 - 16.00",
  },
];

const ContactCard = () => {
  return (
    <div className="relative z-10">
      {/* FLOATING EFFECT */}
      <div className="-mt-32 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white shadow-2xl p-10 flex items-start gap-6"
              >
                <Icon className="text-primary text-5xl mt-1" />

                <div>
                  <h3 className="text-lg font-semibold mb-3 tracking-wide">
                    {card.title}
                  </h3>

                 
                    <p className="text-gray-600">
                      {card.paragraph}
                    </p>
                    <p>{card.paragraph2}</p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;


// import React from "react";
// import { VscLocation } from "react-icons/vsc";
// import { TfiMobile } from "react-icons/tfi";
// import { IoMdTime } from "react-icons/io";

// const cards = [
//   {
//     title: "ADDRESS",
//     icon: VscLocation,
//     paragraph: "30 N GOULD ST STE R, SHERIDAN, WY 82801",
//   },
//   {
//     title: "PHONE & EMAIL",
//     icon: TfiMobile,
//     paragraph: "+1 307 269 6920",
//     paragraph2: "info@ilmifytech.com",
//   },
//   {
//     title: "WORKING HOURS",
//     icon: IoMdTime,
//     paragraph: "Monday - Friday 09.00 - 23.00",
//     paragraph2: "Sunday 09.00 - 16.00",
//   },
// ];

// const ContactCard = () => {
//   return (
//     <div className="px-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {cards.map((card, index) => {
//           const Icon = card.icon;

//           return (
//             <div
//               key={index}
//               className="
//                 bg-white
//                 border shadow-2xl
//                 flex flex-col lg:flex-row
//                 items-center
//                 text-center lg:text-left
//                 p-8
//                 min-h-80
//               "
//             >
//               <span className="text-primary text-7xl mb-4 lg:mb-0 lg:mr-4">
//                 <Icon />
//               </span>

//               <div>
//                 <h1 className="text-2xl mb-2">{card.title}</h1>
//                 <p>{card.paragraph}</p>
//                 {card.paragraph2 && <p>{card.paragraph2}</p>}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };


// export default ContactCard;
