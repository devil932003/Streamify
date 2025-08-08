import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.Route.js';
import { connect } from 'mongoose';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true  // allows frontend to access cookies
}))
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRoutes); // Use the auth routes
app.use("/api/users", userRoutes); // Use the user routes
app.use("/api/chat", chatRoutes); // Use the chat routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB(); // Connect to the database
});