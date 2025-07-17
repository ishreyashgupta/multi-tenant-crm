Multi-Tenant SaaS Backend with Contact Management
A scalable and secure backend system designed to support multi-tenant architecture with isolated user data, role-based access control (RBAC), and comprehensive contact management functionality. The system is built with a modular architecture, focusing on flexibility, security, and maintainability—ideal for SaaS platforms.

🚀 Project Highlights
Built using Node.js (Express.js) with MongoDB (Mongoose ODM) database
Supports multi-tenant architecture with tenant-aware user authentication and authorization
Implements Role-Based Access Control (RBAC) to manage fine-grained access across roles like admin, manager, and user
Complete Contact Management System with CRUD operations, search, pagination, and analytics
JWT-based authentication for stateless session management
Comprehensive input validation and error handling
Modular Express.js structure with controllers, middleware, and routing for clean code separation
Containerized deployment using Docker with MongoDB setup
RESTful API design with proper HTTP status codes and responses
🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB with Mongoose ODM
Authentication: JWT (JSON Web Tokens)
Validation: Express-validator
Containerization: Docker & Docker Compose
Security: Helmet, CORS, bcryptjs
📁 Project Structure
.
├── package.json                    # Project dependencies and scripts
├── docker-compose.yml              # Docker container orchestration
├── Dockerfile                      # Container configuration
├── .env.example                    # Environment variables template
├── init-mongo.js                   # MongoDB initialization script
├── README.md                       # Project documentation
└── src/
    ├── config/
    │   └── db.js                   # MongoDB connection configuration
    ├── controllers/
    │   ├── authController.js       # Authentication logic (register/login)
    │   └── contactController.js    # Contact CRUD operations
    ├── middleware/
    │   ├── auth.js                 # JWT authentication & authorization
    │   └── validation.js           # Input validation middleware
    ├── models/
    │   ├── Tenant.js               # Tenant schema
    │   ├── User.js                 # User schema with roles
    │   └── Contact.js              # Contact schema with full details
    ├── routes/
    │   ├── authRoutes.js           # Authentication routes
    │   └── contactRoutes.js        # Contact management routes
    └── server.js                   # Main application entry point
🔧 API Endpoints
Authentication
POST /api/auth/register - Register new tenant and admin user
POST /api/auth/login - User login
Contact Management
GET /api/contacts - Get all contacts (with search, pagination)
POST /api/contacts - Create new contact
GET /api/contacts/:id - Get single contact
PUT /api/contacts/:id - Update contact
DELETE /api/contacts/:id - Delete contact (soft delete)
GET /api/contacts/stats - Get contact statistics
Health Check
GET /api/health - Service health status
🏃‍♂️ Quick Start
Prerequisites
Node.js 18+ and npm
MongoDB 4.4+ (or use Docker)
Docker and Docker Compose (optional)
Option 1: Local Development
Clone the repository
bash
git clone <your-repo-url>
cd saasify-backend
Install dependencies
bash
npm install
Setup environment variables
bash
cp .env.example .env
Edit .env with your configuration:
env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/saasify
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
Start MongoDB (if not using Docker)
bash
# Install and start MongoDB locally
mongod
Run the application
bash
npm run dev
Option 2: Docker Development
Clone and navigate to project
bash
git clone <your-repo-url>
cd saasify-backend
Start with Docker Compose
bash
docker-compose up -d
This will start:

MongoDB on port 27017
Node.js app on port 5000
Mongo Express (DB GUI) on port 8081
Access the application
API: http://localhost:5000
Health Check: http://localhost:5000/api/health
Database GUI: http://localhost:8081 (admin/admin)
📊 Contact Management Features
Core Functionality
Create Contacts: Add new contacts with comprehensive details
Search & Filter: Search by name, email, company, or phone
Pagination: Efficient handling of large contact lists
Tag System: Organize contacts with custom tags
Soft Delete: Contacts are deactivated, not permanently deleted
Tenant Isolation: Each tenant's contacts are completely isolated
Contact Fields
Basic Info: Name, Email, Phone
Professional: Company, Position
Address: Street, City, State, ZIP, Country
Additional: Notes, Tags, Active Status
Metadata: Created/Updated timestamps, Creator reference
Advanced Features
Statistics Dashboard: Total contacts, recent additions, top companies
Multi-tenant Support: Complete data isolation per tenant
Role-based Access: Different permissions for admin/manager/user
Input Validation: Comprehensive validation for all fields
Error Handling: Proper error messages and HTTP status codes
🔐 Security Features
JWT Authentication: Stateless session management
Password Hashing: bcryptjs with salt rounds
Input Validation: Express-validator for all inputs
Tenant Isolation: Complete data separation between tenants
Role-based Access Control: Fine-grained permissions
Security Headers: Helmet.js for security headers
CORS Protection: Configurable cross-origin requests
📈 Usage Examples
Register a New Tenant
bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "tenantName": "Acme Corp",
    "email": "admin@acme.com",
    "password": "securepassword123"
  }'
Login
bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@acme.com",
    "password": "securepassword123"
  }'
Create a Contact
bash
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
Get Contacts with Search
bash
curl "http://localhost:5000/api/contacts?search=john&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
🐳 Docker Commands
bash
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
🔄 Development Workflow
Development: Use npm run dev for hot-reloading
Testing: Test API endpoints with Postman or curl
Database: Use Mongo Express GUI for database inspection
Deployment: Build Docker image and deploy to your platform
✅ Features Implemented
✅ Multi-Tenant Authentication (Users & Tenants)
✅ JWT Login and Token Storage
✅ Tenant Isolation Middleware
✅ Role-Based Access Control (RBAC)
✅ Complete Contact Management System
✅ Search and Pagination
✅ Input Validation and Error Handling
✅ Docker Containerization
✅ MongoDB Integration
✅ RESTful API Design
🚧 Future Enhancements
🔄 Contact Import/Export (CSV, Excel)
🔄 Billing System - Stripe/Razorpay Integration
🔄 Advanced Search Filters
🔄 Contact Activity Logging
🔄 Email Integration
🔄 API Rate Limiting
🔄 Automated Testing Suite
🔄 Kubernetes Deployment
🔄 Performance Monitoring
📝 License
This project is licensed under the ISC License.

Built with ❤️ for modern SaaS applications

