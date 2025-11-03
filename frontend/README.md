# Secure Transaction Frontend

A modern, responsive React frontend for the Secure Transaction system built with Vite, Tailwind CSS, DaisyUI, and Framer Motion.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Authentication**: Complete user registration, login, and OTP verification
- **Dashboard**: Real-time balance, quick transactions, and transaction history
- **Security**: Two-factor authentication, profile management, and security settings
- **Responsive**: Mobile-first design that works on all devices
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Framer Motion** - Animation library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling and validation
- **React Toastify** - Toast notifications
- **React OTP Input** - OTP input component

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Navigation component
│   ├── ProtectedRoute.jsx # Route protection
│   ├── BalanceCard.jsx  # Balance display
│   ├── TransactionTable.jsx # Transaction history
│   └── OTPInput.jsx     # OTP input component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Register.jsx    # User registration
│   ├── VerifyOtp.jsx   # OTP verification
│   ├── Login.jsx       # User login
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Transactions.jsx # Transaction history
│   ├── Profile.jsx     # User profile
│   └── Security.jsx    # Security settings
├── context/            # React context
│   └── AuthContext.jsx # Authentication context
├── utils/               # Utility functions
│   └── api.js          # API client
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd secure-transaction-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📱 Features Overview

### 🏠 Home Page
- Hero section with app introduction
- Call-to-action buttons for login/register
- Feature highlights with animations
- Responsive design

### 🔐 Authentication
- **Registration**: Full form with validation
- **Login**: Username/email and password
- **OTP Verification**: 6-digit OTP input
- **Password Strength**: Real-time strength indicator
- **Form Validation**: Client-side validation with error messages

### 📊 Dashboard
- **Balance Card**: Current balance with animations
- **Quick Transfer**: Send money form
- **Recent Transactions**: Latest transaction history
- **Real-time Updates**: Balance updates after transactions

### 📈 Transactions
- **Transaction History**: Complete transaction list
- **Filters**: Filter by date, status, type
- **Export**: CSV export functionality
- **Pagination**: Handle large transaction lists

### 👤 Profile Management
- **Personal Info**: Update name, mobile, address
- **Password Change**: Secure password update
- **Security Question**: Set security question
- **Profile Picture**: Avatar management

### 🔒 Security Settings
- **Two-Factor Authentication**: Email, SMS, Authenticator
- **QR Code**: For authenticator app setup
- **Security Tips**: Best practices guide
- **OTP Verification**: Secure 2FA setup

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #1d4ed8)
- **Secondary**: Gray tones
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font**: Inter (system font stack)
- **Headings**: Bold, gradient text
- **Body**: Regular weight, good contrast

### Components
- **Cards**: Glassmorphism effect with shadows
- **Buttons**: Rounded, hover effects
- **Forms**: Clean inputs with validation states
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Secure Transaction
VITE_ENABLE_2FA=true
```

### Tailwind Configuration
- Custom color palette
- DaisyUI theme integration
- Responsive breakpoints
- Animation utilities

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm, md, lg, xl
- **Grid System**: CSS Grid and Flexbox
- **Touch Friendly**: Large touch targets

## ♿ Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant
- **Focus Management**: Clear focus indicators

## 🚀 Performance

- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Component lazy loading
- **Optimized Images**: WebP format support
- **Bundle Analysis**: Vite bundle analyzer

## 🔒 Security

- **Input Validation**: Client and server-side
- **XSS Protection**: Sanitized inputs
- **CSRF Protection**: Token-based protection
- **Secure Headers**: Security headers

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **API Connection Issues**
   - Check API URL in .env
   - Verify backend is running
   - Check CORS configuration

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check DaisyUI theme settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ using React, Vite, and Tailwind CSS**




