import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const nodemailerTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

const user = {
    name:"Bikram Rai",
    email:process.env.APP_USER
}
export const sender = `"${user?.name}" <${user?.email}>`

