// app/components/PostJob.tsx

"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Field } from "./components/Field";
import { useState, useRef } from "react";
import type { Control, Path } from "react-hook-form";
import { useCreateJobMutation, useUpdateJobMutation, useGetJobByIdQuery } from "redux/service/jobApi";
import Swal from "sweetalert2";
import { useEffect } from "react";

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
  vacancy: string; // Number of positions
  jobType: "Full Time" | "Part Time" | "Internship"; // EmploymentType from schema
  contractType: "Permanent" | "Probation" | "Contract"; // JobType from schema
  jobLevel: "Mid Level" | "Senior Level" | "Entry Level";
  photo: File | null;
  jobSummary: JobSummary;
  employmentInfo: EmploymentInfo;
  salaryAndBenefits: SalaryAndBenefits;
  jobDescription: JobDescription;
  skillsAndExpertise: string[];
  niceToHave: string[];
  benefits: string[]; // Benefits array from schema
  adminControl: AdminControl;
  // Company Info
  companyName: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  // Other info
  officeDays: string;
  workingHours: string;
}

interface PostJobProps {
  onClose: (isOpen: boolean) => void;
  onSuccess: () => void;
  jobId?: string;
}

// ==========================================
// DEFAULT VALUES
// ==========================================

const defaultValues: FormData = {
  title: "",
  jobCategory: "",
  vacancy: "1",
  jobType: "Full Time",
  contractType: "Permanent",
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
  niceToHave: [""],
  benefits: [""],
  adminControl: {
    featured: false,
    priority: "Medium",
  },
  companyName: "",
  companyWebsite: "",
  companyEmail: "",
  companyPhone: "",
  officeDays: "Sun - Mon",
  workingHours: "8 hour",
};

// Usage:
// Helper to safely create field array paths
const createFieldArrayPath = <T,>(path: Path<T>) => path;

// Usage:
const responsibilitiesPath = createFieldArrayPath<FormData>("jobDescription.responsibilities");
const skillsPath = createFieldArrayPath<FormData>("skillsAndExpertise");
const niceToHavePath = createFieldArrayPath<FormData>("niceToHave");
// ==========================================
// MAIN COMPONENT
// ==========================================

export default function PostJob({ onClose, onSuccess, jobId }: PostJobProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const { data: jobResponse, isLoading: isFetching } = useGetJobByIdQuery(jobId || "", {
    skip: !jobId,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (jobResponse?.data && jobId) {
      const job = jobResponse.data;
      
      // Mapping mappings
      const employmentTypeRevMap: Record<string, "Full Time" | "Part Time" | "Internship"> = {
        "FULL_TIME": "Full Time",
        "PART_TIME": "Part Time",
        "INTERNSHIP": "Internship",
      };
      
      const jobTypeRevMap: Record<string, "Permanent" | "Probation" | "Contract"> = {
        "PERMANENT": "Permanent",
        "PROBATION": "Probation",
        "CONTRACT": "Contract",
      };
      
      const jobLevelRevMap: Record<string, "Mid Level" | "Senior Level" | "Entry Level"> = {
        "SENIOR_LEVEL": "Senior Level",
        "MID_LEVEL": "Mid Level",
        "ENTRY_LEVEL": "Entry Level",
      };

      const mappedData: FormData = {
        title: job.title,
        jobCategory: job.jobCategory,
        vacancy: job.vacancy.toString(),
        jobType: employmentTypeRevMap[job.employmentType] || "Full Time",
        contractType: jobTypeRevMap[job.jobType] || "Permanent",
        jobLevel: jobLevelRevMap[job.jobLevel] || "Mid Level",
        photo: null, // Cannot pre-fill File input
        jobSummary: {
          applicationDeadline: job.applicationDeadline ? job.applicationDeadline.split('T')[0] : "",
          ageLimit: job.ageLimit || "",
          experienceRequired: job.experience,
          gender: job.gender === "Others" ? "Any" : (job.gender as any || "Any"),
          freshersAllowed: job.fresherAllowed,
        },
        employmentInfo: {
          workplaceType: job.workMode === "REMOTE" ? "Hybrid" : (job.workplace === "HYBRID" ? "Hybrid" : "Onsite"),
          remoteAllowed: job.workMode === "REMOTE",
          jobLocation: {
            city: job.city,
            district: job.district || "",
            country: job.country,
          },
        },
        salaryAndBenefits: {
          salary: {
            range: job.salary,
            negotiable: job.sallaryNegotiable,
            type: "Monthly", // Default
          },
        },
        jobDescription: {
          overview: job.overview,
          requirements: {
            education: job.education,
          },
          responsibilities: job.responsibilities.length > 0 ? job.responsibilities : [""],
        },
        skillsAndExpertise: job.mandatorySkills.length > 0 ? job.mandatorySkills : [""],
        niceToHave: job.niceToHave.length > 0 ? job.niceToHave : [""],
        benefits: job.benefits.length > 0 ? job.benefits : [""],
        adminControl: {
          featured: false,
          priority: "Medium",
        },
        companyName: job.companyName,
        companyWebsite: job.companyWebsite,
        companyEmail: job.companyEmail,
        companyPhone: job.companyPhone,
        officeDays: job.officeDays,
        workingHours: job.workingHours,
      };

      reset(mappedData);
      // Set the salary negotiable state
      if (job.sallaryNegotiable) {
        setValue("salaryAndBenefits.salary.negotiable", true);
      }
    }
  }, [jobResponse, jobId, reset, setValue]);

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

const {
  fields: benefitsFields,
  append: appendBenefits,
  remove: removeBenefits,
} = useFieldArray<FormData>({
  control,
  name: "benefits" as never,
});

const {
  fields: niceToHaveFields,
  append: appendNiceToHave,
  remove: removeNiceToHave,
} = useFieldArray<FormData>({
  control,
  name: "niceToHave" as never,
});

  const salaryNegotiable = useWatch({
    control,
    name: "salaryAndBenefits.salary.negotiable",
    defaultValue: false,
  });

  const remoteAllowed = useWatch({
    control,
    name: "employmentInfo.remoteAllowed",
    defaultValue: false,
  });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});

const stepFields = {
  1: [
    "title",
    "jobCategory",
    "vacancy",
    "jobType",
    "contractType",
    "jobLevel",
    "photo",
    "jobSummary.applicationDeadline",
    "companyName",
    "companyWebsite",
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
    "companyEmail",
    "companyPhone",
  ] as Path<FormData>[],
  3: [
    "salaryAndBenefits.salary.range",
    "salaryAndBenefits.salary.negotiable",
    "jobDescription.requirements.education",
    "officeDays",
    "workingHours",
  ] as Path<FormData>[],
  4: [
    "jobDescription.responsibilities",
    "skillsAndExpertise",
    "niceToHave",
    "benefits",
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
    if (checked) {
      setValue("salaryAndBenefits.salary.range", "Negotiable");
    } else {
      setValue("salaryAndBenefits.salary.range", "");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Validate all steps before submission
      for (const stepKey of [1, 2, 3, 4] as const) {
        const fields = stepFields[stepKey];
        const isValid = await trigger(fields);
        if (!isValid) {
          Swal.fire({
            icon: "warning",
            title: "Validation Error",
            text: `Please complete all required fields in step ${stepKey}`,
            position: "center",
          });
          setStep(stepKey);
          return;
        }
      }

      // Merge final form data
      const finalData = { ...formData, ...data };

      // Validate required fields
      if (!finalData.title?.trim()) {
        throw new Error("Job title is required");
      }
      if (!finalData.jobCategory?.trim()) {
        throw new Error("Job category is required");
      }
      if (!finalData.companyName?.trim()) {
        throw new Error("Company name is required");
      }
      if (!finalData.jobSummary?.applicationDeadline) {
        throw new Error("Application deadline is required");
      }

      // Transform form data to API format
      const apiFormData = new FormData();

      // Location (combine city, district, country)
      const city = finalData.employmentInfo?.jobLocation?.city?.trim() || "";
      const district = finalData.employmentInfo?.jobLocation?.district?.trim() || "";
      const country = finalData.employmentInfo?.jobLocation?.country?.trim() || "";
      const location = `${city}, ${district}, ${country}`;
      
      // Employment type mapping (FULL_TIME, PART_TIME, INTERNSHIP)
      const employmentTypeMap: Record<string, string> = {
        "Full Time": "FULL_TIME",
        "Part Time": "PART_TIME",
        "Internship": "INTERNSHIP",
      };
      
      // Job type mapping (PERMANENT, PROBATION, CONTRACT)
      const jobTypeMap: Record<string, string> = {
        "Permanent": "PERMANENT",
        "Probation": "PROBATION",
        "Contract": "CONTRACT",
      };
      
      // Work mode mapping
      const workModeMap: Record<string, string> = {
        "Hybrid": "HYBRID",
        "Onsite": "ONSITE",
      };
      const workMode = finalData.employmentInfo?.remoteAllowed ? "REMOTE" : (workModeMap[finalData.employmentInfo?.workplaceType || "Hybrid"] || "HYBRID");
      
      const jobData = {
        title: finalData.title?.trim() || "",
        overview: finalData.jobDescription?.overview?.trim() || "",
        applicationDeadline: finalData.jobSummary?.applicationDeadline || "",
        companyName: finalData.companyName?.trim() || "",
        companyWebsite: finalData.companyWebsite?.trim() || "",
        companyEmail: finalData.companyEmail?.trim() || "",
        companyPhone: finalData.companyPhone?.trim() || "",
        vacancy: parseInt(finalData.vacancy || "1"),
        location: location,
        employmentType: employmentTypeMap[finalData.jobType || "Full Time"] || "FULL_TIME",
        jobType: jobTypeMap[finalData.contractType || "Permanent"] || "PERMANENT",
        jobCategory: finalData.jobCategory?.trim() || "",
        jobLevel: finalData.jobLevel === "Senior Level" ? "SENIOR_LEVEL" : (finalData.jobLevel === "Mid Level" ? "MID_LEVEL" : "ENTRY_LEVEL"),
        workMode: workMode,
        ageLimit: finalData.jobSummary?.ageLimit?.trim() || null,
        salary: finalData.salaryAndBenefits?.salary?.range?.trim() || "Negotiable",
        city: city,
        district: district || null,
        country: country,
        workplace: finalData.employmentInfo?.workplaceType?.toUpperCase() || "ONSITE",
        experience: finalData.jobSummary?.experienceRequired?.trim() || "",
        education: finalData.jobDescription?.requirements?.education?.trim() || "",
        sallaryNegotiable: finalData.salaryAndBenefits?.salary?.negotiable || false,
        sallaryRange: "", 
        responsibilities: finalData.jobDescription?.responsibilities?.filter(r => r?.trim()).map(r => r.trim()) || [],
        mandatorySkills: finalData.skillsAndExpertise?.filter(s => s?.trim()).map(s => s.trim()) || [],
        fresherAllowed: finalData.jobSummary?.freshersAllowed || false,
        niceToHave: finalData.niceToHave?.filter(n => n?.trim()).map(n => n.trim()) || [],
        benefits: finalData.benefits?.filter(b => b?.trim()).map(b => b.trim()) || [],
        workingHours: finalData.workingHours?.trim() || "8 hour",
        officeDays: finalData.officeDays?.trim() || "sun - mon",
        isPublished: true,
        gender: finalData.jobSummary?.gender === "Any" ? "Others" : (finalData.jobSummary?.gender || "Others"),
      };

      // Append JSON data as string
      apiFormData.append("data", JSON.stringify(jobData));
      
      // Append thumbnail if exists and is a valid File
      if (finalData.photo && finalData.photo instanceof File) {
        apiFormData.append("thumbnail", finalData.photo);
      }

      // Call the API (Create or Update)
      let result;
      if (jobId) {
        result = await updateJob({ id: jobId, formData: apiFormData }).unwrap();
      } else {
        result = await createJob(apiFormData).unwrap();
      }
      
      if(result.status === true){
        Swal.fire({
          icon: "success",
          title: jobId ? "Job Updated Successfully!" : "Job Posted Successfully!",
          text: result?.message || `Job has been ${jobId ? "updated" : "posted"} successfully!`,
          position: "center",
        });
        onSuccess();
      } else {
        Swal.fire({
          icon: "error",
          title: jobId ? "Job Update Failed!" : "Job Posting Failed!",
          text: result?.message || `Failed to ${jobId ? "update" : "post"} job. Please try again.`,
          position: "center",
        });
      }

      // Reset form and close modal
      reset(defaultValues);
      setStep(1);
      setFormData({});
      if (fileInputRef.current) fileInputRef.current.value = "";
      onClose(false);
      
    } catch (error: any) {
      console.error("Error posting job:", error);
      const errorMessage = error?.data?.message || error?.message || `Failed to ${jobId ? "update" : "post"} job. Please try again.`;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        position: "center",
      });
    }
  };

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto" >
      <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative">
          {/* Close Button */}
          <button 
            type="button"
            onClick={() => onClose(false)}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          {isFetching && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-50 flex items-center justify-center rounded-2xl">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-[#00c389] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-slate-600">Loading Job Data...</p>
              </div>
            </div>
          )}

          {/* Progress timeline */}
          <div className="mb-8 relative">
            <h2 className="text-2xl font-bold mb-2 text-center text-slate-800">
              {jobId ? "Edit Job" : "Post New Job"}
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
                <Field label="Company Name *" error={errors.companyName?.message as string}>
                  <input
                    className="input"
                    {...register("companyName", { required: "Company name is required" })}
                    placeholder="Tech Corp"
                  />
                </Field>
                <Field label="Company Website *" error={errors.companyWebsite?.message as string}>
                  <input
                    className="input"
                    {...register("companyWebsite", { 
                      required: "Required",
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Invalid URL (must start with http/https)"
                      }
                    })}
                    placeholder="https://techcorp.com"
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                <Field label="Number of Vacancies *" error={errors.vacancy?.message as string}>
                  <input
                    type="number"
                    min="1"
                    className="input"
                    {...register("vacancy", { required: "Required", min: { value: 1, message: "At least 1" } })}
                    placeholder="1"
                  />
                </Field>
                <Field label="Contract Type *" error={errors.contractType?.message as string}>
                  <select
                    className="input"
                    {...register("contractType", { required: "Required" })}
                  >
                    <option>Permanent</option>
                    <option>Probation</option>
                    <option>Contract</option>
                  </select>
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                <Field label="Job Type *" error={errors.jobType?.message as string}>
                  <select
                    className="input"
                    {...register("jobType", { required: "Required" })}
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Internship</option>
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
                    required: "Application deadline is required",
                    validate: (v) => {
                      const selectedDate = new Date(v);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return selectedDate >= today || "Deadline must be today or a future date";
                    },
                  })}
                />
              </Field>

              <Field label="Job Photo" error={errors.photo?.message as string}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="input"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("photo", file);
                    }
                  }}
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

              <div className="grid md:grid-cols-2 gap-6 w-full">
                <Field label="Company Email *" error={errors.companyEmail?.message as string}>
                  <input
                    type="email"
                    className="input"
                    {...register("companyEmail", { 
                      required: "Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="hr@techcorp.com"
                  />
                </Field>
                <Field label="Company Phone *" error={errors.companyPhone?.message as string}>
                  <input
                    className="input"
                    {...register("companyPhone", { required: "Required" })}
                    placeholder="+880123456789"
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
                      required: !salaryNegotiable ? "Salary range is required" : false,
                    })}
                  />
                </Field>

                <div className="space-y-3">
                  <label className="flex items-center font-medium">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={salaryNegotiable}
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
                      placeholder="e.g., React, TypeScript, Node.js"
                      {...register(`skillsAndExpertise.${idx}` as const, {
                        required: "Skill cannot be empty",
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
                {errors.skillsAndExpertise && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.skillsAndExpertise.message || "At least one skill is required"}
                  </p>
                )}
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

              <div className="grid md:grid-cols-2 gap-6 w-full">
                <Field
                  label="Office Days *"
                  error={errors.officeDays?.message as string}
                >
                  <input
                    className="input"
                    {...register("officeDays", { required: "Required" })}
                    placeholder="Sun - Thu"
                  />
                </Field>
                <Field
                  label="Working Hours *"
                  error={errors.workingHours?.message as string}
                >
                  <input
                    className="input"
                    {...register("workingHours", { required: "Required" })}
                    placeholder="9:00 AM - 6:00 PM"
                  />
                </Field>
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
                      placeholder="e.g., Develop and maintain web applications"
                      {...register(`jobDescription.responsibilities.${idx}` as const, {
                        required: "Responsibility cannot be empty",
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
                {errors.jobDescription?.responsibilities && (
                  <p className="text-red-500 text-sm mt-1">
                    At least one responsibility is required
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => appendResp("")}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-[#00c389] p-4 rounded-lg text-gray-600 hover:text-[#00c389] transition-all"
                >
                  + Add Responsibility
                </button>
              </div>

              {/* Nice to Have */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Nice to Have Skills
                </label>
                {niceToHaveFields.map((field, idx) => (
                  <div key={field.id} className="flex gap-2 items-start mb-3">
                    <input
                      className="input flex-1"
                      {...register(`niceToHave.${idx}` as const)}
                      placeholder="e.g. Docker, AWS, etc."
                    />
                    {niceToHaveFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNiceToHave(idx)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendNiceToHave("")}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-[#00c389] p-4 rounded-lg text-gray-600 hover:text-[#00c389] transition-all"
                >
                  + Add Nice to Have Skill
                </button>
              </div>

              {/* Benefits */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Benefits
                </label>
                {benefitsFields.map((field, idx) => (
                  <div key={field.id} className="flex gap-2 items-start mb-3">
                    <input
                      className="input flex-1"
                      {...register(`benefits.${idx}` as const)}
                      placeholder="Health insurance, flexible hours, etc."
                    />
                    {benefitsFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBenefits(idx)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendBenefits("")}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-[#00c389] p-4 rounded-lg text-gray-600 hover:text-[#00c389] transition-all"
                >
                  + Add Benefit
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
                  disabled={isCreating || isUpdating}
                  className="bg-[#00c389] hover:bg-[#00b37d] text-white px-2 lg:px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating || isUpdating ? (jobId ? "Updating..." : "Posting...") : (jobId ? "Update Job" : "Post Job")}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
  );
}