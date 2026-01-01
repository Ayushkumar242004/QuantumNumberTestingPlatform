import { useEffect, useState } from "react";
import { Box, Typography, Fade } from "@mui/material";
import { Warning } from "@mui/icons-material";

const InternetIssuePopup = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000); // Show for 1 second

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <Fade in={visible} timeout={300}>
      <Box
        sx={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          backgroundColor: "#d32f2f",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: 2,
          minWidth: "200px",
          animation: "slideDown 0.3s ease-out",
          "@keyframes slideDown": {
            from: {
              transform: "translateX(-50%) translateY(-20px)",
              opacity: 0,
            },
            to: {
              transform: "translateX(-50%) translateY(0)",
              opacity: 1,
            },
          },
        }}
      >
        <Warning sx={{ fontSize: 24 }} />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Internet Issue
        </Typography>
      </Box>
    </Fade>
  );
};

export default InternetIssuePopup;

