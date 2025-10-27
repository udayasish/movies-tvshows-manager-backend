# Movies & TV Shows Manager - Backend API

A RESTful backend service for managing favorite movies and TV shows. Built with Node.js, Express, TypeScript, Prisma ORM, and MySQL.

## ✨ Features

- Create, Read, Update, Delete (CRUD) operations for movies and TV shows
- Pagination support for listing entries
- Search functionality to filter entries by title
- Input validation using Zod schemas
- Type-safe database operations with Prisma ORM
- RESTful API design
- Sample seed data included

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MySQL** (v8 or higher) - XAMPP recommended for local development
- **Git** (optional, for cloning)

## 🚀 Installation

### 1. Clone or Download the Project

```bash
git clone https://github.com/udayasish/movies-tvshows-manager-backend.git
cd movies-tvshows-manager-backend
```

### 2. Install Dependencies

```bash
npm install
```

## 🗄️ Database Setup

### 1. Start MySQL Server

**Using XAMPP:**

- Open XAMPP Control Panel
- Click **Start** next to MySQL
- Ensure MySQL is running on port `3306`

### 2. Configure Environment Variables

Create a `.env` file in the project root (if not already present):

```env
PORT=8000
CORS_ORIGIN=*
DATABASE_URL="mysql://root@localhost:3306/movies_tvshows_db"
```

**Note:** Adjust the `DATABASE_URL` if your MySQL has a password:

```
DATABASE_URL="mysql://root:your_password@localhost:3306/movies_tvshows_db"
```

### 3. Run Prisma Migrations

This will create the database and all required tables:

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Seed the Database

Populate the database with sample data (2 movies and 2 TV shows):

```bash
npm run seed
```

## ▶️ Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

Server will be running at: **http://localhost:8000**

## 🧩 Postman Collection

You can find the Postman collection [here](./postman/movies-tvshows-manager.postman_collection.json).

## 📡 API Endpoints

### Base URL: `http://localhost:8000/api/entries`

### 1. Create Entry

**POST** `/api/entries`

**Request Body:**

```json
{
  "title": "Inception",
  "type": "MOVIE",
  "director": "Christopher Nolan",
  "budget": 160000000,
  "location": "Los Angeles",
  "duration": 148,
  "yearTime": "2010"
}
```

---

### 2. Get All Entries (with pagination)

**GET** `/api/entries?page=1&limit=10`

**Query Parameters:**

- `page` (optional, default: 1)
- `limit` (optional, default: 10, max: 100)

---

### 3. Search Entries by Title

**GET** `/api/entries/search?title=Inception&page=1&limit=10`

**Query Parameters:**

- `title` (required) - Search term
- `page` (optional, default: 1)
- `limit` (optional, default: 10, max: 100)

---

### 4. Update Entry

**PUT** `/api/entries/:id`

**Request Body (partial update allowed):**

```json
{
  "title": "Inception (Updated)",
  "budget": 170000000
}
```

---

### 5. Delete Entry

**DELETE** `/api/entries/:id`

---

## 🌱 Sample Data

The seed file (`prisma/seed.ts`) populates the database with:

### Movies (2)

1. **Inception**

   - Type: MOVIE
   - Director: Christopher Nolan
   - Budget: $160,000,000
   - Location: Los Angeles
   - Duration: 148 minutes
   - Year: 2010

2. **The Dark Knight**
   - Type: MOVIE
   - Director: Christopher Nolan
   - Budget: $185,000,000
   - Location: Chicago
   - Duration: 152 minutes
   - Year: 2008

### TV Shows (2)

3. **Breaking Bad**

   - Type: TV_SHOW
   - Director: Vince Gilligan
   - Budget: $3,000,000
   - Location: Albuquerque
   - Duration: 47 minutes
   - Year: 2008-2013

4. **Stranger Things**
   - Type: TV_SHOW
   - Director: The Duffer Brothers
   - Budget: $6,000,000
   - Location: Atlanta
   - Duration: 51 minutes
   - Year: 2016-present

**To reset and re-seed:**

```bash
npm run seed
```

## 🔧 Migration Commands

**Create a new migration:**

```bash
npx prisma migrate dev --name migration_name
```

**View database in Prisma Studio:**

```bash
npx prisma studio
```

## 📁 Project Structure

```
movies-tvshows-manager-backend/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Prisma schema definition
│   └── seed.ts              # Seed script
├── src/
│   ├── controllers/
│   │   └── entry.controller.ts    # Business logic
│   ├── routes/
│   │   └── entry.routes.ts        # API routes
│   ├── schemas/
│   │   └── entry.schema.ts        # Zod validation schemas
│   ├── utils/
│   │   ├── ApiError.ts            # Error handling utility
│   │   ├── ApiResponse.ts         # Response formatting utility
│   │   └── asyncHandler.ts        # Async wrapper utility
│   ├── db/
│   │   └── index.ts               # Database connection
│   ├── app.ts                     # Express app setup
│   └── index.ts                   # Server entry point
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```
