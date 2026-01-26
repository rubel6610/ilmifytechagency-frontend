import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    addProducts: builder.mutation({
        query: (data) => ({
          url: "products",
          method: "POST",
          body:data
        }),
        invalidatesTags: ["Products"],
      }),
      updateProducts: builder.mutation({
        query: ({data,id}) => ({
          url: `products${id}`,
          method: "POST",
          body:data
        }),
        invalidatesTags: ["Products"],
      }),
      
    
    
   
  }),
});

export const {
useProductsQuery} = productsApi;
