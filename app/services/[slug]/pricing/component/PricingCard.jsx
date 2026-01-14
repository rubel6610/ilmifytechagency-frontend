export default function PricingCard({ plan, highlighted = false }) {
  return (
    <div
      className={`border rounded-2xl p-6 transition
        ${highlighted
          ? "border-[#00D9A6] shadow-lg scale-105"
          : "shadow-sm hover:shadow-lg"
        }`}
    >
      <h3 className="text-xl font-semibold mb-1 text-center">
        {plan.name}
      </h3>

      <p className="text-3xl font-bold text-center text-[#00D9A6] mb-2">
        {plan.price}
      </p>

      <p className="text-sm text-gray-500 text-center mb-4">
        {plan.deliveryTime} • {plan.revisions}
      </p>

      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm"
          >
            <span className="text-[#00D9A6]">✔</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className="w-full bg-[#00D9A6] text-white py-2 rounded-full
        hover:bg-[#00C950] transition focus:outline-none focus:ring-2 focus:ring-[#00D9A6]"
      >
        Continue
      </button>
    </div>
  );
}
