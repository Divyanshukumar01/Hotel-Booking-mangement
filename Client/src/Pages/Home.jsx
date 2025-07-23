import { useEffect, useState } from 'react';
import api from '../Services/Api';
import HotelCard from '../components/HotelCard';
import '../Styles/Home.css';
import HotelFilter from './HotelFilter';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    api.get('/hotels').then(res => {
      setHotels(res.data);
      setFilteredHotels(res.data);
    });
  }, []);

  const handleFilteredResults = (data) => {
    setFilteredHotels(data);
  };

  return (
    <div className="home-container">
      <h1 style={{ textAlign: 'center' }}>Explore Rooms</h1>
      <HotelFilter onFilter={handleFilteredResults} />
      <div style={{margin: 20}} className="hotel-list">
        {filteredHotels.map(hotel => <HotelCard key={hotel._id} hotel={hotel} />)}
      </div>
    </div>
  );
};

export default Home;
