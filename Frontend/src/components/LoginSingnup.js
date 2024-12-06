import React, { useState } from "react";
import axios from "axios";
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (Login/Signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine the endpoint based on the mode (Login/Signup)
      const endpoint = isLogin
        ? `${process.env.REACT_APP_API_URL}/api/login`
        : `${process.env.REACT_APP_API_URL}/api/signup`;

        // ? "http://localhost:5001/api/login"
        // : "http://localhost:5001/api/signup";

      console.log(endpoint);  // Log endpoint to debug the URL

      // Send POST request to the backend API
      const res = await axios.post(endpoint, formData);

      // Check response for success or failure
      if (res.data.success) {
        alert(`${isLogin ? "Login" : "Signup"} successful!`);
        setFormData({ name: "", email: "", password: "" });
      } else {
        alert(res.data.message || `${isLogin ? "Login" : "Signup"} failed!`);
      }
    } catch (error) {
      console.error(error);
      alert(`${isLogin ? "Login" : "Signup"} failed!`);
    }
  };

  return (
    <div className="login-signup-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Name input, shown only on Signup */}
        {!isLogin && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}

        {/* Email input */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>

      {/* Switch between Login and Signup */}
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
};

export default LoginSignup;
