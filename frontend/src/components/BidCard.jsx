import api from "../api/axios";

export default function BidCard({ bid, refresh, isOwner, currentUser }) {

  const freelancerId = bid.freelancerId?._id;
  const currentUserId = currentUser?._id;

  const isMyBid = freelancerId && currentUserId && freelancerId === currentUserId;

  const hireFreelancer = async () => {
    try {
      await api.patch(`/bids/${bid._id}/hire`);
      refresh();
    }
    catch (err) {
      alert("Failed to hire");
    }
  };

  const rejectFreelancer = async () => {
    try {
      await api.patch(`/bids/${bid._id}/reject`);
      refresh();
    }
    catch (err) {
      alert("Failed to reject");
    }
  };

  return (
    <div className="relative bg-white border border-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">

          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
            Freelancer
          </span>

          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            {bid.freelancerId?.name || "Unknown"}
            {isMyBid && (
              <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                Your Bid
              </span>
            )}
          </h3>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
            Bid Price
          </span>

          <p className="font-extrabold text-purple-600 text-xl">
            {bid.price}
          </p>

        </div>
      </div>

      {/* Message Section */}
      <div className="bg-gray-200 rounded-xl p-4 mb-4 border border-purple-50">
        <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-1 block">
          Cover Letter / Message
        </span>
        <p className="text-gray-700 text-sm leading-relaxed italic">
          "{bid.message}"
        </p>
      </div>

      {/* Footer*/}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        
        {/*Status Tag */}
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${
            bid.status === 'hired' ? 'bg-green-500 animate-pulse' : 
            bid.status === 'rejected' ? 'bg-red-500' : 'bg-amber-400'
          }`} />
          <p className={`text-xs font-bold uppercase tracking-wide ${
            bid.status === 'hired' ? 'text-green-600' :
            bid.status === 'rejected' ? 'text-red-600' :
            'text-amber-600'
          }`}>
            {bid.status}
          </p>
        </div>

        {/* HIRE or REJECT */}
        {isOwner && bid.status === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={rejectFreelancer}
              className="px-4 py-1.5 border border-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors" >
              Reject
            </button>
            <button
              onClick={hireFreelancer}
              className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 shadow-md shadow-green-100 transition-all" >
              Hire
            </button>
          </div>
        )}

        {/* Freelancers View */}
        {!isOwner && bid.status === "pending" && (
          <p className="text-xs font-medium text-gray-600">
            Bid is currently under review
          </p>
        )}
      </div>
    </div>
  );
}