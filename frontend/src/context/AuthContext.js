// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            // Optional: Validate token with backend
            axios.get("http://127.0.0.1:8000/api/validate-token/", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
                setIsAuthenticated(true);
            }).catch(() => {
                localStorage.removeItem("accessToken");
                setIsAuthenticated(false);
                navigate("/login");
            });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};