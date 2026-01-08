"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { Field } from "./components/Field";
import { useState, useRef } from "react";
import Image from "next/image";

export default function PostJobPage() {
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    clearErrors,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      responsibilities: [""],
      photo: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Fields to validate per step */
  const stepFields = {
    1: ["title", "companyName", "photo", "deadline"],
    2: ["vacancy", "age", "location", "salary", "experience"],
    3: ["education"],
    4: ["responsibilities"],
  };

  /** Image Upload Handler */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("photo", {
        type: "manual",
        message: "Please upload a valid image (JPEG, PNG, WebP)",
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("photo", {
        type: "manual",
        message: "Image size should be less than 5MB",
      });
      return;
    }

    // Clear any existing errors
    clearErrors("photo");

    // Set form value
    setValue("photo", file, { shouldValidate: true });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  /** Remove Image */
  const removeImage = () => {
    setPreview(null);
    setValue("photo", null, { shouldValidate: true });
    setError("photo", {
      type: "manual",
      message: "Photo is required",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /** Trigger file input click */
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /** Navigation */
  const handleNext = async () => {
    // Trigger validation for current step
    const fieldsToValidate = stepFields[step];
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      // Scroll to first error
      const firstError = document.querySelector(".text-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Save current step data
    const currentValues = getValues();
    setFormData((prev) => ({ ...prev, ...currentValues }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    // Save current step data before going back
    const currentValues = getValues();
    setFormData((prev) => ({ ...prev, ...currentValues }));
    setStep((prev) => prev - 1);
  };

  /** Custom validation for photo */
  const validatePhoto = (value) => {
    if (!value) {
      return "Photo is required";
    }

    // If value is a File object
    if (value instanceof File) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(value.type)) {
        return "Please upload a valid image (JPEG, PNG, WebP)";
      }

      const maxSize = 5 * 1024 * 1024;
      if (value.size > maxSize) {
        return "Image size should be less than 5MB";
      }
    }

    return true;
  };

  /** Final submit handler */
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Validate all steps before final submission
      let allValid = true;
      let firstInvalidStep = 1;

      for (const stepKey in stepFields) {
        const isValid = await trigger(stepFields[stepKey]);
        if (!isValid) {
          allValid = false;
          firstInvalidStep = parseInt(stepKey);
          break;
        }
      }

      if (!allValid) {
        alert(
          `Please complete all required fields in step ${firstInvalidStep}`
        );
        setStep(firstInvalidStep);
        setIsSubmitting(false);
        return;
      }

      const finalData = { ...formData, ...data };

      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Append all form data
      Object.keys(finalData).forEach((key) => {
        if (key === "responsibilities") {
          finalData[key].forEach((item, index) => {
            formDataToSend.append(`responsibilities[${index}]`, item);
          });
        } else if (key === "photo" && finalData[key]) {
          formDataToSend.append("photo", finalData[key]);
        } else if (finalData[key] !== null && finalData[key] !== undefined) {
          formDataToSend.append(key, finalData[key]);
        }
      });

      // Log for demo
      console.log("FINAL JOB DATA 👉", finalData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Job Posted Successfully!");

      // Reset form
      setStep(1);
      setFormData({});
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error posting job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  let i = 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-slate-800">
          Post New Job
        </h2>
        <div className="flex justify-between items-center mt-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? "bg-[#00c389] text-white"
                    : "bg-gray-200 text-gray-500"
                } font-semibold`}
              >
                {stepNumber}
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {stepNumber === 1 && "Basic Info"}
                {stepNumber === 2 && "Summary"}
                {stepNumber === 3 && "Requirements"}
                {stepNumber === 4 && "Responsibilities"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        {/* STEP 1 */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
              Basic Information
            </h3>

            <Field label="Job Title" index={i++} error={errors.title?.message}>
              <input
                className="input"
                placeholder="e.g., Senior Frontend Developer"
                {...register("title", {
                  required: "Job title is required",
                  minLength: {
                    value: 3,
                    message: "Job title must be at least 3 characters",
                  },
                })}
              />
            </Field>

            

            {/* IMAGE UPLOAD - FIXED VERSION */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Job Thumbnail *
              </label>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer"
                onClick={triggerFileInput}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add(
                    "border-emerald-500",
                    "bg-emerald-50"
                  );
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove(
                    "border-emerald-500",
                    "bg-emerald-50"
                  );
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove(
                    "border-emerald-500",
                    "bg-emerald-50"
                  );
                  if (e.dataTransfer.files[0]) {
                    const file = e.dataTransfer.files[0];
                    // Create a fake event to reuse handleImageChange
                    const fakeEvent = {
                      target: { files: [file] },
                    };
                    handleImageChange(fakeEvent);
                  }
                }}
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-32 h-32 rounded-lg border-2 flex items-center justify-center overflow-hidden bg-gray-50 relative">
                    {preview ? (
                      <>
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering file input
                            removeImage();
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 z-10"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <div className="text-3xl text-gray-400 mb-2">📁</div>
                        <span className="text-sm text-gray-500">
                          Upload image
                        </span>
                        <p className="text-xs text-gray-400 mt-1">
                          JPEG, PNG, WebP (max 5MB)
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        hidden
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        {...register("photo", { validate: validatePhoto })}
                        onChange={handleImageChange}
                      />
                      <span  className="px-4 py-3 bg-[#00c389] text-white rounded">
                        Choose File
                      </span>
                    </label>
                    <div className="space-y-3 mt-4">
                      <p className="text-xs text-gray-500">
                        {errors.photo?.message ||
                          "Upload a company logo or job-related image"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            <Field
              label="Application Deadline"
              index={i++}
              error={errors.deadline?.message}
            >
              <input
                type="date"
                className="input"
                min={new Date().toISOString().split("T")[0]}
                {...register("deadline", {
                  required: "Deadline is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return (
                      selectedDate >= today || "Deadline must be in the future"
                    );
                  },
                })}
              />
            </Field>

            <div className="flex justify-end ">
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#00c389] hover:bg-[#00b37d] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Next: Job Summary →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
              Job Summary
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Field
                label="Vacancy *"
                index={i++}
                error={errors.vacancy?.message}
              >
                <input
                  className="input"
                  type="number"
                  min="1"
                  placeholder="Number of positions"
                  {...register("vacancy", {
                    required: "Vacancy is required",
                    min: { value: 1, message: "At least 1 vacancy required" },
                  })}
                />
              </Field>

              <Field
                label="Age Limit *"
                index={i++}
                error={errors.age?.message}
              >
                <input
                  className="input"
                  placeholder="e.g., 21-40"
                  {...register("age", {
                    required: "Age limit is required",
                  })}
                />
              </Field>

              <Field
                label="Location *"
                index={i++}
                error={errors.location?.message}
              >
                <input
                  className="input"
                  placeholder="e.g., Remote, New York, etc."
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
              </Field>

              <Field
                label="Salary *"
                index={i++}
                error={errors.salary?.message}
              >
                <input
                  className="input"
                  placeholder="e.g., $80,000 - $100,000"
                  {...register("salary", {
                    required: "Salary range is required",
                  })}
                />
              </Field>

              <Field
                label="Experience *"
                index={i++}
                error={errors.experience?.message}
              >
                <input
                  className="input"
                  placeholder="e.g., 3-5 years"
                  {...register("experience", {
                    required: "Experience requirement is required",
                  })}
                />
              </Field>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#00c389] hover:bg-[#00b37d] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Next: Requirements →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
              Requirements
            </h3>

            <Field
              label="Education *"
              index={i++}
              error={errors.education?.message}
            >
              <input
                className="input"
                placeholder="e.g., Bachelor's Degree in Computer Science"
                {...register("education", {
                  required: "Education requirement is required",
                })}
              />
            </Field>

            <Field label="Additional Requirements" index={i++}>
              <textarea
                className="input h-32"
                placeholder="Any additional requirements or preferred qualifications..."
                {...register("additional")}
              />
            </Field>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#00c389] hover:bg-[#00b37d] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Next: Responsibilities →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="font-semibold text-xl text-[#00c389] border-b pb-2">
              Responsibilities
            </h3>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Job Responsibilities *
              </label>

              {fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      className="input"
                      placeholder={`Responsibility ${idx + 1}`}
                      {...register(`responsibilities.${idx}`, {
                        required: "Responsibility cannot be empty",
                        validate: (value) =>
                          value.trim() !== "" ||
                          "Responsibility cannot be empty",
                      })}
                    />
                    {errors.responsibilities?.[idx] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.responsibilities[idx].message}
                      </p>
                    )}
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="mt-2 px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append("")}
              className="w-full border-2 border-dashed border-gray-300 hover:border-emerald-500 px-6 py-4 my-3 rounded-lg text-gray-600 hover:text-emerald-600 transition-colors"
            >
              + Add Another Responsibility
            </button>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#00c389] hover:bg-[#00b37d] text-white px-8 py-3 rounded-lg font-medium transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Posting..." : " Post Job"}
              </button>
            </div>
          </motion.div>
        )}
      </form>

      {/* Step Indicator Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full ${
              step === dot ? "bg-[#00c389]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
