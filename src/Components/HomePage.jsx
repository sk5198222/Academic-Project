import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";


export default function HomePage() {

  const navigate=useNavigate();
  const setUserType=useAuth().setUserType;

  return (
    <div className="min-h-screen bg-slate-300 flex items-center justify-center p-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">

        {/* Pet Adopter Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => { setTimeout(() => {
            setUserType("normal");
            navigate("/login")
          }, 275 );  }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-green-700 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl cursor-pointer"
        >
          {/* Placeholder Image */}
          <div className="w-40 h-40 bg-gray-300 flex items-center justify-center rounded-full mb-6">
            <img className="object-cover" src="/img1.png" alt="No Img" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Pet Adopter</h2>
          <p className="text-white text-center px-4">
            Find your perfect companion. Browse pets waiting for their forever home.
          </p>
        </motion.div>

        {/* Pet Seller Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => { setTimeout(() => {
            setUserType("super");
            navigate("/login")
          }, 275 );  }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-blue-700 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl cursor-pointer"
        >
          {/* Placeholder Image */}
          <div className="w-40 h-40 bg-gray-300 flex items-center justify-center rounded-full mb-6">
            <img src="/img2.png" alt="No Img" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Pet Seller</h2>
          <p className="text-white text-center px-4">
            Connect with adopters who are looking for a new furry friend. Share your pets with those in need.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
