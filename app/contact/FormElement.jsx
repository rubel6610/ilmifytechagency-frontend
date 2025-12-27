"use client";

import { useState } from "react";

export default function FormElement() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // simulate API request
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setSuccess(true);
    e.target.reset();
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">
        Send us a message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          required
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          name="subject"
          placeholder="Subject"
          className="w-full border rounded-lg px-4 py-3"
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-green-600 text-center">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
}
