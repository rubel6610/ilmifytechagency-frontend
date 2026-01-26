import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
        query: ({ page = 1, limit = 10 }) => {
          const params = new URLSearchParams({ page, limit });
      
         
      
          return {
            url: `/coupon?${params.toString()}`,
            method: "GET",
          };
        },
        providesTags: ["Coupon"],
      }),

   
       addCoupon: builder.mutation({
        query: (data) => {
      
       
      
          return {
            url: `/coupon`,
            method: "POST",
            body:data
          };
        },
        invalidatesTags: ["Coupon"],
      }),

          // New deleteCoupon mutation
    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupon/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Coupon"],
    })
      
 

  }),
});

export const {
    useGetCouponQuery,useAddCouponMutation, useDeleteCouponMutation
 
   
} = userApi;
