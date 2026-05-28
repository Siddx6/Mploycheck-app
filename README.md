# MPloyChek — Background Verification Platform

> Internship Assessment Project — NSQTech Private Limited  
> Built by **Siddharth Kumar** | Submitted: May 29, 2026

### 🔗 Live Demo
| | URL |
|---|---|
| **Frontend** | https://mploycheck-o8lvkz7k6-siddx6s-projects.vercel.app |
| **Backend API** | https://mploycheck-app.onrender.com/api/health |
| **GitHub** | https://github.com/Siddx6/Mploycheck-app |

---

## 📋 Requirements vs Completion

### Feature 1 — Login Page

| Requirement | Status |
|---|---|
| User ID, Password and Role fields | ✅ Done |
| Role options: "General User" and "Admin" | ✅ Done |
| Dummy API to store and return response | ✅ Done — Node.js/Express REST API |
| Storage — MongoDB | ✅ Done — MongoDB Atlas |
| JWT token returned on login | ✅ Done |

### Feature 2 — Logged In Page

| Requirement | Status |
|---|---|
| Show details of the logged-in user | ✅ Done — Profile card with name, email, department, phone, user ID |
| API call to get list of records for the user | ✅ Done — `GET /api/records` |
| Display records in table format | ✅ Done — Angular Material table |
| Show access level via dummy records | ✅ Done — General User sees own records only; Admin sees all with extra columns |

### Feature 3 — Admin User Features

| Requirement | Status |
|---|---|
| Mechanism to manage users in DB | ✅ Done — Full CRUD (Create, Edit, Delete users) |
| Delay mechanism in API using parameter | ✅ Done — `?delay=ms` query param handled by middleware |
| Showcase async processing on page load | ✅ Done — RxJS Observables, loading interceptor, progress bar |
| User Service and app load modularization | ✅ Done — `UserService`, `AuthService`, `RecordService`, `LoadingService` all separate |

---

## 🎯 Evaluation Criteria — What Was Delivered

| Criteria | What Was Built |
|---|---|
| Effective use of Angular framework | Lazy loading (3 modules), Route Guards, HTTP Interceptors, Reactive Forms, RxJS |
| Knowledge of API and cloud framework | REST API with Express, JWT auth, MongoDB Atlas, role-based middleware |
| UI aspects — creative design and clean architecture | Custom dark navbar, branded login page, sidebar admin layout, skeleton loaders, status/priority badges |
| GitHub copied code not accepted | 100% original — custom folder structure, custom design, written from scratch |

---

## ⭐ Bonus Features (Beyond Requirements)

| Extra | Description |
|---|---|
| RxJS `forkJoin` | Admin Overview loads users + records in parallel, not sequentially |
| Skeleton loaders | Tables show animated shimmer while data loads — not just a spinner |
| Request log with durations | Async demo tracks every request with timestamp and response time |
| Role mismatch error | If wrong role is selected for a user, backend returns a specific error message |
| Seed script | One command populates entire DB with realistic dummy data |
| Access Denied page | Guard redirects non-admins away from `/admin` with a proper page |
| Admin-only fields | `reportUrl` and `internalNotes` are stripped from API response for General Users |
| Health check endpoint | `GET /api/health` for easy verification the API is running |

---

## 🛠 Tech Stack

**Frontend** — Angular 15+, Angular Material, RxJS, TypeScript, SCSS  
**Backend** — Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs  
**Deployment** — Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## 🚀 Running Locally

### Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

```bash
node server.js
# Seed the database (optional)
node data/seed.js
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

Visit `http://localhost:4200`

---

## 📁 Project Structure

```
mploychek-app/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth + delay middleware
│   ├── models/         # Mongoose schemas (User, Record)
│   ├── routes/         # Express routes
│   ├── data/           # Seed script
│   └── server.js
│
└── frontend/
    └── src/app/
        ├── core/           # Guards, interceptors, services
        ├── modules/
        │   ├── auth/       # Login page
        │   ├── dashboard/  # General user view
        │   └── admin/      # Admin panel (overview, user mgmt, delay demo)
        └── shared/         # Navbar, loader, pipes, access-denied
```

---

## 🔌 API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |
| GET | `/api/records` | Authenticated |
| GET | `/api/records?delay=2000` | Authenticated — simulates async delay |
| GET | `/api/users` | Admin only |
| POST | `/api/users` | Admin only |
| PUT | `/api/users/:id` | Admin only |
| DELETE | `/api/users/:id` | Admin only |
| GET | `/api/health` | Public |