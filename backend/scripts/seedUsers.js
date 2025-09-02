import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

dotenv.config({ path: "../.env" });

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "evalutech",
    });
    console.log("✅ MongoDB connected for seeding...");

    
    await userModel.deleteMany();
    console.log("🧹 Cleared existing users.");

    
    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const admin = new userModel({
      name: "System Admin",
      email: "evalutechdev@gmail.com",
      password: adminPassword,
      role: "admin",
      isAccountVerified: true,
    });
    await admin.save();

    
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: admin.email,
        subject: "Welcome to EvaluTech!",
        text: `Hey ${admin.name}, \n\nYour admin account has been successfully created.
        \nEmail: ${admin.email}
        \nPassword: Admin@123
        \n\nPlease log in and change your password immediately.
        \n\nSincerely, EvaluTech Dev`,
      });
      console.log("📧 Admin email sent successfully!");
    } catch (mailErr) {
      console.warn("⚠️ Failed to send admin email:", mailErr.message);
    }

    // 👥 Test Users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const testUsers = [
      {
        name: "Faculty User",
        email: "facultysample@gmail.com",
        password: hashedPassword,
        role: "faculty",
        isAccountVerified: true,
      },
      {
        name: "HTE User",
        email: "htesample@gmail.com",
        password: hashedPassword,
        role: "hte",
        isAccountVerified: true,
      },
      {
        name: "Student User",
        email: "studentsample@gmail.com",
        password: hashedPassword,
        role: "student",
        isAccountVerified: true,
      },
    ];

    await userModel.insertMany(testUsers);

    console.log("✅ Admin + Sample users seeded successfully!");
    console.table([
      { email: admin.email, password: "Admin@123", role: "admin" },
      ...testUsers.map((u) => ({
        email: u.email,
        password: "password123",
        role: u.role,
      })),
    ]);

    await mongoose.connection.close();
    console.log("🔒 Database connection closed.");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedUsers();
