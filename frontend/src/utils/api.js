import { mockAPI } from './mockData';
import { toast } from 'react-toastify';

// Mock API functions for standalone demo
export const authAPI = {
  // Register user
  register: async (userData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        token: 'mock-jwt-token',
        user: {
          id: 1,
          username: credentials.username,
          email: 'admin@securetransaction.in',
          roles: ['ADMIN', 'USER']
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (otpData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'OTP verified successfully' };
    } catch (error) {
      throw error;
    }
  },

  // Resend OTP
  resendOTP: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      throw error;
    }
  },
};

// User API
export const userAPI = {
  // Get current user
  getCurrentUser: async () => {
    try {
      return {
        id: 1,
        username: 'admin',
        email: 'admin@securetransaction.in',
        fullName: 'Rajesh Kumar',
        mobile: '+91 98765 43210',
        address: '123 MG Road, Bangalore, Karnataka 560001',
        roles: ['ADMIN', 'USER'],
        createdAt: new Date().toISOString(),
        enabled: true
      };
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      return await mockAPI.updateProfile(userData);
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      return await mockAPI.changePassword(passwordData);
    } catch (error) {
      throw error;
    }
  },
};

// Transaction API
export const transactionAPI = {
  // Get balance
  getBalance: async () => {
    try {
      return await mockAPI.getBalance();
    } catch (error) {
      throw error;
    }
  },

  // Get transaction history
  getTransactions: async (params = {}) => {
    try {
      return await mockAPI.getTransactions(params);
    } catch (error) {
      throw error;
    }
  },

  // Send money
  sendMoney: async (transactionData) => {
    try {
      return await mockAPI.sendMoney(transactionData);
    } catch (error) {
      throw error;
    }
  },

  // Get transaction by ID
  getTransactionById: async (id) => {
    try {
      const transactions = await mockAPI.getTransactions();
      const transaction = transactions.data.find(t => t.id === id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw error;
    }
  },
};

// Security API
export const securityAPI = {
  // Enable 2FA
  enable2FA: async (type) => {
    try {
      return await mockAPI.enable2FA(type);
    } catch (error) {
      throw error;
    }
  },

  // Disable 2FA
  disable2FA: async () => {
    try {
      return await mockAPI.disable2FA();
    } catch (error) {
      throw error;
    }
  },

  // Verify 2FA setup
  verify2FA: async (otp) => {
    try {
      return await mockAPI.verify2FA(otp);
    } catch (error) {
      throw error;
    }
  },
};

// Mock API instance for compatibility
export default {
  get: async (url) => ({ data: {} }),
  post: async (url, data) => ({ data: {} }),
  put: async (url, data) => ({ data: {} }),
  delete: async (url) => ({ data: {} })
};
