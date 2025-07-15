// import React from 'react';
import '../Styles/Footer.css';
// import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>HotelEase</h3>
          <p>Your trusted partner for comfort and luxury stays.</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@hotelease.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123 Palace Rd, Jaipur, India</p>
        </div>

        <div className="footer-section">
          
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HotelEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
