import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // TODO: Validate token and fetch user data
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.token);
        toast.success('Login successful!');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      toast.error('Login failed: ' + (error.message || 'Unknown error'));
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    // Mock registration - always succeeds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Registration successful! Please verify your OTP.');
    }, 1000);
  };

  const verifyOTP = async (otpData) => {
    // Mock OTP verification - always succeeds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('OTP verified successfully!');
    }, 1000);
  };

  const resendOTP = async () => {
    // Mock resend OTP - always succeeds
    setTimeout(() => {
      toast.success('OTP sent successfully!');
    }, 500);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    toast.success('You have been logged out securely.');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
