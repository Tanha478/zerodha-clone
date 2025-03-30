import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  // const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
     
      const response = await axios.post("http://localhost:3002/signup", formData, {
        withCredentials: true, 
        headers: { "Content-Type": "application/json" },
      });
  
       // Redirect user after successful signup
       window.location.href = "http://localhost:3001";
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    };
  
  
  
  return (
    <div className="signup-container"  >
      <h1 className="signup-title">Create an Account</h1>
      {error && <p className="signup-error">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="signup-input"
        />
          <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};


export default Signup;