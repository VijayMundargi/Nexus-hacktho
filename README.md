# AI-Powered Manufacturing Order Management System

A conversational AI-based manufacturing workflow management platform built using MERN Stack and Grok AI.

---

# Features

- AI-powered order creation
- Natural language processing (NLP)
- Order status tracking
- Quality inspection logs
- JWT authentication
- Role-based access control
- Real-time dashboard

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## AI Integration
- Grok API

---

# Folder Structure

```bash
backend/
frontend/
README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GROK_SECRET=your_api_key
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/orders | Create order |
| GET | /api/orders | Get all orders |
| POST | /api/quality | Add quality log |

---

# Authentication

- JWT Authentication
- bcrypt password hashing
- Protected routes
- Role-based access

---

# AI Workflow

```text
User Chat
   ↓
Grok AI Processing
   ↓
Extract Order Details
   ↓
MongoDB Storage
   ↓
Dashboard Update
```

---

# Future Enhancements

- Voice AI support
- ERP integration
- Real-time notifications
- Multi-language support

---

# Author

Vijay Mundargi