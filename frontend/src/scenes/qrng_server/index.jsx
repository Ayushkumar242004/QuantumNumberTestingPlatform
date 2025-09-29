import { Box, Typography, useTheme, TextField, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Make sure axios is imported
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { v4 as uuidv4 } from 'uuid';

const MAX_STACK_SIZE_ESTIMATE = 1 * 1024 * 1024;

const Qrng_Server = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const REACT_APP_PROXY_URL = process.env.REACT_APP_PROXY_URL;
const REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

  const [binaryInput, setBinaryInput] = useState(""); // State to store fetched binary data
  const [binaryInput2, setBinaryInput2] = useState(""); // State to store fetched binary data
  const [binaryInput3, setBinaryInput3] = useState(""); // State to store fetched binary data
  const [binaryInput4, setBinaryInput4] = useState(""); // State to store fetched binary data
  const [binaryInput5, setBinaryInput5] = useState(""); // State to store fetched binary data

  const [isFetching, setIsFetching] = useState(false); // Fetching status
  const [isFetching2, setIsFetching2] = useState(false); // Fetching status
  const [isFetching3, setIsFetching3] = useState(false); // Fetching status
  const [isFetching4, setIsFetching4] = useState(false); // Fetching status
  const [isFetching5, setIsFetching5] = useState(false); // Fetching status

  const [length, setLength] = useState(8);
  const [length2, setLength2] = useState(8);
  const [length3, setLength3] = useState(8);
  const [length4, setLength4] = useState(8);
  const [length5, setLength5] = useState(8);

  const [resultNIST, setResultNIST] = useState(null);
  const [resultDieharder, setResultDieharder] = useState(null);
  const [resultNIST2, setResultNIST2] = useState(null);
  const [resultDieharder2, setResultDieharder2] = useState(null);
  const [resultNIST3, setResultNIST3] = useState(null);
  const [resultDieharder3, setResultDieharder3] = useState(null);
  const [resultNIST4, setResultNIST4] = useState(null);
  const [resultDieharder4, setResultDieharder4] = useState(null);
  const [resultNIST5, setResultNIST5] = useState(null);
  const [resultDieharder5, setResultDieharder5] = useState(null);

  const intervalRef = useRef(null);
  const intervalRef2 = useRef(null);
  const intervalRef3 = useRef(null);
  const intervalRef4 = useRef(null);
  const intervalRef5 = useRef(null);

  const [selectedServer, setSelectedServer] = useState("Server 1"); // State for selected server
  const [selectedServer2, setSelectedServer2] = useState("Server 1"); // State for selected server
  const [selectedServer3, setSelectedServer3] = useState("Server 1"); // State for selected server
  const [selectedServer4, setSelectedServer4] = useState("Server 1"); // State for selected server
  const [selectedServer5, setSelectedServer5] = useState("Server 1"); // State for selected server

  const [scheduledTime, setScheduledTime] = useState("2025-04-10 11:31:08");
  const [scheduledTime2, setScheduledTime2] = useState("2025-04-10 11:31:08");
  const [scheduledTime3, setScheduledTime3] = useState("2025-04-10 11:31:08");
  const [scheduledTime4, setScheduledTime4] = useState("2025-04-10 11:31:08");
  const [scheduledTime5, setScheduledTime5] = useState("2025-04-10 11:31:08");

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingProgressn, setLoadingProgressn] = useState(0);
  const [loadingProgress2, setLoadingProgress2] = useState(0);
  const [loadingProgress2n, setLoadingProgress2n] = useState(0);
  const [loadingProgress3, setLoadingProgress3] = useState(0);
  const [loadingProgress3n, setLoadingProgress3n] = useState(0);
  const [loadingProgress4, setLoadingProgress4] = useState(0);
  const [loadingProgress4n, setLoadingProgress4n] = useState(0);
  const [loadingProgress5, setLoadingProgress5] = useState(0);
  const [loadingProgress5n, setLoadingProgress5n] = useState(0);

  const [ipAddress, setIpAddress] = useState("");
  const [hostNumber, setHostNumber] = useState("");

  // Handle server selection change
  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };
  const handleServerChange2 = (event) => {
    setSelectedServer2(event.target.value);
  };
  const handleServerChange3 = (event) => {
    setSelectedServer3(event.target.value);
  };
  const handleServerChange4 = (event) => {
    setSelectedServer4(event.target.value);
  };
  const handleServerChange5 = (event) => {
    setSelectedServer5(event.target.value);
  };

  const startFetching = () => {
    if (!isFetching) {

      setIsFetching(true);
      handleConnect();
    }
  };
  const startFetching2 = () => {
    if (!isFetching2) {
         
      setIsFetching2(true);
      fetchRandomNumber2();
    }
  };
  const startFetching3 = () => {
    if (!isFetching3) {
         
      setIsFetching3(true);
      fetchRandomNumber3();
    }
  };
  const startFetching4 = () => {
    if (!isFetching4) {
         
      setIsFetching4(true);
      fetchRandomNumber4();
    }
  };
  const startFetching5 = () => {
    if (!isFetching5) {
         
      setIsFetching5(true);
      fetchRandomNumber5();
    }
  };




  useEffect(() => {
    if (isFetching) {
      if (loadingProgress === 100 && loadingProgressn === 100) {
        handleConnect(); // Fetch again only when both progress bars are 100
      }
    } else {
      clearInterval(intervalRef.current); // optional cleanup
    }

    return () => clearInterval(intervalRef.current);
  }, [isFetching, loadingProgress, loadingProgressn]);


  useEffect(() => {
    if (isFetching2) {

      if (loadingProgress2 === 100 && loadingProgress2n === 100) {
    
        fetchRandomNumber2(); // Fetch again only when both progress bars are 100
      }

    } else {
      clearInterval(intervalRef2.current);
    }

    return () => clearInterval(intervalRef2.current);
  }, [isFetching2, loadingProgress2, loadingProgress2n]);

  useEffect(() => {
    if (isFetching3) {

      if (loadingProgress3 === 100 && loadingProgress3n === 100) {

        fetchRandomNumber3(); // Fetch again only when both progress bars are 100
      }
    } else {
      clearInterval(intervalRef3.current);
    }

    return () => clearInterval(intervalRef3.current);
  }, [isFetching3, loadingProgress3, loadingProgress3n]);

  useEffect(() => {
    if (isFetching4) {

      if (loadingProgress4 === 100 && loadingProgress4n === 100) {
       
        fetchRandomNumber4(); // Fetch again only when both progress bars are 100
      }
    } else {
      clearInterval(intervalRef4.current);
    }

    return () => clearInterval(intervalRef4.current);
  }, [isFetching4, loadingProgress4, loadingProgress4n]);

  useEffect(() => {
    if (isFetching5) {

      if (loadingProgress5 === 100 && loadingProgress5n === 100) {

        fetchRandomNumber5(); // Fetch again only when both progress bars are 100
      }
    } else {
      clearInterval(intervalRef5.current);
    }

    return () => clearInterval(intervalRef5.current);
  }, [isFetching5, loadingProgress5, loadingProgress5n]);

  // Stop fetching binary data
  const stopFetching = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsFetching(false);
  };

  const stopFetching2 = () => {
    if (intervalRef2.current) {
      clearInterval(intervalRef2.current);
      intervalRef2.current = null;
    }
    setIsFetching2(false);
  };
  const stopFetching3 = () => {
    if (intervalRef3.current) {
      clearInterval(intervalRef3.current);
      intervalRef3.current = null;
    }
    setIsFetching3(false);
  };
  const stopFetching4 = () => {
    if (intervalRef4.current) {
      clearInterval(intervalRef4.current);
      intervalRef4.current = null;
    }
    setIsFetching4(false);
  };
  const stopFetching5 = () => {
    if (intervalRef5.current) {
      clearInterval(intervalRef5.current);
      intervalRef5.current = null;
    }
    setIsFetching5(false);
  };

  useEffect(() => {
    return () => stopFetching();
  }, []);
  useEffect(() => {
    return () => stopFetching2();
  }, []);
  useEffect(() => {
    return () => stopFetching3();
  }, []);
  useEffect(() => {
    return () => stopFetching4();
  }, []);
  useEffect(() => {
    return () => stopFetching5();
  }, []);

  const fetchRandomNumber = async () => {
   
    // Default values for internal variables
    const API_Key = "6625a404-fcf7-aa22-595f-1ce908fc5ebb";
    const APISalt = "$2a$04$nArWqsGVKLmYJ3ob48c2/.fL8hULjZTJLWdtTEstM4Ss8oqagInmu";
    const Rand_type = 1; // Request binary data
    const Length = length || 8; // If length is not provided, use the passed value or default to 64
    
    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        API_Key,
        APISalt,
        Rand_type,
        Length,
      });
      
      if (response.data?.random) {
        const randomValue = response.data.random; // extract random binary
        setBinaryInput(randomValue);
        

      } else {
       
      }
    } catch (error) {
      alert("Error: server down");
      setBinaryInput(""); // Optionally handle the error state
    }
    
  };

  const fetchRandomNumber2 = async () => {

    const API_Key = "6625a404-fcf7-aa22-595f-1ce908fc5ebb";
    const APISalt = "$2a$04$nArWqsGVKLmYJ3ob48c2/.fL8hULjZTJLWdtTEstM4Ss8oqagInmu";
    const Rand_type = 1;
    const Length = length2 || 8;

    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        API_Key,
        APISalt,
        Rand_type,
        Length,
      });


      if (response.data?.random) {
        setBinaryInput2(response.data.random); // Update the state with random binary data

      } else {
           
      }
    } catch (error) {
      alert("Error: server down");
      setBinaryInput(""); // Optionally handle the error state
    }
  };

  const fetchRandomNumber3 = async () => {

    const API_Key = "6625a404-fcf7-aa22-595f-1ce908fc5ebb";
    const APISalt = "$2a$04$nArWqsGVKLmYJ3ob48c2/.fL8hULjZTJLWdtTEstM4Ss8oqagInmu";
    const Rand_type = 1; // Request binary data
    const Length = length3 || 8;
    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        API_Key,
        APISalt,
        Rand_type,
        Length,
      });

      if (response.data?.random) {
        setBinaryInput3(response.data.random); // Update the state with random binary data
      } else {
           
      }
    } catch (error) {
      alert("Error: server down");
      setBinaryInput(""); // Optionally handle the error state
    }

  };

  const fetchRandomNumber4 = async () => {

    const API_Key = "6625a404-fcf7-aa22-595f-1ce908fc5ebb";
    const APISalt = "$2a$04$nArWqsGVKLmYJ3ob48c2/.fL8hULjZTJLWdtTEstM4Ss8oqagInmu";
    const Rand_type = 1; // Request binary data
    const Length = length4 || 8;

    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        API_Key,
        APISalt,
        Rand_type,
        Length,
      });

      if (response.data?.random) {
        setBinaryInput4(response.data.random); // Update the state with random binary data
      } else {
           
      }
    } catch (error) {
      alert("Error: server down");
      setBinaryInput(""); // Optionally handle the error state
    }

  };

  const fetchRandomNumber5 = async () => {

    const API_Key = "6625a404-fcf7-aa22-595f-1ce908fc5ebb";
    const APISalt = "$2a$04$nArWqsGVKLmYJ3ob48c2/.fL8hULjZTJLWdtTEstM4Ss8oqagInmu";
    const Rand_type = 1; // Request binary data
    const Length = length5 || 8;
    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        API_Key,
        APISalt,
        Rand_type,
        Length,
      });

      if (response.data?.random) {
        setBinaryInput5(response.data.random); // Update the state with random binary data
      } else {
           
      }
    } catch (error) {
      alert("Error: server down");
      setBinaryInput(""); // Optionally handle the error state
    }
  };
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isSaveEnabled2, setIsSaveEnabled2] = useState(false);
  const [isSaveEnabled3, setIsSaveEnabled3] = useState(false);
  const [isSaveEnabled4, setIsSaveEnabled4] = useState(false);
  const [isSaveEnabled5, setIsSaveEnabled5] = useState(false);

  const saveBinaryNumber = async () => {
    // Use the binaryInput state which holds the fetched binary data
    const binaryNumber = binaryInput;
    if (!binaryNumber) {
      return;
    }
    try {
      // Fetch the username from the API

      const username = localStorage.getItem("username");

      // Format the current date and time
      const now = new Date();
      const formattedDate = `${now.getFullYear()}_${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}_${now.getDate().toString().padStart(2, "0")}`;
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}_${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}_${now.getSeconds().toString().padStart(2, "0")}`;

      // Combine to form the filename
      const fileName = `${username}_${formattedDate}_${formattedTime}.txt`;

      // Create a Blob with the binary number
      const blob = new Blob([binaryNumber], { type: "text/plain" });

      // Create a link element to trigger the file download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Filename for the downloaded file
      
      
      // Programmatically click the link to trigger the download
      link.click();
        alert("Binary Number saved")
      // Clean up the URL object after the download is triggered
      URL.revokeObjectURL(link.href);
    } catch (error) {
         
      alert("Failed to fetch username or save file.");
    }
  };

  const saveBinaryNumber2 = async () => {
    // Use the binaryInput state which holds the fetched binary data
    const binaryNumber = binaryInput2;

    if (!binaryNumber) {
      return;
    }

    try {
      // Fetch the username from the API

      const username = localStorage.getItem("username");

      // Format the current date and time
      const now = new Date();
      const formattedDate = `${now.getFullYear()}_${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}_${now.getDate().toString().padStart(2, "0")}`;
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}_${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}_${now.getSeconds().toString().padStart(2, "0")}`;

      // Combine to form the filename
      const fileName = `${username}_${formattedDate}_${formattedTime}.txt`;

      // Create a Blob with the binary number
      const blob = new Blob([binaryNumber], { type: "text/plain" });

      // Create a link element to trigger the file download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Filename for the downloaded file

      // Programmatically click the link to trigger the download
      link.click();
      alert("Binary Number saved")
      // Clean up the URL object after the download is triggered
      URL.revokeObjectURL(link.href);
    } catch (error) {
         
      alert("Failed to fetch username or save file.");
    }
  };

  const saveBinaryNumber3 = async () => {
    // Use the binaryInput state which holds the fetched binary data
    const binaryNumber = binaryInput3;

    if (!binaryNumber) {
      return;
    }

    try {
      // Fetch the username from the API

      const username = localStorage.getItem("username");

      // Format the current date and time
      const now = new Date();
      const formattedDate = `${now.getFullYear()}_${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}_${now.getDate().toString().padStart(2, "0")}`;
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}_${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}_${now.getSeconds().toString().padStart(2, "0")}`;

      // Combine to form the filename
      const fileName = `${username}_${formattedDate}_${formattedTime}.txt`;

      // Create a Blob with the binary number
      const blob = new Blob([binaryNumber], { type: "text/plain" });

      // Create a link element to trigger the file download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Filename for the downloaded file

      // Programmatically click the link to trigger the download
      link.click();
      alert("Binary Number saved")
      // Clean up the URL object after the download is triggered
      URL.revokeObjectURL(link.href);
    } catch (error) {
         
      alert("Failed to fetch username or save file.");
    }
  };

  const saveBinaryNumber4 = async () => {
    // Use the binaryInput state which holds the fetched binary data
    const binaryNumber = binaryInput4;

    if (!binaryNumber) {
      return;
    }

    try {
      // Fetch the username from the API

      const username = localStorage.getItem("username");

      // Format the current date and time
      const now = new Date();
      const formattedDate = `${now.getFullYear()}_${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}_${now.getDate().toString().padStart(2, "0")}`;
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}_${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}_${now.getSeconds().toString().padStart(2, "0")}`;

      // Combine to form the filename
      const fileName = `${username}_${formattedDate}_${formattedTime}.txt`;

      // Create a Blob with the binary number
      const blob = new Blob([binaryNumber], { type: "text/plain" });

      // Create a link element to trigger the file download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Filename for the downloaded file

      // Programmatically click the link to trigger the download
      link.click();
      alert("Binary Number saved")
      // Clean up the URL object after the download is triggered
      URL.revokeObjectURL(link.href);
    } catch (error) {
         
      alert("Failed to fetch username or save file.");
    }
  };

  const saveBinaryNumber5 = async () => {
    // Use the binaryInput state which holds the fetched binary data
    const binaryNumber = binaryInput5;

    if (!binaryNumber) {
      return;
    }

    try {
      // Fetch the username from the API

      const username = localStorage.getItem("username");

      // Format the current date and time
      const now = new Date();
      const formattedDate = `${now.getFullYear()}_${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}_${now.getDate().toString().padStart(2, "0")}`;
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}_${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}_${now.getSeconds().toString().padStart(2, "0")}`;

      // Combine to form the filename
      const fileName = `${username}_${formattedDate}_${formattedTime}.txt`;

      // Create a Blob with the binary number
      const blob = new Blob([binaryNumber], { type: "text/plain" });

      // Create a link element to trigger the file download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Filename for the downloaded file

      // Programmatically click the link to trigger the download
      link.click();
      alert("Binary Number saved")
      // Clean up the URL object after the download is triggered
      URL.revokeObjectURL(link.href);
    } catch (error) {
         
      alert("Failed to fetch username or save file.");
    }
  };


  const jobIdRef = useRef(null);
  const jobIdRefn = useRef(null);
  const jobIdRef2 = useRef(null);
  const jobIdRef2n = useRef(null);
  const jobIdRef3 = useRef(null);
  const jobIdRef3n = useRef(null);
  const jobIdRef4 = useRef(null);
  const jobIdRef4n = useRef(null);
  const jobIdRef5 = useRef(null);
  const jobIdRef5n = useRef(null);
  ///bin file creation
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
  ////

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
    

  }, [binaryInput]);

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
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 18) * 100);
            setLoadingProgressn(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);


        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans/`,
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
           
        clearInterval(progressInterval);
        setLoadingProgressn(0);

      }
    };

    fetchResult();
  }, [binaryInput]);

  useEffect(() => {
    if (!binaryInput) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef.current = currentJobId;
    let progressInterval;
    const fetchResult = async () => {
      setLoadingProgress(0); // Start loading from 0%

      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 15) * 100);
            
            setLoadingProgress(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        const formData = new FormData();
        formData.append("file", binFile);
        const formattedScheduledTime = "2024-07-07 11:30:00"

        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobId);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress(100); // Set progress to 100% after response is received
        setResultDieharder(response.data); // Set the result data
      } catch (error) {
           
        setLoadingProgress(0); // Reset progress in case of failure
        clearInterval(progressInterval);
      }
    };

    fetchResult();
  }, [binaryInput]);


  useEffect(() => {
    if (!binaryInput2) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef2n.current = currentJobId;
    setLoadingProgress2n(0);
    let progressInterval;

    const fetchResult = async () => {
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 18) * 100);
            setLoadingProgress2n(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans/`,
          {
            binary_data: binaryInput2,
            scheduled_time: scheduledTime2,
            job_id: currentJobId,
          }
        );
        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress2n(100);
        setResultNIST2(response.data); // Set the response data
      } catch (error) {
           
        setLoadingProgress2n(0);
        clearInterval(progressInterval);
      }
    };

    fetchResult();
  }, [binaryInput2]);

  useEffect(() => {
    if (!binaryInput2) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef2.current = currentJobId;
    let progressInterval;

    const fetchResult = async () => {
      setLoadingProgress2(0);
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 15) * 100);
            setLoadingProgress2(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        const formData = new FormData();
        formData.append("file", binFile2);
        const formattedScheduledTime = "2024-07-07 11:30:00"

        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobId);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress2(100); // Set progress to 100% after response is received
        setResultDieharder2(response.data); // Set the result data
      } catch (error) {
        setLoadingProgress2(0);
        clearInterval(progressInterval);
           

      }
    };

    fetchResult();
  }, [binaryInput2]);

  useEffect(() => {
    if (!binaryInput3) return; // Do not fetch if binaryInput is empty

    const currentJobId = uuidv4();
    jobIdRef3n.current = currentJobId;
    setLoadingProgress3n(0);
    let progressInterval;

    const fetchResult = async () => {

      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 18) * 100);
            setLoadingProgress3n(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);


        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans/`,
          {
            binary_data: binaryInput3,
            scheduled_time: scheduledTime3,
            job_id: currentJobId,

          }
        );
        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress3n(100);
        setResultNIST3(response.data); // Set the response data
      } catch (error) {
           
        setLoadingProgress3n(0);
        clearInterval(progressInterval);
      }
    };

    fetchResult();
  }, [binaryInput3]);

  useEffect(() => {
    if (!binaryInput3) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef3.current = currentJobId;
    setLoadingProgress3(0);
    let progressInterval;

    const fetchResult = async () => {
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 15) * 100);
            setLoadingProgress3(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        const formData = new FormData();
        formData.append("file", binFile3);
        const formattedScheduledTime = "2024-07-07 11:30:00"

        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobId);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress3(100); // Set progress to 100% after response is received
        setResultDieharder3(response.data); // Set the result data
      } catch (error) {
           
        setLoadingProgress3(0);
        clearInterval(progressInterval);

      }
    };

    fetchResult();
  }, [binaryInput3]);

  useEffect(() => {
    if (!binaryInput4) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef4n.current = currentJobId;
    setLoadingProgress4n(0);
    let progressInterval;

    const fetchResult = async () => {

      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 18) * 100);
            setLoadingProgress4n(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);


        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans/`,
          {
            binary_data: binaryInput4,
            scheduled_time: scheduledTime4,
            job_id: currentJobId,

          }
        );
        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress4n(100);
        setResultNIST4(response.data); // Set the response data
      } catch (error) {
           
        setLoadingProgress4n(0);
        clearInterval(progressInterval);

      }
    };

    fetchResult();
  }, [binaryInput4]);

  useEffect(() => {
    if (!binaryInput4) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef4.current = currentJobId;
    let progressInterval;
    const fetchResult = async () => {
      setLoadingProgress4(0);
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 15) * 100);
            setLoadingProgress4(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        const formData = new FormData();
        formData.append("file", binFile4);
        const formattedScheduledTime = "2024-07-07 11:30:00"

        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobId);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress4(100); // Set progress to 100% after response is received
        setResultDieharder4(response.data); // Set the result data
      } catch (error) {
        setLoadingProgress4(0);
        clearInterval(progressInterval);
           
      }
    };

    fetchResult();
  }, [binaryInput4]);

  useEffect(() => {
    if (!binaryInput5) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef5n.current = currentJobId;
    setLoadingProgress5n(0);
    let progressInterval;

    const fetchResult = async () => {
      setLoadingProgress5n(0);
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 18) * 100);
            setLoadingProgress5n(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);


        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans/`,
          {
            binary_data: binaryInput5,
            scheduled_time: scheduledTime5,
            job_id: currentJobId,
          }
        );
        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress5n(100);
        setResultNIST5(response.data); // Set the response data
      } catch (error) {
           
        setLoadingProgress5n(0);
        clearInterval(progressInterval);

      }
    };

    fetchResult();
  }, [binaryInput5]);

  useEffect(() => {
    if (!binaryInput5) return; // Do not fetch if binaryInput is empty
    const currentJobId = uuidv4();
    jobIdRef5.current = currentJobId;
    let progressInterval;

    const fetchResult = async () => {
      setLoadingProgress5(0);
      try {
        progressInterval = setInterval(async () => {
          try {
            const progressRes = await axios.get(`${REACT_APP_BASE_URL}/get_progress_dieharder/${currentJobId}`);
            const completed = progressRes.data.progress || 0;
            const percent = Math.round((completed / 15) * 100);
            setLoadingProgress5(prev => (percent > prev ? percent : prev)); // Prevent regressions
          } catch (err) {
            console.warn("Error fetching progress:", err);
          }
        }, 1000);

        const formData = new FormData();
        formData.append("file", binFile5);
        const formattedScheduledTime = "2024-07-07 11:30:00"

        formData.append("scheduled_time", formattedScheduledTime);
        formData.append("job_id", currentJobId);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        clearInterval(progressInterval); // Stop the interval
        setLoadingProgress5(100); // Set progress to 100% after response is received
        setResultDieharder5(response.data); // Set the result data
      } catch (error) {
        setLoadingProgress5(0);
        clearInterval(progressInterval);
           
      }
    };

    fetchResult();
  }, [binaryInput5]);


  const [isGeneratingReportT, setIsGeneratingReportT] = useState(false);
  const [isGeneratingReportT2, setIsGeneratingReportT2] = useState(false);
  const [isGeneratingReportT3, setIsGeneratingReportT3] = useState(false);
  const [isGeneratingReportT4, setIsGeneratingReportT4] = useState(false);
  const [isGeneratingReportT5, setIsGeneratingReportT5] = useState(false);


  const handleButtonClick = (type) => {
    if (type === "report") {
      setIsGeneratingReportT(true);
      fetch("${REACT_APP_BASE_URL}/pdf-report-server/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setIsGeneratingReportT(false);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});

    } else if (type === "graph") {
      fetch("${REACT_APP_BASE_URL}/graph-generation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});
;
    }
  };

  const handleButtonClick2 = (type) => {
    if (type === "report") {
      setIsGeneratingReportT(true);
      fetch("${REACT_APP_BASE_URL}/pdf-report-server/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput2 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setIsGeneratingReportT(false);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});

    } else if (type === "graph") {
      fetch("${REACT_APP_BASE_URL}/graph-generation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput2 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});
;
    }
  };

  const handleButtonClick3 = (type) => {
    if (type === "report") {
      setIsGeneratingReportT(true);
      fetch("${REACT_APP_BASE_URL}/pdf-report-server/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput3 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setIsGeneratingReportT(false);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});

    } else if (type === "graph") {
      fetch("${REACT_APP_BASE_URL}/graph-generation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput3 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});
;
    }
  };

  const handleButtonClick4 = (type) => {
    if (type === "report") {
      setIsGeneratingReportT(true);
      fetch("${REACT_APP_BASE_URL}/pdf-report-server/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput4 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setIsGeneratingReportT(false);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});

    } else if (type === "graph") {
      fetch("${REACT_APP_BASE_URL}/graph-generation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput4 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});
;
    }
  };

  const handleButtonClick5 = (type) => {
    if (type === "report") {
      setIsGeneratingReportT(true);
      fetch("${REACT_APP_BASE_URL}/pdf-report-server/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput5 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          setIsGeneratingReportT(false);
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});

    } else if (type === "graph") {
      fetch("${REACT_APP_BASE_URL}/graph-generation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binary_data: binaryInput5 }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch(() => {
  return;
});
;
    }
  };
  const [hostname, setHostname] = useState("");
  const [port, setPort] = useState("");


  const [hostname3, setHostname3] = useState("");
  const [port3, setPort3] = useState("");

  const [hostname4, setHostname4] = useState("");
  const [port4, setPort4] = useState("");

  const [hostname5, setHostname5] = useState("");
  const [port5, setPort5] = useState("");

  const handleConnect = async () => {
    if (!hostname || !port || !length) {
      alert("Please enter hostname, port, and length");
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        hostname,      // string, e.g. "202.83.17.121"
        port: Number(port),  // make sure it’s a number
        length: Number(length) // make sure it’s a number
      });

       

      if (response.data?.random) {
        const randomValue = response.data.random;
        setBinaryInput(randomValue);
        setIsSaveEnabled(true);
      
        alert("Connected! Random value received.");
      } else {
       
        alert("Incorrect credentials or invalid response.");
        setBinaryInput("");
      }
    } catch (error) {
      
      alert("Connection failed. See console for details.");
      setBinaryInput("");
    }
  };



  const [hostname2, setHostname2] = useState("");
  const [port2, setPort2] = useState("");

  const handleConnect2 = async () => {
    if (!hostname2 || !port2 || !length2) {
      alert("Please enter hostname, port and length");
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        hostname:hostname2,      // string, e.g. "202.83.17.121"
        port: Number(port2),  // make sure it’s a number
        length: Number(length2) // make sure it’s a number
      });

       

      if (response.data?.random) {
        const randomValue = response.data.random;
        setBinaryInput2(randomValue);
        setIsSaveEnabled2(true);
      
        alert("Connected! Random value received.");
      } else {
       
        alert("Incorrect credentials or invalid response.");
        setBinaryInput2("");
      }
    } catch (error) {
      
      alert("Connection failed. See console for details.");
      setBinaryInput2("");
    }
  };

  const handleConnect3 = async () => {
    if (!hostname3 || !port3 || !length3) {
      alert("Please enter hostname, port, and length");
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        hostname:hostname3,       // string, e.g. "202.83.17.121"
        port: Number(port3),  // make sure it’s a number
        length: Number(length3) // make sure it’s a number
      });

       

      if (response.data?.random) {
        const randomValue = response.data.random;
        setBinaryInput3(randomValue);
        setIsSaveEnabled3(true);
      
        alert("Connected! Random value received.");
      } else {
       
        alert("Incorrect credentials or invalid response.");
        setBinaryInput3("");
      }
    } catch (error) {
      
      alert("Connection failed. See console for details.");
      setBinaryInput3("");
    }
  };
  const handleConnect4 = async () => {
    if (!hostname4 || !port4 || !length4) {
      alert("Please enter hostname, port, and length");
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        hostname:hostname4,     // string, e.g. "202.83.17.121"
        port: Number(port4),  // make sure it’s a number
        length: Number(length4) // make sure it’s a number
      });

       

      if (response.data?.random) {
        const randomValue = response.data.random;
        setBinaryInput4(randomValue);
        setIsSaveEnabled4(true);
      
        alert("Connected! Random value received.");
      } else {
       
        alert("Incorrect credentials or invalid response.");
        setBinaryInput4("");
      }
    } catch (error) {
      
      alert("Connection failed. See console for details.");
      setBinaryInput4("");
    }
  };

  const handleConnect5 = async () => {
    if (!hostname5 || !port5 || !length5) {
      alert("Please enter hostname, port, and length");
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_PROXY_URL}/proxy`, {
        hostname:hostname5,     // string, e.g. "202.83.17.121"
        port: Number(port5),  // make sure it’s a number
        length: Number(length5) // make sure it’s a number
      });

       

      if (response.data?.random) {
        const randomValue = response.data.random;
        setBinaryInput5(randomValue);
        setIsSaveEnabled5(true);
      
        alert("Connected! Random value received.");
      } else {
       
        alert("Incorrect credentials or invalid response.");
        setBinaryInput5("");
      }
    } catch (error) {
      
      alert("Connection failed. See console for details.");
      setBinaryInput5("");
    }
  };
  return (
    <Box m="20px">
      <Header title="Server Connections" />
      {/* Table Section */}
      <Box
        mt="40px"
        p="20px"
        sx={{ backgroundColor: colors.primary[400], borderRadius: "8px" }}
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
              <th style={{ width: "30%" }}>Test</th>
              <th style={{ width: "10%" }}>Enter Length</th>
              <th style={{ width: "15%" }}>NIST SP 800-20B</th>
              <th style={{ width: "5%" }}>Progress Bar</th>
              <th style={{ width: "15%" }}>Dieharder Tests Result</th>
              <th style={{ width: "5%" }}>Progress Bar</th>
              <th style={{ width: "10%" }}>Server </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Box
                  mt="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                  <>
                    <style>
                      {`
      .start-fetching-btn {
        background-color: ${colors.greenAccent[800]};
        color: ${colors.primary[100]};
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
      }
      .start-fetching-btn:hover {
        background-color: ${colors.greenAccent[600]};
      }
    `}
                    </style>

                    <button onClick={handleConnect} className="start-fetching-btn">
                      Connect
                    </button>
                  </>

                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick("report")}
                    disabled={loadingProgress < 100 || loadingProgressn < 100}
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
                      position: 'relative',
                    }}
                  >
                    Generate Report
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.greenAccent[500],
                        opacity: isGeneratingReportT ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        boxShadow: `0 0 6px ${colors.greenAccent[500]}`,
                        pointerEvents: 'none',
                      }}
                    />
                  </Button>
                  {/* New Button for Saving Binary Number */}
                  <>
  <style>
    {`
      .save-binary-btn {
        background-color: ${colors.blueAccent[400]};
        color: ${colors.primary[100]};
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
      }
      .save-binary-btn:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .save-binary-btn:not(:disabled):hover {
        background-color: ${colors.blueAccent[600]};
      }
    `}
  </style>

  <button
  onClick={saveBinaryNumber}
  disabled={!isSaveEnabled }
  className="save-binary-btn"
>
  Save Binary Number
</button>

</>

                </Box>
              </td>

              <td>
                {/* TextField to accept user input for length */}
                <TextField
                  label="Enter Length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px" }}
                />
              </td>
              <td>{resultNIST ? resultNIST.final_result : ""}</td>
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
                    value={loadingProgressn} // Updated progress state
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
                    {loadingProgressn}%
                  </Typography>
                </Box>
              </td>
              <td>{resultDieharder ? resultDieharder.final_result : ""}</td>
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
              <td>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ display: "flex", flexDirection: "column", gap: 2, width: 200 }}
                >
                  <TextField
                    label="Hostname / IP"
                    variant="outlined"
                    size="small"
                    value={hostname}
                    onChange={(e) => setHostname(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                  <TextField
                    label="Port"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                
                </FormControl>
              </td>


            </tr>

            <tr>
              <td>2</td>
              <td>
                <Box
                  mt="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                   <>
                    <style>
                      {`
      .start-fetching-btn {
        background-color: ${colors.greenAccent[800]};
        color: ${colors.primary[100]};
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
      }
      .start-fetching-btn:hover {
        background-color: ${colors.greenAccent[600]};
      }
    `}
                    </style>

                    <button onClick={handleConnect2} className="start-fetching-btn">
                      Connect
                    </button>
                  </>
               
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick2("report")}
                    disabled={loadingProgress2 < 100 || loadingProgress2n < 100}
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
                      position: 'relative',
                    }}
                  >
                    Generate Report
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.greenAccent[500],
                        opacity: isGeneratingReportT2 ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        boxShadow: `0 0 6px ${colors.greenAccent[500]}`,
                        pointerEvents: 'none',
                      }}
                    />
                  </Button>
                  {/* New Button for Saving Binary Number */}
                  <button
  onClick={saveBinaryNumber2}
  disabled={!isSaveEnabled2 }
  className="save-binary-btn"
>
  Save Binary Number
</button>
                </Box>
              </td>


              <td>
                {/* TextField to accept user input for length */}
                <TextField
                  label="Enter Length"
                  type="number"
                  value={length2}
                  onChange={(e) => setLength2(Number(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px" }}
                />
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
                    value={loadingProgress2n} // Updated progress state
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
                    {loadingProgress2n}%
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
              <td>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ display: "flex", flexDirection: "column", gap: 2, width: 200 }}
                >
                  <TextField
                    label="Hostname / IP"
                    variant="outlined"
                    size="small"
                    value={hostname2}
                    onChange={(e) => setHostname2(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                  <TextField
                    label="Port"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={port2}
                    onChange={(e) => setPort2(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                 
                </FormControl>
              </td>

            </tr>

            <tr>
              <td>3</td>
              <td>
                <Box
                  mt="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                   <>
                    <style>
                      {`
      .start-fetching-btn {
        background-color: ${colors.greenAccent[800]};
        color: ${colors.primary[100]};
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
      }
      .start-fetching-btn:hover {
        background-color: ${colors.greenAccent[600]};
      }
    `}
                    </style>

                    <button onClick={handleConnect3} className="start-fetching-btn">
                      Connect
                    </button>
                  </>
                
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick3("report")}
                    disabled={loadingProgress3 < 100 || loadingProgress3n < 100}
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
                      position: 'relative',
                    }}
                  >
                    Generate Report
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.greenAccent[500],
                        opacity: isGeneratingReportT3 ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        boxShadow: `0 0 6px ${colors.greenAccent[500]}`,
                        pointerEvents: 'none',
                      }}
                    />
                  </Button>
                  {/* New Button for Saving Binary Number */}
                  <button
  onClick={saveBinaryNumber3}
  disabled={!isSaveEnabled3 }
  className="save-binary-btn"
>
  Save Binary Number
</button>
                </Box>
              </td>

              <td>
                {/* TextField to accept user input for length */}
                <TextField
                  label="Enter Length"
                  type="number"
                  value={length3}
                  onChange={(e) => setLength3(Number(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px" }}
                />
              </td>
              <td>{resultNIST3 ? resultNIST3.final_result : ""}</td>
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
                    value={loadingProgress3n} // Updated progress state
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
                    {loadingProgress3n}%
                  </Typography>
                </Box>
              </td>
              <td>{resultDieharder3 ? resultDieharder3.final_result : ""}</td>
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
              <td>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ display: "flex", flexDirection: "column", gap: 2, width: 200 }}
                >
                  <TextField
                    label="Hostname / IP"
                    variant="outlined"
                    size="small"
                    value={hostname3}
                    onChange={(e) => setHostname3(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                  <TextField
                    label="Port"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={port3}
                    onChange={(e) => setPort3(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                
                </FormControl>
              </td>


            </tr>

            <tr>
              <td>4</td>
              <td>
                <Box
                  mt="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                    <>
                    <style>
                      {`
      .start-fetching-btn {
        background-color: ${colors.greenAccent[800]};
        color: ${colors.primary[100]};
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
      }
      .start-fetching-btn:hover {
        background-color: ${colors.greenAccent[600]};
      }
    `}
                    </style>

                    <button onClick={handleConnect4} className="start-fetching-btn">
                      Connect
                    </button>
                  </>
               
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick4("report")}
                    disabled={loadingProgress4 < 100 || loadingProgress4n < 100}
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
                      position: 'relative',
                    }}
                  >
                    Generate Report
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.greenAccent[500],
                        opacity: isGeneratingReportT4 ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        boxShadow: `0 0 6px ${colors.greenAccent[500]}`,
                        pointerEvents: 'none',
                      }}
                    />
                  </Button>
                  {/* New Button for Saving Binary Number */}
                  <button
  onClick={saveBinaryNumber4}
  disabled={!isSaveEnabled4 }
  className="save-binary-btn"
>
  Save Binary Number
</button>
                </Box>
              </td>

              <td>
                {/* TextField to accept user input for length */}
                <TextField
                  label="Enter Length"
                  type="number"
                  value={length4}
                  onChange={(e) => setLength4(Number(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px" }}
                />
              </td>
              <td>{resultNIST4 ? resultNIST4.final_result : ""}</td>
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
                    value={loadingProgress4n} // Updated progress state
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
                    {loadingProgress4n}%
                  </Typography>
                </Box>
              </td>
              <td>{resultDieharder4 ? resultDieharder4.final_result : ""}</td>
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
              <td>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ display: "flex", flexDirection: "column", gap: 2, width: 200 }}
                >
                  <TextField
                    label="Hostname / IP"
                    variant="outlined"
                    size="small"
                    value={hostname4}
                    onChange={(e) => setHostname4(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                  <TextField
                    label="Port"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={port4}
                    onChange={(e) => setPort4(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                
                </FormControl>
              </td>

            </tr>

            <tr>
              <td>5</td>
              <td>
                <Box
                  mt="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="10px"
                >
                   <>
                    <style>
                      {`
      .start-fetching-btn {
        background-color: ${colors.greenAccent[800]};
        color: ${colors.primary[100]};
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
      }
      .start-fetching-btn:hover {
        background-color: ${colors.greenAccent[600]};
      }
    `}
                    </style>

                    <button onClick={handleConnect5} className="start-fetching-btn">
                      Connect
                    </button>
                  </>
                 
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick5("report")}
                    disabled={loadingProgress5 < 100 || loadingProgress5n < 100}
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
                      position: 'relative',
                    }}
                  >
                    Generate Report
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.greenAccent[500],
                        opacity: isGeneratingReportT5 ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        boxShadow: `0 0 6px ${colors.greenAccent[500]}`,
                        pointerEvents: 'none',
                      }}
                    />
                  </Button>
                  {/* New Button for Saving Binary Number */}
                  <button
  onClick={saveBinaryNumber5}
  disabled={!isSaveEnabled5 }
  className="save-binary-btn"
>
  Save Binary Number
</button>
                </Box>
              </td>

              <td>
                {/* TextField to accept user input for length */}
                <TextField
                  label="Enter Length"
                  type="number"
                  value={length5}
                  onChange={(e) => setLength5(Number(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{ width: "100px" }}
                />
              </td>
              <td>{resultNIST5 ? resultNIST5.final_result : ""}</td>
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
                    value={loadingProgress5n} // Updated progress state
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
                    {loadingProgress5n}%
                  </Typography>
                </Box>
              </td>
              <td>{resultDieharder5 ? resultDieharder5.final_result : ""}</td>
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
              <td>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ display: "flex", flexDirection: "column", gap: 2, width: 200 }}
                >
                  <TextField
                    label="Hostname / IP"
                    variant="outlined"
                    size="small"
                    value={hostname5}
                    onChange={(e) => setHostname5(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                  <TextField
                    label="Port"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={port5}
                    onChange={(e) => setPort5(e.target.value)}
                    InputLabelProps={{
                      sx: { color: "white" }
                    }}
                  />
                
                </FormControl>
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

export default Qrng_Server;