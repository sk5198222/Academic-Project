import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/AuthContext";

export default function EditPet() {
  const navigate = useNavigate();
  const user=useAuth().user;
  const tempPet=useLocation().state;
  const [pet, setPet] = useState(tempPet);
  const [profilePicture, setProfilePicture] = useState(null);
  const profilePictureRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevData) => ({
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
    formDataToSend.append("Name", pet.name);
    formDataToSend.append("Type", pet.type);
    formDataToSend.append("Gender", pet.gender);
    formDataToSend.append("Breed", pet.breed);
    formDataToSend.append("Age", pet.age);
    formDataToSend.append("Description", pet.description);
    formDataToSend.append("Price", pet.price);
    formDataToSend.append("Location", pet.location);
    formDataToSend.append("UserId", user.id);

    if (profilePicture) {
      formDataToSend.append("ProfilePicture", profilePicture);
    }

    try {
      const response = await axios.put("https://localhost:7206/api/pets", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Pet Updated");
      console.log("Edit pet response:", response.data);

      // Reset form
      setPet({
        name: "",
        type: 0,
        gender: 0,
        breed: "",
        age: 0,
        description: "",
        price: 0,
        location: "",
      });
      setProfilePicture(null);
      if (profilePictureRef.current) {
        profilePictureRef.current.value = "";
      }

      navigate("/my-pets");
    } catch (error) {
      console.error("Error Updating pet:", error);
      toast.error(error.response?.data || "Failed to Update pet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Update your Pet</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Pet Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pet Name</label>
            <input
              type="text"
              name="name"
              value={pet.name}
              onChange={handleChange}
              placeholder="Enter pet name"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <select
              name="type"
              value={pet.type}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Select Type</option>
              <option value={1}>Dog</option>
              <option value={2}>Cat</option>
              <option value={3}>Rabbit</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
            <select
              name="gender"
              value={pet.gender}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Select Gender</option>
              <option value={1}>Male</option>
              <option value={2}>Female</option>
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Breed</label>
            <input
              type="text"
              name="breed"
              value={pet.breed}
              onChange={handleChange}
              placeholder="Enter breed"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Age (years)</label>
            <input
              type="number"
              name="age"
              value={pet.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              ref={profilePictureRef}
              className="w-full p-2 text-slate-600 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={pet.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write a short description..."
              className="w-full p-3 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={pet.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={pet.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
