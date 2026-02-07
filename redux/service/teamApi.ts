import { baseApi } from "../api/baseApi";

// Enums based on backend
export type Department =
  | "MANAGEMENT"
  | "HUMAN_RESOURCE"
  | "CMS"
  | "CUSTOM_DEVELOPMENT"
  | "SHOPIFY"
  | "MARKETING"
  | "SALES"
  | "SUPPORT";

export type TeamMemberStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE";

// Team member interface
export interface TeamMember {
  id: string;
  employeeId: string;
  fullName: string;
  position: string;
  department: string;
  experience: number;
  memberDescription?: string;
  companyDescription?: string;
  profilePhoto?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  skills?: string[];
  startDate?: string;
  endDate?: string;
  reportingTo?: string;
  bloodGroup?: string;
  status: 'ACTIVE' | 'INACTIVE';
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Pagination meta
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

// Response for team list
export interface TeamListResponse {
  status: boolean;
  message: string;
  meta: PaginationMeta;
  data: TeamMember[];
}

// Response for single team member
export interface SingleTeamMemberResponse {
  status: boolean;
  message: string;
  data: TeamMember;
}

// Query params
export interface GetTeamParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
  department?: Department;
  status?: TeamMemberStatus;
}

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get list of team members
    getTeamMembers: builder.query<TeamListResponse, GetTeamParams | void>({
      query: (params) => ({
        url: "/team",
        method: "GET",
        params: params ?? { page: 1, limit: 10 },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((member) => ({
                type: "team" as const,
                id: member.id,
              })),
              { type: "team", id: "LIST" },
            ]
          : [{ type: "team", id: "LIST" }],
    }),

    // Get single team member
    getTeamMemberById: builder.query<SingleTeamMemberResponse, string>({
      query: (id) => `/team/${id}`,
      providesTags: (_result, _error, id) => [{ type: "team", id }],
    }),

    // Create
    createTeamMember: builder.mutation<SingleTeamMemberResponse, FormData>({
      query: (formData) => ({
        url: "/team/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "team", id: "LIST" }],
    }),

    // Update
    updateTeamMember: builder.mutation<
      SingleTeamMemberResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: "team", id },
        { type: "team", id: "LIST" },
      ],
    }),

    // Standalone Photo Update
    updateTeamMemberPhoto: builder.mutation<
      SingleTeamMemberResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: "team", id },
        { type: "team", id: "LIST" },
      ],
    }),

    // Delete
    deleteTeamMember: builder.mutation<
      { status: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "team", id },
        { type: "team", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useGetTeamMemberByIdQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useUpdateTeamMemberPhotoMutation,
  useDeleteTeamMemberMutation,
} = teamApi;
