// files for uploading the selecting files
import React, { useState } from 'react';

const FileUploader = ({ onUpload }) => {
  // State to hold selected files
  const [selectedFiles, setSelectedFiles] = useState([]);

   // Event handler for file input change
  const handleFileChange = (event) => {
    // Combine the newly selected files with previously selected files
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  // Event handler for upload button click
  const handleUpload = () => {
    // Call the provided onUpload function with the selected files
    onUpload(selectedFiles);
    // Clear the selected files after upload
    setSelectedFiles([]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom:"25px" }}>
      <input type="file" multiple accept="audio/*" onChange={handleFileChange} required/>
      <button
        class="btn btn-primary btn-sm"
        onClick={handleUpload}
        disabled={selectedFiles.length === 0}>
        Upload
      </button>
      {selectedFiles.length === 0 ? <h8>&nbsp;&nbsp;&nbsp;**select files to enable</h8> : <span></span>}
    </div>
  );
};

export default FileUploader;
