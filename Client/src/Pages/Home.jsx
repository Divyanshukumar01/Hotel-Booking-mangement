import { useEffect, useState } from 'react';
import api from '../Services/Api';
import HotelCard from '../components/HotelCard';
import '../Styles/Home.css';

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    api.get('/hotels').then(res => setHotels(res.data));
  }, []);

  return (
    <div className="home-container">
      <h1 style={{ textAlign: 'center' }}>Explore Rooms</h1>
      <div style={{margin: 20}} className="hotel-list">
        {hotels.map(hotel => <HotelCard key={hotel._id} hotel={hotel} />)}
      </div>
    </div>
  );
};

export default Home;