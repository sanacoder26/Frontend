import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <div className="main-content">
      <div className="auth-card">
        <div className="header-icon">
          <LogIn size={32} />
        </div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Login to manage your posts</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                name="email"
                placeholder="hello@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Link to="/forgot-password" style={{ 
              display: 'block', 
              textAlign: 'right', 
              fontSize: '0.85rem', 
              color: 'var(--text-muted)',
              marginTop: '8px',
              textDecoration: 'none'
            }}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '24px' }}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
