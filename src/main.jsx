import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import ParentComponent from "./ParentComponent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ParentComponent>
      <BrowserRouter>
        <App />
        <Toaster className="" />
        <ToastContainer />
      </BrowserRouter>
    </ParentComponent>
  </Provider>
);
