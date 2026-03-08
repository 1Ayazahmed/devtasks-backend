# DevTasks MERN Backend -- Architecture, Flow, and Best Practices

## Project Overview

DevTasks is a backend-focused MERN practice project built to learn
**professional backend engineering practices** rather than just basic
CRUD operations.

The goal is to simulate how **real production backends are designed** by
following strong architectural patterns, scalable database design, and
clean code separation.

------------------------------------------------------------------------

# Technology Stack

## Backend

-   Node.js
-   Express
-   TypeScript
-   MongoDB
-   Mongoose
-   JWT Authentication
-   bcrypt Password Hashing

## Frontend (Later Phase)

-   React
-   TypeScript
-   TailwindCSS
-   Axios
-   React Query

## Development Tools

-   ts-node-dev (development server)
-   TypeScript compiler
-   Git version control

------------------------------------------------------------------------

# Backend Architecture

The backend follows a **layered architecture** used in many production
systems.

Route → Controller → Service → Model → Database

Each layer has a clear responsibility.

## Routes

Define API endpoints and connect them to controllers.

## Controllers

Handle HTTP requests and responses. Controllers should remain **thin**
and should not contain business logic.

## Services

Contain the main **business logic** and database interactions.

## Models

Define MongoDB schemas using **Mongoose with TypeScript typing**.

## Middleware

Used for: - Security - Logging - Authentication - Error handling

## Utils

Reusable utilities such as **asyncHandler** to catch async errors
without repeated try/catch blocks.

------------------------------------------------------------------------

# Backend Folder Structure

    server
    ├ src
    │   ├ config
    │   │   db.ts
    │   ├ controllers
    │   ├ middleware
    │   │   errorMiddleware.ts
    │   ├ models
    │   ├ routes
    │   ├ services
    │   ├ utils
    │   │   asyncHandler.ts
    │   ├ types
    │   ├ app.ts
    │   └ server.ts
    │
    ├ .env
    ├ .env.example
    ├ package.json
    └ tsconfig.json

------------------------------------------------------------------------

# Current Backend Infrastructure

The following systems are already implemented:

-   Backend project initialization
-   TypeScript configuration
-   Professional folder structure
-   Development server using ts-node-dev
-   Environment variables
-   MongoDB connection logic
-   Express application setup
-   Security middleware (helmet)
-   Request logging (morgan)
-   JSON body parsing
-   Centralized error middleware
-   Async handler utility

Server runs using:

    npm run dev

------------------------------------------------------------------------

# Complete Request Flow

Example API:

    POST /api/auth/register

## Step-by-step Flow

Client (Postman / Frontend)

↓

Express Server

↓

Helmet Security Middleware

↓

Morgan Logging Middleware

↓

express.json() Body Parser

↓

Route Matching

↓

Controller

↓

Service Layer

↓

Mongoose Model

↓

MongoDB Database

↓

Response sent back to client

------------------------------------------------------------------------

# Middleware Explained

## Helmet

Helmet is a **security middleware** for Express that automatically sets
secure HTTP headers.

It protects the application from common web vulnerabilities.

### Security Protections

#### X-Content-Type-Options

Prevents browsers from MIME-sniffing responses.

    X-Content-Type-Options: nosniff

#### X-Frame-Options

Prevents clickjacking attacks.

    X-Frame-Options: SAMEORIGIN

#### Content Security Policy (CSP)

Restricts what scripts, images, and resources can load.

This helps prevent **Cross Site Scripting (XSS)** attacks.

#### Strict Transport Security

Forces browsers to use HTTPS.

    Strict-Transport-Security

### Why Helmet Is Important

Without it: - Attackers can detect server technologies - Default headers
expose information - Browser security protections are weaker

Helmet adds **secure defaults automatically**.

------------------------------------------------------------------------

## Morgan

Morgan is a **request logging middleware**.

It logs every request that hits the server.

Example log:

    POST /api/auth/register 201 32 ms
    GET /api/tasks 200 12 ms

### Why Logging Matters

Logging helps with:

-   Debugging
-   Monitoring APIs
-   Tracking performance
-   Diagnosing production issues

### Morgan Format Used

Development format:

    app.use(morgan("dev"))

Example output:

    GET /api/tasks 200 15 ms

------------------------------------------------------------------------

# express.json()

This middleware parses incoming request bodies.

Without it:

    req.body === undefined

With it:

Incoming JSON becomes:

    req.body = {
     name: "John",
     email: "john@test.com",
     password: "123456"
    }

This is required for POST and PUT APIs.

------------------------------------------------------------------------

# Async Handler Utility

Instead of writing try/catch in every controller:

    try {
     await something()
    } catch(err) {
     next(err)
    }

We wrap controllers using:

    asyncHandler()

This automatically catches async errors and forwards them to the error
middleware.

Benefits: - Cleaner controllers - Less repeated code - Centralized error
handling

------------------------------------------------------------------------

# MongoDB Schema Design Principles

This project follows **query-first schema design**.

Schemas are designed based on **how data will be queried**, not just how
it looks logically.

------------------------------------------------------------------------

# Indexing in MongoDB

Indexes dramatically improve query performance.

Example query used for login:

    User.findOne({ email })

Without index:

MongoDB scans the entire collection.

Time complexity:

    O(n)

With index:

MongoDB uses a **B-Tree index**.

Time complexity:

    O(log n)

This becomes critical when collections grow to millions of documents.

------------------------------------------------------------------------

# Example User Schema Design

Important decisions:

-   email indexed
-   lowercase emails
-   timestamps enabled

Example fields:

    name
    email
    password
    createdAt
    updatedAt

------------------------------------------------------------------------

# Task Schema Design Strategy

Tasks are stored in a **separate collection** rather than embedded
inside users.

Example structure:

    Task
    id
    title
    completed
    userId
    createdAt
    updatedAt

Important index:

    taskSchema.index({ userId: 1 })

Reason:

Fetching tasks will usually happen like:

    find tasks by user

------------------------------------------------------------------------

# Best Practices Used in This Project

### Thin Controllers

Controllers should only handle HTTP logic.

### Business Logic in Services

Services manage application logic and database operations.

### Centralized Error Handling

All errors go through one middleware.

### Async Error Wrapper

Avoid repeated try/catch blocks.

### Environment Variables

Configuration should never be hardcoded.

### Proper Schema Design

Always think about scalability when designing data structures.

### Indexing Frequently Queried Fields

Improves performance for large datasets.

### Avoid Large Embedded Arrays

Store large data in separate collections.

### Pagination for Large Datasets

Avoid returning massive datasets in a single request.

------------------------------------------------------------------------

# Professional Middleware Order

Typical Express middleware stack:

Security

↓

Logging

↓

Body Parsing

↓

Authentication

↓

Routes

↓

Error Handling

Example:

    helmet
    cors
    rateLimit
    morgan
    express.json
    routes
    errorMiddleware

------------------------------------------------------------------------

# Current Status

Completed:

-   Backend architecture setup
-   Development environment
-   Middleware setup
-   MongoDB connection
-   Async error system

Next step:

Authentication APIs

Upcoming:

-   Register API
-   Login API
-   JWT Token Generation
-   Authentication Middleware
-   Protected Routes
-   Task CRUD APIs

------------------------------------------------------------------------

# Long-Term Learning Goals

This project aims to teach:

-   Scalable backend architecture
-   MongoDB schema design
-   Authentication systems
-   Error handling strategies
-   Middleware architecture
-   Production-ready backend development
