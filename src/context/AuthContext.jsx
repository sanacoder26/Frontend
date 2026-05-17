import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize users_db if empty
    const existingUsers = localStorage.getItem('users_db');
    if (!existingUsers) {
      const initialAdmin = {
        id: 'admin-1',
        fullName: 'System Admin',
        email: 'admin@gmail.com',
        password: '12345678',
        role: 'admin'
      };
      localStorage.setItem('users_db', JSON.stringify([initialAdmin]));
    }

    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = { 
        name: foundUser.fullName, 
        email: foundUser.email, 
        role: foundUser.role,
        id: foundUser.id 
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'mock-jwt-token-' + Math.random());
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
      
      if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      toast.error('Email already exists');
      return false;
    }

    // Security check: Only admin@gmail.com can be an admin
    let finalRole = userData.role;
    if (finalRole === 'admin' && userData.email !== 'admin@gmail.com') {
      toast.warning('Only authorized accounts can be admins. Setting role to User.');
      finalRole = 'user';
    }

    const newUser = { 
      ...userData, 
      role: finalRole,
      id: Date.now() 
    };
    users.push(newUser);
    localStorage.setItem('users_db', JSON.stringify(users));
    toast.success('Account created successfully! Please login.');
    navigate('/login');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
