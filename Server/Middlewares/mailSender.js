import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export const sendResetEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Password reset email sent.");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Error sending email.");
    }
  };