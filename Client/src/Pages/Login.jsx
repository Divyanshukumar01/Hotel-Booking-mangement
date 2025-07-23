import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import '../Styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
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
      
      // Force page reload to update header
      window.location.reload();
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (userType) => {
    setLoading(true);
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
      
      // Force page reload to update header
      window.location.reload();
    } catch (err) {
      alert('Demo login failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login to RoomVista</h2>
        
        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Admin:</strong> admin@roomvista.com / admin123</p>
          <p><strong>User:</strong> john@example.com / password123</p>
        </div>
        
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          type="email"
          required 
          disabled={loading}
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="demo-buttons">
          <button 
            type="button" 
            onClick={() => handleDemoLogin('admin')}
            className="demo-btn admin-btn"
            disabled={loading}
          >
            Demo Admin Login
          </button>
          <button 
            type="button" 
            onClick={() => handleDemoLogin('user')}
            className="demo-btn user-btn"
            disabled={loading}
          >
            Demo User Login
          </button>
        </div>
        
        <p className="auth-switch">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
