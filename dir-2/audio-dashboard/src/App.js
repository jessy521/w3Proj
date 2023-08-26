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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

    const handleFileChange = (event) => {
    setSelectedFile(Array.from(event.target.files));
    };

   const handleUpload = async (files) => {
        try {
            const formData = new FormData();
            
          files.forEach(file => {
            formData.append('audioFiles', file);
          });
          console.log('formData->',formData);
            
            const response = await axios.post('http://localhost:3001/api/audio/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
          
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
      <FileUploader onUpload={handleUpload} />
      <AudioList files={uploadedFiles} />
      {error ? <p>An error occurred: {error.message}</p> : null}
      <ToastContainer />
    </div>
  );
};

export default App;
