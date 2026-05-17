import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { newPassword, confirmPassword } = passwords;

    // Validation
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Mock functionality: Update the password in users_db
    const resetEmail = localStorage.getItem('reset_email');
    if (resetEmail) {
      const users = JSON.parse(localStorage.getItem('users_db') || '[]');
      const userIndex = users.findIndex(u => u.email === resetEmail);
      
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users_db', JSON.stringify(users));
        toast.success('Password reset successful! You can now login.');
        localStorage.removeItem('reset_email');
        navigate('/login');
      } else {
        toast.error('User not found. Please try again.');
        navigate('/forgot-password');
      }
    } else {
      toast.error('Session expired. Please start over.');
      navigate('/forgot-password');
    }
  };

  return (
    <div className="main-content">
      <div className="auth-card">
        <div className="header-icon">
          <Lock size={32} />
        </div>
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">Create a new secure password for your account.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                name="newPassword"
                placeholder="••••••••" 
                value={passwords.newPassword}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="••••••••" 
                value={passwords.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
