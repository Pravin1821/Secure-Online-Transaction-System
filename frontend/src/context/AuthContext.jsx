import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

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
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
      setLoading(false);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed: ' + error.message);
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
    setIsAuthenticated(false);
    toast.success('You have been logged out securely.');
  };

  const value = {
    user,
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
