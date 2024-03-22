import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function HomePage({ initialMapImage }) {
  const [battleMapImage, setBattleMapImage] = useState(initialMapImage);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [gridData, setGridData] = useState([]);
  const imgRef = useRef();
  

  useEffect(() => {
    const savedBattleMapImage = localStorage.getItem('battleMapImage');
    if (savedBattleMapImage) {
      setBattleMapImage(savedBattleMapImage);
    } else {
      setBattleMapImage(initialMapImage);
    }

    const params = new URLSearchParams(window.location.search);
    const imageParam = params.get('image');
    if (imageParam) {
      setBattleMapImage(decodeURIComponent(imageParam));
    }
  }, [initialMapImage]);

  // useEffect(() => {
  //   const updateGrid = () => {
  //     // Calculate the size of each square based on the dimensions of the image
  //     const imageSize = {
  //       width: imgRef.current.naturalWidth, // You need to replace this with the actual width of your image
  //       height: imgRef.current.naturalHeight, // You need to replace this with the actual height of your image
  //     };
  //     const squareSize = 10; // Adjust this value based on how many squares you want horizontally
  //     const numSquaresX = imageSize.width / squareSize;
  //     const numSquaresY = imageSize.height / squareSize;

  //     // Generate grid data based on the calculated square sizes
  //     const newGridData = [];
  //     for (let i = 0; i < numSquaresY; i++) {
  //       for (let j = 0; j < numSquaresX; j++) {
  //         newGridData.push({
  //           sideLength: squareSize,
  //           xOffset: j * squareSize,
  //           yOffset: i * squareSize,
  //         });
  //       }
  //     }
  //     setGridData(newGridData);
  //   };

  //   updateGrid();
  // }, [battleMapImage]); // Update the grid when the image changes

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
    setOffset({ x: position.x, y: position.y });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleMouseWheel, { passive: false }); // Add this line
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (dragging) {
      const offsetX = event.clientX - startPosition.x;
      const offsetY = event.clientY - startPosition.y;
      setPosition({
        x: offset.x + offsetX,
        y: offset.y + offsetY
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseWheel = (event) => {
    event.preventDefault();
    if (dragging) {
      const delta = event.deltaY;
      const newScale = delta > 0 ? scale * 0.9 : scale * 1.1;
      setScale(Math.max(0.1, newScale));
    }
  };
  
  return (
    <div className='background_images'>
      <button onClick={() => window.location.href='/maps'} className="maps_button">
        <img src="/add_map_icon.png" alt="Revert icon" className="icon" />
      </button>
      <img 
        ref={imgRef}
        src={battleMapImage} 
        className="background_maps" 
        alt="Battle Map"
        style={{
          top: position.y,
          left: position.x,
          transform: `scale(${scale})`,
          cursor: dragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleMouseWheel}/>
      <div className="grid-lines" style={{ top: (position.y + ((1 - scale) * imgRef.current?.naturalHeight / 2)), left: (position.x + ((1 - scale) * imgRef.current?.naturalWidth / 2)) }}>
        {imgRef.current?.complete && Array.from({ length: imgRef.current?.naturalWidth / 10 }, (_, index) => (
          <React.Fragment key={index}>
            <div className="vertical-line" style={{ left: `${(index + 1) * 10 * scale}px`, height: imgRef.current?.naturalHeight * scale }} />
          </React.Fragment> 
        ))}
      </div>
      <div className="grid-lines" style={{ top: (position.y + ((1 - scale) * imgRef.current?.naturalHeight / 2 )), left: (position.x + ((1 - scale) * imgRef.current?.naturalWidth / 2)) }}>
        {imgRef.current?.complete && Array.from({ length: imgRef.current?.naturalHeight / 10 }, (_, index) => (
          <React.Fragment key={index}>
            <div className="horizontal-line" style={{ top: `${(index + 1) * 10 * scale}px`, width: imgRef.current?.naturalWidth * scale }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
