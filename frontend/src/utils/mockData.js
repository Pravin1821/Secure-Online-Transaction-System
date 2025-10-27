// Mock data for standalone frontend demo

export const mockBalance = {
  amount: 125000.50,
  available: 120000.00,
  pending: 5000.50,
  lastUpdated: new Date().toISOString(),
  currency: 'INR'
};

export const mockTransactions = [
  {
    id: 'TXN001',
    type: 'send',
    description: 'Payment to Rajesh Kumar',
    amount: 2500.00,
    status: 'completed',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    receiver: 'rajesh.kumar@gmail.com'
  },
  {
    id: 'TXN002',
    type: 'receive',
    description: 'Salary payment',
    amount: 50000.00,
    status: 'completed',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    sender: 'company@payroll.in'
  },
  {
    id: 'TXN003',
    type: 'send',
    description: 'Grocery shopping at Big Bazaar',
    amount: 850.50,
    status: 'completed',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    receiver: 'bigbazaar@store.com'
  },
  {
    id: 'TXN004',
    type: 'deposit',
    description: 'Bank transfer from SBI',
    amount: 100000.00,
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    sender: 'sbi@bank.in'
  },
  {
    id: 'TXN005',
    type: 'withdrawal',
    description: 'ATM withdrawal from HDFC',
    amount: 2000.00,
    status: 'completed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    receiver: 'hdfc@atm.com'
  },
  {
    id: 'TXN006',
    type: 'send',
    description: 'Electricity bill payment - BSES',
    amount: 1507.75,
    status: 'completed',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    receiver: 'bses@electricity.in'
  },
  {
    id: 'TXN007',
    type: 'receive',
    description: 'Freelance payment from client',
    amount: 7500.00,
    status: 'completed',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    sender: 'client@freelance.in'
  },
  {
    id: 'TXN008',
    type: 'send',
    description: 'Online purchase from Flipkart',
    amount: 2999.99,
    status: 'failed',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    receiver: 'flipkart@store.com'
  }
];

export const mockUserStats = {
  totalTransactions: 156,
  totalSent: 450000.00,
  totalReceived: 750000.00,
  averageTransaction: 7692.31,
  monthlyTransactions: 23,
  favoriteRecipient: 'rajesh.kumar@gmail.com'
};

export const mockSecuritySettings = {
  twoFactorEnabled: false,
  emailNotifications: true,
  smsNotifications: false,
  loginAlerts: true,
  transactionAlerts: true,
  lastPasswordChange: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
};

// Mock API functions
export const mockAPI = {
  // Balance API
  getBalance: () => Promise.resolve(mockBalance),
  
  // Transactions API
  getTransactions: (params = {}) => {
    let filteredTransactions = [...mockTransactions];
    
    // Apply filters
    if (params.period) {
      const days = params.period === '7days' ? 7 : 
                   params.period === '30days' ? 30 : 
                   params.period === '90days' ? 90 : 365;
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.createdAt) >= cutoffDate
      );
    }
    
    if (params.status && params.status !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => 
        t.status === params.status
      );
    }
    
    if (params.type && params.type !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => 
        t.type === params.type
      );
    }
    
    return Promise.resolve({
      data: filteredTransactions,
      total: filteredTransactions.length,
      page: params.page || 1,
      totalPages: Math.ceil(filteredTransactions.length / 10)
    });
  },
  
  // Send money API
  sendMoney: (transactionData) => {
    const newTransaction = {
      id: `TXN${Date.now()}`,
      type: 'send',
      description: transactionData.description || 'Money transfer',
      amount: parseFloat(transactionData.amount),
      status: 'completed',
      createdAt: new Date().toISOString(),
      receiver: transactionData.receiverAccount
    };
    
    mockTransactions.unshift(newTransaction);
    mockBalance.amount -= parseFloat(transactionData.amount);
    mockBalance.available -= parseFloat(transactionData.amount);
    
    return Promise.resolve({
      success: true,
      transaction: newTransaction,
      newBalance: mockBalance
    });
  },
  
  // User API
  getCurrentUser: () => Promise.resolve({
    id: 1,
    username: 'admin',
    email: 'admin@securetransaction.com',
    fullName: 'Admin User',
    mobile: '+1 (555) 123-4567',
    address: '123 Admin Street, Admin City, AC 12345',
    roles: ['ADMIN', 'USER'],
    createdAt: new Date().toISOString(),
    enabled: true
  }),
  
  updateProfile: (userData) => Promise.resolve({
    success: true,
    user: { ...userData, id: 1 }
  }),
  
  changePassword: (passwordData) => Promise.resolve({
    success: true,
    message: 'Password changed successfully'
  }),
  
  // Security API
  getSecuritySettings: () => Promise.resolve(mockSecuritySettings),
  enable2FA: (type) => Promise.resolve({
    success: true,
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    secret: 'JBSWY3DPEHPK3PXP'
  }),
  disable2FA: () => Promise.resolve({ success: true }),
  verify2FA: (otp) => Promise.resolve({ success: true })
};
