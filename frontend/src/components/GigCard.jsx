import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function GigCard({ gig, user, onDelete }) {

const isOwner = user && gig.ownerId && 
  (user._id === (gig.ownerId._id || gig.ownerId));

  const isAssigned = gig.status === "assigned";

  const handleDelete = () => {
    if (!onDelete) return;
    if (!window.confirm("Delete this gig?")) return;
    onDelete(gig._id);
  };

  return (
    <div className="group relative flex flex-col h-full bg-white border border-purple-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="h-2 w-full bg-linear-to-r from-purple-400 to-purple-600"></div>

      {/* DELETE BUTTON (OWNER ONLY) */}
      {isOwner && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-purple-600 hover:text-red-600 hover:bg-red-50 transition-colors z-10 shadow-sm" title="Delete Gig" >
          <Trash2 size={18} />
        </button>
      )}

      <div className="p-6 flex flex-col grow">

        {/* Title */}
        <h2 className="font-extrabold text-gray-800 text-xl mb-3 line-clamp-1 group-hover:text-purple-700 transition-colors">
          {gig.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {gig.description}
        </p>

        {/* GIG */}
        <div className="grid grid-cols-2 gap-4 mb-6 border-t border-gray-50 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Budget</p>
            <p className="font-bold text-purple-700 text-lg">
              {gig.budget}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Status</p>
            <p className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold mt-1 ${isAssigned ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
              {gig.status}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">

          <div className="flex flex-col">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Posted By
            </p>

            <p className="text-sm font-medium text-gray-700">
              {user && gig.ownerId && user._id === gig.ownerId._id
                ? "You"
                : gig.ownerId?.name}
            </p>

          </div>
        </div>

        {isAssigned && (
            <p className="mt-4 text-xs font-medium text-red-500 italic">
              {user && gig.ownerId && user._id === gig.ownerId._id ? "You Hired freelancer for this Gig" : "This Gig is already assigned you can only view bids"}
            </p>

        )}

        {/* Button */}
        <Link
          to={`/gigs/${gig._id}`}
          className="mt-4 block text-center w-full py-3 px-4 rounded-xl font-bold tracking-wide text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200 hover:shadow-lg transition-all" >
          {isOwner || isAssigned ? "View Bids" : "View Details & Bid"}
        </Link>
      </div>
    </div>
  );
}