import { Box, Typography, useTheme, TextField, Button, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Make sure axios is imported
import CircularProgress from "@mui/material/CircularProgress";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import dayjs from "dayjs";
import { MenuItem, FormControl, InputAdornment, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../utils/supabaseClient';
import { saveAs } from "file-saver"; // npm install file-saver
import DeleteIcon from '@mui/icons-material/Delete';
const MAX_STACK_SIZE_ESTIMATE = 150 * 1024 * 1024;

const Dieharder_tests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

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

  const [binaryInput, setBinaryInput] = useState("");
  const [binaryInput2, setBinaryInput2] = useState("");
  const [binaryInput3, setBinaryInput3] = useState("");
  const [binaryInput4, setBinaryInput4] = useState("");
  const [binaryInput5, setBinaryInput5] = useState("");

  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [isEnabled3, setIsEnabled3] = useState(true);
  const [isEnabled4, setIsEnabled4] = useState(true);
  const [isEnabled5, setIsEnabled5] = useState(true);

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
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload_dt');
      const storedProgress = sessionStorage.getItem('uploadProgress_dt');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled(false);
      }
    }, 500);
  };


  const handleUseCurrentTime = () => {
    if (!isTimeEnabled) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime(formattedTime);

  };


  const handleTimeChange2 = (event) => {
    const inputTime = event.target.value;
    setTime2(inputTime); // Update the time state immediately

    if (timeDebounceRef2.current) {
      clearTimeout(timeDebounceRef2.current);
    }

    // Disable time input after 500ms if upload is in progress
    timeDebounceRef2.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload2_dt');
      const storedProgress = sessionStorage.getItem('uploadProgress2_dt');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled2(false);
      }
    }, 500);
  };

  const handleUseCurrentTime2 = () => {
    if (!isTimeEnabled2) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime2(formattedTime);

  };


  const handleTimeChange3 = (event) => {
    const inputTime = event.target.value;
    setTime3(inputTime); // Update the time state immediately

    // Clear existing timeout
    if (timeDebounceRef3.current) {
      clearTimeout(timeDebounceRef3.current);
    }

    // Disable time input after 500ms if upload is in progress
    timeDebounceRef3.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload3_dt');
      const storedProgress = sessionStorage.getItem('uploadProgress3_dt');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled3(false);
      }
    }, 500);
  };

  const handleUseCurrentTime3 = () => {
    if (!isTimeEnabled3) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime3(formattedTime);

  };


  const handleTimeChange4 = (event) => {
    const inputTime = event.target.value;
    setTime4(inputTime); // Update the time state immediately

    // Clear existing timeout
    if (timeDebounceRef4.current) {
      clearTimeout(timeDebounceRef4.current);
    }

    // Disable time input after 500ms if upload is in progress
    timeDebounceRef4.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload4_dt');
      const storedProgress = sessionStorage.getItem('uploadProgress4_dt');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled4(false);
      }
    }, 500);
  };
  const handleUseCurrentTime4 = () => {
    if (!isTimeEnabled4) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime4(formattedTime);

  };

  const handleTimeChange5 = (event) => {
    const inputTime = event.target.value;
    setTime5(inputTime); // Update the time state immediately

    // Clear existing timeout
    if (timeDebounceRef5.current) {
      clearTimeout(timeDebounceRef5.current);
    }

    // Disable time input after 500ms if upload is in progress
    timeDebounceRef5.current = setTimeout(() => {
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload5_dt');
      const storedProgress = sessionStorage.getItem('uploadProgress5_dt');

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        setIsTimeEnabled5(false);
      }
    }, 500);
  };

  const handleUseCurrentTime5 = () => {
    if (!isTimeEnabled5) return;
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime5(formattedTime);

  };


  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const timeouts = {};

    // Create timeout for each time value
    const times = [
      { value: time, key: 'time' },
      { value: time2, key: 'time2' },
      { value: time3, key: 'time3' },
      { value: time4, key: 'time4' },
      { value: time5, key: 'time5' }
    ];

    times.forEach(({ value, key }) => {
      // Clear existing timeout for this key if any
      if (timeouts[key]) {
        clearTimeout(timeouts[key]);
      }

      // Set new timeout
      timeouts[key] = setTimeout(() => {
        if (value && !timeRegex.test(value)) {
          alert("Invalid time format. Use HH:mm:ss (24-hour format).");
        }
      }, 500); // Wait 500ms after the user stops typing
    });

    // Cleanup function - clear all timeouts
    return () => {
      Object.values(timeouts).forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
    };
  }, [time, time2, time3, time4, time5]);


  useEffect(() => {
    // Combine date and time for each instance when both are available
    if (date && time) {
      setScheduledTime(`${date} ${time}`);
    }
    if (date2 && time2) {
      setScheduledTime2(`${date2} ${time2}`);
    }
    if (date3 && time3) {
      setScheduledTime3(`${date3} ${time3}`);
    }
    if (date4 && time4) {
      setScheduledTime4(`${date4} ${time4}`);
    }
    if (date5 && time5) {
      setScheduledTime5(`${date5} ${time5}`);
    }
  }, [date, time, date2, time2, date3, time3, date4, time4, date5, time5]);




  const finalResult = result ? result.final_result : " ";
  const finalResult2 = result2 ? result2.final_result : " ";
  const finalResult3 = result3 ? result3.final_result : " ";
  const finalResult4 = result4 ? result4.final_result : " ";
  const finalResult5 = result5 ? result5.final_result : " ";

  useEffect(() => {
    const handlers = [];

    // Helper function to create debounced handler
    const createDebouncedHandler = (scheduledTime, setDebouncedScheduledTime) => {
      const handler = setTimeout(() => {
        setDebouncedScheduledTime(scheduledTime);
      }, 3000);
      handlers.push(handler);
    };

    // Create debounced handlers for all scheduled times
    createDebouncedHandler(scheduledTime, setDebouncedScheduledTime);
    createDebouncedHandler(scheduledTime2, setDebouncedScheduledTime2);
    createDebouncedHandler(scheduledTime3, setDebouncedScheduledTime3);
    createDebouncedHandler(scheduledTime4, setDebouncedScheduledTime4);
    createDebouncedHandler(scheduledTime5, setDebouncedScheduledTime5);

    // Cleanup function to clear all timeouts
    return () => {
      handlers.forEach(handler => {
        clearTimeout(handler);
      });
    };
  }, [scheduledTime, scheduledTime2, scheduledTime3, scheduledTime4, scheduledTime5]);



  const [showRedButton, setShowRedButton] = useState(false);
  const [showRedButton2, setShowRedButton2] = useState(false);
  const [showRedButton3, setShowRedButton3] = useState(false);
  const [showRedButton4, setShowRedButton4] = useState(false);

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
  const [showRedButton5, setShowRedButton5] = useState(false);

  const handleFileUpload = () => {
    fileInputRef.current.click();
    if (isUploadButtonEnabled) {
    }
  };
  const handleFileUpload2 = () => {
    fileInputRef2.current.click();
    if (isUploadButtonEnabled2) {
    }

  };
  const handleFileUpload3 = () => {
    if (isUploadButtonEnabled3) {
      fileInputRef3.current.click();
    }

  };
  const handleFileUpload4 = () => {
    if (isUploadButtonEnabled4) {
      fileInputRef4.current.click();
    }

  };
  const handleFileUpload5 = () => {
    if (isUploadButtonEnabled5) {
      fileInputRef5.current.click();
    }

  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);


  const isProcessingFileRef = useRef(false);
  const isProcessingFileRef2 = useRef(false);
  const isProcessingFileRef3 = useRef(false);
  const isProcessingFileRef4 = useRef(false);
  const isProcessingFileRef5 = useRef(false);
  const [isUploadButtonEnabled, setIsUploadButtonEnabled] = useState(true);
  const [isUploadButtonEnabled2, setIsUploadButtonEnabled2] = useState(true);
  const [isUploadButtonEnabled3, setIsUploadButtonEnabled3] = useState(true);
  const [isUploadButtonEnabled4, setIsUploadButtonEnabled4] = useState(true);
  const [isUploadButtonEnabled5, setIsUploadButtonEnabled5] = useState(true);


  const handleFileChange = async (event) => {
    isProcessingFileRef.current = true;

    setLoadingProgressGr(0);
    setLoadingProgressRep(0);
    sessionStorage.setItem(`ongoingFileUpload_dt`, 'true');

    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton(false);
      return;
    }

    setSelectedFile(selectedFile);

    const fileName = selectedFile.name.toLowerCase(); // normalize case
    const isBin = fileName.endsWith(".bin");
    const isTxt = fileName.endsWith(".txt");



    if (!isBin) {
      alert("Please upload a .bin file.");
      return;
    }



    const userId = await fetchUserId();
    if (!userId) return;

    // Reset state
    setBinaryInput("");
    setResult("");
    setFileName("");
    setUploadTime("");
    setLoadingProgress(0);
    setTime("");
    setScheduledTime("");
    setDebouncedScheduledTime("");

    setFileName(selectedFile.name);
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setUploadTime(currentTime);



    // Supabase cleanup
    try {

      const { error: deleteError } = await supabase
        .from('results3')
        .delete()
        .match({ line: 1, user_id: userId });

      if (deleteError) {
        return;
      }
    } catch (err) {

    } finally {
      isProcessingFileRef.current = false; // Reset flag when done
    }
    setIsEnabled(false);
    event.target.value = "";
  };

  const handleFileChange2 = async (event) => {
    isProcessingFileRef2.current = true; // Set flag when processing starts

    setLoadingProgress2Gr(0);
    setLoadingProgress2Rep(0);
    sessionStorage.setItem(`ongoingFileUpload_dt2`, 'true');
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton2(false);
      return;
    }
    setSelectedFile2(selectedFile);
    const fileName = selectedFile.name.toLowerCase(); // normalize case
    const isBin = fileName.endsWith(".bin");
    const isTxt = fileName.endsWith(".txt");



    if (!isBin) {
      alert("Please upload a .bin file.");
      return;
    }


    const userId = await fetchUserId();
    if (!userId) {

      return;
    }

    // Reset all state variables for line 2
    setBinaryInput2("");
    setScheduledTime2("");
    setDebouncedScheduledTime2("");
    setResult2("");
    setFileName2("");
    setUploadTime2("");
    setLoadingProgress2(0);
    setTime2("");

    // Set new filename
    setFileName2(selectedFile.name);
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setUploadTime2(currentTime);

    // Supabase cleanup
    try {
      localStorage.setItem('resultFetchedFromSupabase3', 'false');
      const { error: deleteError } = await supabase
        .from('results3')
        .delete()
        .match({ line: 2, user_id: userId });

      if (deleteError) {

        return;
      }
    } catch (err) {

    } finally {
      isProcessingFileRef2.current = false; // Reset flag when done
    }
    setIsEnabled2(false);

    event.target.value = "";
  };

  const handleFileChange3 = async (event) => {
    isProcessingFileRef3.current = true; // Set flag when processing starts

    setLoadingProgress3Gr(0);
    setLoadingProgress3Rep(0);
    sessionStorage.setItem(`ongoingFileUpload_dt3`, 'true');
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton3(false);
      return;
    }
    setSelectedFile3(selectedFile);

    const fileName = selectedFile.name.toLowerCase(); // normalize case
    const isBin = fileName.endsWith(".bin");
    const isTxt = fileName.endsWith(".txt");



    if (!isBin) {
      alert("Please upload a .bin file.");
      return;
    }



    const userId = await fetchUserId();
    if (!userId) {

      return;
    }

    // Reset all state variables for line 3
    setBinaryInput3("");
    setScheduledTime3("");
    setDebouncedScheduledTime3("");
    setResult3("");
    setFileName3("");
    setUploadTime3("");
    setLoadingProgress3(0);
    setTime3("");

    // Set new filename
    setFileName3(selectedFile.name);

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setUploadTime3(currentTime);

    // Remove previous Supabase row for line 3
    try {

      const { error: deleteError } = await supabase
        .from('results3')
        .delete()
        .match({ line: 3, user_id: userId });

      setLoadingProgress3(0);
      if (deleteError) {

        return;
      }
    } catch (err) {

    } finally {
      isProcessingFileRef3.current = false; // Reset flag when done
    }
    setIsEnabled3(false);

    // Reset the file input
    event.target.value = "";
  };


  const handleFileChange4 = async (event) => {
    isProcessingFileRef4.current = true;
    setLoadingProgress4Gr(0);
    setLoadingProgress4Rep(0);
    sessionStorage.setItem(`ongoingFileUpload_dt4`, 'true');
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton4(false);
      return;
    }
    setSelectedFile4(selectedFile);

    const fileName = selectedFile.name.toLowerCase(); // normalize case
    const isBin = fileName.endsWith(".bin");
    const isTxt = fileName.endsWith(".txt");



    if (!isBin) {
      alert("Please upload a .bin file.");
      return;
    }



    const userId = await fetchUserId();
    if (!userId) {

      return;
    }

    // Reset all state variables for line 4
    setBinaryInput4("");
    setScheduledTime4("");
    setDebouncedScheduledTime4("");
    setResult4("");
    setFileName4("");
    setUploadTime4("");
    setLoadingProgress4(0);
    setTime4("");

    // Set new filename
    setFileName4(selectedFile.name);

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setUploadTime4(currentTime);


    // Remove previous Supabase row for line 4
    try {

      const { error: deleteError } = await supabase
        .from('results3')
        .delete()
        .match({ line: 4, user_id: userId });

      setLoadingProgress4(0);
      if (deleteError) {

        return;
      }
    } catch (err) {

    } finally {
      isProcessingFileRef4.current = false; // Reset flag when done
    }
    setIsEnabled4(false);

    // Reset the file input
    event.target.value = "";
  };


  const handleFileChange5 = async (event) => {
    isProcessingFileRef5.current = true;
    setLoadingProgress5Gr(0);
    setLoadingProgress5Rep(0);
    sessionStorage.setItem(`ongoingFileUpload_dt5`, 'true');
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton5(false);
      return;
    }
    setSelectedFile5(selectedFile);

    const fileName = selectedFile.name.toLowerCase(); // normalize case
    const isBin = fileName.endsWith(".bin");
    const isTxt = fileName.endsWith(".txt");



    if (!isBin) {
      alert("Please upload a .bin file.");
      return;
    }


    const userId = await fetchUserId();
    if (!userId) {

      return;
    }

    // Reset all state variables for line 5
    setBinaryInput5("");
    setScheduledTime5("");
    setDebouncedScheduledTime5("");
    setResult5("");
    setFileName5("");
    setUploadTime5("");
    setLoadingProgress5(0);
    setTime5("");

    // Set new filename
    setFileName5(selectedFile.name);

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setUploadTime5(currentTime);


    // Remove previous Supabase row for line 5
    try {
      localStorage.setItem('resultFetchedFromSupabased5', 'false');
      const { error: deleteError } = await supabase
        .from('results3')
        .delete()
        .match({ line: 5, user_id: userId });

      setLoadingProgress5(0);
      if (deleteError) {

        return;
      }
    } catch (err) {

    } finally {
      isProcessingFileRef5.current = false; // Reset flag when done
    }
    setIsEnabled5(false);

    // Reset the file input
    event.target.value = "";
  };



  useEffect(() => {
     let subscription;
    const setupSubscription = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      // Fetch initial data
      const fetchInitialData = async () => {
        try {
          const { data, error } = await supabase
            .from('results3')
            .select('*')
            .eq('user_id', userId);

          if (error) {
            return;
          }

          if (data) {

            data.forEach(async (row) => {
              switch (row.line) {
                case 1:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results3')
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
                    setLoadingProgress(row.progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput(row.binary_data);
                    setScheduledTime(row.scheduled_time);
                    setResult({ final_result: row.result });
                    setFileName(row.file_name);
                    setUploadTime(row.upload_time);
                    setLoadingProgress(row.progress);
                  }
                  break;
                case 2:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results3')
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
                    setLoadingProgress2(row.progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput2(row.binary_data);
                    setScheduledTime2(row.scheduled_time);
                    setResult2({ final_result: row.result });
                    setFileName2(row.file_name);
                    setUploadTime2(row.upload_time);
                    setLoadingProgress2(row.progress);
                  }
                  break;
                case 3:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results3')
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
                    setLoadingProgress3(row.progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput3(row.binary_data);
                    setScheduledTime3(row.scheduled_time);
                    setResult3({ final_result: row.result });
                    setFileName3(row.file_name);
                    setUploadTime3(row.upload_time);
                    setLoadingProgress3(row.progress);
                  }
                  break;
                case 4:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results3')
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
                    setLoadingProgress4(row.progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput4(row.binary_data);
                    setScheduledTime4(row.scheduled_time);
                    setResult4({ final_result: row.result });
                    setFileName4(row.file_name);
                    setUploadTime4(row.upload_time);
                    setLoadingProgress4(row.progress);
                  }
                  break;
                case 5:
                  // ⛔ CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results3')
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
                    setLoadingProgress5(row.progress);
                  } else {
                    // Normal case - progress is between 0-99
                    setBinaryInput5(row.binary_data);
                    setScheduledTime5(row.scheduled_time);
                    setResult5({ final_result: row.result });
                    setFileName5(row.file_name);
                    setUploadTime5(row.upload_time);
                    setLoadingProgress5(row.progress);
                  }
                  break;
                default:
                  break;
              }
            });
          }
        } catch (err) {
          console.error('❌ Error in initial data fetch:', err);
        }
      };

      await fetchInitialData();


      subscription = supabase
        .channel('results3-changes') // ✅ Unique channel name with timestamp
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'results3',
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
            if (row.progress == 100 && (!row.result || row.result.trim() === "")) {

              return; // Don't update state for misleading 100% progress
            }
            switch (row.line) {
              case 1:
                if (row.line === 1) {
                setBinaryInput(row.binary_data);
                setScheduledTime(row.scheduled_time);
                setResult({ final_result: row.result });
                setFileName(row.file_name);
                setUploadTime(row.upload_time);
                setLoadingProgress(row.progress);
                }
                break;
              case 2:
                if (row.line === 1) {
                setBinaryInput2(row.binary_data);
                setScheduledTime2(row.scheduled_time);
                setResult2({ final_result: row.result });
                setFileName2(row.file_name);
                setUploadTime2(row.upload_time);
                setLoadingProgress2(row.progress);
                }
                break;
              case 3:
                if (row.line === 1) {
                setBinaryInput3(row.binary_data);
                setScheduledTime3(row.scheduled_time);
                setResult3({ final_result: row.result });
                setFileName3(row.file_name);
                setUploadTime3(row.upload_time);
                setLoadingProgress3(row.progress);
                }
                break;
              case 4:
                if (row.line === 1) {
                setBinaryInput4(row.binary_data);
                setScheduledTime4(row.scheduled_time);
                setResult4({ final_result: row.result });
                setFileName4(row.file_name);
                setUploadTime4(row.upload_time);
                setLoadingProgress4(row.progress);
                }
                break;
              case 5:
                if (row.line === 1) {
                setBinaryInput5(row.binary_data);
                setScheduledTime5(row.scheduled_time);
                setResult5({ final_result: row.result });
                setFileName5(row.file_name);
                setUploadTime5(row.upload_time);
                setLoadingProgress5(row.progress);
                }
                break;
              default:
                break;
            }
          }
        )
        .subscribe((status) => {
          
        });
    };

    setupSubscription();

    return () => {
       if (subscription) {
        subscription.unsubscribe();
        // console.log('Subscription cleaned up');
      }
    };
  }, []); // Add isResults3Subscribed as dependency


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


  const binaryInsertedRef = useRef(false); // 🔁 Track binary insert
  const binaryInsertedRef2 = useRef(false);
  const binaryInsertedRef3 = useRef(false);
  const binaryInsertedRef4 = useRef(false);
  const binaryInsertedRef5 = useRef(false);


  let binaryDataSent = false;
  let binaryDataSent2 = false;
  let binaryDataSent3 = false;
  let binaryDataSent4 = false;
  let binaryDataSent5 = false;

  const alertShownRef = useRef(false);
  const alertShownRef2 = useRef(false);
  const alertShownRef3 = useRef(false);
  const alertShownRef4 = useRef(false);
  const alertShownRef5 = useRef(false);

  useEffect(() => {
    const handleProgressUpdate = (progress, storageKey, setIsDateEnabled, setIsTimeEnabled) => {
      if (progress === 100) {
        // Upload completed - enable both inputs
        setIsDateEnabled(true);
        setIsTimeEnabled(true);
        sessionStorage.removeItem(`ongoingFileUpload_dt${storageKey}`);
        sessionStorage.removeItem(`uploadProgress_dt${storageKey}`);
      } else if (progress > 0 && progress < 100) {
        // Upload in progress - disable both inputs
        setIsDateEnabled(false);
        setIsTimeEnabled(false);
        sessionStorage.setItem(`ongoingFileUpload_dt${storageKey}`, 'true');
        sessionStorage.setItem(`uploadProgress_dt${storageKey}`, progress.toString());
      }
    };

    handleProgressUpdate(loadingProgress, '', setIsDateEnabled, setIsTimeEnabled);
    handleProgressUpdate(loadingProgress2, '2', setIsDateEnabled2, setIsTimeEnabled2);
    handleProgressUpdate(loadingProgress3, '3', setIsDateEnabled3, setIsTimeEnabled3);
    handleProgressUpdate(loadingProgress4, '4', setIsDateEnabled4, setIsTimeEnabled4);
    handleProgressUpdate(loadingProgress5, '5', setIsDateEnabled5, setIsTimeEnabled5);
  }, [loadingProgress, loadingProgress2, loadingProgress3, loadingProgress4, loadingProgress5]);

   useEffect(() => {
    const checkPersistentState = (storageKey, setIsDateEnabled, setIsTimeEnabled) => {
      const ongoingUpload = sessionStorage.getItem(`ongoingFileUpload_dt${storageKey}`);
      const storedProgress = sessionStorage.getItem(`uploadProgress_dt${storageKey}`);

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        // There's an ongoing upload - disable inputs
        setIsDateEnabled(false);
        setIsTimeEnabled(false);
      } else {
        // No ongoing upload - enable inputs
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

 const handleUploadComplete = () => {
    isProcessingFileRef.current = false;
    setIsUploadButtonEnabled(true);
  };
  const handleUploadComplete2 = () => {
    isProcessingFileRef2.current = false;
    setIsUploadButtonEnabled2(true);
  };
  const handleUploadComplete3 = () => {
    isProcessingFileRef3.current = false;
    setIsUploadButtonEnabled3(true);
  };
  const handleUploadComplete4 = () => {
    isProcessingFileRef4.current = false;
    setIsUploadButtonEnabled4(true);
  };
  const handleUploadComplete5 = () => {
    isProcessingFileRef5.current = false;
    setIsUploadButtonEnabled5(true);
  };

  const [currentJobIdT, setCurrentJobIdT] = useState(() => {
    const saved = localStorage.getItem("currentJobId_D");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_D", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef.current = currentJobIdT;
  }, [currentJobIdT]);

  const [currentJobIdT2, setCurrentJobIdT2] = useState(() => {
    const saved = localStorage.getItem("currentJobId_D2");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_D2", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef2.current = currentJobIdT2;
  }, [currentJobIdT2]);

  const [currentJobIdT3, setCurrentJobIdT3] = useState(() => {
    const saved = localStorage.getItem("currentJobId_D3");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_D3", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef3.current = currentJobIdT3;
  }, [currentJobIdT3]);

  const [currentJobIdT4, setCurrentJobIdT4] = useState(() => {
    const saved = localStorage.getItem("currentJobId_D4");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_D4", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef4.current = currentJobIdT4;
  }, [currentJobIdT4]);

  const [currentJobIdT5, setCurrentJobIdT5] = useState(() => {
    const saved = localStorage.getItem("currentJobId_D5");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_D5", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef5.current = currentJobIdT5;
  }, [currentJobIdT5]);

   useEffect(() => {
    const checkPersistentState = (storageKey, isProcessingFileRef, setIsUploadButtonEnabled) => {
      const ongoingUpload = sessionStorage.getItem(`ongoingFileUpload_dt${storageKey}`);
      const storedProgress = sessionStorage.getItem(`uploadProgress_dt${storageKey}`);

      if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
        // There's an ongoing upload that hasn't completed
        isProcessingFileRef.current = true;
        setIsUploadButtonEnabled(false);
      } else {
        // No ongoing upload or upload was completed
        isProcessingFileRef.current = false;
        setIsUploadButtonEnabled(true);
        // Clean up sessionStorage
        sessionStorage.removeItem(`ongoingFileUpload_dt${storageKey}`);
        sessionStorage.removeItem(`uploadProgress_dt${storageKey}`);
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
      if (progress === 100) {
        // Upload completed
        isProcessingFileRef.current = false;
        setIsUploadButtonEnabled(true);
        sessionStorage.removeItem(`ongoingFileUpload_dt${storageKey}`);
        sessionStorage.removeItem(`uploadProgress_dt${storageKey}`);
      } else if (progress > 0 && progress < 100) {
        // Upload in progress
        isProcessingFileRef.current = true;
        setIsUploadButtonEnabled(false);
        sessionStorage.setItem(`ongoingFileUpload_dt${storageKey}`, 'true');
        sessionStorage.setItem(`uploadProgress_dt${storageKey}`, progress.toString());
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

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
      if (result=="non-random number" || result=="random number"){
        
        return;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 1)
            .maybeSingle();

          if (error) {

            // ❌ stop polling on error
            if (progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            if (data.line === 1) {
              setLoadingProgress(progress);

              if (data.result) {
                setResult({ final_result: data.result });
                localStorage.setItem("resultFetchedFromSupabase", "true");
              }

              // ✅ Stop polling if already complete
              if (progress >= 100 && progressIntervalId) {
                clearInterval(progressIntervalId);
                progressIntervalId = null;
              }
            }
          }
        } catch (err) {

          // ❌ stop polling on unexpected error
          if (progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      };

      // Start polling again
      progressIntervalId = setInterval(fetchProgressFromSupabase, 2000);

      // Do one immediate fetch
      await fetchProgressFromSupabase();
    };

    // On mount → resume progress check
    resumeProgressCheck();

    // On unmount → clear polling
    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!debouncedScheduledTime) {
      return;
    }


    const lineNo = 1;
    if (result) {
      return;
    }
    setLoadingProgress(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && selectedFile && !binaryInsertedRef.current) {
        try {
          const fileReader = new FileReader();

          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile);
          });


          binaryInsertedRef.current = true; // ✅ Prevent future inserts

        } catch (err) {

          return;
        }
      }

      const payload = {
        user_id: userId,
        line: 1,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime,
        result: result,
        file_name: fileName,
        upload_time: uploadTime,
        progress: progress,
        updated_at: new Date().toISOString()
      };


      const { error } = await supabase
        .from('results3')
        .upsert(payload);


      if (error) {

      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      await upsertProgress(10, userId);

      setShowRedButton(false);
      if (!alertShownRef.current) {
        alert("File uploaded successfully!");
        alertShownRef.current = true;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 1)
            .maybeSingle();

          if (error) {

            return;
          }

          if (data) {

            const progress = data.progress || 0;

            setLoadingProgress(progress);

            //  Stop polling once progress is 100%
            if (progress >= 100 && progressIntervalId) {

              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {

        }
      };
      progressIntervalId = setInterval(fetchProgressFromSupabase, 1000);
      await fetchProgressFromSupabase();
      try {

        const formData = new FormData();
        formData.append("file", selectedFile);
        const formattedScheduledTime = new Date(debouncedScheduledTime)
          .toISOString()
          .replace("T", " ")
          .split(".")[0];

        formData.append("scheduled_time", debouncedScheduledTime);
        formData.append("job_id", currentJobIdT);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setIsEnabled(true);
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }


        setResult(response.data);
       if(result.final_result==="non-random number" || result.final_result==="random number"){
        await upsertProgress(100, userId, response.data.final_result);
       }
        handleUploadComplete();

      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        setLoadingProgress(0);
        await upsertProgress(0, userId);
        alert(`Error: ${error}`);

      }
    };

    startProcess();

    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [selectedFile, debouncedScheduledTime]);


  const jobIdRef = useRef(null);
  const jobIdRef2 = useRef(null);
  const jobIdRef3 = useRef(null);
  const jobIdRef4 = useRef(null);
  const jobIdRef5 = useRef(null);

  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
       if (result=="non-random number" || result=="random number"){
       
        return;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 2)
            .maybeSingle();

          if (error) {

            // ❌ stop polling on error
            if (progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            if (data.line === 2) {
              setLoadingProgress2(progress);

              if (data.result) {
                setResult2({ final_result: data.result });
                localStorage.setItem("resultFetchedFromSupabase", "true");
              }

              // ✅ Stop polling if already complete
              if (progress >= 100 && progressIntervalId) {
                clearInterval(progressIntervalId);
                progressIntervalId = null;
              }
            }
          }
        } catch (err) {

          // ❌ stop polling on unexpected error
          if (progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      };

      // Start polling again
      progressIntervalId = setInterval(fetchProgressFromSupabase, 2000);

      // Do one immediate fetch
      await fetchProgressFromSupabase();
    };

    // On mount → resume progress check
    resumeProgressCheck();

    // On unmount → clear polling
    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, []);



  useEffect(() => {
    if (!debouncedScheduledTime2) return;


    const lineNo = 2;

    if (result2) {
      // localStorage.setItem('resultFetchedFromSupabased2', 'true');
      // setLoadingProgress2(100);
      return;
    }

    setLoadingProgress2(0);
    let progressIntervalId;

    const upsertProgress2 = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && selectedFile2 && !binaryInsertedRef2.current) {
        try {
          const fileReader = new FileReader();

          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile2);
          });

          binaryInsertedRef2.current = true; // ✅ Prevent future inserts


        } catch (err) {

          return;
        }
      }
      ;

      const payload = {
        user_id: userId,
        line: 2,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime2,
        result: result,
        file_name: fileName2,
        upload_time: uploadTime2,
        progress: progress,
        updated_at: new Date().toISOString()
      };


      const { error } = await supabase
        .from('results3')
        .upsert(payload);


      if (error) {

      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }

      await upsertProgress2(10, userId);

      setShowRedButton2(false);
      if (!alertShownRef2.current) {
        alert("File uploaded successfully!");
        alertShownRef2.current = true;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 2)
            .maybeSingle();

          if (error) {

            return;
          }

          if (data) {

            const progress = data.progress || 0;

            setLoadingProgress2(progress);

            //  Stop polling once progress is 100%
            if (progress >= 100 && progressIntervalId) {

              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {

        }
      };

      progressIntervalId = setInterval(fetchProgressFromSupabase, 1000);
      await fetchProgressFromSupabase();
      try {

        const formData = new FormData();
        formData.append("file", selectedFile2);
        const formattedScheduledTime = new Date(debouncedScheduledTime2)
          .toISOString()
          .replace("T", " ")
          .split(".")[0];

        formData.append("scheduled_time", debouncedScheduledTime2);
        formData.append("job_id", currentJobIdT2);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName2);
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setIsEnabled2(true);
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setResult2(response.data);
       
        if(result2.final_result==="non-random number" || result2.final_result==="random number"){
        await upsertProgress2(100, userId, response.data.final_result);
       }
       handleUploadComplete2();
      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        setLoadingProgress2(0);
        await upsertProgress2(0, userId);
        alert(`Error: ${error}`);

      }
    };

    startProcess();


    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [selectedFile2, debouncedScheduledTime2]);


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
       if (result3=="non-random number" || result3=="random number"){
       
        return;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 3)
            .maybeSingle();

          if (error) {

            // ❌ stop polling on error
            if (progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            if (data.line === 3) {
              setLoadingProgress3(progress);

              if (data.result) {
                setResult3({ final_result: data.result });
                localStorage.setItem("resultFetchedFromSupabase", "true");
              }

              // ✅ Stop polling if already complete
              if (progress >= 100 && progressIntervalId) {
                clearInterval(progressIntervalId);
                progressIntervalId = null;
              }
            }
          }
        } catch (err) {

          // ❌ stop polling on unexpected error
          if (progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      };

      // Start polling again
      progressIntervalId = setInterval(fetchProgressFromSupabase, 2000);

      // Do one immediate fetch
      await fetchProgressFromSupabase();
    };

    // On mount → resume progress check
    resumeProgressCheck();

    // On unmount → clear polling
    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!debouncedScheduledTime3) return;


    const lineNo = 3;

    if (result3) {
      // localStorage.setItem('resultFetchedFromSupabased2', 'true');
      // setLoadingProgress3(100);
      return;
    }

    setLoadingProgress3(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && selectedFile3 && !binaryInsertedRef3.current) {
        try {
          const fileReader = new FileReader();

          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile3);
          });

          binaryInsertedRef3.current = true; // ✅ Prevent future inserts

        } catch (err) {

          return;
        }
      }
      ;

      const payload = {
        user_id: userId,
        line: 3,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime3,
        result: result,
        file_name: fileName3,
        upload_time: uploadTime3,
        progress: progress,
        updated_at: new Date().toISOString()
      };


      const { error } = await supabase
        .from('results3')
        .upsert(payload);


      if (error) {

      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }

      await upsertProgress(10, userId);

      setShowRedButton3(false);
      if (!alertShownRef3.current) {
        alert("File uploaded successfully!");
        alertShownRef3.current = true;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 3)
            .maybeSingle();

          if (error) {

            return;
          }

          if (data) {

            const progress = data.progress || 0;

            setLoadingProgress3(progress);

            //  Stop polling once progress is 100%
            if (progress >= 100 && progressIntervalId) {

              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {

        }
      };

      progressIntervalId = setInterval(fetchProgressFromSupabase, 1000);
      await fetchProgressFromSupabase();
      try {

        const formData = new FormData();
        formData.append("file", selectedFile3);
        const formattedScheduledTime = new Date(debouncedScheduledTime3)
          .toISOString()
          .replace("T", " ")
          .split(".")[0];

        formData.append("scheduled_time", debouncedScheduledTime3);
        formData.append("job_id", currentJobIdT3);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName3);
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setIsEnabled3(true);
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }


        setResult3(response.data);
       
        if(result3.final_result==="non-random number" || result3.final_result==="random number"){
        await upsertProgress(100, userId, response.data.final_result);
       }
         handleUploadComplete3();
      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        setLoadingProgress3(0);
        await upsertProgress(0, userId);
        alert(`Error: ${error}`);

      }
    };

    startProcess();


    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [selectedFile3, debouncedScheduledTime3]);



  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
 if (result4=="non-random number" || result4=="random number"){
      
        return;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 4)
            .maybeSingle();

          if (error) {

            // ❌ stop polling on error
            if (progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            if (data.line === 4) {
              setLoadingProgress4(progress);

              if (data.result) {
                setResult4({ final_result: data.result });
                localStorage.setItem("resultFetchedFromSupabase", "true");
              }

              // ✅ Stop polling if already complete
              if (progress >= 100 && progressIntervalId) {
                clearInterval(progressIntervalId);
                progressIntervalId = null;
              }
            }
          }
        } catch (err) {

          // ❌ stop polling on unexpected error
          if (progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      };

      // Start polling again
      progressIntervalId = setInterval(fetchProgressFromSupabase, 2000);

      // Do one immediate fetch
      await fetchProgressFromSupabase();
    };

    // On mount → resume progress check
    resumeProgressCheck();

    // On unmount → clear polling
    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!debouncedScheduledTime4) return;


    const lineNo = 4;

    if (result4) {
      return;
    }

    setLoadingProgress4(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && selectedFile4 && !binaryInsertedRef4.current) {
        try {
          const fileReader = new FileReader();

          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile4);
          });

          binaryInsertedRef4.current = true; // ✅ Prevent future inserts

        } catch (err) {

          return;
        }
      }
      ;

      const payload = {
        user_id: userId,
        line: 4,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime4,
        result: result,
        file_name: fileName4,
        upload_time: uploadTime4,
        progress: progress,
        updated_at: new Date().toISOString()
      };


      const { error } = await supabase
        .from('results3')
        .upsert(payload);


      if (error) {

      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }

      await upsertProgress(10, userId);

      setShowRedButton4(false);
      if (!alertShownRef4.current) {
        alert("File uploaded successfully!");
        alertShownRef4.current = true;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 4)
            .maybeSingle();

          if (error) {

            return;
          }

          if (data) {

            const progress = data.progress || 0;

            setLoadingProgress4(progress);

            if (data.result) {
              setResult4({ final_result: data.result });
              localStorage.setItem("resultFetchedFromSupabase", "true");
            }

            //  Stop polling once progress is 100%
            if (progress >= 100 && progressIntervalId) {


              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }

        } catch (err) {

        }
      };

      progressIntervalId = setInterval(fetchProgressFromSupabase, 1000);
      await fetchProgressFromSupabase();
      try {

        const formData = new FormData();
        formData.append("file", selectedFile4);
        const formattedScheduledTime = new Date(debouncedScheduledTime4)
          .toISOString()
          .replace("T", " ")
          .split(".")[0];

        formData.append("scheduled_time", debouncedScheduledTime4);
        formData.append("job_id", currentJobIdT4);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName4);
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setIsEnabled4(true);
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }


        setResult4(response.data);
        
           
        if(result4.final_result==="non-random number" || result4.final_result==="random number"){
        await upsertProgress(100, userId, response.data.final_result);
       }
         handleUploadComplete4();

      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        setLoadingProgress4(0);
        await upsertProgress(0, userId);
        alert(`Error: ${error}`);

      }
    };

    startProcess();


    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [selectedFile4, debouncedScheduledTime4]);


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
       if (result5=="non-random number" || result5=="random number"){
     
        return;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 5)
            .maybeSingle();

          if (error) {

            // ❌ stop polling on error
            if (progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            if (data.line === 5) {
              setLoadingProgress5(progress);

              if (data.result) {
                setResult5({ final_result: data.result });
                localStorage.setItem("resultFetchedFromSupabase", "true");
              }

              // ✅ Stop polling if already complete
              if (progress >= 100 && progressIntervalId) {
                clearInterval(progressIntervalId);
                progressIntervalId = null;
              }
            }
          }
        } catch (err) {

          // ❌ stop polling on unexpected error
          if (progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      };

      // Start polling again
      progressIntervalId = setInterval(fetchProgressFromSupabase, 2000);

      // Do one immediate fetch
      await fetchProgressFromSupabase();
    };

    // On mount → resume progress check
    resumeProgressCheck();

    // On unmount → clear polling
    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, []);



  useEffect(() => {
    if (!debouncedScheduledTime5) return;


    const lineNo = 5;

    if (result5) {
      // localStorage.setItem('resultFetchedFromSupabased2', 'true');
      // setLoadingProgress5(100);
      return;
    }

    setLoadingProgress5(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && selectedFile5 && !binaryInsertedRef5.current) {
        try {
          const fileReader = new FileReader();

          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile5);
          });

          binaryInsertedRef5.current = true; // ✅ Prevent future inserts

        } catch (err) {

          return;
        }
      }
      ;

      const payload = {
        user_id: userId,
        line: 5,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime5,
        result: result,
        file_name: fileName5,
        upload_time: uploadTime5,
        progress: progress,
        updated_at: new Date().toISOString()
      };


      const { error } = await supabase
        .from('results3')
        .upsert(payload);


      if (error) {

      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }

      await upsertProgress(10, userId);

      setShowRedButton5(false);
      if (!alertShownRef5.current) {
        alert("File uploaded successfully!");
        alertShownRef5.current = true;
      }
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results3")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 5)
            .maybeSingle();

          if (error) {

            return;
          }

          if (data) {

            const progress = data.progress || 0;

            setLoadingProgress5(progress);

            //  Stop polling once progress is 100%
            if (progress >= 100 && progressIntervalId) {


              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {

        }
      };

      progressIntervalId = setInterval(fetchProgressFromSupabase, 1000);
      await fetchProgressFromSupabase();
      try {

        const formData = new FormData();
        formData.append("file", selectedFile5);
        const formattedScheduledTime = new Date(debouncedScheduledTime5)
          .toISOString()
          .replace("T", " ")
          .split(".")[0];

        formData.append("scheduled_time", debouncedScheduledTime5);
        formData.append("job_id", currentJobIdT5);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName5);
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setIsEnabled5(true);
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }


        setResult5(response.data);
       
          if(result5.final_result==="non-random number" || result5.final_result==="random number"){
        await upsertProgress(100, userId, response.data.final_result);
       }
         handleUploadComplete5();


      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        setLoadingProgress5(0);
        await upsertProgress(0, userId);
        alert(`Error: ${error}`);

      }
    };

    startProcess();


    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [selectedFile5, debouncedScheduledTime5]);


  const [binFile, setBinFile] = useState(null);   // will hold the generated .bin file
  const [binFile2, setBinFile2] = useState(null);
  const [binFile3, setBinFile3] = useState(null);
  const [binFile4, setBinFile4] = useState(null);
  const [binFile5, setBinFile5] = useState(null);


  const handleButtonClick = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {



      let progressInterval;
      setLoadingProgressRep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_ReportDieharder/${currentJobIdT}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 30) * 100);
          setLoadingProgressRep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {

        }
      }, 500);

      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else if (binFile) {
        formData.append("file", binFile);
      }
      formData.append("job_id", currentJobIdT);
      formData.append("line_number", 1);

      fetch(`${REACT_APP_BASE_URL}/pdf-report-dieharder/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgressRep(100);
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgressRep(0);
        });
    }
    else if (type === "graph") {


      let progressInterval;
      setLoadingProgressGr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 20) * 100);
          setLoadingProgressGr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {

        }
      }, 1000);

      // Prepare FormData
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else if (binFile) {
        formData.append("file", binFile);
      }
      formData.append("job_id", currentJobIdT);
      formData.append("line_number", 1);

      fetch(`${REACT_APP_BASE_URL}/graph-generaion-dieharder/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Graph generation failed.");
          }
          return response.blob();
        })
        .then(async (blob) => {
          setLoadingProgressGr(100);
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT}.png`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {

          clearInterval(progressInterval);
          setLoadingProgressGr(0);
          alert(`Error generating graph: ${error.message}`);
        });
    }
  };


  const handleButtonClick2 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {

      let progressInterval;
      setLoadingProgress2Rep(0);


      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_ReportDieharder/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 30) * 100);

          setLoadingProgress2Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {

        }
      }, 1000);

      const formData = new FormData();
      if (selectedFile2) {
        formData.append("file", selectedFile2);
      } else if (binFile) {
        formData.append("file", binFile2);
      }
      formData.append("job_id", currentJobIdT2);

      fetch(`${REACT_APP_BASE_URL}/pdf-report-dieharder/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgress2Rep(100);
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT2}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });


        })
        .catch((error) => {

          clearInterval(progressInterval);
          setLoadingProgress2Rep(0);
        });
    } else if (type === "graph") {

      let progressInterval;
      setLoadingProgress2Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 20) * 100);
          setLoadingProgress2Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {

        }
      }, 1000);

      const formData = new FormData();
      if (selectedFile2) {
        formData.append("file", selectedFile2);
      } else if (binFile2) {
        formData.append("file", binFile2);
      }
      formData.append("job_id", currentJobIdT2);


      fetch(`${REACT_APP_BASE_URL}/graph-generaion-dieharder/`, {
        method: "POST",
        body: formData,
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

          clearInterval(progressInterval);
          setLoadingProgress2Gr(0);
        });

    }
  };

  const handleButtonClick3 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {

      let progressInterval;
      setLoadingProgress3Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_ReportDieharder/${currentJobIdT3}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 30) * 100);

          setLoadingProgress3Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      const formData = new FormData();
      if (selectedFile3) {
        formData.append("file", selectedFile3);
      } else if (binFile3) {
        formData.append("file", binFile3);
      }
      formData.append("job_id", currentJobIdT3);


      fetch(`${REACT_APP_BASE_URL}/pdf-report-dieharder/`, {
        method: "POST",
        body: formData,
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT3}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 20) * 100);
          setLoadingProgress3Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {

        }
      }, 1000);
      const formData = new FormData();
      if (selectedFile3) {
        formData.append("file", selectedFile3);
      } else if (binFile3) {
        formData.append("file", binFile3);
      }
      formData.append("job_id", currentJobIdT3);


      fetch(`${REACT_APP_BASE_URL}/graph-generaion-dieharder/`, {
        method: "POST",
        body: formData,
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

          clearInterval(progressInterval);
          setLoadingProgress3Gr(0);
        });

    }
  };

  const handleButtonClick4 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {
      let progressInterval;
      setLoadingProgress4Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_ReportDieharder/${currentJobIdT4}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 30) * 100);

          setLoadingProgress4Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      const formData = new FormData();
      if (selectedFile4) {
        formData.append("file", selectedFile4);
      } else if (binFile4) {
        formData.append("file", binFile4);
      }
      formData.append("job_id", currentJobIdT4);


      fetch(`${REACT_APP_BASE_URL}/pdf-report-dieharder/`, {
        method: "POST",
        body: formData,
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT4}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 20) * 100);
          setLoadingProgress4Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {

        }
      }, 1000);

      const formData = new FormData();
      if (selectedFile4) {
        formData.append("file", selectedFile4);
      } else if (binFile) {
        formData.append("file", binFile4);
      }
      formData.append("job_id", currentJobIdT4);

      fetch(`${REACT_APP_BASE_URL}/graph-generaion-dieharder/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress4Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {

          clearInterval(progressInterval);
          setLoadingProgress4Gr(0);
        });

    }
  };

  const handleButtonClick5 = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {

      let progressInterval;
      setLoadingProgress5Rep(0);


      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_ReportDieharder/${currentJobIdT5}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 30) * 100);

          setLoadingProgress5Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      const formData = new FormData();
      if (selectedFile5) {
        formData.append("file", selectedFile5);
      } else if (binFile5) {
        formData.append("file", binFile5);
      }
      formData.append("job_id", currentJobIdT5);


      fetch(`${REACT_APP_BASE_URL}/pdf-report-dieharder/`, {
        method: "POST",
        body: formData,
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT5}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 20) * 100);
          setLoadingProgress5Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {

        }
      }, 1000);

      const formData = new FormData();
      if (selectedFile5) {
        formData.append("file", selectedFile5);
      } else if (binFile5) {
        formData.append("file", binFile5);
      }
      formData.append("job_id", currentJobIdT5);



      fetch(`${REACT_APP_BASE_URL}/graph-generaion-dieharder/`, {
        method: "POST",
        body: formData,
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
          clearInterval(progressInterval);
          setLoadingProgress5Gr(0);
        });

    }
  };

  const downloadDieharderOutput = async (line_number) => {
    try {
      const url = `${REACT_APP_BASE_URL}/get_output_dieharder/${line_number}/`;

      const response = await axios.get(url, {
        responseType: 'text',
        transformResponse: [function (data) {
          return data;
        }]
      });

      let outputText;

      if (typeof response.data === 'string' && response.data.trim().startsWith('{')) {
        try {
          const jsonData = JSON.parse(response.data);
          outputText = jsonData.output;
        } catch (e) {
          outputText = response.data;
        }
      } else {
        outputText = response.data;
      }

      // Clean the output text
      if (outputText) {
        outputText = outputText.replace(/[^\x20-\x7E\n\r\t]/g, '');
        outputText = outputText.replace(/[ \t]+/g, ' ');
        outputText = outputText.replace(/\n\s*\n/g, '\n\n');
      }

      const blob = new Blob([outputText], {
        type: "text/plain;charset=utf-8"
      });

      saveAs(blob, `dieharder_output_line_${line_number}_${Date.now()}.txt`);

    } catch (error) {
      console.error(`Error downloading output for line ${line_number}:`, error);

    }
  };

  // Then use them like this:
  const handleDownloadOutput = () => downloadDieharderOutput(1);
  const handleDownloadOutput2 = () => downloadDieharderOutput(2);
  const handleDownloadOutput3 = () => downloadDieharderOutput(3);
  const handleDownloadOutput4 = () => downloadDieharderOutput(4);
  const handleDownloadOutput5 = () => downloadDieharderOutput(5);

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
          .from('results3')
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
      <Header title="Dieharder Tests" />
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
                      onClick={handleFileUpload}
                      disabled={!isUploadButtonEnabled}   // 🔹 Disable button when state is false
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
                        onClick={() => handleButtonClick("graph")}
                        disabled={loadingProgress < 100}
                        sx={{
                          backgroundColor: colors.blueAccent[400],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: 'translateY(-2px)',
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
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgressGr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgressGr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgressGr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgressGr}
                            size={36}
                            thickness={4}
                            sx={{ color: colors.blueAccent[300] }}
                          />
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={colors.blueAccent[300]}
                            sx={{ position: 'absolute', fontSize: '0.75rem' }}
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
                        Generate Report
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

                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput}
                      disabled={loadingProgress < 100}
                      sx={{

                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: colors.blueAccent[500],
                        "&:hover": {
                          backgroundColor: colors.blueAccent[600],
                        }

                      }}
                    >
                      Download Original Output
                    </Button>

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
                        position: "relative",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload binary file
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
                      accept=".bin,.txt"
                      ref={fileInputRef2}
                      style={{ display: "none" }}
                      onChange={handleFileChange2}
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
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Generate Graph
                        {loadingProgress2Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress2Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress2Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress2Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        Generate Report
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
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput2}
                      disabled={loadingProgress2 < 100}
                      sx={{

                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: colors.blueAccent[500],
                        "&:hover": {
                          backgroundColor: colors.blueAccent[600],
                        }

                      }}
                    >
                      Download Original Output
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
                      onClick={handleFileUpload3}
                       disabled={!isUploadButtonEnabled3}
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
                      Upload binary file
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
                      onChange={handleFileChange3}
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
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Generate Graph
                        {loadingProgress3Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress3Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress3Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress3Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        Generate Report
                        {loadingProgress3Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress3Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress3Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress3Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress3Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput3}
                      disabled={loadingProgress3 < 100}
                      sx={{

                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: colors.blueAccent[500],
                        "&:hover": {
                          backgroundColor: colors.blueAccent[600],
                        }

                      }}
                    >
                      Download Original Output
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
                        position: "relative",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload binary file
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
                      onChange={handleFileChange4}
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
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Generate Graph
                        {loadingProgress4Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress4Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress4Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress4Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        Generate Report
                        {loadingProgress4Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress4Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress4Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress4Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress4Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput4}
                      disabled={loadingProgress4 < 100}
                      sx={{

                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: colors.blueAccent[500],
                        "&:hover": {
                          backgroundColor: colors.blueAccent[600],
                        }

                      }}
                    >
                      Download Original Output
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
                        position: "relative",
                        "&:hover": {
                          backgroundColor: colors.greenAccent[600],
                        },
                      }}
                    >
                      Upload binary file
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
                      onChange={handleFileChange5}
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
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.blueAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Generate Graph
                        {loadingProgress5Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress5Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress5Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress5Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        Generate Report
                        {loadingProgress5Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress5Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress5Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress5Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress5Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput5}
                      disabled={loadingProgress5 < 100}
                      sx={{

                        color: colors.grey[100],
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: colors.blueAccent[500],
                        "&:hover": {
                          backgroundColor: colors.blueAccent[600],
                        }

                      }}
                    >
                      Download Original Output
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

                {/* Time Input */}
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

                {/* Display Combined Scheduled Time */}
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

export default Dieharder_tests;