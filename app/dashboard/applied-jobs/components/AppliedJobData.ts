import { JobData } from "@/types/job";

// Export AppliedJob type
export type AppliedJob = Partial<JobData>;

// appliedJobsData.ts
export const appliedJobsData: AppliedJob[] = [
  {
    id: "1",
    title: "Project Manager",
    company: { name: "Sinotech Limited", logo: "https://via.placeholder.com/150" } as any,
    employmentInfo: { jobLocation: { city: "Dhaka", district: "Banani" } } as any,
    salaryAndBenefits: { salary: { range: "Negotiable" } } as any,
    jobSummary: { applicationDeadline: "31 Dec 2025" } as any,
    applicationStatus: "Applied",
  },
];
