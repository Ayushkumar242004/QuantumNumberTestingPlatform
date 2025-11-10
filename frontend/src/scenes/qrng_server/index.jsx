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
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Qrng_Server = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const REACT_APP_PROXY_URL = process.env.REACT_APP_PROXY_URL;
  const REACT_APP_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;


  const [loadingProgress, setLoadingProgress] = useState(0);

  const [loadingProgress2, setLoadingProgress2] = useState(0);

  const [loadingProgress3, setLoadingProgress3] = useState(0);

  const [testRunTrigger, setTestRunTrigger] = useState(0);
  const [testRunTrigger2, setTestRunTrigger2] = useState(0);
  const [testRunTrigger3, setTestRunTrigger3] = useState(0);

  const [hostIP, setHostIP] = useState("");


  const [binaryDownloaded, setBinaryDownloaded] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState(null);

  const [nistResult, setNistResult] = useState(null); // result of NIST test
  const [dieharderResult, setDieharderResult] = useState(null); // result of Dieharder test
  const [nist90bResult, setNist90bResult] = useState(null); // result of NIST 90B test

  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(1);

  const subsInitializedRef = useRef(false);
  const activeChannelsRef = useRef({});


  // Add this state at the top of your component
  const [activeTests, setActiveTests] = useState({
    nist90b: false,
    nist: false,
    dieharder: false
  });

  const handleButtonClick = async (type) => {
    if (type === "report") {
      // Check if we have a downloaded file (either in state or sessionStorage)
      const fileInfoStr = sessionStorage.getItem('downloadedFileInfo');
      if (!downloadedFile && !fileInfoStr) {
        alert("Please download a file first using the Download File button");
        return;
      }

      // Set session storage to indicate report generation is in progress
      sessionStorage.setItem('reportGenerationInProgress', 'true');

      try {
        const userId = await fetchUserId();
        if (!userId) {
          alert("User not found");
          sessionStorage.removeItem('reportGenerationInProgress');
          return;
        }

        // Create FormData to send file and metadata
        const formData = new FormData();

        // If we have the actual file, use it. Otherwise, we'll need to handle this case
        if (downloadedFile) {
          formData.append("file", downloadedFile);
        } else {
          // If file is lost due to refresh, show error
          alert("File data was lost due to page refresh. Please download the file again.");
          sessionStorage.removeItem('reportGenerationInProgress');
          sessionStorage.removeItem('downloadedFileInfo');
          return;
        }

        // Add required metadata
        const hardcodedTime = "2025-04-10 11:31:08";
        const jobId = `report_${Date.now()}`;

        formData.append("scheduled_time", hardcodedTime);
        formData.append("scheduled_time_str", hardcodedTime);
        formData.append("job_id", jobId);
        formData.append("line", "1");
        formData.append("user_id", userId);
        formData.append("file_name", downloadedFile.name);

        // Show loading state
        setLoading(true);

        const response = await fetch(`${REACT_APP_BASE_URL}/pdf-report-server/`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate report");
        }

        // Get the PDF blob
        const blob = await response.blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `qrng_report_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);

        alert("Report generated and downloaded successfully!");

        // Small delay before clearing
        setTimeout(() => {
          sessionStorage.removeItem('reportGenerationInProgress');
        }, 1000);

      } catch (error) {
        console.error("Error generating report:", error);
        alert(`Error generating report: ${error.message}`);

        // Clear session storage on error
        sessionStorage.removeItem('reportGenerationInProgress');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let subscription1;
    let subscription2;
    let subscription3;
    const fallbackIntervals = {};

    const setupSubscriptions = async () => {
      const userId = await fetchUserId();
      if (!userId) return;

      // Fetch initial data for all three tables
      const fetchInitialData = async () => {
        try {
          // results - NIST Test
          console.log("Fetching initial data for 'results'...");
          const { data: data1, error: error1 } = await supabase
            .from('results')
            .select('*')
            .eq('user_id', userId)
            .eq('line', 6);

          if (error1) {
            console.error("Supabase fetch error (results):", error1);
          } else if (data1 && data1.length > 0) {
            const row = data1[0];
            console.log("Initial 'results' data:", row);
            setLoadingProgress(row.progress);
            if (row.progress === 100 && (!row.result || row.result.trim() === "")) {
              await supabase
                .from('results')
                .update({ progress: 0, updated_at: new Date().toISOString() })
                .eq('user_id', userId)
                .eq('line', 6);
              setLoadingProgress(0);
              setNistResult(null);
              localStorage.removeItem('nistResult');
            } else if (row.result) {
              setNistResult({ final_result: row.result });
              localStorage.setItem('nistResult', JSON.stringify({ final_result: row.result }));
            }
          }

          // results2 - NIST 90B Test
          console.log("Fetching initial data for 'results2'...");
          const { data: data2, error: error2 } = await supabase
            .from('results2')
            .select('*')
            .eq('user_id', userId)
            .eq('line', 6);

          if (error2) {
            console.error("Supabase fetch error (results2):", error2);
          } else if (data2 && data2.length > 0) {
            const row = data2[0];
            console.log("Initial 'results2' data:", row);
            setLoadingProgress3(row.progress); // This should be setLoadingProgress3 for NIST 90B
            if (row.progress === 100 && (!row.result || row.result.trim() === "")) {
              await supabase
                .from('results2')
                .update({ progress: 0, updated_at: new Date().toISOString() })
                .eq('user_id', userId)
                .eq('line', 6);
              setLoadingProgress3(0);
              setNist90bResult(null);
              localStorage.removeItem('nist90bResult');
            } else if (row.result) {
              setNist90bResult({ final_result: row.result });
              localStorage.setItem('nist90bResult', JSON.stringify({ final_result: row.result }));
            }
          }

          // results3 - Dieharder Test
          console.log("Fetching initial data for 'results3'...");
          const { data: data3, error: error3 } = await supabase
            .from('results3')
            .select('*')
            .eq('user_id', userId)
            .eq('line', 6);

          if (error3) {
            console.error("Supabase fetch error (results3):", error3);
          } else if (data3 && data3.length > 0) {
            const row = data3[0];
            console.log("Initial 'results3' data:", row);
            setLoadingProgress2(row.progress); // This should be setLoadingProgress2 for Dieharder
            if (row.progress === 100 && (!row.result || row.result.trim() === "")) {
              await supabase
                .from('results3')
                .update({ progress: 0, updated_at: new Date().toISOString() })
                .eq('user_id', userId)
                .eq('line', 6);
              setLoadingProgress2(0);
              setDieharderResult(null);
              localStorage.removeItem('dieharderResult');
            } else if (row.result) {
              setDieharderResult({ final_result: row.result });
              localStorage.setItem('dieharderResult', JSON.stringify({ final_result: row.result }));
            }
          }
        } catch (err) {
          console.error('Error in initial data fetch:', err);
        }
      };

      await fetchInitialData();

      // Subscription for results (NIST Test)
      subscription1 = supabase
        .channel('results-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'results',
            filter: `user_id=eq.${userId} AND line=eq.1`
          },
          (payload) => {
            console.debug('Realtime results payload:', payload);
            const row = payload.new;
            if (!row) return;

            const progress = Number(row.progress || 0);
            console.log('Real-time NIST progress update:', progress);

            setLoadingProgress(progress);

            if (row.result && row.result.trim() !== "") {
              setNistResult({ final_result: row.result });
              localStorage.setItem('nistResult', JSON.stringify({ final_result: row.result }));
            } else if (progress === 100) {
              setNistResult(null);
              localStorage.removeItem('nistResult');
            }
          }
        )
        .subscribe((status) => {
          console.log('Subscription 1 (results) status:', status);
        });

      // Subscription for results2 (NIST 90B Test)
      subscription2 = supabase
        .channel('results2-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'results2',
            filter: `user_id=eq.${userId} AND line=eq.1`
          },
          (payload) => {
            console.debug('Realtime results2 payload:', payload);
            const row = payload.new;
            if (!row) return;

            const progress = Number(row.progress || 0);
            console.log('Real-time NIST 90B progress update:', progress);

            setLoadingProgress3(progress); // This should update NIST 90B progress

            if (row.result && row.result.trim() !== "") {
              setNist90bResult({ final_result: row.result });
              localStorage.setItem('nist90bResult', JSON.stringify({ final_result: row.result }));
            } else if (progress === 100) {
              setNist90bResult(null);
              localStorage.removeItem('nist90bResult');
            }
          }
        )
        .subscribe((status) => {
          console.log('Subscription 2 (results2) status:', status);
        });

      // Subscription for results3 (Dieharder Test)
      subscription3 = supabase
        .channel('results3-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'results3',
            filter: `user_id=eq.${userId} AND line=eq.1`
          },
          (payload) => {
            console.debug('Realtime results3 payload:', payload);
            const row = payload.new;
            if (!row) return;

            const progress = Number(row.progress || 0);
            console.log('Real-time Dieharder progress update:', progress);

            setLoadingProgress2(progress); // This should update Dieharder progress

            if (row.result && row.result.trim() !== "") {
              setDieharderResult({ final_result: row.result });
              localStorage.setItem('dieharderResult', JSON.stringify({ final_result: row.result }));
            } else if (progress === 100) {
              setDieharderResult(null);
              localStorage.removeItem('dieharderResult');
            }
          }
        )
        .subscribe((status) => {
          console.log('Subscription 3 (results3) status:', status);
        });

      // Start fallback polling for all tables
      startAggressiveFallbackPoll('results', setLoadingProgress, setNistResult, userId, 'nistResult');
      startAggressiveFallbackPoll('results2', setLoadingProgress3, setNist90bResult, userId, 'nist90bResult');
      startAggressiveFallbackPoll('results3', setLoadingProgress2, setDieharderResult, userId, 'dieharderResult');
    };

    // More aggressive fallback polling
    const startAggressiveFallbackPoll = (tableName, setProgressFn, setResultFn, userId, storageKey) => {
      if (fallbackIntervals[tableName]) return;

      console.log(`Starting aggressive polling for ${tableName}`);
      fallbackIntervals[tableName] = setInterval(async () => {
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq('user_id', userId)
            .eq('line', 6)
            .maybeSingle();

          if (error) {
            console.debug(`Fallback poll error (${tableName}):`, error);
            return;
          }

          if (data) {
            const progress = Number(data.progress || 0);
            console.log(`Fallback poll (${tableName}) progress:`, progress);

            setProgressFn(progress);

            if (data.result && data.result.trim() !== "") {
              setResultFn({ final_result: data.result });
              localStorage.setItem(storageKey, JSON.stringify({ final_result: data.result }));
            }

            // Only stop if we have a final result
            if (progress >= 100 && data.result && data.result.trim() !== "") {
              console.log(`Stopping fallback poll for ${tableName} - completed`);
              clearInterval(fallbackIntervals[tableName]);
              delete fallbackIntervals[tableName];
            }
          }
        } catch (e) {
          console.debug(`Fallback poll exception (${tableName}):`, e);
        }
      }, 500); // More frequent polling - 500ms
    };

    setupSubscriptions();

    return () => {
      // Cleanup
      try {
        if (subscription1) subscription1.unsubscribe();
        if (subscription2) subscription2.unsubscribe();
        if (subscription3) subscription3.unsubscribe();
      } catch (e) {
        console.debug('Error unsubscribing channels:', e);
      }

      Object.values(fallbackIntervals).forEach(id => {
        try {
          if (id) clearInterval(id);
        } catch (e) {
          console.debug('Error clearing interval:', e);
        }
      });
    };
  }, [testRunTrigger, testRunTrigger2, testRunTrigger3]);

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
      line: 6,
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
      line: 6,
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
  const upsertProgress3 = async (progress, userId, result = "") => {
    let binaryString = null;

    const payload = {
      user_id: userId,
      line: 6,
      binary_data: " ",
      scheduled_time: "2025-04-10 11:31:08", // Hardcoded time
      result: result,
      file_name: downloadedFile.name,
      upload_time: new Date().toISOString(),
      progress: progress,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('results2')
      .upsert(payload);

    if (error) {
      console.error("Supabase upsert error:", error.message);
    }
  };

  // Add this useEffect to restore downloaded file info on component mount
  useEffect(() => {
    const restoreDownloadedFile = async () => {
      const fileInfoStr = sessionStorage.getItem('downloadedFileInfo');
      if (fileInfoStr) {
        try {
          const fileInfo = JSON.parse(fileInfoStr);

          const mockFile = new File([], fileInfo.name, {
            type: fileInfo.type,
            lastModified: fileInfo.lastModified
          });

          setDownloadedFile(mockFile);
          setBinaryDownloaded(true);

          console.log("Restored downloaded file info from sessionStorage");
        } catch (error) {
          console.error("Error restoring downloaded file:", error);
          sessionStorage.removeItem('downloadedFileInfo');
        }
      }
    };

    restoreDownloadedFile();
  }, []);

  const handleDownload = async () => {
    if (!hostIP) {
      alert("Please enter Host IP Address");
      return;
    }

    if (size < 1 || size > 10) {
      alert("Please enter size between 1 and 10 MB");
      return;
    }

    // Set session storage to indicate download is in progress
    sessionStorage.setItem('qrngDownloadInProgress', 'true');

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

        // Remove session storage on error
        sessionStorage.removeItem('qrngDownloadInProgress');
        sessionStorage.removeItem('downloadedFileInfo');
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

      // ✅ Store file info in sessionStorage for persistence
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      };
      sessionStorage.setItem('downloadedFileInfo', JSON.stringify(fileInfo));

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
      await upsertProgress3(0, userId, "");
    } catch (err) {
      console.error(err);

      // Remove session storage on error
      sessionStorage.removeItem('qrngDownloadInProgress');
      sessionStorage.removeItem('downloadedFileInfo');
      setLoading(false);
      return;
    }

    // Remove session storage when download completes successfully
    sessionStorage.removeItem('qrngDownloadInProgress');
    setLoading(false);
  };

  useEffect(() => {
    const progressIntervalIds = {};

    const resumeProgressCheck = async (tableName, lineNumber) => {
      const userId = await fetchUserId();
      if (!userId) return;

      const fetchProgressFromSupabase = async () => {
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq("user_id", userId)
            .eq("line", lineNumber)
            .maybeSingle();

          if (error) {
            //  stop polling on error
            const intervalKey = `${tableName}_${lineNumber}`;
            if (progressIntervalIds[intervalKey]) {
              clearInterval(progressIntervalIds[intervalKey]);
              delete progressIntervalIds[intervalKey];
            }
            return;
          }

          if (data) {
            const progress = data.progress || 0;

            // Update progress based on table and line number
            switch (tableName) {
              case 'results':
                switch (lineNumber) {
                  case 1:
                    setLoadingProgress(progress);
                    if (data.result) {
                      setNistResult({ final_result: data.result });
                    }
                    break;

                }
                break;

              case 'results2':
                switch (lineNumber) {
                  case 1:
                    setLoadingProgress3(progress);
                    if (data.result) {
                      setNist90bResult({ final_result: data.result });
                    }
                    break;

                }
                break;

              case 'results3':
                switch (lineNumber) {
                  case 1:
                    setLoadingProgress2(progress);
                    if (data.result) {
                      setDieharderResult({ final_result: data.result });

                    }
                    break;

                }
                break;
            }

            // ✅ Stop polling if already complete
            if (progress >= 100) {
              const intervalKey = `${tableName}_${lineNumber}`;
              if (progressIntervalIds[intervalKey]) {
                clearInterval(progressIntervalIds[intervalKey]);
                delete progressIntervalIds[intervalKey];
              }
            }
          }
        } catch (err) {
          // ❌ stop polling on unexpected error
          const intervalKey = `${tableName}_${lineNumber}`;
          if (progressIntervalIds[intervalKey]) {
            clearInterval(progressIntervalIds[intervalKey]);
            delete progressIntervalIds[intervalKey];
          }
        }
      };

      // Start polling for this table and line
      const intervalKey = `${tableName}_${lineNumber}`;
      progressIntervalIds[intervalKey] = setInterval(fetchProgressFromSupabase, 2000);

      // Do one immediate fetch
      await fetchProgressFromSupabase();
    };

    // Start progress checks for all tables and lines
    const tables = ['results', 'results2', 'results3'];
    const lines = [6]; // You can add more lines like [1, 2, 3, 4, 5] if needed

    tables.forEach(table => {
      lines.forEach(line => {
        resumeProgressCheck(table, line);
      });
    });

    // On unmount → clear all polling intervals
    return () => {
      Object.values(progressIntervalIds).forEach(intervalId => {
        if (intervalId) clearInterval(intervalId);
      });
    };
  }, []);

  const runNISTTest = async () => {
    if (!downloadedFile) {
      alert("Please download a file first using the Download File button");
      return;
    }

    const lineNo = 6;

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
      await upsertProgress(0, userId);
      setTestRunTrigger(prev => prev + 1);


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
    if (!downloadedFile) {
      alert("Please download a file first using the Download File button");
      return;
    }


    const lineNo = 6; // Using line 1 for Dieharder tests

    setDieharderResult(null);
    setLoadingProgress2(0);

    let progressIntervalId;
    const binaryInsertedRef = { current: false }; // Local ref for this function

    // Upsert progress function
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

      await upsertProgress(0, userId);
      setTestRunTrigger2(prev => prev + 1);



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

  const runNIST90BTest = async () => {
    if (!downloadedFile) {
      alert("Please download a file first using the Download File button");
      return;
    }

    const lineNo = 6;

    setNist90bResult(null);
    setLoadingProgress3(0);

    let progressIntervalId;
    const binaryInsertedRef = { current: false };

    // Upsert progress function
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
        scheduled_time: "2025-04-10 11:31:08",
        result: result,
        file_name: downloadedFile.name,
        upload_time: new Date().toISOString(),
        progress: progress,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('results2')
        .upsert(payload);

      if (error) {
        console.error("Supabase upsert error:", error.message);
      }
    };

    const fetchProgressFromSupabase = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("results2")
          .select("*")
          .eq("user_id", userId)
          .eq("line", lineNo)
          .maybeSingle();

        if (error) {
          return;
        }

        if (data) {
          const progress = data.progress || 0;
          setLoadingProgress3(progress);

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
      if (!userId) return;

      await upsertProgress(0, userId);
      setTestRunTrigger3(prev => prev + 1);



      // Start progress polling - FIXED: wrapped in function to pass userId
      progressIntervalId = setInterval(() => fetchProgressFromSupabase(userId), 1000);
      await fetchProgressFromSupabase(userId);

      try {
        const formData = new FormData();
        formData.append("file", downloadedFile);

        const hardcodedTime = "2025-04-10 11:31:08";

        formData.append("scheduled_time", hardcodedTime);
        formData.append("job_id", `nist90b_${Date.now()}`);
        formData.append("line", lineNo);
        formData.append("user_id", userId);
        formData.append("file_name", downloadedFile.name);

        const response = await axios.post(
          `${REACT_APP_BASE_URL}/nist90b_run/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 300000
          }
        );

        console.log("NIST 90B response:", response);

        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setNist90bResult(response.data);
        localStorage.setItem("resultFetchedFromSupabase90b", "true");
        await upsertProgress(100, userId, response.data.final_result);

      } catch (error) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        setLoadingProgress3(0);
        await upsertProgress(0, userId);

        console.error("Error running NIST 800-90B tests:", error);
        alert(`Error while running NIST 800-90B tests: ${error.response?.data?.error || error.message}`);

        setNist90bResult({
          final_result: "Test Failed",
          error: error.response?.data?.error || error.message
        });
      }
    };

    const cleanup = () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    };

    startProcess();

    return cleanup;
  };

  useEffect(() => {
    // Check if there's a download in progress when component mounts
    const downloadInProgress = sessionStorage.getItem('qrngDownloadInProgress') === 'true';

    if (downloadInProgress) {
      setLoading(true);

      // Optional: You might want to add a timeout to reset if download seems stuck
      const timeoutId = setTimeout(() => {
        sessionStorage.removeItem('qrngDownloadInProgress');
        setLoading(false);
        alert('Download session expired. Please try again.');
      }, 300000); // 5 minutes timeout

      return () => clearTimeout(timeoutId);
    }
  }, []);


  const handleClearConfiguration = async () => {
    // Replaced 'confirm' with 'alert' to comply with no-restricted-globals rule
    alert("All configurations have been cleared.");

    // Clear localStorage
    localStorage.removeItem('hostIP');
    localStorage.removeItem('fileSize');
    localStorage.removeItem('downloadedFileInfo');
    localStorage.removeItem('nistResult');
    localStorage.removeItem('dieharderResult');
    localStorage.removeItem('nist90bResult');

    // Clear state
    setHostIP("");
    setSize(1);
    setBinaryDownloaded(false);
    setDownloadedFile(null);
    setNistResult(null);
    setDieharderResult(null);
    setNist90bResult(null);
    setLoadingProgress(0);
    setLoadingProgress2(0);
    setLoadingProgress3(0);

    // Delete data from Supabase tables for line 1
    try {
      const userId = await fetchUserId();
      if (!userId) return;

      // Delete from results table (NIST Test)
      const { error: error1 } = await supabase
        .from('results')
        .delete()
        .eq('user_id', userId)
        .eq('line', 6);

      if (error1) {
        console.error("Error deleting from results table:", error1.message);
      }

      // Delete from results2 table (NIST 90B Test)
      const { error: error2 } = await supabase
        .from('results2')
        .delete()
        .eq('user_id', userId)
        .eq('line', 6);

      if (error2) {
        console.error("Error deleting from results2 table:", error2.message);
      }

      // Delete from results3 table (Dieharder Test)
      const { error: error3 } = await supabase
        .from('results3')
        .delete()
        .eq('user_id', userId)
        .eq('line', 6);

      if (error3) {
        console.error("Error deleting from results3 table:", error3.message);
      }

      console.log("Successfully cleared data from all Supabase tables");

    } catch (err) {
      console.error("Error clearing Supabase data:", err);
    }
  };

  useEffect(() => {
    // Load host IP from session storage on component mount
    const savedHostIP = sessionStorage.getItem('hostIP');
    if (savedHostIP) {
      setHostIP(savedHostIP);
    }
  }, []);

  useEffect(() => {
    // Wait until the page fully mounts
    const timer = setTimeout(() => {
      alert("Please do not switch the page until the file is downloaded.");
    }, 50); // small delay ensures page is loaded

    return () => clearTimeout(timer);
  }, []);

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
                onChange={(e) => {
                  setHostIP(e.target.value);
                  sessionStorage.setItem('hostIP', e.target.value);
                }}
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
                disabled={loading || sessionStorage.getItem('qrngDownloadInProgress') === 'true'}
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
                {loading || sessionStorage.getItem('qrngDownloadInProgress') === 'true'
                  ? "Downloading..."
                  : "Download QRNG File"
                }
              </Button>
            </Grid>

            {/* File Ready and Delete Icon in the same Grid item */}
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                <IconButton
                  onClick={handleClearConfiguration}
                  sx={{
                    color: colors.redAccent[500],
                    "&:hover": {
                      color: colors.redAccent[400],
                      backgroundColor: 'rgba(244, 67, 54, 0.1)', // subtle red background on hover
                    },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Box>
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
                    disabled={!binaryDownloaded || (loadingProgress > 0 && loadingProgress < 100)}
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
                    disabled={!binaryDownloaded || (loadingProgress2 > 0 && loadingProgress2 < 100)}
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
                    disabled={!binaryDownloaded || (loadingProgress3 > 0 && loadingProgress3 < 100)}
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
                disabled={
                  loadingProgress < 100 ||
                  loadingProgress2 < 100 ||
                  loadingProgress3 < 100 ||
                  !binaryDownloaded
                }
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
                {sessionStorage.getItem('reportGenerationInProgress') === 'true'
                  ? `Generating Report...`
                  : "Generate Test Report"
                }
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

