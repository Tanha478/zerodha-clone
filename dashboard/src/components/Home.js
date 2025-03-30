import React, { useEffect, useState }  from "react";
// import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import axios from "axios";
import TopBar from "./TopBar";




const Home = () => {
    // const navigate = useNavigate();

    // Declare state variables
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Send a request to validate the token stored in the cookies
        await axios.get("http://localhost:3002/validateToken", { withCredentials: true });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
       window.location.href = "http://localhost:3000/login"; // Redirect to login page if not authenticated
      }
    };
    
    checkAuth();
    }, []);
    
    if (isAuthenticated === null) {
    return <div>Loading...</div>;
    }
//     const token = localStorage.getItem("token");
//     console.log("Token from localStorage:", token); // Debugging line

//     // if (!token) {
//     //   // If no token, redirect to the login page
//     //  window.location.href = "http://localhost:3000/login";
//     // }else {
//     //   // Optional: Verify the token (e.g., by decoding it or sending it to the backend)
//     //   try {
//     //     const isValid = true; // Replace with actual token validation logic
//     //     if (!isValid) {
//     //       localStorage.removeItem("token");
//     //       window.location.href = "http://localhost:3000/login";
//     //     }else {
//     //       setIsAuthenticated(true);}
//     //   } catch (error) {
//     //     console.error("Invalid token:", error);
//     //     localStorage.removeItem("token");
//     //     window.location.href = "http://localhost:3000/login"; 
//     //   }
//     // }
//   }, []);

//   // if (!isAuthenticated) {
//   //   // Show a loading spinner or placeholder while checking authentication
//   //   return <div>Loading...</div>;
//   // }


  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
