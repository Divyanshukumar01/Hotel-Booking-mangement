import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import '../Styles/HotelDetails.css';
import hotelImage from '../Images/abc.avif';
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
      <h2>{hotel.name}</h2>
      <h2>{hotel.price}</h2>
      <p>{hotel.description}</p>
      <button onClick={handleBooking} className="btn">Book Now</button>
    </div>
  ) : <p>Loading...</p>;
};

export default HotelDetails;
