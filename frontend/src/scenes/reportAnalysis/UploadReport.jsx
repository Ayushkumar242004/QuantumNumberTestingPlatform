import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import "./UploadReport.css"; // Import CSS for styling

const UploadReport = () => {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [showApiKeyInput, setShowApiKeyInput] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first!");
            setTimeout(() => setError(""), 5000);
            return;
        }

        if (!apiKey || !apiKey.trim()) {
            setError("Please provide your Gemini API key first!");
            setShowApiKeyInput(true);
            setTimeout(() => setError(""), 5000);
            return;
        }

        setIsUploading(true);
        setAnalysis(""); // Clear previous analysis
        setError(""); // Clear previous errors

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey.trim());

        try {
            const response = await axios.post("http://100.86.167.54:8000/reports/upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.analysis) {
                setAnalysis(response.data.analysis);
                setError(""); // Clear any previous errors on success
            } else {
                setError("No analysis received from server. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            
            // Extract error message from response
            let errorMessage = "Error uploading file. Please try again.";
            if (error.response && error.response.data) {
                if (error.response.data.error) {
                    errorMessage = error.response.data.error;
                    // Add details if available
                    if (error.response.data.details && error.response.data.details !== error.response.data.error) {
                        errorMessage += `\n\nDetails: ${error.response.data.details}`;
                    }
                } else if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setError(errorMessage);
            setAnalysis(""); // Clear analysis on error
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileName("");
        setAnalysis("");
        setError("");
        // Reset the file input
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const handleApiKeySubmit = () => {
        if (!apiKey || !apiKey.trim()) {
            setError("Please enter a valid API key");
            setTimeout(() => setError(""), 5000);
            return;
        }
        setShowApiKeyInput(false);
        setError("");
    };

    return (
        <div className="container">
            <h2 className="upload-heading">Upload Test Report</h2>

            {/* API Key Section */}
            <div className="api-key-section">
                {!showApiKeyInput && !apiKey ? (
                    <button
                        onClick={() => setShowApiKeyInput(true)}
                        className="api-key-btn"
                    >
                        Add Gemini API Key
                    </button>
                ) : showApiKeyInput || !apiKey ? (
                    <div className="api-key-input-container">
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your Gemini API key"
                            className="api-key-input"
                            disabled={isUploading}
                        />
                        <button
                            onClick={handleApiKeySubmit}
                            className="api-key-submit-btn"
                            disabled={isUploading}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setShowApiKeyInput(false);
                                // Don't clear apiKey on cancel - keep the existing value
                            }}
                            className="api-key-cancel-btn"
                            disabled={isUploading}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="api-key-display">
                        <span className="api-key-status">✓ API Key configured</span>
                        <button
                            onClick={() => {
                                setShowApiKeyInput(true);
                            }}
                            className="api-key-change-btn"
                            disabled={isUploading}
                        >
                            Change
                        </button>
                    </div>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="error-message">
                    <strong>Error:</strong>
                    <pre>{error}</pre>
                </div>
            )}

            <div className="file-upload-container">
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept=".pdf" // Add appropriate file types
                />
                
                {/* File selection area */}
                <div className="file-selection-area">
                    <label htmlFor="fileInput" className="file-upload-label">
                        <div className="file-upload-box">
                            <span className="file-upload-text">
                                {fileName ? fileName : "Choose File"}
                            </span>
                            
                        </div>
                    </label>
                    
                    {/* File info and actions */}
                    {/* {fileName && (
                        <div className="file-info">
                            <span className="file-name">{fileName}</span>
                            <button 
                                type="button" 
                                className="remove-file-btn"
                                onClick={handleRemoveFile}
                                disabled={isUploading}
                            >
                                ×
                            </button>
                        </div>
                    )} */}
                </div>

                {/* Upload button */}
                <button 
                    onClick={handleUpload} 
                    className="upload-btn" 
                    disabled={isUploading || !file || !apiKey}
                >
                    {isUploading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Analyzing...
                        </>
                    ) : (
                        "Upload & Analyze"
                    )}
                </button>
            </div>

            {/* Analysis Result */}
            {analysis && (
                <div className="analysis-container">
                    <div className="analysis-header">
                        <h3 className="analysis-heading">Analysis Result</h3>
                        <div className="file-indicator">
                            Analyzing: <strong>{fileName}</strong>
                        </div>
                    </div>
                    <div className="analysis-content scrollable-content">
                        <div dangerouslySetInnerHTML={{ __html: marked(analysis) }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadReport;