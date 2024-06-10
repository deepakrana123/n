import axios from "axios";
import { handleEncryptData } from "./constants/constants";

// import { handleEncryptData } from "./components/apiHandler";
let BASE_URL = "http://10.101.29.80:8080/";
// BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://lcnc-api.ninjagyan.com";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60,
  headers: {
    "Content-Type": "text/plain",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const getAsyncStorageKey = async (key) => {
  return await localStorage.getItem(key);
};
export const setAsyncStorageKey = async (key, value) => {
  return await localStorage.setItem(key, value);
};
export const setHeader = (token) => {
  request.defaults.headers.common["Authorization"] = "Bearer " + token;
};
export const handleRequest = async ({ id, data, method, ...rest }) => {
  console.log("@@ id, data, method,", id, data, method);
  const updatedData = await handleEncryptData({
    id: id,
    data: {
      orgId: await getAsyncStorageKey("orgId"),
      ...(data ? data : {}),
    },
    method,
  });
  let dataToSend = {};
  if (data) {
    dataToSend = {
      method: "POST",
      orgId: await getAsyncStorageKey("orgId"),
      ...data,
    };
  }
  //   console.log("@@@updatedData", updatedData);
  // return await request.post(id, dataToSend, {
  //   timeout: 5000,
  // });
  return await request.post("/invoke", updatedData, {
    timeout: 5000,
  });
};

export const handleGetRequest = async ({ id }) => {
  //   const updatedData = await handleEncryptData({
  //     id: id,
  //     method: "GET",
  //   });
  //   let dataToSend = {};
  //   if (data) {
  //     dataToSend = {
  //       method: "POST",
  //       orgId: await getAsyncStorageKey("orgId"),
  //       ...data,
  //     };
  //   }
  return await request.get(id, {
    timeout: 5000,
  });
};
