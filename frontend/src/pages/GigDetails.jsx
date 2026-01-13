import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import BidCard from "../components/BidCard";

export default function GigDetails({ user }) {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");



  // Fetch gig and bids
  const fetchData = async () => {
    try {
      const gigRes = await api.get(`/gigs/${id}`);
      setGig(gigRes.data);

      const bidsRes = await api.get(`/bids/gig/${id}`);
      setBids(bidsRes.data);
    } 
    catch (err) {
      console.log("Error loading gig");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!gig) {
    return <div className="p-6">Loading gig...</div>;
  }

  const isOwner = user && user._id === gig.ownerId._id;

  const placeBid = async () => {
    if (!message || !price) {
      alert("Enter message and price");
      return;
    }

    await api.post(`/bids/${id}`, { message, price });
    setMessage("");
    setPrice("");
    fetchData();
  };


  return (
    <div className="p-6 bg-purple-50 min-h-screen">

      {/* GIG INFO */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100 mb-6">
        <div className="flex flex-col gap-4">

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-purple-700">
            {gig.title}
          </h1>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {gig.description}
          </p>

          {/* Info Gig */}
          <div className="grid grid-cols-1 max-w-100 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className=" text-xl text-gray-500">Budget</p>
              <p className="font-semibold text-xl text-purple-700">{gig.budget}</p>
            </div>

            <div className="bg-gray-100 max-w-100 p-3 rounded-lg">
              <p className="text-gray-500 text-xl">Status</p>
              <p className="font-semibold text-xl text-purple-700 capitalize">
                {gig.status}
              </p>
            </div>
          </div>

          {/* Owner Details */}
          <div className="flex items-center justify-between border-t pt-3">
            <p className="text-sm text-gray-600">
              Posted By: <span className="font-medium">{gig.ownerId.name}</span>
            </p>
          </div>

        </div>
      </div>


      {/* BID FORM */}
      {!isOwner && gig.status === "open" && (
        <div className=" bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Place a Bid</h2>
            <p className="text-sm text-gray-500">Submit your proposal for this gig.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                placeholder="Describe your approach..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Price</label>

              <div className="relative max-w-50">
                <input placeholder="0.00" type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-gray-300 p-3 pl-7 rounded-lg focus:ring-2 focus:ring-p focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <button
              onClick={placeBid}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg" >
              Place Bid
            </button>
            
          </div>
        </div>
      )}

      {/*ALL BIDS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {isOwner ? "Bids Received" : "Recent Bids"}
        </h2>
        <p className="text-sm text-gray-500 mb-4  ">
          {isOwner ? "All Bids Recieved for this Gig" : "Other Freelancers Bid's"}
        </p>

        {bids.length === 0 ? (
          <p className="text-gray-500">No bids yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {bids.map(bid => (
              <BidCard
                key={bid._id}
                bid={bid}
                refresh={fetchData}
                isOwner={isOwner}
                currentUser={user}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
