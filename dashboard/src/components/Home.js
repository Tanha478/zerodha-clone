import React, { useEffect, useState }  from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import TopBar from "./TopBar";




const Home = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Send a request to validate the token stored in the cookies
        await axios.get("https://zerodha-clone-backend-bypc.onrender.com/validateToken", { withCredentials: true });
        setIsAuthenticated(true);
      } catch(error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
       window.location.href = "https://zerodha-clone-frontend-ndqw.onrender.com/"; // Redirect to login page if not authenticated
      }
    };
    
    checkAuth();
    }, []);
    
    if (isAuthenticated === null) {
    return <div>Loading...</div>;
    }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
