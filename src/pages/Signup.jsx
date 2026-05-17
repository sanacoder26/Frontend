import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, User, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="main-content">
      <div className="auth-card">
        <div className="header-icon">
          <UserPlus size={32} />
        </div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join our premium community today</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                name="fullName"
                placeholder="John Doe" 
                required 
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

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
          </div>

          <div className="input-group">
            <label>I am a...</label>
            <div className="role-selector">
              <button 
                type="button"
                className={`role-btn ${formData.role === 'user' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'user' })}
              >
                <User size={18} />
                User
              </button>
              <button 
                type="button"
                className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'admin' })}
              >
                <Shield size={18} />
                Admin
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '24px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>

    </div>
  );
};

export default Signup;
