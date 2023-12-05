import axios from "axios";
import config from "../config";

const Airtable = require("airtable");

const current_products_upload = async () => {
  try {
    const { data } = await axios.get("https://www.glow-leds.com/api/products?limit=0&hidden=false&option=false");

    const new_rows = data
      .filter(product => !product.hidden)
      .filter(product => product.category !== "options")
      .map((product, i) => {
        const id = product._id;
        const title = product.name === "Supremes" ? "GL Gloves" : product.name;
        const description = product.description;
        const availability = "In Stock";
        const condition = "New";
        const price = `${product.price} USD`;
        const link = `https://www.glow-leds.com/collections/all/products/${product.pathname}`;
        const image_link = product.images_object[0].link;
        const additional_image_link = product.images_object[1].link;
        const brand = "Glow LEDs";
        const inventory = product.count_in_stock;
        const fb_product_category = "toys & games > electronic toys";
        const google_product_category = "Toys & Games > Toys > Visual Toys";
        const sale_price = `${product.sale_price && product.sale_price.toFixed(2)} USD`;
        const sale_price_effective_date = `${product.sale_start_date && product.sale_start_date.slice(0, -1)}/${
          product.sale_end_date && product.sale_end_date.slice(0, -1)
        }`;
        const product_type = product.category;
        const color = product.color;
        const size = product.size;

        return {
          title,
          description,
          availability,
          condition,
          price,
          link,
          image_link,
          additional_image_link,
          brand,
          inventory,
          fb_product_category,
          google_product_category,
          sale_price,
          sale_price_effective_date,
          product_type,
          color,
          size,
          id,
        };
      });

    const base = new Airtable({ apiKey: config.REACT_APP_AIRTABLE_ACCESS_TOKEN }).base("app9vDOYXFhhQr529");

    base("Current Products").update(new_rows, function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {});
    });

    // await sheet.addRows(new_rows);
    // await sheet.saveUpdatedCells();
    // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
    // await newSheet.delete();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

current_products_upload();
