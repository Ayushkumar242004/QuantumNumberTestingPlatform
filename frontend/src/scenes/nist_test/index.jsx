import { Box, Typography, useTheme, TextField, Button, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Make sure axios is imported
import CircularProgress from '@mui/material/CircularProgress';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { MenuItem, FormControl, InputAdornment, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { supabase } from '../../utils/supabaseClient';
import CloseIcon from "@mui/icons-material/Close";
const MAX_STACK_SIZE_ESTIMATE = 200 * 1024 * 1024;

const Nist_tests = () => {
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [binaryInput, setBinaryInput] = useState("");
  const [binaryInput2, setBinaryInput2] = useState("");
  const [binaryInput3, setBinaryInput3] = useState("");
  const [binaryInput4, setBinaryInput4] = useState("");
  const [binaryInput5, setBinaryInput5] = useState("");
  const [binaryInput6, setBinaryInput6] = useState("");
  const [binaryInput7, setBinaryInput7] = useState("");
  const [binaryInput8, setBinaryInput8] = useState("");
  const [binaryInput9, setBinaryInput9] = useState("");
  const [binaryInput10, setBinaryInput10] = useState("");

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

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);
  const fileInputRef6 = useRef(null);
  const fileInputRef7 = useRef(null);
  const fileInputRef8 = useRef(null);
  const fileInputRef_nine = useRef(null);
  const fileInputRef10 = useRef(null);


  const [result, setResult] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [result4, setResult4] = useState("");
  const [result5, setResult5] = useState("");
  const [result6, setResult6] = useState(null);
  const [result7, setResult7] = useState(null);
  const [result8, setResult8] = useState(null);
  const [result9, setResult9] = useState(null);
  const [result10, setResult10] = useState(null);

  const [uploadTime, setUploadTime] = useState("");
  const [uploadTime2, setUploadTime2] = useState("");
  const [uploadTime3, setUploadTime3] = useState("");
  const [uploadTime4, setUploadTime4] = useState("");
  const [uploadTime5, setUploadTime5] = useState("");
  const [uploadTime6, setUploadTime6] = useState("");
  const [uploadTime7, setUploadTime7] = useState("");
  const [uploadTime8, setUploadTime8] = useState("");
  const [uploadTime9, setUploadTime9] = useState("");
  const [uploadTime10, setUploadTime10] = useState("");

  const [fileName, setFileName] = useState(""); // New state to store filename
  const [fileName2, setFileName2] = useState(""); // New state to store filename
  const [fileName3, setFileName3] = useState(""); // New state to store filename
  const [fileName4, setFileName4] = useState(""); // New state to store filename
  const [fileName5, setFileName5] = useState(""); // New state to store filename
  const [fileName6, setFileName6] = useState(""); // New state to store filename
  const [fileName7, setFileName7] = useState(""); // New state to store filename
  const [fileName8, setFileName8] = useState(""); // New state to store filename
  const [fileName9, setFileName9] = useState(""); // New state to store filename
  const [fileName10, setFileName10] = useState(""); // New state to store filename

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

  // Add these states and refs for date/time
  const [isDateEnabled, setIsDateEnabled] = useState(true);
  const [isTimeEnabled, setIsTimeEnabled] = useState(true);
  const timeDebounceRef = useRef(null);



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
      const ongoingUpload = sessionStorage.getItem('ongoingFileUpload');
      const storedProgress = sessionStorage.getItem('uploadProgress');

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
  };
  const handleUseCurrentTime2 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime2(formattedTime);

  };


  const handleTimeChange3 = (event) => {
    const inputTime = event.target.value;
    setTime3(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime3 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime3(formattedTime);

  };


  const handleTimeChange4 = (event) => {
    const inputTime = event.target.value;
    setTime4(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime4 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime4(formattedTime);

  };

  const handleTimeChange5 = (event) => {
    const inputTime = event.target.value;
    setTime5(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime5 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime5(formattedTime);

  };



  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time && !timeRegex.test(time) && isTimeEnabled) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time, isTimeEnabled]);


  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time2 && !timeRegex.test(time2)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time2]);


  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time3 && !timeRegex.test(time3)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time3]);


  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time4 && !timeRegex.test(time4)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time4]);


  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time5 && !timeRegex.test(time5)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time5]);



  useEffect(() => {
    if (date && time) {
      const formattedDateTime = `${date} ${time}`; // already in 'YYYY-MM-DD HH:mm:ss'
      setScheduledTime(formattedDateTime);

    }
  }, [date, time]);


  useEffect(() => {
    if (date2 && time2) {
      setScheduledTime2(`${date2} ${time2}`);
    }
  }, [date2, time2]);


  useEffect(() => {
    if (date3 && time3) {
      setScheduledTime3(`${date3} ${time3}`);
    }
  }, [date3, time3]);


  useEffect(() => {
    if (date4 && time4) {
      setScheduledTime4(`${date4} ${time4}`);
    }
  }, [date4, time4]);

  useEffect(() => {
    if (date5 && time5) {
      setScheduledTime5(`${date5} ${time5}`);
    }
  }, [date5, time5]);


  const finalResult = result ? result.final_result : " ";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime(scheduledTime);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime]);


  const finalResult2 = result2 ? result2.final_result : " ";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime2(scheduledTime2);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime2]);


  const finalResult3 = result3 ? result3.final_result : " ";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime3(scheduledTime3);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime3]);


  const finalResult4 = result4 ? result4.final_result : " ";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime4(scheduledTime4);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime4]);


  const finalResult5 = result5 ? result5.final_result : " ";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime5(scheduledTime5);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime5]);



  const [showRedButton, setShowRedButton] = useState(false);
  const [showRedButton2, setShowRedButton2] = useState(false);
  const [showRedButton3, setShowRedButton3] = useState(false);
  const [showRedButton4, setShowRedButton4] = useState(false);
  const [showRedButton5, setShowRedButton5] = useState(false);

  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [isEnabled3, setIsEnabled3] = useState(true);
  const [isEnabled4, setIsEnabled4] = useState(true);
  const [isEnabled5, setIsEnabled5] = useState(true);
  // Handle file upload
  const handleFileUpload = () => {
    if (isUploadButtonEnabled) {
      fileInputRef.current.click();
    }
  };
  const handleFileUpload2 = () => {
    setIsEnabled2(true);
    // setShowRedButton2(true)
    fileInputRef2.current.click();
  };
  const handleFileUpload3 = () => {
    setIsEnabled3(true);
    // setShowRedButton3(true)
    fileInputRef3.current.click();
  };
  const handleFileUpload4 = () => {
    setIsEnabled4(true);
    // setShowRedButton4(true)
    fileInputRef4.current.click();
  };
  const handleFileUpload5 = () => {
    setIsEnabled5(true);
    // setShowRedButton5(true)
    fileInputRef5.current.click();
  };
  const isProcessingFileRef = useRef(false);
  const [isUploadButtonEnabled, setIsUploadButtonEnabled] = useState(true);

  const handleFileChange = async (event) => {
    isProcessingFileRef.current = true; // Set flag when processing starts
    setIsUploadButtonEnabled(false); // Immediately disable button
  
    setLoadingProgressGr(0);
    setLoadingProgressRep(0);
    sessionStorage.setItem('ongoingFileUpload', 'true');
    const selectedFile = event.target.files[0];
    if (!selectedFile) {

      return;
    }
    setSelectedFile(selectedFile);


    const userId = await fetchUserId();
    if (!userId) return;

    // Reset all state variables for line 1
    setBinaryInput("");
    setScheduledTime("");
    setDebouncedScheduledTime("");
    setResult("");
    setFileName("");
    setUploadTime("");
    setLoadingProgress(0);
    setTime("");

    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);

      let binaryString = "";


      // Update binaryInput state with the processed binary string
      setBinaryInput(binaryString);

      // Set the upload time in YYYY-MM-DD HH:MM:SS format
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime(currentTime);

      // Remove the existing row for the line from Supabase
      try {
        // localStorage.setItem('resultFetchedFromSupabase', 'false');
        const { error: deleteError } = await supabase
          .from('results')
          .delete()
          .match({ line: 1, user_id: userId });

        setLoadingProgress(0);
        if (deleteError) {

          return;
        }
      } catch (err) {
        isProcessingFileRef.current = false;
        setIsUploadButtonEnabled(true);
      }
      finally {
        isProcessingFileRef.current = false; // Reset flag when done
      }
      alertShownRef.current = false;
      // Allow reupload of same file
      event.target.value = "";
    };
    reader.onerror = () => {
      // Enable button on file reading error
      isProcessingFileRef.current = false;
      setIsUploadButtonEnabled(true);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const isProcessingFileRef2 = useRef(false);

  const handleFileChange2 = async (event) => {
    isProcessingFileRef2.current = true; // Set flag when processing starts

    setLoadingProgress2Gr(0);
    setLoadingProgress2Rep(0);
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton2(false);
      return;
    }
    setSelectedFile2(selectedFile);
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
      return;
    }

    const userId = await fetchUserId();
    if (!userId) {

      return;
    }

    setBinaryInput2(""); // Clear binary input
    setScheduledTime2(""); // Clear scheduled time
    setDebouncedScheduledTime2(""); // Clear debounced scheduled time
    setResult2(""); // Clear result
    setFileName2(""); // Clear filename
    setUploadTime2(""); // Clear upload time
    setLoadingProgress2(0); // Reset progress bar
    setTime2("");


    setFileName2(selectedFile.name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      let binaryString = "";


      // Update binaryInput state with the processed binary string
      setBinaryInput2(binaryString);

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime2(currentTime);
      try {
        // ✅ STEP 1: First delete the existing row to ensure clean state
        const { error: deleteError } = await supabase
          .from('results')
          .delete()
          .match({ line: 2, user_id: userId });

        if (deleteError) {
          console.error('Error deleting row:', deleteError);

        }


        setLoadingProgress2(0);

      } catch (err) {

      } finally {
        isProcessingFileRef2.current = false; // Reset flag when done
      }
      alertShownRef2.current = false;
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    setIsEnabled2(false);
    reader.readAsArrayBuffer(selectedFile);
  };
  const isProcessingFileRef3 = useRef(false);
  const handleFileChange3 = async (event) => {
    isProcessingFileRef3.current = true; // Set flag when processing starts

    setLoadingProgress3Gr(0);
    setLoadingProgress3Rep(0);
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton3(false);
      return;
    }
    setSelectedFile3(selectedFile);
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
      return;
    }

    const userId = await fetchUserId();
    if (!userId) {

      return;
    }

    // Reset all state variables for line 3
    setBinaryInput3(""); // Clear binary input
    setScheduledTime3(""); // Clear scheduled time
    setDebouncedScheduledTime3(""); // Clear debounced scheduled time
    setResult3(""); // Clear result
    setFileName3(""); // Clear filename
    setUploadTime3(""); // Clear upload time
    setLoadingProgress3(0); // Reset progress bar
    setTime3("");

    setFileName3(selectedFile.name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      let binaryString = "";



      // Update binaryInput state with the processed binary string
      setBinaryInput3(binaryString);

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime3(currentTime);

      try {
        // localStorage.setItem('resultFetchedFromSupabase22b3', 'false');
        const { error: deleteError } = await supabase
          .from('results')
          .delete()
          .match({ line: 3, user_id: userId }); // Replace '3' with the line number for this handler

        setLoadingProgress3(0);
        if (deleteError) {

          return;
        }
      } catch (err) {

      } finally {
        isProcessingFileRef3.current = false; // Reset flag when done
      }

      alertShownRef3.current = false;
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    setIsEnabled3(false);
    reader.readAsArrayBuffer(selectedFile);
  };

  const isProcessingFileRef4 = useRef(false);
  const handleFileChange4 = async (event) => {
    isProcessingFileRef4.current = true;
    setLoadingProgress4Gr(0);
    setLoadingProgress4Rep(0);
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton4(false);
      return;
    }
    setSelectedFile4(selectedFile);
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
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

    setFileName4(selectedFile.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      let binaryString = "";


      // Update binaryInput state with the processed binary string
      setBinaryInput4(binaryString);

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime4(currentTime);

      try {
        // localStorage.setItem('resultFetchedFromSupabase22b4', 'false');
        const { error: deleteError } = await supabase
          .from('results')
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
      alertShownRef4.current = false;
      event.target.value = "";
    };
    setIsEnabled4(false);
    reader.readAsArrayBuffer(selectedFile);
  };

  const isProcessingFileRef5 = useRef(false);
  const handleFileChange5 = async (event) => {
    isProcessingFileRef5.current = true;
    setLoadingProgress5Gr(0);
    setLoadingProgress5Rep(0);
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      // User closed the file picker without choosing a file
      setShowRedButton5(false);
      return;
    }
    setSelectedFile5(selectedFile);

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
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

    setFileName5(selectedFile.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      let binaryString = "";



      // Update binaryInput state with the processed binary string
      setBinaryInput5(binaryString);

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime5(currentTime);

      try {
        // localStorage.setItem('resultFetchedFromSupabase22b5', 'false');
        const { error: deleteError } = await supabase
          .from('results')
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
      alertShownRef5.current = false;
      event.target.value = "";
    };
    setIsEnabled5(false);
    reader.readAsArrayBuffer(selectedFile);
  };

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingProgressRep, setLoadingProgressRep] = useState(0);
  const [loadingProgressGr, setLoadingProgressGr] = useState(0);


  useEffect(() => {
    let subscription;

    const setupSubscription = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      // ✅ FIRST: Fetch initial data for all lines
      const fetchInitialData = async () => {
        try {
          const { data, error } = await supabase
            .from('results')
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
                      .from('results')
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
                  console.log("Processing line 2 data", row.progress);
                  //  CRITICAL FIX: Reset progress to 0 if no active test
                  if (row.progress === 100 && (!row.result || row.result === "" || row.result === " ")) {
                    // Progress is 100% but no result means page was refreshed during idle state
                    await supabase
                      .from('results')
                      .update({
                        progress: 10,
                        updated_at: new Date().toISOString()
                      })
                      .eq('user_id', userId)
                      .eq('line', 2);

                    setLoadingProgress2(10);

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
                      .from('results')
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
                      .from('results')
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
                      .from('results')
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
          // console.error('Error in initial data fetch:', err);
        }
      };

      // Fetch initial data immediately
      await fetchInitialData();

      // ✅ SECOND: Set up real-time subscription for future changes
      subscription = supabase
        .channel('results-changes')
        .on(
          'postgres_changes',
          {
            event: '*', // INSERT, UPDATE, DELETE
            schema: 'public',
            table: 'results',
            filter: `user_id=eq.${userId}`
          },
          (payload) => {
            // This runs automatically whenever results table changes for this user
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
                if (row.line === 2) {

                  setBinaryInput2(row.binary_data);
                  setScheduledTime2(row.scheduled_time);
                  setResult2({ final_result: row.result });
                  setFileName2(row.file_name);
                  setUploadTime2(row.upload_time);
                  setLoadingProgress2(row.progress);
                }
                break;
              case 3:
                if (row.line === 3) {
                  setBinaryInput3(row.binary_data);
                  setScheduledTime3(row.scheduled_time);
                  setResult3({ final_result: row.result });
                  setFileName3(row.file_name);
                  setUploadTime3(row.upload_time);
                  setLoadingProgress3(row.progress);
                }
                break;
              case 4:
                if (row.line === 4) {
                  setBinaryInput4(row.binary_data);
                  setScheduledTime4(row.scheduled_time);
                  setResult4({ final_result: row.result });
                  setFileName4(row.file_name);
                  setUploadTime4(row.upload_time);
                  setLoadingProgress4(row.progress);
                }
                break;
              case 5:
                if (row.line === 5) {
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
          // console.log('Subscription status:', status);
        });
    };

    setupSubscription();

    // Cleanup subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe();
        // console.log('Subscription cleaned up');
      }
    };
  }, []);

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


    // Effect to handle date/time enabling/disabling based on upload progress
  useEffect(() => {
    if (loadingProgress === 100) {
      // Upload completed - enable both inputs
      setIsDateEnabled(true);
      setIsTimeEnabled(true);
      sessionStorage.removeItem('ongoingFileUpload');
      sessionStorage.removeItem('uploadProgress');
    } else if (loadingProgress > 0 && loadingProgress < 100) {
      // Upload in progress - disable both inputs
      setIsDateEnabled(false);
      setIsTimeEnabled(false);
      sessionStorage.setItem('ongoingFileUpload', 'true');
      sessionStorage.setItem('uploadProgress', loadingProgress.toString());
    }
  }, [loadingProgress]);

  // Effect to check persistent state when component mounts (for date/time)
  useEffect(() => {
    const ongoingUpload = sessionStorage.getItem('ongoingFileUpload');
    const storedProgress = sessionStorage.getItem('uploadProgress');

    if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
      // There's an ongoing upload - disable inputs
      setIsDateEnabled(false);
      setIsTimeEnabled(false);
    } else {
      // No ongoing upload - enable inputs
      setIsDateEnabled(true);
      setIsTimeEnabled(true);
    }
  }, []);



  const jobIdRef = useRef(null);
  const jobIdRef2 = useRef(null);
  const jobIdRef3 = useRef(null);
  const jobIdRef4 = useRef(null);
  const jobIdRef5 = useRef(null);




  const alertShownRef = useRef(false);
  const alertShownRef2 = useRef(false);
  const alertShownRef3 = useRef(false);
  const alertShownRef4 = useRef(false);
  const alertShownRef5 = useRef(false);

  useEffect(() => {
    // Check if there's an ongoing upload in sessionStorage
    const ongoingUpload = sessionStorage.getItem('ongoingFileUpload');
    const storedProgress = sessionStorage.getItem('uploadProgress');

    if (ongoingUpload === 'true' && storedProgress && parseInt(storedProgress) < 100) {
      // There's an ongoing upload that hasn't completed
      isProcessingFileRef.current = true;
      setIsUploadButtonEnabled(false);
    } else {
      // No ongoing upload or upload was completed
      isProcessingFileRef.current = false;
      setIsUploadButtonEnabled(true);
      // Clean up sessionStorage
      sessionStorage.removeItem('ongoingFileUpload');
      sessionStorage.removeItem('uploadProgress');
    }
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      // Upload completed
      isProcessingFileRef.current = false;
      setIsUploadButtonEnabled(true);
      sessionStorage.removeItem('ongoingFileUpload');
      sessionStorage.removeItem('uploadProgress');
    } else if (loadingProgress > 0 && loadingProgress < 100) {
      // Upload in progress
      isProcessingFileRef.current = true;
      setIsUploadButtonEnabled(false);
      sessionStorage.setItem('ongoingFileUpload', 'true');
      sessionStorage.setItem('uploadProgress', loadingProgress.toString());
    }
  }, [loadingProgress]);


  const handleUploadComplete = () => {
    isProcessingFileRef.current = false;
    setIsUploadButtonEnabled(true);
  };


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
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

            setLoadingProgress(progress);

            if (data.result) {
              setResult({ final_result: data.result });
              // localStorage.setItem("resultFetchedFromSupabase", "true");
            }

            // ✅ Stop polling if already complete
            if (progress >= 100 && progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
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
  }, []); // <-- runs only on mount/unmount

  const [currentJobIdT, setCurrentJobIdT] = useState(() => {
    const saved = localStorage.getItem("currentJobId");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef.current = currentJobIdT;
  }, [currentJobIdT]);

  const [currentJobIdT2, setCurrentJobIdT2] = useState(() => {
    const saved = localStorage.getItem("currentJobId2");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId2", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef2.current = currentJobIdT2;
  }, [currentJobIdT2]);

  const [currentJobIdT3, setCurrentJobIdT3] = useState(() => {
    const saved = localStorage.getItem("currentJobId3");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId3", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef3.current = currentJobIdT3;
  }, [currentJobIdT3]);

  const [currentJobIdT4, setCurrentJobIdT4] = useState(() => {
    const saved = localStorage.getItem("currentJobId4");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId4", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef4.current = currentJobIdT4;
  }, [currentJobIdT4]);

  const [currentJobIdT5, setCurrentJobIdT5] = useState(() => {
    const saved = localStorage.getItem("currentJobId5");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId5", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef5.current = currentJobIdT5;
  }, [currentJobIdT5]);


  const binaryInsertedRef = useRef(false); // 🔁 Track binary insert
  const binaryInsertedRef2 = useRef(false);
  const binaryInsertedRef3 = useRef(false);
  const binaryInsertedRef4 = useRef(false);
  const binaryInsertedRef5 = useRef(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);

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

          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');

          binaryInsertedRef.current = true; // ✅ Prevent future inserts
        } catch (err) {
          return;
        }
      }

      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime,
        result: result,
        file_name: fileName,
        upload_time: uploadTime,
        progress: progress,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('results').upsert(payload);

      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      await upsertProgress(10, userId);
      setShowRedButton(false);

      if (!alertShownRef.current) {
        alert("File uploaded successfully");
        alertShownRef.current = true;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
            .select("*")
            .eq("user_id", userId)
            .eq("line", lineNo)
            .maybeSingle();

          if (error) {

            return;
          }

          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress(progress);

            // ✅ Stop polling once progress is 100%
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
        formData.append("scheduled_time_str", formattedScheduledTime);
        formData.append("job_id", currentJobIdT);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/run_nist/`, // ✅ <-- your NIST backend URL
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setIsEnabled(true);

        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }


        setResult(response.data);
        // localStorage.setItem("resultFetchedFromSupabaseNIST", "true");
        await upsertProgress(100, userId, response.data.final_result);
        handleUploadComplete();
      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setLoadingProgress(0);
        await upsertProgress(0, userId);
        alert(`Error while running NIST tests: ${error}`);
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


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
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

            // ✅ Only update if progress is actually for line 2 and not from other lines
            if (data.line === 2) {
              console.lg("resumed line 2 progress:", progress);
              setLoadingProgress2(progress);

              if (data.result) {
                setResult2({ final_result: data.result });

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
  }, []); // <-- runs only on mount/unmount

  useEffect(() => {
    if (!debouncedScheduledTime2) return;

    const lineNo = 2;

    if (result2) {
      return;
    }

    setLoadingProgress2(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && selectedFile2 && !binaryInsertedRef2.current) {
        try {
          const fileReader = new FileReader();
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile2);
          });

          // If you want to save binary string later, uncomment this
          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');

          binaryInsertedRef2.current = true; // ✅ Prevent multiple inserts
        } catch (err) {
          return;
        }
      }

      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime2,
        result: result,
        file_name: fileName2,
        upload_time: uploadTime2,
        progress: progress,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("results").upsert(payload);
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      await upsertProgress(10, userId);
      setShowRedButton2(false);

      if (!alertShownRef2.current) {
        alert("File uploaded successfully!");
        alertShownRef2.current = true;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
            .select("*")
            .eq("user_id", userId)
            .eq("line", lineNo)
            .maybeSingle();

          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress2(progress);
            console.log("Polled line 2 progress:", progress);
            // ✅ Stop polling once progress reaches 100
            if (progress >= 100 && progressIntervalId) {

              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Polling error:", err);
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
          `${REACT_APP_BASE_URL}/run_nist/`, // ✅ <-- dieharder backend endpoint
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setIsEnabled2(true);

        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }


        setResult2(response.data);
        // localStorage.setItem("resultFetchedFromSupabase2", "true");
        await upsertProgress(100, userId, response.data.final_result);

      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setLoadingProgress2(0);
        await upsertProgress(0, userId);
        alert(`Error while running Dieharder tests: ${error}`);
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

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
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

            setLoadingProgress3(progress);

            if (data.result) {
              setResult3({ final_result: data.result });
              localStorage.setItem("resultFetchedFromSupabase2", "true");
            }

            // ✅ Stop polling if already complete
            if (progress >= 100 && progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
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
  }, []); // <-- runs only on mount/unmount

  useEffect(() => {
    if (!debouncedScheduledTime3) return;

    const lineNo = 3;

    if (result3) {
      // localStorage.setItem('resultFetchedFromSupabase3', 'true');
      // setLoadingProgress3(100);
      return;
    }

    setLoadingProgress3(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && binaryInput3 && !binaryInsertedRef3.current) {
        try {
          const fileReader = new FileReader();
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(binaryInput3);
          });

          // Optional binary conversion if needed
          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');

          binaryInsertedRef3.current = true; // ✅ Prevent multiple inserts
        } catch (err) {
          return;
        }
      }

      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime3,
        result: result,
        file_name: fileName3,
        upload_time: uploadTime3,
        progress: progress,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("results").upsert(payload);
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      // Initial DB entry
      await upsertProgress(10, userId);

      setShowRedButton3(false);
      if (!alertShownRef3.current) {
        alert("File uploaded successfully!");
        alertShownRef3.current = true;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
            .select("*")
            .eq("user_id", userId)
            .eq("line", lineNo)
            .maybeSingle();

          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress3(progress);

            if (progress >= 100 && progressIntervalId) {

              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Polling error:", err);
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
          `${REACT_APP_BASE_URL}/run_nist/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setIsEnabled3(true);

        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        // setLoadingProgress3(100);
        setResult3(response.data);
        // localStorage.setItem("resultFetchedFromSupabase3", "true");

        await upsertProgress(100, userId, response.data.final_result);
      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        setLoadingProgress3(0);
        await upsertProgress(0, userId);
        alert(`Error while running test for line 3: ${error}`);
      }
    };

    startProcess();

    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [binaryInput3, debouncedScheduledTime3]);


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
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

            setLoadingProgress4(progress);

            if (data.result) {
              setResult4({ final_result: data.result });
              localStorage.setItem("resultFetchedFromSupabase2", "true");
            }

            // ✅ Stop polling if already complete
            if (progress >= 100 && progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
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
  }, []); // <-- runs only on mount/unmount

  useEffect(() => {
    if (!debouncedScheduledTime4) return;

    const lineNo = 4;

    if (result4) {
      // localStorage.setItem('resultFetchedFromSupabase4', 'true');
      // setLoadingProgress4(100);
      return;
    }

    setLoadingProgress4(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && binaryInput4 && !binaryInsertedRef4.current) {
        try {
          const fileReader = new FileReader();
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(binaryInput4);
          });

          // Optional conversion if needed
          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');

          binaryInsertedRef4.current = true; // ✅ Prevent duplicate inserts
        } catch (err) {
          return;
        }
      }

      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime4,
        result: result,
        file_name: fileName4,
        upload_time: uploadTime4,
        progress: progress,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("results").upsert(payload);
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      await upsertProgress(10, userId);

      setShowRedButton4(false);
      if (!alertShownRef4.current) {
        alert("File uploaded successfully!");
        alertShownRef4.current = true;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
            .select("*")
            .eq("user_id", userId)
            .eq("line", lineNo)
            .maybeSingle();

          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress4(progress);

            if (progress >= 100 && progressIntervalId) {

              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Polling error:", err);
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
          `${REACT_APP_BASE_URL}/run_nist/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setIsEnabled4(true);

        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        // setLoadingProgress4(100);
        setResult4(response.data);
        // localStorage.setItem("resultFetchedFromSupabase4", "true");

        await upsertProgress(100, userId, response.data.final_result);
      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        setLoadingProgress4(0);
        await upsertProgress(0, userId);
        alert(`Error while running test for line 4: ${error}`);
      }
    };

    startProcess();

    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [binaryInput4, debouncedScheduledTime4]);


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
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

            setLoadingProgress5(progress);

            if (data.result) {
              setResult5({ final_result: data.result });
              localStorage.setItem("resultFetchedFromSupabase5", "true");
            }

            // ✅ Stop polling if already complete
            if (progress >= 100 && progressIntervalId) {
              clearInterval(progressIntervalId);
              progressIntervalId = null;
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
  }, []); // <-- runs only on mount/unmount

  useEffect(() => {
    if (!debouncedScheduledTime5) return;

    const lineNo = 5;

    if (result5) {
      // localStorage.setItem('resultFetchedFromSupabase5', 'true');
      // setLoadingProgress5(100);
      return;
    }

    setLoadingProgress5(0);
    let progressIntervalId;

    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && binaryInput5 && !binaryInsertedRef5.current) {
        try {
          const fileReader = new FileReader();
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(binaryInput5);
          });

          // Optional conversion if needed:
          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');

          binaryInsertedRef5.current = true; // ✅ Prevent duplicate inserts
        } catch (err) {
          return;
        }
      }

      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: debouncedScheduledTime5,
        result: result,
        file_name: fileName5,
        upload_time: uploadTime5,
        progress: progress,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("results").upsert(payload);
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      await upsertProgress(10, userId);

      setShowRedButton5(false);
      if (!alertShownRef5.current) {
        alert("File uploaded successfully!");
        alertShownRef5.current = true;
      }

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results")
            .select("*")
            .eq("user_id", userId)
            .eq("line", lineNo)
            .maybeSingle();

          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }

          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress5(progress);

            if (progress >= 100 && progressIntervalId) {

              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Polling error:", err);
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
          `${REACT_APP_BASE_URL}/run_nist/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setIsEnabled5(true);

        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        // setLoadingProgress5(100);
        setResult5(response.data);
        // localStorage.setItem("resultFetchedFromSupabase5", "true");

        await upsertProgress(100, userId, response.data.final_result);
      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setLoadingProgress5(0);
        await upsertProgress(0, userId);
        alert(`Error while running test for line 5: ${error}`);
      }
    };

    startProcess();

    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };
  }, [binaryInput5, debouncedScheduledTime5]);


  const handleButtonClick = async (type) => {
    const userId = await fetchUserId();
    if (type === "report") {
      let progressInterval;
      setLoadingProgressRep(5);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist/${currentJobIdT}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 25) * 100);

          setLoadingProgressRep((prev) => (percent > prev ? percent : prev));
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput, job_id: currentJobIdT, file_name: fileName, line_number: 1 }),
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
    } else if (type === "graph") {

      let progressInterval;
      setLoadingProgressGr(2);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph/${currentJobIdT}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 16) * 100);

          setLoadingProgressGr((prev) => (percent > prev ? percent : prev));
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/graph-generation/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput, job_id: currentJobIdT, line_number: 1 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          setLoadingProgressGr(100);
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 25) * 100);

          setLoadingProgress2Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput2, job_id: currentJobIdT2, file_name: fileName2, line_number: 2 }),
      })
        .then((response) => response.blob())
        .then(async (blob) => {

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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 16) * 100);
          setLoadingProgress2Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation/`, {
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist/${currentJobIdT3}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 25) * 100);

          setLoadingProgress3Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report/`, {
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph/${currentJobIdT3}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 16) * 100);
          setLoadingProgress3Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation/`, {
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist/${currentJobIdT4}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 25) * 100);

          setLoadingProgress4Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report/`, {
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph/${currentJobIdT4}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 16) * 100);
          setLoadingProgress4Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation/`, {
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_nist/${currentJobIdT5}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 25) * 100);

          setLoadingProgress5Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch(`${REACT_APP_BASE_URL}/pdf-report/`, {
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
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graph/${currentJobIdT5}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 16) * 100);
          setLoadingProgress5Gr(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);


      fetch(`${REACT_APP_BASE_URL}/graph-generation/`, {
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

  const downloadStatsFile = async () => {
    try {

      const response = await axios.get(`${REACT_APP_BASE_URL}/download_nist22b/`, {
        responseType: "text", // ✅ important
      });

      // Create blob
      const blob = new Blob([response.data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = "nist22b_stats_output.txt"; // ✅ matches backend
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading stats file:", error);
      alert("Failed to download stats file.");
    }
  };


  return (
    <Box m="20px">
      {/* Header Section */}
      <Header title="NIST Statistical Tests" />
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
              <th style={{ width: "10%" }}>Serial No</th>
              <th style={{ width: "30%" }}>Upload File</th>
              <th style={{ width: "10%" }}>Result</th>
              <th style={{ width: "10%" }}>Progress Bar</th>
              <th style={{ width: "10%" }}>Uploading Time</th>
              <th style={{ width: "10%" }}>Filename</th>
              <th style={{ width: "20%" }}>Scheduling Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt="10px" gap="10px">
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
                          }
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

                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={downloadStatsFile}
                        disabled={loadingProgress < 100}
                        sx={{
                          backgroundColor: colors.redAccent[800],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.redAccent[600],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Download Original Output
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </td>
              {/* <td>{result}</td> */}
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
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
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
                            disabled={!isTimeEnabled}
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
                  Scheduled Time: {scheduledTime || "Not set"}
                </Typography>
              </td>


            </tr>
            <tr>
              <td>2</td>
              <td>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt="10px" gap="10px">
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      onClick={handleFileUpload2}
                      disabled={!isEnabled2}
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

                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={downloadStatsFile}
                        disabled={loadingProgress2 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[800],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.redAccent[600],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Download Original Output
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </td>
              {/* <td>{result}</td> */}
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
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
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
                            onClick={handleUseCurrentTime2}
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

            <tr>
              <td>3</td>
              <td>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt="10px" gap="10px">
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      onClick={handleFileUpload3}
                      disabled={!isEnabled3}
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

                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={downloadStatsFile}
                        disabled={loadingProgress3 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[800],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.redAccent[600],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Download Original Output
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </td>
              {/* <td>{result}</td> */}
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
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
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
                            onClick={handleUseCurrentTime3}
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
                  Scheduled Time: {scheduledTime3 || "Not set"}
                </Typography>
              </td>


            </tr>

            <tr>
              <td>4</td>
              <td>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt="10px" gap="10px">
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      onClick={handleFileUpload4}
                      disabled={!isEnabled4}
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
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={downloadStatsFile}
                        disabled={loadingProgress4 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[800],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.redAccent[600],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Download Original Output
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </td>
              {/* <td>{result}</td> */}
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
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
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
                            onClick={handleUseCurrentTime4}
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
                  Scheduled Time: {scheduledTime4 || "Not set"}
                </Typography>
              </td>


            </tr>

            <tr>
              <td>5</td>
              <td>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt="10px" gap="10px">
                  <Box display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      onClick={handleFileUpload5}
                      disabled={!isEnabled5}
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
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={downloadStatsFile}
                        disabled={loadingProgress5 < 100}
                        sx={{
                          backgroundColor: colors.redAccent[800],
                          color: colors.grey[100],
                          textTransform: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          transition: 'all 0.3s ease',
                          "&:hover": {
                            backgroundColor: colors.redAccent[600],
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 8px ${colors.redAccent[400]}40`,
                          },
                          "&:disabled": {
                            backgroundColor: colors.grey[700],
                            color: colors.grey[500],
                          }
                        }}
                      >
                        Download Original Output
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </td>
              {/* <td>{result}</td> */}
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
                  <Typography variant="body2" fontWeight="bold" color="white" mt="5px">
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
                            onClick={handleUseCurrentTime5}
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
                  Scheduled Time: {scheduledTime5 || "Not set"}
                </Typography>
              </td>


            </tr>

          </tbody>
        </Box>


      </Box>


      <Box
        sx={{
          background: "linear-gradient(135deg, #1a237e 0%, #283593 25%, #1F2A40 50%, #0d1b2a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "280px",
          textAlign: "center",
          mt: 2,
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.4)",
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          '&:hover': {
            boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.6)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
            opacity: 0,
            transition: "opacity 0.4s ease",
          },
          '&:hover::before': {
            opacity: 1,
          }
        }}
      >
        {/* Animated background grid */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
      `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
            opacity: 0.4,
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.6)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${15 + i * 2}s infinite ease-in-out ${i * 0.5}s`,
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          />
        ))}

        {/* Main content container */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          {/* Animated Gemini Logo */}
          <Box
            component="img"
            src="/image.png"
            alt="Gemini Logo"
            sx={{
              width: 70,
              height: "auto",
              mb: 1.5,
              borderRadius: "16px",
              transition: "all 0.5s ease",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
              animation: "logoGlow 4s infinite ease-in-out",
              '&:hover': {
                transform: "scale(1.15) rotate(5deg)",
                filter: "drop-shadow(0 6px 20px rgba(230, 57, 70, 0.4))",
              }
            }}
          />

          {/* Title text */}
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 600,
              mb: 1,
              fontSize: "1.1rem",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Advanced AI Analysis
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 2.5,
              maxWidth: "300px",
              fontSize: "0.85rem",
              lineHeight: 1.4,
            }}
          >
            Upload your test reports for comprehensive AI-powered analysis and insights
          </Typography>

          {/* Enhanced Button */}
          <Button
            variant="contained"
            onClick={() => {
              window.open(`${REACT_APP_FRONTEND_URL}/report`, "_blank");
            }}
            startIcon={<AutoAwesomeIcon sx={{ fontSize: "1.2rem" }} />}
            sx={{
              background: "linear-gradient(135deg, #E63946 0%, #F77F00 100%)",
              color: "white",
              textTransform: "none",
              padding: "12px 36px",
              fontSize: "1.1rem",
              fontWeight: 600,
              width: "auto",
              minWidth: "220px",
              borderRadius: "12px",
              transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
              position: "relative",
              overflow: "hidden",
              zIndex: 1,
              boxShadow: "0 4px 15px rgba(230, 57, 70, 0.4)",
              '&:hover': {
                background: "linear-gradient(135deg, #F77F00 0%, #E63946 100%)",
                transform: "scale(1.05) translateY(-2px)",
                boxShadow: "0 8px 25px rgba(230, 57, 70, 0.6)",
              },
              '&::before': {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transition: "all 0.8s ease",
                zIndex: -1,
              },
              '&:hover::before': {
                left: "100%",
              },
              '&::after': {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "0",
                height: "0",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                transform: "translate(-50%, -50%)",
                transition: "all 0.6s ease",
                zIndex: -1,
              },
              '&:active::after': {
                width: "300px",
                height: "300px",
              }
            }}
          >
            Analyze with AI
          </Button>
        </Box>

        {/* Corner accents */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "60px",
            height: "60px",
            borderTop: "2px solid rgba(230, 57, 70, 0.5)",
            borderLeft: "2px solid rgba(230, 57, 70, 0.5)",
            borderTopLeftRadius: "20px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "60px",
            height: "60px",
            borderBottom: "2px solid rgba(230, 57, 70, 0.5)",
            borderRight: "2px solid rgba(230, 57, 70, 0.5)",
            borderBottomRightRadius: "20px",
          }}
        />

        {/* Add these keyframes to your global CSS */}
        <style jsx>{`
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }
    
    @keyframes floatParticle {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(20px); }
      75% { transform: translateY(-15px) translateX(-10px); }
    }
    
    @keyframes logoGlow {
      0%, 100% { filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)); }
      50% { filter: drop-shadow(0 4px 20px rgba(230, 57, 70, 0.3)); }
    }
  `}</style>
      </Box>
    </Box>
  );
};

export default Nist_tests;