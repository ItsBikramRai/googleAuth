// import {
//   PASSWORD_RESET_REQUEST_TEMPLATE,
//   PASSWORD_RESET_SUCCESS_TEMPLATE,
//   VERIFICATION_EMAIL_TEMPLATE,
// } from "./emailTemplates.js";
// import { mailtrapClient } from "./mailtrap.config.js";
// import { sender } from "./mailtrap.config.js";

// export const sendVerificationEmail = async (email, verificationToken) => {
//   const recipients = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipients,
//       subject: "verify your email",
//       html: VERIFICATION_EMAIL_TEMPLATE(verificationToken),
//       category: "Verification Email",
//     });
//     console.log("Email sent successfully :", response);
//   } catch (error) {
//     console.error("Error sending email :", error.message);
//     // throw new Error("Error sending email", error.message);
//   }
// };

// export const sendWelcomeEmail = async (email, name) => {
//   const recipients = [{ email }];
//   try {
//     const response = mailtrapClient.send({
//       from: sender,
//       to: recipients,
//       template_uuid: "866721a6-efa0-4607-9921-b4b6a34b6dc0",
//       template_variables: {
//         company_info_name: "Auth Company",
//         name: name,
//       },
//     });
//     console.log("Email sent successfully :", response);
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // reset email

// export const sendPasswordResetEmail = async (email, resetUrl) => {
//   const recipients = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender, // Ensure 'sender' is defined properly
//       to: recipients,
//       subject: "Reset your Password",
//       html: PASSWORD_RESET_REQUEST_TEMPLATE(resetUrl),
//       category: "Password Reset",
//     });
//     // console.log("Email sent successfully:", response);
//   } catch (error) {
//     console.error("Failed to send email:", error);
//   }
// };

// export const sendResetSuccessEmail = async (email) => {
//   const recipients = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender, // Ensure 'sender' is defined properly
//       to: recipients,
//       subject: "Password Reset Successful",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//       category: "Password Reset",
//     });
//     console.log("sendresetsuccessemail", response);
//   } catch (error) {
//     console.error("error on send reset password success email ", error.message);
//   }
// };
