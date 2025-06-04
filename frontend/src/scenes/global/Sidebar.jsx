import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { keyframes } from "@emotion/react";

// Cyberpunk animations
const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6;
  }
  50% {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff;
  }
`;

const scanline = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100vh;
  }
`;

const flicker = keyframes`
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.4;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: selected === title ? "#00f6ff" : colors.grey[100],
        margin: "5px 0",
        borderRadius: "4px",
        transition: "all 0.3s ease",
        background: selected === title 
          ? "linear-gradient(90deg, rgba(0, 114, 255, 0.2) 0%, rgba(0, 200, 255, 0.1) 100%)" 
          : "transparent",
        borderLeft: selected === title ? "3px solid #00f6ff" : "3px solid transparent",
        animation: `${pulse} 4s infinite ${title.length * 0.1}s`,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography 
        sx={{
          fontWeight: selected === title ? "bold" : "normal",
          textShadow: selected === title ? "0 0 5px rgba(0, 246, 255, 0.7)" : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateX(5px)",
          },
        }}
      >
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const username = localStorage.getItem("username");

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const [hueRotation, setHueRotation] = useState(0);

  // Animate hue rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setHueRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        width: "270px",
        "& .pro-sidebar": {
          width: "270px",
        },
        "& .pro-sidebar-inner": {
          background: `linear-gradient(135deg, ${colors.primary[900]} 0%, ${colors.primary[700]} 100%)`,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          borderRight: "1px solid rgba(0, 246, 255, 0.2)",
          boxShadow: "0 0 20px rgba(0, 114, 255, 0.5)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(rgba(0, 246, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "100% 2px",
            animation: `${scanline} 8s linear infinite`,
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, transparent 99%, rgba(0, 246, 255, 0.3) 100%)`,
            animation: `${flicker} 12s infinite`,
            pointerEvents: "none",
          },
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          filter: `hue-rotate(${hueRotation}deg)`,
        },
        "& .pro-inner-item": {
          padding: "8px 35px 8px 20px !important",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#00f6ff !important",
            textShadow: "0 0 10px rgba(0, 246, 255, 0.7)",
            transform: "translateX(5px)",
          },
        },
        "& .pro-menu-item.active": {
          color: "#00f6ff !important",
        },
      }}
    >
      <ProSidebar>
        <Menu iconShape="square">
          {/* LOGO */}
          <MenuItem
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              animation: `${flicker} 8s infinite alternate`,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography 
                variant="h3" 
                sx={{
                  color: `${colors.grey[100]}`,
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: "2px",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    bottom: "-5px",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, #F06649, transparent)",
                    animation: `${pulse} 2s infinite`,
                  },
                  "& span": {
                    animation: `${pulse} 3s infinite ease-in-out`,
                  }
                }}
              >
                Q<span style={{ color: "#F06649" }}>-></span>NU
              </Typography>
            </Box>
          </MenuItem>

          <Box mb="25px" sx={{ animation: `${flicker} 5s infinite alternate` }}>
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center"
              sx={{
                animation: `${pulse} 4s infinite ease-in-out`,
              }}
            >
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={`../../assets/user1.png`}
                style={{ 
                  cursor: "pointer", 
                  borderRadius: "50%",
                  border: "3px solid #00f6ff",
                  boxShadow: "0 0 20px rgba(0, 246, 255, 0.5)",
                  transition: "all 0.3s ease",
                  filter: `hue-rotate(${hueRotation}deg)`,
                }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                sx={{ 
                  m: "10px 0 0 0",
                  color: "#00f6ff",
                  textShadow: "0 0 10px rgba(0, 246, 255, 0.7)",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  animation: `${neonGlow} 3s infinite alternate`,
                }}
              >
                {username}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{
                  color: "#ff00ff",
                  textShadow: "0 0 5px rgba(255, 0, 255, 0.7)",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: "500",
                  animation: `${pulse} 3s infinite 0.5s`,
                }}
              >
                USER
              </Typography>
            </Box>
          </Box>

          <Box paddingLeft="10%">
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h4"
              sx={{ 
                m: "15px 0 5px 20px",
                color: "#ff00ff",
                textShadow: "0 0 5px rgba(255, 0, 255, 0.5)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: "bold",
                letterSpacing: "1px",
                position: "relative",
                animation: `${flicker} 6s infinite`,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-5px",
                  left: 0,
                  width: "50%",
                  height: "1px",
                  background: "linear-gradient(90deg, #ff00ff, transparent)",
                  animation: `${pulse} 2s infinite alternate`,
                }
              }}
            >
              TESTS
            </Typography>
            <Item
              title="NIST SP 800-22B"
              to="/nist_test"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="NIST SP 800-90B"
              to="/nist_test90b"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Die - Harder Tests"
              to="/die_harder_tests"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="QRNG Server"
              to="/qrng_server"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;