import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

// Load environment variables
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

// Configure Passport with Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Ensure the profile contains emails
        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error("Google profile does not contain email"), null);
        }

        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        // if (!user) {
        //   // Create a new user if not found
        //   user = await User.create({
        //     name: profile.displayName,
        //     email,
        //     googleId: profile.id,
        //   });
        // }
        if (!user) {
          // If email is not found, deny access
          return done(null, false, {
            message: "Email not registered. Access denied.",
          });
        }
        return done(null, user); // Pass the user to Passport
      } catch (error) {
        console.error("Error in Google OAuth callback:", error);
        return done(error, null);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Save only the user's ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
