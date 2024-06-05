import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/services/reducer/ScreenReducer";
import { AES } from "crypto-js";
const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (event) => {
    event.preventDefault();

    console.log(formData, "form");

    if (formData) {
      let errors = {};

      // Validate form data
      for (const key in formData) {
        if (formData[key] === "") {
          errors[key] = `${key} this field is required`;
        }
      }

      // If there are errors, set them and return early
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
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        if (response.status === 403) {
          toast({
            // variant: "destructive",
            title: "Email or password is wrong",
            description: `Email or password is wrong`,
          });
        }
        if (response.code === 200) {
          dispatch(login(response.data));
          navigate("/");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center mb-6">Algo Yodhas</h2>
          <div className="mb-4 relative">
            <Label className="block text-gray-700 mb-2">Email</Label>
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
              type="password"
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
            <i className=" text-red-300 text-xs uppercase ">{error.password}</i>
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
