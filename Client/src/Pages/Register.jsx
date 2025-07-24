
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Services/Api';
import '../Styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          disabled={loading}
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        
        <p className="auth-switch">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
