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

const MAX_STACK_SIZE_ESTIMATE = 1 * 1024 * 1024;

const Nist_tests90b = () => {
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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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
    }, 2000); // Wait 500ms after the user stops typing

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

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
  const handleFileUpload2 = () => {
    fileInputRef2.current.click();
  };
  const handleFileUpload3 = () => {
    fileInputRef3.current.click();
  };
  const handleFileUpload4 = () => {
    fileInputRef4.current.click();
  };
  const handleFileUpload5 = () => {
    fileInputRef5.current.click();
  };
  const handleFileUpload6 = () => {
    fileInputRef6.current.click();
  };
  const handleFileUpload7 = () => {
    fileInputRef7.current.click();
  };
  const handleFileUpload8 = () => {
    fileInputRef8.current.click();
  };
  const handleFileUpload9 = () => {
    fileInputRef_nine.current.click();
  };
  const handleFileUpload10 = () => {
    fileInputRef10.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }

    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput(textData);

      // Store the current time when the file is uploaded
      const currentTime = new Date().toLocaleTimeString();
      setUploadTime(currentTime); // Update the state with the current time

      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange2 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName2(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput2(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime2(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange3 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName3(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput3(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime3(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange4 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected
    setFileName4(selectedFile.name);
    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput4(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime4(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange5 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName5(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput5(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime5(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange6 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName6(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput6(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime6(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange7 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName7(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput7(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime7(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange8 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName8(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput8(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime8(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange9 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName9(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput9(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime9(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange10 = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return; // Handle cases where no file is selected

    if (selectedFile.size > MAX_STACK_SIZE_ESTIMATE) {
      alert(
        "Warning: The selected file is too large. Please choose a smaller file."
      );
      return;
    }
    setFileName10(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const byteArray = new Uint8Array(binaryData);
      const decoder = new TextDecoder();
      const textData = decoder.decode(byteArray).trim();

      // Update binaryInput state with new binary data
      setBinaryInput10(textData);

      const currentTime = new Date().toLocaleTimeString();
      setUploadTime10(currentTime);
      // Reset the file input value to allow the same file to be uploaded again
      event.target.value = "";
    };
    reader.readAsArrayBuffer(selectedFile);
  };

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
  const [loadingProgress6, setLoadingProgress6] = useState(0);
  const [loadingProgress6Rep, setLoadingProgress6Rep] = useState(0);
  const [loadingProgress6Gr, setLoadingProgress6Gr] = useState(0);
  const [loadingProgress7, setLoadingProgress7] = useState(0);
  const [loadingProgress7Rep, setLoadingProgress7Rep] = useState(0);
  const [loadingProgress7Gr, setLoadingProgress7Gr] = useState(0);
  const [loadingProgress8, setLoadingProgress8] = useState(0);
  const [loadingProgress8Rep, setLoadingProgress8Rep] = useState(0);
  const [loadingProgress8Gr, setLoadingProgress8Gr] = useState(0);
  const [loadingProgress9, setLoadingProgress9] = useState(0);
  const [loadingProgress9Rep, setLoadingProgress9Rep] = useState(0);
  const [loadingProgress9Gr, setLoadingProgress9Gr] = useState(0);
  const [loadingProgress10, setLoadingProgress10] = useState(0);
  const [loadingProgress10Rep, setLoadingProgress10Rep] = useState(0);
  const [loadingProgress10Gr, setLoadingProgress10Gr] = useState(0);

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
    console.log(scheduledTime);
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

  useEffect(() => {
    if (!binaryInput || !debouncedScheduledTime) return; // Do not fetch if binaryInput is empty

    const fetchResult = async () => {
      setLoadingProgress(0); // Start loading from 0%
      const jobId = uuidv4();
      let progressInterval;

      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);

            setLoadingProgress(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput,
            scheduled_time: debouncedScheduledTime,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress(100); // Set progress to 100% after response is received
        setResult(response.data); // Set the result data
      } catch (error) {
        console.error("Error executing generating final answer:", error);
        clearInterval(progressInterval);
        setLoadingProgress(0); // Reset progress in case of failure
      }
    };

    fetchResult();
  }, [binaryInput, debouncedScheduledTime]);

  useEffect(() => {
    if (!binaryInput2 || !debouncedScheduledTime2) return; // Do not fetch if input is invalid

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique jobId
      setLoadingProgress2(0); // Start progress at 0%
      let progressInterval;

      try {
        // Start polling backend for progress every second
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress2(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Start the job on the backend, include the job_id in request
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput2,
            scheduled_time: debouncedScheduledTime2,
            job_id: jobId, // ✅ Send jobId to backend
          }
        );

        clearInterval(progressInterval); // Stop progress polling
        setLoadingProgress2(100); // Set progress to 100% on completion
        setResult2(response.data); // Store the result
      } catch (error) {
        console.error("Error executing generating final answer:", error);
        clearInterval(progressInterval);
        setLoadingProgress2(0); // Reset progress on error
      }
    };

    fetchResult();
  }, [binaryInput2, debouncedScheduledTime2]);

  useEffect(() => {
    if (!binaryInput3 || !debouncedScheduledTime3) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress3(0); // Start progress at 0%
      let progressInterval;

      try {
        // Start polling progress from backend
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress3(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Trigger backend test execution with jobId
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput3,
            scheduled_time: debouncedScheduledTime3,
            job_id: jobId, // Important for backend to track this job
          }
        );

        clearInterval(progressInterval); // Stop polling
        setLoadingProgress3(100); // Set to 100% on completion
        setResult3(response.data); // Save the response
      } catch (error) {
        console.error("Error generating final answer:", error);
        clearInterval(progressInterval);
        setLoadingProgress3(0); // Reset progress on error
      }
    };

    fetchResult();
  }, [binaryInput3, debouncedScheduledTime3]);

  useEffect(() => {
    if (!binaryInput4 || !debouncedScheduledTime4) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress4(0);
      let progressInterval;

      try {
        // Start polling backend progress
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress4(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Make request to generate final answer with job ID
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput4,
            scheduled_time: debouncedScheduledTime4,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval);
        setLoadingProgress4(100); // Set to full on completion
        setResult4(response.data); // Save backend response
      } catch (error) {
        clearInterval(progressInterval);
        setLoadingProgress4(0);
        console.error("Error generating final answer:", error);
      }
    };

    fetchResult();
  }, [binaryInput4, debouncedScheduledTime4]);

  useEffect(() => {
    if (!binaryInput5 || !debouncedScheduledTime5) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress5(0);
      let progressInterval;

      try {
        // Start polling backend for progress
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress5(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Send POST request to trigger analysis
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput5,
            scheduled_time: debouncedScheduledTime5,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval); // Stop polling
        setLoadingProgress5(100); // Mark as complete
        setResult5(response.data); // Store result
      } catch (error) {
        clearInterval(progressInterval); // Ensure interval is cleared
        setLoadingProgress5(0); // Reset on failure
        console.error("Error generating final answer:", error);
      }
    };

    fetchResult();
  }, [binaryInput5, debouncedScheduledTime5]);

  useEffect(() => {
    if (!binaryInput6 || !debouncedScheduledTime6) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress6(0);
      let progressInterval;

      try {
        // Start polling backend for progress
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress6(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Send request to start the processing
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput6,
            scheduled_time: debouncedScheduledTime6,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval); // Stop polling
        setLoadingProgress6(100); // Mark complete
        setResult6(response.data); // Store result
      } catch (error) {
        clearInterval(progressInterval); // Ensure cleanup on error
        setLoadingProgress6(0);
        console.error("Error generating final answer:", error);
      }
    };

    fetchResult();
  }, [binaryInput6, debouncedScheduledTime6]);

  useEffect(() => {
    if (!binaryInput7 || !debouncedScheduledTime7) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress7(0);
      let progressInterval;

      try {
        // Start polling the backend for progress
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress7(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Send POST request to trigger final result generation
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput7,
            scheduled_time: debouncedScheduledTime7,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval);
        setLoadingProgress7(100); // Set to complete
        setResult7(response.data);
      } catch (error) {
        clearInterval(progressInterval);
        setLoadingProgress7(0);
        console.error("Error executing generating final answer:", error);
      }
    };

    fetchResult();
  }, [binaryInput7, debouncedScheduledTime7]);

  useEffect(() => {
    if (!binaryInput8 || !debouncedScheduledTime8) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress8(0);
      let progressInterval;

      try {
        // Start polling the backend for progress
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress8(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Send POST request to trigger final result generation
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput8,
            scheduled_time: debouncedScheduledTime8,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval);
        setLoadingProgress8(100); // Set to complete
        setResult8(response.data);
      } catch (error) {
        clearInterval(progressInterval);
        setLoadingProgress8(0);
        console.error("Error executing generating final answer:", error);
      }
    };

    fetchResult();
  }, [binaryInput8, debouncedScheduledTime8]);

  useEffect(() => {
    if (!binaryInput9 || !debouncedScheduledTime9) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress9(0);
      let progressInterval;

      try {
        // Start polling the backend for progress
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress9(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Send POST request to trigger final result generation
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput9,
            scheduled_time: debouncedScheduledTime9,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval);
        setLoadingProgress9(100); // Set to complete
        setResult9(response.data);
      } catch (error) {
        clearInterval(progressInterval);
        setLoadingProgress9(0);
        console.error("Error executing generating final answer:", error);
      }
    };

    fetchResult();
  }, [binaryInput9, debouncedScheduledTime9]);

  useEffect(() => {
    if (!binaryInput10 || !debouncedScheduledTime10) return;

    const fetchResult = async () => {
      const jobId = uuidv4(); // Generate unique job ID
      setLoadingProgress10(0);
      let progressInterval;

      try {
        // Start polling the backend for progress
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(
              `http://localhost:8000/get_progress90b/${jobId}`
            );
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 10) * 100);
            setLoadingProgress10(percent);
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        // Send POST request to trigger final result generation
        const response = await axios.post(
          "http://localhost:8000/generate_final_ans_nist90b/",
          {
            binary_data: binaryInput10,
            scheduled_time: debouncedScheduledTime10,
            job_id: jobId,
          }
        );

        clearInterval(progressInterval);
        setLoadingProgress10(100); // Set to complete
        setResult10(response.data);
      } catch (error) {
        clearInterval(progressInterval);
        setLoadingProgress10(0);
        console.error("Error executing generating final answer:", error);
      }
    };

    fetchResult();
  }, [binaryInput10, debouncedScheduledTime10]);

  const handleButtonClick = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgressRep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgressRep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgressRep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
         alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgressRep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgressGr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgressGr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
         
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgressGr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          
          clearInterval(progressInterval);
          setLoadingProgressGr(0);
        });
    }
  };

  const handleButtonClick2 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress2Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress2Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput2,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress2Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress2Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress2Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress2Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
        
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput2,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress2Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
         
          clearInterval(progressInterval);
          setLoadingProgress2Gr(0);
        });
    }
  };

  const handleButtonClick3 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress3Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress3Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput3,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress3Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress3Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress3Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress3Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
         
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput3,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress3Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
        
          clearInterval(progressInterval);
          setLoadingProgress3Gr(0);
        });
    }
  };

  const handleButtonClick4 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress4Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress4Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput4,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress4Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress4Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress4Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress4Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
         
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput4,
          job_id: currentJobId,
        }),
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

  const handleButtonClick5 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress5Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress5Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput5,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress5Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress5Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress5Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress5Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
         
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput5,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress5Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
         
          clearInterval(progressInterval);
          setLoadingProgress5Gr(0);
        });
    }
  };

  const handleButtonClick6 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress6Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress6Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput6,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress6Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress6Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress6Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress6Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
         
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput6,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress6Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
         
          clearInterval(progressInterval);
          setLoadingProgress6Gr(0);
        });
    }
  };

  const handleButtonClick7 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress7Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress7Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput7,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress7Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress7Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress7Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress7Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
        
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput7,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress7Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
      
          clearInterval(progressInterval);
          setLoadingProgress7Gr(0);
        });
    }
  };

  const handleButtonClick8 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress8Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress8Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput8,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress8Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress8Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress8Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress8Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
        
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput8,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress8Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
       
          clearInterval(progressInterval);
          setLoadingProgress8Gr(0);
        });
    }
  };

  const handleButtonClick9 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress9Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress9Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput9,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress9Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress9Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress9Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress9Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
         
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput9,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress9Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
       
          clearInterval(progressInterval);
          setLoadingProgress9Gr(0);
        });
    }
  };

  const handleButtonClick10 = (type) => {
    if (type === "report") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress10Rep(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_nist90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);

          setLoadingProgress10Rep((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          alert(`Error: ${err}`);
        }
      }, 1000);

      fetch("http://localhost:8000/pdf-report-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput10,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress10Rep(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          clearInterval(progressInterval);
          setLoadingProgress10Rep(0);
        });
    } else if (type === "graph") {
      const currentJobId = uuidv4();
      let progressInterval;
      setLoadingProgress10Gr(0);

      progressInterval = setInterval(async () => {
        try {
          const progressRes = await fetch(
            `http://localhost:8000/get_progress_graph90b/${currentJobId}`
          );
          const progressData = await progressRes.json();
          const completed = progressData.progress || 0;
          const percent = Math.round((completed / 11) * 100);
          setLoadingProgress10Gr((prev) => (percent > prev ? percent : prev)); // Prevent regress
        } catch (err) {
          
        }
      }, 1000);

      fetch("http://localhost:8000/graph-generation-nist90b/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          binary_data: binaryInput10,
          job_id: currentJobId,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setLoadingProgress10Gr(100); // Done
          clearInterval(progressInterval);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
        
          clearInterval(progressInterval);
          setLoadingProgress10Gr(0);
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
                      onClick={handleFileUpload2}
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
                      onClick={handleFileUpload3}
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
                      onClick={handleFileUpload4}
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
                      onClick={handleFileUpload5}
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
              {/* <td>{binaryInput}</td> */}
            </tr>

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

                {/* Time Input */}
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

                {/* Display Combined Scheduled Time */}
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

                {/* Time Input */}
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

                {/* Display Combined Scheduled Time */}
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

                {/* Time Input */}
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

                {/* Display Combined Scheduled Time */}
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

                {/* Time Input */}
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
                {/* Display Combined Scheduled Time */}
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

                {/* Time Input */}
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
                {/* Display Combined Scheduled Time */}
                <Typography variant="body2" mt={0.5} sx={{ color: "#4CCEAC" }}>
                  Scheduled Time: {scheduledTime10 || "Not set"}
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

          mt: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
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
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
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
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
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
            "&:hover": {
              transform: "scale(1.1) rotate(5deg)",
            },
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
            "&:hover": {
              backgroundColor: "#F77F00",
              transform: "scale(1.05)",
              boxShadow: "0px 8px 20px rgba(255, 99, 71, 0.6)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transition: "all 0.7s ease",
              zIndex: -1,
            },
            "&:hover::before": {
              left: "100%",
            },
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
            background:
              "radial-gradient(circle at center, rgba(230, 57, 70, 0.1) 0%, transparent 70%)",
            opacity: 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
            "&:hover": {
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Nist_tests90b;
