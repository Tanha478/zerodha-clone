import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://zerodha-clone-backend-bypc.onrender.com/signup", formData, {
        withCredentials: true, 
        headers: { "Content-Type": "application/json" },
      });
  
       // Redirect user after successful signup
       window.location.href = "https://zerodha-clone-dashboard-fdei.onrender.com" ;
      } catch (err) {
        console.log(err);
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