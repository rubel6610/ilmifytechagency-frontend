"use client";

import { useState } from "react";
import PaymentModal from "./PaymentModal";

// Define the plan type (reuse from your pricing data)
interface PricingPlan {
  name: string;
  price: string; // e.g., "$199"
  deliveryTime: string; // e.g., "5 Days"
  revisions: string; // e.g., "2 Revisions"
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  highlighted?: boolean;
}

export default function PricingCard({ plan, highlighted = false }: PricingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`border rounded-2xl px-8 py-6 transition ${
          highlighted
            ? "border-[#00D9A6] shadow-lg scale-100 min-h-[30rem]"
            : "shadow-sm hover:shadow-lg min-h-[30rem]"
        }`}
      >
        <h3 className="text-xl font-semibold mb-1 text-center">{plan.name}</h3>
        <p className="text-3xl font-bold text-center text-[#00D9A6] mb-2">
          {plan.price}
        </p>
        <p className="text-sm text-gray-500 text-center mb-4">
          {plan.deliveryTime} • {plan.revisions}
        </p>

        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm pb-2">
              <span className="text-[#00D9A6]">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] text-white py-2 rounded-full hover:from-gray-900 hover:to-gray-700 transition disabled:opacity-50"
        >
          Choose Plan
        </button>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={plan}
      />
    </>
  );
}