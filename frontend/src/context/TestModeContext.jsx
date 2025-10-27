import React, { createContext, useContext, useState } from 'react';

const TestModeContext = createContext();

export const useTestMode = () => {
  const context = useContext(TestModeContext);
  if (!context) {
    throw new Error('useTestMode must be used within a TestModeProvider');
  }
  return context;
};

export const TestModeProvider = ({ children }) => {
  const [isTestMode, setIsTestMode] = useState(false);
  const [mockUser] = useState({
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    password: 'User@123', // Note: In a real app, never store passwords in state
    fullName: 'Test User',
    phone: '+1234567890',
    address: '123 Test Street',
    createdAt: '2025-10-27'
  });

  const toggleTestMode = () => {
    setIsTestMode(prev => !prev);
  };

  return (
    <TestModeContext.Provider value={{ isTestMode, toggleTestMode, mockUser }}>
      {children}
    </TestModeContext.Provider>
  );
};