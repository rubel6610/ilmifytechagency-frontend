import { baseApi } from "../api/baseApi";

// Team member interface
export interface TeamMember {
  id: string;
  name: string;
  fullName: string;
  position: string;
  department: string;
  experience: number;
  description: string;
  profilePhoto: string;
  email: string;
  phone: number;
  linkedin: string;
  skills: string[];
  startDate: string | null;
  endDate: string | null;
  reportingTo: string | null;
  status: "ACTIVE" | "INACTIVE";
  active: boolean;
  createdAt: string;
  updatedAt: string;
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

// Query params
export interface GetTeamParams {
  page?: number;
  limit?: number;
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
    getTeamMemberById: builder.query<TeamMember, number>({
      query: (id) => `/team/${id}`,
      providesTags: (_result, _error, id) => [{ type: "team", id }],
    }),

    // Create
    createTeamMember: builder.mutation<TeamMember, FormData>({
      query: (formData) => ({
        url: "/team/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "team", id: "LIST" }],
    }),

    // Update
    updateTeamMember: builder.mutation<
      TeamMember,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/team/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "team", id }],
    }),

    // Delete
    deleteTeamMember: builder.mutation<
      { status: boolean; message: string },
      number
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
  useDeleteTeamMemberMutation,
} = teamApi;
