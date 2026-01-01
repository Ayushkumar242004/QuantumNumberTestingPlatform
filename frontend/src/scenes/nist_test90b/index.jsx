import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Make sure axios is imported
import CircularProgress from "@mui/material/CircularProgress";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { MenuItem, FormControl, InputAdornment, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { supabase } from '../../utils/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';
const MAX_STACK_SIZE_ESTIMATE = 150 * 1024 * 1024;

const Nist_tests90b = () => {
  const theme = useTheme();

  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

  const colors = tokens(theme.palette.mode);
  const [binaryInput, setBinaryInput] = useState("");
  const [binaryInput2, setBinaryInput2] = useState("");
  const [binaryInput3, setBinaryInput3] = useState("");
  const [binaryInput4, setBinaryInput4] = useState("");
  const [binaryInput5, setBinaryInput5] = useState("");

  useEffect(() => {
    // Reset body styles
    document.body.style.overflow = "auto";
    document.body.style.opacity = "1";
    document.body.style.animation = "none";

    // Remove any leftover canvas
    const canvases = document.querySelectorAll(".particle-canvas");
    canvases.forEach((canvas) => canvas.remove());

    // Clean up any overlay elements
    const overlays = document.querySelectorAll(".cyberpunk-overlay");
    overlays.forEach((overlay) => overlay.remove());
  }, []);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);


  const [result, setResult] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [result4, setResult4] = useState("");
  const [result5, setResult5] = useState("");


  const [uploadTime, setUploadTime] = useState("");
  const [uploadTime2, setUploadTime2] = useState("");
  const [uploadTime3, setUploadTime3] = useState("");
  const [uploadTime4, setUploadTime4] = useState("");
  const [uploadTime5, setUploadTime5] = useState("");

  const [fileName, setFileName] = useState(""); // New state to store filename
  const [fileName2, setFileName2] = useState(""); // New state to store filename
  const [fileName3, setFileName3] = useState(""); // New state to store filename
  const [fileName4, setFileName4] = useState(""); // New state to store filename
  const [fileName5, setFileName5] = useState(""); // New state to store filename


  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [date2, setDate2] = useState("");
  const [time2, setTime2] = useState("");

  const [date3, setDate3] = useState("");
  const [time3, setTime3] = useState("");

  const [date4, setDate4] = useState("");
  const [time4, setTime4] = useState("");

  const [date5, setDate5] = useState("");
  const [time5, setTime5] = useState("");


  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [isEnabled3, setIsEnabled3] = useState(true);
  const [isEnabled4, setIsEnabled4] = useState(true);
  const [isEnabled5, setIsEnabled5] = useState(true);

  const [isDateEnabled, setIsDateEnabled] = useState(true);
  const [isTimeEnabled, setIsTimeEnabled] = useState(true);

  const [isDateEnabled2, setIsDateEnabled2] = useState(true);
  const [isTimeEnabled2, setIsTimeEnabled2] = useState(true);

  const [isDateEnabled3, setIsDateEnabled3] = useState(true);
  const [isTimeEnabled3, setIsTimeEnabled3] = useState(true);

  const [isDateEnabled4, setIsDateEnabled4] = useState(true);
  const [isTimeEnabled4, setIsTimeEnabled4] = useState(true);

  const [isDateEnabled5, setIsDateEnabled5] = useState(true);
  const [isTimeEnabled5, setIsTimeEnabled5] = useState(true);


  const timeDebounceRef = useRef(null);
  const timeDebounceRef2 = useRef(null);
  const timeDebounceRef3 = useRef(null);
  const timeDebounceRef4 = useRef(null);
  const timeDebounceRef5 = useRef(null);



  const fetchUserId = async () => {
    const username = localStorage.getItem("username"); // Retrieve the username from localStorage
    if (!username) {

      return null;
    }

    try {
      const { data, error } = await supabase
        .from("users") // Replace "users" with your Supabase table name
        .select("id") // Fetch the user ID
        .eq("username", username); // Filter by username

      if (error || data.length === 0) {

        return null;
      }

      return data[0].id; // Return the user ID
    } catch (err) {

      return null;
    }
  };

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange2 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate2(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange3 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate3(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange4 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate4(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange5 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate5(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleTimeChange = (event) => {
    const inputTime = event.target.value;
    setTime(inputTime); // Update the time state immediately

    // Clear existing timeout
    if (timeDebounceRef.current) {
      clearTimeout(timeDebounceRef.current);
    }

    // Disable time input after 500ms if upload is in progress
    timeDebounceRef.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload_90b');
      const storedProgress = sessionStorage.getItem('uploadProgress_90b');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled(false);
      }
    }, 500);
  };

  const handleTimeChange2 = (event) => {
    const inputTime = event.target.value;
    setTime2(inputTime);

    if (timeDebounceRef2.current) {
      clearTimeout(timeDebounceRef2.current);
    }

    timeDebounceRef2.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload_90b2');
      const storedProgress = sessionStorage.getItem('uploadProgress_90b2');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled2(false);
      }
    }, 500);
  };

  const handleTimeChange3 = (event) => {
    const inputTime = event.target.value;
    setTime3(inputTime);

    if (timeDebounceRef3.current) {
      clearTimeout(timeDebounceRef3.current);
    }

    timeDebounceRef3.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload_90b3');
      const storedProgress = sessionStorage.getItem('uploadProgress_90b3');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled3(false);
      }
    }, 500);
  };

  const handleTimeChange4 = (event) => {
    const inputTime = event.target.value;
    setTime4(inputTime);

    if (timeDebounceRef4.current) {
      clearTimeout(timeDebounceRef4.current);
    }

    timeDebounceRef4.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload_90b4');
      const storedProgress = sessionStorage.getItem('uploadProgress_90b4');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled4(false);
      }
    }, 500);
  };

  const handleTimeChange5 = (event) => {
    const inputTime = event.target.value;
    setTime5(inputTime);

    if (timeDebounceRef5.current) {
      clearTimeout(timeDebounceRef5.current);
    }

    timeDebounceRef5.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload_90b5');
      const storedProgress = sessionStorage.getItem('uploadProgress_90b5');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled5(false);
      }
    }, 500);
  };

  const handleUseCurrentTime = () => {
    if (!isTimeEnabled) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime(formattedTime);

  };

  const handleUseCurrentTime2 = () => {
    if (!isTimeEnabled2) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime2(formattedTime);

  };

  const handleUseCurrentTime3 = () => {
    if (!isTimeEnabled3) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime3(formattedTime);

  };

  const handleUseCurrentTime4 = () => {
    if (!isTimeEnabled4) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime4(formattedTime);

  };

  const handleUseCurrentTime5 = () => {
    if (!isTimeEnabled5) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime5(formattedTime);

  };

  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation
    const timeouts = [];

    // Validate each time input
    if (time) {
      const timeout = setTimeout(() => {
        if (!timeRegex.test(time)) {
          alert("Invalid time format. Use HH:mm:ss (24-hour format).");
        }
      }, 5000);
      timeouts.push(timeout);
    }

    if (time2) {
      const timeout = setTimeout(() => {
        if (!timeRegex.test(time2)) {
          alert("Invalid time format. Use HH:mm:ss (24-hour format).");
        }
      }, 5000);
      timeouts.push(timeout);
    }

    if (time3) {
      const timeout = setTimeout(() => {
        if (!timeRegex.test(time3)) {
          alert("Invalid time format. Use HH:mm:ss (24-hour format).");
        }
      }, 5000);
      timeouts.push(timeout);
    }

    if (time4) {
      const timeout = setTimeout(() => {
        if (!timeRegex.test(time4)) {
          alert("Invalid time format. Use HH:mm:ss (24-hour format).");
        }
      }, 5000);
      timeouts.push(timeout);
    }

    if (time5) {
      const timeout = setTimeout(() => {
        if (!timeRegex.test(time5)) {
          alert("Invalid time format. Use HH:mm:ss (24-hour format).");
        }
      }, 5000);
      timeouts.push(timeout);
    }

    // Cleanup all timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [time, time2, time3, time4, time5]);


  useEffect(() => {
    // Array of date, time, and setter pairs
    const dateTimePairs = [
      [date, time, setScheduledTime],
      [date2, time2, setScheduledTime2],
      [date3, time3, setScheduledTime3],
      [date4, time4, setScheduledTime4],
      [date5, time5, setScheduledTime5]
    ];

    // Process each date-time pair
    dateTimePairs.forEach(([currentDate, currentTime, setScheduledTimeFunc]) => {
      if (currentDate && currentTime) {
        const formattedDateTime = `${currentDate} ${currentTime}`;
        setScheduledTimeFunc(formattedDateTime);
      }
    });
  }, [date, time, date2, time2, date3, time3, date4, time4, date5, time5]);

  const [showRedButton, setShowRedButton] = useState(false);
  const [showRedButton2, setShowRedButton2] = useState(false);
  const [showRedButton3, setShowRedButton3] = useState(false);
  const [showRedButton4, setShowRedButton4] = useState(false);
  const [showRedButton5, setShowRedButton5] = useState(false);


  // Handle file upload
  const handleFileUpload = () => {
    if (isUploadButtonEnabled) {
      // ✅ Disable button IMMEDIATELY when clicked (before file selection)
      setIsUploadButtonEnabled(false);
      isProcessingFileRef.current = true;
      sessionStorage.setItem('ongoingFileUpload_90b', 'true');
      fileInputRef.current.click();
    }
  };
  const handleFileUpload2 = () => {
    if (isUploadButtonEnabled2) {
      setIsUploadButtonEnabled2(false);
      isProcessingFileRef2.current = true;
      sessionStorage.setItem('ongoingFileUpload_90b2', 'true');
      fileInputRef2.current.click();
    }
  };
  const handleFileUpload3 = () => {
    if (isUploadButtonEnabled3) {
      setIsUploadButtonEnabled3(false);
      isProcessingFileRef3.current = true;
      sessionStorage.setItem('ongoingFileUpload_90b3', 'true');
      fileInputRef3.current.click();
    }
  };
  const handleFileUpload4 = () => {
    if (isUploadButtonEnabled4) {
      setIsUploadButtonEnabled4(false);
      isProcessingFileRef4.current = true;
      sessionStorage.setItem('ongoingFileUpload_90b4', 'true');
      fileInputRef4.current.click();
    }
  };
  const handleFileUpload5 = () => {
    if (isUploadButtonEnabled5) {
      setIsUploadButtonEnabled5(false);
      isProcessingFileRef5.current = true;
      sessionStorage.setItem('ongoingFileUpload_90b5', 'true');
      fileInputRef5.current.click();
    }
  };

  const [currentJobIdT, setCurrentJobIdT] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b", newId);
    return newId;
  });

  const [currentJobIdT2, setCurrentJobIdT2] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b2");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b2", newId);
    return newId;
  });

  const [currentJobIdT3, setCurrentJobIdT3] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b3");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b3", newId);
    return newId;
  });

  const [currentJobIdT4, setCurrentJobIdT4] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b4");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b4", newId);
    return newId;
  });

  const [currentJobIdT5, setCurrentJobIdT5] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b5");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b5", newId);
    return newId;
  });

  // Single useEffect for all job ID ref assignments
  useEffect(() => {
    jobIdRef.current = currentJobIdT;
    jobIdRef2.current = currentJobIdT2;
    jobIdRef3.current = currentJobIdT3;
    jobIdRef4.current = currentJobIdT4;
    jobIdRef5.current = currentJobIdT5;
  }, [currentJobIdT, currentJobIdT2, currentJobIdT3, currentJobIdT4, currentJobIdT5]);


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);

  const binaryInsertedRef = useRef(false); // 🔁 Track binary insert
  const binaryInsertedRef2 = useRef(false);
  const binaryInsertedRef3 = useRef(false);
  const binaryInsertedRef4 = useRef(false);
  const binaryInsertedRef5 = useRef(false);

  const [isUploadButtonEnabled, setIsUploadButtonEnabled] = useState(true);
  const [isUploadButtonEnabled2, setIsUploadButtonEnabled2] = useState(true);
  const [isUploadButtonEnabled3, setIsUploadButtonEnabled3] = useState(true);
  const [isUploadButtonEnabled4, setIsUploadButtonEnabled4] = useState(true);
  const [isUploadButtonEnabled5, setIsUploadButtonEnabled5] = useState(true);


  const isProcessingFileRef = useRef(false);
  const isProcessingFileRef2 = useRef(false);
  const isProcessingFileRef3 = useRef(false);
  const isProcessingFileRef4 = useRef(false);
  const isProcessingFileRef5 = useRef(false);



  const jobIdRef2 = useRef(null);
  const jobIdRef3 = useRef(null);
  const jobIdRef4 = useRef(null);
  const jobIdRef5 = useRef(null);


  const handleUploadComplete = () => {
    isProcessingFileRef.current = false;
    setIsUploadButtonEnabled(true);
    sessionStorage.removeItem('ongoingFileUpload_90b');
    sessionStorage.removeItem('uploadProgress_90b');
  };
  const handleUploadComplete2 = () => {
    isProcessingFileRef2.current = false;
    setIsUploadButtonEnabled2(true);
    sessionStorage.removeItem('ongoingFileUpload_90b2');
    sessionStorage.removeItem('uploadProgress_90b2');
  };
  const handleUploadComplete3 = () => {
    isProcessingFileRef3.current = false;
    setIsUploadButtonEnabled3(true);
    sessionStorage.removeItem('ongoingFileUpload_90b3');
    sessionStorage.removeItem('uploadProgress_90b3');
  };
  const handleUploadComplete4 = () => {
    isProcessingFileRef4.current = false;
    setIsUploadButtonEnabled4(true);
    sessionStorage.removeItem('ongoingFileUpload_90b4');
    sessionStorage.removeItem('uploadProgress_90b4');
  };
  const handleUploadComplete5 = () => {
    isProcessingFileRef5.current = false;
    setIsUploadButtonEnabled5(true);
    sessionStorage.removeItem('ongoingFileUpload_90b5');
    sessionStorage.removeItem('uploadProgress_90b5');
  };

  const handleFileChange = async (event, instanceNumber = '') => {
    // Get instance-specific values
    const getInstanceValues = (instanceNum) => {
      switch (instanceNum) {
        case '':
          return {
            isProcessingFileRef: isProcessingFileRef,
            setIsUploadButtonEnabled: setIsUploadButtonEnabled,
            setLoadingProgressGr: setLoadingProgressGr,
            setLoadingProgressRep: setLoadingProgressRep,
            setSelectedFile: setSelectedFile,
            setBinaryInput: setBinaryInput,
            setScheduledTime: setScheduledTime,
            setDebouncedScheduledTime: setDebouncedScheduledTime,
            setResult: setResult,
            setFileName: setFileName,
            setUploadTime: setUploadTime,
            setLoadingProgress: setLoadingProgress,
            setTime: setTime,
            setShowRedButton: setShowRedButton,
            alertShownRef: alertShownRef,
            setIsEnabled: null,
            lineNumber: 1,
            localStorageKey: 'resultFetchedFromSupabase3'
          };
        case '2':
          return {
            isProcessingFileRef: isProcessingFileRef2,
            setIsUploadButtonEnabled: setIsUploadButtonEnabled2,
            setLoadingProgressGr: setLoadingProgress2Gr,
            setLoadingProgressRep: setLoadingProgress2Rep,
            setSelectedFile: setSelectedFile2,
            setBinaryInput: setBinaryInput2,
            setScheduledTime: setScheduledTime2,
            setDebouncedScheduledTime: setDebouncedScheduledTime2,
            setResult: setResult2,
            setFileName: setFileName2,
            setUploadTime: setUploadTime2,
            setLoadingProgress: setLoadingProgress2,
            setTime: setTime2,
            setShowRedButton: setShowRedButton2,
            alertShownRef: alertShownRef2,
            setIsEnabled: null,
            lineNumber: 2,
            localStorageKey: null
          };
        case '3':
          return {
            isProcessingFileRef: isProcessingFileRef3,
            setIsUploadButtonEnabled: setIsUploadButtonEnabled3,
            setLoadingProgressGr: setLoadingProgress3Gr,
            setLoadingProgressRep: setLoadingProgress3Rep,
            setSelectedFile: setSelectedFile3,
            setBinaryInput: setBinaryInput3,
            setScheduledTime: setScheduledTime3,
            setDebouncedScheduledTime: setDebouncedScheduledTime3,
            setResult: setResult3,
            setFileName: setFileName3,
            setUploadTime: setUploadTime3,
            setLoadingProgress: setLoadingProgress3,
            setTime: setTime3,
            setShowRedButton: setShowRedButton3,
            alertShownRef: alertShownRef3,
            setIsEnabled: setIsEnabled3,
            lineNumber: 3,
            localStorageKey: 'resultFetchedFromSupabase90b3'
          };
        case '4':
          return {
            isProcessingFileRef: isProcessingFileRef4,
            setIsUploadButtonEnabled: setIsUploadButtonEnabled4,
            setLoadingProgressGr: setLoadingProgress4Gr,
            setLoadingProgressRep: setLoadingProgress4Rep,
            setSelectedFile: setSelectedFile4,
            setBinaryInput: setBinaryInput4,
            setScheduledTime: setScheduledTime4,
            setDebouncedScheduledTime: setDebouncedScheduledTime4,
            setResult: setResult4,
            setFileName: setFileName4,
            setUploadTime: setUploadTime4,
            setLoadingProgress: setLoadingProgress4,
            setTime: setTime4,
            setShowRedButton: setShowRedButton4,
            alertShownRef: alertShownRef4,
            setIsEnabled: setIsEnabled4,
            lineNumber: 4,
            localStorageKey: 'resultFetchedFromSupabase90b2'
          };
        case '5':
          return {
            isProcessingFileRef: isProcessingFileRef5,
            setIsUploadButtonEnabled: setIsUploadButtonEnabled5,
            setLoadingProgressGr: setLoadingProgress5Gr,
            setLoadingProgressRep: setLoadingProgress5Rep,
            setSelectedFile: setSelectedFile5,
            setBinaryInput: setBinaryInput5,
            setScheduledTime: setScheduledTime5,
            setDebouncedScheduledTime: setDebouncedScheduledTime5,
            setResult: setResult5,
            setFileName: setFileName5,
            setUploadTime: setUploadTime5,
            setLoadingProgress: setLoadingProgress5,
            setTime: setTime5,
            setShowRedButton: setShowRedButton5,
            alertShownRef: alertShownRef5,
            setIsEnabled: setIsEnabled5,
            lineNumber: 5,
            localStorageKey: 'resultFetchedFromSupabase90b2'
          };
        default:
          return null;
      }
    };

    const instanceValues = getInstanceValues(instanceNumber);
    if (!instanceValues) return;

    // ✅ Button should already be disabled from handleFileUpload, but ensure it's disabled
    // This handles cases where handleFileChange is called directly (e.g., drag & drop)
    const storageKey = instanceNumber === '' ? 'ongoingFileUpload_90b' : `ongoingFileUpload_90b${instanceNumber}`;
    if (!instanceValues.isProcessingFileRef.current) {
      instanceValues.isProcessingFileRef.current = true;
      instanceValues.setIsUploadButtonEnabled(false);
      sessionStorage.setItem(storageKey, 'true');
    }

    // Reset progress bars
    instanceValues.setLoadingProgressGr(0);
    instanceValues.setLoadingProgressRep(0);

    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // ✅ No file selected - re-enable button and reset flags
      instanceValues.isProcessingFileRef.current = false;
      instanceValues.setIsUploadButtonEnabled(true);
      sessionStorage.removeItem(storageKey);
      if (instanceValues.setShowRedButton) {
        instanceValues.setShowRedButton(false);
      }
      return;
    }

    // File validation - check for .bin extension
    const fileName = selectedFile.name.toLowerCase();
    const isBin = fileName.endsWith(".bin");

    if (!isBin) {
      // ✅ Invalid file - re-enable button and reset flags
      alert("Please upload a .bin file.");
      instanceValues.isProcessingFileRef.current = false;
      instanceValues.setIsUploadButtonEnabled(true);
      sessionStorage.removeItem(storageKey);
      return;
    }

    instanceValues.setSelectedFile(selectedFile);

    const userId = await fetchUserId();
    if (!userId) {
      // ✅ No userId - re-enable button and reset flags
      instanceValues.isProcessingFileRef.current = false;
      instanceValues.setIsUploadButtonEnabled(true);
      sessionStorage.removeItem(storageKey);
      return;
    }

    // Reset all state variables
    instanceValues.setBinaryInput("");
    instanceValues.setScheduledTime("");
    instanceValues.setDebouncedScheduledTime("");
    instanceValues.setResult("");
    instanceValues.setFileName("");
    instanceValues.setUploadTime("");
    instanceValues.setLoadingProgress(0);
    instanceValues.setTime("");

    instanceValues.setFileName(selectedFile.name);

    // Set upload time immediately (for instance 1) or in FileReader (for other instances)
    if (instanceNumber === '') {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      instanceValues.setUploadTime(currentTime);
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      let binaryString = "";

      // Update binaryInput state
      instanceValues.setBinaryInput(binaryString);

      // Set upload time for instances 2-5
      if (instanceNumber !== '') {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        instanceValues.setUploadTime(currentTime);
      }

      try {
        // Set localStorage for specific instances
        if (instanceValues.localStorageKey) {
          localStorage.setItem(instanceValues.localStorageKey, 'false');
        }

        // Delete existing row from Supabase
        const { error: deleteError } = await supabase
          .from('results2')
          .delete()
          .match({ line: instanceValues.lineNumber, user_id: userId });

        instanceValues.setLoadingProgress(0);

        if (deleteError) {
          // ✅ Delete error - re-enable button and reset flags
          console.error('Delete error:', deleteError);
          instanceValues.isProcessingFileRef.current = false;
          instanceValues.setIsUploadButtonEnabled(true);
          sessionStorage.removeItem(storageKey);
          return;
        }
      } catch (err) {
        // ✅ Exception during delete - re-enable button and reset flags
        console.error('Error deleting existing row:', err);
        instanceValues.isProcessingFileRef.current = false;
        instanceValues.setIsUploadButtonEnabled(true);
        sessionStorage.removeItem(storageKey);
        return;
      }
      
      // ✅ File read successfully - keep button disabled (will be re-enabled when progress reaches 100%)
      // Ensure button stays disabled and processing flag stays true
      instanceValues.isProcessingFileRef.current = true;
      instanceValues.setIsUploadButtonEnabled(false);
      // Update sessionStorage to ensure button stays disabled even if progress is 0
      sessionStorage.setItem(storageKey, 'true');
      sessionStorage.setItem(`uploadProgress_90b${instanceNumber}`, '0');

      instanceValues.alertShownRef.current = false;

      // Set enabled for instances 3, 4, 5
      if (instanceValues.setIsEnabled) {
        instanceValues.setIsEnabled(false);
      }

      // Allow reupload of same file
      event.target.value = "";
    };
    reader.onerror = () => {
      // ✅ File read error - re-enable button and reset flags
      console.error('FileReader error');
      instanceValues.isProcessingFileRef.current = false;
      instanceValues.setIsUploadButtonEnabled(true);
      const storageKey = instanceNumber === '' ? 'ongoingFileUpload_90b' : `ongoingFileUpload_90b${instanceNumber}`;
      sessionStorage.removeItem(storageKey);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const subscriptionRef = useRef(null);

  useEffect(() => {
    const setupSubscription = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      // ✅ Prevent multiple subscriptions
      if (subscriptionRef.current) {
        console.log('📡 Subscription already exists, skipping...');
        return;
      }

      // ✅ FIRST: Fetch initial data for all lines
      const fetchInitialData = async () => {
        try {
          const { data, error } = await supabase
            .from('results2')
            .select('*')
            .eq('user_id', userId);

          if (error) {
            return;
          }

          if (data) {
            data.forEach(async (row) => {
              const progress = row.progress || 0;
              switch (row.line) {
                case 1:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results2')
                      .update({
                        progress: 10,
                        updated_at: new Date().toISOString()
                      })
                      .eq('user_id', userId)
                      .eq('line', 1);

                    setLoadingProgress(0);
                  } else if (row.progress === 100 && row.result) {
                    // If progress is 100% AND there's a result, keep it (test completed)
                    setBinaryInput(row.binary_data);
                    setScheduledTime(row.scheduled_time);
                    setResult({ final_result: row.result });
                    setFileName(row.file_name);
                    setUploadTime(row.upload_time);
                    setLoadingProgress(progress);
                    console.log(`📊 Line 1 initial progress: ${progress}%`);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput(row.binary_data);
                    setScheduledTime(row.scheduled_time);
                    setResult({ final_result: row.result });
                    setFileName(row.file_name);
                    setUploadTime(row.upload_time);
                    setLoadingProgress(progress);
                    console.log(`📊 Line 1 initial progress: ${progress}%`);
                  }
                  break;
                case 2:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results2')
                      .update({
                        progress: 10,
                        updated_at: new Date().toISOString()
                      })
                      .eq('user_id', userId)
                      .eq('line', 2);

                    setLoadingProgress2(0);
                  } else if (row.progress === 100 && row.result) {
                    // If progress is 100% AND there's a result, keep it (test completed)
                    setBinaryInput2(row.binary_data);
                    setScheduledTime2(row.scheduled_time);
                    setResult2({ final_result: row.result });
                    setFileName2(row.file_name);
                    setUploadTime2(row.upload_time);
                    setLoadingProgress2(progress);
                    console.log(`📊 Line 2 initial progress: ${progress}%`);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput2(row.binary_data);
                    setScheduledTime2(row.scheduled_time);
                    setResult2({ final_result: row.result });
                    setFileName2(row.file_name);
                    setUploadTime2(row.upload_time);
                    setLoadingProgress2(progress);
                    console.log(`📊 Line 2 initial progress: ${progress}%`);
                  }
                  break;
                case 3:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results2')
                      .update({
                        progress: 10,
                        updated_at: new Date().toISOString()
                      })
                      .eq('user_id', userId)
                      .eq('line', 3);

                    setLoadingProgress3(0);
                  } else if (row.progress === 100 && row.result) {
                    // If progress is 100% AND there's a result, keep it (test completed)
                    setBinaryInput3(row.binary_data);
                    setScheduledTime3(row.scheduled_time);
                    setResult3({ final_result: row.result });
                    setFileName3(row.file_name);
                    setUploadTime3(row.upload_time);
                    setLoadingProgress3(progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput3(row.binary_data);
                    setScheduledTime3(row.scheduled_time);
                    setResult3({ final_result: row.result });
                    setFileName3(row.file_name);
                    setUploadTime3(row.upload_time);
                    setLoadingProgress3(progress);
                  }
                  break;
                case 4:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results2')
                      .update({
                        progress: 10,
                        updated_at: new Date().toISOString()
                      })
                      .eq('user_id', userId)
                      .eq('line', 4);

                    setLoadingProgress4(0);
                  } else if (row.progress === 100 && row.result) {
                    // If progress is 100% AND there's a result, keep it (test completed)
                    setBinaryInput4(row.binary_data);
                    setScheduledTime4(row.scheduled_time);
                    setResult4({ final_result: row.result });
                    setFileName4(row.file_name);
                    setUploadTime4(row.upload_time);
                    setLoadingProgress4(progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput4(row.binary_data);
                    setScheduledTime4(row.scheduled_time);
                    setResult4({ final_result: row.result });
                    setFileName4(row.file_name);
                    setUploadTime4(row.upload_time);
                    setLoadingProgress4(progress);
                  }
                  break;
                case 5:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results2')
                      .update({
                        progress: 10,
                        updated_at: new Date().toISOString()
                      })
                      .eq('user_id', userId)
                      .eq('line', 5);

                    setLoadingProgress5(0);
                  } else if (row.progress === 100 && row.result) {
                    // If progress is 100% AND there's a result, keep it (test completed)
                    setBinaryInput5(row.binary_data);
                    setScheduledTime5(row.scheduled_time);
                    setResult5({ final_result: row.result });
                    setFileName5(row.file_name);
                    setUploadTime5(row.upload_time);
                    setLoadingProgress5(progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput5(row.binary_data);
                    setScheduledTime5(row.scheduled_time);
                    setResult5({ final_result: row.result });
                    setFileName5(row.file_name);
                    setUploadTime5(row.upload_time);
                    setLoadingProgress5(progress);
                  }
                  break;
                default:
                  break;
              }
            });
          }
        } catch (err) {
          console.error('❌ Error in initial data fetch from results2:', err);
        }
      };

      await fetchInitialData();


      subscriptionRef.current = supabase
        .channel('results2-changes')
        .on(
          'postgres_changes',
          {
            event: '*', // INSERT, UPDATE, DELETE
            schema: 'public',
            table: 'results2',
            filter: `user_id=eq.${userId}`
          },
          (payload) => {
            const row = payload.new;

            if (isProcessingFileRef?.current && payload.new?.line === 1) {

              return;
            }
            if (isProcessingFileRef2?.current && payload.new?.line === 2) {

              return;
            }
            if (isProcessingFileRef3?.current && payload.new?.line === 3) {

              return;
            }
            if (isProcessingFileRef4?.current && payload.new?.line === 4) {

              return;
            }
            if (isProcessingFileRef5?.current && payload.new?.line === 5) {

              return;
            }
            if (row.progress === 100 && (!row.result || row.result.trim() === "")) {

              return; // Don't update state for misleading 100% progress
            }

            const progress = row.progress || 0;

            switch (row.line) {
              case 1:
                setBinaryInput(row.binary_data);
                setScheduledTime(row.scheduled_time);
                setResult({ final_result: row.result });
                setFileName(row.file_name);
                setUploadTime(row.upload_time);
                setLoadingProgress(progress);
                break;
              case 2:
                setBinaryInput2(row.binary_data);
                setScheduledTime2(row.scheduled_time);
                setResult2({ final_result: row.result });
                setFileName2(row.file_name);
                setUploadTime2(row.upload_time);
                setLoadingProgress2(progress);
                break;
              case 3:
                setBinaryInput3(row.binary_data);
                setScheduledTime3(row.scheduled_time);
                setResult3({ final_result: row.result });
                setFileName3(row.file_name);
                setUploadTime3(row.upload_time);
                setLoadingProgress3(progress);
                break;
              case 4:
                setBinaryInput4(row.binary_data);
                setScheduledTime4(row.scheduled_time);
                setResult4({ final_result: row.result });
                setFileName4(row.file_name);
                setUploadTime4(row.upload_time);
                setLoadingProgress4(progress);
                break;
              case 5:
                setBinaryInput5(row.binary_data);
                setScheduledTime5(row.scheduled_time);
                setResult5({ final_result: row.result });
                setFileName5(row.file_name);
                setUploadTime5(row.upload_time);
                setLoadingProgress5(progress);
                break;
              default:
                break;
            }
          }
        )
        .subscribe((status) => {

          if (status === 'SUBSCRIBED') {
            console.log('✅ Successfully subscribed to results2 real-time updates');
          }
        });
    };

    setupSubscription();

    // ✅ Cleanup subscription on component unmount
    return () => {
      if (subscriptionRef.current) {

        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);


  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingProgressRep, setLoadingProgressRep] = useState(0);
  const [loadingProgressGr, setLoadingProgressGr] = useState(0);


  const [loadingProgress2, setLoadingProgress2] = useState(0);
  const [loadingProgress2Rep, setLoadingProgress2Rep] = useState(0);
  const [loadingProgress2Gr, setLoadingProgress2Gr] = useState(0);

  const [loadingProgress3, setLoadingProgress3] = useState(0);
  const [loadingProgress3Rep, setLoadingProgress3Rep] = useState(0);
  const [loadingProgress3Gr, setLoadingProgress3Gr] = useState(0);

  const [loadingProgress4, setLoadingProgress4] = useState(0);
  const [loadingProgress4Rep, setLoadingProgress4Rep] = useState(0);
  const [loadingProgress4Gr, setLoadingProgress4Gr] = useState(0);

  const [loadingProgress5, setLoadingProgress5] = useState(0);
  const [loadingProgress5Rep, setLoadingProgress5Rep] = useState(0);
  const [loadingProgress5Gr, setLoadingProgress5Gr] = useState(0);

  const [scheduledTime, setScheduledTime] = useState("");
  const [debouncedScheduledTime, setDebouncedScheduledTime] = useState("");

  const [scheduledTime2, setScheduledTime2] = useState("");
  const [debouncedScheduledTime2, setDebouncedScheduledTime2] = useState("");

  const [scheduledTime3, setScheduledTime3] = useState("");
  const [debouncedScheduledTime3, setDebouncedScheduledTime3] = useState("");

  const [scheduledTime4, setScheduledTime4] = useState("");
  const [debouncedScheduledTime4, setDebouncedScheduledTime4] = useState("");

  const [scheduledTime5, setScheduledTime5] = useState("");
  const [debouncedScheduledTime5, setDebouncedScheduledTime5] = useState("");

  const finalResult = result ? result.final_result : " ";
  const finalResult2 = result2 ? result2.final_result : " ";
  const finalResult3 = result3 ? result3.final_result : " ";
  const finalResult4 = result4 ? result4.final_result : " ";
  const finalResult5 = result5 ? result5.final_result : " ";

  // Effect to check persistent state when component mounts for all uploads
  useEffect(() => {
    const checkPersistentState = (storageKey, setIsDateEnabled, setIsTimeEnabled) => {
      const ongoingUpload = sessionStorage.getItem(`ongoingFileUpload_90b${storageKey}`);
      const storedProgress = sessionStorage.getItem(`uploadProgress_90b${storageKey}`);

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        // There's an ongoing upload that hasn't completed
        setIsDateEnabled(false);
        setIsTimeEnabled(false);
      } else {
        setIsDateEnabled(true);
        setIsTimeEnabled(true);
      }
    };

    checkPersistentState('', setIsDateEnabled, setIsTimeEnabled);
    checkPersistentState('2', setIsDateEnabled2, setIsTimeEnabled2);
    checkPersistentState('3', setIsDateEnabled3, setIsTimeEnabled3);
    checkPersistentState('4', setIsDateEnabled4, setIsTimeEnabled4);
    checkPersistentState('5', setIsDateEnabled5, setIsTimeEnabled5);
  }, []);

  // Effect to handle loading progress changes for all uploads
  useEffect(() => {
    const handleProgressUpdate = (progress, storageKey, setIsDateEnabled, setIsTimeEnabled) => {
      if (progress === 100) {
        // Upload completed
        setIsDateEnabled(true);
        setIsTimeEnabled(true);
        sessionStorage.removeItem(`ongoingFileUpload_90b${storageKey}`);
        sessionStorage.removeItem(`uploadProgress_90b${storageKey}`);
      } else if (progress > 0 && progress < 100) {
        // Upload in progress
        setIsDateEnabled(false);
        setIsTimeEnabled(false);
        sessionStorage.setItem(`ongoingFileUpload_90b${storageKey}`, 'true');
        sessionStorage.setItem(`uploadProgress_90b${storageKey}`, progress.toString());
      }
    };

    // Handle progress updates for all upload instances
    handleProgressUpdate(loadingProgress, '', setIsDateEnabled, setIsTimeEnabled);
    handleProgressUpdate(loadingProgress2, '2', setIsDateEnabled2, setIsTimeEnabled2);
    handleProgressUpdate(loadingProgress3, '3', setIsDateEnabled3, setIsTimeEnabled3);
    handleProgressUpdate(loadingProgress4, '4', setIsDateEnabled4, setIsTimeEnabled4);
    handleProgressUpdate(loadingProgress5, '5', setIsDateEnabled5, setIsTimeEnabled5);
  }, [loadingProgress, loadingProgress2, loadingProgress3, loadingProgress4, loadingProgress5]);


  // Effect to check persistent state when component mounts for all uploads
  useEffect(() => {
    const checkPersistentState = (storageKey, isProcessingFileRef, setIsUploadButtonEnabled) => {
      const fullStorageKey = storageKey === '' ? 'ongoingFileUpload_90b' : `ongoingFileUpload_90b${storageKey}`;
      const ongoingUpload = sessionStorage.getItem(fullStorageKey);
      const storedProgress = sessionStorage.getItem(`uploadProgress_90b${storageKey}`);

      // ✅ If there's an ongoing upload flag, keep button disabled regardless of progress value
      // This handles the case when file is just uploaded (progress = 0) but upload hasn't started yet
      if (ongoingUpload === 'true') {
        const progress = storedProgress ? parseInt(storedProgress) : 0;
        if (progress < 100) {
          // There's an ongoing upload that hasn't completed
          isProcessingFileRef.current = true;
          setIsUploadButtonEnabled(false);
        } else {
          // Progress is 100, upload completed - clean up
          isProcessingFileRef.current = false;
          setIsUploadButtonEnabled(true);
          sessionStorage.removeItem(fullStorageKey);
          sessionStorage.removeItem(`uploadProgress_90b${storageKey}`);
        }
      } else {
        // No ongoing upload or upload was completed
        isProcessingFileRef.current = false;
        setIsUploadButtonEnabled(true);
        // Clean up sessionStorage
        sessionStorage.removeItem(fullStorageKey);
        sessionStorage.removeItem(`uploadProgress_90b${storageKey}`);
      }
    };

    // Check persistent state for all upload instances
    checkPersistentState('', isProcessingFileRef, setIsUploadButtonEnabled);
    checkPersistentState('2', isProcessingFileRef2, setIsUploadButtonEnabled2);
    checkPersistentState('3', isProcessingFileRef3, setIsUploadButtonEnabled3);
    checkPersistentState('4', isProcessingFileRef4, setIsUploadButtonEnabled4);
    checkPersistentState('5', isProcessingFileRef5, setIsUploadButtonEnabled5);
  }, []);

  // Effect to handle loading progress changes for all uploads
  useEffect(() => {
    const handleProgressUpdate = (progress, storageKey, isProcessingFileRef, setIsUploadButtonEnabled) => {
      const fullStorageKey = storageKey === '' ? 'ongoingFileUpload_90b' : `ongoingFileUpload_90b${storageKey}`;
      const ongoingUpload = sessionStorage.getItem(fullStorageKey);
      
      if (progress === 100) {
        // Upload completed
        isProcessingFileRef.current = false;
        setIsUploadButtonEnabled(true);
        sessionStorage.removeItem(fullStorageKey);
        sessionStorage.removeItem(`uploadProgress_90b${storageKey}`);
      } else if (progress >= 0 && progress < 100) {
        // ✅ Upload in progress OR file just uploaded (progress = 0 but ongoingUpload exists)
        // Keep button disabled if:
        // 1. Progress is > 0 and < 100 (upload in progress), OR
        // 2. Progress is 0 but there's an ongoing upload flag (file just selected, waiting for upload to start)
        if (progress > 0 || ongoingUpload === 'true' || isProcessingFileRef.current) {
          isProcessingFileRef.current = true;
          setIsUploadButtonEnabled(false);
          sessionStorage.setItem(fullStorageKey, 'true');
          if (progress > 0) {
            sessionStorage.setItem(`uploadProgress_90b${storageKey}`, progress.toString());
          }
        }
      }
    };

    // Handle progress updates for all upload instances
    handleProgressUpdate(loadingProgress, '', isProcessingFileRef, setIsUploadButtonEnabled);
    handleProgressUpdate(loadingProgress2, '2', isProcessingFileRef2, setIsUploadButtonEnabled2);
    handleProgressUpdate(loadingProgress3, '3', isProcessingFileRef3, setIsUploadButtonEnabled3);
    handleProgressUpdate(loadingProgress4, '4', isProcessingFileRef4, setIsUploadButtonEnabled4);
    handleProgressUpdate(loadingProgress5, '5', isProcessingFileRef5, setIsUploadButtonEnabled5);
  }, [loadingProgress, loadingProgress2, loadingProgress3, loadingProgress4, loadingProgress5]);


  useEffect(() => {
    const timeouts = [];

    // Array of scheduled time and setter pairs
    const scheduledTimePairs = [
      [scheduledTime, setDebouncedScheduledTime],
      [scheduledTime2, setDebouncedScheduledTime2],
      [scheduledTime3, setDebouncedScheduledTime3],
      [scheduledTime4, setDebouncedScheduledTime4],
      [scheduledTime5, setDebouncedScheduledTime5]
    ];

    // Set up debouncing for each pair
    scheduledTimePairs.forEach(([time, setter]) => {
      const timeout = setTimeout(() => {
        setter(time);
      }, 3000);
      timeouts.push(timeout);
    });

    // Cleanup all timeouts
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [scheduledTime, scheduledTime2, scheduledTime3, scheduledTime4, scheduledTime5]);

  const jobIdRef = useRef(null);


  const alertShownRef = useRef(false);
  const alertShownRef2 = useRef(false);
  const alertShownRef3 = useRef(false);
  const alertShownRef4 = useRef(false);
  const alertShownRef5 = useRef(false);

  useEffect(() => {
    const progressIntervalIds = {};

    const resumeProgressCheck = async (lineNumber) => {
      const userId = await fetchUserId();
      if (!userId) return;

      // Check if result already exists and is valid for this line
      switch (lineNumber) {
        case 1:
          if (result && (result.final_result === "non-random number" || result.final_result === "random number")) {
            return;
          }
          break;
        case 2:
          if (result2 && (result2.final_result === "non-random number" || result2.final_result === "random number")) {
            return;
          }
          break;
        case 3:
          if (result3 && (result3.final_result === "non-random number" || result3.final_result === "random number")) {
            return;
          }
          break;
        case 4:
          if (result4 && (result4.final_result === "non-random number" || result4.final_result === "random number")) {
            return;
          }
          break;
        case 5:
          if (result5 && (result5.final_result === "non-random number" || result5.final_result === "random number")) {
            return;
          }
          break;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
            .select("*")
            .eq("user_id", userId)
            .eq("line", lineNumber)
            .maybeSingle();

          if (error) {
            // ❌ stop polling on error
            if (progressIntervalIds[lineNumber]) {
              clearInterval(progressIntervalIds[lineNumber]);
              delete progressIntervalIds[lineNumber];
            }
            return;
          }

          if (data && data.line === lineNumber) {
            const progress = data.progress || 0;

            // Update progress and result based on line number
            switch (lineNumber) {
              case 1:
                setLoadingProgress(progress);
                if (data.result) {
                  setResult({ final_result: data.result });
                  localStorage.setItem("resultFetchedFromSupabase90b", "true");
                }
                break;
              case 2:
                setLoadingProgress2(progress);
                if (data.result) {
                  setResult2({ final_result: data.result });
                  localStorage.setItem("resultFetchedFromSupabase90b2", "true");
                }
                break;
              case 3:
                setLoadingProgress3(progress);
                if (data.result) {
                  setResult3({ final_result: data.result });
                  localStorage.setItem("resultFetchedFromSupabase90b2", "true");
                }
                break;
              case 4:
                setLoadingProgress4(progress);
                if (data.result) {
                  setResult4({ final_result: data.result });
                  localStorage.setItem("resultFetchedFromSupabase90b4", "true");
                }
                break;
              case 5:
                setLoadingProgress5(progress);
                if (data.result) {
                  setResult5({ final_result: data.result });
                  localStorage.setItem("resultFetchedFromSupabase90b5", "true");
                }
                break;
            }

            // ✅ Stop polling if already complete
            if (progress >= 100 && progressIntervalIds[lineNumber]) {
              clearInterval(progressIntervalIds[lineNumber]);
              delete progressIntervalIds[lineNumber];
            }
          }
        } catch (err) {
          // ❌ stop polling on unexpected error
          if (progressIntervalIds[lineNumber]) {
            clearInterval(progressIntervalIds[lineNumber]);
            delete progressIntervalIds[lineNumber];
          }
        }
      };

      // Start polling for this line
      progressIntervalIds[lineNumber] = setInterval(fetchProgressFromSupabase, 2000);

      // Do one immediate fetch
      await fetchProgressFromSupabase();
    };

    // Start progress checks for all lines
    const lines = [1, 2, 3, 4, 5];
    lines.forEach(line => {
      resumeProgressCheck(line);
    });

    // On unmount → clear all polling intervals
    return () => {
      Object.values(progressIntervalIds).forEach(intervalId => {
        clearInterval(intervalId);
      });
    };
  }, [result, result2, result3, result4, result5]);
  useEffect(() => {
    const processLine = async (lineNumber) => {
      // Get line-specific values
      const getLineValues = (lineNo) => {
        switch (lineNo) {
          case 1:
            return {
              debouncedTime: debouncedScheduledTime,
              result: result,
              selectedFile: selectedFile,
              fileName: fileName,
              uploadTime: uploadTime,
              currentJobId: currentJobIdT,
              setLoadingProgress: setLoadingProgress,
              setResult: setResult,
              setShowRedButton: setShowRedButton,
              alertShownRef: alertShownRef,
              binaryInsertedRef: binaryInsertedRef,
              setIsEnabled: setIsEnabled,
              handleUploadComplete: handleUploadComplete,
              binaryInput: null,
              setIsUploadButtonEnabled: setIsUploadButtonEnabled,
              isProcessingFileRef: isProcessingFileRef,
              instanceNumber: ''
            };
          case 2:
            return {
              debouncedTime: debouncedScheduledTime2,
              result: result2,
              selectedFile: selectedFile2,
              fileName: fileName2,
              uploadTime: uploadTime2,
              currentJobId: currentJobIdT2,
              setLoadingProgress: setLoadingProgress2,
              setResult: setResult2,
              setShowRedButton: setShowRedButton2,
              alertShownRef: alertShownRef2,
              binaryInsertedRef: binaryInsertedRef2,
              setIsEnabled: setIsEnabled2,
              handleUploadComplete: handleUploadComplete2,
              binaryInput: null,
              setIsUploadButtonEnabled: setIsUploadButtonEnabled2,
              isProcessingFileRef: isProcessingFileRef2,
              instanceNumber: '2'
            };
          case 3:
            return {
              debouncedTime: debouncedScheduledTime3,
              result: result3,
              selectedFile: selectedFile3,
              fileName: fileName3,
              uploadTime: uploadTime3,
              currentJobId: currentJobIdT3,
              setLoadingProgress: setLoadingProgress3,
              setResult: setResult3,
              setShowRedButton: setShowRedButton3,
              alertShownRef: alertShownRef3,
              binaryInsertedRef: binaryInsertedRef3,
              setIsEnabled: setIsEnabled3,
              handleUploadComplete: handleUploadComplete3,
              binaryInput: binaryInput3,
              setIsUploadButtonEnabled: setIsUploadButtonEnabled3,
              isProcessingFileRef: isProcessingFileRef3,
              instanceNumber: '3'
            };
          case 4:
            return {
              debouncedTime: debouncedScheduledTime4,
              result: result4,
              selectedFile: selectedFile4,
              fileName: fileName4,
              uploadTime: uploadTime4,
              currentJobId: currentJobIdT4,
              setLoadingProgress: setLoadingProgress4,
              setResult: setResult4,
              setShowRedButton: setShowRedButton4,
              alertShownRef: alertShownRef4,
              binaryInsertedRef: binaryInsertedRef4,
              setIsEnabled: setIsEnabled4,
              handleUploadComplete: handleUploadComplete4,
              binaryInput: binaryInput4,
              setIsUploadButtonEnabled: setIsUploadButtonEnabled4,
              isProcessingFileRef: isProcessingFileRef4,
              instanceNumber: '4'
            };
          case 5:
            return {
              debouncedTime: debouncedScheduledTime5,
              result: result5,
              selectedFile: selectedFile5,
              fileName: fileName5,
              uploadTime: uploadTime5,
              currentJobId: currentJobIdT5,
              setLoadingProgress: setLoadingProgress5,
              setResult: setResult5,
              setShowRedButton: setShowRedButton5,
              alertShownRef: alertShownRef5,
              binaryInsertedRef: binaryInsertedRef5,
              setIsEnabled: setIsEnabled5,
              handleUploadComplete: handleUploadComplete5,
              binaryInput: binaryInput5,
              setIsUploadButtonEnabled: setIsUploadButtonEnabled5,
              isProcessingFileRef: isProcessingFileRef5,
              instanceNumber: '5'
            };
          default:
            return null;
        }
      };

      const lineValues = getLineValues(lineNumber);
      if (!lineValues || !lineValues.debouncedTime || lineValues.result) {
        return null;
      }


      lineValues.setLoadingProgress(0);
      let progressIntervalId;

      const upsertProgress = async (progress, userId, result = "") => {
        let binaryString = null;

        if (progress === 0 && lineValues.selectedFile && !lineValues.binaryInsertedRef.current) {
          try {
            const fileReader = new FileReader();
            const fileBuffer = await new Promise((resolve, reject) => {
              fileReader.onload = () => resolve(fileReader.result);
              fileReader.onerror = () => reject(fileReader.error);
              fileReader.readAsBinaryString(lineValues.selectedFile);
            });

            // Optional binary conversion
            // binaryString = Array.from(fileBuffer)
            //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            //   .join('');

            lineValues.binaryInsertedRef.current = true;
          } catch (err) {
            return;
          }
        }

        const payload = {
          user_id: userId,
          line: lineNumber,
          binary_data: " ",
          scheduled_time: lineValues.debouncedTime,
          result: result,
          file_name: lineValues.fileName,
          upload_time: lineValues.uploadTime,
          progress: progress,
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase.from('results2').upsert(payload);
        if (error) {
          console.error("Supabase upsert error:", error.message);
        }
      };

      const startProcess = async () => {
        const userId = await fetchUserId();
        if (!userId) return;

        await upsertProgress(10, userId);
        lineValues.setShowRedButton(false);

        if (!lineValues.alertShownRef.current) {
          alert("File uploaded successfully!");
          lineValues.alertShownRef.current = true;
        }

        const fetchProgressFromSupabase = async () => {
          try {
            const { data, error } = await supabase
              .from("results2")
              .select("*")
              .eq("user_id", userId)
              .eq("line", lineNumber)
              .maybeSingle();

            if (error) {
              return;
            }

            if (data) {
              const progress = data.progress || 0;
              lineValues.setLoadingProgress(progress);

              if (progress >= 100 && progressIntervalId) {
                clearInterval(progressIntervalId);
                progressIntervalId = null;
              }
            }
          } catch (err) {
            // Error handling
          }
        };

        progressIntervalId = setInterval(fetchProgressFromSupabase, 1000);
        await fetchProgressFromSupabase();

        try {
          const formData = new FormData();
          formData.append("file", lineValues.selectedFile);
          const formattedScheduledTime = new Date(lineValues.debouncedTime)
            .toISOString()
            .replace("T", " ")
            .split(".")[0];

          formData.append("scheduled_time", lineNumber === 1 ? lineValues.debouncedTime : formattedScheduledTime);
          formData.append("job_id", lineValues.currentJobId);
          formData.append("line", lineNumber);
          formData.append("user_id", userId);
          formData.append("file_name", lineValues.fileName);

          const response = await axios.post(
            `${REACT_APP_BASE_URL}/nist90b_run/`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          if (lineValues.setIsEnabled) {
            lineValues.setIsEnabled(true);
          }

          if (progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }

          lineValues.setResult(response.data);
          lineValues.handleUploadComplete();
          if (response.data.final_result === "non-random number" || response.data.final_result === "random number") {
            await upsertProgress(100, userId, response.data.final_result);
          }
        } catch (error) {
          if (progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }

          // ✅ Re-enable button on upload error
          if (lineValues.isProcessingFileRef) {
            lineValues.isProcessingFileRef.current = false;
          }
          if (lineValues.setIsUploadButtonEnabled) {
            lineValues.setIsUploadButtonEnabled(true);
          }
          const storageKey = lineValues.instanceNumber === '' ? 'ongoingFileUpload_90b' : `ongoingFileUpload_90b${lineValues.instanceNumber}`;
          sessionStorage.removeItem(storageKey);

          lineValues.setLoadingProgress(0);
          await upsertProgress(0, userId);
          alert(`Error: ${error}`);
        }
      };

      await startProcess();
      return () => {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
      };
    };

    // Process all lines that have debounced scheduled time and no result yet
    const lines = [1, 2, 3, 4, 5];
    const cleanupFunctions = [];

    lines.forEach(line => {
      const cleanup = processLine(line);
      if (cleanup) {
        cleanupFunctions.push(cleanup);
      }
    });

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
  }, [
    // All dependencies
    debouncedScheduledTime, debouncedScheduledTime2, debouncedScheduledTime3, debouncedScheduledTime4, debouncedScheduledTime5,
    result, result2, result3, result4, result5,
    selectedFile, selectedFile2, selectedFile3, selectedFile4, selectedFile5,
    fileName, fileName2, fileName3, fileName4, fileName5,
    uploadTime, uploadTime2, uploadTime3, uploadTime4, uploadTime5,
    currentJobIdT, currentJobIdT2, currentJobIdT3, currentJobIdT4, currentJobIdT5
  ]);

  const downloadNist90bOutput = async (lineNumber = 1) => {
    try {
      const url = `${REACT_APP_BASE_URL}/download_nist90b/?line=${lineNumber}`;

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        alert('No cached output found or an error occurred.');
        return;
      }

      const text = await response.text();

      // Create a blob from the text
      const blob = new Blob([text], { type: 'text/plain' });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${lineNumber}_nist90b_output.txt`;

      // Append to body and trigger click
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading NIST90B output:', error);
    }
  };


  const handleButtonClick = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {


      let progressInterval;
      setLoadingProgressRep(5);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist90b/${currentJobIdT}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 15) * 100);

          setLoadingProgressRep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput, job_id: currentJobIdT, file_name: fileName, line_number: 1 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgressRep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("reports")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {

          } else {


            // ✅ Only save columns that exist in results table
            await supabase
              .from("results2")
              .update({ report_path: data.path })
              .eq("user_id", userId)   // condition 1
              .eq("line", 1)          // condition 2
          }
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgressRep(0);
        });

    } else if (type === "graph") {



      let progressInterval;
      setLoadingProgressGr(5);


      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph90b/${currentJobIdT}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 7) * 100);
          setLoadingProgressGr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput, job_id: currentJobIdT, file_name: fileName, line_number: 1 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgressGr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT}.png`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgressGr(0);
        });

    }
  };


  const handleButtonClick2 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {



      let progressInterval;
      setLoadingProgress2Rep(5);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist90b/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 15) * 100);

          setLoadingProgress2Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput2, job_id: currentJobIdT2, file_name: fileName2, line_number: 2 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress2Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT2}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress2Rep(0);
        });

    } else if (type === "graph") {


      let progressInterval;
      setLoadingProgress2Gr(5);


      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph90b/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 7) * 100);
          setLoadingProgress2Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput2, job_id: currentJobIdT2, file_name: fileName2, line_number: 2 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress2Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT2}.png`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress2Gr(0);
        });

    }
  };

  const handleButtonClick3 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {


      let progressInterval;
      setLoadingProgress3Rep(5);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist90b/${currentJobIdT3}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 15) * 100);

          setLoadingProgress3Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput3, job_id: currentJobIdT3, file_name: fileName3, line_number: 3 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress3Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT3}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress3Rep(0);
        });
    } else if (type === "graph") {




      let progressInterval;
      setLoadingProgress3Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph90b/${currentJobIdT3}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 7) * 100);
          setLoadingProgress3Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput3, job_id: currentJobIdT3, file_name: fileName3, line_number: 3 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress3Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT3}.png`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress3Gr(0);
        });

    }
  };

  const handleButtonClick4 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {


      let progressInterval;
      setLoadingProgress4Rep(5);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist90b/${currentJobIdT4}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 15) * 100);

          setLoadingProgress4Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput4, job_id: currentJobIdT4, file_name: fileName4, line_number: 4 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress4Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT4}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress4Rep(0);
        });
    } else if (type === "graph") {


      let progressInterval;
      setLoadingProgress4Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph90b/${currentJobIdT4}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 7) * 100);
          setLoadingProgress4Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput4, job_id: currentJobIdT4, file_name: fileName4, line_number: 4 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress4Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT4}.png`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress4Gr(0);
        });

    }
  };

  const handleButtonClick5 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {


      let progressInterval;
      setLoadingProgress5Rep(5);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist90b/${currentJobIdT5}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 15) * 100);

          setLoadingProgress5Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput5, job_id: currentJobIdT5, file_name: fileName5, line_number: 5 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress5Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT5}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress5Rep(0);
        });
    } else if (type === "graph") {


      let progressInterval;
      setLoadingProgress5Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph90b/${currentJobIdT5}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 7) * 100);
          setLoadingProgress5Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation-nist90b/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput5, job_id: currentJobIdT5, file_name: fileName5, line_number: 5 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress5Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT5}.png`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress5Gr(0);
        });

    }
  };

  const handleDeleteRow = async (lineNumber) => {
    // Clear local state
    switch (lineNumber) {
      case 1:
        setBinaryInput("");
        setResult("");
        setUploadTime("");
        setFileName("");
        setScheduledTime("");
        setDebouncedScheduledTime("");
        setLoadingProgress(0);
        setIsUploadButtonEnabled(true);
        setIsDateEnabled(true);
        setIsTimeEnabled(true);
        alertShownRef.current = false;
        binaryInsertedRef.current = false;
        break;
      case 2:
        setBinaryInput2("");
        setResult2("");
        setUploadTime2("");
        setFileName2("");
        setScheduledTime2("");
        setDebouncedScheduledTime2("");
        setLoadingProgress2(0);
        setIsUploadButtonEnabled2(true);
        setIsDateEnabled2(true);
        setIsTimeEnabled2(true);
        alertShownRef2.current = false;
        binaryInsertedRef2.current = false;
        break;
      case 3:
        setBinaryInput3("");
        setResult3("");
        setUploadTime3("");
        setFileName3("");
        setScheduledTime3("");
        setDebouncedScheduledTime3("");
        setLoadingProgress3(0);
        setIsUploadButtonEnabled3(true);
        setIsDateEnabled3(true);
        setIsTimeEnabled3(true);
        alertShownRef3.current = false;
        binaryInsertedRef3.current = false;
        break;
      case 4:
        setBinaryInput4("");
        setResult4("");
        setUploadTime4("");
        setFileName4("");
        setScheduledTime4("");
        setDebouncedScheduledTime4("");
        setLoadingProgress4(0);
        setIsUploadButtonEnabled4(true);
        setIsDateEnabled4(true);
        setIsTimeEnabled4(true);
        alertShownRef4.current = false;
        binaryInsertedRef4.current = false;
        break;
      case 5:
        setBinaryInput5("");
        setResult5("");
        setUploadTime5("");
        setFileName5("");
        setScheduledTime5("");
        setDebouncedScheduledTime5("");
        setLoadingProgress5(0);
        setIsUploadButtonEnabled5(true);
        setIsDateEnabled5(true);
        setIsTimeEnabled5(true);
        alertShownRef5.current = false;
        binaryInsertedRef5.current = false;
        break;
      default:
        break;
    }

    // Clear from Supabase
    try {
      const userId = await fetchUserId();
      if (userId) {
        await supabase
          .from('results2')
          .delete()
          .match({ line: lineNumber, user_id: userId });
      }
    } catch (error) {
      console.error("Error deleting row from Supabase:", error);
      alert("Failed to delete row from database.");
    }
  };

  useEffect(() => {
  const hasShown = localStorage.getItem("nist_progress_notice_shown");

  if (!hasShown) {
    alert("If the progress is not updating, kindly refresh the page.");
    localStorage.setItem("nist_progress_notice_shown", "true");
  }
}, []);
  return (
    <Box m="20px">
      {/* Header Section */}
      <Header title="NIST Statistical 90B Tests" />
      <Box
        mt="40px"
        p="20px"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "12px", // Increased border radius
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Softer, larger shadow
          border: `1px solid ${colors.grey[700]}`, // Subtle border
          overflowX: "auto", // Ensure horizontal scrolling for small screens
        }}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "separate", // Use separate for border-spacing
            borderSpacing: "0 8px", // Space between rows
            textAlign: "center",
            "& th": {
              backgroundColor: colors.blueAccent[800], // Darker header background
              color: colors.grey[100],
              padding: "14px 10px", // More vertical padding
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              letterSpacing: "0.5px",
              "&:first-of-type": {
                borderTopLeftRadius: "8px", // Rounded corners for first header
                borderBottomLeftRadius: "8px",
              },
              "&:last-of-type": {
                borderTopRightRadius: "8px", // Rounded corners for last header
                borderBottomRightRadius: "8px",
              },
            },
            "& td": {
              padding: "15px 10px", // More padding for cells
              border: "none", // Remove individual cell borders
              backgroundColor: colors.primary[500], // Slightly different background for cells
              "&:first-of-type": {
                borderTopLeftRadius: "8px", // Rounded corners for first cell
                borderBottomLeftRadius: "8px",
              },
              "&:last-of-type": {
                borderTopRightRadius: "8px", // Rounded corners for last cell
                borderBottomRightRadius: "8px",
              },
            },
            "& tr": {
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out", // Smooth transition
              "&:hover": {
                transform: "translateY(-3px)", // Lift effect on hover
                boxShadow: `0 6px 20px ${colors.primary[600]}80`, // Shadow on hover
              },
            },
          }}
        >
          <thead>
           <tr>
              <th style={{ width: "10%" }}>Serial No</th>
              <th style={{ width: "30%" }}>Upload File</th>
              <th style={{ width: "10%" }}>Result</th>
              <th style={{ width: "10%" }}>Progress Bar</th>
              <th style={{ width: "10%" }}>Uploading Time</th>
              <th style={{ width: "10%" }}>Filename</th>
              <th style={{ width: "19%" }}>Scheduling Time</th>
              <th style={{ width: "1%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  mt="10px"
                  gap="10px"
                >
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      disabled={!isUploadButtonEnabled}
                      onClick={handleFileUpload}
                      sx={{
                        backgroundColor: colors.greenAccent[800],
                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        position: "relative",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload Binary File
                      {showRedButton && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(event, '')}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick("graph")}
                        disabled={loadingProgress < 100}
                        sx={{
                          backgroundColor: colors.blueAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Graph
                        {loadingProgressGr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgressGr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgressGr <= 100 && (
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
                          borderRadius="50%"
                          sx={{
                            backgroundColor: colors.grey[800],
                            border: `2px solid ${colors.grey[600]}`,
                            transform:
                              loadingProgressGr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgressGr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgressGr}
                            size={36}
                            thickness={4}
                            sx={{
                              color: colors.blueAccent[300], // Professional, soft blue
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={colors.blueAccent[300]}
                            sx={{
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgressGr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick("report")}
                        disabled={loadingProgress < 100}
                        sx={{
                          backgroundColor: colors.redAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.redAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Report
                        {loadingProgressRep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgressRep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
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
                            transform:
                              loadingProgressRep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgressRep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
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
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgressRep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => downloadNist90bOutput(1)}
                        disabled={loadingProgress < 100}
                        sx={{
                          backgroundColor: colors.redAccent[800],
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
                          }
                        }}
                      >
                        Download Output
                      </Button>
                    </Box>

                  </Box>
                </Box>
              </td>
              <td>{finalResult}</td>
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
                    value={loadingProgress} // Updated progress state
                    size={50}
                    thickness={5}
                    sx={{
                      color: "green",
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="white"
                    mt="5px"
                  >
                    {loadingProgress}%
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
                  disabled={!isDateEnabled}
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
                  disabled={!isTimeEnabled}
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
                        opacity: 1, // Required to override default opacity
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Current Time" arrow>
                          <IconButton
                            onClick={handleUseCurrentTime}
                            disabled={!isTimeEnabled}
                            edge="end"
                            sx={{
                              padding: "4px", // Smaller padding
                            }}
                          >
                            <AccessTimeIcon
                              sx={{
                                fontSize: "18px", // Smaller icon
                                color: "black", // Black color
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
                  Scheduled Time: {scheduledTime || "Not set"}
                </Typography>
              </td>
                <td>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip
                    title="Use this button in case of server hang or if progress is not updating even after refreshes else your data will be lost"
                    arrow
                    placement="top"
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteRow(1)}
                      sx={{
                        color: colors.redAccent[500],
                        '&:hover': {
                          color: colors.redAccent[400],
                          backgroundColor: colors.redAccent[50],
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </td>

            </tr>

            <tr>
              <td>2</td>
              <td>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  mt="10px"
                  gap="10px"
                >
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      disabled={!isUploadButtonEnabled2}
                      onClick={handleFileUpload2}
                      sx={{
                        backgroundColor: colors.greenAccent[800],
                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload Binary File
                      {showRedButton2 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef2}
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(event, '2')}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick2("graph")}
                        disabled={loadingProgress2 < 100}
                        sx={{
                          backgroundColor: colors.blueAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Graph
                        {loadingProgress2Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress2Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress2Gr <= 100 && (
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
                          borderRadius="50%"
                          sx={{
                            backgroundColor: colors.grey[800],
                            border: `2px solid ${colors.grey[600]}`,
                            transform:
                              loadingProgress2Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress2Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress2Gr}
                            size={36}
                            thickness={4}
                            sx={{
                              color: colors.blueAccent[300], // Professional, soft blue
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={colors.blueAccent[300]}
                            sx={{
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress2Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick2("report")}
                        disabled={loadingProgress2 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.redAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Report
                        {loadingProgress2Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress2Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
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
                            transform:
                              loadingProgress2Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress2Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
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
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress2Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => downloadNist90bOutput(2)}
                      disabled={loadingProgress2 < 100}
                      sx={{
                        backgroundColor: colors.redAccent[800],
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
                        }
                      }}
                    >
                      Download Output
                    </Button>
                  </Box>
                </Box>
              </td>
              <td>{finalResult2}</td>
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
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="white"
                    mt="5px"
                  >
                    {loadingProgress2}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime2 || ""}</td>
              <td>{fileName2 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date2}
                  onChange={handleDateChange2}
                  disabled={!isDateEnabled2}
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
                  value={time2}
                  onChange={handleTimeChange2}
                  disabled={!isTimeEnabled2}
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
                        opacity: 1, // Required to override default opacity
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Current Time" arrow>
                          <IconButton
                            onClick={handleUseCurrentTime2}
                            disabled={!isTimeEnabled2}
                            edge="end"
                            sx={{
                              padding: "4px", // Smaller padding
                            }}
                          >
                            <AccessTimeIcon
                              sx={{
                                fontSize: "18px", // Smaller icon
                                color: "black", // Black color
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
                <td>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip
                    title="Use this button in case of server hang or if progress is not updating even after refreshes else your data will be lost"
                    arrow
                    placement="top"
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteRow(2)}
                      sx={{
                        color: colors.redAccent[500],
                        '&:hover': {
                          color: colors.redAccent[400],
                          backgroundColor: colors.redAccent[50],
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </td>

            </tr>

            <tr>
              <td>3</td>
              <td>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  mt="10px"
                  gap="10px"
                >
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      disabled={!isUploadButtonEnabled3}
                      onClick={handleFileUpload3}
                      sx={{
                        backgroundColor: colors.greenAccent[800],
                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload Binary File
                      {showRedButton3 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef3}
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(event, '3')}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick3("graph")}
                        disabled={loadingProgress3 < 100}
                        sx={{
                          backgroundColor: colors.blueAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Graph
                        {loadingProgress3Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress3Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress3Gr <= 100 && (
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
                          borderRadius="50%"
                          sx={{
                            backgroundColor: colors.grey[800],
                            border: `2px solid ${colors.grey[600]}`,
                            transform:
                              loadingProgress3Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress3Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress3Gr}
                            size={36}
                            thickness={4}
                            sx={{
                              color: colors.blueAccent[300], // Professional, soft blue
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={colors.blueAccent[300]}
                            sx={{
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress3Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick3("report")}
                        disabled={loadingProgress3 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.redAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Report
                        {loadingProgress3Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress3Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress3Rep <= 100 && (
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
                            transform:
                              loadingProgress3Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress3Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress3Rep}
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
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress3Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => downloadNist90bOutput(3)}
                      disabled={loadingProgress3 < 100}
                      sx={{
                        backgroundColor: colors.redAccent[800],
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
                        }
                      }}
                    >
                      Download Output
                    </Button>
                  </Box>
                </Box>
              </td>
              <td>{finalResult3}</td>
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
                    value={loadingProgress3} // Updated progress state
                    size={50}
                    thickness={5}
                    sx={{
                      color: "green",
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="white"
                    mt="5px"
                  >
                    {loadingProgress3}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime3 || ""}</td>
              <td>{fileName3 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date3}
                  onChange={handleDateChange3}
                  disabled={!isDateEnabled3}
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
                  value={time3}
                  onChange={handleTimeChange3}
                  disabled={!isTimeEnabled3}
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
                        opacity: 1, // Required to override default opacity
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Current Time" arrow>
                          <IconButton
                            onClick={handleUseCurrentTime3}
                            disabled={!isTimeEnabled3}
                            edge="end"
                            sx={{
                              padding: "4px", // Smaller padding
                            }}
                          >
                            <AccessTimeIcon
                              sx={{
                                fontSize: "18px", // Smaller icon
                                color: "black", // Black color
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
                  Scheduled Time: {scheduledTime3 || "Not set"}
                </Typography>
              </td>
               <td>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip
                    title="Use this button in case of server hang or if progress is not updating even after refreshes else your data will be lost"
                    arrow
                    placement="top"
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteRow(3)}
                      sx={{
                        color: colors.redAccent[500],
                        '&:hover': {
                          color: colors.redAccent[400],
                          backgroundColor: colors.redAccent[50],
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </td>

            </tr>

            <tr>
              <td>4</td>
              <td>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  mt="10px"
                  gap="10px"
                >
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      disabled={!isUploadButtonEnabled4}
                      onClick={handleFileUpload4}
                      sx={{
                        backgroundColor: colors.greenAccent[800],
                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload Binary File
                      {showRedButton4 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef4}
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(event, '4')}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick4("graph")}
                        disabled={loadingProgress4 < 100}
                        sx={{
                          backgroundColor: colors.blueAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Graph
                        {loadingProgress4Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress4Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress4Gr <= 100 && (
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
                          borderRadius="50%"
                          sx={{
                            backgroundColor: colors.grey[800],
                            border: `2px solid ${colors.grey[600]}`,
                            transform:
                              loadingProgress4Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress4Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress4Gr}
                            size={36}
                            thickness={4}
                            sx={{
                              color: colors.blueAccent[300], // Professional, soft blue
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={colors.blueAccent[300]}
                            sx={{
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress4Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick4("report")}
                        disabled={loadingProgress4 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.redAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Report
                        {loadingProgress4Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress4Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress4Rep <= 100 && (
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
                            transform:
                              loadingProgress4Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress4Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress4Rep}
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
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress4Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => downloadNist90bOutput(4)}
                      disabled={loadingProgress4 < 100}
                      sx={{
                        backgroundColor: colors.redAccent[800],
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
                        }
                      }}
                    >
                      Download Output
                    </Button>
                  </Box>
                </Box>
              </td>
              <td>{finalResult4}</td>
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
                    value={loadingProgress4} // Updated progress state
                    size={50}
                    thickness={5}
                    sx={{
                      color: "green",
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="white"
                    mt="5px"
                  >
                    {loadingProgress4}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime4 || ""}</td>
              <td>{fileName4 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date4}
                  onChange={handleDateChange4}
                  disabled={!isDateEnabled4}
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
                  value={time4}
                  onChange={handleTimeChange4}
                  disabled={!isTimeEnabled4}
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
                        opacity: 1, // Required to override default opacity
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Current Time" arrow>
                          <IconButton
                            onClick={handleUseCurrentTime4}
                            disabled={!isTimeEnabled4}
                            edge="end"
                            sx={{
                              padding: "4px", // Smaller padding
                            }}
                          >
                            <AccessTimeIcon
                              sx={{
                                fontSize: "18px", // Smaller icon
                                color: "black", // Black color
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
                  Scheduled Time: {scheduledTime4 || "Not set"}
                </Typography>
              </td>
               <td>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip
                    title="Use this button in case of server hang or if progress is not updating even after refreshes else your data will be lost"
                    arrow
                    placement="top"
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteRow(4)}
                      sx={{
                        color: colors.redAccent[500],
                        '&:hover': {
                          color: colors.redAccent[400],
                          backgroundColor: colors.redAccent[50],
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </td>

            </tr>

            <tr>
              <td>5</td>
              <td>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  mt="10px"
                  gap="10px"
                >
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      disabled={!isUploadButtonEnabled5}
                      onClick={handleFileUpload5}
                      sx={{
                        backgroundColor: colors.greenAccent[800],
                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload Binary File
                      {showRedButton5 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef5}
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(event, '5')}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick5("graph")}
                        disabled={loadingProgress5 < 100}
                        sx={{
                          backgroundColor: colors.blueAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Graph
                        {loadingProgress5Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress5Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress5Gr <= 100 && (
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
                          borderRadius="50%"
                          sx={{
                            backgroundColor: colors.grey[800],
                            border: `2px solid ${colors.grey[600]}`,
                            transform:
                              loadingProgress5Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress5Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress5Gr}
                            size={36}
                            thickness={4}
                            sx={{
                              color: colors.blueAccent[300], // Professional, soft blue
                            }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={colors.blueAccent[300]}
                            sx={{
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress5Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick5("report")}
                        disabled={loadingProgress5 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: colors.redAccent[500],
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          },
                        }}
                      >
                        Generate Report
                        {loadingProgress5Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress5Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress5Rep <= 100 && (
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
                            transform:
                              loadingProgress5Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress5Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress5Rep}
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
                              position: "absolute",
                              fontSize: "0.75rem",
                            }}
                          >
                            {loadingProgress5Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => downloadNist90bOutput(5)}
                      disabled={loadingProgress5 < 100}
                      sx={{
                        backgroundColor: colors.redAccent[800],
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
                        }
                      }}
                    >
                      Download Output
                    </Button>
                  </Box>
                </Box>
              </td>
              <td>{finalResult5}</td>
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
                    value={loadingProgress5} // Updated progress state
                    size={50}
                    thickness={5}
                    sx={{
                      color: "green",
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="white"
                    mt="5px"
                  >
                    {loadingProgress5}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime5 || ""}</td>
              <td>{fileName5 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date5}
                  onChange={handleDateChange5}
                  disabled={!isDateEnabled5}
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


                <TextField
                  label="Enter Time (HH:mm:ss)"
                  placeholder="e.g., 14:30:00"
                  value={time5}
                  onChange={handleTimeChange5}
                  disabled={!isTimeEnabled5}
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
                        opacity: 1, // Required to override default opacity
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Current Time" arrow>
                          <IconButton
                            onClick={handleUseCurrentTime5}
                            disabled={!isTimeEnabled5}
                            edge="end"
                            sx={{
                              padding: "4px", // Smaller padding
                            }}
                          >
                            <AccessTimeIcon
                              sx={{
                                fontSize: "18px", // Smaller icon
                                color: "black", // Black color
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography variant="body2" mt={0.5} sx={{ color: "#4CCEAC" }}>
                  Scheduled Time: {scheduledTime5 || "Not set"}
                </Typography>
              </td>
                <td>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip
                    title="Use this button in case of server hang or if progress is not updating even after refreshes else your data will be lost"
                    arrow
                    placement="top"
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteRow(5)}
                      sx={{
                        color: colors.redAccent[500],
                        '&:hover': {
                          color: colors.redAccent[400],
                          backgroundColor: colors.redAccent[50],
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </td>

            </tr>

          </tbody>
        </Box>
      </Box>
    
    </Box>
  );
};

export default Nist_tests90b;