// import React from 'react';
import '../Styles/Footer.css';
// import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>RoomVista</h3>
          <p>Your trusted partner for comfort and luxury stays.</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@roomvista.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123 Palace Rd, Jaipur, India</p>
        </div>

        <div className="footer-section">
          
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RoomVista. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
