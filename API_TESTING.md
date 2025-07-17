# API Testing Guide

This document provides comprehensive examples for testing all API endpoints.

## Prerequisites

1. Start the application (local or Docker)
2. Have a tool like Postman, curl, or HTTPie ready
3. Replace `YOUR_JWT_TOKEN` with actual token received from login

## 🔐 Authentication Endpoints

### 1. Register New Tenant & Admin User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "tenantName": "Tech Startup Inc",
    "email": "admin@techstartup.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1234567890abcdef123456",
    "email": "admin@techstartup.com",
    "role": "admin",
    "tenantId": "65f1234567890abcdef123457",
    "tenantName": "Tech Startup Inc"
  }
}
```

### 2. Login User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@techstartup.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1234567890abcdef123456",
    "email": "admin@techstartup.com",
    "role": "admin",
    "tenantId": "65f1234567890abcdef123457",
    "tenantName": "Tech Startup Inc"
  }
}
```

## 👥 Contact Management Endpoints

### 3. Create Contact

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "company": "Software Solutions LLC",
    "position": "Senior Developer",
    "address": {
      "street": "123 Tech Street",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94105",
      "country": "USA"
    },
    "notes": "Potential client for web development project",
    "tags": ["client", "developer", "web-dev"]
  }'
```

**Response:**
```json
{
  "message": "Contact created successfully",
  "contact": {
    "_id": "65f1234567890abcdef123458",
    "tenantId": "65f1234567890abcdef123457",
    "userId": "65f1234567890abcdef123456",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "company": "Software Solutions LLC",
    "position": "Senior Developer",
    "address": {
      "street": "123 Tech Street",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94105",
      "country": "USA"
    },
    "notes": "Potential client for web development project",
    "tags": ["client", "developer", "web-dev"],
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Get All Contacts (with Pagination)

**Request:**
```bash
curl "http://localhost:5000/api/contacts?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "contacts": [
    {
      "_id": "65f1234567890abcdef123458",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "company": "Software Solutions LLC",
      "position": "Senior Developer",
      "address": {
        "street": "123 Tech Street",
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94105",
        "country": "USA"
      },
      "notes": "Potential client for web development project",
      "tags": ["client", "developer", "web-dev"],
      "isActive": true,
      "userId": {
        "_id": "65f1234567890abcdef123456",
        "email": "admin@techstartup.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalContacts": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### 5. Search Contacts

**Request:**
```bash
curl "http://localhost:5000/api/contacts?search=john&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 6. Filter Contacts by Tag

**Request:**
```bash
curl "http://localhost:5000/api/contacts?tag=client&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 7. Get Single Contact

**Request:**
```bash
curl "http://localhost:5000/api/contacts/65f1234567890abcdef123458" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "contact": {
    "_id": "65f1234567890abcdef123458",
    "tenantId": "65f1234567890abcdef123457",
    "userId": {
      "_id": "65f1234567890abcdef123456",
      "email": "admin@techstartup.com"
    },
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "company": "Software Solutions LLC",
    "position": "Senior Developer",
    "address": {
      "street": "123 Tech Street",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94105",
      "country": "USA"
    },
    "notes": "Potential client for web development project",
    "tags": ["client", "developer", "web-dev"],
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 8. Update Contact

**Request:**
```bash
curl -X PUT http://localhost:5000/api/contacts/65f1234567890abcdef123458 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "+1234567890",
    "company": "Advanced Software Solutions LLC",
    "position": "Lead Developer",
    "notes": "Confirmed client for web development project",
    "tags": ["client", "lead-developer", "confirmed"]
  }'
```

**Response:**
```json
{
  "message": "Contact updated successfully",
  "contact": {
    "_id": "65f1234567890abcdef123458",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "+1234567890",
    "company": "Advanced Software Solutions LLC",
    "position": "Lead Developer",
    "notes": "Confirmed client for web development project",
    "tags": ["client", "lead-developer", "confirmed"],
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

### 9. Delete Contact (Soft Delete)

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/contacts/65f1234567890abcdef123458 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "message": "Contact deleted successfully"
}
```

### 10. Get Contact Statistics

**Request:**
```bash
curl "http://localhost:5000/api/contacts/stats" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "stats": {
    "totalContacts": 25,
    "recentContacts": 5,
    "topCompanies": [
      {
        "_id": "Software Solutions LLC",
        "count": 3
      },
      {
        "_id": "Tech Innovations Inc",
        "count": 2
      },
      {
        "_id": "Digital Marketing Pro",
        "count": 2
      }
    ]
  }
}
```

## 🏥 Health Check

### 11. Health Check

**Request:**
```bash
curl "http://localhost:5000/api/health"
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "service": "Saasify Backend"
}
```

## 🚨 Error Responses

### Authentication Error
```json
{
  "error": "Access denied. No token provided."
}
```

### Validation Error
```json
{
  "error": "Validation failed",
  "details": [
    {
      "type": "field",
      "msg": "Please provide a valid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

### Not Found Error
```json
{
  "error": "Contact not found"
}
```

### Duplicate Error
```json
{
  "error": "Contact with this email already exists"
}
```

## 📝 Testing Workflow

1. **Register** a new tenant and admin user
2. **Login** to get JWT token
3. **Create** several contacts with different data
4. **Search** and filter contacts
5. **Update** contact information
6. **Get statistics** to verify data
7. **Delete** a contact (soft delete)
8. **Verify** deleted contact doesn't appear in active list

## 🔧 Testing Tools

### Postman Collection
Import these requests into Postman for easier testing:
- Set base URL: `http://localhost:5000`
- Set Authorization header: `Bearer {{token}}`
- Use environment variables for dynamic values

### HTTPie Examples
```bash
# Register
http POST localhost:5000/api/auth/register tenantName="Test Corp" email="test@test.com" password="password123"

# Login
http POST localhost:5000/api/auth/login email="test@test.com" password="password123"

# Create contact
http POST localhost:5000/api/contacts Authorization:"Bearer TOKEN" name="Jane Doe" email="jane@example.com" phone="+1987654321"

# Get contacts
http GET localhost:5000/api/contacts Authorization:"Bearer TOKEN"
```

This comprehensive testing guide covers all the main API endpoints and common usage scenarios for the contact management system.