import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, verifyUser } = useAuth();  // Added verifyUser here
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7000/admin/login", {
        email,
        password,
      });

      if (response.data) {
        const userData = {
          email: response.data.email,
          token: response.data.token,
          role: response.data.role,  // Make sure the role is included
        };
        login(userData);
        verifyUser(); // Ensure the user is verified
        toast.success("Login successful!");
        setTimeout(() => navigate("/admin-dashboard"), 1500); // Redirect to admin dashboard
      } else {
        navigate("/employee-dashboard");
      }

      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
      toast.error("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 via-teal-500 to-gray-100 space-y-6">
      <h2 className="text-white font-pacific text-3xl">Employee Management System</h2>
      <div className="border shadow-lg p-8 w-80 bg-white rounded-lg">
        <form onSubmit={onSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-700">Login</h2>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">Email</label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">Password</label>
            <input
              name="password"
              value={password}
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" className="mr-2" />
              <label htmlFor="remember-me" className="text-sm text-gray-600">Remember Me</label>
            </div>
            <a href="#" className="text-sm text-teal-600 hover:underline">Forgot Password?</a>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
