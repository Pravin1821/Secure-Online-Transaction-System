# 🚀 Quick Start Guide - Secure Transaction System

## ✅ Installation Complete!

Your Secure Transaction system is now ready to run. Here's how to get started:

## 🎯 Frontend (React + Vite)

### 1. Navigate to Frontend Directory
```bash
cd "C:\Users\PRAVIN S\OneDrive\Desktop\Secure Online Transaction project\frontend"
```

### 2. Install Dependencies (if needed)
```bash
npm install --legacy-peer-deps
```

### 3. Start Development Server
```bash
npm run dev
```

**✅ Your frontend is now running at: http://localhost:5173**

## 🔧 Backend (Spring Boot)

### 1. Navigate to Backend Directory
```bash
cd "C:\Users\PRAVIN S\OneDrive\Desktop\Secure Online Transaction project\backend"
```

### 2. Setup Database
- Install MySQL 8.0+
- Create database: `auth_db`
- Update `src/main/resources/application-dev.properties` with your database credentials

### 3. Run Backend
```bash
mvn spring-boot:run
```

**✅ Your backend will run at: http://localhost:8080**

## 🌐 Access Your Application

1. **Frontend**: http://localhost:5173
2. **Backend API**: http://localhost:8080/api

## 📱 Features Available

- ✅ **Home Page** - Landing page with animations
- ✅ **User Registration** - Complete signup form
- ✅ **OTP Verification** - 6-digit OTP input
- ✅ **User Login** - Secure authentication
- ✅ **Dashboard** - Balance and transactions
- ✅ **Profile Management** - User settings
- ✅ **Security Settings** - 2FA configuration

## 🔧 Troubleshooting

### If Frontend Won't Start:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### If Backend Won't Start:
```bash
# Check Java version (need Java 17+)
java -version

# Clean and rebuild
mvn clean install
mvn spring-boot:run
```

### Database Issues:
- Ensure MySQL is running
- Check database credentials in `application-dev.properties`
- Run the SQL migration script: `backend/src/main/resources/db/migration/V1__init.sql`

## 🎨 UI Features

- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Toggle in navbar
- **Smooth Animations** - Framer Motion powered
- **Modern UI** - Tailwind CSS + DaisyUI
- **Form Validation** - Real-time error checking

## 🔒 Security Features

- **BCrypt Password Hashing**
- **JWT Token Support** (extension ready)
- **Two-Factor Authentication**
- **Input Validation**
- **CORS Protection**

## 📚 Next Steps

1. **Test Registration** - Create a new account
2. **Verify OTP** - Complete email verification
3. **Login** - Access your dashboard
4. **Explore Features** - Try all the functionality
5. **Customize** - Modify the code as needed

## 🆘 Need Help?

- Check the console for any error messages
- Ensure both frontend and backend are running
- Verify database connection
- Check network connectivity

---

**🎉 Your Secure Transaction System is ready to use!**



