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
  const [binaryInput6, setBinaryInput6] = useState("");
  const [binaryInput7, setBinaryInput7] = useState("");
  const [binaryInput8, setBinaryInput8] = useState("");
  const [binaryInput9, setBinaryInput9] = useState("");
  const [binaryInput10, setBinaryInput10] = useState("");

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
  const fileInputRef6 = useRef(null);
  const fileInputRef7 = useRef(null);
  const fileInputRef8 = useRef(null);
  const fileInputRef_nine = useRef(null);
  const fileInputRef10 = useRef(null);


  const [result, setResult] = useState(null);
  const [result2, setResult2] = useState(null);
  const [result3, setResult3] = useState(null);
  const [result4, setResult4] = useState(null);
  const [result5, setResult5] = useState(null);
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



  const finalResult = result ? result.final_result : " ";

  const handleScheduledTimeChange = (event) => {
    setScheduledTime(event.target.value);

  };
  useEffect(() => {
    const handler = setTimeout(() => {
     
      if (scheduledTime) {
        const date = new Date(scheduledTime);
        const pad = (n) => String(n).padStart(2, '0');
  
        const formattedScheduledTime = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
       
        setDebouncedScheduledTime(formattedScheduledTime);
      }
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
   setShowRedButton(true)
   setIsEnabled(true);
    fileInputRef.current.click();
  };
  const handleFileUpload2 = () => {
    setShowRedButton2(true)
    setIsEnabled2(true);
    fileInputRef2.current.click();
  };
  const handleFileUpload3 = () => {
    setShowRedButton3(true)
    setIsEnabled3(true);
    fileInputRef3.current.click();
  };
  const handleFileUpload4 = () => {
    setShowRedButton4(true)
    setIsEnabled4(true);
    fileInputRef4.current.click();
  };
  const handleFileUpload5 = () => {
   setShowRedButton5(true)
   setIsEnabled5(true);
    fileInputRef5.current.click();
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  const [selectedFile6, setSelectedFile6] = useState(null);
  const [selectedFile7, setSelectedFile7] = useState(null);
  const [selectedFile8, setSelectedFile8] = useState(null);
  const [selectedFile9, setSelectedFile9] = useState(null);
  const [selectedFile10, setSelectedFile10] = useState(null);
  
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


  
    if (!isBin && !isTxt) {
      alert("Please upload a .bin or .txt file.");
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
    setResult(null);
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


  
    if (!isBin && !isTxt) {
      alert("Please upload a .bin or .txt file.");
      return;
    }
  
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
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
    setResult2(null);
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
    
    try {
      if (isBin) {
        // BIN file logic (unchanged)
        const buffer = await selectedFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const binaryData = Array.from(bytes)
          .map(byte => byte.toString(2).padStart(8, '0'))
          .join('');
        setBinaryInput2(binaryData);
      } else if (isTxt) {
        // TXT file logic (newly added)
        const text = await selectedFile.text();
        const binaryString = text.replace(/[^01]/g, ''); // Keep only 0s and 1s
        if (binaryString.length === 0) {
          alert("The .txt file does not contain valid binary data (only 0s and 1s).");
          return;
        }
        setBinaryInput2(binaryString);
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
        .match({ line: 2, user_id: userId });

      if (deleteError) {

        return;
      }
    } catch (err) {
         
    }
      setIsEnabled2(false);

    event.target.value = "";
  };

  const handleFileChange3 = async (event) => {
     setLoadingProgress3Gr(0);
   setLoadingProgress3Rep(0);
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


  
    if (!isBin && !isTxt) {
      alert("Please upload a .bin or .txt file.");
      return;
    }
  
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
      return;
    }
  
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert("Warning: The selected file is too large. Please choose a smaller file.");
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
    setResult3(null);
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

    try {
      if (isBin) {
        // BIN file logic (unchanged)
        const buffer = await selectedFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const binaryData = Array.from(bytes)
          .map(byte => byte.toString(2).padStart(8, '0'))
          .join('');
        setBinaryInput3(binaryData);
      } else if (isTxt) {
        // TXT file logic (newly added)
        const text = await selectedFile.text();
        const binaryString = text.replace(/[^01]/g, ''); // Keep only 0s and 1s
        if (binaryString.length === 0) {
          alert("The .txt file does not contain valid binary data (only 0s and 1s).");
          return;
        }
        setBinaryInput3(binaryString);
      }
    } catch (error) {
         
      alert("Failed to extract binary data from the file.");
      return;
    }
  

      // Remove previous Supabase row for line 3
      try {
        localStorage.setItem('resultFetchedFromSupabased3', 'false');
        const { error: deleteError } = await supabase
          .from('results3')
          .delete()
          .match({ line: 3, user_id: userId });

        setLoadingProgress3(0);
        if (deleteError) {

          return;
        }
      } catch (err) {
           
      }
        setIsEnabled3(false);

      // Reset the file input
      event.target.value = "";
  };


  const handleFileChange4 = async (event) => {
        setLoadingProgress4Gr(0);
   setLoadingProgress4Rep(0);
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


  
    if (!isBin && !isTxt) {
      alert("Please upload a .bin or .txt file.");
      return;
    }
  
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
    setResult4(null);
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

    try {
      if (isBin) {
        // BIN file logic (unchanged)
        const buffer = await selectedFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const binaryData = Array.from(bytes)
          .map(byte => byte.toString(2).padStart(8, '0'))
          .join('');
        setBinaryInput4(binaryData);
      } else if (isTxt) {
        // TXT file logic (newly added)
        const text = await selectedFile.text();
        const binaryString = text.replace(/[^01]/g, ''); // Keep only 0s and 1s
        if (binaryString.length === 0) {
          alert("The .txt file does not contain valid binary data (only 0s and 1s).");
          return;
        }
        setBinaryInput4(binaryString);
      }
    } catch (error) {
         
      alert("Failed to extract binary data from the file.");
      return;
    }
      // Remove previous Supabase row for line 4
      try {
        localStorage.setItem('resultFetchedFromSupabased4', 'false');
        const { error: deleteError } = await supabase
          .from('results3')
          .delete()
          .match({ line: 4, user_id: userId });

        setLoadingProgress4(0);
        if (deleteError) {

          return;
        }
      } catch (err) {
        
      }
        setIsEnabled4(false);

      // Reset the file input
      event.target.value = "";
  };


  const handleFileChange5 = async (event) => {
     setLoadingProgress5Gr(0);
   setLoadingProgress5Rep(0);
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


  
    if (!isBin && !isTxt) {
      alert("Please upload a .bin or .txt file.");
      return;
    }
  
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
    setResult5(null);
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

    try {
      if (isBin) {
        // BIN file logic (unchanged)
        const buffer = await selectedFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const binaryData = Array.from(bytes)
          .map(byte => byte.toString(2).padStart(8, '0'))
          .join('');
        setBinaryInput5(binaryData);
      } else if (isTxt) {
        // TXT file logic (newly added)
        const text = await selectedFile.text();
        const binaryString = text.replace(/[^01]/g, ''); // Keep only 0s and 1s
        if (binaryString.length === 0) {
          alert("The .txt file does not contain valid binary data (only 0s and 1s).");
          return;
        }
        setBinaryInput5(binaryString);
      }
    } catch (error) {
         
      alert("Failed to extract binary data from the file.");
      return;
    }

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
       
      }
        setIsEnabled5(false);

      // Reset the file input
      event.target.value = "";
  };


  useEffect(() => {
    const fetchStoredResults = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }
      try {
        const { data, error } = await supabase
          .from('results3') // Replace 'results' with your Supabase table name
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
                break;
              case 4:
                setBinaryInput4(row.binary_data);
                setScheduledTime4(row.scheduled_time);
                setResult4({ final_result: row.result });
                setFileName4(row.file_name);
                setUploadTime4(row.upload_time);
                setLoadingProgress3(row.progress);
                break;
              case 5:
                setBinaryInput5(row.binary_data);
                setScheduledTime5(row.scheduled_time);
                setResult5({ final_result: row.result });
                setFileName5(row.file_name);
                setUploadTime5(row.upload_time);
                setLoadingProgress4(row.progress);
                break;
              case 6:
                setBinaryInput6(row.binary_data);
                setScheduledTime6(row.scheduled_time);
                setResult6({ final_result: row.result });
                setFileName6(row.file_name);
                setUploadTime6(row.upload_time);
                setLoadingProgress6(row.progress);
                break;
              case 7:
                setBinaryInput7(row.binary_data);
                setScheduledTime7(row.scheduled_time);
                setResult7({ final_result: row.result });
                setFileName7(row.file_name);
                setUploadTime7(row.upload_time);
                setLoadingProgress7(row.progress);
                break;
              case 8:
                setBinaryInput8(row.binary_data);
                setScheduledTime8(row.scheduled_time);
                setResult8({ final_result: row.result });
                setFileName8(row.file_name);
                setUploadTime8(row.upload_time);
                setLoadingProgress8(row.progress);
                break;
              case 9:
                setBinaryInput9(row.binary_data);
                setScheduledTime9(row.scheduled_time);
                setResult9({ final_result: row.result });
                setFileName9(row.file_name);
                setUploadTime9(row.upload_time);
                setLoadingProgress9(row.progress);
                break;
              case 10:
                setBinaryInput10(row.binary_data);
                setScheduledTime10(row.scheduled_time);
                setResult10({ final_result: row.result });
                setFileName10(row.file_name);
                setUploadTime10(row.upload_time);
                setLoadingProgress10(row.progress);
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
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabase3') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgressRep, setLoadingProgressRep] = useState(0);
  const [loadingProgressGr, setLoadingProgressGr] = useState(0);

  const [loadingProgress2, setLoadingProgress2] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased2') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress2Rep, setLoadingProgress2Rep] = useState(0);
  const [loadingProgress2Gr, setLoadingProgress2Gr] = useState(0);

  const [loadingProgress3, setLoadingProgress3] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased3') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress3Rep, setLoadingProgress3Rep] = useState(0);
  const [loadingProgress3Gr, setLoadingProgress3Gr] = useState(0);

  const [loadingProgress4, setLoadingProgress4] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased4') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress4Rep, setLoadingProgress4Rep] = useState(0);
  const [loadingProgress4Gr, setLoadingProgress4Gr] = useState(0);

  const [loadingProgress5, setLoadingProgress5] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased5') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress5Rep, setLoadingProgress5Rep] = useState(0);
  const [loadingProgress5Gr, setLoadingProgress5Gr] = useState(0);

  const [loadingProgress6, setLoadingProgress6] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased6') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress6Rep, setLoadingProgress6Rep] = useState(0);
  const [loadingProgress6Gr, setLoadingProgress6Gr] = useState(0);

  const [loadingProgress7, setLoadingProgress7] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased7') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress7Rep, setLoadingProgress7Rep] = useState(0);
  const [loadingProgress7Gr, setLoadingProgress7Gr] = useState(0);

  const [loadingProgress8, setLoadingProgress8] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased8') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress8Rep, setLoadingProgress8Rep] = useState(0);
  const [loadingProgress8Gr, setLoadingProgress8Gr] = useState(0);

  const [loadingProgress9, setLoadingProgress9] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased9') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress9Rep, setLoadingProgress9Rep] = useState(0);
  const [loadingProgress9Gr, setLoadingProgress9Gr] = useState(0);

  const [loadingProgress10, setLoadingProgress10] = useState(() => {
    const isFetchedFromSupabase = localStorage.getItem('resultFetchedFromSupabased10') === 'true';
    return isFetchedFromSupabase ? 100 : 0;
  });
  const [loadingProgress10Rep, setLoadingProgress10Rep] = useState(0);
  const [loadingProgress10Gr, setLoadingProgress10Gr] = useState(0);




  const binaryInsertedRef = useRef(false); // 🔁 Track binary insert
  const binaryInsertedRef2 = useRef(false);
  const binaryInsertedRef3 = useRef(false);
  const binaryInsertedRef4 = useRef(false);
  const binaryInsertedRef5 = useRef(false);
  const binaryInsertedRef6 = useRef(false);
  const binaryInsertedRef7 = useRef(false);
  const binaryInsertedRef8 = useRef(false);
  const binaryInsertedRef9 = useRef(false);
  const binaryInsertedRef10 = useRef(false);


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

  let progressIntervalId;

  const resumeProgressCheck = async () => {
    const userId = await fetchUserId();
    if (!userId) return;

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
      localStorage.setItem('resultFetchedFromSupabase', 'true');
      setLoadingProgress(100);
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
        .from('results3')
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
         
          setLoadingProgress(100);
          setResult(response.data);
          localStorage.setItem("resultFetchedFromSupabase3", "true");
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


  const jobIdRef = useRef(null);
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

    let progressIntervalId;
  
    const resumeProgressCheck = async () => {
      const userId = await fetchUserId();
      if (!userId) return;
  
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
    if (!binaryInput2 || !debouncedScheduledTime2) return;

    
    const lineNo = 2;

    if (result2) {
      localStorage.setItem('resultFetchedFromSupabased2', 'true');
      setLoadingProgress2(100);
      return;
    }

    setLoadingProgress2(0);
    let progressIntervalId;

    const upsertProgress2 = async (progress, userId, result = null) => {
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

      await upsertProgress2(1, userId);

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
                setLoadingProgress2(100);
                   
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
         
          setLoadingProgress2(100);
          setResult2(response.data);
          localStorage.setItem("resultFetchedFromSupabase3", "true");
          await upsertProgress2(100, userId, response.data.final_result);
             
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
    if (!binaryInput3 || !debouncedScheduledTime3) return;

   
    const lineNo = 3;

    if (result3) {
      localStorage.setItem('resultFetchedFromSupabased2', 'true');
      setLoadingProgress3(100);
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

          binaryString = Array.from(fileBuffer)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');

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

      await upsertProgress(1, userId);

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
                setLoadingProgress3(100);
                   
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
         
          setLoadingProgress3(100);
          setResult3(response.data);
          localStorage.setItem("resultFetchedFromSupabase3", "true");
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
    if (!binaryInput4 || !debouncedScheduledTime4) return;

  
    const lineNo = 4;

    if (result4) {
      localStorage.setItem('resultFetchedFromSupabased2', 'true');
      setLoadingProgress4(100);
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

          binaryString = Array.from(fileBuffer)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');

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

      await upsertProgress(0, userId);

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
                setLoadingProgress4(100);
                   
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
         
          setLoadingProgress4(100);
          setResult4(response.data);
          localStorage.setItem("resultFetchedFromSupabase3", "true");
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
    if (!binaryInput5 || !debouncedScheduledTime5) return;

   
    const lineNo = 5;

    if (result5) {
      localStorage.setItem('resultFetchedFromSupabased2', 'true');
      setLoadingProgress5(100);
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

          binaryString = Array.from(fileBuffer)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');

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

      await upsertProgress(1, userId);

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
                setLoadingProgress5(100);
                   
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
         
          setLoadingProgress5(100);
          setResult5(response.data);
          localStorage.setItem("resultFetchedFromSupabase3", "true");
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


  const [binFile, setBinFile] = useState(null);   // will hold the generated .bin file
  const [binFile2, setBinFile2] = useState(null);
const [binFile3, setBinFile3] = useState(null);
const [binFile4, setBinFile4] = useState(null);
const [binFile5, setBinFile5] = useState(null);

  useEffect(() => {
    if (!binaryInput || binaryInput.length % 8 !== 0) {
    
      return;
    }

    // Step 1: Split binaryInput into 8-bit chunks
    const byteChunks = binaryInput.match(/.{8}/g); // each element is like "01000001"

    // Step 2: Convert chunks to characters using fromCharCode
    const byteString = byteChunks
      .map(bin => String.fromCharCode(parseInt(bin, 2))) // binary → number → char
      .join("");

    // Step 3: Create a Blob and File from the byteString
    const blob = new Blob([byteString], { type: "application/octet-stream" });
    const file = new File([blob], "output.bin", { type: "application/octet-stream" });

    setBinFile(file);
   

  }, [binaryInput]);

   useEffect(() => {
    if (!binaryInput2 || binaryInput2.length % 8 !== 0) {
     
      return;
    }

    // Step 1: Split binaryInput into 8-bit chunks
    const byteChunks = binaryInput2.match(/.{8}/g); // each element is like "01000001"

    // Step 2: Convert chunks to characters using fromCharCode
    const byteString = byteChunks
      .map(bin => String.fromCharCode(parseInt(bin, 2))) // binary → number → char
      .join("");

    // Step 3: Create a Blob and File from the byteString
    const blob = new Blob([byteString], { type: "application/octet-stream" });
    const file = new File([blob], "output.bin", { type: "application/octet-stream" });

    setBinFile2(file);
    

  }, [binaryInput2]);

   useEffect(() => {
    if (!binaryInput3 || binaryInput3.length % 8 !== 0) {
     
      return;
    }

    // Step 1: Split binaryInput into 8-bit chunks
    const byteChunks = binaryInput3.match(/.{8}/g); // each element is like "01000001"

    // Step 2: Convert chunks to characters using fromCharCode
    const byteString = byteChunks
      .map(bin => String.fromCharCode(parseInt(bin, 2))) // binary → number → char
      .join("");

    // Step 3: Create a Blob and File from the byteString
    const blob = new Blob([byteString], { type: "application/octet-stream" });
    const file = new File([blob], "output.bin", { type: "application/octet-stream" });

    setBinFile3(file);
    

  }, [binaryInput3]);
   useEffect(() => {
    if (!binaryInput4 || binaryInput4.length % 8 !== 0) {
     
      return;
    }

    // Step 1: Split binaryInput into 8-bit chunks
    const byteChunks = binaryInput4.match(/.{8}/g); // each element is like "01000001"

    // Step 2: Convert chunks to characters using fromCharCode
    const byteString = byteChunks
      .map(bin => String.fromCharCode(parseInt(bin, 2))) // binary → number → char
      .join("");

    // Step 3: Create a Blob and File from the byteString
    const blob = new Blob([byteString], { type: "application/octet-stream" });
    const file = new File([blob], "output.bin", { type: "application/octet-stream" });

    setBinFile4(file);
    

  }, [binaryInput4]);

   useEffect(() => {
    if (!binaryInput5 || binaryInput5.length % 8 !== 0) {
     
      return;
    }

    // Step 1: Split binaryInput into 8-bit chunks
    const byteChunks = binaryInput5.match(/.{8}/g); // each element is like "01000001"

    // Step 2: Convert chunks to characters using fromCharCode
    const byteString = byteChunks
      .map(bin => String.fromCharCode(parseInt(bin, 2))) // binary → number → char
      .join("");

    // Step 3: Create a Blob and File from the byteString
    const blob = new Blob([byteString], { type: "application/octet-stream" });
    const file = new File([blob], "output.bin", { type: "application/octet-stream" });

    setBinFile5(file);
   

  }, [binaryInput5]);

  const handleButtonClick = async(type) => {
    const userId = await fetchUserId();
    if (type === "report") {
      
      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("report_path")
      .eq("user_id", userId)
      .eq("line", 1)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.report_path) {
         

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("reports")
        .createSignedUrl(existingResult.report_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgressRep(100);
      return; // stop here, no need to regenerate
    }

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


      fetch(`${REACT_APP_BASE_URL}/pdf-report-dieharder/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.blob())
        .then(async(blob) => {
          setLoadingProgressRep(100);
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
            .from("results3")
            .update({ report_path: data.path })
            .eq("user_id", userId)   // condition 1
            .eq("line", 1)           // condition 2
          }
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgressRep(0);
        });
    }
    else if (type === "graph") {
   
      if (!selectedFile && !binFile) {
        alert("Please select a binary file before generating the graph.");
        return;
      }

   
      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("graph_path")
      .eq("user_id", userId)
      .eq("line", 1)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.graph_path) {
       

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("graphs")
        .createSignedUrl(existingResult.graph_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgressGr(100);
      return; // stop here, no need to regenerate
    }

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
        .then(async(blob) => {
          setLoadingProgressGr(100);
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT}.png`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("graphs")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist
            await supabase
              .from("results3")
              .update({ graph_path: data.path })
              .eq("user_id", userId)   // condition 1
              .eq("line", 1)           // condition 2

          }
        })
        .catch((error) => {
             
          clearInterval(progressInterval);
          setLoadingProgressGr(0);
          alert(`Error generating graph: ${error.message}`);
        });
    }
  };


  const handleButtonClick2 = async(type) => {
    const userId = await fetchUserId();
    if (type === "report") {
     
      let progressInterval;
      setLoadingProgress2Rep(0);

      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("report_path")
      .eq("user_id", userId)
      .eq("line", 2)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.report_path) {
         

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("reports")
        .createSignedUrl(existingResult.report_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgress2Rep(100);
      return; // stop here, no need to regenerate
    }


      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_ReportDieharder/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 30) * 100);

          setLoadingProgress2Rep(prev => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
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
        .then(async(blob) => {
          setLoadingProgress2Rep(100);
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT2}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("reports")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist in results table
            await supabase
            .from("results3")
            .update({ report_path: data.path })
            .eq("user_id", userId)   // condition 1
            .eq("line", 2)           // condition 2
          }
       
        })
        .catch((error) => {
             
          clearInterval(progressInterval);
          setLoadingProgress2Rep(0);
        });
    } else if (type === "graph") {
      if (!selectedFile2 && !binFile2) {
        alert("Please select a binary file before generating the graph.");
        return;
      }

      
      const { data: existingResult, error: fetchError } = await supabase
        .from("results3")
        .select("graph_path")
        .eq("user_id", userId)
        .eq("line", 2)
        .maybeSingle(); 

      if (fetchError) {
           
      }

      if (existingResult && existingResult.graph_path) {
         

        // ✅ 2. Get a signed URL for direct access
        const { data: signedUrlData, error: urlError } = await supabase.storage
          .from("graphs")
          .createSignedUrl(existingResult.graph_path, 60 * 5); // URL valid for 5 minutes

        if (urlError) {
     
          return;
        }

        // ✅ 3. Open the existing graph
        window.open(signedUrlData.signedUrl, "_blank");
        setLoadingProgress2Gr(100);
        return; // stop here, no need to regenerate
      }


      let progressInterval;
      setLoadingProgress2Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT2}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 22) * 100);
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
        .then(async(blob) => {
          setLoadingProgress2Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT2}.png`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("graphs")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist
            await supabase
              .from("results3")
              .update({ graph_path: data.path })
              .eq("user_id", userId)   // condition 1
              .eq("line", 2)           // condition 2

          }
        })
        .catch((error) => {

          clearInterval(progressInterval);
          setLoadingProgress2Gr(0);
        });

    }
  };

  const handleButtonClick3 = async(type) => {
    const userId = await fetchUserId();
    if (type === "report") {

      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("report_path")
      .eq("user_id", userId)
      .eq("line", 3)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.report_path) {
         

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("reports")
        .createSignedUrl(existingResult.report_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgress3Rep(100);
      return; // stop here, no need to regenerate
    }


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
        .then(async(blob) => {
          setLoadingProgress3Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT3}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("reports")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist in results table
            await supabase
            .from("results3")
            .update({ report_path: data.path })
            .eq("user_id", userId)   // condition 1
            .eq("line", 3)           // condition 2
          }
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress3Rep(0);
        });
    } else if (type === "graph") {
     
      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("graph_path")
      .eq("user_id", userId)
      .eq("line", 3)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.graph_path) {
       

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("graphs")
        .createSignedUrl(existingResult.graph_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgress3Gr(100);
      return; // stop here, no need to regenerate
    }


      let progressInterval;
      setLoadingProgress3Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT3}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 22) * 100);
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
        .then(async(blob) => {
          setLoadingProgress3Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT3}.png`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("graphs")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist
            await supabase
              .from("results")
              .update({ graph_path: data.path })
              .eq("user_id", userId)   // condition 1
              .eq("line", 3)           // condition 2

          }
        })
        .catch((error) => {

          clearInterval(progressInterval);
          setLoadingProgress3Gr(0);
        });

    }
  };

  const handleButtonClick4 = async(type) => {
    const userId = await fetchUserId();
    if (type === "report") {
    
      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("report_path")
      .eq("user_id", userId)
      .eq("line", 4)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.report_path) {
         

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("reports")
        .createSignedUrl(existingResult.report_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgress4Rep(100);
      return; // stop here, no need to regenerate
    }


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
        .then(async(blob) => {
          setLoadingProgress4Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT4}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("reports")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist in results table
            await supabase
            .from("results3")
            .update({ report_path: data.path })
            .eq("user_id", userId)   // condition 1
            .eq("line", 4)           // condition 2
          }
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
          const percent = Math.round((completed / 22) * 100);
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

  const handleButtonClick5 = async(type) => {
    const userId = await fetchUserId();
    if (type === "report") {
     
      let progressInterval;
      setLoadingProgress5Rep(0);

      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("report_path")
      .eq("user_id", userId)
      .eq("line", 5)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.report_path) {
         

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("reports")
        .createSignedUrl(existingResult.report_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgress5Rep(100);
      return; // stop here, no need to regenerate
    }

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
        .then(async(blob) => {
          setLoadingProgress5Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `report-${currentJobIdT5}.pdf`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("reports")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist in results table
            await supabase
            .from("results3")
            .update({ report_path: data.path })
            .eq("user_id", userId)   // condition 1
            .eq("line", 5)           // condition 2
          }
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress5Rep(0);
        });
    } else if (type === "graph") {
      
      const { data: existingResult, error: fetchError } = await supabase
      .from("results3")
      .select("report_path")
      .eq("user_id", userId)
      .eq("line", 5)
      .maybeSingle(); 

    if (fetchError) {
         
    }

    if (existingResult && existingResult.report_path) {
         

      // ✅ 2. Get a signed URL for direct access
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("reports")
        .createSignedUrl(existingResult.report_path, 60 * 5); // URL valid for 5 minutes

      if (urlError) {
   
        return;
      }

      // ✅ 3. Open the existing graph
      window.open(signedUrlData.signedUrl, "_blank");
      setLoadingProgress5Rep(100);
      return; // stop here, no need to regenerate
    }

      let progressInterval;
      setLoadingProgress5Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(`${REACT_APP_BASE_URL}/get_progress_graphDieharder/${currentJobIdT5}`);
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 22) * 100);
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
        .then(async(blob) => {
          setLoadingProgress5Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");

          const fileName = `graph-${currentJobIdT5}.png`;
          const file = new File([blob], fileName, { type: blob.type });

          const { data, error } = await supabase.storage
            .from("graphs")
            .upload(`jobs/${fileName}`, file, { upsert: false });

          if (error) {
               
          } else {
               

            // ✅ Only save columns that exist
            await supabase
              .from("results3")
              .update({ graph_path: data.path })
              .eq("user_id", userId)   // condition 1
              .eq("line", 5)           // condition 2

          }

        })
        .catch((error) => {

          clearInterval(progressInterval);
          setLoadingProgress5Gr(0);
        });

    }
  };

  const handleDownloadOutput = async () => {
    const jobId = jobIdRef.current;

    if (!jobId) {
        
      return;
    }
    const url = `${REACT_APP_BASE_URL}/get_output_dieharder/${currentJobIdT}/`;
    try {
      const response = await axios.get(url);
      const outputText = response.data.output;

      const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `dieharder_output_${jobId}.txt`);
    } catch (error) {
         
    }
  };
  const handleDownloadOutput2 = async () => {
    const jobId = jobIdRef2.current;

    if (!jobId) {
        
      return;
    }
    const url = `${REACT_APP_BASE_URL}/get_output_dieharder/${jobId}/`;
    try {
      const response = await axios.get(url);
      const outputText = response.data.output;

      const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `dieharder_output_${jobId}.txt`);
    } catch (error) {
         
    }
  };
  const handleDownloadOutput3 = async () => {
    const jobId = jobIdRef3.current;

    if (!jobId) {
        
      return;
    }
    const url = `${REACT_APP_BASE_URL}/get_output_dieharder/${jobId}/`;
    try {
      const response = await axios.get(url);
      const outputText = response.data.output;

      const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `dieharder_output_${jobId}.txt`);
    } catch (error) {
         
    }
  };
  const handleDownloadOutput4 = async () => {
    const jobId = jobIdRef4.current;

    if (!jobId) {
        
      return;
    }
    const url = `${REACT_APP_BASE_URL}/get_output_dieharder/${jobId}/`;
    try {
      const response = await axios.get(url);
      const outputText = response.data.output;

      const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `dieharder_output_${jobId}.txt`);
    } catch (error) {
         
    }
  };
  const handleDownloadOutput5 = async () => {
    const jobId = jobIdRef5.current;

    if (!jobId) {
        
      return;
    }
    const url = `${REACT_APP_BASE_URL}/get_output_dieharder/${jobId}/`;
    try {
      const response = await axios.get(url);
      const outputText = response.data.output;

      const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `dieharder_output_${jobId}.txt`);
    } catch (error) {
         
    }
  };

  return (
    <Box m="20px">
      {/* Header Section */}
      <Header title="Dieharder Tests" />
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
                      Upload binary file
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

                {/* Display Combined Scheduled Time */}
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
                      Upload binary file
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
                        {loadingProgress6Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress6Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress6Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress6Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        {loadingProgress6Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress6Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress6Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress6Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress6Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput6}
                      disabled={loadingProgress6 < 100}
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
                      Upload binary file
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
                        {loadingProgress7Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress7Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress7Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress7Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        {loadingProgress7Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress7Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress7Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress7Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress7Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput7}
                      disabled={loadingProgress7 < 100}
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
                      Upload binary file
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
                        {loadingProgress8Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress8Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress8Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress8Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        {loadingProgress8Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress8Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress8Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress8Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress8Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput8}
                      disabled={loadingProgress8 < 100}
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
                      Upload binary file
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
                        {loadingProgress9Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress9Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress9Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress9Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        {loadingProgress9Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress9Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress9Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress9Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress9Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput9}
                      disabled={loadingProgress9 < 100}
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
                      Upload binary file
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
                        {loadingProgress10Gr <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.blueAccent[800],
                              width: `${loadingProgress10Gr}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress10Gr > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress10Gr > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',
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
                        {loadingProgress10Rep <= 100 && (
                          <Box
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: '3px',
                              backgroundColor: colors.greenAccent[500],
                              width: `${loadingProgress10Rep}%`,
                              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              borderRadius: '0 0 8px 8px',
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
                            transform: loadingProgress10Rep > 0 ? 'scale(1)' : 'scale(0)',
                            opacity: loadingProgress10Rep > 0 ? 1 : 0,
                            transition: 'all 0.3s ease',
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
                              position: 'absolute',
                              fontSize: '0.75rem',

                            }}
                          >
                            {loadingProgress10Rep}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleDownloadOutput10}
                      disabled={loadingProgress10 < 100}
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
          background: "linear-gradient(135deg, #1F2A40 30%, #29314F 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "250px",
          textAlign: "center",

          mt: 2,
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
           window.open(`${REACT_APP_FRONTEND_URL}/report`, "_blank");
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
    </Box>
  );
};

export default Dieharder_tests;
