"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Button from "@/app/component/button/Button";

export default function ApplyJobForm({ job, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("jobId", job.id);
    formData.append("company", job.companyName);

    console.log("FormData →", Object.fromEntries(formData));

    setTimeout(() => {
      setLoading(false);
      alert("Application submitted successfully!");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center  z-50 " >
      <motion.form
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl mt-20 mx-4 w-full max-w-lg p-6"
      >
        <h2 className="text-xl font-bold mb-4">
          Apply for {job.companyName}
        </h2>

        <div className="space-y-=2">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="fullName"
              required
              placeholder="Full Name"
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              required
              placeholder="Phone Number"
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upload Resume
            </label>
            <input
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Cover Letter (Optional)
            </label>
            <textarea
              name="coverLetter"
              placeholder="Cover Letter (optional)"
              rows="4"
              className="input"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border hover:bg-red-600 hover:text-white hover:scale-105"
          >
            Cancel
          </button>
          <button
          
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-md bg-linear-to-r  from-[#86e062] to-[#00c389] hover:scale-105 text-white font-semibold"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
