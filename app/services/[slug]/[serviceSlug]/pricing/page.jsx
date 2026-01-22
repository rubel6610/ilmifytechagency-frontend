"use client";

import { useParams } from "next/navigation";
import PricingData from "../../../components/PricingData";
import PricingCard from "../../../components/PricingCard";

export default function PricingPage() {
  const params = useParams();
  const { slug, serviceSlug } = useParams();

  const pricing = PricingData.find(
    (item) => item.slug === slug &&
      item.serviceSlug === serviceSlug
  );

  if (!pricing) {
    return (
      <div className="py-40 text-center">
        <p className="text-lg font-medium">No pricing found</p>
      </div>
    );
  }

  return (
    <section className="py-20 container mx-auto">
      <h1 className="text-4xl font-bold text-center pt-30 pb-20">
        Choose Your Plan for <br />
        <span className="text-[#0ddaa0] pt-4">{pricing.title}</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 mx-4 lg:mx-20">
        {Object.values(pricing.pricing).map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            highlighted={plan.name === "Standard"}
          />
        ))}
      </div>
    </section>
  );
}
