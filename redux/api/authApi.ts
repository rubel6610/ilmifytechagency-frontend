import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPass: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resetPass: builder.mutation({
      query: ({ password, resetToken }) => ({
        url: `/auth/reset-password/${resetToken}`,
        method: "POST",
        body: { password }, // ✅ must be an object
      }),
      invalidatesTags: ["User"],
    }),
    verify: builder.mutation({
      query: ( resetToken ) => ({
        url: `/user/verify-email/${resetToken}`,
        method: "PUT",
        
      }),
      invalidatesTags: ["User"],
    }),
    // adfaEDFAsdf gasdfgsadfasf
    // asdfasdfasfas
    
    getme: builder.query({
      query: ( ) => ({
        url: `/user/me`,
        method: "GET",
        
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (data ) => ({
        url: `/user/update-profile`,
        method: "PUT",
        body:data
        
      }),
      invalidatesTags: ["User"],
    }),
    

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetPassMutation,

  useForgotPassMutation,
  useUpdateUserMutation,
  useVerifyMutation,
useGetmeQuery,

} = authApi;
