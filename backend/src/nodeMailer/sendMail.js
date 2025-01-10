import { nodemailerTransport, sender } from "./config.js";
// const sendEmailVerification = async (toEmail) => {
//   try {
//     // Send the email
//     const info = await nodemailerTransport.sendMail({
//       from:sender,
//       to: toEmail, // Recipient email address
//       subject: "Reset Password",
//       text: "Click the link to reset your password.",
//       html: `
//         <h1>Welcome!</h1>
//         <p>This is an <b>HTML email</b> sent using <code>nodemailer</code>.</p>
//         <p>Thank you for trying this out!</p>
//         <footer style="color: gray;">Sent with 💻 using Node.js</footer>
//       `,

//     });

//     console.log("Email sent successfully:", info);
//   } catch (error) {
//     console.error("Error sending email:", error.message);
//     throw error; // Re-throw the error for the controller to handle
//   }
// };

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  SEND_WELCOME_EMAIL,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../mailtrap/emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  //   const recipients = [{ email }];
  try {
    const response = await nodemailerTransport.sendMail({
      from: sender,
      to: email,
      subject: "verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE(verificationToken),
      category: "Verification Email",
    });
    // console.log("Email sent successfully :", response);
  } catch (error) {
    // console.error("Error sending email :", error.message);
    throw new Error("Error sending email", error.message);
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  //   const recipients = [{ email }];
  console.log(userName);
  try {
    const response = nodemailerTransport.sendMail({
      from: sender,
      to: email,
      subject: "Successfully verified your Email",
      html: SEND_WELCOME_EMAIL(userName),
      category:"Email verification"
    });
    // console.log("Email sent successfully :", response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reset email

export const sendPasswordResetEmail = async (email, resetUrl) => {
  //   const recipients = [{ email }];
  try {
    const response = await nodemailerTransport.sendMail({
      from: sender, // Ensure 'sender' is defined properly
      to: email,
      subject: "Reset your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE(resetUrl),
      category: "Password Reset",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendResetSuccessEmail = async (email) => {
  //   const recipients = [{ email }];
  try {
    const response = await nodemailerTransport.sendMail({
      from: sender, // Ensure 'sender' is defined properly
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    // console.log("sendresetsuccessemail", response);
  } catch (error) {
    throw new Error(error.message);
  }
};
