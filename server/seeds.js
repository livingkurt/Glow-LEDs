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
import Event from "./api/events/event.js";
import Ticket from "./api/tickets/ticket.js";
import Article from "./api/articles/article.js";
import Feature from "./api/features/feature.js";
import Mode from "./api/modes/mode.js";
import Microlight from "./api/microlights/microlight.js";
import Team from "./api/teams/team.js";
import Affiliate from "./api/affiliates/affiliate.js";
import Survey from "./api/surveys/survey.js";
import GiftCard from "./api/gift_cards/gift_card.js";
import Content from "./api/contents/content.js";
import Version from "./api/versions/version.js";
import Token from "./api/tokens/token.js";
import Parcel from "./api/parcels/parcel.js";
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
    await User.deleteMany();
    await Product.deleteMany();
    await Image.deleteMany();
    await Tag.deleteMany();
    await Filament.deleteMany();
    await Cart.deleteMany();
    await Promo.deleteMany();
    await Event.deleteMany();
    await Ticket.deleteMany();
    await Article.deleteMany();
    await Feature.deleteMany();
    await Mode.deleteMany();
    await Microlight.deleteMany();
    await Team.deleteMany();
    await Affiliate.deleteMany();
    await Survey.deleteMany();
    await GiftCard.deleteMany();
    await Content.deleteMany();
    await Version.deleteMany();
    await Token.deleteMany();
    await Parcel.deleteMany();
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

    const image2 = await Image.create({
      link: "https://example.com/image2.jpg",
      album: "Events",
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
    const product1 = await Product.create({
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
    const adminUser = await User.create({
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

    // Create sample events
    const event1 = await Event.create({
      name: "Glow LED Launch Party",
      fact: "Join us for an amazing night of lights and music!",
      short_description: "Celebrating the launch of our new LED products",
      start_date: new Date("2024-06-01"),
      end_date: new Date("2024-06-02"),
      venue: "The Glow Venue",
      thumbnail_image: image2._id,
      background_image: image1._id,
      social_media_type: "instagram",
      social_media_handle: "@glowleds",
      ticket_box_color: "#FF4081",
      age_group: "18+",
      address: {
        address_1: "123 Glow Street",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90210",
      },
      pathname: "launch-party",
    });

    // Create sample tickets
    const ticket1 = await Ticket.create({
      title: "VIP Pass",
      ticket_type: "vip",
      price: 99.99,
      fact: "Get exclusive access to VIP areas",
      color: "#FFD700",
      image: image2._id,
      count_in_stock: 100,
      max_display_quantity: 4,
      max_quantity: 4,
      short_description: "VIP access to the launch party",
      pathname: "vip-pass",
    });

    // Add tickets to event
    await Event.findByIdAndUpdate(event1._id, {
      tickets: [ticket1._id],
    });

    // Create sample microlights
    const microlight1 = await Microlight.create({
      name: "Atom V2",
      company: "Glow LEDs",
      category: "Premium",
      tags: [tag1._id],
      colors: [
        { name: "Red", colorCode: "#FF0000" },
        { name: "Green", colorCode: "#00FF00" },
        { name: "Blue", colorCode: "#0000FF" },
      ],
      flashing_patterns: [
        {
          name: "Strobe",
          type: "basic",
          on_dur: 50,
          off_dur: 50,
        },
      ],
      number_of_modes: 3,
      colors_per_mode: 3,
      number_of_leds: 3,
      brightness_control: true,
      brightness_levels: 8,
      saturation_control: true,
      saturation_levels: 8,
      power: "rechargeable",
      programmable: true,
      battery_life: 8,
      pathname: "atom-v2",
      images: [image1._id],
    });

    // Create sample modes
    await Mode.create({
      name: "Rainbow Strobe",
      description: "A beautiful rainbow strobing pattern",
      author: "Admin",
      user: adminUser._id,
      colors: [
        { name: "Red", colorCode: "#FF0000", brightness: 100, saturation: 100 },
        { name: "Green", colorCode: "#00FF00", brightness: 100, saturation: 100 },
        { name: "Blue", colorCode: "#0000FF", brightness: 100, saturation: 100 },
      ],
      order: 1,
      microlight: microlight1._id,
      flashing_pattern: {
        name: "Strobe",
        type: "basic",
        on_dur: 50,
        off_dur: 50,
      },
      visibility: "public",
      pathname: "rainbow-strobe",
    });

    // Create sample articles
    await Article.create({
      author: adminUser._id,
      title: "Getting Started with LED Gloves",
      short_description: "Learn the basics of LED gloving",
      content: "Detailed content about LED gloving basics...",
      order: 1,
      image: image1._id,
      tags: [tag1._id],
      pathname: "led-gloving-basics",
    });

    // Create sample features
    await Feature.create({
      user: adminUser._id,
      artist_name: "GlowMaster",
      email: "glowmaster@example.com",
      instagram_handle: "@glowmaster",
      product: "LED Glove Set",
      quote: "These are the best gloves I've ever used!",
      category: "Testimonial",
      pathname: "glowmaster-review",
    });

    // Create sample gift cards
    await GiftCard.create({
      code: "WELCOME2024",
      initialBalance: 50,
      currentBalance: 50,
      source: "promotion",
      isActive: true,
      expirationDate: new Date("2024-12-31"),
    });

    // Create sample content
    await Content.create({
      name: "Home Page Content",
      home_page: {
        modules: [
          {
            type: "hero",
            content: {
              title: "Welcome to Glow LEDs",
              description: "Discover the magic of light",
            },
          },
        ],
        slideshow: [
          {
            label: "New Products",
            fact: "Check out our latest LED products",
            image: image1._id,
            link: "/products",
            button_text: "Shop Now",
          },
        ],
        featured_products: [product1._id],
      },
    });

    // Create sample version
    await Version.create({
      version: 1.0,
    });

    // Create sample parcels
    await Parcel.create({
      type: "Small Box",
      length: 6,
      width: 4,
      height: 2,
      volume: 48,
      quantity_state: 100,
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
