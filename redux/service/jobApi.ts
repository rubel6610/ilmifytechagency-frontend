import { baseApi } from "redux/api/baseApi";

// Job list item (for GET /job response)
export interface JobListItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP";
  jobType: "PERMANENT" | "PROBATION" | "CONTRACT";
  workMode: "ONSITE" | "REMOTE" | "HYBRID";
  applicationStatus: "OPEN" | "CLOSED";
  isPublished: boolean;
  createdAt: string;
  thumbnail: string | null;
  applicationDeadline?: string;
}

// Full job details (for single job view)
export interface Job extends JobListItem {
  overview: string;
  vacancy: number;
  salary: string;
  experience: string;
  education: string;
  responsibilities: string[];
  mandatorySkills: string[];
  niceToHave: string[];
  benefits: string[];
  workingHours: string;
  officeDays: string;
  createdBy: string;
  updatedAt: string;
  applicationsCount: number;
}

// Pagination meta
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

// Job list response
export interface JobListResponse {
  status: boolean;
  message: string;
  meta: PaginationMeta;
  data: JobListItem[];
}

// Job create response
export interface JobCreateResponse {
  status: boolean;
  message: string;
  data: Job;
}

// Job delete response
export interface JobDeleteResponse {
  status: boolean;
  message: string;
}

// Query parameters for getJobs
export interface GetJobsParams {
  page?: number;
  limit?: number;
}

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all jobs with pagination
    getJobs: builder.query<JobListResponse, GetJobsParams | void>({
      query: (params) => ({
        url: "/job",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["job"],
    }),

    getJobById: builder.query<Job, string>({
      query: (id) => ({
        url: `/job/${id}`,
        method: "GET",
      }),
      providesTags: ["job"],
    }),
    
    // Create new job
    createJob: builder.mutation<JobCreateResponse, FormData>({
      query: (formData) => ({
        url: "/job/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["job"],
    }),

    updateJob: builder.mutation<JobCreateResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/job/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["job"],
    }),

    deleteJob: builder.mutation<JobDeleteResponse, string>({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery, useCreateJobMutation, useUpdateJobMutation, useDeleteJobMutation } = jobApi;
  