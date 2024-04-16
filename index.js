import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from './routes/tours.js' 
import userRoute from './routes/users.js' 
import authRoute from './routes/auth.js' 
import reviewRoute from './routes/review.js' 
import bookingRoute from './routes/booking.js' 

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS configuration
const corsOptions = {
  origin: 'https://my-travo-frontend.vercel.app ',
  //   http://localhost:3000
  credentials: true // Allow credentials to be sent
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable CORS preflight requests for all routes

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Start the server
app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});
