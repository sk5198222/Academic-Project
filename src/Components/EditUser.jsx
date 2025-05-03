import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditUser() {

  const profile=useLocation().state;
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    FullName: profile.fullName,
    Email: profile.email,
    PhoneNumber: profile.phoneNumber,
  });

  const [profilePicture, setProfilePicture] = useState(null); // Separate state for the file
  const profilePictureRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("FullName", formData.FullName);
    formDataToSend.append("Email", formData.Email);
    formDataToSend.append("PhoneNumber", formData.PhoneNumber);

    if (profilePicture) { // Use the profilePicture state here
      formDataToSend.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.put(`https://localhost:7206/api/users/${profile.id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile Updated", response.data);
      setFormData({
        FullName: "",
        Email: "",
        PhoneNumber: "",
      });
      setProfilePicture(null); // Reset the file state
      if (profilePictureRef.current) {
        profilePictureRef.current.value = ""; // Clear file input
      }
      toast(response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Updation error", error);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Update Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange} // Keep the original handleFileChange
              ref={profilePictureRef}
              className="w-full p-2 text-slate-600 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}