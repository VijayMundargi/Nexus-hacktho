# SMVR SmartCart AI Powered Order Mangement System

Enterprise-grade conversational manufacturing workflow platform built using MERN Stack and AI-powered automation.

---

# Overview

Modern manufacturing companies struggle with:

* spreadsheet-based workflow management
* email communication delays
* manual production tracking
* disconnected quality inspections
* poor operational visibility

This platform replaces traditional manufacturing operations with an AI-driven workflow management system where users can:

* create orders using natural language
* monitor production lifecycle
* track workflow stages
* manage manufacturing operations
* monitor quality inspection status
* view real-time analytics dashboards

---

# Features

## AI Manufacturing Assistant

* Conversational AI workflow system
* Natural language order creation
* Intelligent workflow updates
* AI-generated analytics

---

## Enterprise Dashboard

* Real-time workflow visibility
* Manufacturing lifecycle monitoring
* Production analytics
* Workflow distribution graphs
* Operational insights

---

## Order Management

* Create manufacturing orders
* Track order lifecycle
* Update workflow stages
* Manage priorities
* Deadline monitoring

---

## Authentication & Security

* JWT authentication
* Protected routes
* Secure password hashing
* Role-based access control

---

## Modern Enterprise UI

* Fully responsive design
* Modern white enterprise theme
* Glassmorphism interface
* Animated analytics dashboard
* Production-level UI system

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* Recharts
* Axios
* React Router DOM
* Lucide React

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv
* Cookie Parser
* CORS

---

## AI Integration

* Gemini AI API

---

# Folder Structure

```bash
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js
└── package.json

frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── package.json

README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
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

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_api_key
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Install additional frontend dependencies:

```bash
npm install framer-motion recharts axios react-router-dom lucide-react
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/v1/register | Register user |
| POST   | /api/v1/login    | Login user    |

---

## Orders

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| POST   | /api/v1/orders/create     | Create manufacturing order |
| GET    | /api/v1/orders            | Get all orders             |
| GET    | /api/v1/orders/:id        | Get single order           |
| PUT    | /api/v1/orders/:id/status | Update workflow status     |
| DELETE | /api/v1/orders/:id        | Delete order               |

---

## AI

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | /api/v1/ai/chat | AI workflow assistant |

---

## Analytics

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | /api/v1/analytics | Get dashboard analytics |

---

## Quality Logs

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /api/v1/quality | Get quality logs |

---

# Workflow Lifecycle

```text
Received
   ↓
In Review
   ↓
Accepted
   ↓
Manufacturing
   ↓
Quality Check
   ↓
Completed
```

---

# AI Workflow

```text
User Message
     ↓
AI Processing Engine
     ↓
Order Data Extraction
     ↓
Database Storage
     ↓
Workflow Automation
     ↓
Dashboard Analytics Update
```

---

# Authentication System

* JWT Authentication
* bcrypt password hashing
* Protected API routes
* Secure session management
* Role-based route protection

---

# UI System

## Design Principles

* Enterprise SaaS Design
* Clean operational interface
* Real-time workflow visibility
* Modern analytics dashboard
* Responsive architecture

---

# Production Features

* Responsive dashboard
* AI workflow assistant
* Manufacturing lifecycle tracking
* Analytics monitoring
* Workflow intelligence
* Enterprise UI architecture

---

# Future Enhancements

* Real-time socket integration
* ERP system integration
* Voice AI workflows
* Predictive manufacturing analytics
* Production forecasting
* PDF export system
* Multi-language support

---

# Deployment

## Frontend Deployment

Recommended:

* Vercel
* Netlify

---

## Backend Deployment

Recommended:

* Render
* Railway
* AWS
* DigitalOcean

---

# Environment Variables

```env
PORT=

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=
```

---

# Development Commands

## Backend

```bash
npm run dev
```

---

## Frontend

```bash
npm run dev
```

---

# Author

## Vijay Mundargi
## Shyam Pillai
## Madesha S
## Raghvendra J

Full Stack MERN Developer
Enterprise SaaS UI Engineer
AI Workflow System Developer

---

# License

MIT License

---

# Final Notes

This project demonstrates:

* enterprise-grade MERN architecture
* conversational AI workflows
* modern manufacturing automation
* real-time analytics systems
* production-level dashboard engineering
* scalable workflow management systems
