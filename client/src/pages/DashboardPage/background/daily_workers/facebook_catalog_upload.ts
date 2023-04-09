import axios from "axios";

import dotenv from "dotenv";
import { domain } from "../worker_helpers";
dotenv.config();
const google_sheets_json = require("./google_sheet_credentials.json");

export const facebook_catalog_upload = async () => {
  google_sheets_json.web.client_secret = process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE;
  try {
    const { GoogleSpreadsheet } = require("google-spreadsheet");
    const doc = new GoogleSpreadsheet("1NqPY49Q-58oCVuslOw576zNyBUnyAAaOmGdzCrVT4g8");
    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_INFO_EMAIL,
      private_key: process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.clear();
    await sheet.setHeaderRow([
      "id",
      "title",
      "description",
      "availability",
      "condition",
      "price",
      "link",
      "image_link",
      "additional_image_link",
      "brand",
      "inventory",
      "fb_product_category",
      "google_product_category",
      "sale_price",
      "sale_price_effective_date",
      "product_type",
      "color",
      "size"
      // 'shipping_weight',
      // 'item_group_id'
    ]);
    const domainUrl = domain();
    const { data } = await axios.get(`${domainUrl}/api/products?limit=0&hidden=false&option=false`);

    const new_rows = data.products
      .filter((product: any) => !product.hidden)
      .filter((product: any) => product.category !== "options")
      .map((product: any, i: number) => {
        const id = product._id;
        const title = product.name;
        const description = product.description;
        const availability = "In Stock";
        const condition = "New";
        const price = `${product.price} USD`;
        const link = `https://www.glow-leds.com/collections/all/products/${product.pathname}`;
        const image_link = product.images[0];
        const additional_image_link = product.images[1];
        const brand = "Glow LEDs";
        const inventory = product.quantity;
        const fb_product_category = "toys & games > electronic toys";
        const google_product_category = "Toys & Games > Toys > Visual Toys";
        const sale_price = `${product.sale_price && product.sale_price.toFixed(2)} USD`;
        const sale_price_effective_date = `${product.sale_start_date && product.sale_start_date.slice(0, -1)}/${
          product.sale_end_date && product.sale_end_date.slice(0, -1)
        }`;
        const product_type = product.category;
        const color = product.color;
        const size = product.size;
        // const shipping_weight = `${product.weight_pounds
        // 	? product.weight_pounds * 16 + product.weight_ounces
        // 	: product.weight_ounces} oz`;
        // const item_group_id = product.item_group_id ? product.item_group_id : '';

        return {
          id,
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
          size
          // shipping_weight,
          // item_group_id
        };
      });

    await sheet.addRows(new_rows);
    await sheet.saveUpdatedCells();
  } catch (error) {}
};
