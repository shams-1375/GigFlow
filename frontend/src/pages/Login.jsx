import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  setLoading(true);

  try {
    await api.post("/auth/login", { email, password });
    setIsLoggedIn(true);
    navigate("/gigs");
  } 
  catch (err) {
    alert("Login failed!");
  } 
  finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm">

        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Login to continue</h2>

        <input className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300" placeholder="Email" onChange={e => setEmail(e.target.value)} required />

        <input type="password" className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300" placeholder="Password" onChange={e => setPassword(e.target.value)} required />

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold mb-4 transition" disabled={loading} onClick={handleLogin} >
          {loading ? (
            "Logging in..."
          ) : ("Login")}
        </button>

        <p className="text-center text-purple-600">
          Don’t have an account?{" "}

          <Link className="underline font-semibold" to="/register">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}
