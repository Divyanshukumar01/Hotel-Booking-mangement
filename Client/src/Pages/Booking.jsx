import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/Api';
import '../Styles/Booking.css';

const Booking = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    checkIn: '',
    checkOut: ''
  });
  const [isBooking, setIsBooking] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    // Validate all fields are filled
    if (!formData.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    if (!formData.age || formData.age <= 0) {
      alert('Please enter a valid age');
      return;
    }
    
    if (!formData.gender) {
      alert('Please select your gender');
      return;
    }
    
    if (!formData.checkIn) {
      alert('Please select check-in date');
      return;
    }
    
    if (!formData.checkOut) {
      alert('Please select check-out date');
      return;
    }
    
    // Validate check-out is after check-in
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert('Check-out date must be after check-in date');
      return;
    }
    
    // Validate check-in is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(formData.checkIn) < today) {
      alert('Check-in date cannot be in the past');
      return;
    }

    setIsBooking(true);
    const token = localStorage.getItem('token');
    try {
      await api.post(
        '/bookings',
        { hotelId: id, ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Booking successful');
      // Reset form after successful booking
      setFormData({
        fullName: '',
        age: '',
        gender: '',
        checkIn: '',
        checkOut: ''
      });
    } catch (err) {
      alert('Booking failed');
      console.error(err);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="booking-form">
      <h2>Book Your Stay</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        disabled={isBooking}
        required={!isBooking}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        disabled={isBooking}
        required="true"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        disabled={isBooking}
        required="true"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label style={{ fontWeight: 'bold', color: '#060815ff', display: 'block', marginBottom: '6px' }}>
        Check-in-Date
      </label>
      <input
        type="date"
        name="checkIn"
        value={formData.checkIn}
        onChange={handleChange}
        disabled={isBooking}
        require="true"
      />

      <label style={{ fontWeight: 'bold', color: '#060815ff', display: 'block', marginBottom: '6px' }}>
        Check-out-Date
      </label>
      <input
        type="date"
        name="checkOut"
        value={formData.checkOut}
        onChange={handleChange}
        disabled={isBooking}
        required="true"
      />

      <button 
        onClick={handleBooking} 
        className="btn"
        disabled={isBooking}
      >
        {isBooking ? 'Booking in Progress...' : 'Confirm Booking'}
      </button>
    </div>
  );
};

export default Booking;
