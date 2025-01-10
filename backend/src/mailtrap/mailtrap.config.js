// import { MailtrapClient } from "mailtrap";
// import { config } from "dotenv";

// config();

// // client configuration 
// export const mailtrapClient = new MailtrapClient({
//   endpoint:process.env.MAILTRAP_ENDPOINT,
//   token: process.env.MAILTRAP_TOKEN,
// });

// //sender
// export const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Bikram Rai",
// };



// // const recipients = [
// //   {
// //     email: "raibikram836@gmail.com",
// //   },
// // ];

// // (async () => {
// //   try {
// //     const response = await mailtrapClient.send({
// //       from: sender,
// //       to: recipients,
// //       subject: "You are awesome!",
// //       html: "Congrats for sending test email with Mailtrap!",
// //       category: "Integration Test",
// //     });

// //     console.log("Email sent successfully:", response);
// //   } catch (error) {
// //     console.error("Error sending email:", error.message);
// //   }
// // })(); // Immediately invoke the function
// // to test the email sending : node src/config/mailtrap.config