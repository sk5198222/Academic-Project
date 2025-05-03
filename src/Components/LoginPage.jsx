import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const userType=useAuth().userType;
  const [loading, setLoading] = useState(false);
  const login=useAuth().login;
  const navigate=useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginProcess = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(userData);
    setLoading(false);
    if(userType=="normal")
      navigate("/dashboard");
    else{
      navigate("/admin");
    }
  };

    return (
      <div
       className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Welcome Back</h2>
  
          <form className="space-y-6" onSubmit={loginProcess}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
                required
              />
            </div>
  
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                required
              />
            </div>
  
            {/* Login Button */}
            <button
              type="submit"
              className={`w-full ${loading ? "cursor-not-allowed bg-gray-500 hover:bg-gray-500 text-slate-100" : "bg-blue-600 hover:bg-blue-700 text-white"}  font-semibold py-3 rounded-xl transition duration-300`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
  
            {/* Forgot Password */}
            <div className="text-center mt-4">
              <Link to={"/register"} className="text-blue-600 hover:underline text-sm">
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }
  