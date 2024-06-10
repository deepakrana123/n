import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/services/reducer/ScreenReducer";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setAsyncStorageKey, setHeader } from "@/apiHandler";
import useApiCallHandler from "@/useApiCallHandler";
import Particles from "./Particles";
import { OrbitingCirclesDemo } from "@/components/ui/Orbit";
import LoginNew from "./LoginNew";
const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    orgId: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleApiCall } = useApiCallHandler({
    defaultData: [],
    onSuccess: (response) => {
      dispatch(login(response?.data?.data));
      setAsyncStorageKey("token", response?.data?.data?.token);
      setAsyncStorageKey("orgId", response?.data?.data?.orgId);
      setAsyncStorageKey("userId", response?.data?.data?.userId);
      setAsyncStorageKey("user", JSON.stringify(response?.data?.data));
      setHeader(response?.data?.data?.token);
      navigate("/");
    },
    showToast: true,
    successMessage: "Logged in successfully",
    errorMessage: "Email or password is wrong",
  });
  const handleLogin = (event) => {
    event.preventDefault();
    if (formData) {
      let errors = {};
      for (const key in formData) {
        if (formData[key] === "") {
          errors[key] = `${key} this field is required`;
        }
      }
      if (Object.keys(errors).length > 0) {
        setError(errors);
        return;
      }
      handleApiCall({
        id: "/admin/login",
        data: {
          email: formData.email,
          password: formData.password,
          orgId: formData.orgId,
        },
      });
    }
  };
  return (
    <LoginNew>
      <form onSubmit={handleLogin}>
        {/* <h2 className="text-2xl font-bold text-center mb-6">Algo Yoddhas</h2> */}
        <div className="mb-4 relative a2 animation">
          <Label className="block text-gray-700 mb-2">
            Email <span className="text-red-600">{"*"}</span>
          </Label>
          <Input
            type="email"
            required
            placeholder="Enter your email"
            className="input-field w-full px-3 py-2 rounded"
            autoComplete="on"
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                email: event.target.value,
              }));
            }}
          />
          <p className=" text-red-300 text-xs font-medium uppercase ">
            {error.email}
          </p>
        </div>
        <div className="mb-4 relative a3 animation">
          <Label className="block text-gray-700 mb-2">
            Password <span className="text-red-600">{"*"}</span>
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter password"
            autoComplete="on"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 input-field"
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                password: event.target.value,
              }));
            }}
          />
          <button
            type="button"
            className="absolute right-2 top-8 "
            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
          >
            {showPassword ? <FaRegEye /> : <BiHide />}
          </button>

          <i className=" text-red-300 text-xs uppercase ">{error.password}</i>
        </div>
        <div className="mb-4 relative a4 animation">
          <Label className="block text-gray-700 mb-2 ">
            Select Organization <span className="text-red-600">{"*"}</span>
          </Label>
          <Select
            className={"input-field"}
            onValueChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                orgId: event,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select a organization "
                className="input-field"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">aiqahealth</SelectItem>
                <SelectItem value="2">Finncub</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <i className="text-red-300 text-xs uppercase">{error.orgId}</i>
        </div>
        <Button
          className=" buttonShade w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700 a5 animation"
          type="submit"
        >
          Login
        </Button>
      </form>
    </LoginNew>
  );

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-900"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `
          radial-gradient(at 50% 0%, rgba(114, 101, 230, 0.1) 0px, transparent 50%), 
          radial-gradient(at 0% 0%, rgba(88, 41, 245, 0.08) 0px, transparent 70%), 
          radial-gradient(at 100% 0%, rgba(103, 228, 193, 0.4) 0px, transparent 50%)
        `,
      }}
    >
      <LoginNew />
    </div>
  );
};

export default Login;
