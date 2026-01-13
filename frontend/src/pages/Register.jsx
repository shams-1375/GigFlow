import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/createuser", form);
      navigate("/login");
    } 
    catch (err) {
      alert("Registration failed!");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Create New Account
        </h2>

        <input
          placeholder="Name"
          className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="border border-purple-300 p-3 rounded mb-4 w-full focus:ring-2 focus:ring-purple-300"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          className={`w-full py-3 rounded font-semibold mb-4 transition 
            ${loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          disabled={loading}
          onClick={handleRegister}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-purple-600">
          Already have an account?{" "}
          <Link className="underline font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
