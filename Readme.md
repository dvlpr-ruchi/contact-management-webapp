#Contact Management WebApp

A simple Contact Management Web Application built using the MERN stack to demonstrate full-stack fundamentals including REST APIs, MongoDB integration, React state management, and responsive UI.

## Features

- ✅ Contact Form with validation
- ✅ Client-side error messages
- ✅ Store contacts in MongoDB
- ✅ Fetch and display contacts dynamically
- ✅ No page reload (React state updates)
- ✅ Responsive UI

Bonus Features

- 🗑️ Delete contact
- 🔄 Auto refresh after submit
- 🔃 Sorting by latest contact
- ♻️ Reusable components

## Project Structure
```
contact-management-app/
│
├── backend/
│   ├── controllers/
│   │   └── contact.controller.js
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contact.routes.js
│   ├── config/
│   │   └── db.js
│   ├── index.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CreateContact.jsx
    │   │   └── ContactList.jsx
    │   │
    │   ├── App.jsx
    │   └── main.jsx
```

## Setup Instructions

1. Clone Repository

```bash
git clone <repository-url>
cd contact-management-webapp
```
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:

```
MONGO_URI=mongodb://localhost:27017/contactDB
PORT=3000

```
4. Install frontend dependencies:

```bash
cd frontend
npm install
```

5. Start the development servers:

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
