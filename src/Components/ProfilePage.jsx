import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const user=useAuth().user;
    const [profile,setProfile]=useState(null);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(() => {
      const profile=async () => {
        const res=await axios.get(`https://localhost:7206/api/Users/${user.id}`)
        setProfile(res.data);
        setLoading(false);
        console.log(res.data);
        
      }
      profile();
    },[])
  
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="relative bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start">
  
          {/* Loading Animation */}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white rounded-3xl">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}           
          
          <div className="flex-shrink-0">
            <img
              src={ `https://localhost:7206${profile?.profilePictureUrl}`}
              alt="Profile"
              className="w-44 h-44 rounded-full object-cover shadow-md border-4 border-blue-500"
            />
          </div>
  
          
          <div className="mt-8 md:mt-0 md:ml-10 flex flex-col items-center md:items-start text-center md:text-left w-full">
  
            {/* Profile Details Header */}
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Profile Details</h2>
  
            {/* Name */}
            <div className="mb-6 w-full">
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-1">Name</h3>
              <p className="text-lg text-slate-700">{profile?.fullName}</p>
            </div>
  
            {/* Email */}
            <div className="mb-6 w-full">
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-1">Email</h3>
              <p className="text-lg text-slate-700">{profile?.email}</p>
            </div>
  
            {/* Phone Number */}
            <div className="mb-6 w-full">
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-1">Phone Number</h3>
              <p className="text-lg text-slate-700">{profile?.phoneNumber}</p>
            </div>
  
            {/* Edit Profile Button */}
            <button onClick={()=>navigate(`/user/edit/${user.id}`,{state:profile})} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition">
              Edit Profile
            </button>
  
          </div>
        </div>
      </div>
    );
  }
  