// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import axios from "axios";
// import "./Register.css"; // Use the same CSS file as Register for consistent styling

// export default function Login() {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const [isLoading, setIsLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [error, setError] = useState(null);

//     const handleSubmit = async (e) => {


//         localStorage.setItem("email", formData.email);
//         e.preventDefault();
//         if (isLoading) {
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
//             console.log("Success!", response.data);
//             setSuccessMessage("Login Successful!");
//             localStorage.setItem("accessToken", response.data.tokens.access);
//             // localStorage.setItem("refreshToken", response.data.tokens.refresh);

//              // Redirect to home page on successful login
//              window.location.href = "/";
//         } catch (error) {
//             console.log("Error during Login!", error.response?.data);
//             if (error.response && error.response.data) {
//                 Object.keys(error.response.data).forEach((field) => {
//                     const errorMessages = error.response.data[field];
//                     if (errorMessages && errorMessages.length > 0) {
//                         setError(errorMessages[0]);
//                     }
//                 });
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleRegisterRedirect = () => {
//         window.location.href = "/register"; // Redirect to the register page
//     };

//     return (
//         <div className="register-container">
//             {error && <p className="error-message">{error}</p>}
//             {successMessage && <p className="success-message">{successMessage}</p>}
//             <div className="register-card">
//                 <h2 className="register-title">Login</h2>
//                 <form className="register-form">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Enter your email"
//                     />
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Enter your password"
//                     />
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         onClick={handleSubmit}
//                         className="register-button"
//                     >
//                         {isLoading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>
//                 <div className="login-redirect-container">
//                     <p>Don't have an account?</p>
//                     <button onClick={handleRegisterRedirect} className="login-button">
//                         Register
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
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
            const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
            setSuccessMessage("Login Successful!");
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("email", formData.email);
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                const errorMessages = Object.keys(errorData).flatMap(field => 
                    Array.isArray(errorData[field]) ? errorData[field] : [errorData[field]]
                );
                if (errorMessages.length > 0) {
                    setError(errorMessages[0]);
                }
            } else {
                setError("Login failed. Please try again.");
            }
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