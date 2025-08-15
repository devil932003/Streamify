# STREAMIFY

Streamify is a real-time chat and video calling application that connects language learners with native speakers for practice and conversation. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with Stream Chat and Stream Video APIs for seamless communication features.

## Features

- User authentication (signup, login, logout)
- User onboarding with language learning preferences
- Friend system (send/accept friend requests)
- Real-time messaging with Stream Chat
- Video calling with Stream Video
- User recommendations based on language learning interests
- Responsive design with Tailwind CSS and DaisyUI

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stream Chat API
- Stream Video API
- Bcrypt.js for password hashing
- Cookie-parser for session management

### Frontend
- React 18
- Vite
- Tailwind CSS
- DaisyUI
- React Router v7
- Axios for HTTP requests
- React Query for server state management
- Stream Chat React SDK
- Stream Video React SDK
- Zustand for client state management
- React Hot Toast for notifications

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/onboarding` - Complete user onboarding
- `GET /api/auth/me` - Get authenticated user details

### Users
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `GET /api/users/friend-requests` - Get incoming and accepted friend requests
- `GET /api/users/outgoing-friend-requests` - Get outgoing friend requests
- `POST /api/users/friend-request/:id` - Send friend request
- `PUT /api/users/friend-request/:id/accept` - Accept friend request

### Chat
- `GET /api/chat/token` - Get Stream Chat token

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database (local or cloud)
- Stream Chat account (API key and secret)
- Stream Video account (API key and secret)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variable:
   ```
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Deployment

[[Website Link](https://streamify-vsk2.onrender.com/login)]

## Project Structure

### Backend
```
backend/
├── src/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5001)
- `MONGODB_URI`: MongoDB connection string
- `STREAM_API_KEY`: Stream Chat API key
- `STREAM_API_SECRET`: Stream Chat API secret
- `JWT_SECRET`: Secret key for JWT token signing
- `NODE_ENV`: Environment (development/production)

### Frontend (.env)
- `VITE_STREAM_API_KEY`: Stream Chat API key (must be prefixed with VITE_ for Vite to expose it to client)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

