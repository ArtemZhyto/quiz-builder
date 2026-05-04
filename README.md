# QUIZ BUILDER

**A dynamic full-stack engine for assessment and knowledge management. Built with a modular approach to handle complex quiz structures and real-time manageme**

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, TypeScript
- **Backend**: Node.js 22 (TypeScript), Express.js
- **Database**: PostgreSQL + Prisma ORM
- **Style Standard**: No Semicolons, Single Quotes, PascalCase for Prisma Models

---

## Project Structure

- **`backend/`**
- **`frontend/`**
- **`README.md`**

---

## Installation & Setup

### 1. Environment Configuration

This project uses separated environments for Backend and Frontend. You must create ```.env``` files based on the provided examples.

```bash
# Setup Backend Environment
cd backend && cp .env.example .env

# Setup Frontend Environment
cd frontend && cp .env.example .env
```

### 2. Database Migration

Before running the application, ensure your PostgreSQL instance is active and apply the schema:

```bash
cd backend
npx prisma migrate dev --name init
```

### 3. Docker Execution (Recommended)

The entire ecosystem can be launched via Docker for consistent development parity.

```bash
# Start infrastructure and services in production mode
docker compose -f ./docker/docker-compose.prod.yml up -d --build
```

---

## API Endpoints

- **`POST /quizzes`** - Create a new quiz with dynamic question types.
- **`GET /quizzes`** - Retrieve all quizzes with titles and question counts.
- **`GET /quizzes/:id`** - Get full quiz structure (read-only mode).
- **`DELETE /quizzes/:id`** - Permanently remove a quiz and its relations.

---

## Features
- **`Dynamic Form`**: Create quizzes with multiple question types (Boolean, Text Input, Checkbox).
- **`Relational Integrity`**: Automated cascade deletes for questions and options via Prisma.
- **`Responsive UI`**: Optimized for all screen sizes using Tailwind CSS.
- **`Type Safety`**: End-to-end TypeScript integration for both client and server.

---

## Authorship

Created and maintained by **Artem Zhytovoz**.

---

___Simplicity is the ultimate sophistication in software architecture.___