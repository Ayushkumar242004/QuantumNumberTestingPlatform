import { Box, Typography, useTheme, TextField, Button, Card, CardContent, Grid, Paper, Chip } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Make sure axios is imported
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../utils/supabaseClient';
import DownloadIcon from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArticleIcon from "@mui/icons-material/Article";
import ServerIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import ScienceIcon from "@mui/icons-material/Science";

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



  const [isGeneratingReportT, setIsGeneratingReportT] = useState(false);
  const [isGeneratingReportT2, setIsGeneratingReportT2] = useState(false);
  const [isGeneratingReportT3, setIsGeneratingReportT3] = useState(false);
  const [isGeneratingReportT4, setIsGeneratingReportT4] = useState(false);
  const [isGeneratingReportT5, setIsGeneratingReportT5] = useState(false);


  const handleButtonClick = (type) => {
    if (type === "report") {
      setIsGeneratingReportT(true);
      fetch(`${REACT_APP_BASE_URL}/pdf-report-server/`, {
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
      fetch(`${REACT_APP_BASE_URL}/pdf-report-server/`, {
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
      fetch(`${REACT_APP_BASE_URL}/pdf-report-server/`, {
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
      fetch(`${REACT_APP_BASE_URL}/pdf-report-server/`, {
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
      fetch(`${REACT_APP_BASE_URL}/pdf-report-server/`, {
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
  
  const [hostIP, setHostIP] = useState("");


  const [binaryDownloaded, setBinaryDownloaded] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState(null);

  const [nistResult, setNistResult] = useState(null); // result of NIST test
  const [dieharderResult, setDieharderResult] = useState(null); // result of Dieharder test
  const [nist90bResult, setNist90bResult] = useState(null); // result of NIST 90B test

  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(1);

  useEffect(() => {
    let subscription;

    const setupSubscription = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      // ✅ FIRST: Fetch initial data for line 1
      const fetchInitialData = async () => {
        try {
          const { data, error } = await supabase
            .from('results')
            .select('*')
            .eq('user_id', userId)
            .eq('line', 1); // Only fetch line 1

          if (error) {
            console.error("Supabase fetch error:", error);
            return;
          }

          if (data && data.length > 0) {
            const row = data[0];

            // Reset progress if 100% but no result
            if (row.progress === 100 && (!row.result || row.result.trim() === "")) {
              await supabase
                .from('results')
                .update({
                  progress: 0,
                  updated_at: new Date().toISOString()
                })
                .eq('user_id', userId)
                .eq('line', 1);

              setLoadingProgress(0);
              setNistResult(null);
            } else if (row.progress === 100 && row.result) {
              // Test completed
              setNistResult({ final_result: row.result });
              setLoadingProgress(row.progress);
            } else {
              // Test in progress or not started
              setNistResult(row.result ? { final_result: row.result } : null);
              setLoadingProgress(row.progress);
            }
          }
        } catch (err) {
          console.error('Error in initial data fetch:', err);
        }
      };

      await fetchInitialData();

      // ✅ SECOND: Set up real-time subscription for line 1 changes
      subscription = supabase
        .channel('results-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'results',
            filter: `user_id=eq.${userId} AND line=eq.1` // ✅ FIXED: Filter for line 1 only
          },
          (payload) => {
            const row = payload.new;

            if (!row) return; // Handle DELETE events

            // ✅ FIXED: Remove the early return for line 1
            if (row.progress === 100 && (!row.result || row.result.trim() === "")) {
              return; // Skip misleading 100% progress
            }

            // ✅ Now this will execute for line 1 changes
            if (row.progress === 100 && row.result) {
              // Test completed
              setNistResult({ final_result: row.result });
              setLoadingProgress(row.progress);
            } else if (row.progress > 0 && row.progress < 100) {
              // Test in progress
              setNistResult(null);
              setLoadingProgress(row.progress);
            } else {
              // Test not started or reset
              setNistResult(row.result ? { final_result: row.result } : null);
              setLoadingProgress(row.progress || 0);
            }
          }
        )
        .subscribe((status) => {
          console.log('Subscription status:', status);
        });
    };

    setupSubscription();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);


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

  const upsertProgress = async (progress, userId, result = "") => {
    let binaryString = null;


    const payload = {
      user_id: userId,
      line: 1,
      binary_data: " ",
      scheduled_time: "2025-04-10 11:31:08", // Hardcoded time
      result: result,
      file_name: downloadedFile.name,
      upload_time: new Date().toISOString(),
      progress: progress,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('results').upsert(payload);

    if (error) {
      console.error("Supabase upsert error:", error.message);
    }
  };
  const upsertProgress2 = async (progress, userId, result = "") => {
    let binaryString = null;

    const payload = {
      user_id: userId,
      line: 1,
      binary_data: " ",
      scheduled_time: "2025-04-10 11:31:08", // Hardcoded time
      result: result,
      file_name: downloadedFile.name,
      upload_time: new Date().toISOString(),
      progress: progress,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('results3')
      .upsert(payload);

    if (error) {
      console.error("Supabase upsert error:", error.message);
    }
  };

  const handleDownload = async () => {
    if (!hostIP) {
      alert("Please enter Host IP Address");
      return;
    }

    if (size < 1 || size > 10) {
      alert("Please enter size between 1 and 10 MB");
      return;
    }
    const userId = await fetchUserId();
    setLoading(true);

    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/fetch-qrng/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size_mb: size,
          host: hostIP
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + (errorData.error || "Unknown error"));
        setLoading(false);
        return;
      }

      // Convert response to blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create and save the file for NIST testing
      const file = new File([blob], "qrng.bin", { type: "application/octet-stream" });
      setDownloadedFile(file);
      setBinaryDownloaded(true);

      // Also trigger download to user
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrng.bin";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      await upsertProgress(0, userId, "");
      await upsertProgress2(0, userId, "");
    } catch (err) {
      console.error(err);
      alert("Failed to download file.");
      setLoading(false);
    }

    setLoading(false);
  };

  const runNISTTest = async () => {
    if (!downloadedFile) {
      alert("Please download a file first using the Download File button");
      return;
    }

    const lineNo = 1;

    setNistResult(null);
    setLoadingProgress(0);

    let progressIntervalId;
    const binaryInsertedRef = { current: false }; // Local ref for this function

    // Upsert progress function (same as in useEffect)
    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

      if (progress === 0 && downloadedFile && !binaryInsertedRef.current) {
        try {
          const fileReader = new FileReader();
          const fileBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.readAsBinaryString(downloadedFile);
          });

          // binaryString = Array.from(fileBuffer)
          //   .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
          //   .join('');

          binaryInsertedRef.current = true;
        } catch (err) {
          return;
        }
      }

      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: "2025-04-10 11:31:08", // Hardcoded time
        result: result,
        file_name: downloadedFile.name,
        upload_time: new Date().toISOString(),
        progress: progress,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('results').upsert(payload);

      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    // Progress polling function
    const fetchProgressFromSupabase = async (userId) => {
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

          // Stop polling once progress is 100%
          if (progress >= 100 && progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }

      // Initial progress update
      await upsertProgress(10, userId);

      // Show success alert
      alert("File uploaded successfully for NIST testing");

      // Start progress polling
      progressIntervalId = setInterval(() => fetchProgressFromSupabase(userId), 1000);
      await fetchProgressFromSupabase(userId);

      try {
        const formData = new FormData();
        formData.append("file", downloadedFile);

        // Hardcoded time values
        const hardcodedTime = "2025-04-10 11:31:08";

        formData.append("scheduled_time", hardcodedTime);
        formData.append("scheduled_time_str", hardcodedTime);
        formData.append("job_id", `nist_${Date.now()}`);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", downloadedFile.name);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/run_nist/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 300000
          }
        );

        // Stop progress polling
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        // Set result and update final progress
        setNistResult(response.data);
        await upsertProgress(100, userId, response.data.final_result);

      } catch (error) {
        // Stop progress polling on error
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setLoadingProgress(0);
        await upsertProgress(0, userId);

        console.error("Error running NIST tests:", error);
        alert(`Error while running NIST tests: ${error.response?.data?.error || error.message}`);

        setNistResult({
          final_result: "Test Failed",
          error: error.response?.data?.error || error.message
        });
      } finally {

      }
    };

    // Cleanup function
    const cleanup = () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };

    // Start the process
    startProcess();

    // Return cleanup function
    return cleanup;
  };

  const runDieharderTest = async () => {
    if (!binaryDownloaded || !downloadedFile) {
      alert("Please download a file first using the Download File button");
      return;
    }

    const lineNo = 1; // Using line 1 for Dieharder tests

    setDieharderResult(null);
    setLoadingProgress2(0);

    let progressIntervalId;
    const binaryInsertedRef = { current: false }; // Local ref for this function

    // Upsert progress function
    const upsertProgress = async (progress, userId, result = "") => {
      let binaryString = null;

  

      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: "2025-04-10 11:31:08", // Hardcoded time
        result: result,
        file_name: downloadedFile.name,
        upload_time: new Date().toISOString(),
        progress: progress,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('results3')
        .upsert(payload);

      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    // Progress polling function
    const fetchProgressFromSupabase = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("results3")
          .select("*")
          .eq("user_id", userId)
          .eq("line", lineNo)
          .maybeSingle();

        if (error) {
          return;
        }

        if (data) {
          const progress = data.progress || 0;
          setLoadingProgress2(progress);

          // Stop polling once progress is 100%
          if (progress >= 100 && progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) {

        return;
      }

      // Initial progress update
      await upsertProgress(10, userId);

      
      // Start progress polling
      progressIntervalId = setInterval(() => fetchProgressFromSupabase(userId), 1000);
      await fetchProgressFromSupabase(userId);

      try {
        const formData = new FormData();
        formData.append("file", downloadedFile);

        // Hardcoded time values
        const hardcodedTime = "2025-04-10 11:31:08";

        formData.append("scheduled_time", hardcodedTime);
        formData.append("job_id", `dieharder_${Date.now()}`);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", downloadedFile.name);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/generate_final_ans_dieharder/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 300000
          }
        );

        // Stop progress polling
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        // Set result and update final progress
        setDieharderResult(response.data);
        await upsertProgress(100, userId, response.data.final_result);

        console.log("Dieharder Test completed:", response.data);

      } catch (error) {
        // Stop progress polling on error
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setLoadingProgress2(0);
        await upsertProgress(0, userId);

        console.error("Error running Dieharder tests:", error);
        alert(`Error while running Dieharder tests: ${error.response?.data?.error || error.message}`);

        setDieharderResult({
          final_result: "Test Failed",
          error: error.response?.data?.error || error.message
        });
      } finally {

      }
    };

    // Cleanup function
    const cleanup = () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };

    // Start the process
    startProcess();

    // Return cleanup function
    return cleanup;
  };

  // Add the new function for NIST 800-90B test
  const runNIST90BTest = async () => {
    if (!binaryDownloaded || !downloadedFile) {
      alert("Please download a file first using the Download File button");
      return;
    }

    const lineNo = 1;
    setNist90bResult(null);
    setLoadingProgress3(0);

    let progressIntervalId;
    const binaryInsertedRef = { current: false };

    // Upsert progress function for NIST 90B
    const upsertProgress3 = async (progress, userId, result = "") => {
      const payload = {
        user_id: userId,
        line: lineNo,
        binary_data: " ",
        scheduled_time: "2025-04-10 11:31:08",
        result: result,
        file_name: downloadedFile.name,
        upload_time: new Date().toISOString(),
        progress: progress,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('results_nist90b').upsert(payload);
      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    // Progress polling function for NIST 90B
    const fetchProgressFromSupabase3 = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("results_nist90b")
          .select("*")
          .eq("user_id", userId)
          .eq("line", lineNo)
          .maybeSingle();

        if (error) return;

        if (data) {
          const progress = data.progress || 0;
          setLoadingProgress3(progress);

          if (progress >= 100 && progressIntervalId) {
            clearInterval(progressIntervalId);
            progressIntervalId = null;
          }
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    const startProcess = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      await upsertProgress3(10, userId);
      alert("File uploaded successfully for NIST 800-90B testing");

      progressIntervalId = setInterval(() => fetchProgressFromSupabase3(userId), 1000);
      await fetchProgressFromSupabase3(userId);

      try {
        const formData = new FormData();
        formData.append("file", downloadedFile);

        const hardcodedTime = "2025-04-10 11:31:08";
        formData.append("scheduled_time", hardcodedTime);
        formData.append("scheduled_time_str", hardcodedTime);
        formData.append("job_id", `nist90b_${Date.now()}`);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", downloadedFile.name);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/run_nist90b/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 300000
          }
        );

        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setNist90bResult(response.data);
        await upsertProgress3(100, userId, response.data.final_result);

      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setLoadingProgress3(0);
        await upsertProgress3(0, userId);

        console.error("Error running NIST 800-90B tests:", error);
        alert(`Error while running NIST 800-90B tests: ${error.response?.data?.error || error.message}`);

        setNist90bResult({
          final_result: "Test Failed",
          error: error.response?.data?.error || error.message
        });
      }
    };

    startProcess();

    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
      }
    };
  };


  return (
    <Box m="20px"
    sx={{ 
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: colors.primary[700],
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: colors.blueAccent[500],
        borderRadius: '4px',
        '&:hover': {
          background: colors.blueAccent[400],
        }
      }
    }}>
      <Header title="Quantum Random Number Generator" subtitle="Server Connections & Testing" />
      
      {/* Server Configuration Card */}
      <Card 
        sx={{ 
          mb: 3, 
          background: `linear-gradient(135deg, ${colors.primary[400]} 10%, ${colors.blueAccent[900]} 100%)`,
          borderRadius: "16px",
          border: `1px solid ${colors.grey[400]}`
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <ServerIcon sx={{ mr: 2, color: colors.greenAccent[500] }} />
            <Typography variant="h5" fontWeight="600" color="white">
              Server Configuration
            </Typography>
          </Box>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Host IP Address"
                variant="outlined"
                value={hostIP}
                onChange={(e) => setHostIP(e.target.value)}
                InputLabelProps={{
                  sx: { color: colors.grey[300] }
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: colors.grey[400],
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.greenAccent[400],
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: colors.blueAccent[400],
                    },
                    '&:hover fieldset': {
                      borderColor: colors.greenAccent[500],
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.greenAccent[500],
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="File Size (MB)"
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                inputProps={{ min: 1, max: 10 }}
                InputLabelProps={{
                  sx: { color: colors.grey[300] }
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: colors.grey[400],
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.greenAccent[400],
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: colors.blueAccent[400],
                    },
                    '&:hover fieldset': {
                      borderColor: colors.greenAccent[500],
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.greenAccent[500],
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                disabled={loading}
                sx={{
                  height: "56px",
                  background: `linear-gradient(135deg, ${colors.greenAccent[500]} 0%, ${colors.greenAccent[700]} 100%)`,
                  color: "white",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${colors.greenAccent[500]} 0%, ${colors.greenAccent[700]} 100%)`,
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: colors.grey[700],
                  }
                }}
              >
                {loading ? "Downloading..." : "Download QRNG File"}
              </Button>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Chip 
                label={binaryDownloaded ? "File Ready" : "No File"} 
                color={binaryDownloaded ? "success" : "default"}
                sx={{
                  backgroundColor: binaryDownloaded ? colors.greenAccent[600] : colors.grey[600],
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Testing Section - Three Horizontal Cards */}
      <Grid container spacing={3}>
        {/* NIST SP 800-20B Test Card */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: "100%",
              background: `linear-gradient(135deg, ${colors.primary[400]} 10%, ${colors.blueAccent[900]} 100%)`,
              borderRadius: "16px",
              border: `1px solid ${colors.grey[400]}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              }
            }}
          >
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
              <Box display="flex" alignItems="center" mb={3}>
                <SecurityIcon sx={{ mr: 2, color: colors.blueAccent[300] }} />
                <Typography variant="h6" fontWeight="600" color="white">
                  NIST SP 800-20B Test
                </Typography>
              </Box>
              
              <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={runNISTTest}
                    disabled={!binaryDownloaded || loadingProgress > 0}
                    sx={{
                      mb: 2,
                      background: `linear-gradient(135deg, ${colors.greenAccent[500]} 0%, ${colors.greenAccent[700]} 100%)`,
                      color: "white",
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      borderRadius: "10px",
                      padding: "12px",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${colors.blueAccent[400]} 0%, ${colors.blueAccent[600]} 100%)`,
                      },
                      "&:disabled": {
                        background: colors.grey[700],
                      }
                    }}
                  >
                    Run NIST 22B Test
                  </Button>
                  
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" color={colors.grey[300]}>
                      Progress:
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="white">
                      {loadingProgress}%
                    </Typography>
                  </Box>
                  
                  <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', mb: 2 }}>
                    <CircularProgress
                      variant="determinate"
                      value={loadingProgress}
                      size={60}
                      thickness={4}
                      sx={{
                        color: loadingProgress === 100 ? colors.greenAccent[500] :
                          loadingProgress > 0 ? colors.blueAccent[400] : colors.grey[600],
                        margin: '0 auto',
                        display: 'block'
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div" color="white" fontWeight="600">
                        {loadingProgress}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box textAlign="center">
                  <Typography 
                    variant="h6" 
                    fontWeight="600"
                    sx={{
                      color: nistResult ? 
                        (nistResult.final_result?.toLowerCase().includes("pass") ? colors.greenAccent[500] :
                         nistResult.final_result?.toLowerCase().includes("fail") ? colors.redAccent[500] :
                         colors.blueAccent[300]) : colors.grey[500]
                    }}
                  >
                    {nistResult ? nistResult.final_result : "Pending"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Dieharder Test Card */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: "100%",
              background: `linear-gradient(135deg, ${colors.primary[400]} 10%, ${colors.blueAccent[900]} 100%)`,
              borderRadius: "16px",
              border: `1px solid ${colors.grey[400]}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              }
            }}
          >
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
              <Box display="flex" alignItems="center" mb={3}>
                <AnalyticsIcon sx={{ mr: 2, color: colors.blueAccent[300] }} />
                <Typography variant="h6" fontWeight="600" color="white">
                  Dieharder Test Suite
                </Typography>
              </Box>
              
              <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={runDieharderTest}
                    disabled={!binaryDownloaded || loadingProgress2 > 0}
                    sx={{
                      mb: 2,
                      background: `linear-gradient(135deg, ${colors.greenAccent[500]} 0%, ${colors.greenAccent[700]} 100%)`,
                      color: "white",
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      borderRadius: "10px",
                      padding: "12px",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${colors.blueAccent[400]} 0%, ${colors.blueAccent[600]} 100%)`,
                      },
                      "&:disabled": {
                        background: colors.grey[700],
                      }
                    }}
                  >
                    Run Dieharder Test
                  </Button>
                  
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" color={colors.grey[300]}>
                      Progress:
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="white">
                      {loadingProgress2}%
                    </Typography>
                  </Box>
                  
                  <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', mb: 2 }}>
                    <CircularProgress
                      variant="determinate"
                      value={loadingProgress2}
                      size={60}
                      thickness={4}
                      sx={{
                        color: loadingProgress2 === 100 ? colors.greenAccent[500] :
                          loadingProgress2 > 0 ? colors.blueAccent[400] : colors.grey[600],
                        margin: '0 auto',
                        display: 'block'
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div" color="white" fontWeight="600">
                        {loadingProgress2}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box textAlign="center">
                  <Typography 
                    variant="h6" 
                    fontWeight="600"
                    sx={{
                      color: dieharderResult ? 
                        (dieharderResult.final_result?.toLowerCase().includes("pass") ? colors.greenAccent[500] :
                         dieharderResult.final_result?.toLowerCase().includes("fail") ? colors.redAccent[500] :
                         colors.blueAccent[300]) : colors.grey[500]
                    }}
                  >
                    {dieharderResult ? dieharderResult.final_result : "Pending"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* NIST SP 800-90B Test Card */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: "100%",
              background: `linear-gradient(135deg, ${colors.primary[400]} 10%, ${colors.blueAccent[900]} 100%)`,
              borderRadius: "16px",
              border: `1px solid ${colors.grey[400]}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              }
            }}
          >
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
              <Box display="flex" alignItems="center" mb={3}>
                <ScienceIcon sx={{ mr: 2, color: colors.blueAccent[300] }} />
                <Typography variant="h6" fontWeight="600" color="white">
                  NIST SP 800-90B Test
                </Typography>
              </Box>
              
              <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={runNIST90BTest}
                    disabled={!binaryDownloaded || loadingProgress3 > 0}
                    sx={{
                      mb: 2,
                      background: `linear-gradient(135deg, ${colors.greenAccent[500]} 0%, ${colors.greenAccent[700]} 100%)`,
                      color: "white",
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      borderRadius: "10px",
                      padding: "12px",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${colors.blueAccent[400]} 0%, ${colors.blueAccent[600]} 100%)`,
                      },
                      "&:disabled": {
                        background: colors.grey[700],
                      }
                    }}
                  >
                    Run NIST 90B Test
                  </Button>
                  
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" color={colors.grey[300]}>
                      Progress:
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="white">
                      {loadingProgress3}%
                    </Typography>
                  </Box>
                  
                  <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', mb: 2 }}>
                    <CircularProgress
                      variant="determinate"
                      value={loadingProgress3}
                      size={60}
                      thickness={4}
                      sx={{
                        color: loadingProgress3 === 100 ? colors.greenAccent[500] :
                          loadingProgress3 > 0 ? colors.blueAccent[400] : colors.grey[600],
                        margin: '0 auto',
                        display: 'block'
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div" color="white" fontWeight="600">
                        {loadingProgress3}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box textAlign="center">
                  <Typography 
                    variant="h6" 
                    fontWeight="600"
                    sx={{
                      color: nist90bResult ? 
                        (nist90bResult.final_result?.toLowerCase().includes("pass") ? colors.greenAccent[500] :
                         nist90bResult.final_result?.toLowerCase().includes("fail") ? colors.redAccent[500] :
                         colors.blueAccent[300]) : colors.grey[500]
                    }}
                  >
                    {nist90bResult ? nist90bResult.final_result : "Pending"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Report Generation Card */}
      <Card 
        sx={{ 
          mt: 3,
          background: `linear-gradient(135deg, ${colors.primary[400]} 10%, ${colors.blueAccent[900]} 100%)`,
          borderRadius: "16px",
          border: `1px solid ${colors.grey[400]}`
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <ArticleIcon sx={{ mr: 2, color: colors.greenAccent[500] }} />
            <Typography variant="h5" fontWeight="600" color="white">
              Report Generation
            </Typography>
          </Box>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ArticleIcon />}
                onClick={() => handleButtonClick("report")}
                disabled={loadingProgress < 100 || loadingProgressn < 100}
                sx={{
                  background: `linear-gradient(135deg, ${colors.redAccent[400]} 0%, ${colors.redAccent[600]} 100%)`,
                  color: "white",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  padding: "15px",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${colors.redAccent[400]} 0%, ${colors.redAccent[600]} 100%)`,
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: colors.grey[700],
                  }
                }}
              >
                Generate Test Report
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* AI Analysis Section - Keep your existing beautiful AI section */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1a237e 0%, #283593 25%, #1F2A40 50%, #0d1b2a 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "280px",
              textAlign: "center",
              mt: 3,
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

export default Qrng_Server;

