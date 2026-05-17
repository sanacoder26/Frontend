import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Mock functionality: Save email to localStorage
    localStorage.setItem('reset_email', email);
    
    toast.success('If this email exists, a reset link has been sent.');
    
    // For demo purposes, we'll redirect to the reset page after a short delay
    setTimeout(() => {
      navigate('/reset-password');
    }, 2000);
  };

  return (
    <div className="main-content">
      <div className="auth-card">
        <div className="header-icon">
          <Mail size={32} />
        </div>
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-subtitle">Enter your email and we'll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder="hello@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Send Reset Link
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '24px' }}>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
