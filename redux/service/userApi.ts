// redux/api/userApi.ts
import { baseApi } from "redux/api/baseApi";
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  photo: string | null;
  role: "ADMIN" | "CUSTOMER"; // Add other roles if needed
  joinedDate: string; // ISO date string
  lastOrderDate: string | null;
  totalOrders: number;
}

export interface UserListResponse {
  status: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    users: User[];
  };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUser: builder.query<
      UserListResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }) => ({
        url: "/user/userList",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<
      void,
      { id: string; data: Partial<User> }
    >({
      query: ({ id, data }) => ({
        url: `/user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAllUserQuery,
  useUpdateUserMutation,
} = userApi;
