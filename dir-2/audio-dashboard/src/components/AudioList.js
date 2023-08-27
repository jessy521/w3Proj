import React, { useRef, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";

const AudioList = () => {
   // State to hold the audio file data
  const [files, setFiles] = useState([]);

  // Ref for accessing the audio element
  const audioRef = useRef();
  
  // Callback for when metadata of the audio is loaded
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      console.log((audioRef.current.duration/60).toFixed(2));
    }
  };
  

 // Fetching data from the API and setting it in the 'files' state
  useEffect(() => {
    async function fetchdata() {
    const response = await axios.get("http://localhost:3001/api/audio");
    setFiles(response.data);  
    }
    fetchdata();
  }, []);
  
  // Rendering the component
  return (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Table className="table">
    <thead className="bg-body-tertiary" style={{ backgroundColor: "#333", color: "white" }}>
          <tr>
            {/* Heads of the table */}
        <th scope="col">Song No</th>
        <th scope="col">File Name</th>
        <th scope="col">Duration</th>
        <th scope="col">Size</th>
        <th scope="col">Date of upload</th>
        <th scope="col">Play</th>
      </tr>
    </thead>
        <tbody>
          {/* Mapping over each file in the 'files' state */}
          {files.map((file, index) => (
        <tr key={index}>
          <th style={{ borderBottom: "none" }} scope="row">{index + 1}</th>
              <td style={{ borderBottom: "none" }}>{file.name}</td>
              <td style={{ borderBottom: "none" }}>{file.duration.toFixed(2)} Seconds</td>
          <td style={{ borderBottom: "none" }}>{file.fileSize} bytes</td>
          <td style={{ borderBottom: "none" }}>{new Date(file.dateOfUpload).toLocaleDateString()}</td>
          <td style={{ borderBottom: "none" ,width:"10%"}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* Audio element */}
                  <audio controls ref={audioRef} onLoadedMetadata={onLoadedMetadata} style={{ width: "100%", maxWidth: "200px" }}>
                    {/* Source for audio playback */}
                    <source src={`http://localhost:3001/api/audio/${file.src}`} />
                Your browser does not support the audio element.
                  </audio>
                  {/* Progress bar */}
              <div style={{ flex: 1, marginLeft: "10px" }}>
                <progress
                  value="0" //  initial progress value
                  max="1"   //  maximum value 
                  style={{ width: "100%", height: "8px" }} // Adjust width and height as needed
                ></progress>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>

  );
};

export default AudioList;
