import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa'; // For the contact button icon
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function PetDetailsCard() {
  const pet=useLocation().state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState();

  useEffect(() => {
    const ownerInfo=async () => {
      const res=await axios.get(`https://localhost:7206/api/Users/${pet.userId}`)
      setOwnerInfo(res.data);
    }
    ownerInfo();
  },[])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex gap-8">
          {/* Left Side: Pet Image */}
          <div className="w-1/3">
            <img
              src={`https://localhost:7206${pet.profilePictureUrl}`}
              alt={pet.name}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right Side: Pet Details */}
          <div className="w-2/3">
            <h2 className="text-3xl font-semibold text-gray-800">{pet.name}</h2>
            <p className="text-xl text-gray-600 mt-2">{pet.type==1 ? "Dog" : pet.type==2 ? "Cat" : "Rabbit"} | {pet.gender==1 ? "Male" : "Female"}</p>
            <p className="text-lg text-gray-600 mt-1">Breed: {pet.breed}</p>
            <p className="text-lg text-gray-600 mt-1">Age: {pet.age} years old</p>
            <p className="text-gray-700 mt-4">{pet.description}</p>
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-800">Price: ${pet.price}</p>
              <p className="text-lg text-gray-600">Location: {pet.location}</p>
            </div>
          </div>
        </div>

        {/* Contact Owner Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={openModal}
            className="flex items-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            <FaEnvelope className="mr-2" />
            Contact Owner
          </button>
        </div>

        {/* Modal (Popup) */}
        {isModalOpen && (
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="fixed inset-0  flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2 p-8">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">Owner Info</h3>

              <div className="flex items-center gap-6 mb-6">
                <img
                  src={`https://localhost:7206${ownerInfo.profilePictureUrl}`}
                  alt={ownerInfo.fullName}
                  className="w-20 h-20 rounded-full object-cover shadow-md"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-800">{ownerInfo.name}</p>
                  <p className="text-lg text-gray-600">Phone Number: {ownerInfo.phoneNumber}</p>
                  <p className="text-lg text-gray-600">Email: {ownerInfo.email}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
