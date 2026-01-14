// import PricingData from "../pricing/component/PricingData";
// import PricingCard from "../pricing/component/PricingCard";
// import { notFound } from "next/navigation";

// export default async function PricingPage({ params }) {
//   console.log("PricingPage params:", params);
//   // ✅ Unwrap async params
//   const { slug } = await params;

//   // Find matching pricing data
//   const pricingItem = PricingData.find((item) => item.slug === slug);

//   if (!pricingItem) {
//     notFound(); // 404 page if slug not found
//   }

//   const { pricing, title } = pricingItem;

//   return (
//     <section className="my-28 py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-10">{title}</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {Object.values(pricing).map((plan) => (
//             <PricingCard
//               key={plan.name}
//               plan={plan}
//               highlighted={plan.name === "Standard"} // middle plan highlighted
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import PricingData from "../component/PricingData";
import PricingCard from "../component/PricingCard";
import { notFound } from "next/navigation";

export default function PricingPage({ params }) {
  const { slug } = params;

  const pricingItem = PricingData.find(
    (item) => item.slug === slug
  );

  if (!pricingItem) {
    notFound();
  }

  const { pricing, title } = pricingItem;

  return (
    <section className="my-28 py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(pricing).map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              highlighted={plan.name === "Standard"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
