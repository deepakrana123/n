import { getAsyncStorageKey } from "@/apiHandler";
import Header from "@/components/NavBar/Header";
import { LampDemo } from "@/components/ui/lamp";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />
      <div
        style={{
          height: 50,
        }}
      ></div>
      {children}
    </>
  );
}
export default Protected;
