import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import "./UploadReport.css"; // Import CSS for styling

const UploadReport = () => {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        setIsUploading(true);
        setAnalysis(""); // Clear previous analysis

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:8000/reports/upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileName("");
        setAnalysis("");
        // Reset the file input
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    return (
        <div className="container">
            <h2 className="upload-heading">Upload Test Report</h2>

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
                    disabled={isUploading || !file}
                >
                    {isUploading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Uploading...
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