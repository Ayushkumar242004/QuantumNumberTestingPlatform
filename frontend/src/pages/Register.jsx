import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // We'll use the same CSS as login with minor additions

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const [neonPulse, setNeonPulse] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        initParticles();
        
        const pulseInterval = setInterval(() => {
            setNeonPulse(prev => !prev);
        }, 3000);

        return () => {
            clearInterval(pulseInterval);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    useEffect(() => {
        if (formData.password1 && formData.password2) {
            setPasswordMatch(formData.password1 === formData.password2);
        }
    }, [formData.password1, formData.password2]);

    const initParticles = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        particlesRef.current = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`
        }));
        
        animateParticles();
    };

    const animateParticles = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width || 
                particle.y < 0 || particle.y > canvas.height) {
                particle.x = Math.random() * canvas.width;
                particle.y = Math.random() * canvas.height;
            }
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        animationRef.current = requestAnimationFrame(animateParticles);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!passwordMatch) {
            setError("PASSWORDS DON'T MATCH");
            setGlitchEffect(true);
            setTimeout(() => setGlitchEffect(false), 1000);
            return;
        }

        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 500);
        
        if (isLoading) return;
        
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
            console.log("Success!", response.data);
            
            setSuccessMessage("USER CREATED");
            localStorage.setItem("username", formData.username);
            
            setTimeout(() => {
                document.body.style.animation = "fadeOut 1s forwards";
                setTimeout(() => window.location.href = "/", 1000);
            }, 1500);
            
        } catch (error) {
            console.log("Error during registration!", error.response?.data);
            
            setGlitchEffect(true);
            setTimeout(() => setGlitchEffect(false), 1000);
            
            if (error.response?.data) {
                const firstError = Object.values(error.response.data)[0]?.[0];
                if (firstError) setError(firstError.toUpperCase());
            } else {
                setError("REGISTRATION FAILED");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        document.body.style.animation = "slideOutLeft 0.8s forwards";
        setTimeout(() => window.location.href = "/login", 800);
    };

    return (
        <div className={`cyberpunk-container ${glitchEffect ? 'glitch' : ''} ${neonPulse ? 'neon-pulse' : ''}`}>
            <canvas ref={canvasRef} className="particle-canvas"></canvas>
            
            <div className="cyberpunk-overlay">
                <div className="scanlines"></div>
                <div className="noise"></div>
            </div>
            
            <div className="cyberpunk-card" style={{ height: 'auto', minHeight: '500px' }}>
                <div className="cyberpunk-header">
                    <h2 className="cyberpunk-title" data-text="REGISTER">REGISTER</h2>
                    <div className="cyberpunk-underline"></div>
                </div>
                
                {error && (
                    <div className="cyberpunk-error" data-text={error}>
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div className="cyberpunk-success" data-text={successMessage}>
                        {successMessage}
                    </div>
                )}
                
                <form className="cyberpunk-form">
                    <div className="cyberpunk-input-group">
                        <label className="cyberpunk-label">USERNAME</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="ENTER YOUR USERNAME"
                            className="cyberpunk-input"
                        />
                        <div className="cyberpunk-input-border"></div>
                    </div>
                    
                    <div className="cyberpunk-input-group">
                        <label className="cyberpunk-label">EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="USER@DOMAIN.COM"
                            className="cyberpunk-input"
                        />
                        <div className="cyberpunk-input-border"></div>
                    </div>
                    
                    <div className="cyberpunk-input-group">
                        <label className="cyberpunk-label">PASSWORD</label>
                        <input
                            type="password"
                            name="password1"
                            value={formData.password1}
                            onChange={handleChange}
                            placeholder="********"
                            className="cyberpunk-input"
                        />
                        <div className="cyberpunk-input-border"></div>
                    </div>
                    
                    <div className="cyberpunk-input-group">
                        <label className="cyberpunk-label">CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            placeholder="********"
                            className={`cyberpunk-input ${!passwordMatch && formData.password2 ? 'input-error' : ''}`}
                        />
                        <div className={`cyberpunk-input-border ${!passwordMatch && formData.password2 ? 'border-error' : ''}`}></div>
                        {!passwordMatch && formData.password2 && (
                            <div className="password-mismatch">PASSWORD MISMATCH</div>
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading || !passwordMatch}
                        onClick={handleSubmit}
                        className={`cyberpunk-button ${isLoading ? 'loading' : ''}`}
                    >
                        <span className="cyberpunk-button-text">
                            {isLoading ? "CREATING USER..." : "REGISTER USER"}
                        </span>
                        <span className="cyberpunk-button-lights"></span>
                    </button>
                </form>
                
                <div className="cyberpunk-redirect">
                    <p className="cyberpunk-text">ALREADY HAVE AN ACCOUNT?</p>
                    <button 
                        onClick={handleLoginRedirect} 
                        className="cyberpunk-link"
                    >
                        LOGIN PAGE
                    </button>
                </div>
            </div>
            
            <div className="cyberpunk-grid"></div>
            <div className="cyberpunk-corner cyberpunk-corner-tl"></div>
            <div className="cyberpunk-corner cyberpunk-corner-tr"></div>
            <div className="cyberpunk-corner cyberpunk-corner-bl"></div>
            <div className="cyberpunk-corner cyberpunk-corner-br"></div>
        </div>
    );
}