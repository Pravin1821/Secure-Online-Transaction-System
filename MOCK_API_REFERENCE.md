# 📚 Mock API Reference - Secure Transaction System

## 🎯 **Standalone Frontend with Mock Data**

Your Secure Transaction system now works completely standalone with realistic mock data. No backend required!

## 🔧 **Mock API Endpoints**

### **Authentication APIs**
```javascript
// Register user
authAPI.register(userData)
// Returns: { success: true, message: 'Registration successful' }

// Login user  
authAPI.login(credentials)
// Returns: { success: true, token: 'mock-jwt-token', user: {...} }

// Verify OTP
authAPI.verifyOTP(otpData)
// Returns: { success: true, message: 'OTP verified successfully' }

// Resend OTP
authAPI.resendOTP()
// Returns: { success: true, message: 'OTP sent successfully' }

// Forgot password
authAPI.forgotPassword(email)
// Returns: { success: true, message: 'Password reset email sent' }
```

### **User APIs**
```javascript
// Get current user
userAPI.getCurrentUser()
// Returns: Admin user object with full details

// Update profile
userAPI.updateProfile(userData)
// Returns: { success: true, user: {...} }

// Change password
userAPI.changePassword(passwordData)
// Returns: { success: true, message: 'Password changed successfully' }
```

### **Transaction APIs**
```javascript
// Get balance
transactionAPI.getBalance()
// Returns: { amount: 125000.50, available: 120000.00, pending: 5000.50 }

// Get transactions
transactionAPI.getTransactions(params)
// Returns: { data: [...], total: 8, page: 1, totalPages: 1 }

// Send money
transactionAPI.sendMoney(transactionData)
// Returns: { success: true, transaction: {...}, newBalance: {...} }

// Get transaction by ID
transactionAPI.getTransactionById(id)
// Returns: Transaction object
```

### **Security APIs**
```javascript
// Enable 2FA
securityAPI.enable2FA(type)
// Returns: { success: true, qrCode: 'data:image/...', secret: 'JBSWY3DPEHPK3PXP' }

// Disable 2FA
securityAPI.disable2FA()
// Returns: { success: true }

// Verify 2FA
securityAPI.verify2FA(otp)
// Returns: { success: true }
```

## 📊 **Mock Data Available**

### **💰 Balance Data**
```javascript
{
  amount: 125000.50,
  available: 120000.00,
  pending: 5000.50,
  lastUpdated: "2024-01-15T10:30:00.000Z"
}
```

### **👤 Admin User Data**
```javascript
{
  id: 1,
  username: 'admin',
  email: 'admin@securetransaction.com',
  fullName: 'Admin User',
  mobile: '+1 (555) 123-4567',
  address: '123 Admin Street, Admin City, AC 12345',
  roles: ['ADMIN', 'USER'],
  createdAt: '2024-01-01T00:00:00.000Z',
  enabled: true,
  twoFactorEnabled: false
}
```

### **💳 Sample Transactions**
```javascript
[
  {
    id: 'TXN001',
    type: 'send',
    description: 'Payment to John Doe',
    amount: 250.00,
    status: 'completed',
    createdAt: '2024-01-13T10:30:00.000Z',
    receiver: 'john.doe@email.com'
  },
  {
    id: 'TXN002',
    type: 'receive',
    description: 'Salary payment',
    amount: 5000.00,
    status: 'completed',
    createdAt: '2024-01-10T10:30:00.000Z',
    sender: 'company@payroll.com'
  },
  // ... 6 more transactions
]
```

## 🎯 **How to Use Mock APIs**

### **1. Automatic Admin Login**
- App automatically logs you in as admin
- No authentication required
- All protected routes accessible

### **2. Realistic Data**
- Balance updates when sending money
- Transaction history with filters
- Profile information editable
- Security settings configurable

### **3. Interactive Features**
- Send money updates balance
- Form submissions show success messages
- OTP verification always succeeds
- 2FA setup with QR codes

## 🔧 **API Response Examples**

### **Login Response**
```javascript
{
  success: true,
  token: 'mock-jwt-token',
  user: {
    id: 1,
    username: 'admin',
    email: 'admin@securetransaction.com',
    roles: ['ADMIN', 'USER']
  }
}
```

### **Balance Response**
```javascript
{
  amount: 125000.50,
  available: 120000.00,
  pending: 5000.50,
  lastUpdated: '2024-01-15T10:30:00.000Z'
}
```

### **Transaction Response**
```javascript
{
  data: [
    {
      id: 'TXN001',
      type: 'send',
      description: 'Payment to John Doe',
      amount: 250.00,
      status: 'completed',
      createdAt: '2024-01-13T10:30:00.000Z',
      receiver: 'john.doe@email.com'
    }
    // ... more transactions
  ],
  total: 8,
  page: 1,
  totalPages: 1
}
```

### **Send Money Response**
```javascript
{
  success: true,
  transaction: {
    id: 'TXN009',
    type: 'send',
    description: 'Money transfer',
    amount: 100.00,
    status: 'completed',
    createdAt: '2024-01-15T10:30:00.000Z',
    receiver: 'recipient@email.com'
  },
  newBalance: {
    amount: 124900.50,
    available: 119900.00,
    pending: 5000.50
  }
}
```

## 🚀 **Testing the APIs**

### **1. Open Browser Console**
- Press F12 → Console tab
- All API calls are logged
- See mock responses in real-time

### **2. Test API Calls**
```javascript
// Test balance API
transactionAPI.getBalance().then(console.log);

// Test transactions API
transactionAPI.getTransactions().then(console.log);

// Test send money
transactionAPI.sendMoney({
  receiverAccount: 'test@email.com',
  amount: '50.00',
  description: 'Test payment'
}).then(console.log);
```

### **3. Monitor Network Tab**
- F12 → Network tab
- See all API calls
- Mock responses visible

## 🎯 **Key Features**

### **✅ Realistic Mock Data**
- 8 sample transactions
- Realistic balance amounts
- Complete user profile
- Security settings

### **✅ Interactive Functionality**
- Send money updates balance
- Form validation works
- OTP verification succeeds
- 2FA setup functional

### **✅ No Backend Required**
- Completely standalone
- All APIs mocked
- Realistic delays
- Success/error responses

## 🎉 **Your Mock API is Ready!**

**Status**: ✅ All APIs working with mock data
**Access**: http://localhost:5173
**Admin Login**: ✅ Automatic
**All Features**: ✅ Functional with realistic data

**Start testing your Secure Transaction System now!** 🚀




