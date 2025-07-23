import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
  
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      // Step 1: Authenticate user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
  
      if (error) throw error;
  
      // Step 2: Fetch corresponding username from `users` table
      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("username")
        .eq("email", formData.email)
        .single();
  
      if (profileError) {
        console.error("Error fetching username:", profileError.message);
        throw new Error("Login failed: Could not fetch user profile.");
      }
  
      // Step 3: Store details in localStorage
      localStorage.setItem("accessToken", data.session.access_token);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("username", userProfile.username);
  
      setSuccessMessage("Login Successful!");
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <div className="background-animation"></div>
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue</p>
        </div>
        {error && <div className="login-error">{error}</div>}
        {successMessage && <div className="login-success">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="login-input-group">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`login-button${isLoading ? " loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-loader"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="login-redirect">
          <span className="login-text">Don't have an account?</span>
          <button className="login-link" onClick={() => navigate("/register")}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
