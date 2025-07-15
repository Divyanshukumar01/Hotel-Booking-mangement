import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/Api';
import '../Styles/Booking.css';

const Booking = () => {
  const { id } = useParams();
  const [date, setDate] = useState('');

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    await api.post('/bookings', { hotelId: id, date }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Booking successful');
  };

  return (
    <div className="booking-form">
      <h2>Book Your Stay</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button onClick={handleBooking} className="btn">Confirm Booking</button>
    </div>
  );
};

export default Booking;