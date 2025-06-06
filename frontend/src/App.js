// import { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Nist_test from "./scenes/nist_test";
// import Nist_tests90b from "./scenes/nist_test90b";
// import Qrng_Server from "./scenes/qrng_server";
// import Dieharder_tests from "./scenes/dieharder_tests";
// import UploadReport from "./scenes/reportAnalysis/UploadReport";
// import { CssBaseline, ThemeProvider, Box } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import axios from 'axios';

// function App() {
//   const [theme, colorMode] = useMode();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Effect to handle user login and set username
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       setIsLoggedIn(true);
//       // const checkLoggedInUser = async () => {
//       //   try {
//       //     const config = {
//       //       headers: {
//       //         "Authorization": `Bearer ${token}`,
//       //       },
//       //     };
//       //     const response = await axios.get("http://127.0.0.1:8000/api/user/", config);
//       //     setUsername(response.data.username);
//       //   } catch (error) {
//       //     setIsLoggedIn(false);
//       //     setUsername("");
//       //   }
//       // };
//       // checkLoggedInUser();
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []); // This effect runs only once after the first render

//   useEffect(() => {
//     if (isLoggedIn && location.pathname !== "/login" && location.pathname !== "/register") {
//       localStorage.setItem("currentRoute", location.pathname);
//     }
//   }, [location, isLoggedIn]); // Proper dependency on location and isLoggedIn

//   // PrivateRoute component
//   const PrivateRoute = ({ element }) => {
//     return isLoggedIn ? element : <Navigate to="/login" />;
//   };

//   // ProtectedRouteRedirect component
//   const ProtectedRouteRedirect = ({ element }) => {
//     return isLoggedIn ? <Navigate to="/" /> : element;
//   };

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Box sx={{ display: 'flex', position: 'relative' }}>
//           {isLoggedIn && <Sidebar />}
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               p: 3,
//               width: isLoggedIn ? 'calc(100% - 270px)' : '100%',
//               marginLeft: isLoggedIn ? '270px' : 0,
//               position: 'relative',
//               zIndex: 1,
//               minHeight: '100vh',
//               overflowX: 'hidden'
//             }}
//           >
//             {isLoggedIn && <Topbar />}
//             <Routes>
//               <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
//               <Route path="/nist_test" element={<PrivateRoute element={<Nist_test />} />} />
//               <Route path="/nist_test90b" element={<PrivateRoute element={<Nist_tests90b />} />} />
//               <Route path="/die_harder_tests" element={<PrivateRoute element={<Dieharder_tests />} />} />
//               <Route path="/qrng_server" element={<PrivateRoute element={<Qrng_Server />} />} />
//               <Route path="/report" element={<PrivateRoute element={<UploadReport />} />} />
//               <Route path="/login" element={<ProtectedRouteRedirect element={<Login setIsLoggedIn={setIsLoggedIn} />} />} />
//               <Route path="/register" element={<ProtectedRouteRedirect element={<Register />} />} />
//             </Routes>
//           </Box>
//         </Box>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Nist_test from "./scenes/nist_test";
import Nist_tests90b from "./scenes/nist_test90b";
import Qrng_Server from "./scenes/qrng_server";
import Dieharder_tests from "./scenes/dieharder_tests";
import UploadReport from "./scenes/reportAnalysis/UploadReport";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [username, setUsername] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
  const verifyAuth = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    // Fetch username from localStorage instead of API
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(true);
    setUsername(storedUsername || "");

    // Redirect to saved route or home
    const savedRoute = localStorage.getItem("currentRoute") || "/";
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(savedRoute);
    }
    setIsLoading(false);
  };

  verifyAuth();
}, []);

  useEffect(() => {
    if (isLoggedIn && location.pathname !== "/login" && location.pathname !== "/register") {
      localStorage.setItem("currentRoute", location.pathname);
    }
  }, [location, isLoggedIn]);

  const PrivateRoute = ({ element }) => {
    if (isLoading) return <div>Loading...</div>; // Show loading while verifying auth
    return isLoggedIn ? element : <Navigate to="/login" state={{ from: location }} replace />;
  };

  const ProtectedRouteRedirect = ({ element }) => {
    if (isLoading) return <div>Loading...</div>;
    return isLoggedIn ? <Navigate to="/" replace /> : element;
  };

  if (isLoading) {
    return <div>Loading...</div>; // Initial loading state
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', position: 'relative' }}>
          {isLoggedIn && <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              width: isLoggedIn ? `calc(100% - ${isSidebarCollapsed ? 80 : 256}px)` : '100%',
              marginLeft: isLoggedIn ? `${isSidebarCollapsed ? 80 : 256}px` : 0,
              position: 'relative',
              zIndex: 1,
              minHeight: '100vh',
              overflowX: 'hidden'
            }}
          >
            <Routes>
              <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/nist_test" element={<PrivateRoute element={<Nist_test />} />} />
              <Route path="/nist_test90b" element={<PrivateRoute element={<Nist_tests90b />} />} />
              <Route path="/die_harder_tests" element={<PrivateRoute element={<Dieharder_tests />} />} />
              <Route path="/qrng_server" element={<PrivateRoute element={<Qrng_Server />} />} />
              <Route path="/report" element={<PrivateRoute element={<UploadReport />} />} />
              <Route path="/login" element={<ProtectedRouteRedirect element={<Login setIsLoggedIn={setIsLoggedIn} />} />} />
              <Route path="/register" element={<ProtectedRouteRedirect element={<Register />} />} />
              {/* Add catch-all route to handle refresh */}
              <Route path="*" element={<PrivateRoute element={<Navigate to="/" replace />} />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;