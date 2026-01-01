"use client";

import { useState } from "react";
import CustomBorder from "../component/customBorder/CustomBorder";

export default function CommentForm() {
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
    <div className="bg-white rounded-xl p-8  max-w-300 mx-auto  gap-10">
      <div className="w-full py-10  items-center">
      <h2 className="text-[32px] font-semibold mb-10 ">
        Add a Comment
      </h2>
      <p className="mb-10 -mt-5">Your email address will not be published. Required fields are marked *</p>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Top Row */}
       <div className="grid grid-cols-1 gap-10">
  {/* Name */}
  <div className="relative">
    <input
      name="name"
      required
      placeholder=" "
      className="peer w-full border-b-2 border-black bg-transparent pt-6 pb-5 outline-none focus:border-primary"
    />
    <label className="absolute left-0 top-2 text-black transition-all
      peer-placeholder-shown:top-6
      peer-placeholder-shown:text-base
      peer-focus:top-2
      peer-focus:text-sm
      peer-focus:text-primary">
      Name (required)
    </label>
  </div>

  {/* Email */}
  <div className="relative">
    <input
      name="email"
      type="email"
      required
      placeholder=" "
      className="peer w-full border-b-2 border-black bg-transparent pt-6 pb-5 outline-none focus:border-primary"
    />
    <label className="absolute left-0 top-2  transition-all
      peer-placeholder-shown:top-6
      peer-placeholder-shown:text-base
      peer-focus:top-2
      peer-focus:text-sm
      peer-focus:text-primary">
      Email (required)
    </label>
  </div>

  {/* Phone */}
  <div className="relative">
    <input
      name="phone"
      type="url"
      placeholder=" "
      className="peer w-full border-b-2 border-black bg-transparent pt-6 pb-5 outline-none focus:border-primary"
    />
    <label className="absolute left-0 top-2 transition-all
      peer-placeholder-shown:top-6
      peer-placeholder-shown:text-base
      peer-focus:top-2
      peer-focus:text-sm
      peer-focus:text-primary">
      Website
    </label>
  </div>
</div>
<div className="flex items-start gap-3 mt-4 mb-8">
  <input
    id="save-info"
    type="checkbox"
    className="mt-1 h-4 w-4 rounded border-gray-300  cursor-pointer"
  />
  <label 
    htmlFor="save-info" 
    className="text-gray-600 text-sm md:text-base cursor-pointer select-none leading-relaxed"
  >
    Save my name, email, and website in this browser for the next time I comment.
  </label>
</div>

        {/* Message */}

     <div className="relative">
  <textarea
    name="message"
    rows="4"
    required
    placeholder=" "
    className="peer w-full border-b-2 border-black bg-transparent
               pt-6 pb-30 outline-none focus:border-primary
               resize-y "
  />

  <label
    className="absolute left-0 top-2  transition-all
               peer-placeholder-shown:top-6
               peer-placeholder-shown:text-base
               peer-focus:top-2
               peer-focus:text-sm
               peer-focus:text-primary"
  >
    Comment
  </label>
</div>


        {/* Button */}
<div className="flex justify-center lg:justify-end">
  <button
    type="submit"
    className="bg-linear-to-r from-[#86e062] to-[#00c389] text-white px-8 py-3 rounded-full font-semibold shadow-[5px_5px_15px_rgba(16,185,129,0.4)] hover:opacity-90 transition"
  >
    SUBMIT
  </button>
</div>


      </form>
    </div>
    </div>
  );
}