import { baseApi } from "../api/baseApi";

export interface ProjectPhase {
  id: string;
  projectId: string;
  name: string;
  description: string;
  conclusion: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  coverImage: string | null;
  client: string;
  description: string;
  website: string;
  summary: string;
  publishingDate: string;
  platforms: string[];
  technologies: string[];
  status: 'published-to-showcase' | 'draft';
  createdAt: string;
  updatedAt: string;
  phases: ProjectPhase[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ProjectListResponse {
  status: boolean;
  message: string;
  meta: PaginationMeta;
  data: Project[];
}

export interface SingleProjectResponse {
  status: boolean;
  message: string;
  data: Project;
}

export interface GetProjectParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
}

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects
    getProjects: builder.query<ProjectListResponse, GetProjectParams | void>({
      query: (params) => ({
        url: "/project",
        method: "GET",
        params: params ?? { page: 1, limit: 10 },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "project" as const, id })),
              { type: "project", id: "LIST" },
            ]
          : [{ type: "project", id: "LIST" }],
    }),

    // Get project by ID
    getProjectById: builder.query<SingleProjectResponse, string>({
      query: (id) => `/project/${id}`,
      providesTags: (_result, _error, id) => [{ type: "project", id }],
    }),

    // Create project
    createProject: builder.mutation<SingleProjectResponse, FormData>({
      query: (formData) => ({
        url: "/project/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "project", id: "LIST" }],
    }),

    // Update project
    updateProject: builder.mutation<
      SingleProjectResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/project/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: "project", id },
        { type: "project", id: "LIST" },
      ],
    }),

    // Delete project
    deleteProject: builder.mutation<{ status: boolean; message: string }, string>({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "project", id },
        { type: "project", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
