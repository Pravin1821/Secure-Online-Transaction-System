# Secure User Authentication System

A production-ready full-stack authentication system built with React (Vite) + TypeScript frontend and Spring Boot backend with MySQL database.

## 🏗️ Architecture

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Spring Boot 3.x + Spring Security + Spring Data JPA
- **Database**: MySQL 8.0
- **Authentication**: BCrypt password hashing + Spring Security
- **Containerization**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose (optional)

### Development Setup

1. **Clone and setup**:
```bash
git clone <repository-url>
cd secure-auth-system
```

2. **Backend setup**:
```bash
cd backend
cp src/main/resources/application-dev.properties.example src/main/resources/application-dev.properties
# Edit application-dev.properties with your database credentials
mvn spring-boot:run
```

3. **Frontend setup**:
```bash
cd frontend
npm install
npm run dev
```

4. **Database setup**:
```bash
# Using Docker Compose (recommended)
docker-compose up -d db

# Or setup MySQL manually and run migrations
mysql -u root -p < backend/src/main/resources/db/migration/V1__init.sql
```

### Production Setup

```bash
# Using Docker Compose
docker-compose up -d

# Or build and run individually
docker build -t auth-backend ./backend
docker build -t auth-frontend ./frontend
```

## 📁 Project Structure

```
secure-auth-system/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/example/auth/
│   │   ├── controller/      # REST controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data repositories
│   │   ├── service/        # Business logic
│   │   ├── security/       # Security configuration
│   │   ├── config/         # Application configuration
│   │   └── exception/      # Exception handling
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/   # Database migrations
│   ├── src/test/           # Backend tests
│   └── pom.xml
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript types
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml      # Docker services
├── .github/workflows/      # CI/CD
└── docs/                  # Documentation
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/me` - Get current user (protected)

### Example Requests

**Register**:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

**Get Current User**:
```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer <token>" \
  -H "Cookie: JSESSIONID=<session-id>"
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
cd frontend
npm run test:e2e
```

## 🐳 Docker

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production
```bash
docker-compose up -d
```

## 🔧 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=auth_db
DB_USERNAME=root
DB_PASSWORD=password
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
```

## 🚀 Deployment

### CI/CD Pipeline
The project includes GitHub Actions workflow that:
- Runs tests on push/PR
- Builds Docker images
- Deploys to staging/production (configurable)

### Manual Deployment
1. Build Docker images
2. Push to registry
3. Deploy to your infrastructure

## 🔒 Security Features

- BCrypt password hashing
- CORS configuration
- Input validation
- SQL injection protection
- XSS protection headers
- Session management
- Rate limiting (configurable)

## 📈 Next Steps & Extensions

- [ ] JWT token-based authentication
- [ ] Role-based access control (RBAC)
- [ ] OAuth2 integration (Google, GitHub)
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Password reset functionality
- [ ] Rate limiting
- [ ] Audit logging
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
