export interface Company {
  name: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  founded: string;
  industry: string;
  companySize: string;
  headOffice: {
    address: string;
    branchCount: number;
  };
  businessFocus: string[];
  workCulture: string[];
  mission: string;
}

export interface EmploymentInfo {
  employmentStatus: string;
  workplaceType: string;
  officeDays: string;
  workingHours: string;
  weeklyHoliday: string[];
  jobLocation: {
    city: string;
    district: string;
    country: string;
  };
  remoteAllowed: boolean;
}

export interface SalaryAndBenefits {
  salary: {
    range: string;
    type: string;
    negotiable: boolean;
    reviewPolicy: string;
  };
  bonuses: string[];
  leavePolicy: {
    annualLeave: string;
    sickLeave: boolean;
    casualLeave: boolean;
    publicHolidays: string;
  };
  additionalBenefits: string[];
}

export interface JobSummary {
  publishedDate: string;
  applicationDeadline: string;
  jobStatus: string;
  experienceRequired: string;
  ageLimit: string;
  gender: string;
  freshersAllowed: boolean;
}

export interface JobDescription {
  overview: string;
  responsibilities: string[];
  requirements: {
    education: string;
    experience: string;
    mandatorySkills: string[];
    additionalSkills: string[];
    niceToHave: string[];
  };
}

export interface JobData {
  id: string;
  slug: string;
  title: string;
  jobCategory: string;
  jobType: string;
  jobLevel: string;
  applicationStatus?: string;
  vacancy: number;
  company: Company;
  employmentInfo: EmploymentInfo;
  salaryAndBenefits: SalaryAndBenefits;
  jobSummary: JobSummary;
  jobDescription: JobDescription;
  skillsAndExpertise: string[];
  applicationProcess: {
    howToApply: string;
    requiredDocuments: string[];
    selectionProcess: string[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  adminControl: {
    featured: boolean;
    priority: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  };
}
