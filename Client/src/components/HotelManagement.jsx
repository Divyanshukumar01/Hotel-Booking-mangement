import React, { useState, useEffect } from 'react';
import api from '../Services/Api';
import '../Styles/HotelManagement.css';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    price: '',
    capacity: '',
    foodservice: '',
    totalRooms: '',
    availableRooms: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await api.get('/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login as admin to manage hotels');
      setLoading(false);
      return;
    }
    
    // Validate form data
    if (!formData.name.trim() || !formData.location.trim() || !formData.description.trim() || 
        !formData.image.trim() || !formData.price || !formData.capacity.trim() || 
        !formData.foodservice.trim() || !formData.totalRooms || !formData.availableRooms) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    // Validate numeric fields
    if (isNaN(formData.price) || isNaN(formData.totalRooms) || isNaN(formData.availableRooms)) {
      alert('Price, Total Rooms, and Available Rooms must be valid numbers');
      setLoading(false);
      return;
    }
    
    if (Number(formData.availableRooms) > Number(formData.totalRooms)) {
      alert('Available rooms cannot be more than total rooms');
      setLoading(false);
      return;
    }
    
    try {
      if (editingHotel) {
        await api.put(`/hotels/${editingHotel._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Hotel updated successfully');
      } else {
        const response = await api.post('/hotels', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Hotel created:', response.data);
        alert('Hotel created successfully');
      }
      
      resetForm();
      fetchHotels();
    } catch (error) {
      console.error('Error saving hotel:', error);
      
      if (error.response?.status === 401) {
        alert('Unauthorized. Please login as admin.');
      } else if (error.response?.status === 400) {
        alert(`Validation error: ${error.response.data.message}`);
      } else {
        alert(`Failed to save hotel: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      image: hotel.image,
      price: hotel.price,
      capacity: hotel.capacity,
      foodservice: hotel.foodservice,
      totalRooms: hotel.totalRooms,
      availableRooms: hotel.availableRooms
    });
    setShowForm(true);
  };

  const handleDelete = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      const token = localStorage.getItem('token');
      try {
        await api.delete(`/hotels/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Hotel deleted successfully');
        fetchHotels();
      } catch (error) {
        alert('Failed to delete hotel');
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      description: '',
      image: '',
      price: '',
      capacity: '',
      foodservice: '',
      totalRooms: '',
      availableRooms: ''
    });
    setEditingHotel(null);
    setShowForm(false);
  };

  return (
    <div className="hotel-management">
      <div className="management-header">
        <h2>Hotel Management</h2>
        <button 
          className="add-hotel-btn"
          onClick={() => setShowForm(true)}
        >
          Add New Hotel
        </button>
      </div>

      {showForm && (
        <div className="hotel-form-modal">
          <div className="hotel-form">
            <h3>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Hotel Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
              
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="number"
                name="price"
                placeholder="Price per night"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="text"
                name="capacity"
                placeholder="Capacity (e.g., 2-4 people)"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="text"
                name="foodservice"
                placeholder="Food Service"
                value={formData.foodservice}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="number"
                name="totalRooms"
                placeholder="Total Rooms"
                value={formData.totalRooms}
                onChange={handleInputChange}
                required
              />
              
              <input
                type="number"
                name="availableRooms"
                placeholder="Available Rooms"
                value={formData.availableRooms}
                onChange={handleInputChange}
                required
              />
              
              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingHotel ? 'Update Hotel' : 'Add Hotel')}
                </button>
                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="hotels-list">
        {hotels.map(hotel => (
          <div key={hotel._id} className="hotel-management-card">
            <img src={hotel.image} alt={hotel.name} />
            <div className="hotel-info">
              <h4>{hotel.name}</h4>
              <p>{hotel.location}</p>
              <p>₹{hotel.price}/night</p>
              <p>Rooms: {hotel.availableRooms}/{hotel.totalRooms}</p>
            </div>
            <div className="hotel-actions">
              <button onClick={() => handleEdit(hotel)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(hotel._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelManagement;



