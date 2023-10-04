import axios from "axios";
const fs = require("fs");
const Papa = require("papaparse");
import { domain } from "../worker_helpers";

const determineImage = (product, imageNum) => {
  if (product.images_object && product.images_object[imageNum]) {
    if (typeof product.images_object[imageNum].link === "function") {
      return product.images[imageNum];
    }
    return product.images_object[imageNum].link;
  } else {
    return "";
  }
};

export const facebook_catalog_upload = async () => {
  try {
    const domainUrl = domain();
    const { data } = await axios.get(`${domainUrl}/api/products/facebook_catelog`);

    let csvRows = [];
    let processedProducts = {};

    for (let product of data) {
      // Check if main product is already processed
      const mainProductNormalized = normalizeProductForCSV(product);
      if (!processedProducts[product._id]) {
        // Validate and add main product
        if (isValidRow(mainProductNormalized)) {
          csvRows.push(mainProductNormalized);
          processedProducts[product._id] = true;
        }
      }

      // Handle variants
      let variantFields = [
        "products",
        "color_products",
        "secondary_color_products",
        "secondary_products",
        "option_products",
      ];

      for (let field of variantFields) {
        for (let variantProduct of product[field]) {
          // Skip if this product option has already been added
          if (processedProducts[variantProduct._id]) continue;

          let variantRow = normalizeProductForCSV(variantProduct);
          variantRow.item_group_id = product._id;

          // Inherit properties from main product if missing in variant
          if (!variantRow.image_link) variantRow.image_link = mainProductNormalized.image_link;
          if (!variantRow.additional_image_link)
            variantRow.additional_image_link = mainProductNormalized.additional_image_link;
          if (!variantRow.description || variantRow.description === "")
            variantRow.description = mainProductNormalized.description;
          if (
            !variantRow.price ||
            parseFloat(variantRow.price) === 0 ||
            variantRow.price === "null USD" ||
            variantRow.price === "0 USD"
          )
            variantRow.price = mainProductNormalized.price;

          // Validate and add variant
          if (isValidRow(variantRow)) {
            csvRows.push(variantRow);
            processedProducts[variantProduct._id] = true;
          }
        }
      }
    }

    // Convert rows to CSV and save
    const csv = Papa.unparse(csvRows);
    const csvFileName = "./client/public/facebook_product_catalog.csv";
    fs.writeFile(csvFileName, csv, err => {
      if (err) throw err;
      console.log("CSV file has been saved.");
    });
  } catch (err) {
    console.error(err);
  }
};

// Check if a row is valid (id and title must be defined)
const isValidRow = row => {
  return row.id && row.title;
};

// Function to normalize product data for CSV
const normalizeProductForCSV = product => {
  return {
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
    item_group_id: null, // Add item_group_id with default null
  };
};

// export const facebook_catalog_upload = async () => {
//   try {
//     // Fetch existing products from MongoDB
//     const domainUrl = domain();
//     const { data } = await axios.get(`${domainUrl}/api/products/facebook_catelog`);

//     const new_rows = data
//       .filter(product => !product.hidden)
//       .filter(product => product.category !== "options")
//       .filter(product => product.option === false)
//       .sort((a, b) => (a.order > b.order ? 1 : -1))
//       .map((product, i) => ({
// id: product._id,
// title: product.name,
// description: product.description,
// availability: "In Stock",
// condition: "New",
// price: `${product.price} USD`,
// link: `https://www.glow-leds.com/collections/all/products/${product.pathname}`,
// image_link: determineImage(product, 0),
// additional_image_link: determineImage(product, 1),
// brand: "Glow LEDs",
// inventory: product.quantity,
// fb_product_category: "toys & games > electronic toys",
// google_product_category: "Toys & Games > Toys > Visual Toys",
// sale_price: `${product.sale_price && product.sale_price.toFixed(2)} USD`,
// sale_price_effective_date: `${product.sale_start_date && product.sale_start_date.slice(0, -1)}/${
//   product.sale_end_date && product.sale_end_date.slice(0, -1)
// }`,
// product_type: product.category,
// color: product.color,
// size: product.size,
//       }));

//     // Convert the normalized data to CSV
//     const csv = Papa.unparse(new_rows);

//     // Save the CSV to a file
//     const csvFileName = "./client/public/facebook_product_catalog.csv";
//     fs.writeFile(csvFileName, csv, err => {
//       if (err) throw err;
//       console.log("CSV file has been saved.");
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
