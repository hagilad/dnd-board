import React, { useState, useEffect } from 'react';
import './App.css';
import Dropzone from 'react-dropzone';

function App() {
  const [backgroundImage, setBackgroundImage] = useState('/sample_battle_map.jpg');

  // Load background image from local storage on component mount
  useEffect(() => {
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedBackgroundImage) {
      setBackgroundImage(savedBackgroundImage);
    }
  }, []);

  const handleDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      setBackgroundImage(imageDataUrl);
      // Save background image to local storage
      localStorage.setItem('backgroundImage', imageDataUrl);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const removeBackgroundImage = () => {
    localStorage.removeItem('backgroundImage');
    setBackgroundImage('/sample_battle_map.jpg');
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <img src="/add_map_icon.png" alt="Upload icon" className="icon" />
          </div>
        )}
      </Dropzone>
      <button onClick={removeBackgroundImage} className="button">
        <img src="/revert_image_icon.png" alt="Revert icon" className="icon" />
      </button>
    </div>
  );
}

export default App;