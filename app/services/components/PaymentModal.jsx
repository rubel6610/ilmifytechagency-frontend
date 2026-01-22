"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

// Stripe public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentModal({ isOpen, onClose, plan }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">{plan.name}</h2>
        <p className="text-center text-gray-600 mb-6">{plan.price}</p>

        <Elements stripe={stripePromise}>
          <CheckoutForm plan={plan} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
}

function CheckoutForm({ plan, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt((plan?.price || "0").replace("$", "")) * 100, // convert $ to cents
        }),
      });
      const data = await res.json();

      if (!data.client_secret) throw new Error(data.error || "Payment failed");

      const cardElement = elements.getElement(CardElement);

      const { error: stripeError } = await stripe.confirmCardPayment(
        data.client_secret,
        {
          payment_method: { card: cardElement },
        },
      );

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // Payment successful
      onClose();
      router.push("/");
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-4 rounded-md mb-4">
        <CardElement />
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-linear-to-r
          from-[#0ddaa0]
          to-[#8ce064] hover:bg-linear-to-r hover:from-gray-900 hover:to-gray-700  text-white py-2 rounded-full  transition"
      >
        {loading ? "Processing..." : `Pay ${plan.price}`}
      </button>
    </form>
  );
}
