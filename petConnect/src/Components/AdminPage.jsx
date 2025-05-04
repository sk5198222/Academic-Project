import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaPaw, FaListUl } from "react-icons/fa";

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-8">

      <Header/>

      <h1 className="text-4xl font-bold text-blue-700 my-18">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Sell a Pet Card */}
        <div
          onClick={() => navigate("/add-pet")}
          className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105 flex flex-col items-center text-center"
        >
          <div className="bg-blue-100 p-6 rounded-full mb-6">
            <FaPaw className="text-5xl text-blue-500" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            Sell a Pet
          </h2>
          <p className="text-slate-500">
            List a new pet for adoption or sale easily.
          </p>
        </div>

        {/* View My Pets Card */}
        <div
          onClick={() => navigate("/my-pets")}
          className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105 flex flex-col items-center text-center"
        >
          <div className="bg-green-100 p-6 rounded-full mb-6">
            <FaListUl className="text-5xl text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            View My Pets
          </h2>
          <p className="text-slate-500">
            See and manage the list of pets you’ve posted.
          </p>
        </div>
      </div>
      
    </div>
  );
}
