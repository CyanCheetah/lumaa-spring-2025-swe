# Todo App with Authentication

A full-stack Task Management application built with TypeScript, React, Node.js, and PostgreSQL.

## Overview

This application allows users to:
1. Register and log in securely
2. View a list of their tasks
3. Create new tasks
4. Update existing tasks (mark complete, edit)
5. Delete tasks

## Features

### 1. Authentication

- **User Model**:
  - `id`: Primary key
  - `username`: Unique string
  - `password`: Hashed string using bcrypt
- **Endpoints**:
  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user, return JWT token
- **Security**:
  - Password hashing with bcrypt
  - JWT token verification for protected routes
  - Secure task operations for authenticated users only

### 2. Backend (Node.js with Express)

- **Tasks CRUD**:
  - `GET /tasks` – Retrieve user's tasks
  - `POST /tasks` – Create a new task
  - `PUT /tasks/:id` – Update a task
  - `DELETE /tasks/:id` – Delete a task
- **Task Model**:
  - `id`: Primary key
  - `title`: string
  - `description`: string
  - `isComplete`: boolean (default false)
  - `userId`: Foreign key to users table

### 3. Frontend (React + TypeScript)

- **Authentication**:
  - Register and login forms
  - JWT storage in localStorage
  - Protected routes
- **Task Management**:
  - Task list display
  - Create task form
  - Update and delete task functionality
- **Navigation**:
  - Conditional rendering based on auth state
  - Logout functionality

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- npm or yarn

## Setup Instructions

### Environment Variables

1. Backend (.env):
```
DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/todo_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

2. Frontend (.env):
```
REACT_APP_API_URL=http://localhost:3000
```

### Database Setup

The database tables are automatically created on application startup:
- `users` (id, username, password)
- `tasks` (id, title, description, is_complete, user_id)

## Running the Application

### Using Docker Compose (Recommended)

1. Clone the repository
2. Navigate to the project root directory
3. Run:
```bash
docker-compose up --build
```

This starts:
- PostgreSQL database (port 5432)
- Backend server (port 3000)
- Frontend application (port 3001)

Access the application at http://localhost:3001

### Manual Setup (Development)

1. Backend:
```bash
cd backend
npm install
npm run dev
```

2. Frontend:
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /tasks` - Get all tasks for logged in user
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Salary Expectations

Monthly salary expectation: $3,500 USD (open to negotiation)

## Tech Stack

- **Frontend**: 
  - React with TypeScript
  - Axios for API calls
  - Modern CSS with flexbox
- **Backend**:
  - Node.js with Express
  - PostgreSQL database
  - JWT for authentication
  - bcryptjs for password hashing
- **DevOps**:
  - Docker and Docker Compose
  - Environment configuration

## Author

Sai Tanuj Karavadi
2/20/2024
