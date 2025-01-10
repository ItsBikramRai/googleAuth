import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport-setup.js";
import { connectDB } from "./config/mongoodeDB.js";
import authRouter from "./routes/authRoutes.js";

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
    origin: process.env.CLIENT_URL, // Update to match your frontend URL
    credentials: true, // Allow cookies to be sent
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

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// auth router 
app.use("/api/v1/auth", authRouter)
// Initialize Passport and session management

app.get('/',(req,res)=>{
  res.send("Im a Backend");
})
// // Google authentication route  
// app.get(
//   "/api/v1/auth/google",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   })
// );

// // Google OAuth callback route
// app.get(
//   "/api/v1/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/api/v1/auth/google/failure",
//   }),
//   (req, res) => {
//     res.redirect(`${process.env.CLIENT_URL}/auth-google`); // Update to frontend URL
//   }
// );

// // Protected route
// app.get("/api/v1/auth/protected", (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       user: {
//         ...req.user._doc, // Spread user data
//         password: undefined,
//       },
//     });
//   } else {
//     return res.status(401).json({ success: false, message: "Not authenticated" });
//   }
// });

// // Failure route for Google OAuth
// app.get("/api/v1/auth/google/failure", (req, res) => {
//   res.send("Authentication failed.");
// });

//sercer start 
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});