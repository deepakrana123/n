import { useContext, useState } from "react";
import { AppContext } from "./ParentComponent";

// const { useState, useContext } = require("react");
import { handleRequest, handleGetRequest } from "./apiHandler";
import useToast from "./components/ui/useToast";
// const { default: useToast } = require("./components/ui/useToast");

export default function useApiCallHandler({
  defaultData,
  successMessage = "Operation completed successfully",
  onSuccess,
  onFail,
  errorMessage = "Operation failed",
  showToast,
}) {
  const { setLoading } = useContext(AppContext);
  const [data, setData] = useState(defaultData);
  //   const { navigate } = useNavigation();
  const { toast } = useToast();
  const handleApiCall = (request, method = "POST") => {
    setLoading(true);
    let requestType = handleRequest;
    // if (method === "GET") {
    //   requestType = handleGetRequest;
    // }

    requestType({ ...request, method: method })
      .then((response) => {
        if (response.data.code === 400) {
          if (showToast) {
            toast("error", response.data.message || errorMessage);
          }
          onFail && onFail(response);
        } else if (response.data.code === 403) {
          if (showToast) {
            toast("error", response.data.message || errorMessage);
          }
          onFail && onFail(response);
        } else if (response.data.code === 200) {
          if (showToast) {
            toast("success", successMessage);
          }
          setData(response?.data?.data);
          onSuccess && onSuccess(response);
        }
      })
      .catch((e) => {
        if (showToast) {
          toast("error", errorMessage);
        }
        console.log("@@@@e", e);
        onFail && onFail(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    handleApiCall,
    data,
  };
}
