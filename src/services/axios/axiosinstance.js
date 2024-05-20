import { createApi } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
const baseApi = "";

const axiosInstance = axios.create({
  baseURL: baseApi,
  timeout:10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error;
  }
);

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        return error
    }
)

export const axiosBaseQuery=({baseURL}={baseURL=''})=>
    async  ({ url, method, data, params, headers }) => {
        try {
            const result = await axiosInstance({
              url: baseUrl + url,
              method,
              data,
              params,
              headers,
            })
            return { data: result.data }
          } catch (axiosError) {
            const err = axiosError
            return {
              error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
              },
            }
          }
        }



