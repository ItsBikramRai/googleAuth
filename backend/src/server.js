import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport-setup.js";
import { connectDB } from "./config/mongoodeDB.js";
import authRouter from "./routes/authRoutes.js";
import { rateLimit } from 'express-rate-limit'

dotenv.config();

// Initialize the Express app
const app = express();

// Database Connection
(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
})();

// Middleware setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Session management (ensure secure cookies for production)
app.use(
  session({
    secret: "mysecret", // Choose a better secret in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to false for development (when using HTTP)
      httpOnly: true, // Ensure that cookies can't be accessed by JavaScript
      maxAge: 3600000, // Set cookie expiration time (optional)
    },
  })
);
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});
app.use(limiter);
// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// auth router 
app.use("/api/v1/auth", authRouter)
// Initialize Passport and session management

app.get('/',(req,res)=>{
  res.send("Im a Backend");
});

//sercer start 
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on :  http://localhost:${PORT}`);
});