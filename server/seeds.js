import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./api/users/user.js";
import Product from "./api/products/product.js";
import Image from "./api/images/image.js";
import Tag from "./api/tags/tag.js";
import Filament from "./api/filaments/filament.js";
import Cart from "./api/carts/cart.js";
import Promo from "./api/promos/promo.js";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const clearCollections = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Image.deleteMany();
    await Tag.deleteMany();
    await Filament.deleteMany();
    await Cart.deleteMany();
    await Promo.deleteMany();
    console.log("Collections cleared");
  } catch (error) {
    console.error(`Error clearing collections: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Create sample images
    const image1 = await Image.create({
      link: "https://example.com/image1.jpg",
      album: "Products",
    });

    // Create sample tags
    const tag1 = await Tag.create({
      name: "LED Gloves",
      category: "product",
    });

    const tag2 = await Tag.create({
      name: "Accessories",
      category: "product",
    });

    // Create sample filaments
    const filament1 = await Filament.create({
      type: "PLA",
      color: "White",
      color_code: "#FFFFFF",
      tags: [tag1._id],
      active: true,
    });

    // Create sample products
    await Product.create({
      name: "LED Glove Set",
      price: 49.99,
      wholesale_price: 29.99,
      short_description: "Professional LED glove set with multiple modes",
      max_display_quantity: 30,
      max_quantity: 30,
      count_in_stock: 25,
      images: [image1._id],
      pathname: "led-glove-set",
      options: [
        {
          name: "Color",
          values: [
            {
              name: "White",
              colorCode: "#FFFFFF",
              filament: filament1._id,
              isDefault: true,
            },
          ],
        },
      ],
      tags: [tag1._id, tag2._id],
    });

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

    // Create sample promo codes
    await Promo.create({
      promo_code: "WELCOME10",
      percentage_off: 10,
      admin_only: false,
      minimum_total: 50,
      active: true,
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
