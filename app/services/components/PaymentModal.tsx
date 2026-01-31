"use client";

import { useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

// Validate Stripe key
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface Plan {
  name: string;
  price: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
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

interface CheckoutFormProps {
  plan: Plan;
  onClose: () => void;
}

function CheckoutForm({ plan, onClose }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const extractAmount = (priceStr: string): number => {
    const numeric = priceStr.replace(/[^\d.-]/g, "");
    const amount = parseFloat(numeric);
    return isNaN(amount) ? 0 : Math.round(amount * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const amount = extractAmount(plan.price);

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!res.ok || !data.client_secret) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: stripeError } = await stripe.confirmCardPayment(
        data.client_secret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
        setLoading(false);
        return;
      }

      // Success
      onClose();
      router.push("/");
    } catch (err) {
      setError((err as Error).message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-4 rounded-md mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-[#0ddaa0] to-[#8ce064] hover:from-gray-900 hover:to-gray-700 text-white py-2 rounded-full transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ${plan.price}`}
      </button>
    </form>
  );
}