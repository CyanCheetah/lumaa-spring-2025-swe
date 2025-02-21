# Todo App with Authentication

Lumaa project full stack Todo application with typescript, CSS, and html with javascript as backend lang. Using Node.js primarily as frame. 

## Features

1. Authentication

    User Model:
        id: Primary key
        username: Unique string
        password: Hashed string
    Endpoints:
        POST /auth/register – Create a new user
        POST /auth/login – Login user, return a token (e.g., JWT)
    Secure the Tasks Routes: Only authenticated users can perform task operations.
        Password Hashing: Use bcrypt or another hashing library to store passwords securely.
        Token Verification: Verify the token (JWT) on each request to protected routes.

2. Backend (Node.js or Nest.js)

    Tasks CRUD:
        GET /tasks – Retrieve a list of tasks (optionally filtered by user).
        POST /tasks – Create a new task.
        PUT /tasks/:id – Update a task (e.g., mark as complete, edit text).
        DELETE /tasks/:id – Delete a task.
    Task Model:
        id: Primary key
        title: string
        description: string (optional)
        isComplete: boolean (default false)
        (Optional) userId to link tasks to the user who created them
    Database: PostgreSQL
        Provide instructions/migrations to set up:
            users table (with hashed passwords)
            tasks table
    Setup:
        npm install to install dependencies
        npm run start (or npm run dev) to run the server
        Document any environment variables (e.g., database connection string, JWT secret)

3. Frontend (React + TypeScript)

    Login / Register:
        Simple forms for Register and Login.
        Store JWT (e.g., in localStorage) upon successful login.
        If not authenticated, the user should not see the tasks page.
    Tasks Page:
        Fetch tasks from GET /tasks (including auth token in headers).
        Display the list of tasks.
        Form to create a new task (POST /tasks).
        Buttons/fields to update a task (PUT /tasks/:id).
        Button to delete a task (DELETE /tasks/:id).
    Navigation:
        Show Login/Register if not authenticated.
        Show Logout if authenticated.
    Setup:
        npm install then npm start (or npm run dev) to run.
        Document how to point the frontend at the backend (e.g., .env file, base URL).


        finally, the most BASIC User Experience one could ask for. Spent a little overtime so did not do much in terms of UI. Used a couple of CSS elements from previous projects so thats about it.


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

The database migrations are handled automatically w/Docker Compose. These tables are created:
- users (id, username, password)
- tasks (id, title, description, is_complete, user_id)

## Running the Application

### Using Docker Compose (Recommended)

1. Clone the repo
2. navigate to the project root directory
3. Run:
```bash
docker-compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Backend server on port 3000
- Frontend application on port 3001

Access the application at http://localhost:3001
tables are created in index.js :o

## API Endpoints

- POST /auth/register - Register a new user
- POST /auth/login - Login user
- GET /tasks - Get all tasks for logged in user
- POST /tasks - Create a new task
- PUT /tasks/:id - Update a task
- DELETE /tasks/:id - Delete a task

## Salary Expectations

Monthly salary expectation: Open to negotiate, but 3500 per month.

## Tech Stack

- Frontend:React with TypeScript, Axios for API calls, Modern CSS with flexbox
* Backend: Node.js with Express, PostgreSQL ,JWT for authentication, bcryptjs for password hashing
* also used docker

## Author

Sai Tanuj Karavadi :D 2/20/2025