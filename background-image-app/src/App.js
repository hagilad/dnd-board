import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Routes and Route from react-router-dom

import HomePage from './home_page.js';
import MapSelection from './map_selection_page.js';

function App() {
  const initialBackgroundImage = '/battle_maps/sample_battle_map.jpg';

  return (
    <Router>
      <div className="background_images">
        <Routes>
          <Route path="/" element={<HomePage initialMapImage={initialBackgroundImage} />} />
          <Route path="/maps" element={<MapSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
