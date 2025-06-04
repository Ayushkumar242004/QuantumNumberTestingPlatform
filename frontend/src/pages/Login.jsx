import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Login.css"; // We'll create this CSS file

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const [neonPulse, setNeonPulse] = useState(false);
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        // Initialize particle animation
        initParticles();
        
        // Start neon pulse animation
        const pulseInterval = setInterval(() => {
            setNeonPulse(prev => !prev);
        }, 3000);

        return () => {
            clearInterval(pulseInterval);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const initParticles = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Create particles
        particlesRef.current = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`
        }));
        
        // Start animation
        animateParticles();
    };

    const animateParticles = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particlesRef.current.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Reset particles that go off screen
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
        
        // Trigger glitch effect
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 500);
        
        if (isLoading) return;
        
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
            console.log("Success!", response.data);
            
            // Success animation
            setSuccessMessage("ACCESS GRANTED");
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("email", formData.email);
            
            // Redirect with cyberpunk style
            setTimeout(() => {
                document.body.style.animation = "fadeOut 1s forwards";
                setTimeout(() => window.location.href = "/", 1000);
            }, 1500);
            
        } catch (error) {
            console.log("Error during Login!", error.response?.data);
            
            // Error animation
            setGlitchEffect(true);
            setTimeout(() => setGlitchEffect(false), 1000);
            
            if (error.response?.data) {
                const firstError = Object.values(error.response.data)[0]?.[0];
                if (firstError) setError(firstError);
            } else {
                setError("CONNECTION FAILED");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterRedirect = () => {
        document.body.style.animation = "slideOutRight 0.8s forwards";
        setTimeout(() => window.location.href = "/register", 800);
    };

    return (
        <div className={`cyberpunk-container ${glitchEffect ? 'glitch' : ''} ${neonPulse ? 'neon-pulse' : ''}`}>
            <canvas ref={canvasRef} className="particle-canvas"></canvas>
            
            <div className="cyberpunk-overlay">
                <div className="scanlines"></div>
                <div className="noise"></div>
            </div>
            
            <div className="cyberpunk-card">
                <div className="cyberpunk-header">
                    <h2 className="cyberpunk-title" data-text="LOGIN">LOGIN</h2>
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="cyberpunk-input"
                        />
                        <div className="cyberpunk-input-border"></div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSubmit}
                        className={`cyberpunk-button ${isLoading ? 'loading' : ''}`}
                    >
                        <span className="cyberpunk-button-text">
                            {isLoading ? "AUTHENTICATING..." : "ACCESS TERMINAL"}
                        </span>
                        <span className="cyberpunk-button-lights"></span>
                    </button>
                </form>
                
                <div className="cyberpunk-redirect">
                    <p className="cyberpunk-text">NEW USER?</p>
                    <button 
                        onClick={handleRegisterRedirect} 
                        className="cyberpunk-link"
                    >
                        REGISTER
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