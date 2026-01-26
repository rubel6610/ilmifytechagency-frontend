import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    alluser: builder.query({
        query: ({ page = 1, limit = 10 }) => {
          const params = new URLSearchParams({ page, limit });
      
         
      
          return {
            url: `/user?${params.toString()}`,
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),

      mybooking: builder.query({
        query: ({ page = 1, limit = 10}) => {
          const params = new URLSearchParams({ page, limit });
      
       
      
          return {
            url: `/booking/my?${params.toString()}`,
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
       booking: builder.mutation({
        query: (data) => {
      
       
      
          return {
            url: `/booking`,
            method: "POST",
            body:data
          };
        },
        invalidatesTags: ["User"],
      }),
      
    updateUser: builder.mutation({
        query: ({id,data}) => ({
          url: `/user/update-user/${id}`,
          method: "PUT",
          body:data
        }),
        invalidatesTags: ["User"],
      }),

  }),
});

export const {
    useAlluserQuery,useUpdateUserMutation,useMybookingQuery,useBookingMutation
 
   
} = userApi;
