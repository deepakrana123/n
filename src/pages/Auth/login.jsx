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
const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    }
    fetch("http://15.207.88.248:8080/admin/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        orgId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status === 400) {
          toast({
            title: "Email or password is wrong",
            description: response.message,
            position: "top-",
          });
        } else if (response.status === 403) {
          toast({
            title: "Email or password is wrong",
            description: "Email or password is wrong",
            // position: "top-",
          });
          dispatch(
            login(
              data?.data
          )
          );
          navigate("/");
        }
        if (response.code === 200) {
          dispatch(
            login({
              token:
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc2hAZ21haWwuY29tIiwiaWF0IjoxNzE3NzQ4NTA4LCJleHAiOjE3MTc3ODQ1MDh9.uKFxulQvhLa-kOIb-9XGYapl_eGpUVqBfMc_iatHGnM",
              username: "vikash@gmail.com",
              orgId: 1,
              userId: 15,
            })
          );
          navigate("/");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center mb-6">Algo Yodhas</h2>
          <div className="mb-4 relative">
            <Label className="block text-gray-700 mb-2">Email <span className="bg-danger">{"*"}</span></Label>
            <Input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
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
          <div className="mb-4 relative">
            <Label className="block text-gray-700 mb-2">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
              autoComplete="on"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }));
              }}
            />
            <button
              type="button"
              className="absolute right-2 top-8"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
            >
              {showPassword ? <BiHide /> : <FaRegEye />}
            </button>

            <i className=" text-red-300 text-xs uppercase ">{error.password}</i>
          </div>
          <div className="mb-4 relative">
            <Label className="block text-gray-700 mb-2">
              Select Organistion
            </Label>
            <Select
              onValueChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  orgId: event,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a organisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Aiqa</SelectItem>
                  <SelectItem value="2">Finncub</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
