import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/gigs", form);
      navigate("/gigs");
    } catch (err) {
      alert("Failed to create gig");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Post a Gig</h2>

        <input placeholder="Title" className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300" onChange={e => setForm({ ...form, title: e.target.value })} />

        <input placeholder="Description" className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300" onChange={e => setForm({ ...form, description: e.target.value })} />

        <input placeholder="Budget" className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300" onChange={e => setForm({ ...form, budget: e.target.value })} />

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold transition" onClick={handleSubmit}>
          Post Gig
        </button>

      </div>
    </div>
  );
}
