import { User } from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../nodeMailer/sendMail.js";
configDotenv();
// signup
export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if email , password and name is provided or not
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all credentials",
      });
    }

    //check if user already exists or not
    const userExists = await User.findOne({
      email: email?.toLowerCase()?.trim(),
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Password hashig failed",
      });
    }
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    // create new user
    const user = new User({
      name: name?.trim(),
      email: email?.toLowerCase()?.trim(),
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });
    // jwt
    generateTokenAndSetCookie(res, user._id);

    //send email
    await sendVerificationEmail(user.email, user.verificationToken);

    //save new user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        passport: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//verify email
export const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Please provide verification code",
      });
    }
    const user = await User.findOne({
      verificationToken: `${code}`,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code ",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    // await sendWelcomeEmail(user.email);
    await sendWelcomeEmail(user.email, user.name);

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// // Google Authentication
// export const googleAuthController = passport.authenticate("google", {
//   scope: ["email", "profile"],
// });

// // Google Callback
// export const googleAuthCallbackController = passport.authenticate("google", {
//   failureRedirect: "/", // Redirect to home page on failure
//   successRedirect: "/", // Redirect to dashboard or another route on success
// });

// login
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and pasword",
      });
    }
    const user = await User.findOne({ email: email?.toLowerCase()?.trim() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while trying to login",
    });
  }
};

// logout
export const logoutController = async (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // console.log(email);
    // genereate reset toeken
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hr

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();
    // send email
    // user.email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      resetURL: resetToken,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reset passsword
// export const resetPasswordController = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;
//   try {
//     if (!password) {
//       return res.status(400).json({
//         success: false,
//         message: "please set your new password ",
//       });
//     }
//     //hashed password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpiresAt: { $gt: Date.now() }, //expired or not
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "user not found",
//       });
//     }
//     user.password = hashedPassword,
//       user.resetPasswordToken = undefined,
//       user.resetPasswordExpiresAt = undefined,
//       await user.save();
//     await sendResetSuccessEmail(user.email);

//     return res.status(200).json({
//       success: true,
//       message: "successfully new password reseted",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please provide a new password.",
    });
  }

  try {
    // Validate password strength (can use a validation library)
    // if (password.length < 8) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password must be at least 8 characters long.",
    //   });
    // }

    // Find user with valid token and non-expired timestamp
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    // Send success email
    await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Password Reset Error:", error); // Log for debugging
    return res.status(500).json({
      success: false,
      message: "An error occurred while resetting the password.",
    });
  }
};
//check authorize of not
export const checkAuthController = async (req, res) => {
  try {
    // Ensure userId exists
    if (!req.userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch the user by ID and exclude the password
    const user = await User.findById(req.userId).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // Log error and send response
    console.error("Error in checkAuthController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// send verification token

export const sendVerificationToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Your are not logged in !!",
      });
    }
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found !!",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        verificationToken,
        verificationTokenExpiresAt,
      },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Error while trying to update verification token.",
      });
    }
    //send email
    await sendVerificationEmail(
      updatedUser.email,
      updatedUser.verificationToken
    );
    return res.status(200).json({
      success: true,
      message: "Verification token sent successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error while tring to send verification token",
    });
  }
};

// // Google OAuth login
export const protectedRoute = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: {
          ...req.user._doc, // Spread user data
          password: undefined,
        },
      });
    } else {
      res
      .status(401)
      .json({
         success: false, 
         message: "Not authenticated" 
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch protected resource",
    });
  }
};
