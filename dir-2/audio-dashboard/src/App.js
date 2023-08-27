import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import Heading from './components/Header';
import AudioList from './components/AudioList';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // states
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  // Handle file input change
    const handleFileChange = (event) => {
    setSelectedFile(Array.from(event.target.files));
    };

  // Handle file upload
   const handleUpload = async (files) => {
        try {
            const formData = new FormData();
            
          // Append each selected file to the FormData object
          files.forEach(file => {
            formData.append('audioFiles', file);
          });

            
          // Send a POST request to upload the files
          const response = await axios.post('http://localhost:3001/api/audio/upload', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
            
          // Check the response status and display a success toast
          if (response.status === 201) {
            toast.success('Files uploaded successfully,refresh page', {
              position: "top-center",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "light",
              });
          }else {
            throw new Error('Reduce files');
          } 

        } catch (error) {
          setError(error);
          // Display an error toast
          toast.error(`An error occurred: ${error.message}`, {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
        }
    };

  return (
    <div>
      <Heading />
      {/* FileUploader component for selecting and uploading audio files */}
      <FileUploader onUpload={handleUpload} />

      {/* AudioList component to display the list of uploaded files */}
      <AudioList files={uploadedFiles} />

      {/* Display error message if an error occurred */}
      {error ? <p>An error occurred: {error.message}</p> : null}

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
