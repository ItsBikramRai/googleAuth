import { Router } from "express";
import { configDotenv } from "dotenv";
import passport from "passport";
import {
  loginController,
  signupController,
  logoutController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
  checkAuthController,
  sendVerificationToken,
  protectedRoute,
} from "../controllers/authController.js";
configDotenv();

import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
// import { isAuthenticated } from "../middlewares/authMiddleware.js";

const authRouter = Router();

//check auth
authRouter.get("/check-auth", verifyTokenMiddleware, checkAuthController);
// Login Route
authRouter.post("/login", loginController);

// Signup Route
authRouter.post("/signup", signupController);
// verify email
authRouter.post("/verify-email", verifyEmailController);
// authRouter.post("/send-verification-token ",sendVerificationToken);
// Logout Route
authRouter.post("/logout", logoutController);

//forgot password
authRouter.post("/forgot-password", forgotPasswordController);

// reset password
authRouter.post("/reset-password/:token", resetPasswordController);

//send verification token and verify

authRouter.post("/send-token", sendVerificationToken);

authRouter.get("/");

// Google authentication route
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Google OAuth callback route
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/google/failure`,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/auth-google`);
  }
);

// Protected route (authentication required)
authRouter.get("/protected", isAuthenticated, protectedRoute);

export default authRouter;
