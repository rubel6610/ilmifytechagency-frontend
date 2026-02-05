import { baseApi } from "redux/api/baseApi";

export interface Blog {
  id: string;
  title: string;
  subTitle: string;
  des: string;
  images: string[];
  active: boolean;
  views: number;
  adminId?: string;
  createdAt?: string;
  updatedAt?: string;
  admin?: {
    id: string;
    name: string;
    photo: string | null;
  };
}

export interface BlogListResponse {
  status: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    blogs: Blog[];
  };
}

export interface SingleBlogResponse {
  status: boolean;
  message: string;
  data: Blog;
}

export interface BlogDeleteResponse {
  status: boolean;
  message: string;
}

export interface GetBlogsParams {
  page?: number;
  limit?: number;
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogListResponse, GetBlogsParams | void>({
      query: (params) => ({
        url: "/blog",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["blog"],
    }),

    getBlogById: builder.query<SingleBlogResponse, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),

    createBlog: builder.mutation<SingleBlogResponse, FormData>({
      query: (formData) => ({
        url: "/blog",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    updateBlog: builder.mutation<SingleBlogResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation<BlogDeleteResponse, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
