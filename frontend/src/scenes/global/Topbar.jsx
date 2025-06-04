import { Box, Button, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, keyframes } from "@mui/system";

// Subtle animation for the search bar focus
const fadeIn = keyframes`
  from {
    opacity: 0.8;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Button hover animation
const buttonHover = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  }
`;

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "4px",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-1px)",
  },
  "&:focus-within": {
    animation: `${fadeIn} 0.3s ease`,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: "8px",
    transition: "all 0.3s ease",
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.dark,
  color: theme.palette.error.contrastText,
  padding: "8px 16px",
  borderRadius: "4px",
  textTransform: "none",
  fontWeight: 500,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    animation: `${buttonHover} 0.3s ease forwards`,
  },
}));

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 500);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      p={2}
      sx={{
        backgroundColor: colors.primary[900],
        borderBottom: `1px solid ${colors.grey[800]}`,
      }}
    >
      {/* SEARCH BAR */}
      <SearchContainer>
        <SearchInput sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
        <Button 
          type="button" 
          sx={{ 
            p: 1,
            minWidth: "auto",
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.primary[700],
            }
          }}
        >
          <SearchIcon />
        </Button>
      </SearchContainer>

      {/* LOGOUT BUTTON */}
      <LogoutButton
        onClick={handleLogout}
        disabled={isLoggingOut}
        sx={{
          opacity: isLoggingOut ? 0.7 : 1,
          transform: isLoggingOut ? "scale(0.98)" : "scale(1)",
        }}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </LogoutButton>
    </Box>
  );
};

export default Topbar;