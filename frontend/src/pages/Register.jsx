import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { supabase } from "../utils/supabaseClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const strength = {
      length: formData.password1.length >= 8,
      uppercase: /[A-Z]/.test(formData.password1),
      lowercase: /[a-z]/.test(formData.password1),
      number: /[0-9]/.test(formData.password1),
      specialChar: /[^A-Za-z0-9]/.test(formData.password1),
    };
    setPasswordStrength(strength);
  }, [formData.password1]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // import { supabase } from "../utils/supabaseClient"; // already present

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isLoading) return;

  if (!Object.values(passwordStrength).every(Boolean)) {
    toast.error("Password doesn't meet all requirements!");
    return;
  }

  if (formData.password1 !== formData.password2) {
    toast.error("Passwords do not match!");
    return;
  }

  setIsLoading(true);
  try {
    // Register with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password1,
      options: {
        data: {
          username: formData.username,
        },
      },
    });

    if (error) throw error;

    // Insert into custom users table
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ username: formData.username, email: formData.email }]);

    if (insertError) throw insertError;

    toast.success("🎉 Registration successful! Please verify your email.");
    setTimeout(() => navigate("/login"), 3000);
  } catch (error) {
    console.error("Registration error:", error.message);
    toast.error("Registration failed: " + error.message);
  } finally {
    setIsLoading(false);
  }
};


  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="background-animation"></div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ width: "200px", fontSize: "14px" }}
        toastStyle={{
          borderRadius: "8px",
          padding: "5px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          marginTop: "2em"
        }}
        progressStyle={{ height: "1px" }}
      />
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join us to get started</p>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password1"
                value={formData.password1}
                onChange={handleChange}
                placeholder="Create your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FontAwesomeIcon icon="fa-solid " style={{ color: "#B197FC" }} /> : <FontAwesomeIcon icon="fa-solid" style={{ color: "#B197FC" }} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="register-button"
          >
            {isLoading ? (
              <span className="button-loader"></span>
            ) : (
              "Register Now"
            )}
          </button>
        </form>
        <div className="login-redirect">
          <p>Already have an account?</p>
          <p onClick={handleLoginRedirect} className="sign-in-button">
            Sign In
          </p>
        </div>
      </div>
    </div>
  );
}