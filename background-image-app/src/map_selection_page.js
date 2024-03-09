import React from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

function importAllImages() {
    const images = {};
    const context = require.context('../public/battle_maps', false, /\.(png|jpe?g|svg)$/);
    context.keys().forEach((key) => {
      const imageName = key.split('/').pop(); // Get the filename from the path
      images[imageName] = context(key);
    });
    return images;
  }

export default function MapSelection() {
    const images = importAllImages();

    return (
        <div style={{ backgroundImage: `url(/backgrounds/map_selection.jpg` }} className='background_images'>
        <ul className='image_list'>
            {Object.keys(images).map((imageName) => (
            <Link to={`/?image=${encodeURIComponent(images[imageName])}`} className='image_link'>
                <img src={`/${encodeURIComponent(images[imageName])}`} className='image' alt={imageName}/>
            </Link>
            ))}
        </ul>
        </div>
    );
    }
