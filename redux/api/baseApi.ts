/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

//const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://api.ilmifytech.agency/api/v1";
// const baseUrl = "http://localhost:5000/api/v1";

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;

      if (token) {
        headers.set("token", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Products", "Coupon", "job", "team", "blog", "project"],
  endpoints: (builder) => ({}),
});
