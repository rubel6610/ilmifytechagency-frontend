"use client";
import { useState } from "react";
import PaymentModal from "./PaymentModal";


export default function PricingCard({ plan, highlighted = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`border rounded-2xl px-8 py-6 transition
          ${
            highlighted
              ? "border-[#00D9A6] shadow-lg scale-100 min-h-120"
              : "shadow-sm hover:shadow-lg min-h-120"
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
          className="w-full  bg-linear-to-r
          from-[#0ddaa0]
          to-[#8ce064]
        text-white py-2 rounded-full hover:bg-linear-to-r hover:from-gray-900 hover:to-gray-700 transition"
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
