import { useEffect, useState } from "react";
import api from "../api/axios";
import GigCard from "../components/GigCard";

export default function MyGigs({ currentUser }) {
  const [gigs, setGigs] = useState([]);

  const fetchMyGigs = async () => {
    const res = await api.get("/gigs/my");
    setGigs(res.data);
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  const deleteGig = async (gigId) => {
    if (!window.confirm("Delete this gig?")) return;

    await api.delete(`/gigs/${gigId}`);
    setGigs(prev => prev.filter(g => g._id !== gigId));
  };

  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        My Gigs
      </h1>

      {gigs.length === 0 ? (
        <p className="text-gray-500">
          You haven’t created any gigs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map(gig => (
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
