// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
// import axios from "axios";
// import "./Register.css"; // Import the CSS file
// import { supabase } from "../utils/supabaseClient"; // Import Supabase client

// export default function Register() {
// 	const navigate = useNavigate(); // Hook to navigate programmatically

// 	const [formData, setFormData] = useState({
// 		username: "",
// 		email: "",
// 		password1: "",
// 		password2: "",
// 	});

// 	const handleChange = (e) => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const [isLoading, setIsLoading] = useState(false);
// 	const [successMessage, setSuccessMessage] = useState(null);
// 	const [error, setError] = useState(null);

// 	const handleSubmit = async (e) => {
// 		localStorage.setItem("username", formData.username);
// 		e.preventDefault();
// 		if (isLoading) {
// 			return;
// 		}

// 		setIsLoading(true);

// 		try {
// 			const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
// 			console.log("Success!", response.data);
// 			setSuccessMessage("Registration Successful!");

// 			// Store the username in Supabase
// 			console.log("Data to insert:", { username: formData.username });

// 			const { data,error } = await supabase
// 			.from("users") // Replace "users" with your Supabase table name
// 			.insert([{ username: formData.username }]); // Insert the username
	  
// 		  if (error) {
// 			console.error("Error inserting username into Supabase:", error);
// 			setError("Failed to store user information. Please try again.");
// 			return;
// 		  }
	  
// 		  console.log("Username successfully stored in Supabase!");
	  
// 			window.location.href = "/";
// 		} catch (error) {
// 			console.log("Error during registration!", error.response?.data);
// 			if (error.response && error.response.data) {
// 				Object.keys(error.response.data).forEach((field) => {
// 					const errorMessages = error.response.data[field];
// 					if (errorMessages && errorMessages.length > 0) {
// 						setError(errorMessages[0]);
// 					}
// 				});
// 			}
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const handleLoginRedirect = () => {
// 		navigate("/login"); // Redirect to the login page
// 	};

// 	return (
// 		<div className="register-container">
// 			{error && <p className="error-message">{error}</p>}
// 			{successMessage && <p className="success-message">{successMessage}</p>}
// 			<div className="register-card">
// 				<h2 className="register-title">Register</h2>
// 				<form className="register-form">
// 					<label>Username</label>
// 					<input
// 						type="text"
// 						name="username"
// 						value={formData.username}
// 						onChange={handleChange}
// 						placeholder="Enter your username"
// 					/>
// 					<label>Email</label>
// 					<input
// 						type="email"
// 						name="email"
// 						value={formData.email}
// 						onChange={handleChange}
// 						placeholder="Enter your email"
// 					/>
// 					<label>Password</label>
// 					<input
// 						type="password"
// 						name="password1"
// 						value={formData.password1}
// 						onChange={handleChange}
// 						placeholder="Enter your password"
// 					/>
// 					<label>Confirm Password</label>
// 					<input
// 						type="password"
// 						name="password2"
// 						value={formData.password2}
// 						onChange={handleChange}
// 						placeholder="Re-enter your password"
// 					/>
// 					<button
// 						type="submit"
// 						disabled={isLoading}
// 						onClick={handleSubmit}
// 						className="register-button"
// 					>
// 						{isLoading ? "Registering..." : "Register"}
// 					</button>
// 				</form>
// 				{/* Add Login Button */}
// 				<div className="login-redirect-container">
// 					<p >Already have an account?</p>
// 					<button onClick={handleLoginRedirect} className="login-button">
// 						Login
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      localStorage.setItem("username", formData.username);
      const { error } = await supabase
        .from("users")
        .insert([{ username: formData.username }]);
      if (error) throw error;
      toast.success("🎉 Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
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
                {showPassword ? <FontAwesomeIcon icon="fa-solid fa-eye" style={{ color: "#B197FC" }} /> : <FontAwesomeIcon icon="fa-solid fa-eye-slash" style={{ color: "#B197FC" }} />}
              </button>
            </div>
            {/* <div className="password-strength">
              <div className="strength-meter">
                <div
                  className={`strength-bar ${passwordStrength.length && passwordStrength.uppercase && passwordStrength.lowercase && passwordStrength.number && passwordStrength.specialChar ? 'strong' :
                    passwordStrength.length && (passwordStrength.uppercase || passwordStrength.lowercase || passwordStrength.number || passwordStrength.specialChar) ? 'medium' : 'weak'}`}
                ></div>
              </div>
              <ul className="strength-rules">
                <li className={passwordStrength.length ? "valid" : "invalid"}>
                  At least 8 characters
                </li>
                <li className={passwordStrength.uppercase ? "valid" : "invalid"}>
                  Uppercase letter
                </li>
                <li className={passwordStrength.lowercase ? "valid" : "invalid"}>
                  Lowercase letter
                </li>
                <li className={passwordStrength.number ? "valid" : "invalid"}>
                  Number
                </li>
                <li className={passwordStrength.specialChar ? "valid" : "invalid"}>
                  Special character
                </li>
              </ul>
            </div> */}
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