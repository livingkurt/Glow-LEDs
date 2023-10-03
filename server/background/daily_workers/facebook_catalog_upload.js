import axios from "axios";
const fs = require("fs");
const Papa = require("papaparse");
import { domain } from "../worker_helpers";

export const facebook_catalog_upload = async () => {
  try {
    // Fetch existing products from MongoDB
    const domainUrl = domain();
    const { data } = await axios.get(`${domainUrl}/api/products?limit=0&hidden=false&option=false`);

    // Your existing code to normalize the product data
    const new_rows = data.data
      .filter(product => !product.hidden)
      .filter(product => product.category !== "options")
      .filter(product => product.option === false)
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((product, i) => ({
        id: product._id,
        title: product.name,
        description: product.description,
        availability: "In Stock",
        condition: "New",
        price: `${product.price} USD`,
        link: `https://www.glow-leds.com/collections/all/products/${product.pathname}`,
        image_link: product?.images_object[0]?.link,
        additional_image_link: product?.images_object[1]?.link,
        brand: "Glow LEDs",
        inventory: product.quantity,
        fb_product_category: "toys & games > electronic toys",
        google_product_category: "Toys & Games > Toys > Visual Toys",
        sale_price: `${product.sale_price && product.sale_price.toFixed(2)} USD`,
        sale_price_effective_date: `${product.sale_start_date && product.sale_start_date.slice(0, -1)}/${
          product.sale_end_date && product.sale_end_date.slice(0, -1)
        }`,
        product_type: product.category,
        color: product.color,
        size: product.size,
      }));

    // ... existing code to filter and map data

    // Convert the normalized data to CSV
    const csv = Papa.unparse(new_rows);

    // Save the CSV to a file
    const csvFileName = "./static/facebook_product_catalog.csv";
    fs.writeFile(csvFileName, csv, err => {
      if (err) throw err;
      console.log("CSV file has been saved.");
    });
  } catch (err) {
    console.error(err);
  }
};
