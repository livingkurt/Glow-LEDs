import axios from "axios";
import config from "../../config";
import { domain } from "../worker_helpers";

const google_sheets_json = require("../../../glow-leds-f0566f7a7ebe.json");

export const google_catalog_upload = async () => {
  google_sheets_json.private_key = config.REACT_APP_GOOGLE_SHEETS_PRIVATE;
  try {
    const { GoogleSpreadsheet } = require("google-spreadsheet");
    const doc = new GoogleSpreadsheet("1V9vSROcN0RA-OFRGOIbvt_raXh3ZG2BYDY9DSOudaqU");
    await doc.useServiceAccountAuth(google_sheets_json);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    await sheet.clear();
    await sheet.setHeaderRow([
      "id",
      "title",
      "description",
      "link",
      "condition",
      "price",
      "availability",
      "image_link",
      "mpn",
      "brand",
      "google_product_category",
      "sale_price",
      "sale_price_effective_date",
    ]);
    const domainUrl = domain();
    const { data } = await axios.get(`${domainUrl}/api/products?limit=0&hidden=false&option=false`);

    const new_rows = data.products
      .filter(product => !product.hidden)
      .map((product, i) => {
        const id = product._id;
        const title = product.name;
        const description = product.description;
        const availability = "In Stock";
        const condition = "New";
        const price = `${product.price} USD`;
        const link = `https://www.glow-leds.com/collections/all/products/${product.pathname}`;
        const image_link = product.images_object[0].link;
        const brand = "Glow LEDs";
        const mpn = product.pathname;
        const google_product_category = "Toys & Games > Toys > Visual Toys";
        const sale_price = product.sale_price + " USD";
        const sale_price_effective_date = `${product.sale_start_date && product.sale_start_date.slice(0, -1)}/${
          product.sale_end_date && product.sale_end_date.slice(0, -1)
        }`;

        return {
          id,
          title,
          description,
          link,
          condition,
          price,
          availability,
          image_link,
          mpn,
          brand,
          google_product_category,
          sale_price,
          sale_price_effective_date,
        };
      });

    await sheet.addRows(new_rows);
    await sheet.saveUpdatedCells();
    // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
    // await newSheet.delete();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
