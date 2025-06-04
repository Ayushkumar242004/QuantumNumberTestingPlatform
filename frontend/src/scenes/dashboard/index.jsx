import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Select,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { Circle } from "@mui/icons-material";
import Header from "../../components/Header";

import StatBox from "../../components/StatBox";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Make sure axios is imported
import CircularProgress from "@mui/material/CircularProgress";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { TextField, MenuItem, FormControl, InputAdornment, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const isLargeScreen = window.innerWidth > 768;
const BinaryGraphDisplay = ({ binaryInput }) => {
  const [graphUrl, setGraphUrl] = useState(null);
  const [error, setError] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  useEffect(() => {
    // Reset body styles
    document.body.style.overflow = 'auto';
    document.body.style.opacity = '1';
    document.body.style.animation = 'none';

    // Remove any leftover canvas
    const canvases = document.querySelectorAll('.particle-canvas');
    canvases.forEach(canvas => canvas.remove());

    // Clean up any overlay elements
    const overlays = document.querySelectorAll('.cyberpunk-overlay');
    overlays.forEach(overlay => overlay.remove());
  }, []);

  useEffect(() => {
    if (!binaryInput || binaryInput === "Error fetching data") return;

    const fetchGraph = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/graph-generation/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ binary_data: binaryInput }),
          }
        );

        if (!response.ok) {
          alert(`Error: Failed to Fetch Graph`);
        }

        const blob = await response.blob();
        const graphImageUrl = URL.createObjectURL(blob);
        setGraphUrl(graphImageUrl);
        setReportUrl(graphImageUrl);
        setError("");
      } catch (err) {
        
        setGraphUrl(null);
        alert(`Error: ${err.message}`);
      }
    };

    fetchGraph();
  }, [binaryInput]);


  return (
    <Box>
      {error && <Typography color="error">{error}</Typography>}
      {graphUrl && (
        <>
          <img
            src={graphUrl}
            alt="Generated Graph"
            style={{ width: "845px", height: "450px" }}
          />

        </>
      )}
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLive, setIsLive] = useState(false);
  const [binaryInput, setBinaryInput] = useState(""); // State to store fetched binary data
  const [binaryInput2, setBinaryInput2] = useState(""); // State to store fetched binary data
  const [url, setUrl] = useState("http://localhost:3001/random-binary"); // Default URL
  const [isFetching, setIsFetching] = useState(false); // Fetching status
  const [intervalId, setIntervalId] = useState(null); // Interval ID
  const [reportUrl, setReportUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [fileHistory, setFileHistory] = useState([]);
  const [loadingProgressn, setLoadingProgressn] = useState(0);
  const [loadingProgressn2, setLoadingProgressn2] = useState(0);
  const [loadingProgressd, setLoadingProgressd] = useState(0);

  // Handle API URL input
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // Format the time as HH:mm:ss
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);


  const [length, setLength] = useState(8);
  const MAX_STACK_SIZE_ESTIMATE = 1 * 1024 * 1024;

  const [resultNIST, setResultNIST] = useState(null);
  const [resultNIST2, setResultNIST2] = useState(null);
  const [resultNIST90B, setResultNIST90B] = useState(null);
  const [resultNIST90B2, setResultNIST90B2] = useState(null);
  const [resultDieharder, setResultDieharder] = useState(null);
  const [resultDieharder2, setResultDieharder2] = useState(null);

  const [scheduledTime2, setScheduledTime2] = useState("");
  const [selectedServer, setSelectedServer] = useState("Server 1");

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingProgressb, setLoadingProgressb] = useState(0);
  const [loadingProgressc, setLoadingProgressc] = useState(0);


  const [loadingProgressRep, setLoadingProgressRep] = useState(0);
  const [loadingProgress2Rep, setLoadingProgress2Rep] = useState(0);

  const [loadingProgress2, setLoadingProgress2] = useState(0);
  const [loadingProgress2b, setLoadingProgress2b] = useState(0);
  const [loadingProgress2c, setLoadingProgress2c] = useState(0);



  const fileInputRef = useRef(null);
  const [uploadTime, setUploadTime] = useState("");
  const [fileName, setFileName] = useState("");

  const [scheduledTime, setScheduledTime] = useState("2025-04-10 11:31:08");
  const [debouncedScheduledTime, setDebouncedScheduledTime] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const jobIdRefn = useRef(null);
  const jobIdRefn2 = useRef(null);
  const jobIdRef = useRef(null);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleTimeChange = (event) => {
    const inputTime = event.target.value;
    setTime(inputTime); // Update the time state immediately
  };

  const handleUseCurrentTime = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime(formattedTime);

  };

  useEffect(() => {
    if (isFetching) {
      if (loadingProgressd === 100 && loadingProgressn === 100 && loadingProgressn2 === 100) {
        fetchRandomNumber(); // Fetch again only when both progress bars are 100
      }
    } else {
      clearInterval(intervalRef.current); // optional cleanup
    }

    return () => clearInterval(intervalRef.current);
  }, [isFetching, loadingProgressd, loadingProgressn, loadingProgressn2]);


  useEffect(() => {
    if (!binaryInput) return; // Do not fetch if binaryInput is empty

    const currentJobId = uuidv4();
    jobIdRefn.current = currentJobId;
    setLoadingProgressn(0);
    let progressInterval;

    const fetchResult = async () => {

      try {

        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 17) * 100);
            setLoadingProgressn(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);


        const response = await axios.post(
          "http://localhost:8000/generate_final_ans/",
          {
            binary_data: binaryInput,
            scheduled_time: scheduledTime,
            job_id: currentJobId,
          }
        );

        clearInterval(progressInterval);
        setLoadingProgressn(100);

        setResultNIST(response.data); // Set the result data
      } catch (error) {
        alert(`Error: ${error.message}`);
        clearInterval(progressInterval);
        setLoadingProgressn(0);

      }
    };

    fetchResult();
  }, [binaryInput]);


  useEffect(() => {
    if (!binaryInput) return;
    const currentJobId = uuidv4();
    jobIdRef.current = currentJobId;
    let progressInterval;
    const fetchResult = async () => {
      setLoadingProgressd(0); // Start loading from 0%

      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 20) * 100);
            setLoadingProgressd(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);



        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_dieharder/",
          {
            binary_data: binaryInput,
            scheduled_time: scheduledTime,
            job_id: currentJobId,
          }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgressd(100); // Set progress to 100% after response is received
        setResultDieharder(response.data); // Set the result data
      } catch (error) {
        alert(`Error: ${error.message}`);
        setLoadingProgressd(0); // Reset progress in case of failure
        clearInterval(progressInterval);
      }
    };

    fetchResult();
  }, [binaryInput]);

  useEffect(() => {
    if (!binaryInput) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRefn2.current = currentJobId;
    let progressInterval;
    const fetchResult = async () => {
      setLoadingProgressn2(0); // Start loading from 0%
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress90b/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);

            setLoadingProgressn2(percent);
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);


        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput,
            scheduled_time: scheduledTime,
            job_id: currentJobId,
          }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgressn2(100); // Set progress to 100% after response is received
        setResultNIST90B(response.data); // Set the result data
      } catch (error) {
        alert(`Error: ${error.message}`);
        clearInterval(progressInterval);
        setLoadingProgressn2(0); // Reset progress in case of failure
      }
    };

    fetchResult();
  }, [binaryInput]);

  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time && !timeRegex.test(time)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time]);

  useEffect(() => {
    if (date && time) {
      setScheduledTime2(`${date} ${time}`);
    }
  }, [date, time]);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // No file selected
  
    // Check if the file is a .txt file
    if (!selectedFile.name.endsWith(".txt")) {
      alert("Please select a binary file of .txt format.");
      event.target.value = ""; // Reset file input
      return;
    }
  
    // Check if the file size exceeds the maximum allowed
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
      event.target.value = ""; // Reset file input
      return;
    }
  
    setFileName(selectedFile.name);
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();
      
      const isBinary = /^[\s01]+$/.test(textData);
      if (!isBinary) {
        alert("Please upload a binary .txt file containing only 0s and 1s.");
        event.target.value = ""; // Reset file input
        return;
      }
      
      // Update binaryInput state with new binary data
      setBinaryInput2(textData);
  
      // Store the current time when the file is uploaded
      const currentTime = new Date().toLocaleTimeString();
      setUploadTime(currentTime); // Update the state with the current time
  
      // Reset the file input to allow the same file to be selected again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };
  

  // Start fetching binary data
  const startFetching = () => {
    if (!isFetching) {
      setIsFetching(true);
      setIsLive(true);
      fetchRandomNumber();
    }
  };



  // Stop fetching binary data
  const stopFetching = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLive(false);
    setIsFetching(false);
  };


  const intervalRef = useRef(null);


  const fetchRandomNumber = async () => {

    // Default values for internal variables
    const API_Key = "6625a404-fcf7-aa22-595f-1ce908fc5ebb";
    const APISalt = "$2a$04$nArWqsGVKLmYJ3ob48c2/.fL8hULjZTJLWdtTEstM4Ss8oqagInmu";
    const Rand_type = 1; // Request binary data
    const Length = length || 8; // If length is not provided, use the passed value or default to 64

    try {
      const response = await axios.post("http://localhost:3003/proxy", {
        API_Key,
        APISalt,
        Rand_type,
        Length,
      });

      if (response.data?.random) {

        setBinaryInput(response.data.random); // Update the state with random binary data
      } 
    } catch (error) {
      alert(`Error: ${error.message}`);
      setBinaryInput("Error fetching data"); // Optionally handle the error state
    }
  };


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime(scheduledTime2);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime2]);

  useEffect(() => {
    if (!binaryInput2 || !debouncedScheduledTime) return;// Do not fetch if binaryInput is empty
    const jobId = uuidv4();
    const fetchResult = async () => {
      setLoadingProgress2(0); // Start loading from 0%
      let progressInterval;

      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress/${jobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 17) * 100);
            console.log(percent);
            setLoadingProgress2(percent);
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);

        const response = await axios.post("http://localhost:8000/generate_final_ans/", {
          binary_data: binaryInput2,
          scheduled_time: debouncedScheduledTime,
          job_id: jobId,
        });

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress2(100); // Set progress to 100% after response is received
        setResultNIST2(response.data); // Set the result data
      } catch (error) {
        alert(`Error: ${error.message}`);
        clearInterval(progressInterval);
        setLoadingProgress2(0); // Reset progress in case of failure
      }
    };

    fetchResult();
  }, [binaryInput2, debouncedScheduledTime]);

  useEffect(() => {
    if (!binaryInput2 || !debouncedScheduledTime) return;// Do not fetch if binaryInput is empty
    const jobId = uuidv4();
    let progressInterval;

    const fetchResult = async () => {
      setLoadingProgress2b(0);
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress90b/${jobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress2b(percent);
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);

        const response = await axios.post("http://localhost:8000/generate_final_ans_nist90b/", {
          binary_data: binaryInput2,
          scheduled_time: debouncedScheduledTime,
          job_id: jobId,
        });

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress2b(100); // Set progress to 100% after response is received
        setResultNIST90B2(response.data); // Set the result data
      } catch (error) {
        alert(`Error: ${error.message}`); 
        clearInterval(progressInterval);
        setLoadingProgress2b(0); // Reset progress in case of failure
      }
    };

    fetchResult();
  }, [binaryInput2, debouncedScheduledTime]);

  useEffect(() => {
    if (!binaryInput2 || !debouncedScheduledTime) return;// Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    let progressInterval;
    const fetchResult = async () => {
      setLoadingProgress2c(0); // Start loading from 0%
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 20) * 100);
            setLoadingProgress2c(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);

        const response = await axios.post("http://localhost:8000/generate_final_ans_dieharder/", {
          binary_data: binaryInput2,
          scheduled_time: debouncedScheduledTime,
          job_id: currentJobId,
        });

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress2c(100); // Set progress to 100% after response is received
        setResultDieharder2(response.data); // Set the result data
      } catch (error) {
        alert(`Error: ${error.message}`);
        setLoadingProgress2c(0); // Reset progress in case of failure
        clearInterval(progressInterval);
      }
    };

    fetchResult();
  }, [binaryInput2, debouncedScheduledTime]);


  useEffect(() => {
    if (!binaryInput || binaryInput === "Error fetching data") return;
    const jobId = uuidv4();
    let progressInterval;
    const fetchResult = async () => {
      setLoadingProgress(0);
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress/${jobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 17) * 100);

            setLoadingProgress(percent);
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);


        // Call the actual NIST testing endpoint
        const response = await axios.post("http://localhost:8000/generate_final_ans/", {
          binary_data: binaryInput,
          scheduled_time: scheduledTime,
          job_id: jobId,

        });

        clearInterval(progressInterval);
        setLoadingProgress(100);
        setResultNIST(response.data);
      } catch (error) {
        alert(`Error: ${error.message}`);
        clearInterval(progressInterval);
        setLoadingProgress(0);
      }
    };

    fetchResult();
  }, [binaryInput]);


  useEffect(() => {
    if (!binaryInput || binaryInput === "Error fetching data") return; // Do not fetch if binaryInput is empty
    const jobId = uuidv4();
    let progressInterval;

    const fetchResult = async () => {
      setLoadingProgressb(0);

      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress90b/${jobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgressb(percent);
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput,
            scheduled_time: scheduledTime,
            job_id: jobId,
          }
        );
        clearInterval(progressInterval); // Stop the interval
        setLoadingProgressb(100); // Set progress to 100% after response is received
        setResultNIST90B(response.data); // Set the result data
      } catch (error) {
        clearInterval(progressInterval);
        alert(`Error: ${error.message}`);
        setLoadingProgressb(0); // Reset progress in case of failure
      }
    };

    fetchResult();
  }, [binaryInput]);

  useEffect(() => {
    if (!binaryInput || binaryInput === "Error fetching data") return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    let progressInterval;

    const fetchResult = async () => {
      setLoadingProgressc(0);
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`http://localhost:8000/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 20) * 100);
            setLoadingProgressc(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            alert(`Error: ${err.message}`);
          }
        }, 1000);

        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_dieharder/",
          {
            binary_data: binaryInput,
            scheduled_time: scheduledTime,
            job_id: currentJobId,
          }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgressc(100); // Set progress to 100% after response is received
        setResultDieharder(response.data); // Set the result data
      } catch (error) {
        alert(`Error: ${error.message}`);
        setLoadingProgressc(0); // Reset progress in case of failure
      }
    };

    fetchResult();
  }, [binaryInput]);


  const handleButtonClick = async (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      setIsGeneratingReportT(true);
      let progressInterval;
      setLoadingProgressRep(0);


      fetch("http://localhost:8000/pdf-report-server/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput, job_id: currentJobId }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgressRep(100); // Done
          setIsGeneratingReportT(false);
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
          clearInterval(progressInterval);
          setLoadingProgressRep(0);
        });

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`http://localhost:8000/get_progress_server/${currentJobId}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 52) * 100);
          setLoadingProgressRep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err.message}`);
        }
      }, 1000);

    }
  };


  const handleButtonClick2 = async (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      setIsGeneratingReport(true);
      let progressInterval;
      setLoadingProgress2Rep(0);


      fetch("http://localhost:8000/pdf-report-server/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput2, job_id: currentJobId }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress2Rep(100); // Done
          setIsGeneratingReport(false);
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
          clearInterval(progressInterval);
          setLoadingProgress2Rep(0);
        });

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`http://localhost:8000/get_progress_server/${currentJobId}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 52) * 100);

          setLoadingProgress2Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err.message}`);
        }
      }, 1000);

    }
  };


  useEffect(() => {
    // Fetch from localStorage and get latest 10 entries (most recent last)
    const stored = JSON.parse(localStorage.getItem("fileUploadLog") || "[]");
    const latestTen = stored.slice(-10).reverse(); // show most recent at top
    setFileHistory(latestTen);
  }, []);

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isGeneratingReportT, setIsGeneratingReportT] = useState(false);




  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to our dashboard" />
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          gap="10px"
          sx={{
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: colors.primary[700],
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            maxWidth: "fit-content",
            margin: "0 auto",
            "& > *": {
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-1px)"
              }
            }
          }}
        >

          {/* Compact Action Buttons */}
          <Button
            onClick={startFetching}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: colors.greenAccent[400],
              color: colors.primary[100],
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: "bold",
              minWidth: "100px",
              "&:hover": {
                backgroundColor: colors.greenAccent[500],
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
              }
            }}
          >
            Start
          </Button>

          <Button
            onClick={stopFetching}
            disabled={!isFetching}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: isFetching ? colors.redAccent[400] : colors.primary[300],
              color: colors.primary[100],
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: "bold",
              minWidth: "100px",
              "&:hover": {
                backgroundColor: isFetching ? colors.redAccent[500] : colors.primary[300],
                boxShadow: isFetching ? "0 2px 6px rgba(0,0,0,0.15)" : "none"
              }
            }}
          >
            Stop
          </Button>

          {/* Compact Length Input */}
          <TextField
            label=""
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            variant="outlined"
            size="small"
            sx={{
              width: "90px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.grey[400]
                },
                "&:hover fieldset": {
                  borderColor: colors.grey[100]
                }
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                fontSize: "12px",
                transform: "translate(14px, 10px) scale(1)"
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
                fontSize: "12px",
                padding: "8.5px 14px"
              }
            }}
          />




          {/* Compact Live Indicator */}
          {isLive && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                backgroundColor: "#4caf50",
                color: "#ffffff",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "12px",
                boxShadow: "0 1px 6px rgba(76, 175, 80, 0.3)",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.5)" },
                  "70%": { boxShadow: "0 0 0 6px rgba(76, 175, 80, 0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0)" }
                }
              }}
            >
              <Circle sx={{ color: "#ffffff", fontSize: "12px" }} />
              Live
            </Box>
          )}
        </Box>

        <Box position="relative" display="inline-flex">
          <Button
            variant="contained"
            onClick={() => handleButtonClick("report")}
            disabled={loadingProgressd < 100 || loadingProgressn < 100 || loadingProgressn2 < 100}
            sx={{
              backgroundColor: colors.redAccent[400],
              color: colors.grey[100],
              textTransform: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              transition: 'all 0.3s ease',
              "&:hover": {
                backgroundColor: colors.redAccent[500],
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
              },
              "&:disabled": {
                backgroundColor: colors.grey[700],
                color: colors.grey[500],
              },
              position: 'relative', // Added for the green dot positioning
            }}
          >
            Download Report
            {/* Green dot indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: colors.greenAccent[500],
                opacity: isGeneratingReportT && loadingProgressRep < 100 ? 1 : 0,
                transition: 'opacity 0.3s ease',
                boxShadow: `0 0 6px ${colors.greenAccent[500]}`,
              }}
            />

            {loadingProgressRep <= 100 && (
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '3px',
                  backgroundColor: colors.greenAccent[500],
                  width: `${loadingProgressRep}%`,
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: '0 0 8px 8px',
                }}
              />
            )}
          </Button>

          {loadingProgressRep <= 100 && (
            <Box
              position="absolute"
              bottom={-12}
              right={-12}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="44px"
              height="44px"
              p="2px"
              borderRadius="50%"
              sx={{
                backgroundColor: colors.grey[800],
                border: `2px solid ${colors.grey[600]}`,
                transform: loadingProgressRep > 0 ? 'scale(1)' : 'scale(0)',
                opacity: loadingProgressRep > 0 ? 1 : 0,
                transition: 'all 0.3s ease',
              }}
            >
              <CircularProgress
                variant="determinate"
                value={loadingProgressRep}
                size={40}
                thickness={4}
                sx={{
                  color: colors.greenAccent[500],
                }}
              />
              <Typography
                variant="caption"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                sx={{
                  position: 'absolute',
                  fontSize: '0.75rem',
                }}
              >
                {loadingProgressRep}%
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >


          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            {/* StatBox Content */}
            <StatBox
              title={resultNIST ? resultNIST.final_result : ""}
              subtitle="Result SP 800-22B  Tests"
            />

            {/* Loading Progress on Right */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p="5px"
            >
              <CircularProgress
                variant="determinate"
                value={loadingProgressn}
                size={50}
                thickness={5}
                sx={{ color: "green" }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                color="white"
                mt="5px"
              >
                {loadingProgressn}%
              </Typography>
            </Box>
          </Box>


        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            {/* StatBox Content */}
            <StatBox
              title={resultNIST90B ? resultNIST90B.final_result : ""}
              subtitle="Result SP 800-90B  Tests"
            />

            {/* Loading Progress on Right */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p="5px"
            >
              <CircularProgress
                variant="determinate"
                value={loadingProgressn2}
                size={50}
                thickness={5}
                sx={{ color: "green" }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                color="white"
                mt="5px"
              >
                {loadingProgressn2}%
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            {/* StatBox Content */}
            <StatBox
              title={resultDieharder ? resultDieharder.final_result : ""}
              subtitle="Result Dieharder"
            />

            {/* Loading Progress on Right */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p="5px"
            >
              <CircularProgress
                variant="determinate"
                value={loadingProgressd}
                size={50}
                thickness={5}
                sx={{ color: "green" }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                color="white"
                mt="5px"
              >
                {loadingProgressd}%
              </Typography>
            </Box>
          </Box>

        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={currentTime || "Loading..."}
            subtitle="Current Time"

            icon={
              <AccessTimeOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Generated Graph
              </Typography>
            </Box>

          </Box>

          <div
            style={{
              width: "100%",
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: "scale(0.9)", // Adjust scale dynamically if needed
                transformOrigin: "center",
              }}
            >
              <BinaryGraphDisplay binaryInput={binaryInput} />
            </div>
          </div>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Data History
            </Typography>
          </Box>

          {fileHistory.length === 0 ? (
            <Typography color={colors.grey[300]} p="15px">
              No file uploads yet.
            </Typography>
          ) : (
            fileHistory.map((entry, i) => (
              <Box
                key={`${entry.filename}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {entry.filename}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{entry.scheduledTime}</Box>
              </Box>
            ))
          )}
        </Box>



      </Box>

      <Box
        mt="40px"
        p="20px"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "8px",
        }}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            "& th": {
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              padding: "12px",
            },
            "& td": {
              padding: "12px",
              border: `1px solid ${colors.blueAccent[500]}`,
            },
          }}
        >
          <thead>
            <tr>

              <th style={{ width: "20%" }}>Upload File</th>
              <th style={{ width: "10%" }}>SP 800-22B Result</th>
              <th style={{ width: "5%" }}>Progress Bar</th>
              <th style={{ width: "10%" }}>SP 800-90B Result</th>
              <th style={{ width: "5%" }}>Progress Bar</th>
              <th style={{ width: "10%" }}>DieHarder Result</th>
              <th style={{ width: "5%" }}>Progress Bar</th>
              <th style={{ width: "10%" }}>Uploading Time</th>
              <th style={{ width: "10%" }}>Filename</th>
              <th style={{ width: "15%" }}>Scheduling Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt="10px" gap="10px">
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      onClick={handleFileUpload}
                      sx={{
                        backgroundColor: colors.greenAccent[400],
                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[500],
                        },
                      }}
                    >
                      Upload Binary File
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick2("report")}
                        disabled={loadingProgress2 < 100 || loadingProgress2b < 100 || loadingProgress2c < 100}
                        sx={{
                          backgroundColor: colors.redAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.redAccent[500],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                          position: 'relative', // Added for the green dot positioning
                        }}
                      >
                        Generate Report
                        {/* Green dot indicator */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: colors.greenAccent[500],
                            opacity: isGeneratingReport && loadingProgress2Rep < 100 ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            boxShadow: `0 0 6px ${colors.greenAccent[500]}`,
                          }}
                        />

                        {loadingProgress2Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress2Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress2Rep <= 100 && (
                        <Box
                          position="absolute"
                          bottom={-12}
                          right={-12}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          width="44px"
                          height="44px"
                          p="2px"
                          borderRadius="50%"
                          sx={{
                            backgroundColor: colors.grey[800],
                            border: `2px solid ${colors.grey[600]}`,
                            transform: loadingProgress2Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress2Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress2Rep}
                            size={40}
                            thickness={4}
                            sx={{
                              color: colors.greenAccent[500],
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={colors.greenAccent[500]}
                            sx={{
                              position: 'absolute',
                              fontSize: '0.75rem',
                            }}
                          >
                            {loadingProgress2Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </td>
              <td>{resultNIST2 ? resultNIST2.final_result : ""}</td>
              <td>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                  p="5px"
                >
                  <CircularProgress
                    variant="determinate"
                    value={loadingProgress2} // Updated progress state
                    size={50}
                    thickness={5}
                    sx={{
                      color: "green",
                    }}
                  />
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
                    {loadingProgress2}%
                  </Typography>
                </Box>
              </td>


              <td>{resultNIST90B2 ? resultNIST90B2.final_result : ""}</td>
              <td>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                  p="5px"
                >
                  <CircularProgress
                    variant="determinate"
                    value={loadingProgress2b} // Updated progress state
                    size={50}
                    thickness={5}
                    sx={{
                      color: "green",
                    }}
                  />
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
                    {loadingProgress2b}%
                  </Typography>
                </Box>
              </td>


              <td>{resultDieharder2 ? resultDieharder2.final_result : ""}</td>

              <td>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                  p="5px"
                >
                  <CircularProgress
                    variant="determinate"
                    value={loadingProgress2c} // Updated progress state
                    size={50}
                    thickness={5}
                    sx={{
                      color: "green",
                    }}
                  />
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
                    {loadingProgress2c}%
                  </Typography>
                </Box>
              </td>


              <td>{uploadTime || ""}</td>
              <td>{fileName || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                    },
                    marginBottom: "10px",
                  }}
                />

                {/* Time Input */}
                <TextField
                  label="Enter Time (HH:mm:ss)"
                  placeholder="e.g., 14:30:00"
                  value={time}
                  onChange={handleTimeChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "150px", // Reduced width
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                      color: "white", // Input text color (optional)
                      "&::placeholder": {
                        color: "white", // Placeholder color
                        opacity: 1,     // Required to override default opacity
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Current Time" arrow>
                          <IconButton
                            onClick={handleUseCurrentTime}
                            edge="end"
                            sx={{
                              padding: "4px", // Smaller padding
                            }}
                          >
                            <AccessTimeIcon
                              sx={{
                                fontSize: "18px", // Smaller icon
                                color: "black",   // Black color
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Display Combined Scheduled Time */}
                <Typography variant="body2" mt={0.5} sx={{ color: "#4CCEAC" }}>
                  Scheduled Time: {scheduledTime2 || "Not set"}
                </Typography>
              </td>


            </tr>


          </tbody>
        </Box>


      </Box>

      <Box
        sx={{
          background: "linear-gradient(135deg, #1F2A40 30%, #29314F 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "250px",
          textAlign: "center",

          mt: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "hidden",
          '&:hover': {
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.4)",
          },
          transition: "all 0.5s ease",
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            left: -50,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            animation: "float 15s infinite ease-in-out",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
            animation: "float 18s infinite ease-in-out 2s",
          }}
        />

        {/* Floating AI Elements with animation */}
        <AutoAwesomeIcon
          sx={{
            position: "absolute",
            top: 20,
            left: 30,
            fontSize: 40,
            color: "rgba(255, 255, 255, 0.3)",
            animation: "pulse 4s infinite ease-in-out",
          }}
        />
        <AutoAwesomeIcon
          sx={{
            position: "absolute",
            bottom: 20,
            right: 30,
            fontSize: 40,
            color: "rgba(255, 255, 255, 0.3)",
            animation: "pulse 5s infinite ease-in-out 1s",
          }}
        />

        {/* Animated Gemini Logo */}
        <Box
          component="img"
          src="/image.png"
          alt="Gemini Logo"
          sx={{
            width: 80,
            height: "auto",
            mb: 2,
            borderRadius: "12px",
            transition: "all 0.5s ease",
            transform: "translateY(0)",
            animation: "floatLogo 6s infinite ease-in-out",
            '&:hover': {
              transform: "scale(1.1) rotate(5deg)",
            }
          }}
        />

        {/* Button with enhanced animation */}
        <Button
          variant="contained"
          onClick={() => {
            window.open("http://localhost:3000/report", "_blank");
          }}
          sx={{
            backgroundColor: "#E63946",
            color: "white",
            textTransform: "none",
            padding: "15px 40px",
            fontSize: "1.5rem",
            width: "50%",
            maxWidth: "320px",
            borderRadius: "8px",
            transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            '&:hover': {
              backgroundColor: "#F77F00",
              transform: "scale(1.05)",
              boxShadow: "0px 8px 20px rgba(255, 99, 71, 0.6)",
            },
            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transition: "all 0.7s ease",
              zIndex: -1,
            },
            '&:hover::before': {
              left: "100%",
            }
          }}
        >
          Analyze with AI
        </Button>

        {/* Glow effect on hover */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at center, rgba(230, 57, 70, 0.1) 0%, transparent 70%)",
            opacity: 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
            '&:hover': {
              opacity: 1,
            }
          }}
        />
      </Box>

      {/* Define keyframes in your global styles */}
      <style jsx global>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-20px) translateX(20px);
    }
  }
  
  @keyframes floatLogo {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.1);
    }
  }
`}</style>

    </Box>
  );
};

export default Dashboard;
