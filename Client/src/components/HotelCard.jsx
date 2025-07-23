import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HotelCard.css';

const StarRating = ({ rating, size = 16, interactive = false, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarClick = (starValue) => {
    if (interactive) {
      setCurrentRating(starValue);
      if (onRatingChange) {
        onRatingChange(starValue);
      }
    }
  };

  const handleStarHover = (starValue) => {
    if (interactive) {
      setHoverRating(starValue);
    }
  };

  const handleStarLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const displayRating = interactive ? (hoverRating || currentRating) : rating;

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= displayRating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          style={{ fontSize: `${size}px` }}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
        >
          ★
        </span>
      ))}
      <span className="rating-text">
        ({interactive ? currentRating.toFixed(1) : rating.toFixed(1)})
      </span>
    </div>
  );
};

const HotelCard = ({ hotel }) => {
  const handleRatingChange = (newRating) => {
    console.log(`New rating for ${hotel.name}: ${newRating}`);
    // You can add API call here to update rating in database
  };

  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-card-content">
        <h3>{hotel.name}</h3>
        <p className="location">{hotel.location}</p>
        <StarRating 
          rating={hotel.rating || 0} 
          interactive={true}
          onRatingChange={handleRatingChange}
        />
        <div className="price">₹{hotel.price}/night</div>
        <Link to={`/hotel/${hotel._id}`} className="btn">View Details</Link>
      </div>
    </div>
  );
};

export default HotelCard;
