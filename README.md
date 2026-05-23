# DevPulse API

A RESTful backend API for an internal tech issue and feature tracking platform where software teams can report bugs, suggest features, and manage issue workflows collaboratively.

---

## 🚀 Live URL

https://dev-pulse-rust-six.vercel.app/

---

## 📂 GitHub Repository

https://github.com/Shashuvo/devpulse-issue-tracker

---

## ✨ Features

- User Registration & Login
- JWT Authentication & Authorization
- Role-Based Access Control (Contributor & Maintainer)
- Secure Password Hashing using bcrypt
- Create, Update, Delete, and Retrieve Issues
- Issue Filtering & Sorting
- PostgreSQL Database Integration
- Raw SQL Queries using pg
- Centralized Error Handling
- Modular Express.js Architecture
- Environment Variable Configuration
- TypeScript Strict Mode

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- pg (native PostgreSQL driver)

### Authentication & Security
- bcrypt
- jsonwebtoken

### Utilities
- dotenv
- cors
- http-status-codes

---

# 📁 Project Structure

```bash
src/
├── config/
│   └── index.ts
│
├── db/
│   └── index.ts
│
├── middleware/
│   ├── auth.ts
│   ├── errorHandler.ts
│   ├── index.d.ts
│   └── logger.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.interface.ts
│   │   ├── auth.route.ts
│   │   └── auth.service.ts
│   │
│   └── issues/
│       ├── issues.controller.ts
│       ├── issues.interface.ts
│       ├── issues.route.ts
│       └── issues.service.ts
│
├── types/
│   └── index.ts
│
├── utility/
│   ├── appError.ts
│   ├── catchError.ts
│   ├── dbQuery.ts
│   ├── globalErrorHandler.ts
│   └── sendResponse.ts
│
├── app.ts
└── server.ts