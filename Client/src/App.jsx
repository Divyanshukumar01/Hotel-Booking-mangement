import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import HotelDetails from './Pages/HotelDetails';
import Header from './components/Header';
import Booking from './Pages/Booking';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;