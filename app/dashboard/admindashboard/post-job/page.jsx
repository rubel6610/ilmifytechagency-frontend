"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion"; // Corrected motion import for framer-motion

/* ---------- Field Component (OUTSIDE render) ---------- */
import { Field } from "./components/Field";

/* ---------- Main Component ---------- */
export default function PostJobPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const onSubmit = (data) => {
    console.log("JOB DATA 👉", data);
    alert("Job Posted Successfully (Demo)");
  };

  let i = 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
        Post New Job
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* ---------- BASIC INFO ---------- */}
        <h3 className="font-semibold text-lg text-[#86e062]">
          Basic Information
        </h3>

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

        {/* ---------- SUMMARY ---------- */}
        <h3 className="font-semibold text-lg text-[#86e062]">
          Job Summary
        </h3>

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

        {/* ---------- REQUIREMENTS ---------- */}
        <h3 className="font-semibold text-lg text-[#86e062]">
          Requirements
        </h3>

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

        {/* ---------- RESPONSIBILITIES ---------- */}
        <h3 className="font-semibold text-lg text-[#86e062]">
          Responsibilities
        </h3>

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
          className="hover:bg-[#00c389] hover:text-white border px-10 mx-4 py-3 rounded-lg font-semibold"
        >
          + Add Responsibility
        </motion.button>

        {/* ---------- SUBMIT ---------- */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#00c389] text-white px-10 mx-4 py-3 rounded-lg font-semibold"
        >
          Post Job
        </motion.button>
      </form>
    </motion.div>
  );
}
