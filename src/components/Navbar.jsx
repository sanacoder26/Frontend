import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, PlusCircle, User, Shield, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div 
          className="nav-brand"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-icon">
            <LayoutGrid size={24} />
          </div>
          <span className="brand-text">BlogMaster</span>
        </div>

        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Feed</span>
          </Link>

          {user ? (
            <>
              <Link 
                to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} 
                className={`nav-link ${isActive('/user-dashboard') || isActive('/admin-dashboard') ? 'active' : ''}`}
              >
                <Shield size={20} />
                <span>Dashboard</span>
              </Link>
              
              <div className="user-profile">
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role.toUpperCase()}</span>
                </div>
                <button onClick={logout} className="logout-btn" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-primary" style={{ marginTop: 0, padding: '10px 20px', fontSize: '0.9rem' }}>Signup</Link>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
};


export default Navbar;
