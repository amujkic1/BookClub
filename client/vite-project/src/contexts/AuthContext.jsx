// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    Cookies.set('token', token);
    setIsAuthenticated(true);
    console.log('Login successful, isAuthenticated:', true);
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    console.log('Logout successful, isAuthenticated:', false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
