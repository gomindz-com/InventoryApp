// Spinner.js
import React from 'react';
import './Spinner.css'; // Import CSS for styling

const Spinner = ({height, width}) => {

  console.log(height)
  return (
    <div className="spinner-container">
      <div className="spinner" 
     style={{ width, height}}></div>
    </div>
  );
};

export default Spinner;
