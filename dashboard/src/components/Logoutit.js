  // Logout function to remove token and redirect
import React from "react";
import axios from "axios";


export default function Logout () {
  const handleLogout = async () => {
    try {
      // Optional: Notify backend to clear cookies
      await axios.post("http://localhost:3002/logout", {}, { withCredentials: true });

      // Redirect to login page
     window.location.href = "http://localhost:3000/login"; // Redirect to login page
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };


  return (
    <div className="logout-container">
      <h1>Logout</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

