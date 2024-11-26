import mongoose from "mongoose";
import config from "../server/config.js";
import Product from "../server/api/products/product.js";

const fetchActiveProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Query for non-hidden products
    const products = await Product.find(
      { hidden: false, deleted: false },
      {
        name: 1,
        category: 1,
        subcategory: 1,
        price: 1,
        "sale.price": 1,
        pathname: 1,
      }
    ).sort({ name: 1 });

    console.log("\nActive Products and Prices:\n");
    products.forEach(product => {
      const currentPrice = product.sale?.price > 0 ? product.sale.price : product.price;
      console.log(`${product.name} (${product.pathname})`);
      console.log(`Price: $${currentPrice}`);
      console.log(`Category: ${product.category}`);
      console.log(`Subcategory: ${product.subcategory}`);
      if (product.sale?.price > 0) {
        console.log(`Original Price: $${product.price}`);
        console.log(`Sale Price: $${product.sale.price}`);
      }
      console.log("---");
    });

    console.log(`\nTotal active products: ${products.length}`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    // Close MongoDB connection
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
};

// Execute the function
fetchActiveProducts();
