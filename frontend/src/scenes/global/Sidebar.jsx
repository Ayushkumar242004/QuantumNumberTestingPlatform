import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  HomeOutlined,
  ChevronRight,
  LogoutOutlined,
  ScienceOutlined,
  AssessmentOutlined,
  StorageOutlined,
  DnsOutlined,
  ChevronLeft,
} from "@mui/icons-material";
import { supabase } from "../../utils/supabaseClient";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: HomeOutlined,
  },
  {
    title: "NIST SP 800-22B",
    href: "/nist_test",
    icon: ScienceOutlined,
  },
  {
    title: "NIST SP 800-90B",
    href: "/nist_test90b",
    icon: AssessmentOutlined,
  },
  {
    title: "Die-Harder Tests",
    href: "/die_harder_tests",
    icon: StorageOutlined,
  },
  {
    title: "QRNG Server",
    href: "/qrng_server",
    icon: DnsOutlined,
  },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "User",
    email: "user@example.com",
    initials: "U",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
  
      if (authError || !user) {
        console.error("Error fetching auth user:", authError);
        return;
      }
  
      const userEmail = user.email;
  
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("username")
        .eq("email", userEmail)
        .single();
  
      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        return;
      }
  
      const username = profile.username || "User";
  
      setUserInfo({
        name: username,
        email: userEmail,
        initials: username
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      });
    };
  
    fetchUserInfo();
  }, []);
  

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // await supabase.auth.signOut();  // Ensure user is logged out from Supabase too
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 500);
  };
  

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        width: isCollapsed ? 80 : 256,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(180deg, #1E1B3A 0%, #2B215D 40%, #3B1F76 100%)",
        display: "flex",
        flexDirection: "column",
        color: "rgba(255, 255, 255, 0.8)",
      }}   
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          p: 2,
          height: 64,
        }}
      >
        {!isCollapsed && (
          <Box display="flex" alignItems="center" >
            <Box>
              <img src="logo.png" alt="QNu Labs" style={{ height: "90px" , marginTop: "9px", marginLeft: "-20px"}} />
            </Box>
          </Box>
        )}
        {/* <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton> */}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 4, px: 2 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          if (isCollapsed) {
            return (
              <Tooltip key={item.title} title={item.title} placement="right">
                <IconButton
                  component={Link}
                  to={item.href}
                  sx={{
                    display: "flex",
                    width: 48,
                    height: 48,
                    mx: "auto",
                    my: 1,
                    color: "rgba(255, 255, 255, 0.7)",
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            );
          }

          return (
            <Button
              key={item.title}
              component={Link}
              to={item.href}
              startIcon={<Icon />}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                borderRadius: "8px",
                mx: 'auto',
                width: 'calc(100% - 32px)',
                mb: 0.5,
                color: "rgba(255, 255, 255, 0.7)",
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {item.title}
            </Button>
          );
        })}
        
       
      </Box>

      {/* User Profile */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {isCollapsed ? (
          <Tooltip title="Logout" placement="right">
             <Avatar
              onClick={handleLogout}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                "&:hover": {
                    bgcolor: "error.main",
                    transform: "scale(1.1)",
                }
              }}
            >
              <LogoutOutlined />
            </Avatar>
          </Tooltip>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  color: "#1C0C5B",
                  fontWeight: "bold",
                }}
              >
                {userInfo.initials}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ color: "white" }}>
                  {userInfo.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  {userInfo.email}
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? (
                  <div className="loader-logout" />
                ) : (
                  <LogoutOutlined sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      <style jsx>{`
        .loader-logout {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
}