"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion"; // Corrected motion import for framer-motion
import { Field } from "./components/Field"; // Import your custom Field component
import { useState } from "react";

export default function PostJobPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const [step, setStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({}); // Store form data temporarily

  // Form submit handler
  const onSubmit = (data) => {
    console.log("JOB DATA 👉", data);
    alert("Job Posted Successfully (Demo)");
  };

  // Move to the next step (after validation)
  const handleNext = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
    } else {
      console.log("Validation failed");
    }
  };

  // Go back to the previous step
  const handleBack = () => {
    setStep(step - 1);
  };

  let i = 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
        Post New Job
      </h2>

      {/* Show each step based on the current step */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-semibold text-lg text-[#86e062]">Basic Information</h3>

            <Field label="Job Title" index={i++} error={errors.title?.message}>
              <input
                className="input"
                {...register("title", { required: "Job title is required" })}
              />
            </Field>

            <Field label="Company Name" index={i++} error={errors.companyName?.message}>
              <input
                className="input"
                {...register("companyName", { required: "Company name is required" })}
              />
            </Field>

            <Field label="Company Logo URL" index={i++} error={errors.companyImage?.message}>
              <input
                className="input"
                {...register("companyImage", { required: "Logo URL required" })}
              />
            </Field>

            <Field label="Deadline" index={i++} error={errors.deadline?.message}>
              <input
                type="date"
                className="input"
                {...register("deadline", { required: "Deadline required" })}
              />
            </Field>

            <div className="flex justify-between my-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="bg-[#00c389] text-white px-10 py-3 rounded-lg font-semibold"
                onClick={() => handleNext()}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Job Summary */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-semibold text-lg text-[#86e062]">Job Summary</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Vacancy" index={i++} error={errors.vacancy?.message}>
                <input
                  className="input"
                  {...register("vacancy", { required: "Vacancy required" })}
                />
              </Field>

              <Field label="Age Limit" index={i++} error={errors.age?.message}>
                <input
                  className="input"
                  {...register("age", { required: "Age range required" })}
                />
              </Field>

              <Field label="Location" index={i++} error={errors.location?.message}>
                <input
                  className="input"
                  {...register("location", { required: "Location required" })}
                />
              </Field>

              <Field label="Salary" index={i++} error={errors.salary?.message}>
                <input
                  className="input"
                  {...register("salary", { required: "Salary info required" })}
                />
              </Field>

              <Field label="Experience" index={i++} error={errors.experience?.message}>
                <input
                  className="input"
                  {...register("experience", { required: "Experience required" })}
                />
              </Field>
            </div>

            <div className="flex justify-between my-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="bg-[#00c389] text-white px-10 py-3  rounded-lg font-semibold"
                onClick={handleBack}
              >
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="bg-[#00c389] text-white px-10 py-3 rounded-lg font-semibold"
                onClick={() => handleNext()}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Requirements */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-semibold text-lg text-[#86e062]">Requirements</h3>

            <Field label="Education" index={i++} error={errors.education?.message}>
              <input
                className="input"
                {...register("education", { required: "Education required" })}
              />
            </Field>

            <Field label="Additional Requirements" index={i++}>
              <textarea
                className="input h-28"
                {...register("additional")}
              />
            </Field>

            <div className="flex justify-between my-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="bg-[#00c389] text-white px-10 py-3 rounded-lg font-semibold"
                onClick={handleBack}
              >
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="bg-[#00c389] text-white px-10 py-3 rounded-lg font-semibold"
                onClick={() => handleNext()}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Responsibilities */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-semibold text-lg text-[#86e062]">Responsibilities</h3>

            {fields.map((field, idx) => (
              <div key={field.id} className="flex gap-2">
                <input
                  className="input flex-1"
                  {...register(`responsibilities.${idx}`, {
                    required: "Responsibility required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}

            <motion.button
              type="button"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => append("")}
              className="hover:bg-[#00c389] hover:text-white border px-10  py-3 my-3 rounded-lg font-semibold"
            >
              + Add Responsibility
            </motion.button>

            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="bg-[#00c389] text-white px-10 py-3 rounded-lg font-semibold"
                onClick={handleBack}
              >
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#00c389] text-white px-10 py-3 rounded-lg font-semibold"
              >
                Post Job
              </motion.button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
