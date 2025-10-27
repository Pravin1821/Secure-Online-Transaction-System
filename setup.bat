@echo off
echo 🚀 Setting up Secure Transaction Frontend...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Navigate to frontend directory
cd frontend

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Copy environment file
if not exist .env (
    echo 📝 Creating environment file...
    copy env.example .env
    echo ✅ Environment file created. Please update .env with your configuration.
) else (
    echo ✅ Environment file already exists.
)

REM Create build directory
if not exist dist mkdir dist

echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Update .env file with your API URL
echo 2. Run 'npm run dev' to start development server
echo 3. Open http://localhost:5173 in your browser
echo.
echo 🔧 Available commands:
echo   npm run dev      - Start development server
echo   npm run build    - Build for production
echo   npm run preview  - Preview production build
echo   npm test         - Run tests
echo.
echo 📚 Documentation: See README.md for detailed information
pause



