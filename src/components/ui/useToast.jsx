import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  <ToastContainer
    limit={1}
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />;
  const notify = (type, message) => {
    let sumessage = (
      <div
        dangerouslySetInnerHTML={{
          __html: message,
        }}
      ></div>
    );
    if (type && message) {
      if (type === "success") {
        toast.success(sumessage, {
          ToastContainer,
        });
      }

      if (type === "error") {
        toast.error(sumessage, {
          ToastContainer,
        });
      }

      if (type === "warn") {
        toast.warn(sumessage, {
          ToastContainer,
        });
      }

      if (type === "info") {
        toast.info(sumessage, {
          ToastContainer,
        });
      }
    }
  };
  return { toast: notify };
};

export default useToast;
