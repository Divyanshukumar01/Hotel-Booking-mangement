import React, { useState, useEffect } from 'react';
import api from '../Services/Api';
import HotelFilter from './HotelFilter';
import HotelCard from './HotelDetails';
import '../Styles/Home.css';

const HotelListPage = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get('/hotels');
        setHotels(res.data);
        setFilteredHotels(res.data); // Initially show all
      } catch (err) {
        console.error('Failed to fetch hotels:', err);
      }
    };

    fetchHotels();
  }, []);

  const handleFilteredResults = (data) => {
    setFilteredHotels(data);
  };

  return (
    <div className="hotel-list-page">
      <h2>Find Your Hotel</h2>
      <HotelFilter onFilter={handleFilteredResults} />

      <div className="hotel-list">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <p>No hotels match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default HotelListPage;
