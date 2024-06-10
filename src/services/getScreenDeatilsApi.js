import { createApi } from "@reduxjs/toolkit/dist/query";
import { axiosBaseQuery } from "./axios/axiosinstance";

export const getScreenDeatilsApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://example.com",
  }),
  endpoints(build) {
    return {
      query: build.query({ query: () => ({ url: "/query", method: "GET" }) }),
      mutation: build.mutation({
        query: () => ({ url: "/mutation", method: "post" }),
      }),
    };
  },
});
