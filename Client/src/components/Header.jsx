import React from 'react';
import { Link } from 'react-router-dom';
import '..//Styles/Header.css';

const Header = () => (
  <nav className="navbar">
    <h2 className="logo">RoomVista</h2>
    <div className="nav-links">
      {/* <Link to="/">Home</Link> */}
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);

export default Header;