import React from 'react';
import { FaStar } from 'react-icons/fa'; // Ensure react-icons is installed

const StarRating = ({ currentRating, onRating }) => {
  // Function to handle star click
  const handleRating = (rate) => {
    onRating(rate); // Call the onRating function with the new rating
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              style={{ display: 'none' }} // Hide the radio input
            />
            <FaStar
              className="star" // Add a class for styling if needed
              size={20}
              color={ratingValue <= currentRating ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
