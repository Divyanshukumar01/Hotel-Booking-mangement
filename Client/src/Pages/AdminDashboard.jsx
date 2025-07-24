import React, { useState, useEffect } from 'react';
import api from '../Services/Api';
import HotelManagement from '../components/HotelManagement';
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    fetchHotels();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/admin');
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await api.get('/hotels');
      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.put(`/bookings/cancel/${bookingId}`);
        alert('Booking cancelled successfully');
        fetchBookings();
        fetchHotels();
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'hotels' ? 'active' : ''}
          onClick={() => setActiveTab('hotels')}
        >
          Manage Hotels
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-section">
          <h2>Hotel Availability</h2>
          <div className="hotels-grid">
            {hotels.map(hotel => (
              <div key={hotel._id} className="hotel-availability-card">
                <h3>{hotel.name}</h3>
                <p className="location">{hotel.location}</p>
                <div className="availability-info">
                  <span className="total-rooms">Total Rooms: {hotel.totalRooms}</span>
                  <span className={`available-rooms ${hotel.availableRooms === 0 ? 'no-rooms' : ''}`}>
                    Available: {hotel.availableRooms}
                  </span>
                  <span className="booked-rooms">
                    Booked: {hotel.totalRooms - hotel.availableRooms}
                  </span>
                </div>
                <div className="occupancy-bar">
                  <div 
                    className="occupancy-fill"
                    style={{ 
                      width: `${((hotel.totalRooms - hotel.availableRooms) / hotel.totalRooms) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'hotels' && <HotelManagement />}

      {activeTab === 'bookings' && (
        <div className="dashboard-section">
          <h2>Recent Bookings</h2>
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Hotel</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                  <th>Booking Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking.fullName}</td>
                    <td>{booking.hotelId?.name}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>
                      <span className={`status ${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={() => cancelBooking(booking._id)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
