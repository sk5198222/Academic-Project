import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";

export default function PetAdoptList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPets, setAllPets] = useState([]);
  const navigate=useNavigate();

  const fetchPets = async () => {
    setLoading(true);
    const res= await axios.get("https://localhost:7206/api/Pets")
    setLoading(false);
    setAllPets(res.data);
    console.log(res.data);
  };

  useEffect(() => {  
    try {
      fetchPets();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  }, []);
  

  const typeMap = {
    1: "dog",
    2: "cat",
    3: "rabbit",
  };
  
  // Filter pets based on selected category and search term
  const filteredPets = allPets.filter((pet) => {
    const petTypeName = typeMap[pet.type];  // convert int to string
    const matchesCategory =
      selectedCategory === "all" || petTypeName === selectedCategory.toLowerCase();
    const matchesBreed = pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesBreed;
  });

  // Pagination logic: Display 6 pets per page
  const petsPerPage = 6;
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const currentPets = filteredPets.slice((currentPage - 1) * petsPerPage, currentPage * petsPerPage);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-100 p-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : 
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 -mt-3">
          {/* Left side: Categories */}
          <div className="flex md:w-1/3 max-w-[23vw] bg-white shadow-xl rounded-lg h-[10vh] justify-around items-center">
            <h2 className="text-xl font-semibold text-slate-700">Categories</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border-2 border-slate-300 p-3 rounded-md text-slate-700"
            >
              <option value="all">All</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </div>

          {/* Right side: Search Bar */}
          <div className="flex justify-around items-center md:w-2/3 max-w-[40vw] bg-white shadow-xl rounded-lg h-[10vh]">
            <h2 className="text-xl font-semibold text-slate-700">Search by Breed</h2>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Search for breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 border-slate-300 rounded-l-md  text-slate-700 py-3 pl-2"
              />
              <button className="bg-blue-600 text-white rounded-r-md p-[17.5px]">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-slate-800 mt-6 -mb-3">
          Pets Available for Adoptation:
        </h1>

        {/* Pet Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
              onClick={() => navigate(`/pet/${pet.id}`, { state: pet })}
            >
              
              <img
                src={`https://localhost:7206${pet.profilePictureUrl}`}
                alt={pet.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">{pet.name}</h3>
              <p className="text-slate-500">{pet.type==1?"Dog":pet.type==2?"Cat":"Rabbit"}</p>
              <p className="text-slate-500">{pet.breed}</p>
              <p className="text-xl font-bold text-blue-600 mt-2">₹{pet.price}</p>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            Next
          </button>
        </div>
      </div> }
    </div>
    </>
  );
}
