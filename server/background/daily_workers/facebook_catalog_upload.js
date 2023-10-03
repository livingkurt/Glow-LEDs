import axios from "axios";
const fs = require("fs");
const Papa = require("papaparse");
import { domain } from "../worker_helpers";

const determineImage = (product, imageNum) => {
  if (product.images_object && product.images_object[imageNum]) {
    return product.images_object[imageNum].link;
  } else {
    return product.images[imageNum];
  }
};

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
        image_link: determineImage(product, 0),
        additional_image_link: determineImage(product, 1),
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

    // Convert the normalized data to CSV
    const csv = Papa.unparse(new_rows);

    // Save the CSV to a file
    const csvFileName = "./client/public/facebook_product_catalog.csv";
    fs.writeFile(csvFileName, csv, err => {
      if (err) throw err;
      console.log("CSV file has been saved.");
    });
  } catch (err) {
    console.error(err);
  }
};
