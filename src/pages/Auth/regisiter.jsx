import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useApiCallHandler from "@/useApiCallHandler";
const Regisiter = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const { handleApiCall } = useApiCallHandler({
    defaultData: [],
    onSuccess: (response) => {
      navigate("/login");
    },
    showToast: true,
    successMessage: "User created successfully",
  });
  const handleRegister = (event) => {
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
        return errors;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password error",
        description: "Password doesnot match with confirm password",
      });
      return;
    }
    handleApiCall({
      id: "/admin/register",
      data: {
        organizationId: "1",
        userId: "5",
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleRegister}>
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2">First Name</Label>
            <Input
              type="text"
              required
              maxlength="32"
              placeholder="Enter your First Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  firstname: event.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2">Last Name</Label>
            <Input
              type={`{${isPassword}?"text":"password"}`}
              required
              maxlength="32"
              placeholder="Enter your Last Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  lastname: event.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2">Email</Label>
            <Input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2">Password</Label>
            <Input
              type="password"
              required
              maxlength="12"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2">Confirm Password</Label>
            <Input
              type="password"
              required
              maxlength="12"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }));
              }}
            />
          </div>
          <Button
            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Regisiter;
