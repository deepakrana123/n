import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const handleLogin=()=>{
    fetch("http://10.101.28.138/lending/admin/login", { 
    method: "POST", 
    body: JSON.stringify({ 
        title: "foo", 
        body: "bar", 
        userId: 1 
    }), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
}) 
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form>
          <h2 className="text-2xl font-bold text-center mb-6">Algo Yodhas</h2>
          <div className="mb-4 relative">
            <Label className="block text-gray-700 mb-2">Username</Label>
            <Input
              type="text"
              required
              maxlength="32"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              autocomplete="on"
            />
            <i className="fa-solid fa-exclamation text-red-500 absolute right-3 top-10"></i>
          </div>
          <div className="mb-4 relative">
            <Label className="block text-gray-700 mb-2">Password</Label>
            <Input
              type="password"
              required
              maxlength="12"
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <i className="fa-solid fa-exclamation text-red-500 absolute right-3 top-10"></i>
          </div>
          <div className="flex justify-between items-center mb-2">
          <Link to="/resetPassword" className="text-blue-400 hover:underline">
              Reset Password
            </Link>
            <Link to="/forgetPassword" className="text-blue-400 hover:underline">
              Forget Password
            </Link>
          </div>
          <Button
            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
            // type="submit"
            onClick={()=>handleLogin()}
          >Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
