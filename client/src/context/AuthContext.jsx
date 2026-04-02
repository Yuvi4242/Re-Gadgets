import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('regadget_token'));
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  // Set auth header whenever token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('regadget_token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('regadget_token');
    }
  }, [token]);

  const fetchMe = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    toast.success('Logged in successfully!');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    window.location.href = '/login';
  };

  const completeUserProfile = (isComplete) => {
    setUser(prev => ({ ...prev, isProfileComplete: isComplete }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
        completeUserProfile,
        api, // Exporting api instance for use in components
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
