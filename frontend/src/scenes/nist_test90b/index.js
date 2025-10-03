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
  const [binaryInput6, setBinaryInput6] = useState("");
  const [binaryInput7, setBinaryInput7] = useState("");
  const [binaryInput8, setBinaryInput8] = useState("");
  const [binaryInput9, setBinaryInput9] = useState("");
  const [binaryInput10, setBinaryInput10] = useState("");

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

  const [date6, setDate6] = useState("");
  const [time6, setTime6] = useState("");

  const [date7, setDate7] = useState("");
  const [time7, setTime7] = useState("");

  const [date8, setDate8] = useState("");
  const [time8, setTime8] = useState("");

  const [date9, setDate9] = useState("");
  const [time9, setTime9] = useState("");

  const [date10, setDate10] = useState("");
  const [time10, setTime10] = useState("");


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

  const handleDateChange6 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate6(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange7 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate7(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange8 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate8(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange9 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate9(inputDate);
    } else {
      alert("Invalid date format. Use YYYY-MM-DD.");
    }
  };

  const handleDateChange10 = (event) => {
    const inputDate = event.target.value;
    if (dayjs(inputDate, "YYYY-MM-DD", true).isValid()) {
      setDate10(inputDate);
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

  const handleTimeChange6 = (event) => {
    const inputTime = event.target.value;
    setTime6(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime6 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime6(formattedTime);
  };

  const handleTimeChange7 = (event) => {
    const inputTime = event.target.value;
    setTime7(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime7 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime7(formattedTime);
  };

  const handleTimeChange8 = (event) => {
    const inputTime = event.target.value;
    setTime8(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime8 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime8(formattedTime);
  };

  const handleTimeChange9 = (event) => {
    const inputTime = event.target.value;
    setTime9(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime9 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime9(formattedTime);
  };

  const handleTimeChange10 = (event) => {
    const inputTime = event.target.value;
    setTime10(inputTime); // Update the time state immediately
  };
  const handleUseCurrentTime10 = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
    setTime10(formattedTime);
  };

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
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time6 && !timeRegex.test(time6)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time6]);

  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time7 && !timeRegex.test(time7)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time7]);

  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time8 && !timeRegex.test(time8)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time8]);

  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time9 && !timeRegex.test(time9)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time9]);

  useEffect(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // 24-hour format validation

    const handler = setTimeout(() => {
      if (time10 && !timeRegex.test(time10)) {
        alert("Invalid time format. Use HH:mm:ss (24-hour format).");
      }
    }, 5000); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [time10]);

  useEffect(() => {
    if (date && time) {
      setScheduledTime(`${date} ${time}`);
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

  useEffect(() => {
    if (date6 && time6) {
      setScheduledTime6(`${date6} ${time6}`);
    }
  }, [date6, time6]);

  useEffect(() => {
    if (date7 && time7) {
      setScheduledTime7(`${date7} ${time7}`);
    }
  }, [date7, time7]);

  useEffect(() => {
    if (date8 && time8) {
      setScheduledTime8(`${date8} ${time8}`);
    }
  }, [date8, time8]);

  useEffect(() => {
    if (date9 && time9) {
      setScheduledTime9(`${date9} ${time9}`);
    }
  }, [date9, time9]);

  useEffect(() => {
    if (date10 && time10) {
      setScheduledTime10(`${date10} ${time10}`);
    }
  }, [date10, time10]);
  const [showRedButton, setShowRedButton] = useState(false);
  const [showRedButton2, setShowRedButton2] = useState(false);
  const [showRedButton3, setShowRedButton3] = useState(false);
  const [showRedButton4, setShowRedButton4] = useState(false);
  const [showRedButton5, setShowRedButton5] = useState(false);
  const [showRedButton6, setShowRedButton6] = useState(false);
  const [showRedButton7, setShowRedButton7] = useState(false);
  const [showRedButton8, setShowRedButton8] = useState(false);
  const [showRedButton9, setShowRedButton9] = useState(false);
  const [showRedButton10, setShowRedButton10] = useState(false);



  const handleFileUpload = () => {
    // setShowRedButton(true);
    setIsEnabled(true);
    fileInputRef.current.click();
  };
  const handleFileUpload2 = () => {
    // setShowRedButton2(true);
    setIsEnabled2(true);
    fileInputRef2.current.click();
  };
  const handleFileUpload3 = () => {
    // setShowRedButton3(true);
    setIsEnabled3(true);
    fileInputRef3.current.click();
  };
  const handleFileUpload4 = () => {
    // setShowRedButton4(true);
    setIsEnabled4(true);
    fileInputRef4.current.click();
  };
  const handleFileUpload5 = () => {
    // setShowRedButton5(true);
    setIsEnabled5(true);
    fileInputRef5.current.click();
  };


  const [currentJobIdT, setCurrentJobIdT] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef.current = currentJobIdT;
  }, [currentJobIdT]);

  const [currentJobIdT2, setCurrentJobIdT2] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b2");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b2", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef2.current = currentJobIdT2;
  }, [currentJobIdT2]);

  const [currentJobIdT3, setCurrentJobIdT3] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b3");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b3", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef3.current = currentJobIdT3;
  }, [currentJobIdT3]);

  const [currentJobIdT4, setCurrentJobIdT4] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b4");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b4", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef4.current = currentJobIdT4;
  }, [currentJobIdT4]);

  const [currentJobIdT5, setCurrentJobIdT5] = useState(() => {
    const saved = localStorage.getItem("currentJobId_90b5");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("currentJobId_90b5", newId);
    return newId;
  });

  useEffect(() => {
    jobIdRef5.current = currentJobIdT5;
  }, [currentJobIdT5]);



  // const handleFileChange = async (event) => {
  //    setLoadingProgressGr(0);
  //   setLoadingProgressRep(0);
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) {
  //     // User closed the file picker without choosing a file
  //     setShowRedButton(false);
  //     return;
  //   }

  //   if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
  //     alert("Warning: The selected file is too large. Please choose a smaller file.");
  //     return;
  //   }

  //   const userId = await fetchUserId();
  //   if (!userId) return;

  //   // Reset all state variables
  //   setBinaryInput("");
  //   setScheduledTime("");
  //   setDebouncedScheduledTime("");
  //   setResult(null);
  //   setFileName("");
  //   setUploadTime("");
  //   setLoadingProgress(0);
  //   setTime("");

  //   setFileName(selectedFile.name);

  //   const reader = new FileReader();
  //   reader.onload = async (e) => {
  //     const binaryData = e.target.result;
  //     const byteArray = new Uint8Array(binaryData);

  //     let binaryString = "";

  //     if (selectedFile.name.toLowerCase().endsWith(".bin")) {
  //       // Convert each byte to its binary representation (8 bits)
  //       for (let i = 0; i < byteArray.length; i++) {
  //         binaryString += byteArray[i].toString(2).padStart(8, '0');
  //       }
  //     } else {
  //       // Assume it's a .txt file containing binary text
  //       const decoder = new TextDecoder();
  //       binaryString = decoder.decode(byteArray).trim();
  //     }

  //     setBinaryInput(binaryString);

  //     const now = new Date();
  //     const pad = (n) => String(n).padStart(2, '0');
  //     const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  //     setUploadTime(currentTime);

  //     try {
  //       localStorage.setItem('resultFetchedFromSupabase_two', 'false');
  //       const { error: deleteError } = await supabase
  //         .from('results2')
  //         .delete()
  //         .match({ line: 1, user_id: userId });

  //       setLoadingProgress(0);
  //       if (deleteError) {

  //         return;
  //       }
  //     } catch (err) {

  //     }

  //     event.target.value = "";
  //   };
  //   setIsEnabled(false);
  //   reader.readAsArrayBuffer(selectedFile);
  // };

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

  const handleFileChange = async (event) => {
    setLoadingProgressGr(0);
    setLoadingProgressRep(0);
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

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
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

    try {
      if (isBin) {
        // BIN file logic (unchanged)
        const buffer = await selectedFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const binaryData = Array.from(bytes)
          .map(byte => byte.toString(2).padStart(8, '0'))
          .join('');
        setBinaryInput(binaryData);
      } else if (isTxt) {
        // TXT file logic (newly added)
        const text = await selectedFile.text();
        const binaryString = text.replace(/[^01]/g, ''); // Keep only 0s and 1s
        if (binaryString.length === 0) {
          alert("The .txt file does not contain valid binary data (only 0s and 1s).");
          return;
        }
        setBinaryInput(binaryString);
      }
    } catch (error) {

      alert("Failed to extract binary data from the file.");
      return;
    }

    // Supabase cleanup
    try {
      localStorage.setItem('resultFetchedFromSupabase3', 'false');
      const { error: deleteError } = await supabase
        .from('results3')
        .delete()
        .match({ line: 1, user_id: userId });

      if (deleteError) {
        return;
      }
    } catch (err) {

    }
    setIsEnabled(false);
    event.target.value = "";
  };

  const handleFileChange2 = async (event) => {
    setLoadingProgress2Gr(0);
    setLoadingProgress2Rep(0);
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

    // Fetch user ID
    const userId = await fetchUserId();
    if (!userId) {

      return;
    }

    // Reset all state variables for line 2
    setBinaryInput2(""); // Clear binary input
    setScheduledTime2(""); // Clear scheduled time
    setDebouncedScheduledTime2(""); // Clear debounced scheduled time
    setResult2(""); // Clear result
    setFileName2(""); // Clear filename
    setUploadTime2(""); // Clear upload time
    setLoadingProgress2(0); // Reset progress bar

    // Set the new filename
    setFileName2(selectedFile.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      let binaryString = "";

      if (selectedFile.name.toLowerCase().endsWith(".bin")) {
        // Convert each byte to its binary representation (8 bits)
        for (let i = 0; i < byteArray.length; i++) {
          binaryString += byteArray[i].toString(2).padStart(8, '0');
        }
      } else {
        // Assume it's a .txt file containing binary text
        const decoder = new TextDecoder();
        binaryString = decoder.decode(byteArray).trim();
      }

      setBinaryInput2(binaryString);

      // Store the current time when the file is uploaded
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime2(currentTime);


      // Remove the existing row for line 2 from Supabase
      try {
        localStorage.setItem('resultFetchedFromSupabase90b2', 'false');
        const { error: deleteError } = await supabase
          .from('results2')
          .delete()
          .match({ line: 2, user_id: userId }); // Replace '2' with the line number for this handler

        setLoadingProgress2(0);
        if (deleteError) {

          return;
        }

      } catch (err) {

      }

      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    setIsEnabled2(false);
    reader.readAsArrayBuffer(selectedFile);
  };


  const handleFileChange3 = async (event) => {
    const selectedFile = event.target.files[0];
    setLoadingProgress3Gr(0);
    setLoadingProgress3Rep(0);
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
    // Fetch user ID
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

    // Set the new filename
    setFileName3(selectedFile.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      let binaryString = "";

      if (selectedFile.name.toLowerCase().endsWith(".bin")) {
        // Convert each byte to its binary representation (8 bits)
        for (let i = 0; i < byteArray.length; i++) {
          binaryString += byteArray[i].toString(2).padStart(8, '0');
        }
      } else {
        // Assume it's a .txt file containing binary text
        const decoder = new TextDecoder();
        binaryString = decoder.decode(byteArray).trim();
      }

      setBinaryInput3(binaryString);
      // Update binaryInput state with new binary data

      // Store the current time when the file is uploaded
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime3(currentTime);

      // Remove the existing row for line 3 from Supabase
      try {
        localStorage.setItem('resultFetchedFromSupabase90b3', 'false');
        const { error: deleteError } = await supabase
          .from('results3')
          .delete()
          .match({ line: 3, user_id: userId }); // Replace '3' with the line number for this handler

        setLoadingProgress3(0);
        if (deleteError) {

          return;
        }

      } catch (err) {

      }

      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    setIsEnabled3(false);
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange4 = async (event) => {
    const selectedFile = event.target.files[0];
    setLoadingProgress4Gr(0);
    setLoadingProgress4Rep(0);
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

    // Reset all state variables for line 2
    setBinaryInput4(""); // Clear binary input
    setScheduledTime4(""); // Clear scheduled time
    setDebouncedScheduledTime4(""); // Clear debounced scheduled time
    setResult4(""); // Clear result
    setFileName4(""); // Clear filename
    setUploadTime4(""); // Clear upload time
    setLoadingProgress4(0); // Reset progress bar

    // Set the new filename
    setFileName4(selectedFile.name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      let binaryString = "";

      if (selectedFile.name.toLowerCase().endsWith(".bin")) {
        // Convert each byte to its binary representation (8 bits)
        for (let i = 0; i < byteArray.length; i++) {
          binaryString += byteArray[i].toString(2).padStart(8, '0');
        }
      } else {
        // Assume it's a .txt file containing binary text
        const decoder = new TextDecoder();
        binaryString = decoder.decode(byteArray).trim();
      }

      setBinaryInput4(binaryString);

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime4(currentTime);

      try {
        localStorage.setItem('resultFetchedFromSupabase90b2', 'false');
        const { error: deleteError } = await supabase
          .from('results2')
          .delete()
          .match({ line: 4, user_id: userId }); // Replace '2' with the line number for this handler

        setLoadingProgress4(0);
        if (deleteError) {

          return;
        }

      } catch (err) {

      }

      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    setIsEnabled4(false);
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange5 = async (event) => {
    const selectedFile = event.target.files[0];
    setLoadingProgress5Gr(0);
    setLoadingProgress5Rep(0);
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

    // Reset all state variables for line 2
    setBinaryInput5(""); // Clear binary input
    setScheduledTime5(""); // Clear scheduled time
    setDebouncedScheduledTime5(""); // Clear debounced scheduled time
    setResult5(""); // Clear result
    setFileName5(""); // Clear filename
    setUploadTime5(""); // Clear upload time
    setLoadingProgress5(0); // Reset progress bar

    // Set the new filename
    setFileName5(selectedFile.name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      let binaryString = "";

      if (selectedFile.name.toLowerCase().endsWith(".bin")) {
        // Convert each byte to its binary representation (8 bits)
        for (let i = 0; i < byteArray.length; i++) {
          binaryString += byteArray[i].toString(2).padStart(8, '0');
        }
      } else {
        // Assume it's a .txt file containing binary text
        const decoder = new TextDecoder();
        binaryString = decoder.decode(byteArray).trim();
      }

      setBinaryInput5(binaryString);

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const currentTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setUploadTime5(currentTime);

      try {
        localStorage.setItem('resultFetchedFromSupabase90b2', 'false');
        const { error: deleteError } = await supabase
          .from('results2')
          .delete()
          .match({ line: 5, user_id: userId }); // Replace '2' with the line number for this handler

        setLoadingProgress5(0);
        if (deleteError) {

          return;
        }

      } catch (err) {

      }
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    setIsEnabled5(false);
    reader.readAsArrayBuffer(selectedFile);
  };


  const jobIdRef2 = useRef(null);
  const jobIdRef3 = useRef(null);
  const jobIdRef4 = useRef(null);
  const jobIdRef5 = useRef(null);
  const jobIdRef6 = useRef(null);
  const jobIdRef7 = useRef(null);
  const jobIdRef8 = useRef(null);
  const jobIdRef9 = useRef(null);
  const jobIdRef10 = useRef(null);

  useEffect(() => {
    const fetchStoredResults = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }
      try {
        const { data, error } = await supabase
          .from('results2') // Replace 'results' with your Supabase table name
          .select('*') // Fetch all rows
          .eq("user_id", userId);
        if (error) {

          return;
        }

        // Update state with fetched data
        if (data) {
          data.forEach((row) => {
            switch (row.line) {
              case 1:
                setBinaryInput(row.binary_data);
                setScheduledTime(row.scheduled_time);
                setResult({ final_result: row.result });
                setFileName(row.file_name);
                setUploadTime(row.upload_time);
                setLoadingProgress(row.progress);
                break;
              case 2:
                setBinaryInput2(row.binary_data);
                setScheduledTime2(row.scheduled_time);
                setResult2({ final_result: row.result });
                setFileName2(row.file_name);
                setUploadTime2(row.upload_time);
                setLoadingProgress2(row.progress);
                break;
              case 3:
                setBinaryInput3(row.binary_data);
                setScheduledTime3(row.scheduled_time);
                setResult3({ final_result: row.result });
                setFileName3(row.file_name);
                setUploadTime3(row.upload_time);
                setLoadingProgress3(row.progress);
                break;
              case 4:
                setBinaryInput4(row.binary_data);
                setScheduledTime4(row.scheduled_time);
                setResult4({ final_result: row.result });
                setFileName4(row.file_name);
                setUploadTime4(row.upload_time);
                setLoadingProgress4(row.progress);
                break;

              default:
                break;
            }
          });
        }
      } catch (err) {

      }
    };

    fetchStoredResults();
  }, []);

  const [loadingProgress, setLoadingProgress] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabase_two') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });

  const [loadingProgressRep, setLoadingProgressRep] = useState(0);
  const [loadingProgressGr, setLoadingProgressGr] = useState(0);

  const [loadingProgress2, setLoadingProgress2] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabase90b2') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress2Rep, setLoadingProgress2Rep] = useState(0);
  const [loadingProgress2Gr, setLoadingProgress2Gr] = useState(0);

  const [loadingProgress3, setLoadingProgress3] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabase90b3') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress3Rep, setLoadingProgress3Rep] = useState(0);
  const [loadingProgress3Gr, setLoadingProgress3Gr] = useState(0);

  const [loadingProgress4, setLoadingProgress4] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabase90b4') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress4Rep, setLoadingProgress4Rep] = useState(0);
  const [loadingProgress4Gr, setLoadingProgress4Gr] = useState(0);

  const [loadingProgress5, setLoadingProgress5] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabase90b5') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
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

  const [scheduledTime6, setScheduledTime6] = useState("");
  const [debouncedScheduledTime6, setDebouncedScheduledTime6] = useState("");

  const [scheduledTime7, setScheduledTime7] = useState("");
  const [debouncedScheduledTime7, setDebouncedScheduledTime7] = useState("");

  const [scheduledTime8, setScheduledTime8] = useState("");
  const [debouncedScheduledTime8, setDebouncedScheduledTime8] = useState("");

  const [scheduledTime9, setScheduledTime9] = useState("");
  const [debouncedScheduledTime9, setDebouncedScheduledTime9] = useState("");

  const [scheduledTime10, setScheduledTime10] = useState("");
  const [debouncedScheduledTime10, setDebouncedScheduledTime10] = useState("");

  const finalResult = result ? result.final_result : " ";


  const handleScheduledTimeChange = (event) => {
    setScheduledTime(event.target.value);

  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime(scheduledTime);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime]);

  const finalResult2 = result2 ? result2.final_result : " ";

  const handleScheduledTimeChange2 = (event) => {
    setScheduledTime2(event.target.value);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime2(scheduledTime2);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime2]);

  const finalResult3 = result3 ? result3.final_result : " ";

  const handleScheduledTimeChange3 = (event) => {
    setScheduledTime3(event.target.value);
    console.log(scheduledTime3);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime3(scheduledTime3);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime3]);

  const finalResult4 = result4 ? result4.final_result : " ";

  const handleScheduledTimeChange4 = (event) => {
    setScheduledTime4(event.target.value);
    console.log(scheduledTime4);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime4(scheduledTime4);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime4]);

  const finalResult5 = result5 ? result5.final_result : " ";

  const handleScheduledTimeChange5 = (event) => {
    setScheduledTime5(event.target.value);
    console.log(scheduledTime5);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime5(scheduledTime5);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime5]);

  const finalResult6 = result6 ? result6.final_result : " ";

  const handleScheduledTimeChange6 = (event) => {
    setScheduledTime6(event.target.value);
    console.log(scheduledTime6);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime6(scheduledTime6);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime6]);

  const finalResult7 = result7 ? result7.final_result : " ";

  const handleScheduledTimeChange7 = (event) => {
    setScheduledTime7(event.target.value);
    console.log(scheduledTime7);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime7(scheduledTime7);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime7]);

  const finalResult8 = result8 ? result8.final_result : " ";

  const handleScheduledTimeChange8 = (event) => {
    setScheduledTime8(event.target.value);
    console.log(scheduledTime8);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime8(scheduledTime8);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime8]);

  const finalResult9 = result9 ? result9.final_result : " ";

  const handleScheduledTimeChange9 = (event) => {
    setScheduledTime9(event.target.value);
    console.log(scheduledTime9);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime9(scheduledTime9);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime9]);

  const finalResult10 = result10 ? result10.final_result : " ";

  const handleScheduledTimeChange10 = (event) => {
    setScheduledTime10(event.target.value);
    console.log(scheduledTime10);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedScheduledTime10(scheduledTime10);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [scheduledTime10]);

  const jobIdRef = useRef(null);

  let binaryDataSent = false;
  let binaryDataSent2 = false;
  let binaryDataSent3 = false;
  let binaryDataSent4 = false;
  let binaryDataSent5 = false;
  let binaryDataSent6 = false;
  let binaryDataSent7 = false;
  let binaryDataSent8 = false;
  let binaryDataSent9 = false;
  let binaryDataSent10 = false;

  const alertShownRef = useRef(false);
  const alertShownRef2 = useRef(false);
  const alertShownRef3 = useRef(false);
  const alertShownRef4 = useRef(false);
  const alertShownRef5 = useRef(false);
  const alertShownRef6 = useRef(false);
  const alertShownRef7 = useRef(false);
  const alertShownRef8 = useRef(false);
  const alertShownRef9 = useRef(false);
  const alertShownRef10 = useRef(false);


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
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
              localStorage.setItem("resultFetchedFromSupabase90b", "true");
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
  }, []);


  useEffect(() => {
    if (!binaryInput || !debouncedScheduledTime) {
      return;
    }
   
    const lineNo = 1;
    if (result) {
      // localStorage.setItem('resultFetchedFromSupabase90b', 'true');
      // setLoadingProgress(100);
      return;
    }
    setLoadingProgress(0);
    let progressIntervalId;
 
    const upsertProgress = async (progress, userId, result = null) => {
      let binaryString = null;

      if (progress === 0 && selectedFile && !binaryInsertedRef.current) {
        try {
          const fileReader = new FileReader();

          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile);
          });

          binaryString = Array.from(fileBuffer)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');

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
        .from('results2')
        .upsert(payload);


      if (error) {

      }
    };
   
    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      await upsertProgress(1, userId);

      setShowRedButton(false);
      if (!alertShownRef.current) {
        alert("File uploaded successfully!");
        alertShownRef.current = true;
      }
     
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
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
              setLoadingProgress(100);

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

        console.log("6");

        formData.append("scheduled_time", debouncedScheduledTime);
        formData.append("job_id", currentJobIdT);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName);
        
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/nist90b_run/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
     
        console.log("response", response);
        setIsEnabled(true);
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
       
        setLoadingProgress(100);
        setResult(response.data);
        localStorage.setItem("resultFetchedFromSupabase90b", "true");
        await upsertProgress(100, userId, response.data.final_result);
       
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


  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
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

            setLoadingProgress2(progress);

            if (data.result) {
              setResult2({ final_result: data.result });
              localStorage.setItem("resultFetchedFromSupabase90b2", "true");
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
    if (!binaryInput2 || !debouncedScheduledTime2) return;
  
    const lineNo = 2;
  
    if (result2) {
      // localStorage.setItem('resultFetchedFromSupabase90b2', 'true');
      // setLoadingProgress2(100);
      return;
    }
  
    setLoadingProgress2(0);
    let progressIntervalId;
  
    const upsertProgress = async (progress, userId, result = null) => {
      let binaryString = null;
  
      if (progress === 0 && selectedFile2 && !binaryInsertedRef2.current) {
        try {
          const fileReader = new FileReader();
  
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile2);
          });
  
          binaryString = Array.from(fileBuffer)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');
  
          binaryInsertedRef2.current = true; // ✅ Prevent duplicate binary inserts
        } catch (err) {
          return;
        }
      }
  
      const payload = {
        user_id: userId,
        line: 2,
        binary_data: " ", // You can replace with binaryString if needed
        scheduled_time: debouncedScheduledTime2,
        result: result,
        file_name: fileName2,
        upload_time: uploadTime2,
        progress: progress,
        updated_at: new Date().toISOString()
      };
  
      const { error } = await supabase.from("results2").upsert(payload);
  
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };
  
    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
  
      await upsertProgress(1, userId);
  
      setShowRedButton2(false);
      if (!alertShownRef2.current) {
        alert("File uploaded successfully!");
        alertShownRef2.current = true;
      }
  
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 2)
            .maybeSingle();
  
          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }
  
          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress2(progress);
  
            if (progress >= 100 && progressIntervalId) {
              setLoadingProgress2(100);
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Progress fetch error:", err);
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
  
        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobIdT2);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName2);
        
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/nist90b_run/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        setIsEnabled2(true);
  
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
  
        setLoadingProgress2(100);
        setResult2(response.data);
        localStorage.setItem("resultFetchedFromSupabase90b2", "true");
  
        await upsertProgress(100, userId, response.data.final_result);
      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
  
        setLoadingProgress2(0);
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
  }, [selectedFile2, debouncedScheduledTime2]);
  

  useEffect(() => {

    let progressIntervalId;

    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
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
              localStorage.setItem("resultFetchedFromSupabase90b2", "true");
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
    if (!binaryInput3 || !debouncedScheduledTime3) return;
  
    const lineNo = 3;
  
    if (result3) {
      // localStorage.setItem('resultFetchedFromSupabase90b3', 'true');
      // setLoadingProgress3(100);
      return;
    }
  
    setLoadingProgress3(0);
    let progressIntervalId;
  
    const upsertProgress = async (progress, userId, result = null) => {
      let binaryString = null;
  
      if (progress === 0 && selectedFile3 && !binaryInsertedRef3.current) {
        try {
          const fileReader = new FileReader();
  
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile3);
          });
  
          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');
  
          binaryInsertedRef3.current = true; // ✅ Prevent future inserts
        } catch (err) {
          return;
        }
      }
  
      const payload = {
        user_id: userId,
        line: 3,
        binary_data: " ", // Replace with binaryString if needed
        scheduled_time: debouncedScheduledTime3,
        result: result,
        file_name: fileName3,
        upload_time: uploadTime3,
        progress: progress,
        updated_at: new Date().toISOString()
      };
  
      const { error } = await supabase.from("results2").upsert(payload);
  
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };
  
    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
  
      await upsertProgress(1, userId);
  
      setShowRedButton3(false);
      if (!alertShownRef3.current) {
        alert("File uploaded successfully!");
        alertShownRef3.current = true;
      }
  
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 3)
            .maybeSingle();
  
          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }
  
          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress3(progress);
  
            if (progress >= 100 && progressIntervalId) {
              setLoadingProgress3(100);
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Progress fetch error:", err);
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
  
        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobIdT3);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName3);
  
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/nist90b_run/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        setIsEnabled3(true);
  
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
  
        setLoadingProgress3(100);
        setResult3(response.data);
        localStorage.setItem("resultFetchedFromSupabase90b3", "true");
  
        await upsertProgress(100, userId, response.data.final_result);
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

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
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
              localStorage.setItem("resultFetchedFromSupabase90b4", "true");
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
    if (!binaryInput4 || !debouncedScheduledTime4) return;
  
    const lineNo = 4;
  
    if (result4) {
      // localStorage.setItem('resultFetchedFromSupabase90b4', 'true');
      // setLoadingProgress4(100);
      return;
    }
  
    setLoadingProgress4(0);
    let progressIntervalId;
  
    const upsertProgress = async (progress, userId, result = null) => {
      let binaryString = null;
  
      if (progress === 0 && selectedFile4 && !binaryInsertedRef4.current) {
        try {
          const fileReader = new FileReader();
  
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile4);
          });
  
          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');
  
          binaryInsertedRef4.current = true; // \u2705 Prevent future inserts
        } catch (err) {
          return;
        }
      }
  
      const payload = {
        user_id: userId,
        line: 4,
        binary_data: " ", // Replace with binaryString if needed
        scheduled_time: debouncedScheduledTime4,
        result: result,
        file_name: fileName4,
        upload_time: uploadTime4,
        progress: progress,
        updated_at: new Date().toISOString()
      };
  
      const { error } = await supabase.from("results2").upsert(payload);
  
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };
  
    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
  
      await upsertProgress(1, userId);
  
      setShowRedButton4(false);
      if (!alertShownRef4.current) {
        alert("File uploaded successfully!");
        alertShownRef4.current = true;
      }
  
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 4)
            .maybeSingle();
  
          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }
  
          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress4(progress);
  
            if (progress >= 100 && progressIntervalId) {
              setLoadingProgress4(100);
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Progress fetch error:", err);
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
  
        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobIdT4);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName4);
  
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/nist90b_run/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        setIsEnabled4(true);
  
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
  
        setLoadingProgress4(100);
        setResult4(response.data);
        localStorage.setItem("resultFetchedFromSupabase90b4", "true");
  
        await upsertProgress(100, userId, response.data.final_result);
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

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
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
              localStorage.setItem("resultFetchedFromSupabase90b5", "true");
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
    if (!binaryInput5 || !debouncedScheduledTime5) return;
  
    const lineNo = 5;
  
    if (result5) {
      // localStorage.setItem('resultFetchedFromSupabase90b5', 'true');
      // setLoadingProgress5(100);
      return;
    }
  
    setLoadingProgress5(0);
    let progressIntervalId;
  
    const upsertProgress = async (progress, userId, result = null) => {
      let binaryString = null;
  
      if (progress === 0 && selectedFile5 && !binaryInsertedRef5.current) {
        try {
          const fileReader = new FileReader();
  
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(selectedFile5);
          });
  
          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');
  
          binaryInsertedRef5.current = true; // ✅ Prevent future inserts
        } catch (err) {
          return;
        }
      }
  
      const payload = {
        user_id: userId,
        line: 5,
        binary_data: " ", // Replace with binaryString if needed
        scheduled_time: debouncedScheduledTime5,
        result: result,
        file_name: fileName5,
        upload_time: uploadTime5,
        progress: progress,
        updated_at: new Date().toISOString()
      };
  
      const { error } = await supabase.from("results2").upsert(payload);
  
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };
  
    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
  
      await upsertProgress(1, userId);
  
      setShowRedButton5(false);
      if (!alertShownRef5.current) {
        alert("File uploaded successfully!");
        alertShownRef5.current = true;
      }
  
      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from("results2")
            .select("*")
            .eq("user_id", userId)
            .eq("line", 5)
            .maybeSingle();
  
          if (error) {
            console.error("Supabase fetch error:", error.message);
            return;
          }
  
          if (data) {
            const progress = data.progress || 0;
            setLoadingProgress5(progress);
  
            if (progress >= 100 && progressIntervalId) {
              setLoadingProgress5(100);
              clearInterval(progressIntervalId);
              progressIntervalId = null;
            }
          }
        } catch (err) {
          console.error("Progress fetch error:", err);
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
  
        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobIdT5);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", fileName5);
  
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/nist90b_run/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        setIsEnabled5(true);
  
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
  
        setLoadingProgress5(100);
        setResult5(response.data);
        localStorage.setItem("resultFetchedFromSupabase90b5", "true");
  
        await upsertProgress(100, userId, response.data.final_result);
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
        body: JSON.stringify({ binary_data: binaryInput, job_id: currentJobIdT, file_name: fileName, line_number:1 }),
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
        body: JSON.stringify({ binary_data: binaryInput, job_id: currentJobIdT, file_name: fileName,line_number:1  }),
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
        body: JSON.stringify({ binary_data: binaryInput2, job_id: currentJobIdT2, file_name: fileName2,line_number:2 }),
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
        body: JSON.stringify({ binary_data: binaryInput2, job_id: currentJobIdT2, file_name: fileName2,line_number:2 }),
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
        body: JSON.stringify({ binary_data: binaryInput3, job_id: currentJobIdT3, file_name: fileName3,line_number:3 }),
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
        body: JSON.stringify({ binary_data: binaryInput3, job_id: currentJobIdT3, file_name: fileName3,line_number:3 }),
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
        body: JSON.stringify({ binary_data: binaryInput4, job_id: currentJobIdT4, file_name: fileName4,line_number:4 }),
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
        body: JSON.stringify({ binary_data: binaryInput4, job_id: currentJobIdT4, file_name: fileName4 ,line_number:4}),
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
        body: JSON.stringify({ binary_data: binaryInput5, job_id: currentJobIdT5, file_name: fileName5,line_number:5 }),
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
        body: JSON.stringify({ binary_data: binaryInput5, job_id: currentJobIdT5, file_name: fileName5,line_number:5 }),
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
                      disabled={!isEnabled}
                      onClick={handleFileUpload}
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
                      disabled={!isEnabled2}
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
                      disabled={!isEnabled3}
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
                      disabled={!isEnabled4}
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
                      disabled={!isEnabled5}
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

            </tr>
            {/*
<>
            <tr>
              <td>6</td>
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
                      onClick={handleFileUpload6}
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
                      {showRedButton6 && (
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
                      ref={fileInputRef6}
                      style={{ display: "none" }}
                      onChange={handleFileChange6}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick6("graph")}
                        disabled={loadingProgress6 < 100}
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
                        {loadingProgress6Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress6Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress6Gr <= 100 && (
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
                              loadingProgress6Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress6Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress6Gr}
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
                            {loadingProgress6Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick6("report")}
                        disabled={loadingProgress6 < 100}
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
                        {loadingProgress6Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress6Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress6Rep <= 100 && (
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
                              loadingProgress6Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress6Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress6Rep}
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
                            {loadingProgress6Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </td>
              <td>{finalResult6}</td>
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
                    value={loadingProgress6} // Updated progress state
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
                    {loadingProgress6}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime6 || ""}</td>
              <td>{fileName6 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date6}
                  onChange={handleDateChange6}
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
                  value={time6}
                  onChange={handleTimeChange6}
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
                            onClick={handleUseCurrentTime6}
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
                  Scheduled Time: {scheduledTime6 || "Not set"}
                </Typography>
              </td>
            </tr>

            <tr>
              <td>7</td>
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
                      onClick={handleFileUpload7}
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
                      {showRedButton7 && (
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
                      ref={fileInputRef7}
                      style={{ display: "none" }}
                      onChange={handleFileChange7}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick7("graph")}
                        disabled={loadingProgress7 < 100}
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
                        {loadingProgress7Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress7Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress7Gr <= 100 && (
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
                              loadingProgress7Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress7Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress7Gr}
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
                            {loadingProgress7Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick7("report")}
                        disabled={loadingProgress7 < 100}
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
                        {loadingProgress7Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress7Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress7Rep <= 100 && (
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
                              loadingProgress7Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress7Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress7Rep}
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
                            {loadingProgress7Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </td>
              <td>{finalResult7}</td>
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
                    value={loadingProgress7} // Updated progress state
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
                    {loadingProgress7}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime7 || ""}</td>
              <td>{fileName7 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date7}
                  onChange={handleDateChange7}
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
                  value={time7}
                  onChange={handleTimeChange7}
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
                            onClick={handleUseCurrentTime7}
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
                  Scheduled Time: {scheduledTime7 || "Not set"}
                </Typography>
              </td>
            </tr>

            <tr>
              <td>8</td>
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
                      onClick={handleFileUpload8}
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
                      {showRedButton8 && (
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
                      ref={fileInputRef8}
                      style={{ display: "none" }}
                      onChange={handleFileChange8}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick8("graph")}
                        disabled={loadingProgress8 < 100}
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
                        {loadingProgress8Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress8Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress8Gr <= 100 && (
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
                              loadingProgress8Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress8Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress8Gr}
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
                            {loadingProgress8Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick8("report")}
                        disabled={loadingProgress8 < 100}
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
                        {loadingProgress8Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress8Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress8Rep <= 100 && (
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
                              loadingProgress8Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress8Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress8Rep}
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
                            {loadingProgress8Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </td>
              <td>{finalResult8}</td>
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
                    value={loadingProgress8} // Updated progress state
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
                    {loadingProgress8}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime8 || ""}</td>
              <td>{fileName8 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date8}
                  onChange={handleDateChange8}
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
                  value={time8}
                  onChange={handleTimeChange8}
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
                            onClick={handleUseCurrentTime8}
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
                  Scheduled Time: {scheduledTime8 || "Not set"}
                </Typography>
              </td>
            </tr>

            <tr>
              <td>9</td>
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
                      onClick={handleFileUpload9}
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
                      {showRedButton9 && (
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
                      ref={fileInputRef_nine}
                      style={{ display: "none" }}
                      onChange={handleFileChange9}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick9("graph")}
                        disabled={loadingProgress9 < 100}
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
                        {loadingProgress9Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress9Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress9Gr <= 100 && (
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
                              loadingProgress9Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress9Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress9Gr}
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
                            {loadingProgress9Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick9("report")}
                        disabled={loadingProgress9 < 100}
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
                        {loadingProgress9Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress9Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress9Rep <= 100 && (
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
                              loadingProgress9Rep > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress9Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress9Rep}
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
                            {loadingProgress9Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </td>
              <td>{finalResult9}</td>
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
                    value={loadingProgress9} // Updated progress state
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
                    {loadingProgress9}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime9 || ""}</td>
              <td>{fileName9 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date9}
                  onChange={handleDateChange9}
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
                  value={time9}
                  onChange={handleTimeChange9}
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
                            onClick={handleUseCurrentTime9}
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
                  Scheduled Time: {scheduledTime9 || "Not set"}
                </Typography>
              </td>
            </tr>

            <tr>
              <td>10</td>
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
                      onClick={handleFileUpload10}
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
                      {showRedButton10 && (
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
                      ref={fileInputRef10}
                      style={{ display: "none" }}
                      onChange={handleFileChange10}
                    />
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick10("graph")}
                        disabled={loadingProgress10 < 100}
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
                        {loadingProgress10Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress10Gr}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress10Gr <= 100 && (
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
                              loadingProgress10Gr > 0 ? "scale(1)" : "scale(0)",
                            opacity: loadingProgress10Gr > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress10Gr}
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
                            {loadingProgress10Gr}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" display="inline-flex">
                      <Button
                        variant="contained"
                        onClick={() => handleButtonClick10("report")}
                        disabled={loadingProgress10 < 100}
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
                        {loadingProgress10Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              height: "3px",
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress10Rep}%`,
                              transition:
                                "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                              borderRadius: "0 0 8px 8px",
                            }}
                          />
                        )}
                      </Button>

                      {loadingProgress10Rep <= 100 && (
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
                              loadingProgress10Rep > 0
                                ? "scale(1)"
                                : "scale(0)",
                            opacity: loadingProgress10Rep > 0 ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={loadingProgress10Rep}
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
                            {loadingProgress10Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </td>
              <td>{finalResult10}</td>
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
                    value={loadingProgress10} // Updated progress state
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
                    {loadingProgress10}%
                  </Typography>
                </Box>
              </td>
              <td>{uploadTime10 || ""}</td>
              <td>{fileName10 || "No file selected"}</td>
              <td>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date10}
                  onChange={handleDateChange10}
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
                  value={time10}
                  onChange={handleTimeChange10}
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
                            onClick={handleUseCurrentTime10}
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
                  Scheduled Time: {scheduledTime10 || "Not set"}
                </Typography>
              </td>
            </tr>
</>
*/}
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

export default Nist_tests90b;