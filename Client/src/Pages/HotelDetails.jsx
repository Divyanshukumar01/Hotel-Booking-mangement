import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import '../Styles/HotelDetails.css';
import hotelImage from '../Images/abc.avif';

const StarRating = ({ rating, size = 20 }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          style={{ fontSize: `${size}px` }}
        >
          ★
        </span>
      ))}
      <span className="rating-text">({rating.toFixed(1)} out of 5)</span>
    </div>
  );
};

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/hotels/${id}`).then(res => setHotel(res.data));
  }, [id]);

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  return hotel ? (
    <div className="hotel-details">
      <img src={hotel.image || hotelImage} alt={hotel.name} className="hotel-image" />
      <div className="hotel-details-content">
        <h1>{hotel.name}</h1>
        <StarRating rating={hotel.rating || 0} />
        <p>{hotel.description}</p>
        <div className="hotel-info">
          <h4>💰 Price: ₹{hotel.price}/night</h4> 
          <h4>👥 Capacity: {hotel.capacity}</h4>
          <h4>🍽️ Food Service: {hotel.foodservice}</h4>
          <h4>📍 Location: {hotel.location}</h4>
        </div>
        <button onClick={handleBooking} className="btn">Book Now</button>
      </div>
    </div>
  ) : <p>Loading...</p>;
};

export default HotelDetails;
