import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./api/users/user.js";
import config from "./config.js";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const clearCollections = async () => {
  try {
    console.log("Collections cleared");
  } catch (error) {
    console.error(`Error clearing collections: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Create sample users
    await User.create({
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
      isVerified: true,
      shipping: {
        first_name: "Admin",
        last_name: "User",
        address_1: "123 Admin St",
        city: "Admin City",
        state: "CA",
        postalCode: "12345",
        country: "USA",
      },
    });

    await User.create({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: false,
      isVerified: true,
      shipping: {
        first_name: "John",
        last_name: "Doe",
        address_1: "456 Main St",
        city: "Some City",
        state: "CA",
        postalCode: "54321",
        country: "USA",
      },
    });

    console.log("Sample data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

// Run the seeding process
connectDB()
  .then(() => clearCollections())
  .then(() => seedData())
  .catch(error => {
    console.error(`Error in seed process: ${error.message}`);
    process.exit(1);
  });
