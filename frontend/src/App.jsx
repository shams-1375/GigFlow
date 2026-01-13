import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/axios";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";
import MyGigs from "./pages/MyGigs";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/auth/me")
      .then(res => {
        if (res.data.user) {
          setIsLoggedIn(true);
          setCurrentUser(res.data.user); // store logged-in user info
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Checking login...</div>;

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/gigs" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-gigs" element={isLoggedIn ? <MyGigs currentUser={currentUser} /> : <Navigate to="/login" />} />
        <Route path="/gigs" element={isLoggedIn ? <Gigs currentUser={currentUser} /> : <Navigate to="/login" />} />
        <Route path="/create-gig" element={isLoggedIn ? <CreateGig /> : <Navigate to="/login" />} />
        <Route path="/gigs/:id" element={isLoggedIn ? <GigDetails user={currentUser} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
