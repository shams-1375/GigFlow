import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">GigFlow - a mini-freelance platform</h1>

      <div className="space-x-4">
        <Link to="/gigs" className="hover:text-purple-300 transition" >Gigs</Link>
        <Link to="/create-gig" className="hover:text-purple-300 transition" >Post Gig</Link>
        <Link to="/my-gigs" className="hover:text-purple-300 transition">My Gigs</Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:text-purple-300 transition" >Login</Link>
            <Link to="/register" className="hover:text-purple-300 transition" >Register</Link>
          </>
        )}

        {isLoggedIn && (
          <button onClick={handleLogout} className="bg-purple-800 hover:text-red-500 transition px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
