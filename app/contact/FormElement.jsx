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
    <div className="bg-white rounded-xl shadow-lg p-8 w-400 mt-20 flex-row lg:flex justify-center mx-auto">
        <div className="w-[40%] mr-10">
        <h1 className="text-[54px] font-semibold text-center lg:text-left mx-2">Please get in <span className="text-primary">touch</span><br />
with <span className="text-primary">us</span></h1>
<p className="w-auto text-center lg:text-left">When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary.When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees.</p>
        </div>
      <div className="w-[60%]">
      <h2 className="text-2xl font-semibold mb-10 ">
        Send us a message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <input
            name="name"
            placeholder="Your Name"
            required
            className="w-auto border-b border-black bg-transparent pb-2 outline-none placeholder-gray-400 focus:border-primary transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full border-b border-black bg-transparent pb-2 outline-none placeholder-gray-400 focus:border-primary transition"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Please insert Phone Number"
            className="w-full border-b border-black bg-transparent pb-2 outline-none placeholder-gray-400 focus:border-primary transition"
          />
        </div>

        {/* Message */}

        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          required
          className="w-full px-4 py-3 border-b border-black bg-transparent pb-2 outline-none placeholder-gray-400 focus:border-primary transition"
        />

        {/* Button */}
        <button
          type="submit"
          className="px-8 py-3 bg-primary text-white font-medium hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-green-600">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
    </div>
  );
}
