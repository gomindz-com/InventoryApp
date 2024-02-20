import React from 'react';
import './Spinner.css'; 

const Spinner = ({height, width}) => {
  return (
    <div className="spinner-container">
      <div className="spinner" 
     style={{ width, height}}></div>
    </div>
  );
};

export default Spinner;
