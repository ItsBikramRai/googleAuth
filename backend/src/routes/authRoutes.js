import { Router } from "express";
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
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


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
    failureRedirect: `${process.env.CLIENT_URL}/google/failure`, // Redirect to frontend failure page
  }),
  (req, res) => {
    try {
      // Redirect the user to the frontend with their session active
      res.redirect(`${process.env.CLIENT_URL}/auth-google`);
    } catch (error) {
      console.error("Error during redirect:", error.message);
      res.status(500).send("An error occurred during authentication.");
    }
  }
);


// // Failure route for Google OAuth
// authRouter.get("/google/failure", (req, res) => {
//   res.status(401).send("Authentication failed.");
// });

// Protected route (authentication required)
authRouter.get("/protected", isAuthenticated, protectedRoute);

export default authRouter;
