import React, { useState, useEffect } from 'react';
import api from '../Services/Api';
import '../Styles/HotelFilter.css';

const HotelFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const [locations, setLocations] = useState([]);
  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
    api.get('/hotels/locations')
      .then(res => setLocations(res.data))
      .catch(err => {
        console.error('Failed to fetch locations:', err);
        alert('Could not load locations');
      });
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLocationSearchChange = (e) => {
    setLocationSearch(e.target.value);
  };

  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleSelectLocation = (loc) => {
    setFilters({ ...filters, location: loc });
    setLocationSearch('');
  };

  const handleSearch = async () => {
    try {
      const searchLocation = locationSearch.trim();
      const finalFilters = { ...filters };

      if (searchLocation && !finalFilters.location) {
        finalFilters.location = searchLocation;
      }

      const filteredParams = Object.fromEntries(
        Object.entries(finalFilters).filter(([_, v]) => v !== '')
      );

      console.log('Making request to:', '/hotels/filter');
      console.log('With params:', filteredParams);

      const response = await api.get('/hotels/filter', {
        params: filteredParams
      });

      console.log('Response received:', response.data);
      if (onFilter) {
        onFilter(response.data);
      } else {
        console.warn('onFilter is not defined');
      }

    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        url: err.config?.url
      });
      
      if (err.response?.status === 404) {
        alert('No hotels found matching your criteria.');
      } else if (err.code === 'ERR_NETWORK') {
        alert('Cannot connect to server. Please check if the server is running on port 5000.');
      } else {
        alert(`Failed to fetch hotels: ${err.message}`);
      }
    }
  };

  return (
    <div className="hotel-filter">
      <input
        type="text"
        placeholder="Search or Select Location"
        value={locationSearch}
        onChange={handleLocationSearchChange}
        className="location-search-input"
      />

      {locationSearch && filteredLocations.length > 0 && (
        <ul className="location-suggestions">
          {filteredLocations.map((loc, idx) => (
            <li key={idx} onClick={() => handleSelectLocation(loc)}>
              {loc}
            </li>
          ))}
        </ul>
      )}

      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
      />

      <button onClick={handleSearch} className="btn">Filter</button>
    </div>
  );
};

export default HotelFilter;
