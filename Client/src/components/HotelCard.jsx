import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HotelCard.css';
// import hotelImage from '../Images/abc.avif';
const HotelCard = ({ hotel }) => (
  <div className="hotel-card">
    {/* <img src={hotelImage} alt={hotel.name} className="hotel-image" /> */}
        <img src={hotel.image} alt={hotel.name} className="hotel-image" />

    <h3>{hotel.name}</h3>
    <h4>{hotel.price}</h4>
    <p>{hotel.location}</p>
    <Link to={`/hotel/${hotel._id}`} className="btn">View Details</Link>
  </div>
);

export default HotelCard;
