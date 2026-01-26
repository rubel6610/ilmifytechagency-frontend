// app/components/PostJob.tsx

"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Field } from "./components/Field";
import { useState, useRef } from "react";
import type { Control, Path } from "react-hook-form";

// ==========================================
// TYPES
// ==========================================

interface JobLocation {
  city: string;
  district: string;
  country: string;
}

interface JobSummary {
  applicationDeadline: string;
  ageLimit: string;
  experienceRequired: string;
  gender: "Any" | "Male" | "Female";
  freshersAllowed: boolean;
}

interface EmploymentInfo {
  workplaceType: "Hybrid" | "Onsite";
  remoteAllowed: boolean;
  jobLocation: JobLocation;
}

interface Salary {
  range: string;
  negotiable: boolean;
  type: "Monthly" | "Yearly" | "Hourly";
}

interface SalaryAndBenefits {
  salary: Salary;
}

interface JobRequirements {
  education: string;
}

interface JobDescription {
  overview: string;
  requirements: JobRequirements;
  responsibilities: string[];
}

interface AdminControl {
  featured: boolean;
  priority: "Low" | "Medium" | "High";
}

export interface FormData {
  title: string;
  jobCategory: string;
  jobType: "Full Time" | "Part Time";
  jobLevel: "Mid Level" | "Senior Level" | "Entry Level";
  photo: File | null;
  jobSummary: JobSummary;
  employmentInfo: EmploymentInfo;
  salaryAndBenefits: SalaryAndBenefits;
  jobDescription: JobDescription;
  skillsAndExpertise: string[];
  adminControl: AdminControl;
}

interface PostJobProps {
  onClose: (isOpen: boolean) => void;
}

// ==========================================
// DEFAULT VALUES
// ==========================================

const defaultValues: FormData = {
  title: "",
  jobCategory: "",
  jobType: "Full Time",
  jobLevel: "Mid Level",
  photo: null,
  jobSummary: {
    applicationDeadline: "",
    ageLimit: "",
    experienceRequired: "",
    gender: "Any",
    freshersAllowed: false,
  },
  employmentInfo: {
    workplaceType: "Hybrid",
    remoteAllowed: false,
    jobLocation: {
      city: "",
      district: "",
      country: "Bangladesh",
    },
  },
  salaryAndBenefits: {
    salary: {
      range: "",
      negotiable: false,
      type: "Monthly",
    },
  },
  jobDescription: {
    overview: "",
    requirements: {
      education: "",
    },
    responsibilities: [""],
  },
  skillsAndExpertise: [""],
  adminControl: {
    featured: false,
    priority: "Medium",
  },
};

// Usage:
// Helper to safely create field array paths
const createFieldArrayPath = <T,>(path: Path<T>) => path;

// Usage:
const responsibilitiesPath = createFieldArrayPath<FormData>("jobDescription.responsibilities");
const skillsPath = createFieldArrayPath<FormData>("skillsAndExpertise");
// ==========================================
// MAIN COMPONENT
// ==========================================

export default function PostJob({ onClose }: PostJobProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues,
  });

const {
  fields: respFields,
  append: appendResp,
  remove: removeResp,
} = useFieldArray<FormData>({
  control,
  name: "jobDescription.responsibilities" as never, // ✅ Temporary fix
});


const {
  fields: skillsFields,
  append: appendSkills,
  remove: removeSkills,
} = useFieldArray<FormData>({
  control,
  name: skillsPath as never, // ✅ Temporary fix
});

  const salaryNegotiable = useWatch({
    control,
    name: "salaryAndBenefits.salary.negotiable",
  });

  const remoteAllowed = useWatch({
    control,
    name: "employmentInfo.remoteAllowed",
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

const stepFields = {
  1: [
    "title",
    "jobCategory",
    "jobType",
    "jobLevel",
    "photo",
    "jobSummary.applicationDeadline",
  ] as Path<FormData>[],
  2: [
    "jobSummary.ageLimit",
    "jobSummary.experienceRequired",
    "employmentInfo.jobLocation.city",
    "employmentInfo.jobLocation.district",
    "employmentInfo.jobLocation.country",
    "employmentInfo.workplaceType",
    "employmentInfo.remoteAllowed",
    "jobSummary.gender",
    "jobSummary.freshersAllowed",
  ] as Path<FormData>[],
  3: [
    "salaryAndBenefits.salary.range",
    "salaryAndBenefits.salary.negotiable",
    "jobDescription.requirements.education",
  ] as Path<FormData>[],
  4: [
    "jobDescription.responsibilities",
    "skillsAndExpertise",
    "jobDescription.overview",
    "adminControl.featured",
    "adminControl.priority",
  ] as Path<FormData>[],
} as const;

const handleNext = async () => {
  const fieldsToValidate = stepFields[step as keyof typeof stepFields];
  const isValid = await trigger(fieldsToValidate as any);
  if (!isValid) {
    const firstError = document.querySelector(".text-red-500");
    firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  setFormData((prev) => ({ ...prev, ...getValues() }));
  setStep((prev) => prev + 1);
};

  const handleBack = () => {
    setFormData((prev) => ({ ...prev, ...getValues() }));
    setStep((prev) => prev - 1);
  };

  const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue("salaryAndBenefits.salary.negotiable", checked);
    if (checked) setValue("salaryAndBenefits.salary.range", "Negotiable");
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Final validation
         for (const stepKey of [1, 2, 3, 4] as const) {
            const fields = stepFields[stepKey];
      const isValid = await trigger(fields); // ✅ No 'as any' needed
    if (!isValid) {
        alert(`Complete step ${stepKey}`);
        setStep(stepKey);
        setIsSubmitting(false);
        return;
      }
      }

      // Merge final form data
      const finalData = { ...formData, ...data };
      console.log("Final Job Data:", finalData);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Job Posted Successfully!");

      setStep(1);
      setFormData({});
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      alert("Error posting job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 " onClick={() => onClose(false)}>
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        {/* Progress timeline */}
        <div className="mb-8 relative">
          <h2 className="text-2xl font-bold mb-2 text-center text-slate-800">
            Post New Job
          </h2>

          <div className="flex items-center justify-between mt-6 relative">
            {/* Horizontal lines */}
            <div className="absolute left-0 right-0 top-5 flex">
              {[1, 2, 3].map((lineIdx) => (
                <motion.div
                  key={lineIdx}
                  className={`h-1 ms-4 flex-1 ${
                    step > lineIdx ? "bg-[#00c389]" : "bg-gray-200"
                  }`}
                  initial={false}
                  animate={{ scaleX: step > lineIdx ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              ))}
            </div>

            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  initial={false}
                  animate={{ scale: step === stepNumber ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? "bg-[#00c389] text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </motion.div>
                <span className="text-xs mt-2 text-gray-600 capitalize ">
                  {
                    ["Basic Info", "Employment", "Requirements", "Details"][
                      stepNumber - 1
                    ]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-5xl mx-auto"
        >
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 w-full min-h-[520px]">
              <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
                Basic Information
              </h3>
              <Field label="Job Title *" error={errors.title?.message as string}>
                <input
                  className="input"
                  {...register("title", {
                    required: "Required",
                    minLength: { value: 3, message: "Min 3 chars" },
                  })}
                  placeholder="Frontend Developer (React.js)"
                />
              </Field>

              <Field label="Job Category *" error={errors.jobCategory?.message as string}>
                <input
                  className="input"
                  {...register("jobCategory", { required: "Required" })}
                  placeholder="IT / Software"
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                <Field label="Job Type *" error={errors.jobType?.message as string}>
                  <select
                    className="input"
                    {...register("jobType", { required: "Required" })}
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                  </select>
                </Field>
                <Field label="Job Level *" error={errors.jobLevel?.message as string}>
                  <select
                    className="input"
                    {...register("jobLevel", { required: "Required" })}
                  >
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                    <option>Entry Level</option>
                  </select>
                </Field>
              </div>

              <Field
                label="Application Deadline *"
                error={errors.jobSummary?.applicationDeadline?.message as string}
              >
                <input
                  type="date"
                  className="input"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("jobSummary.applicationDeadline", {
                    required: "Required",
                    validate: (v) => new Date(v) >= new Date() || "Future date",
                  })}
                />
              </Field>

              <div className="flex justify-center lg:justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#00c389] hover:bg-[#00b37d] text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Next: Employment →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-1 md:spacy-8 lg:space-y-6  w-full min-h-[520px]">
              <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
                Employment Summary
              </h3>

              {/* Employment fields */}
              <div className="grid md:grid-cols-2 gap-4 w-full">
                <Field
                  label="Age Limit *"
                  error={errors.jobSummary?.ageLimit?.message as string}
                >
                  <input
                    className="input"
                    {...register("jobSummary.ageLimit", {
                      required: "Required",
                    })}
                    placeholder="23–35 Years"
                  />
                </Field>
                <Field
                  label="Experience Required *"
                  error={errors.jobSummary?.experienceRequired?.message as string}
                >
                  <input
                    className="input"
                    {...register("jobSummary.experienceRequired", {
                      required: "Required",
                    })}
                    placeholder="2–4 Years"
                  />
                </Field>
              </div>

              <h4 className="font-semibold text-xl text-[#00c389] border-b pb-2">
                Job Location
              </h4>
              <div className="grid md:grid-cols-3 gap-4 w-full">
                <Field
                  label="City *"
                  error={errors.employmentInfo?.jobLocation?.city?.message as string}
                >
                  <input
                    className="input"
                    {...register("employmentInfo.jobLocation.city", {
                      required: "Required",
                    })}
                    placeholder="Uttara"
                  />
                </Field>
                <Field
                  label="District *"
                  error={errors.employmentInfo?.jobLocation?.district?.message as string}
                >
                  <input
                    className="input"
                    {...register("employmentInfo.jobLocation.district", {
                      required: "Required",
                    })}
                    placeholder="Dhaka"
                  />
                </Field>
                <Field
                  label="Country *"
                  error={errors.employmentInfo?.jobLocation?.country?.message as string}
                >
                  <input
                    className="input"
                    {...register("employmentInfo.jobLocation.country", {
                      required: "Required",
                    })}
                    placeholder="Bangladesh"
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-2 w-full">
                <Field
                  label="Workplace Type *"
                  error={errors.employmentInfo?.workplaceType?.message as string}
                >
                  <select
                    className={`input w-full ${
                      remoteAllowed ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    disabled={remoteAllowed}
                    {...register("employmentInfo.workplaceType", {
                      required: !remoteAllowed && "Required",
                    })}
                  >
                    <option>Hybrid</option>
                    <option>Onsite</option>
                  </select>
                </Field>

                {/* Remote Allowed */}
                <div className="flex items-center  ">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      {...register("employmentInfo.remoteAllowed")}
                    />
                    Remote Allowed
                  </label>
                </div>
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register("jobSummary.freshersAllowed")}
                  />
                  Freshers Allowed
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-xs lg:text-lg px-2  lg:px-8 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#00c389] hover:bg-[#00b37d] text-xs lg:text-lg text-white px-2 lg:px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Next: Requirements →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-3 lg:space-y-6  w-full min-h-130">
              <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
                Salary & Requirements
              </h3>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                <Field
                  label="Salary Range *"
                  error={errors.salaryAndBenefits?.salary?.range?.message as string}
                >
                  <input
                    className="input"
                    placeholder="10,000 – 20,000"
                    disabled={salaryNegotiable}
                    {...register("salaryAndBenefits.salary.range", {
                      required: !salaryNegotiable && "Required",
                    })}
                  />
                </Field>

                <div className="space-y-3">
                  <label className="flex items-center font-medium">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      onChange={handleNegotiableChange}
                    />
                    Salary Negotiable
                  </label>
                  {salaryNegotiable && (
                    <p className="text-sm text-gray-600">
                      Salary set to Negotiable
                    </p>
                  )}
                </div>
              </div>
              {/* Skills */}
              <div>
                <label className="text-sm font-medium text-gray-700  block">
                  Skills & Expertise *
                </label>
                {skillsFields.map((field, idx) => (
                  <div key={field.id} className="flex gap-2 items-start mb-3">
                    <input
                      className="input flex-1"
                      {...register(`skillsAndExpertise.${idx}` as const, {
                        required: "Cannot be empty",
                      })}
                    />
                    {skillsFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkills(idx)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendSkills("")}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-[#00c389] p-4 rounded-lg text-gray-600 hover:text-[#00c389] transition-all"
                >
                  + Add Skill
                </button>
              </div>

              <Field
                label="Education *"
                error={errors.jobDescription?.requirements?.education?.message as string}
              >
                <input
                  className="input"
                  {...register("jobDescription.requirements.education", {
                    required: "Required",
                  })}
                  placeholder="BSc in CSE or equivalent"
                />
              </Field>
              <div className="my-6 w-full">
                <label className="text-sm font-medium text-gray-700">
                  Gender
                </label>

                <div className="flex items-center gap-6 flex-wrap">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Any"
                      {...register("jobSummary.gender")}
                      className="mr-2"
                    />
                    Any
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      {...register("jobSummary.gender")}
                      className="mr-2"
                    />
                    Male
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      {...register("jobSummary.gender")}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-2 lg:px-8 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#00c389] hover:bg-[#00b37d] text-white px-2 lg:px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Next: Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-2 lg:space-y-5  w-full min-h-130">
              <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
                Job Details
              </h3>

              <Field label="Job Overview">
                <textarea
                  className="input h-60 lg:h-48"
                  {...register("jobDescription.overview")}
                  placeholder="Looking for a skilled React developer..."
                />
              </Field>

              {/* Responsibilities */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Responsibilities *
                </label>
                {respFields.map((field, idx) => (
                  <div key={field.id} className="flex gap-2 items-start mb-3">
                    <input
                      className="input flex-1"
                      {...register(`jobDescription.responsibilities.${idx}` as const, {
                        required: "Cannot be empty",
                      })}
                    />
                    {respFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResp(idx)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendResp("")}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-[#00c389] p-4 rounded-lg text-gray-600 hover:text-[#00c389] transition-all"
                >
                  + Add Responsibility
                </button>
              </div>

              <div className="flex justify-between pt-5">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-2 lg:px-8 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00c389] hover:bg-[#00b37d] text-white px-2 lg:px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Post Job"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}