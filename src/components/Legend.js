import React from 'react';
import './Legend.css'; // Assuming you will create a separate CSS file for styling

const Legend = () => {
  return (
    <div className="legend">
      <span>⭐ &lt; 3: Not Relevant</span>
      <span>⭐ &ge; 3: Relevant</span>
    </div>
  );
};

export default Legend;
