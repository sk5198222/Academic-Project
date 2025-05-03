import React, { useEffect,useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  FaCheckCircle,  FaTimesCircle } from "react-icons/fa";

export default function MyPetsPage() {
    
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const user=useAuth().user;
    const [pets,setPets]=useState([]);

    const fetchPets = async () => {
      console.log(user);
      
      const res= await axios.get(`https://localhost:7206/api/Pets/user/${user.id}`)
      setPets(res.data);
      setLoading(false);
      console.log(res.data);
    }

    useEffect(() => {
      try {
        fetchPets();
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    },[])

    const deletePet=async ()=>{
      const res=axios.delete(`https://localhost:7206/api/Pets/${petId}`)
      toast.success(res.data);
      fetchPets();
    }

    const markSold=async (id)=>{
      const res=await axios.post(`https://localhost:7206/api/Pets/adopt/${id}`)
      toast.success(res.data);
      fetchPets();
    }
  
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-10 text-center">My Pets</h1>
  
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          
        <div className="overflow-x-auto bg-white rounded-3xl shadow-2xl p-6">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">SI</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Breed</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Sold</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Price (₹)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Posted On</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pets?.map((pet, index) => (
                <tr key={pet.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">{pet?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">{pet?.type==1?"Dog":pet?.type==2?"Cat":"Rabbit"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">{pet?.breed?.split(" ")[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">{pet?.isAdopted==true?  <FaCheckCircle/>:<FaTimesCircle/>}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">₹{pet?.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">{pet?.createdAt.slice(0,10)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    <button onClick={() => navigate(`/pet/edit/${pet.id}`, { state: pet })} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Edit
                    </button>
                    <button onClick={() => deletePet(pet.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                      Delete
                    </button>
                    {pet?.isAdopted==false && 
                    <button onClick={() => markSold(pet.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 ml-2 rounded-full">
                      Taken
                    </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    );
  }
  