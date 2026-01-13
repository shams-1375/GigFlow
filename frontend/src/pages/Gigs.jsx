import { useEffect, useState } from "react";
import api from "../api/axios";
import GigCard from "../components/GigCard";

export default function Gigs({ currentUser }) {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/gigs").then(res => setGigs(res.data));
  }, []);

  const filteredGigs = gigs.filter(gig =>
    gig.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteGig = async (gigId) => {
  try {
    await api.delete(`/gigs/${gigId}`);
    setGigs(prev => prev.filter(g => g._id !== gigId));
  } catch (err) {
    alert("Failed to delete gig");
  }
};


  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        All Gigs
      </h1>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search gigs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border border-purple-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* GIG LIST */}
      {filteredGigs.length === 0 ? (
        <p className="text-gray-500">No gigs found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map(gig => (
            <GigCard
              key={gig._id}
              gig={gig}
              user={currentUser}
               onDelete={deleteGig}
            />
          ))}
        </div>
      )}
    </div>
  );
}
