# Multi-Tenant SaaS Backend with Contact Management

<div align="center">

A scalable and secure backend system designed to support multi-tenant architecture with isolated user data, role-based access control (RBAC), and comprehensive contact management functionality.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-brightgreen.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

</div>

---

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
# Clone and start
git clone <your-repo-url>
cd saasify-backend
docker-compose up -d

# Access your API at http://localhost:5000
```

### Local Development
```bash
# Install and run
npm install
cp .env.example .env
npm run dev
```

---

## ✨ Key Features

<table>
<tr>
<td>

**🏢 Multi-Tenant**
- Complete tenant isolation
- Tenant-aware authentication
- Separate data per organization

</td>
<td>

**🔐 Security First**
- JWT authentication
- Role-based access control
- bcrypt password hashing

</td>
</tr>
<tr>
<td>

**📇 Contact Management**
- Full CRUD operations
- Search & pagination
- Tag system & soft delete

</td>
<td>

**🛠️ Developer Ready**
- RESTful API design
- Docker containerization
- Comprehensive validation

</td>
</tr>
</table>

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new tenant |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/contacts` | Get contacts (search, pagination) |
| `POST` | `/api/contacts` | Create contact |
| `GET` | `/api/contacts/:id` | Get single contact |
| `PUT` | `/api/contacts/:id` | Update contact |
| `DELETE` | `/api/contacts/:id` | Delete contact (soft) |
| `GET` | `/api/contacts/stats` | Contact statistics |
| `GET` | `/api/health` | Health check |

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Containerization**: Docker & Docker Compose
- **Security**: Helmet, CORS, bcryptjs

---

## 📁 Project Structure

```
src/
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── authController.js       # Authentication logic
│   └── contactController.js    # Contact CRUD operations
├── middleware/
│   ├── auth.js                 # JWT auth & authorization
│   └── validation.js           # Input validation
├── models/
│   ├── Tenant.js               # Tenant schema
│   ├── User.js                 # User schema with roles
│   └── Contact.js              # Contact schema
├── routes/
│   ├── authRoutes.js           # Auth routes
│   └── contactRoutes.js        # Contact routes
└── server.js                   # Main entry point
```

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB 4.4+ (or use Docker)
- Docker and Docker Compose (optional)

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit with your configuration
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/saasify
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Local Development
```bash
# Install dependencies
npm install

# Start MongoDB locally
mongod

# Run the application
npm run dev
```

### Docker Development
```bash
# Start all services
docker-compose up -d

# Services will be available at:
# - API: http://localhost:5000
# - MongoDB: localhost:27017
# - Mongo Express: http://localhost:8081 (admin/admin)
```

---

## 📊 Contact Management Features

### Core Functionality
- **Create Contacts**: Add comprehensive contact details
- **Search & Filter**: Search by name, email, company, or phone
- **Pagination**: Efficient handling of large contact lists
- **Tag System**: Organize contacts with custom tags
- **Soft Delete**: Contacts are deactivated, not permanently deleted
- **Tenant Isolation**: Complete data separation per tenant

### Contact Fields
- **Basic Info**: Name, Email, Phone
- **Professional**: Company, Position
- **Address**: Street, City, State, ZIP, Country
- **Additional**: Notes, Tags, Active Status
- **Metadata**: Created/Updated timestamps, Creator reference

### Advanced Features
- **Statistics Dashboard**: Total contacts, recent additions, top companies
- **Role-based Access**: Different permissions for admin/manager/user
- **Input Validation**: Comprehensive validation for all fields
- **Error Handling**: Proper error messages and HTTP status codes

---

## 🔐 Security Features

- **JWT Authentication**: Stateless session management
- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Express-validator for all inputs
- **Tenant Isolation**: Complete data separation between tenants
- **Role-based Access Control**: Fine-grained permissions
- **Security Headers**: Helmet.js for security headers
- **CORS Protection**: Configurable cross-origin requests

---

## 📈 Usage Examples

<details>
<summary>Register a New Tenant</summary>

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "tenantName": "Acme Corp",
    "email": "admin@acme.com",
    "password": "securepassword123"
  }'
```
</details>

<details>
<summary>Login</summary>

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@acme.com",
    "password": "securepassword123"
  }'
```
</details>

<details>
<summary>Create a Contact</summary>

```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "company": "Tech Solutions Inc",
    "position": "Software Engineer",
    "tags": ["client", "developer"]
  }'
```
</details>

<details>
<summary>Get Contacts with Search</summary>

```bash
curl "http://localhost:5000/api/contacts?search=john&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
</details>

---

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

# Access MongoDB shell
docker exec -it saasify-mongodb mongo -u admin -p password123
```

---

## ✅ Features Implemented

- ✅ Multi-Tenant Authentication (Users & Tenants)
- ✅ JWT Login and Token Storage
- ✅ Tenant Isolation Middleware
- ✅ Role-Based Access Control (RBAC)
- ✅ Complete Contact Management System
- ✅ Search and Pagination
- ✅ Input Validation and Error Handling
- ✅ Docker Containerization
- ✅ MongoDB Integration
- ✅ RESTful API Design

---

## 🚧 Future Enhancements

- 🔄 Contact Import/Export (CSV, Excel)
- 🔄 **Billing System & Subscription Management**
  - Subscription plans and pricing tiers
  - Payment gateway integration (Stripe, PayPal)
  - Usage tracking and metering
  - Invoice generation and management
- 🔄 Email Integration
- 🔄 API Rate Limiting
- 🔄 Automated Testing Suite

---

## 🔄 Development Workflow

- **Development**: Use `npm run dev` for hot-reloading
- **Testing**: Test API endpoints with Postman or curl
- **Database**: Use Mongo Express GUI for database inspection
- **Deployment**: Build Docker image and deploy to your platform

---

## 📝 License

This project is licensed under the ISC License.

---

<div align="center">

**Built with ❤️ for modern SaaS applications**

[Report Bug](https://github.com/your-username/saasify-backend/issues) · [Request Feature](https://github.com/your-username/saasify-backend/issues)

</div>
