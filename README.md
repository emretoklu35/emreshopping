# Emre Shopping

Emre Shopping is a modern e-commerce platform for electronics and campaigns, built with a full-stack JavaScript architecture.

## Stack

- **Frontend:** React, Redux Toolkit, Axios, React Slick, CSS
- **Backend:** Node.js, Express, better-sqlite3, dotenv, CORS
- **Database:** SQLite (file-based, managed with better-sqlite3)
- **State Management:** Redux Toolkit (for features like "last visited products")
- **API Communication:** RESTful endpoints via Axios

## Project Structure

```
emreshopping/
│
├── backend/
│   ├── package.json           # Backend dependencies and scripts
│   ├── server.js              # Express server entry point
│   ├── .env                   # Environment variables
│   ├── data/
│   │   └── database.db        # SQLite database file
│   ├── public/
│   │   ├── data/              # Static data files
│   │   └── images/            # Product and campaign images
│   └── src/
│       ├── config/            # Configuration files (e.g., database connection)
│       ├── controllers/       # API controller files
│       ├── data/              # Sample data or seed files
│       ├── database/          # Database operations
│       ├── middlewares/       # Express middlewares
│       ├── models/            # Database models
│       ├── routes/            # API route definitions
│       └── services/          # Business logic and helper services
│
├── frontend/
│   ├── package.json           # Frontend dependencies and scripts
│   ├── README.md              # Project documentation
│   ├── .env                   # Environment variables
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   └── src/
│       ├── App.js             # Main React component
│       ├── index.js           # React application entry point
│       ├── assets/            # Images and static files
│       ├── components/        # Reusable and shared React components
│       ├── contexts/          # React context files
│       ├── hooks/             # Custom React hooks
│       ├── pages/             # Page components
│       ├── redux/             # Redux store and slice files
│       └── services/          # API requests and helper functions
│
└── README.md                  # Main project documentation
```

## Features

- **Campaigns:** Grid display of current campaigns.
- **Slider:** Main slider for featured content.
- **Electronics:** Carousel for electronic products.
- **Recommendations:** Personalized product suggestions.
- **Last Visited Products:** Tracks and displays recently viewed products using Redux and localStorage.
- **Responsive Design:** Mobile-friendly layout.

## Getting Started

### Backend

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Initialize the database:
   ```bash
   npm run init-db
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   The backend runs on [http://localhost:16666](http://localhost:16666).

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the React app:
   ```bash
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000).

## Environment Variables

### Backend (`.env` example)
```
PORT=16666
DATABASE_PATH=./data/database.db
IMAGE_BASE_URL=http://localhost:16666/images
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env` example)
```
REACT_APP_API_URL=http://localhost:16666/api
```

## How It Works

- The backend serves RESTful APIs for campaigns, slider, electronics, and recommendations.
- The frontend fetches data using custom services and displays it in various UI components.
- Redux is used to manage the "last visited products" state, which is also persisted in localStorage for session continuity.

## License

ISC

---

**Note:** For development, ensure both backend and frontend servers are running. Images and static data are served from the backend's `public` directory.
