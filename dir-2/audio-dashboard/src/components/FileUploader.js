import React, { useState } from 'react';

const FileUploader = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleUpload = () => {
    onUpload(selectedFiles);
    setSelectedFiles([]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom:"25px" }}>
      <input type="file" multiple accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* <div> {Math.round(this.state.loaded,2) } %</div> */}
    </div>
  );
};

export default FileUploader;
