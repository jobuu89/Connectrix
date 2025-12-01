import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    // Check for existing session on mount
    // This would typically involve checking localStorage or making an API call
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
