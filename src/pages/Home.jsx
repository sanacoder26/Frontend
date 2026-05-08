import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user')) || { name: 'User' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="main-content">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{ maxWidth: '600px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
            padding: '12px', 
            borderRadius: '16px' 
          }}>
            <LayoutDashboard color="white" size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Protected area</p>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          borderRadius: '16px', 
          padding: '24px',
          border: '1px solid var(--glass-border)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ background: '#334155', padding: '10px', borderRadius: '50%' }}>
              <User size={24} color="var(--primary)" />
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Welcome back,</p>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700' }}>{userData.name}</h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)' }}>
            <ShieldCheck size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Session Active & Secure</span>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          className="btn-primary" 
          style={{ 
            background: 'transparent', 
            border: '1px solid var(--error)', 
            color: 'var(--error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
