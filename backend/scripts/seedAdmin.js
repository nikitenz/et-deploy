import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await userModel.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("🚨 Admin account already exists. Seeding skipped.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10); // CHANGE THIS after login

    const admin = new userModel({
      name: "System Admin",
      email: "evalutechdev@gmail.com",
      password: hashedPassword,
      role: "admin",
      isAccountVerified: true, // auto-verified
    });

    await admin.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: admin.email,
      subject: "Welcome to EvaluTech!",
      text: `Hey ${admin.name}, \n\nYour admin account has been successfully created.
      \nEmail: ${admin.email}
      \nPassword: Admin@123
      \n\n Please log in and change your password immediately.
      \n\nSincerely, EvaluTech Dev`
    }

    await transporter.sendMail(mailOption);

    console.log("✅ Admin account seeded successfully!");
    console.log("Email:", admin.email);
    console.log("Default password: Admin@123 (please change immediately)");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
