import React from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const user=useAuth().user;
  const onLogout=useAuth().logout;
  const navigate=useNavigate();

  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      {/* App name */}
      <div className="text-2xl font-bold text-blue-600">
        PetConnect
      </div>

      {/* Right side: profile + logout */}
      <div className="flex items-center gap-4">
        {/* Profile picture */}
        <img
          src={`https://localhost:7206${user.profilePictureUrl}` || "https://randomuser.me/api/portraits/men/75.jpg"} // fallback if no pic
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          onClick={() => navigate("/profile")}
        />
        <p className="font-semibold -ml-2 mr-2">{user?.fullName?.split(" ")[0]}</p>
        {/* Logout button */}
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
