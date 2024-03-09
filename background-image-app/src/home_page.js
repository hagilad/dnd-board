import React, { useState, useEffect } from 'react';
import './App.css';
import Dropzone from 'react-dropzone';

export default function HomePage({ initialBackgroundImage }) {
  const [backgroundImage, setBackgroundImage] = useState(initialBackgroundImage);

  // Load background image from local storage on component mount
  useEffect(() => {
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedBackgroundImage) {
      setBackgroundImage(savedBackgroundImage);
    }
    // Parse query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const imageParam = params.get('image');
    if (imageParam) {
      setBackgroundImage(decodeURIComponent(imageParam));
    }
  }, []);

  const enter_choose_map_page = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      setBackgroundImage(imageDataUrl);
      // Save background image to local storage
      localStorage.setItem('backgroundImage', imageDataUrl);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  return (
    <div className="background_images" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <button onClick={() => window.location.href='/maps'} className="maps_button">
        <img src="/add_map_icon.png" alt="Revert icon" className="icon" />
      </button>
    </div>
  );
}
