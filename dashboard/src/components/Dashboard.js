import React , {useEffect, useState} from "react";
import { Route, Routes,  } from "react-router-dom";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

import Logout from "./Logoutit";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";



// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Send a request to validate the token stored in the cookies
//         await axios.get("http://localhost:3002/validateToken", { withCredentials: true });
//         setIsAuthenticated(true);
//       } catch {
//         setIsAuthenticated(false);
//         navigate("/login");
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }



    
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/login"); // Redirect if no token
  //   } else {
  //     // Simulate token validation (replace with actual validation logic)
  //     const isValid = true; // Replace with backend validation if needed
  //     if (isValid) {
  //       setIsAuthenticated(true);
  //     } else {
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //     }
  //   }
  // }, [navigate]);

  // if (isAuthenticated === null) {
  //   // Show loading while checking authentication
  //   return <div>Loading...</div>;
  // }
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
