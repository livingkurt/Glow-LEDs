import express from "express";
import mongoose from "mongoose";
import { User } from "./users";
import { Expense, expense_db } from "./expenses";
import { Product } from "./products";
import { Feature } from "./features";
import { Order } from "./orders";
import { Email } from "./emails";
import { Affiliate } from "./affiliates";
import { Content } from "./contents";
import { Promo } from "./promos";
import { Survey } from "./surveys";
import { Paycheck, paycheck_db } from "./paychecks";
import { Parcel } from "./parcels";
import Chip from "./chips/chip";
import { snake_case } from "../utils/util";
import { Filament } from "./filaments";
import { Image, image_db, image_services } from "./images";
import { Category } from "./categorys";
import { isAdmin, isAuth } from "../middlewares/authMiddleware";
import { Cart } from "./carts";
import path from "path";
import fs from "fs";
import axios from "axios";
import appRoot from "app-root-path";
import { downloadFile, sanitizeExpenseName } from "./expenses/expense_helpers";
import { Parser } from "json2csv";
import config from "../config";
import * as csv from "fast-csv";
import Stripe from "stripe";
import { Team } from "./teams";
const Papa = require("papaparse");

const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});

const router = express.Router();

router.route("/users").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const users = await User.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(users);
    } else {
      const users = await User.find(parameter);

      res.send(users);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/expenses").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const expenses = await Expense.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(expenses);
    } else {
      const expenses = await Expense.find(parameter);

      res.send(expenses);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/products").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const products = await Product.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(products);
    } else {
      const products = await Product.find(parameter);

      res.send(products);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/features").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const features = await Feature.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(features);
    } else {
      const features = await Feature.find(parameter);

      res.send(features);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/orders").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const orders = await Order.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(orders);
    } else {
      const orders = await Order.find(parameter);

      res.send(orders);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/emails").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const emails = await Email.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(emails);
    } else {
      const emails = await Email.find(parameter);

      res.send(emails);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/affiliates").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const affiliates = await Affiliate.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(affiliates);
    } else {
      const affiliates = await Affiliate.find(parameter);

      res.send(affiliates);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/paychecks").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const paychecks = await Paycheck.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(paychecks);
    } else {
      const paychecks = await Paycheck.find(parameter);

      res.send(paychecks);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/parcels").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const parcels = await Parcel.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(parcels);
    } else {
      const parcels = await Parcel.find(parameter);

      res.send(parcels);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/chips").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const chips = await Chip.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(chips);
    } else {
      const chips = await Chip.find(parameter);

      res.send(chips);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/filaments").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const filaments = await Filament.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(filaments);
    } else {
      const filaments = await Filament.find(parameter);

      res.send(filaments);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/contents").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const contents = await Content.updateMany(parameter, {
        [action]: { [property]: value },
      });

      res.send(contents);
    } else {
      const contents = await Content.find(parameter);

      res.send(contents);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
router.route("/product_sale_price").put(isAuth, isAdmin, async (req, res) => {
  const products = await Product.find({});

  const sale_start_date = req.body.sale_start_date;
  const sale_end_date = req.body.sale_end_date;
  products
    // .filter((product) => !product.hidden)
    .forEach(async product => {
      const main_discount = product.price * req.body.discount_percentage;
      await Product.updateOne(
        { _id: product._id },
        {
          sale_price: product.price - main_discount,
          sale_start_date,
          sale_end_date,
        }
      );
    });
  res.send(products);
});
router.route("/clear_sale").put(isAuth, isAdmin, async (req, res) => {
  const products = await Product.find({});
  const cleared_sale_price = 0;
  const sale_start_date = req.body.sale_start_date;
  const sale_end_date = req.body.sale_end_date;
  products
    // .filter((product) => !product.hidden)
    .forEach(async product => {
      await Product.updateOne({ _id: product._id }, { sale_price: cleared_sale_price, sale_start_date, sale_end_date });
    });
  res.send(products);
});
router.route("/make_emails_lowercase").put(isAuth, isAdmin, async (req, res) => {
  const users = await User.find({ email: { $exists: true } });
  users.forEach(async user => {
    const userss = await User.findOne({ _id: user._id });
    const updated_user = new User(userss);
    // Check if user exists
    if (userss.email !== userss.email.toLowerCase()) {
      const same_user = await User.findOne({
        email: userss.email.toLowerCase(),
      });
      if (!same_user) {
        updated_user.email = updated_user.email.toLowerCase();
        await updated_user.save();
      } else if (same_user) {
        const orders = await Order.find({ user: updated_user._id });
        orders.forEach(async order => {
          // const orderss = await Order.findOne({ _id: order._id });

          const updated_order = new Order(order);
          updated_order.shipping.email = same_user.email;
          updated_order.user = same_user._id;
          updated_order.save();
        });

        updated_user.deleted = true;
        await updated_user.save();
      }
    }
  });
  res.send("Done");
});
router.route("/find_duplicate_emails").put(async (req, res) => {
  // get all users with email
  const users = await User.find({ email: { $exists: true } });

  // // find all emails that are not lowercase
  const not_lowercase = users.filter(user => user.email !== user.email.toLowerCase());

  // // find all emails that have duplicates to the lowercase version
  const duplicates = not_lowercase.filter(user => {
    const lowercase = user.email.toLowerCase();
    const same_email = users.filter(user => user.email === lowercase);
    return same_email.length > 1;
  });

  // // delete all uppercase email users and update all records that are associated with that user id to the lowercase version email user id
  // duplicates.forEach(async (user) => {
  //   const lowercase = user.email.toLowerCase();
  //   const same_email = users.filter((user) => user.email === lowercase);
  //   const lowercase_user = same_email[0];
  //   const orders = await Order.find({ user: user._id });
  //   orders.forEach(async (order) => {
  //     const updated_order = new Order(order);
  //     updated_order.shipping.email = lowercase_user.email;
  //     updated_order.user = lowercase_user._id;
  //     updated_order.save();
  //   });
  //   user.deleted = true;
  //   await user.save();
  // });

  // // Update all paychecks to have the lowercase email user id

  // res.send(duplicates);

  // delete all uppercase email users and update all records that are associated with that user id to the lowercase version email user id

  // const users = await User.find({ email: { $exists: true } });
  // const valueArr = users.map((item) => item.email).sort();

  // const isDuplicate = valueArr.some((item, idx) => {
  //   return valueArr.indexOf(item) != idx;
  // });

  // res.send(valueArr);
  res.send("Done");
});
router.route("/update_order_items").put(async (req, res) => {
  const order = await Order.updateMany(
    {
      "orderItems.category": {
        $regex: "frosted_diffusers",
        $options: "i",
      },
    },
    {
      // $rename: { shipping_price: 'volume' }
      $set: {
        "orderItems.$.category": "diffusers",
      },
      // $unset: { shipping_price: 1 }
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(order);
});
router.route("/update_diffuser_caps_product_name").put(async (req, res) => {
  // const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
  const products = await Product.find({});

  const diffuser_caps = products.filter(product => product.category === "diffuser_caps");

  diffuser_caps.forEach(async product => {
    product.name = product.name + " V4";
    const result = await product.save();
  });
  //
  res.send(products);
});
router.route("/convert_away_from_count_in_stock").put(async (req, res) => {
  const products = await Product.updateMany(
    {},
    {
      $rename: { countInStock: "count_in_stock" },
      $set: {
        quantity: 20,
      },
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/remove_countInStock").put(async (req, res) => {
  const products = await Product.updateMany(
    {},
    {
      $unset: { countInStock: 1 },
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/change_size_to_string").put(async (req, res) => {
  const products = await Product.find({ deleted: false });
  //
  // const diffuser_caps = products.filter((product) => product.category === 'diffuser_caps');

  products.forEach(async product => {
    product.sizing = product.size ? `${product.size}` : "";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/remove_size").put(async (req, res) => {
  const products = await Product.updateMany(
    {},
    {
      $unset: { size: 1 },
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/rename_sizing_to_size").put(async (req, res) => {
  const products = await Product.updateMany(
    {},
    {
      $rename: { sizing: "size" },
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/remove_product_options").put(async (req, res) => {
  const products = await Product.updateMany(
    {},
    {
      $unset: { product_options: 1 },
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/add_vortex_option_to_diffusers").put(async (req, res) => {
  // const products = await Product.find({
  //   deleted: false,
  //   category: "diffusers",
  // });
  const products = await Product.updateMany(
    {
      deleted: false,
      category: "diffusers",
    },
    {
      // $rename: { shipping_price: 'volume' }
      $set: {
        option_product_group: true,
        option_products: ["62732d2853e344002be8037f", "6261b1fd2fc16b002b58c2f7"],
      },
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(products);
});
router.route("/clozd_glowframez").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "glow_casings",
    subcategory: "nova",
  });

  products.forEach(async product => {
    const product_name = "OPYN " + product.name.replace(" Glow Casings", "framez");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    product.category = "glowframez";
    product.subcategory = "opyn";
    product.product_collection = "novaframez";
    product.facts = product.facts.replaceAll(" Casings", "framez");
    product.description = product.description.replaceAll(" Glow Casings", "framez");
    const result = await product.save();
  });

  res.send(products);
});
router.route("/opyn_glowskinz").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "glow_casings",
  });

  products.forEach(async product => {
    const product_name = "OPYN " + product.name.replace(" Glow Casings", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    product.category = "glowskinz";
    product.subcategory = "opyn";
    product.product_collection = "classics";
    product.facts = product.facts.replaceAll(" Casings", "skinz");
    product.description = product.description.replaceAll(" Casings", "skinz");
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_novaskinz").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "glowskins",
    subcategory: "novaskins",
  });

  products.forEach(async product => {
    const product_name = "CLOZD " + product.name.replace("skins", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    product.category = "glowskinz";
    product.subcategory = "clozd";
    product.product_collection = "novaskinz";
    product.facts = product.facts.replaceAll("skins", "skinz");
    product.description = product.description.replaceAll("skins", "skinz");
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_alt_novaskinz").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "glowskins",
    subcategory: "alt_novaskins",
  });

  products.forEach(async product => {
    const product_name = "CLOZD " + product.name.replace("skins", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    product.category = "glowskinz";
    product.subcategory = "clozd";
    product.product_collection = "novaskinz";
    product.facts = product.facts.replaceAll("skins", "skinz");
    product.description = product.description.replaceAll("skins", "skinz");
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_skin_color_options").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "colors",
    name: {
      $regex: "skins",
      $options: "i",
    },
  });

  products.forEach(async product => {
    const product_name = product.name
      .replace(product.name.split(" ")[0], product.name.split(" ")[0] + " CLOZD")
      .replace("skins", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_skin_size_options").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "sizes",
    name: {
      $regex: "skins",
      $options: "i",
    },
  });

  products.forEach(async product => {
    const product_name = "CLOZD " + product.name.replace("skins", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_casing_color_options").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "colors",
    name: {
      $regex: "Casings",
      $options: "i",
    },
  });

  products.forEach(async product => {
    const product_name = product.name
      .replace(product.name.split(" ")[0], product.name.split(" ")[0] + " CLOZD")
      .replace(" Glow Casings", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_casing_size_options").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "sizes",
    name: {
      $regex: "Casings",
      $options: "i",
    },
  });

  products.forEach(async product => {
    const product_name = "CLOZD " + product.name.replace(" Glow Casings", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_glowskinz").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "glowskins",
    subcategory: "classics",
  });

  products.forEach(async product => {
    const product_name = "CLOZD " + product.name.replace("skins", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    product.category = "glowskinz";
    product.subcategory = "clozd";
    product.product_collection = "classics";
    product.facts = product.facts.replaceAll("skins", "skinz");
    product.description = product.description.replaceAll("skins", "skinz");
    const result = await product.save();
  });

  res.send(products);
});
router.route("/update_frosted_domes_items").put(async (req, res) => {
  // const order = await Order.find({
  //   "orderItems.0.name": "Frosted Dome Diffusers",
  // });
  const order = await Order.updateMany(
    {
      "orderItems.0.name": "Frosted Dome Diffusers",
    },
    {
      // 0rename: { shipping_price: 'volume' }
      $set: {
        "orderItems.0.name": "Dome Diffusers",
        "orderItems.0.color_group_name": "Color",
        "orderItems.0.pathname": "dome_diffusers",
        "orderItems.0.color_code": "#abaeb5",
        "orderItems.0.color": "Frosted",
        "orderItems.0.color_product": "60ee85f5f26266002aee9c6e",
        "orderItems.0.color_product_name": "Frosted Dome Diffusers",
      },
      // $unset: { shipping_price: 1 }
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(order);
});
router.route("/update_translucent_white_domes_items").put(async (req, res) => {
  // const order = await Order.find({
  //   "orderItems.0.name": "Frosted Dome Diffusers",
  // });
  const order = await Order.updateMany(
    {
      "orderItems.0.name": "Dome Diffusers",
      "orderItems.0.color": "Translucent White",
    },
    {
      // 0rename: { shipping_price: 'volume' }
      $set: {
        "orderItems.0.name": "Dome Diffusers",
        "orderItems.0.color_group_name": "Color",
        "orderItems.0.pathname": "dome_diffusers",
        "orderItems.0.color_code": "#abaeb5",
        "orderItems.0.color": "Frosted",
        "orderItems.0.color_product": "60ee85f5f26266002aee9c6e",
        "orderItems.0.color_product_name": "Frosted Dome Diffusers",
      },
      // $unset: { shipping_price: 1 }
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(order);
});
router.route("/updated_capez_price").put(async (req, res) => {
  // const products = await Product.find({
  //   deleted: false,
  //   category: "glowskinz",
  //   subcategory: "options",
  //   name: {
  //     $regex: "Capez",
  //     $options: "i",
  //   },
  // });
  const products = await Product.updateMany(
    {
      deleted: false,
      category: "glowskinz",
      subcategory: "options",
      name: {
        $regex: "Capez",
        $options: "i",
      },
    },
    {
      // $rename: { shipping_price: 'volume' }
      $set: {
        price: 4,
      },
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(products);
});
router.route("/vortex_language").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "diffusers",
  });

  products.forEach(async product => {
    const facts_array = product.facts.split("\n");
    facts_array.splice(facts_array.length - 2, 2);
    // product.facts = product.facts.split("\n").pop();

    product.facts = `${facts_array.join(
      "\n"
    )}\nClassic diffusers are for Standard 5 mm bulbs\nVortex diffusers are for the Vortex gloveset from StoneOrbits`;

    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_diffusers").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "diffusers",
  });

  products.forEach(async product => {
    product.processing_time = [2, 5];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_exo_diffusers").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "exo_diffusers",
  });

  products.forEach(async product => {
    product.processing_time = [3, 6];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_diffuser_caps").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "diffuser_caps",
  });

  products.forEach(async product => {
    product.processing_time = [3, 6];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_decals").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "decals",
  });

  products.forEach(async product => {
    product.processing_time = [3, 6];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_gloves").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: { $in: ["gloves"] },
  });

  products.forEach(async product => {
    product.processing_time = [1, 3];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_glowskinz").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: { $in: ["glowskinz"] },
  });

  products.forEach(async product => {
    product.processing_time = [3, 7];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_glowstringz").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: { $in: ["glowstringz"] },
  });

  products.forEach(async product => {
    product.processing_time = [6, 10];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_battery_coin").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "batteries",
    subcategory: "coin",
  });

  products.forEach(async product => {
    product.processing_time = [1, 3];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_battery_storage").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    category: "batteries",
    subcategory: "storage",
  });

  products.forEach(async product => {
    product.processing_time = [5, 8];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_clear_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#4b4b4b",
    name: {
      $regex: "Skin",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62b12ad5e9a1c4705bd04412";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_clear_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#4b4b4b",
    name: {
      $regex: "Sled",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62afae4e01f26dbb73774e19";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_frosted_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "white",
    name: {
      $regex: "Skin",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62afaee901f26dbb73774e3d";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_frosted_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#abaeb5",
  });

  products.forEach(async product => {
    product.filament = "62afae6901f26dbb73774e1f";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_red_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#c11c22",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62afad6101f26dbb73774df0";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_red_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    product_collection: "secondary_colors",
    color_code: "#c11c22",
  });

  products.forEach(async product => {
    product.filament = "62afad4701f26dbb73774de4";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_emerald_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#15715a",
  });

  products.forEach(async product => {
    product.filament = "62afadb301f26dbb73774e01";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_green_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#00c700",
  });

  products.forEach(async product => {
    product.filament = "62afad7701f26dbb73774df6";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_teal_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#1da5b3",
  });

  products.forEach(async product => {
    product.filament = "62afadee01f26dbb73774e07";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_blue_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#0014ff",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62afae1901f26dbb73774e0d";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_blue_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#0014ff",
  });

  products.forEach(async product => {
    product.filament = "62afae8301f26dbb73774e25";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_violet_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#543abb",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62afad1901f26dbb73774ddd";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_violet_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#543abb",
  });

  products.forEach(async product => {
    product.filament = "62afad0c01f26dbb73774dd7";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_purple_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Purple",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62afae3001f26dbb73774e13";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_purple_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Purple",
    // color_code: "purple",
  });

  products.forEach(async product => {
    product.filament = "62afae9d01f26dbb73774e2b";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_black_tpu").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Black",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i",
    },
  });

  products.forEach(async product => {
    product.filament = "62afaeb801f26dbb73774e37";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_black_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Black",
    // color_code: "purple",
  });

  products.forEach(async product => {
    product.filament = "62afaeb101f26dbb73774e31";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_white_petg").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    // color: "White",
    color_code: "white",
  });

  products.forEach(async product => {
    product.filament = "62afaef401f26dbb73774e43";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/options_no_filament").put(async (req, res) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    filament: null,
    color: "",
    // filament: { $exists: false },
    // filament: { $type: 10 },
  });

  // products.forEach(async (product) => {
  //   product.filament = "62afaef401f26dbb73774e43";
  //   const result = await product.save();
  // });

  res.send(products);
});
router.route("/delete_multiple_products").put(async (req, res) => {
  const product = await Product.deleteMany({
    _id: {
      $in: [
        "619c1459e381f55d13cf8ad1",
        "62646aacb60a749fcf750eb3",
        "625f3d26fe5298002b924b68",
        "625f3d25fe5298002b924b5f",
        "60ee86b7701941002a3766a6",
        "61088a1ac5d88c002aa23d95",
        "60ee8657f26266002aee9c91",
        "6155f7833e0a16002b77e627",
        "60ee86a2701941002a37669c",
      ],
    },
  });

  res.send(product);
});
// router.route("/get_all_referenced_options_not_hidden").put(async (req, res) => {
//   const products = await Product.find({ deleted: false, hidden: false });

//   const ids = products.map((product) => product._id);
//   const color_product_ids = _.flatten(products.map((product) => product.color_products));

//   const secondary_color_product_ids = _.flatten(products.map((product) => product.secondary_color_products));

//   const option_product_ids = _.flatten(products.map((product) => product.option_products));
//   // const not_associated_products = await Product.find({
//   //   option: true,
//   //   color_products: { $nin: ids },
//   // });
//   //
//   res.send([...color_product_ids, ...secondary_color_product_ids, ...option_product_ids]);
// });
// router.route("/get_all_referenced_options").put(async (req, res) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product) => product._id);
//   const color_product_ids = _.flatten(products.map((product) => product.color_products));

//   const secondary_color_product_ids = _.flatten(products.map((product) => product.secondary_color_products));

//   const option_product_ids = _.flatten(products.map((product) => product.option_products));
//   // const not_associated_products = await Product.find({
//   //   option: true,
//   //   color_products: { $nin: ids },
//   // });
//   //
//   res.send([...color_product_ids, ...secondary_color_product_ids, ...option_product_ids]);
// });
router.route("/all_options").put(async (req, res) => {
  const products = await Product.find({ deleted: false, option: true });
  //
  const ids = products.map(product => {
    return {
      id: product._id,
      name: product.name,
      pathname: product.pathname,
    };
  });
  // .flat()
  // .filter(onlyUnique);

  // const not_associated_products = await Product.find({
  //   option: true,
  //   color_products: { $nin: ids },
  // });
  //
  res.send(ids);
});
router.route("/all_products").put(async (req, res) => {
  const products = await Product.find({ deleted: false });
  //
  const ids = products.map(product => {
    return {
      id: product._id,
      name: product.name,
      pathname: product.pathname,
    };
  });
  // .flat()
  // .filter(onlyUnique);

  // const not_associated_products = await Product.find({
  //   option: true,
  //   color_products: { $nin: ids },
  // });
  //
  res.send(ids);
});
router.route("/add_shipping").put(async (req, res) => {
  // Get all users that arent deleted and have no shipping attri
  const users = await User.find({ deleted: false, shipping: { $exists: false } });
  // Set default values for shipping
  const shipping = {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postalCode: "",
    international: false,
    country: "",
  };
  // Loop through users and add shipping
  users.forEach(async user => {
    const u = await User.findOne({ _id: user._id });
    const updated_user = new User(u);
    updated_user.shipping = shipping;
    await updated_user.save();
  });

  res.send(users);
});
router.route("/add_public_url").put(async (req, res) => {
  // Get all users that arent deleted and have no shipping attri
  const users = await User.find({ deleted: false, shipping: { $exists: false } });
  // Set default values for shipping
  const shipping = {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postalCode: "",
    international: false,
    country: "",
  };
  // Loop through users and add shipping
  users.forEach(async user => {
    const u = await User.findOne({ _id: user._id });
    const updated_user = new User(u);
    updated_user.shipping = shipping;
    await updated_user.save();
  });

  res.send(users);
});
router.route("/update_all_orders_easy_post_tracking_url").put(async (req, res) => {
  // Get all orders that arent deleted
  const orders = await Order.find({ deleted: false });
  // Loop through orders and update easy_post_tracking_url
  orders.forEach(async order => {
    const o = await Order.findOne({ _id: order._id });
    const updated_order = new Order(o);
    updated_order.tracking_url = order.easy_post_tracking_url;
    await updated_order.save();
  });
});
router.route("/update_refund_price").put(async (req, res) => {
  try {
    // // find all orders with isRefunded: true
    const orders = await Order.find({ deleted: false, isRefunded: true });

    const refunds = orders.map(order => {
      // Update refundPrice with the refund amount
      const totalRefunds = order.payment?.refund.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
      order.refundTotal = totalRefunds / 100;
      order.save();
    });
    res.send(refunds.flat(2));
  } catch (error) {
    console.error(error);
  }
});
// router.route("/get_all_referenced_color_options").put(async (req, res) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product) => product._id);
//   const color_product_ids = _.flatten(products.map((product) => product.color_products));

//   res.send(color_product_ids);
// });
// router.route("/get_all_referenced_secondary_color_options").put(async (req, res) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product) => product._id);
//   const color_product_ids = _.flatten(products.map((product) => product.secondary_color_products));

//   res.send(color_product_ids);
// });
// router.route("/get_all_referenced_option_options").put(async (req, res) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product) => product._id);
//   const color_product_ids = _.flatten(products.map((product) => product.option_products));

//   res.send(color_product_ids);
// });

router.route("/create_image_records_and_reference_them_in_product").put(async (req, res) => {
  const products = await Product.find({ deleted: false }).sort({ order: 1 });

  const processProduct = async product => {
    const { _id, name } = product;
    const imagesToUpdate = [
      { array: "images", object: "images_object" },
      { array: "color_images", object: "color_images_object" },
      { array: "secondary_color_images", object: "secondary_color_images_object" },
      { array: "option_images", object: "option_images_object" },
      { array: "secondary_images", object: "secondary_images_object" },
    ];

    for (const { array, object } of imagesToUpdate) {
      if (product[array] && product[array].length > 0) {
        const newImageIds = await Promise.all(
          product[array].map(async imageUrl => {
            const response = await Image.create({ link: imageUrl, album: name });
            return response._id;
          })
        );

        const update_product = await Product.findOne({ _id });
        if (update_product) {
          await Product.updateOne({ _id }, { [object]: newImageIds });
        }
      }
    }
  };

  await Promise.all(products.map(processProduct));
  res.send(products);
});
router.route("/create_content_image_records_and_reference_them").put(async (req, res) => {
  const contents = await Content.find({ deleted: false });

  const imageCache = {};

  const processContent = async content => {
    const { _id, home_page } = content;
    const albumName = home_page.h1;

    const imagesToUpdate = [
      { field: "home_page.image", objectField: "home_page.image_object" },
      { field: "home_page.images", objectField: "home_page.images_object", arrayProp: "image" },
      { field: "home_page.banner_image", objectField: "home_page.banner_image_object" },
      { field: "home_page.slideshow", objectField: "image_object", arrayProp: "image" },
    ];

    for (const { field, objectField, arrayProp } of imagesToUpdate) {
      let obj = content;
      const keys = field.split(".");
      for (const key of keys) {
        if (obj) {
          obj = obj[key];
        }
      }

      const processImage = async imageUrl => {
        if (imageCache[imageUrl]) {
          return imageCache[imageUrl];
        }

        const existingImage = await Image.findOne({ link: imageUrl });
        if (existingImage) {
          imageCache[imageUrl] = existingImage._id;
          return existingImage._id;
        }

        const response = await Image.create({ link: imageUrl, album: albumName });
        imageCache[imageUrl] = response._id;
        return response._id;
      };

      if (Array.isArray(obj)) {
        const newImageIds = await Promise.all(
          obj.map(async item => {
            const imageUrl = arrayProp ? item[arrayProp] : item;
            if (imageUrl) {
              return await processImage(imageUrl);
            }
          })
        ).then(ids => ids.filter(id => id));

        if (newImageIds.length > 0) {
          const updateFields = { [objectField]: newImageIds };
          await Content.updateOne({ _id }, { $set: updateFields });
        }
      } else if (obj) {
        const imageId = await processImage(obj);
        const updateFields = { [objectField]: imageId };
        await Content.updateOne({ _id }, { $set: updateFields });
      }
    }
  };

  await Promise.all(contents.map(processContent));
  res.send(contents);
});
router.route("/migrate_images_to_images_objects").put(async (req, res) => {
  try {
    // Fetch all the content records
    const allContent = await Content.find({ deleted: false });

    for (const content of allContent) {
      const imagesArray = content.home_page.images || [];
      const imageObjectsArray = content.home_page.images_object || [];

      for (const imageLink of imagesArray) {
        // Check if image record already exists
        let existingImage = await Image.findOne({ link: imageLink });

        // If image record doesn't exist, create a new one
        if (!existingImage) {
          existingImage = new Image({ link: imageLink });
          await existingImage.save();
        }

        // Add the ObjectId of the image to the images_object array
        imageObjectsArray.push(existingImage._id);
      }

      // Update the images_object field in the content record
      content.home_page.images_object = imageObjectsArray;

      // Optionally, clear the images array if you no longer need it
      content.home_page.images = [];

      await content.save();
    }

    res.status(200).json({ message: "Migration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during migration." });
  }
});

router.route("/migrate_slideshow_images").put(async (req, res) => {
  const contents = await Content.find({ deleted: false });
  const imageCache = {};

  const processContent = async content => {
    const { _id, home_page } = content;
    const albumName = home_page.h1;
    console.log({ albumName });
    const slideshowImages = home_page.slideshow;

    for (let i = 0; i < slideshowImages.length; i++) {
      const imageUrl = slideshowImages[i].image;

      if (imageUrl) {
        let imageId;
        if (imageCache[imageUrl]) {
          imageId = imageCache[imageUrl];
        } else {
          const existingImage = await Image.findOne({ link: imageUrl });

          if (existingImage) {
            imageId = existingImage._id;
          } else {
            const response = await Image.create({ link: imageUrl, album: albumName });
            imageId = response._id;
          }
          imageCache[imageUrl] = imageId;
        }

        await Content.updateOne(
          { _id, "home_page.slideshow.image": imageUrl },
          { $set: { "home_page.slideshow.$.image_object": new mongoose.Types.ObjectId(imageId) } }
        );
      }
    }
  };

  await Promise.all(contents.map(processContent));
  res.send(contents);
});

router.route("/migrate_email_images").put(async (req, res) => {
  const emails = await Email.find({ deleted: false });
  const imageCache = {};

  const processEmail = async email => {
    const { _id, h1 } = email;
    const albumName = h1;

    // Single image
    if (email.image) {
      let imageId;
      const imageUrl = email.image;

      if (imageCache[imageUrl]) {
        imageId = imageCache[imageUrl];
      } else {
        const existingImage = await Image.findOne({ link: imageUrl });

        if (existingImage) {
          imageId = existingImage._id;
        } else {
          const response = await Image.create({ link: imageUrl, album: albumName });
          imageId = response._id;
        }
        imageCache[imageUrl] = imageId;
      }

      await Email.updateOne({ _id }, { $set: { "image_object": new mongoose.Types.ObjectId(imageId) } });
    }

    // Multiple images
    if (email.images && Array.isArray(email.images)) {
      const newImageIds = await Promise.all(
        email.images.map(async imageUrl => {
          if (imageCache[imageUrl]) {
            return imageCache[imageUrl];
          }

          const existingImage = await Image.findOne({ link: imageUrl });
          if (existingImage) {
            imageCache[imageUrl] = existingImage._id;
            return existingImage._id;
          }

          const response = await Image.create({ link: imageUrl, album: albumName });
          imageCache[imageUrl] = response._id;
          return response._id;
        })
      ).then(ids => ids.filter(id => id));

      if (newImageIds.length > 0) {
        await Email.updateOne(
          { _id },
          { $set: { "images_object": newImageIds.map(id => new mongoose.Types.ObjectId(id)) } }
        );
      }
    }
  };

  await Promise.all(emails.map(processEmail));
  res.send(emails);
});

router.route("/create_category_records_and_reference_them_in_product").put(async (req, res) => {
  const findOrCreateCategory = async name => {
    let category = await Category.findOne({ name });
    if (!category) {
      category = new Category({ name });
      await category.save();
    }
    return category;
  };
  const products = await Product.find({ deleted: false }).sort({ order: 1 });

  for (const product of products) {
    if (product.category) {
      const category = await findOrCreateCategory(product.category);
      product.categorys.push(category);
    }

    if (product.subcategory) {
      const subcategory = await findOrCreateCategory(product.subcategory);
      product.subcategorys.push(subcategory);
    }

    if (product.product_collection) {
      const collection = await findOrCreateCategory(product.product_collection);
      product.collections.push(collection);
    } else {
      // Add an empty array to the collections field if there is no value
      product.collections = [];
    }

    // Save the updated product
    await product.save();
  }

  res.send(products);
});
router.route("/delete_old_carts").put(async (req, res) => {
  try {
    // Get the ids of the most recent cart for each user
    const mostRecentCarts = await Cart.aggregate([
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$user", cart: { $first: "$_id" } } },
      { $match: { _id: { $ne: null } } }, // Exclude carts with no user
    ]);

    const mostRecentCartIds = mostRecentCarts.map(c => c.cart);
    console.log({ mostRecentCartIds });

    // Delete all carts that are not in the list of most recent cart ids
    // And carts with no user
    const result = await Cart.deleteMany({
      $or: [{ _id: { $nin: mostRecentCartIds } }, { user: null }],
    });

    console.log(`Deleted ${result.deletedCount} extra carts.`);
  } catch (err) {
    console.error("An error occurred:", err);
  }
});
router.route("/make_expenses_positive").put(async (req, res) => {
  try {
    const expenses = await Expense.find({ deleted: false });
    const updated_expenses = expenses.map(async expense => {
      if (expense.amount < 0) {
        expense.amount = expense.amount * -1;
        await expense.save();
      }
    });
    res.send(updated_expenses);
  } catch (err) {
    console.error("An error occurred:", err);
  }
});
router.route("/card_migration").put(async (req, res) => {
  try {
    // Replace FID with Fidelity 7484 in expenses
    const expenses = await Expense.find({ deleted: false });
    const updated_expenses = expenses.map(async expense => {
      if (expense.card === "FID") {
        expense.card = "Fidelity 7484";
        await expense.save();
      }
      if (expense.card === "AMZNK") {
        expense.card = "Amazon 9204";
        await expense.save();
      }
      if (expense.card === "AMEX") {
        expense.card = "Joint AMEX 1006";
        await expense.save();
      }
      if (expense.card === "GL AMEX") {
        expense.card = "Amazon Business 1004";
        await expense.save();
      }
    });
    res.send(updated_expenses);
  } catch (err) {
    console.error("An error occurred:", err);
  }
});
router.route("/airtable_invoice_download").put(async (req, res) => {
  try {
    // Replace FID with Fidelity 7484 in expenses
    const expenses = await Expense.find({ deleted: false });

    expenses.forEach(async expense => {
      if (expense.airtable_invoice_links && expense.airtable_invoice_links.length > 0) {
        expense.airtable_invoice_links.forEach(async (link, index) => {
          const url = link;
          const sanitizedExpenseName = sanitizeExpenseName(expense.expense_name); // function to sanitize expense name
          const path = `temp/${expense.airtable_id}_${sanitizedExpenseName}`;

          // Download the image and save it to a temporary file
          await downloadFile(url, path, `${expense.airtable_id}_${sanitizedExpenseName}`);
        });
      }
    });

    res.json({ message: "Files are being downloaded and saved." });
  } catch (err) {
    console.error("An error occurred:", err);
  }
});
router.route("/link_documents_to_expenses").put(async (req, res) => {
  try {
    // Get the path to the temp directory
    const tempDir = path.join(appRoot.path, "temp");

    // Read the files from the temp directory
    const files = fs
      .readdirSync(tempDir)
      .filter(file => [".jpg", ".jpeg", ".png", ".gif"].includes(path.extname(file).toLowerCase()))
      .map(file => ({
        name: file,
        path: path.join(tempDir, file),
      }));

    // Group the files by airtable_id
    const filesByAirtableId = {};
    for (const file of files) {
      // Split the filename by underscore
      const splitName = file.name.split("_");
      const airtable_id = splitName.shift();
      let expense_name = splitName.join("_");

      // Remove the file extension from expense_name
      expense_name = path.basename(expense_name, path.extname(expense_name));

      if (!filesByAirtableId[airtable_id]) {
        filesByAirtableId[airtable_id] = [];
      }
      filesByAirtableId[airtable_id].push({ ...file, expense_name });
    }
    console.log({ filesByAirtableId });

    // Loop through each airtable_id
    for (const airtable_id in filesByAirtableId) {
      // Find the expense with the matching airtable_id
      const expense = await Expense.findOne({ airtable_id });

      // If the expense exists and has no documents
      if (expense && expense.documents.length === 0) {
        // Get the files and expense_name for this airtable_id
        const files = filesByAirtableId[airtable_id];
        const expense_name = sanitizeExpenseName(files[0].expense_name);
        console.log({ albumName: expense_name }, files);
        const uploadedImageLinks = [];

        const albumResponse = await axios.post(
          "https://api.imgur.com/3/album",
          { title: expense_name, privacy: "hidden" },
          {
            headers: { Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}` },
          }
        );
        const album = albumResponse.data.data;

        for (const image of files) {
          const imageData = fs.createReadStream(image.path);
          const imgResponse = await axios.post("https://api.imgur.com/3/image", imageData, {
            headers: {
              Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}`,
              "Content-Type": "multipart/form-data",
            },
            params: { album: album.deletehash },
          });
          uploadedImageLinks.push(imgResponse.data.data.link);
        }

        const images = await Promise.all(
          uploadedImageLinks.map(async link => {
            return await image_db.create_images_db({ link, album: expense_name });
          })
        );

        console.log({ images });

        // Loop through each image
        for (const image of images) {
          // Add the image id to the expense's documents array
          expense.documents.push(image._id);
        }

        // Save the updated expense
        await Expense.updateOne({ _id: expense._id }, expense);
      } else if (expense) {
        console.log(`Expense with airtable_id: ${airtable_id} already has documents. No update was made.`);
      } else {
        console.error(`No expense found with airtable_id: ${airtable_id}`);
      }
    }

    res.status(200).send({ message: "Images uploaded and linked to expenses successfully" });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});
router.route("/export_expenses_as_csv").put(async (req, res) => {
  try {
    const expenses = await Expense.find({});

    const jsonExpenses = JSON.parse(JSON.stringify(expenses));
    const csvFields = Object.keys(expenses[0]._doc);
    const csvParser = new Parser({ fields: csvFields });
    const csvData = csvParser.parse(jsonExpenses);

    fs.writeFileSync("./expenses.csv", csvData);

    res.status(200).send({ message: "Expenses successfully exported to CSV" });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});
router.route("/delete_all_expenses").put(async (req, res) => {
  try {
    // Delete all expenses
    await Expense.deleteMany({});
    res.status(200).send({ message: "Expenses Deleted" });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});

router.route("/update_status").put(async (req, res) => {
  try {
    console.log("Starting status update...");

    // Define the time intervals for each status
    const timeIntervals = {
      isCrafting: 96 * 60 * 60 * 1000,
      isCrafted: 120 * 60 * 60 * 1000,
      isPackaged: 144 * 60 * 60 * 1000,
      // isPickup: 144 * 60 * 60 * 1000,
      isShipped: 168 * 60 * 60 * 1000,
      isInTransit: 192 * 60 * 60 * 1000,
      isOutForDelivery: 264 * 60 * 60 * 1000,
      isDelivered: 264 * 60 * 60 * 1000,
    };

    // Define the cutoff date
    const cutoffDate = new Date("2023-06-26T02:03:50.442Z");

    console.log("Updating documents...");
    // Update the documents
    let prevStatus = "isPaid";
    for (const [status, interval] of Object.entries(timeIntervals)) {
      const dateStatus = status.slice(2).toLowerCase() + "At";
      const prevDateStatus = prevStatus.slice(2).toLowerCase() + "At";

      // Find all documents that match the condition
      console.log(
        `Finding documents with conditions: status ${status} not true, prevStatus ${prevStatus} true, createdAt before ${cutoffDate}`
      );
      const docs = await Order.find({
        [status]: { $ne: true }, // status is not true
        [prevStatus]: true, // previous status is true
        createdAt: { $lt: cutoffDate }, // created before the cutoff date
      });

      console.log(`Found ${docs.length} documents to update for status ${status}.`);

      // Update each document and save it
      for (const doc of docs) {
        if (!doc[dateStatus]) {
          // Check if the current date status is not defined
          doc[status] = true;
          doc[dateStatus] = doc[prevDateStatus] ? new Date(doc[prevDateStatus].getTime() + interval) : new Date(); // or any default date you want to set
          await doc.save();
          console.log(`Updated document ${doc._id} for status ${status}.`);
        } else {
          console.log(`Skipped document ${doc._id} due to existing ${dateStatus}.`);
        }
      }

      console.log(`Updated documents for status ${status}.`);

      prevStatus = status;
    }

    console.log("Finished updating statuses.");
    res.status(200).send({ message: "Statuses updated successfully." });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});

router.route("/migrate_orders").put(async (req, res) => {
  try {
    const oldUserId = "600a151a3a0d3c002a9216e4";
    const newUserId = "64a46533b66fe4000277ea80";

    if (!oldUserId || !newUserId) {
      return res.status(400).send({ message: "Both oldUserId and newUserId are required." });
    }

    const result = await Order.updateMany(
      { user: oldUserId }, // find all orders with the oldUserId
      { $set: { user: newUserId } } // update the user field to the newUserId
    );

    res.send({ message: `Successfully migrated ${result.nModified} orders.`, result });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});
router.route("/sample_ids").put(async (req, res) => {
  try {
    // Get all users that are employees
    const employees = await User.find({ is_employee: true });

    // Get all affiliates that are sponsored
    const sponsoredAffiliates = await Affiliate.find({ sponsor: true });

    // Get the user details of the sponsored affiliates
    const sponsoredAffiliateUsers = await User.find({
      _id: { $in: sponsoredAffiliates.map(affiliate => affiliate.user) },
    });

    // Combine the employees and sponsored affiliate users
    const users = [...employees, ...sponsoredAffiliateUsers];

    // Send the user ids as the response
    res.send(users.map(user => ({ id: user._id, user: user.first_name + " " + user.last_name })));
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});
router.route("/migrate_payments").put(async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find({});

    // Iterate over each order
    for (const order of orders) {
      // Array to hold new transactions
      const newTransactions = [];

      // Convert payment into a transaction
      if (order.payment && order.payment.payment) {
        newTransactions.push({
          paymentType: order.payment.paymentMethod,
          paymentMethod: order.payment.payment,
          payment: order.payment.charge,
          refund: {},
          refundReason: {},
        });
      }

      // Convert each refund into a transaction
      if (order.payment && order.payment.refund) {
        for (const refund of order.payment.refund) {
          newTransactions.push({
            paymentType: "",
            paymentMethod: {},
            payment: {},
            refund: refund,
            refundReason: order.payment.refund_reason,
          });
        }
      }

      // Update transactions in the order
      order.transactions = newTransactions;

      // Save the order back to the database
      await order.save();
    }

    // Send response
    res.send({ message: "Payment data migrated successfully." });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});
router.route("/unset_payments").put(async (req, res) => {
  try {
    console.log("Transactions removed from all orders.");
    return await Order.updateMany({}, { $unset: { payments: 1 } });
  } catch (error) {
    console.error("Error:", error);
  }
});
router.route("/import_checkins").put(async (req, res) => {
  try {
    const filePath = "/Users/kurtlavacque/Desktop/Glow-LEDs/api/checkin.csv";
    const checkinsStream = fs.createReadStream(filePath);

    const checkinsData = [];
    csv
      .parseStream(checkinsStream, { headers: true })
      .on("error", error => console.error(error))
      .on("data", row => checkinsData.push(row))
      .on("end", async rowCount => {
        for (const data of checkinsData) {
          const {
            "Glover Name": artist_name,
            "What month are you checking in?": month,
            "Questions/problems we can discuss in meetings or questions for the company.": questionsConcerns,
          } = data;

          const checkin = { month, questionsConcerns, year: 2023 };

          const affiliate = await Affiliate.findOne({ artist_name });
          if (affiliate) {
            // Check if there is already a checkin for the same month and year.
            const existingCheckin = affiliate.sponsorMonthlyCheckins.find(
              ci => ci.year === checkin.year && ci.month === checkin.month
            );

            if (existingCheckin) {
              continue; // Skip this checkin if it already exists.
            }

            // Add new checkin at the correct position based on month and year.
            const newCheckins = [...affiliate.sponsorMonthlyCheckins];
            const index = newCheckins.findIndex(
              ci => ci.year > checkin.year || (ci.year === checkin.year && ci.month.localeCompare(month) > 0)
            );
            if (index !== -1) {
              newCheckins.splice(index, 0, checkin);
            } else {
              newCheckins.push(checkin);
            }

            affiliate.sponsorMonthlyCheckins = newCheckins;
            await affiliate.save();
          }
        }

        res.status(200).send("Import completed successfully");
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

router.route("/remove_free_shipping").put(async (req, res) => {
  try {
    await Promo.updateMany(
      {
        single_use: true,
        affiliate: { $exists: false },
        user: { $exists: false },
      },
      {
        $set: { free_shipping: false },
      }
    );

    res.status(200).json({ message: "Free shipping removed from single-use codes." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.route("/migrate_surveys").put(async (req, res) => {
  try {
    // First find the survey that has is_survey set to true
    const surveyTemplate = await Survey.findOne({ is_survey: true });
    if (!surveyTemplate) {
      return res.status(400).json({ success: false, message: "No survey template found" });
    }

    const surveys = await Survey.find({ is_survey: { $ne: true } });

    const bulkOps = surveys.map(survey => {
      const questionAnswerArray = [];

      for (const qa of surveyTemplate.question_answer) {
        const correspondingAnswer = survey[`answer_${qa._id}`] || "";
        questionAnswerArray.push({
          question: qa.question,
          answer: correspondingAnswer,
        });
      }

      return {
        updateOne: {
          filter: { _id: survey._id },
          update: {
            $set: { question_answer: questionAnswerArray },
          },
        },
      };
    });

    Survey.bulkWrite(bulkOps)
      .then(result => {
        res.status(200).json({ success: true, message: "Migration successful", result });
      })
      .catch(err => {
        res.status(500).json({ success: false, message: "Migration failed", err });
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
});

router.route("/delete_old_categories").put(async (req, res) => {
  try {
    // Remove existing filament_tags categories to avoid duplicate seeding
    await Category.deleteMany({});

    await Product.updateMany({ categorys: { $exists: true, $not: { $size: 0 } } }, { $set: { categorys: [] } });

    res.status(200).json({ success: true, message: "Categories seeded successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
});

// Function to convert string to Title Case
function toTitleCase(str) {
  return str
    .split("_")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

router.route("/generate_categories").put(async (req, res) => {
  try {
    const products = await Product.find({});

    for (const product of products) {
      let categoryIds = [];
      let subCategoryIds = [];
      let collectionIds = [];

      let existingCategory = null;
      let existingSubCategory = null;
      let existingCollection = null;

      // Handle category
      if (product.category) {
        const categoryName = toTitleCase(product.category);
        existingCategory = await Category.findOne({
          name: categoryName,
          type: "category",
        });
        if (!existingCategory) {
          existingCategory = new Category({
            name: categoryName,
            pathname: snake_case(product.category),
            type: "category",
          });
          await existingCategory.save();
        }
        categoryIds.push(existingCategory._id);
      }

      // Handle subcategory
      if (product.subcategory) {
        const subCategoryName = toTitleCase(product.subcategory);
        existingSubCategory = await Category.findOne({
          name: subCategoryName,
          type: "subcategory",
        });
        if (!existingSubCategory) {
          existingSubCategory = new Category({
            name: subCategoryName,
            pathname: snake_case(product.subcategory),
            type: "subcategory",
          });
          await existingSubCategory.save();
        }
        subCategoryIds.push(existingSubCategory._id);

        if (existingCategory) {
          await Category.updateOne(
            { _id: existingCategory._id },
            { $addToSet: { subcategorys: existingSubCategory._id } }
          );
        }
      }

      // Handle collection
      if (product.product_collection) {
        const collectionName = toTitleCase(product.product_collection);
        existingCollection = await Category.findOne({
          name: collectionName,
          type: "collection",
        });
        if (!existingCollection) {
          existingCollection = new Category({
            name: collectionName,
            pathname: snake_case(product.product_collection),
            type: "collection",
          });
          await existingCollection.save();
        }
        collectionIds.push(existingCollection._id);

        if (existingSubCategory) {
          await Category.updateOne(
            { _id: existingSubCategory._id },
            { $addToSet: { collections: existingCollection._id } }
          );
        }
      }

      // Update product
      await Product.updateOne(
        { _id: product._id },
        {
          categorys: categoryIds,
          subcategorys: subCategoryIds,
          collections: collectionIds,
        }
      );
    }

    res.status(200).json({ success: true, message: "Categories generated and products updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
});

router.route("/seed_filament_tags").put(async (req, res) => {
  try {
    // List of categories from the image
    const categories = [
      { name: "Framez Colors", type: "filament_tags", pathname: "framez_colors" },
      { name: "Diffuser Adapters Colors", type: "filament_tags", pathname: "diffuser_adapter_colors" },
      { name: "Diffuser Caps Colors", type: "filament_tags", pathname: "diffuser_caps_colors" },
      { name: "Diffusers Colors", type: "filament_tags", pathname: "diffuser_colors" },
      { name: "EXO Diffusers Plug Colors", type: "filament_tags", pathname: "exo_diffusers_plug_color" },
      { name: "EXO Diffusers Skeleton Colors", type: "filament_tags", pathname: "exo_diffuser_skeleton_colors" },
      { name: "Sledz Colors", type: "filament_tags", pathname: "sledz_colors" },
      { name: "OPYN Glowskinz Colors", type: "filament_tags", pathname: "opyn_glowskinz_colors" },
      { name: "CLOZD Glowskinz Colors", type: "filament_tags", pathname: "clozd_glowskinz_colors" },
    ];

    // Remove existing filament_tags categories to avoid duplicate seeding
    await Category.deleteMany({ type: "filament_tags" });

    // Create the new categories
    await Category.insertMany(categories);

    res.status(200).json({ success: true, message: "Categories seeded successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
});

export const clozdGlowskinzColors = ["Clear", "Frosted", "Red", "Emerald", "Blue", "Purple"];
export const opynGlowskinzColors = ["Clear", "Frosted", "Red", "Emerald", "Blue", "Purple", "Black"];
export const sledColors = ["Clear", "Red", "Green", "Blue", "Purple", "Black", "White"];
export const exoDiffusersSkeletonColors = ["Black", "White", "Red", "Green", "Blue", "Purple"];
export const exoDiffusersPlugColors = ["Frosted", "Red", "Green", "Blue", "Purple"];
export const diffusersColors = ["Frosted", "Clear", "Red", "Green", "Blue", "Purple"];
export const diffuserCapsCapColors = ["Black", "White", "Red", "Green", "Blue", "Purple"];
export const diffuserCapsAdapterColors = ["Frosted", "Clear", "Red", "Green", "Blue", "Purple"];
export const framezColors = ["Clear", "Red", "Green", "Blue", "Purple"];

router.route("/link_categories_to_filament").put(async (req, res) => {
  try {
    // Define a mapping from category variable names to their normal-case names
    const categoriesMapping = {
      clozdGlowskinzColors: "CLOZD Glowskinz Colors",
      opynGlowskinzColors: "OPYN Glowskinz Colors",
      sledColors: "Sledz Colors",
      exoDiffusersSkeletonColors: "EXO Diffusers Skeleton Colors",
      exoDiffusersPlugColors: "EXO Diffusers Plug Colors",
      diffusersColors: "Diffusers Colors",
      diffuserCapsCapColors: "Diffuser Caps Colors",
      diffuserCapsAdapterColors: "Diffuser Adapters Colors",
      framezColors: "Framez Colors",
    };

    for (const [arrayName, categoryName] of Object.entries(categoriesMapping)) {
      const categoryColors = eval(arrayName); // Get the array using its string name
      const categoryDoc = await Category.findOne({ name: categoryName });

      for (const color of categoryColors) {
        await Filament.updateMany({ color }, { $addToSet: { tags: categoryDoc._id } });
      }
    }
    res.status(200).json({ success: true, message: "Categories seeded successfully!" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
});

router.route("/xxl_revenue").get(async (req, res) => {
  try {
    // Query to find all orders that have XXL-sized gloves
    // const ordersWithXXL = await Order.find({ deleted: false, isPaid: true }).exec();
    const ordersWithXXL = await Order.find({
      $and: [
        { "orderItems.category": "gloves" },
        // { "orderItems.name": { $regex: "V1", $options: "i" } },
        // { "orderItems.size": "XXL" },
      ],
    }).exec();

    let totalRevenue = 0;
    let numberOfPairsSold = 0;
    let numberOfOrders = 0;
    let glovesPrice = 0;
    const ORIGINAL_BATTERY_COST = 18.99;
    const FIRST_GLOVE_COST = 3.95;
    const SECOND_GLOVE_COST = 1.99;
    const PAIRS_IN_REFRESH_PACK = 6;
    // Loop through each order to calculate the total revenue
    ordersWithXXL.forEach(order => {
      order.orderItems.forEach(item => {
        console.log({ name: item.name, size: item?.size });
        if (item.name === "Refresh Pack V1 (6 Pairs Supreme Gloves V1 + 120 Batteries)" && item.size === "XXL") {
          // You can conditionally check the discount rate if it varies, and then apply it
          let discountRate;
          if (item.price === 34.99) {
            discountRate = 0.18;
            glovesPrice = FIRST_GLOVE_COST;
          } else if (item.price === 26.99) {
            discountRate = 0.37;
            glovesPrice = SECOND_GLOVE_COST;
          }

          const originalPackCost = glovesPrice * PAIRS_IN_REFRESH_PACK + ORIGINAL_BATTERY_COST;

          const discountedPackCost = originalPackCost * (1 - discountRate);

          totalRevenue += item.qty * discountedPackCost;
          numberOfPairsSold += item.qty * 6;
          numberOfOrders += 1;
        } else if (item.name === "Supreme Gloves V1" && item.size === "XXL") {
          totalRevenue += item.qty * item.price;
          numberOfPairsSold += item.qty;
          numberOfOrders += 1;
        } else if (item.name === "XXL Supreme Gloves V1" && item.size === "XXL") {
          totalRevenue += item.qty * item.price;
          numberOfPairsSold += item.qty;
          numberOfOrders += 1;
        }
      });
    });

    res.status(200).json({ success: true, totalRevenue, numberOfPairsSold, numberOfOrders });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
});

router.route("/backfill_stripe_fees").put(async (req, res) => {
  try {
    const startDate = new Date("2018-01-01");
    const endDate = new Date("2023-11-18");

    let hasMore = true;
    let lastPaymentIntentId = null;

    while (hasMore) {
      const paymentIntentsParams = {
        created: {
          gte: Math.floor(startDate.getTime() / 1000),
          lte: Math.floor(endDate.getTime() / 1000),
        },
        limit: 100, // adjust as needed
      };

      if (lastPaymentIntentId) {
        paymentIntentsParams.starting_after = lastPaymentIntentId;
      }

      const paymentIntentsResponse = await stripe.paymentIntents.list(paymentIntentsParams);

      const paymentIntents = paymentIntentsResponse.data;
      hasMore = paymentIntentsResponse.has_more;

      for (const intent of paymentIntents) {
        const charges = await stripe.charges.list({
          payment_intent: intent.id,
        });

        for (const charge of charges.data) {
          if (charge.balance_transaction) {
            const balanceTransaction = await stripe.balanceTransactions.retrieve(charge.balance_transaction);
            console.log({ fee: balanceTransaction.fee / 100, date: new Date(balanceTransaction.created * 1000) });
            await expense_db.create_expenses_db({
              expense_name: "Stripe Fee",
              amount: balanceTransaction.fee / 100,
              category: "Stripe Fee",
              date_of_purchase: new Date(balanceTransaction.created * 1000),
              place_of_purchase: "Stripe",
              application: "Payments",
            });
          } else {
            console.log(`Skipping charge with ID ${charge.id} as it has no balance transaction.`);
          }
        }
      }

      if (paymentIntents.length > 0) {
        lastPaymentIntentId = paymentIntents[paymentIntents.length - 1].id;
      } else {
        hasMore = false;
      }
    }

    res.status(200).send({ message: "Backfill completed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// router.route("/backfill_paychecks").put(async (req, res) => {
//   try {
//     const startDate = new Date("2018-01-01");
//     const paychecks = [];
//     const expenses = [];

//     // Fetch all users with a Stripe Connect ID
//     // const users = await User.find({}).populate("affiliate");
//     const user = await User.findOne({ stripe_connect_id: "acct_1LLGlqQWeCRZgEbL" }).populate("affiliate");

//     // for (const user of users) {
//     //   let hasMore = true;
//     //   let lastPayoutId = null;

//     //   while (hasMore) {
//     const payoutParams = {
//       created: {
//         gte: Math.floor(startDate.getTime() / 1000),
//       },
//       limit: 100, // adjust as needed
//     };

//     // if (lastPayoutId) {
//     //   payoutParams.starting_after = lastPayoutId;
//     // }

//     // try {
//     //   payoutsResponse = await stripe.payouts.list(payoutParams, { stripeAccount: user.stripe_connect_id });
//     // } catch (error) {
//     //   console.error(`Failed to fetch payouts for user ${user.affiliate.artist_name}: ${error.message}`);
//     //   continue; // Skip to the next user if payouts cannot be fetched
//     // }
//     const { data } = await stripe.payouts.list(payoutParams, { stripeAccount: "acct_1LLGlqQWeCRZgEbL" });

//     for (const payout of data) {
//       console.log({
//         artist_name: user?.affiliate?.artist_name,
//         amount: payout.amount / 100,
//         length: payout.length,
//       });
//       // Process each payout
// paychecks.push({
//   user: user?._id,
//   fullName: user.first_name + " " + user.last_name,
//   amount: payout.amount / 100,
//   affiliate: user?.affiliate?._id,
//   artist_name: user?.affiliate?.artist_name,
//   email: user?.email,
//   stripe_connect_id: user.stripe_account_id,
//   paid: payout.status === "paid",
//   paid_at: payout.arrival_date ? new Date(payout.arrival_date * 1000).toISOString() : null,
// });

// // Accumulate Expense data
// expenses.push({
//   expense_name: "Payout to " + user.first_name + " " + user.last_name,
//   amount: payout.amount / 100,
//   category: "Payout",
//   date_of_purchase: new Date(payout.created * 1000).toISOString(),
//   place_of_purchase: "Stripe Connect",
//   application: "Payments",
// });

//       // lastPayoutId = payout.id;
//     }
//     // }
//     // }
//     // Convert data to CSV
// const paycheckParser = new Parser({ fields: Object.keys(paychecks[0]) });
// const paycheckCsv = paycheckParser.parse(paychecks);

// const expenseParser = new Parser({ fields: Object.keys(expenses[0]) });
// const expenseCsv = expenseParser.parse(expenses);

// // Write CSV to files
// fs.writeFileSync("./paychecks.csv", paycheckCsv);
// fs.writeFileSync("./expenses.csv", expenseCsv);

//     res.status(200).send({ message: "CSV files created successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// });

// router.route("/backfill_paychecks").put(async (req, res) => {
//   try {
//     const startDate = new Date("2018-01-01");
//     const paychecks = [];
//     const expenses = [];

//     // Fetch all users with a Stripe Connect ID
//     // const users = await User.find({ stripe_connect_id: { $exists: true } }).populate("affiliate");

//     const transferParams = {
//       created: {
//         gte: Math.floor(startDate.getTime() / 1000),
//       },
//       limit: 100, // adjust as needed
//       // destination: user.stripe_connect_id,
//     };

//     try {
//       const transfersResponse = await stripe.transfers.list(transferParams);
//       const transfers = transfersResponse.data;
//       // console.log({ transfers });

//       for (const transfer of transfers) {
//         const user = await User.findOne({ stripe_connect_id: transfer.destination }).populate("affiliate");
//         console.log({ user, destination: transfer.destination });
//         // Process each transfer
//         console.log({
//           artist_name: user?.affiliate?.artist_name,
//           first_name: user?.first_name,
//           amount: transfer.amount / 100,
//         });
//         paychecks.push({
//           user: user?._id,
//           fullName: user.first_name + " " + user.last_name,
//           amount: payout.amount / 100,
//           affiliate: user?.affiliate?._id,
//           artist_name: user?.affiliate?.artist_name,
//           email: user?.email,
//           stripe_connect_id: user.stripe_account_id,
//           paid: payout.status === "paid",
//           paid_at: payout.arrival_date ? new Date(payout.arrival_date * 1000).toISOString() : null,
//         });

//         // Accumulate Expense data
//         expenses.push({
//           expense_name: "Payout to " + user.first_name + " " + user.last_name,
//           amount: payout.amount / 100,
//           category: "Payout",
//           date_of_purchase: new Date(payout.created * 1000).toISOString(),
//           place_of_purchase: "Stripe Connect",
//           application: "Payments",
//         });
//       }
//     } catch (error) {
//       console.error(`Failed to fetch transfers for user ${error.message}`);
//       // Continue to the next user if transfers cannot be fetched
//     }

//     // Convert data to CSV and write to files
//     const paycheckParser = new Parser({ fields: Object.keys(paychecks[0]) });
//     const paycheckCsv = paycheckParser.parse(paychecks);

//     const expenseParser = new Parser({ fields: Object.keys(expenses[0]) });
//     const expenseCsv = expenseParser.parse(expenses);

//     // Write CSV to files
//     fs.writeFileSync("./paychecks.csv", paycheckCsv);
//     fs.writeFileSync("./expenses.csv", expenseCsv);

//     res.status(200).send({ message: "CSV files created successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// });

router.route("/backfill_paychecks").put(async (req, res) => {
  try {
    const startDate = new Date("2018-01-01");
    const validTransfers = [];
    let hasMore = true;
    let lastTransferId = null;
    const users = await User.find({ stripe_connect_id: { $regex: /.+/ } }).populate("affiliate");
    const connectIds = users.map(user => user.stripe_connect_id);
    console.log({ connectIds });

    while (hasMore) {
      const transferParams = {
        created: {
          gte: Math.floor(startDate.getTime() / 1000),
        },
        limit: 100, // adjust as needed
      };

      if (lastTransferId) {
        transferParams.starting_after = lastTransferId;
      }

      const transfersResponse = await stripe.transfers.list(transferParams);
      const transfers = transfersResponse.data;
      hasMore = transfersResponse.has_more;

      for (const transfer of transfers) {
        const isConnectAccount = connectIds.includes(transfer.destination);
        if (transfer.destination && isConnectAccount) {
          const user = await User.findOne({ stripe_connect_id: transfer.destination }).populate("affiliate");
          console.log({
            name: user.first_name + " " + user.last_name,
            destination: transfer.destination,
            created: new Date(transfer.created * 1000).toISOString(),
          });
          // Process and store each transfer in the validTransfers array
          validTransfers.push({
            user_id: user?._id,
            affiliate_id: user?.affiliate?._id,
            description: transfer.description,
            first_name: user.first_name,
            last_name: user.last_name,
            amount: transfer.amount / 100,
            artist_name: user?.affiliate?.artist_name,
            email: user?.email,
            stripe_connect_id: user.stripe_account_id,
            paid: true,
            paid_at: transfer.created ? new Date(transfer.created * 1000).toISOString() : null,
          });
        }
      }

      // Update the last processed transferId
      if (transfers.length > 0) {
        lastTransferId = transfers[transfers.length - 1].id;
      } else {
        hasMore = false;
      }
    }
    // Convert data to CSV and write to files
    const transferParser = new Parser({ fields: Object.keys(validTransfers[0]) });
    const transferCsv = transferParser.parse(validTransfers);

    // Write CSV to files
    fs.writeFileSync("./transfers.csv", transferCsv);

    res.status(200).send({ message: "CSV files created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/import_paychecks").put(async (req, res) => {
  try {
    // Read the CSV file
    const fileContent = fs.readFileSync("./cody_transfers.csv", "utf8");

    // Parse the CSV content with Papa Parse
    const parsedData = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: result => {
        // Process each record and insert into the database
        result.data.forEach(async record => {
          const newPaycheck = new Paycheck({
            // Map your CSV columns to your schema fields
            affiliate: record.affiliate_id ? record.affiliate_id : null,
            description: record.description,
            user: record.user_id,
            amount: Number(record.amount),
            stripe_connect_id: record.stripe_connect_id,
            paid: record.paid === "TRUE",
            paid_at: record.paid_at ? new Date(record.paid_at) : null,
          });
          console.log({ newPaycheck });
          await newPaycheck.save();
        });
      },
    });

    res.status(200).send({ message: "Paychecks Imported successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/import_all_paychecks").put(async (req, res) => {
  try {
    const fileContent = fs.readFileSync("./affiliate_transfers.csv", "utf8");

    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: async result => {
        for (const record of result.data) {
          const affiliateId = record.affiliate_id ? new mongoose.Types.ObjectId(record.affiliate_id) : null;
          if (affiliateId) {
            // Check if a paycheck with the same amount and affiliate already exists
            const existingPaychecks = await Paycheck.find({
              affiliate: affiliateId,
              // amount: parseFloat(record.amount),
            });

            const existingPaycheck = existingPaychecks.filter(paycheck => {
              // console.log({ paycheck: parseFloat(paycheck.amount.toFixed(2)), record: parseFloat(record.amount) });
              return parseFloat(paycheck.amount.toFixed(2)) === parseFloat(record.amount);
            });

            // console.log({ existingPaycheck });

            if (existingPaycheck.length === 0) {
              const newPaycheck = new Paycheck({
                affiliate: affiliateId,
                description: record.description,
                user: record.user_id,
                amount: parseFloat(record.amount),
                stripe_connect_id: record.stripe_connect_id,
                paid: record.paid === "TRUE",
                paid_at: record.paid_at ? new Date(record.paid_at) : null,
              });

              console.log({ amount: parseFloat(record.amount), description: record.description });
              await newPaycheck.save();
            }
          }
        }

        res.status(200).send({ message: "Paychecks Imported successfully" });
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Create a route that updates all paychecks description
router.route("/update_paychecks_description").put(async (req, res) => {
  try {
    const paychecks = await Paycheck.find({ deleted: false }).populate("affiliate");

    for (const paycheck of paychecks) {
      if (paycheck.affiliate && !paycheck.description) {
        if (paycheck.affiliate.user) {
          // Find user by affiliate id
          const user = await User.findOne({ _id: paycheck.affiliate.user });

          const description = `Monthly Payout for ${user.first_name} ${user.last_name}`;
          console.log({ description, user: user._id });
          await Paycheck.updateOne({ _id: paycheck._id }, { $set: { description, user: user._id } });
        }
      } else if (paycheck.team && !paycheck.description) {
        const team = await Team.findOne({ _id: paycheck.team });
        const description = `Monthly Payout for ${team.team_name}`;
        console.log({ description, user: team.captain });
        await Paycheck.updateOne({ _id: paycheck._id }, { $set: { description, user: team.captain } });
      }
    }

    res.status(200).send({ message: "Paychecks updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/merge_expenses_categories").put(async (req, res) => {
  try {
    const cards = ["Stripe Fee"];
    await Expense.updateMany({ category: { $in: cards } }, { $set: { card: "Stripe" } });

    res.status(200).send({ message: "Expenses updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Mapping of your categories to IRS categories
const categoryMapping = {
  "3D Printer Accessories": "Tools and Equipment",
  "3D Printing Supplies": "Tools and Equipment",
  "Advertising": "Advertising and Promotion",
  "Air Travel": "Travel",
  "Cleaning Supplies": "Supplies",
  "Coffee Shops": "Meals",
  "Cutter Accessories": "Tools and Equipment",
  "Cutter Supplies": "Tools and Equipment",
  "Electronic Accessories": "Supplies",
  "Electronic Supplies": "Supplies",
  "Electronics Supplies": "Supplies",
  "Event Tickets": "Advertising and Promotion",
  "Fees": "Bank Fees",
  "Filament": "Supplies",
  "Food": "Meals",
  "Food & Dining": "Meals",
  "Food Delivery": "Meals",
  "Foreign Transaction Fee": "Bank Fees",
  "Gas": "Car and Truck Expenses",
  "Hotel": "Travel",
  "Internet": "Utilities",
  "Legal": "Legal and Professional Services",
  "Marketing": "Advertising and Promotion",
  "Merch": "Advertising and Promotion",
  "Office": "Office Expense",
  "Outsourcing": "Contract Labor",
  "Parking": "Travel",
  "Product": "Inventory Purchase",
  "Rave Mob": "Advertising and Promotion",
  "Restaurants": "Meals",
  "Ride Share": "Travel",
  "Shipping": "Shipping and Postage",
  "Shopping": "Supplies",
  "Storage": "Rent or Lease",
  "Stripe Account Funding": "Other Expenses",
  "Stripe Fee": "Bank Fees",
  "Supplies": "Supplies",
  "Tools": "Tools and Equipment",
  "Travel": "Travel",
  "Website": "Advertising and Promotion",
  "Wellbeing": "Employee Benefit Programs",
};

router.route("/irs_expenses_categories").put(async (req, res) => {
  try {
    // Loop through each category and update the expenses in bulk
    for (const [category, irsCategory] of Object.entries(categoryMapping)) {
      await Expense.updateMany({ category: category }, { $set: { irs_category: irsCategory } });
    }

    res.status(200).send({ message: "IRS Categories updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
