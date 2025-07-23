import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import '../Styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert('Login successful');
      
      // Redirect based on user role
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    }
  };

  const handleDemoLogin = async (userType) => {
    const credentials = userType === 'admin' 
      ? { email: 'admin@roomvista.com', password: 'admin123' }
      : { email: 'john@example.com', password: 'password123' };
    
    try {
      const res = await api.post('/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert(`${userType === 'admin' ? 'Admin' : 'User'} login successful`);
      
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      alert('Demo login failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <input 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
      
      <div className="demo-buttons">
        <button 
          type="button" 
          onClick={() => handleDemoLogin('admin')}
          className="demo-btn admin-btn"
        >
          Demo Admin Login
        </button>
        <button 
          type="button" 
          onClick={() => handleDemoLogin('user')}
          className="demo-btn user-btn"
        >
          Demo User Login
        </button>
      </div>
    </form>
  );
};

export default Login;
