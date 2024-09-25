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
import { promises as fs } from "fs";
import path from "path";

import axios from "axios";
import appRoot from "app-root-path";
import { downloadFile, sanitizeExpenseName } from "./expenses/expense_helpers";
import config from "../config";
import Stripe from "stripe";
import { Team } from "./teams";
import { Event } from "./events";
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

          totalRevenue += item.quantity * discountedPackCost;
          numberOfPairsSold += item.quantity * 6;
          numberOfOrders += 1;
        } else if (item.name === "Supreme Gloves V1" && item.size === "XXL") {
          totalRevenue += item.quantity * item.price;
          numberOfPairsSold += item.quantity;
          numberOfOrders += 1;
        } else if (item.name === "XXL Supreme Gloves V1" && item.size === "XXL") {
          totalRevenue += item.quantity * item.price;
          numberOfPairsSold += item.quantity;
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

router.route("/migrate_status").put(async (req, res) => {
  try {
    const orders = await Order.find({ deleted: false });

    for (const order of orders) {
      if (order.isDelivered) {
        order.status = "delivered";
      } else if (order.isOutForDelivery) {
        order.status = "out_for_delivery";
      } else if (order.isInTransit) {
        order.status = "in_transit";
      } else if (order.isShipped) {
        order.status = "shipped";
      } else if (order.isPackaged) {
        order.status = "packaged";
      } else if (order.isCrafted) {
        order.status = "crafted";
      } else if (order.isCrafting) {
        order.status = "crafting";
      } else if (order.shipping.shipping_label) {
        order.status = "label_created";
      } else if (order.isPaid) {
        order.status = "paid";
      }

      await order.save();
    }

    res.status(200).send({ message: "Status migrated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/update_faq_page").put(async (req, res) => {
  try {
    // // Find the most recent content record
    // const latestContent = await Content.findOne().sort({ createdAt: -1 });
    // console.log({ latestContent });

    // if (latestContent) {
    //   // Update the FAQ page section
    const data = {
      title: "Frequently Asked Questions",
      sections: [
        {
          title: "Glowskinz",
          subtitle: "",
          description: "",
          video: "s49fiZPC5G0",
          subsections: [
            {
              title: "Inserting chips into Glowskinz",
              description: `To use the Glowskinz with your desired microlight, first you need to remove your chip from its current plastic casing if it is in one. Then squeeze the Glowskinz near the end of the side slits causing the opening in the bottom to expand. Next, gently grip your microlight from the sides and gently place it into the opening at the bottom of the Glowskinz. Gently push the microlight all the way in and let your squeezing hand release pressure let the bottom of the Glowskinz close up.`,
            },
            {
              title: "Removing chips from Glowskinz",
              description: `For Nanoskinz and Coinskinz squeeze the Glowskinz in the same location as you did to put it in. Then pinch and pull the microlight with your other hand to remove it. For Coffinskinz spread the bottom of the Glowskinz, then gently pinch and pull the microlight out.`,
            },
            {
              title: "Chip Compatibility",
              description: "Select your chip from the dropdown below to see what products are compatible!",
            },
            {
              title: "Chip Categories",
              description: `Coin: Aethers, Chroma 24, Chroma Ctrls, Ezlite, Element V25, Kebit, Keluce, Mini Kevo, OG Chromas, OG Spectra, OSM2, Oracles, Supernova, Trinity,\nDuo: Duos\nSynergys: Synergy's, Aurora Nano V2s\nApollo: Apollos\nNano: Atoms, Aurora Nanos, Ions, QT 6 Mode, Ubers\nEVO: Chroma Evos, Spectra Evos\nInova: Azotecs, Emissives\nCoffin: EVO X, KEK 5, KAT 5, IMAX\nVortex: Vortex`,
            },
          ],
        },
        {
          title: "Diffuser Caps",
          subtitle: "",
          description: "",
          video: "FJbKd0ClkFM",
          subsections: [
            {
              title: "Using Diffuser Caps and Adapters",
              description: `To begin using Diffuser Caps first take your microlights out of your gloves, then place the Diffuser Adapters gently onto your microlight bulbs. Now take your your chips, with the Diffuser Adapters attached, and place them inside of your glove, pushing it as far you can so the glove is tight over the diffuser adapter. Now it should look like you have flat top domes inside your gloves. Grip the Diffuser Adapter from outside the glove. Do not hold by microlight or you risk causing extra stress to the bulb. Take your cap, and place it over top of your glove and Diffuser Adapter and screw in the cap like you would a jar. You should only need a single turn to become snug. Do not over tighten or push the cap on. Let the threads do the work.`,
            },
            {
              title: "WARNING",
              description: `WARNING: NEVER force a bulb into the Diffuser Adapter as this could damage your microlight. If your chip is not fitting into the Diffuser Adapter please contact us. Be extra cautious of your bulbs during insertion and removal and this part of the microlight tends to be very delicate.`,
            },
            {
              title: "Orienting Your Diffuser Caps",
              video: "vG4qgtrotkw",
              description: `To easily display all of your Diffuser Caps in the same orientation follow the steps above for using Diffuser Caps and Adapters with the following 2 specifications: Put the Diffuser Adapters onto your microlight bulbs with the notch facing the bottom of the microlight. Place the cap on upside down and give one half turn to screw in. To put Diffuser Caps in a different orientation, follow the same steps but change the placement of the notch.`,
            },
            {
              title: "Diffuser too tight or too loose?",
              description: `Due to the handmade nature of our products, some variations may occur between individual diffusers. We test each diffuser on a 5mm RGB 4 prong LED before packaging as 5mm is considered Standard bulb size and 2 prong bulbs are more varied in size. Be aware that bulb sizes may vary by an imperceivable amount within sets of microlights due to the manufacturing process. Different brands may also have slightly different sized bulbs, although the vast majority are 5mm. If one or more of your diffusers or fit too tight or too loose, please try the diffuser on several different microlights in the set to determine if it is a variant with the diffuser, or the bulb itself. If the problem persists please reach out to us and we can discuss replacement options.`,
            },
            {
              title: "WARNING",
              description: `NEVER force a chip into Glowskinz as this could damage your microlight. If your chip is not fitting into the Glowskinz please contact us. Be extra cautious of your bulbs during insertion and removal and this part of the microlight tends to be very delicate.`,
            },
          ],
          button_text: "Contact",
          button_link: "/contact",
        },
        {
          title: "Ordering Custom Products",
          subtitle: "",
          description: `At Glow LEDs you have the ability to customize any product we already sell, or create something completely unique! We welcome any requests here. Our custom process is 5 steps: Deposit, Consultation, Drafting, Payment and Processing.`,
          subsections: [
            {
              title: "Deposit",
              description: `A single 100% refundable deposit of $9.99 is required to hold your place in line and to be seen for a consultation. The deposit will be deducted from the total price.`,
            },
            {
              title: "Consultation",
              description: `After the deposit is paid we will reach out to you via email within a few days to discuss your ideas. Note: This step is imperative. Please check your email frequently and remember to check your junk folder as well. We cannot move forward without the consultation.`,
            },
            {
              title: "Drafting",
              description: `After we get a good visualization of your idea, a design will be drafted by us, price will be determined and we will show you our results. If we determine we are unable to produce what you are desiring, or you are unsatisfied with the results, we will refund your $9.99 deposit.`,
            },
            {
              title: "Payment",
              description: `If you wish to proceed, the final payment will be required and we will begin production. The total price for a single design starts at $50 and varies based on the intricacy of the design and materials used. If multiple designs are desired, you will have to pay a similar price per design.`,
            },
            {
              title: "Processing",
              description: `We will then process and ship your design! Processing and shipping times are longer than normal products. We will give you an estimated timeline of processing time at this step and then ship out your order when it's complete!`,
            },
            {
              title: "Terms",
              description: `We respect others art. Any designs that are trademarked or Copyrighted will not be redistributed without permission. Sometimes your custom requests are already on our to-do list. If your request is for a common shape or pattern, you may see your design idea come up for sale on the website later on. If you have an idea but don't want to pay custom pricing feel free to send it as a suggestion and we may have it on the website in the near future!`,
            },
          ],
          button_text: "Contact",
          button_link: "/contact/custom_orders",
        },
        {
          title: "Processing/Shipping",
          subtitle: "",
          description: "",
          subsections: [
            {
              title: "Processing",
              description: `Order processing is the time it takes from when you place your order on our site to when it gets packed up and shipped out. We always recommend purchasing your product at least 2 WEEKS before your event to ensure your products will arrive on time. If you have passed this window, there is no guarantee you will have your products in time for your event. All of our products are handmade to order and are processed in the order in which they are received. We will get your order in the mail within approximately 3-10 business days after the order is placed, depending on how many orders are in front of you. If a custom order is placed, processing times will be discussed during the custom process.`,
            },
            {
              title: "Shipping",
              description: `Please note shipping times do not include order processing times. Small packages will be sent via USPS First Class and large packages will be sent via USPS Priority Mail unless otherwise specified. Shipping time is 1-3 business days, but may be delayed due to pandemic. Glow LEDs is not responsible for delays due to the post office.`,
            },
            {
              title: "Tracking",
              description: `All shipments come with tracking numbers that will be sent to your email when the package is ready for shipment. If the address on your order is incorrect, please contact us immediately at ${config.REACT_APP_CONTACT_EMAIL}. If your shipping information was incorrectly input and your package is returned to us, you will be responsible for paying the secondary shipping fees.`,
            },
            {
              title: "International Shipping",
              description: `We ship internationally! To anywhere US packages are allowed! If you live outside of the United States please check the international checkbox when filling out shipping information. Shipping times will vary and depend on the destination country. All shipments come with tracking numbers. Please contact us if you have questions.`,
            },
            {
              title: "Rush Delivery",
              description: `We currently do not offer rush delivery options. We always recommend purchasing your product at least 2 WEEKS before your event to ensure your products will arrive on time. If you have passed this window, there is no guarantee you will have your products in time for your event.`,
            },
          ],
          button_text: "Contact",
          button_link: "/contact",
        },
        {
          title: "Order Issues",
          subtitle: "",
          description: "",
          subsections: [
            {
              title: "Delayed Orders",
              description: `We know you're excited to get your package, but unfortunately delays in transit times may occur with the carrier. In the current pandemic delays are quite common. Please keep this in mind when ordering and avoid ordering last minute if possible. Shipping delays are something we have no control over, please reach out to USPS with any questions.`,
            },
            {
              title: "Missing Orders",
              description: `If your package has been marked delivered yet you can't locate it, the USPS requires we allow 7 days from the delivered date to open an investigation. Please see the artice below for more information.`,
              button_text: "Find Missing Mail",
              button_link: "https://www.usps.com/help/missing-mail.htm",
            },
            {
              title: "Damaged Items",
              description: `We take full responsibility for damaged products due to manufacturing defects. Please send us a photo at ${config.REACT_APP_CONTACT_EMAIL}., and we'll be happy to figure out a solution.`,
            },
            {
              title: "Cancellations and Modifications",
              description: `Once your order is placed, we have a very limited window to make any changes or cancellations. If you require an order change or cancellation, please let us know as soon as possible by sending us an email to ${config.REACT_APP_CONTACT_EMAIL}. We can't guarantee that we'll be able to catch your order before it gets produced, but we'll try our absolute best!`,
            },
            {
              title: "Returns",
              description: `We offer a 100% satisfaction guarantee. Returns are accepted within 30 days of delivery. To initiate a return please contact ${config.REACT_APP_CONTACT_EMAIL} and you will be supplied with a prepaid shipping label to send back your product. Please include your full name and order number in the return shipment and you will be refunded the full amount minus original shipping costs. Certian items are non-refundable. Refunds are returned to the original form of payment.`,
              button_text: "Contact",
              button_link: "/pages/contact/returns",
            },
          ],
        },
      ],
    };

    // }

    const latestContent = await Content.findOneAndUpdate(
      { _id: "669ad511e719de2de3c344b4" },
      { faq_page: data }
      // { sort: { createdAt: -1 }, new: true }
    );

    console.log({ latestContent });

    res.status(200).send({ message: "Status migrated successfully", data: latestContent });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// router.route("/migrate_product_options").put(async (req, res) => {
//   try {
//     const mainProducts = await Product.find({ macro_product: true, deleted: false });
//     console.log("Total main products:", mainProducts.length);

//     for (let i = 0; i < mainProducts.length; i++) {
//       const mainProduct = mainProducts[i];
//       console.log(`Processing main product ${i + 1} of ${mainProducts.length}`);

//       const options = []; // Placeholder for new options structure

//       // Function to process each type of product option
//       const processOptionType = async (optionProducts, optionName, valueKey) => {
//         if (optionProducts && optionProducts.length > 0) {
//           const variations = await Product.find({ "_id": { $in: optionProducts } });
//           const option = {
//             name: optionName,
//             optionType:
//               valueKey === "color" ? "colors" : valueKey === "size" || optionName === "Size" ? "buttons" : "dropdown",
//             replacePrice: valueKey === "size" || optionName === "Size" || !optionName === "Cape Color" ? true : false,
//             isAddOn: optionName === "Cape Color" ? true : false,
//             values: variations.map(variation => {
//               return {
//                 name: variation[valueKey],
//                 colorCode: variation.color_code,
//                 // images: variation.images_object,
//                 product: variation._id,
//                 isDefault: !!variation.default_option,
//                 additionalCost: optionName === "Cape Color" ? 4 : 0,
//               };
//             }),
//           };
//           options.push(option);

//           // Update each variation to set the parent and isVariation flag
//           for (let variation of variations) {
//             await Product.findByIdAndUpdate(variation._id, {
//               parent: mainProduct._id,
//               isVariation: true,
//             });
//           }
//         }
//       };

//       // Migrate Color Options
//       console.log("Processing Color Options");
//       await processOptionType(mainProduct.color_products, mainProduct.color_group_name || "Color", "color");

//       // Migrate Secondary Color Options
//       console.log("Processing Secondary Color Options");
//       await processOptionType(
//         mainProduct.secondary_color_products,
//         mainProduct.secondary_color_group_name || "Secondary Color",
//         "color"
//       );

//       // Migrate Option Products (assuming these are sizes for simplification)
//       console.log("Processing Option Products");
//       await processOptionType(mainProduct.option_products, mainProduct.option_group_name || "Size", "size");

//       // Migrate Secondary Products (assuming these are included products)
//       console.log("Processing Secondary Products");
//       await processOptionType(
//         mainProduct.secondary_products,
//         mainProduct.secondary_group_name || "Included Product",
//         "name"
//       );

//       // Update the main product with the new options structure
//       console.log("Updating main product");
//       await Product.findByIdAndUpdate(mainProduct._id, {
//         options: options,
//         // Consider uncommenting the $unset operation if you wish to clean up old fields
//         // $unset: { color_products: "", secondary_color_products: "", option_products: "", secondary_products: "" },
//       });
//     }

//     // res.status(200).send(mainProducts);
//     res.status(200).send({ message: "Product Option Migration successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// });
router.route("/migrate_quantity").put(async (req, res) => {
  try {
    // Update orderSchema
    await Order.updateMany({ "orderItems.qty": { $exists: true } }, [
      {
        $set: {
          orderItems: {
            $map: {
              input: "$orderItems",
              as: "item",
              in: {
                $mergeObjects: [
                  "$$item",
                  {
                    max_display_quantity: "$$item.quantity",
                    quantity: "$$item.qty",
                  },
                ],
              },
            },
          },
        },
      },
      // {
      //   $unset: "orderItems.qty",
      // },
    ]);

    // Update cartSchema
    await Cart.updateMany({ "cartItems.qty": { $exists: true } }, [
      {
        $set: {
          cartItems: {
            $map: {
              input: "$cartItems",
              as: "item",
              in: {
                $mergeObjects: [
                  "$$item",
                  {
                    max_display_quantity: "$$item.quantity",
                    quantity: "$$item.qty",
                  },
                ],
              },
            },
          },
        },
      },
      // {
      //   $unset: "cartItems.qty",
      // },
    ]);

    // await Product.updateMany(
    //   {},
    //   {
    //     $rename: {
    //       quantity: "max_display_quantity",
    //     },
    //   }
    // );

    res.status(200).send({ message: "Field names migrated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

const colorNameToHex = {
  "black": "#000000",
  "white": "#FFFFFF",
  "frosted": "#abaeb5",
  "clear": "#4b4b4b",
  "red": "#FF0000",
  "green": "#008000",
  "blue": "#0000FF",
  "yellow": "#FFFF00",
  "purple": "#800080",
  "orange": "#FFA500",
  "pink": "#FFC0CB",
  "brown": "#A52A2A",
  "gray": "#808080",
  "cyan": "#00FFFF",
  "magenta": "#FF00FF",
  "silver": "#C0C0C0",
  "gold": "#FFD700",
  "navy": "#000080",
  "aqua": "#00FFFF",
  "teal": "#008080",
  "olive": "#808000",
  "maroon": "#800000",
};

const convertToHex = color => {
  if (!color) return null;
  if (color.startsWith("#")) return color;
  const lowerColor = color.toLowerCase();
  return colorNameToHex[lowerColor] || color;
};

router.route("/migrate_order_options").put(async (req, res) => {
  try {
    const orders = await Order.find({});
    console.log("Total orders:", orders.length);

    let migratedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      console.log(`Processing order ${i + 1} of ${orders.length}`);

      let orderUpdated = false;

      for (let j = 0; j < order.orderItems.length; j++) {
        const orderItem = order.orderItems[j];
        console.log(`Processing order item ${j + 1} of ${order.orderItems.length}`);

        // Check if the order item has already been migrated
        if (
          orderItem.currentOptions &&
          orderItem.currentOptions.length > 0 &&
          orderItem.selectedOptions &&
          orderItem.selectedOptions.length > 0
        ) {
          console.log(`Order item ${orderItem._id} already migrated, skipping...`);
          continue;
        }

        const currentOptions = [];
        const selectedOptions = [];

        // Migrate Color Option
        if (orderItem.color) {
          const colorOption = {
            name: orderItem.color_group_name || "Color",
            optionType: "dropdown",
            replacePrice: false,
            isAddOn: false,
            values: [
              {
                name: orderItem.color,
                product: orderItem.color_product,
                colorCode: convertToHex(orderItem.color_code || orderItem.color),
                isDefault: false,
                additionalCost: 0,
              },
            ],
          };
          currentOptions.push(colorOption);
          selectedOptions.push(colorOption.values[0]);
        }

        // Migrate Secondary Color Option
        if (orderItem.secondary_color) {
          const secondaryColorOption = {
            name: orderItem.secondary_color_group_name || "Secondary Color",
            optionType: "dropdown",
            replacePrice: false,
            isAddOn: orderItem.show_add_on || false,
            values: [
              {
                name: orderItem.secondary_color,
                product: orderItem.secondary_color_product,
                colorCode: convertToHex(orderItem.secondary_color),
                isDefault: false,
                additionalCost: orderItem.add_on_price || 0,
              },
            ],
          };
          currentOptions.push(secondaryColorOption);
          selectedOptions.push(secondaryColorOption.values[0]);
        }

        // Migrate Size Option
        if (orderItem.size) {
          const sizeOption = {
            name: orderItem.option_group_name || "Size",
            optionType: "buttons",
            replacePrice: true,
            isAddOn: false,
            values: [
              {
                name: orderItem.size,
                product: orderItem.option_product,
                isDefault: false,
                additionalCost: 0,
              },
            ],
          };
          currentOptions.push(sizeOption);
          selectedOptions.push(sizeOption.values[0]);
        }

        // Migrate Secondary Product Option
        if (orderItem.secondary_product_name) {
          const secondaryProductOption = {
            name: orderItem.secondary_group_name || "Included Product",
            optionType: "dropdown",
            replacePrice: false,
            isAddOn: false,
            values: [
              {
                name: orderItem.secondary_product_name,
                product: orderItem.secondary_product,
                isDefault: false,
                additionalCost: 0,
              },
            ],
          };
          currentOptions.push(secondaryProductOption);
          selectedOptions.push(secondaryProductOption.values[0]);
        }

        // Update the order item in the database
        if (currentOptions.length > 0 || selectedOptions.length > 0) {
          await Order.updateOne(
            { _id: order._id, "orderItems._id": orderItem._id },
            {
              $set: {
                "orderItems.$.currentOptions": currentOptions,
                "orderItems.$.selectedOptions": selectedOptions,
              },
            }
          );
          orderUpdated = true;
        }
      }

      if (orderUpdated) {
        migratedCount++;
      } else {
        skippedCount++;
      }
    }

    res.status(200).send({
      message: "Order Option Migration completed",
      migratedOrders: migratedCount,
      skippedOrders: skippedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_color_codes").put(async (req, res) => {
  try {
    const products = await Product.find({});
    const failedProducts = [];

    for (let product of products) {
      try {
        let updated = false;

        if (product.color && typeof product.color === "object" && product.color.code) {
          product.color.code = convertToHex(product.color.code);
          updated = true;
        }

        if (Array.isArray(product.options)) {
          product.options.forEach(option => {
            if (Array.isArray(option.values)) {
              option.values.forEach(value => {
                if (value.colorCode) {
                  value.colorCode = convertToHex(value.colorCode);
                  updated = true;
                }
              });
            }
          });
        }

        if (updated) {
          await Product.updateOne(
            { _id: product._id },
            {
              $set: {
                color: product.color,
                options: product.options,
              },
            }
          );
        }
      } catch (productError) {
        console.error(`Error updating product ${product._id}:`, productError);
        failedProducts.push(product._id);
      }
    }

    res.status(200).send({
      message: "Color code migration completed",
      failedProducts: failedProducts,
    });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate hero_video
router.route("/migrate_hero_video").put(async (req, res) => {
  try {
    await Product.updateMany({ video: { $exists: true } }, [
      {
        $set: {
          "hero_video.video": { $ifNull: ["$video", null] },
        },
      },
    ]);
    res.status(200).send({ message: "Hero video migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/set_all_hidden_fields").put(async (req, res) => {
  try {
    const updateObject = {
      "icon_specs_hidden": true,
      "navigation_buttons_hidden": true,
      "features.image_grid_1_hidden": true,
      "features.hero_fact_1.hidden": true,
      "features.image_grid_2_hidden": true,
      "features.hero_fact_2.hidden": true,
      "features.lifestyle_images_hidden": true,
      "not_sure.hidden": true,
      "tech_specs.hidden": true,
      "in_the_box.hidden": true,
      "elevate_your_experience.hidden": true,
      "product_support.hidden": true,
    };

    const result = await Product.updateMany({}, { $set: updateObject });

    res.status(200).send({
      message: "All 'hidden' fields set to true",
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/products_to_json").put(async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({ option: false });

    // Filter the products and create a map to deduplicate by description
    const uniqueProductsMap = new Map();

    products.forEach(product => {
      if (product.description && !uniqueProductsMap.has(product.description)) {
        uniqueProductsMap.set(product.description, {
          category: product.category,
          subcategory: product.subcategory,
          product_collection: product.product_collection,
          fact: product.fact,
          facts: product.facts,
          short_description: product.short_description,
          description: product.description,
        });
      }
    });

    // Convert the map values to an array
    const filteredProducts = Array.from(uniqueProductsMap.values());

    // Convert filtered products to JSON string
    const jsonProducts = JSON.stringify(filteredProducts, null, 2);

    // Define the file path
    const filePath = path.join(__dirname, "unique_products.json");

    // Write the JSON to a file using callback
    fs.writeFile(filePath, jsonProducts, err => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: err.message });
      }
      res.status(200).send({
        message: "Unique products exported to JSON successfully",
        filePath,
        totalProducts: products.length,
        uniqueProducts: filteredProducts.length,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

const productFactsAndDescriptions = [
  {
    category: "glowskinz",
    subcategory: "clozd",
    product_collection: "classics",
    fact: "Innovative 2-in-1 casing and diffuser with full-body glow.",
    short_description:
      "Comfortable semi-flexible design combines casing and diffuser, creating a unique full-body glow. Perfect click and easy removal from gloves for seamless performances.",
  },
  {
    category: "glowskinz",
    subcategory: "opyn",
    fact: "Versatile glow accessory compatible with various diffusers.",
    short_description:
      "Semi-flexible, comfortable design allows for use with favorite accessories like Diffusers, EXO Diffusers or Diffuser Caps. Provides beautiful fingertip glow while protecting microlights.",
  },
  {
    category: "exo_diffusers",
    fact: "Two-material technology for factal light diffusion.",
    short_description:
      "Innovative design with frosted inner plug and geometric outer exoskeleton. Creates beautiful glow and defined trails for stunning lightshows through gloves.",
  },
  {
    category: "diffusers",
    fact: "Enhanced light diffusion for smooth, angelic glow.",
    short_description:
      "Versatile diffusers in various colors and sizes. Create unique effects without altering light color. Compatible with all microlights.",
  },
  {
    category: "diffuser_caps",
    fact: "Unique screw-top technology for external light patterns.",
    short_description:
      "External patterns for one-of-a-kind lightshow effects. Easy to use with Diffuser Adapters. Available in Classic and Mega sizes.",
  },
  {
    category: "gloves",
    subcategory: "sampler",
    fact: "Sizing sampler pack for perfect fit selection.",
    short_description:
      "Three pairs of Supreme Gloves in different sizes. Stretchy design with plushy interior. Find your ideal fit for comfortable performances.",
  },
  {
    category: "glowstringz",
    subcategory: "leds",
    product_collection: "glowstringz",
    fact: "Customizable string lights with 48 festival-ready patterns.",
    short_description:
      "Highly customizable LED string lights with 22 wild festival modes and 26 everyday modes. Infinite color options and autoplay features for the ultimate home light show.",
  },
  {
    category: "batteries",
    subcategory: "coin",
    product_collection: "wholesale",
    fact: "Bulk battery packs for uninterrupted performances.",
    short_description:
      "Convenient bulk battery options in secure plastic trays. Easy access design keeps batteries fresh and ready for use, perfect for extended gloving sessions.",
  },
  {
    category: "merch",
    subcategory: "stickers",
    fact: "Unique wood stickers to represent Glow LEDs.",
    short_description:
      "Laser-cut wood stickers featuring Glow LEDs designs. Show your support for the gloving community with these cool, durable decals.",
  },
  {
    category: "batteries",
    subcategory: "storage",
    fact: "Convenient battery dispensers for quick access.",
    short_description:
      "Compact battery dispensers designed for easy access during performances. Secure locking mechanism prevents accidental spills, perfect for on-the-go glovers.",
  },
  {
    category: "decals",
    subcategory: "universal",
    fact: "Customizable vinyl decals for Glowskinz.",
    short_description:
      "High-quality black vinyl decals to personalize your OPYN or CLOZD Glowskinz. Easy to apply and provides a unique look for your gloving setup.",
  },
  {
    category: "decals",
    subcategory: "outline",
    fact: "Full-face Batman style decals for dramatic light sculpting.",
    short_description:
      "Precision-cut Batman decals cover the entire front of Glowskinz, blocking top light and creating a unique side and bottom glow effect for striking lightshows.",
  },
  // {
  //   category: "glowskinz",
  //   subcategory: "clozd",
  //   product_collection: "classics",
  //   fact: "Universal Glowskins compatible with various chips.",
  //   short_description:
  //     "Versatile Omniskins work with any chip using interchangeable sleds. Combines casing and diffuser for a full-body glow, with comfortable semi-flexible design.",
  // },
  // {
  //   name: "CLOZD Omniskinz",
  //   category: "glowskinz",
  //   subcategory: "clozd",
  //   fact: "Universal Glowskinz, compatible with a multitude of microlights",
  //   short_description:
  //     "Versatile Omniskins work with any chip using interchangeable sleds. Combines casing and diffuser for a full-body glow, with comfortable semi-flexible design.",
  // },
  // {
  //   name: "Omniskinz Sleds",
  //   category: "glowskinz",
  //   subcategory: "accessories",
  //   fact: "Interchangeable sleds for ultimate Omniskinz versatility.",
  //   short_description: "Custom-designed sleds enable CLOZD Omniskinz to accommodate various microlight chips. Easily switch between different light sources while maintaining the unique full-body glow and comfort of Omniskinz."
  // },
  {
    category: "glowframez",
    subcategory: "clip",
    product_collection: "nova",
    fact: "Secure clips for palm or hand-mounted gloving.",
    short_description:
      "Nova Clips securely attach to compatible casings for stable palm or hand mounting. Enables mind-blowing effects for your audience during performances.",
  },
  {
    category: "glowframez",
    subcategory: "clozd",
    product_collection: "novaframez",
    fact: "A new take on a impacting classic.",
    short_description:
      "Rigid shell with soft semi-flexible button. Compatible with OG Inova casings and button mods for versatile impacting performances.",
  },
  // {
  //   name: "Supreme Gloves V1",
  //   category: "gloves",
  //   subcategory: "singles",
  //   fact: "Premium stretchy gloves for all hand sizes.",
  //   short_description:
  //     "Supreme Gloves feature super plushy interior and extra white, crisp exterior. Stretchy design fits all hand sizes comfortably, perfect for showcasing your lights.",
  // },
  {
    name: "Ultra Gloves",
    category: "gloves",
    subcategory: "singles",
    fact: "Slim-tech gloves for high-fidelity gloving performance.",
    short_description:
      "Precision-engineered slim gloves with tight-thread design. Enhances visibility of accessories, maintains shape, and allows for more complex moves.",
  },
  {
    category: "gloves",
    subcategory: "refresh",
    fact: "Essential gloving refresh pack with gloves and batteries.",
    short_description:
      "Convenient pack includes 6 pairs of Supreme Gloves and 120 coin batteries. Ensures you're always prepared with fresh gloves and powered microlights for performances.",
  },
  // {
  //   category: "custom",
  //   fact: "Personalized gloving accessories made to order.",
  //   short_description:
  //     "Create one-of-a-kind gloving accessories through our custom design process. From concept to production, we work with you to bring your unique ideas to life.",
  // },
  {
    category: "glowskinz",
    subcategory: "clozd",
    product_collection: "capez",
    fact: "Precision-enhancing caps for CLOZD Glowskinz.",
    short_description:
      "Capez securely hold bulbs in place within CLOZD Glowskinz. Available in 9 colors, they prevent shifting during performances for extreme precision in lightshows.",
  },
  // {
  //   category: "gloves",
  //   subcategory: "singles",
  //   product_collection: "wholesale",
  //   fact: "Upgraded stretchy gloves for enhanced comfort.",
  //   short_description:
  //     "New Supreme Gloves V2: Red Tag Edition features stretchier, softer material for improved fit. Plushy interior ensures comfort during long gloving sessions.",
  // },
  {
    category: "microlight",
    subcategory: "glove_set",
    product_collection: "classics",
    fact: "Advanced microlight with 260 color options.",
    short_description:
      "Helios Microlight offers unmatched features including 260 color options, 12 flashing patterns, and Conjure Mode. Powered by 2x CR1620 batteries for reliable performance.",
  },
];

// Migrate images field
router.route("/migrate_images").put(async (req, res) => {
  try {
    await Product.updateMany({}, { $unset: { images: "" } });
    await Product.updateMany({}, [
      {
        $set: {
          images: { $ifNull: ["$images_object", []] },
        },
      },
    ]);
    res.status(200).send({ message: "Images migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/update_fact").put(async (req, res) => {
  try {
    for (const item of productFactsAndDescriptions) {
      const filter = { category: item.category };
      if (item.subcategory) filter.subcategory = item.subcategory;
      if (item.product_collection) filter.product_collection = item.product_collection;

      await Product.updateMany(filter, {
        $set: {
          fact: item.fact,
          short_description: item.short_description,
        },
      });
    }

    res.status(200).send({
      message: "All facts and short descriptions updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_value_names").put(async (req, res) => {
  try {
    const result = await Product.updateMany({ "options.values.name": { $regex: /-/ } }, [
      {
        $set: {
          options: {
            $map: {
              input: "$options",
              as: "option",
              in: {
                $mergeObjects: [
                  "$$option",
                  {
                    values: {
                      $map: {
                        input: "$$option.values",
                        as: "value",
                        in: {
                          $mergeObjects: [
                            "$$value",
                            {
                              name: {
                                $cond: {
                                  if: { $regexMatch: { input: "$$value.name", regex: /-/ } },
                                  then: {
                                    $trim: {
                                      input: { $arrayElemAt: [{ $split: ["$$value.name", "-"] }, 1] },
                                    },
                                  },
                                  else: "$$value.name",
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      message: "Product option names updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate tags
router.route("/migrate_tags").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          $or: [
            { categorys: { $exists: true } },
            { subcategorys: { $exists: true } },
            { collections: { $exists: true } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          combinedTags: {
            $concatArrays: [
              { $ifNull: ["$categorys", []] },
              { $ifNull: ["$subcategorys", []] },
              { $ifNull: ["$collections", []] },
            ],
          },
        },
      },
    ]);

    for (const product of productsToUpdate) {
      await Product.updateOne({ _id: product._id }, { $set: { tags: product.combinedTags } });
    }

    res.status(200).send({ message: "Tags migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate meta fields
router.route("/migrate_meta").put(async (req, res) => {
  try {
    const categoryKeywords = {
      mega_diffuser_caps: "oversized, diffuser, caps, gloving, lightshow, accessory, geometric, patterns, trails",
      glow_strings: "LED, string lights, customizable, modes, festival, decoration, ambient lighting",
      diffuser_caps: "gloving, accessory, lightshow, patterns, designs, screw-top, technology",
      diffusers: "light diffusion, gloving, accessory, frosted, geometric, lightshow enhancement",
      accessories: "gloving, battery storage, convenience, performance, lightshow",
      infinity_mirrors: "LED, addressable, custom design, light art, room decoration",
      decals: "customization, personalization, vinyl, glowskinz, accessory, gloving",
      glowskinz: "casing, diffuser, gloving, accessory, full-body glow, comfortable",
      glowskins: "casing, diffuser, gloving, accessory, full-body glow, comfortable",
      Caps: "custom, diffuser caps, gloving, accessory, personalized",
      gloves: "gloving, performance, comfortable, stretchy, crisp white",
      exo_diffusers: "gloving, accessory, geometric trails, two-material technology, lightshow enhancement",
      glowstringz: "LED, string lights, customizable, modes, festival, decoration, ambient lighting",
      batteries: "coin cell, CR1620, CR1225, gloving, power source, bulk, gloving",
      merch: "brand, stickers, merchandise, gloving community, support",
      glowframez: "impacting, gloving, accessory, palm lights, clip functionality",
      casings: "microlight, casing, gloving, accessory, protection",
      gift_card: "gift, present, gloving, accessories, customizable",
      custom: "personalized, gloving, accessories, unique, custom-made",
      microlight: "LED, gloving, customizable, patterns, colors, performance",
    };

    await Product.updateMany(
      {
        $or: [
          { meta_title: { $exists: true } },
          { meta_description: { $exists: true } },
          { meta_keywords: { $exists: true } },
        ],
      },
      [
        {
          $set: {
            seo: {
              meta_title: { $ifNull: ["$meta_title", ""] },
              meta_description: { $ifNull: ["$meta_description", ""] },
              meta_keywords: {
                $cond: {
                  if: { $eq: [{ $type: "$meta_keywords" }, "string"] },
                  then: "$meta_keywords",
                  else: {
                    $ifNull: [
                      {
                        $arrayElemAt: [
                          { $objectToArray: categoryKeywords },
                          { $indexOfArray: [{ $objectToArray: categoryKeywords }, "$category"] },
                        ],
                      },
                      "",
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $set: {
            "seo.meta_keywords": {
              $cond: {
                if: { $eq: [{ $type: "$seo.meta_keywords" }, "object"] },
                then: "$seo.meta_keywords.v",
                else: "$seo.meta_keywords",
              },
            },
          },
        },
      ]
    );
    res.status(200).send({ message: "Meta fields migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate dimension fields
router.route("/migrate_dimensions").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          $or: [
            { package_length: { $exists: true } },
            { package_width: { $exists: true } },
            { package_height: { $exists: true } },
            { package_volume: { $exists: true } },
            { product_length: { $exists: true } },
            { product_width: { $exists: true } },
            { product_height: { $exists: true } },
            { weight_pounds: { $exists: true } },
            { weight_ounces: { $exists: true } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          dimensions: {
            package_length: "$package_length",
            package_width: "$package_width",
            package_height: "$package_height",
            package_volume: "$package_volume",
            product_length: "$product_length",
            product_width: "$product_width",
            product_height: "$product_height",
            weight_pounds: "$weight_pounds",
            weight_ounces: "$weight_ounces",
          },
        },
      },
    ]);

    for (const product of productsToUpdate) {
      const updateObj = { dimensions: {} };
      for (const [key, value] of Object.entries(product.dimensions)) {
        if (value !== undefined) {
          updateObj.dimensions[key] = value;
        }
      }

      await Product.updateOne({ _id: product._id }, { $set: updateObj });
    }

    res.status(200).send({ message: "Dimension fields migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_order_dimensions").put(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("orderItems.product");
    let updatedCount = 0;

    for (const order of orders) {
      let isOrderUpdated = false;

      for (const item of order.orderItems) {
        if (item.product) {
          const product = await Product.findById(item.product);

          if (product) {
            item.dimensions = {
              weight_pounds: product.dimensions.weight_pounds,
              weight_ounces: product.dimensions.weight_ounces,
              product_length: product.dimensions.product_length,
              product_width: product.dimensions.product_width,
              product_height: product.dimensions.product_height,
              package_length: product.dimensions.package_length,
              package_width: product.dimensions.package_width,
              package_height: product.dimensions.package_height,
              package_volume: product.dimensions.package_volume,
            };
            isOrderUpdated = true;
          }
        }
      }

      if (isOrderUpdated) {
        await order.save();
        updatedCount++;
      }
    }

    res
      .status(200)
      .send({ message: `Dimension fields migration completed successfully. Updated ${updatedCount} orders.` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_meta_data").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          $or: [
            { processing_time: { $exists: true } },
            { material_cost: { $exists: true } },
            { filament_used: { $exists: true } },
            { printing_time: { $exists: true } },
            { assembly_time: { $exists: true } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          meta_data: {
            processing_time: "$processing_time",
            material_cost: "$material_cost",
            filament_used: "$filament_used",
            printing_time: "$printing_time",
            assembly_time: "$assembly_time",
          },
        },
      },
    ]);

    for (const product of productsToUpdate) {
      const updateObj = { meta_data: {} };
      for (const [key, value] of Object.entries(product.meta_data)) {
        if (value !== undefined) {
          updateObj.meta_data[key] = value;
        }
      }

      await Product.updateOne({ _id: product._id }, { $set: updateObj });
    }

    res.status(200).send({ message: "Meta data fields migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate restock_status
router.route("/migrate_restock_status").put(async (req, res) => {
  try {
    await Product.updateMany(
      {
        $or: [{ sold_out: { $exists: true } }, { preorder: { $exists: true } }],
      },
      [
        {
          $set: {
            restock_status: {
              $cond: [
                { $eq: ["$sold_out", true] },
                "Sold Out",
                {
                  $cond: [{ $eq: ["$preorder", true] }, "Preorder", "In Stock"],
                },
              ],
            },
          },
        },
      ]
    );
    res.status(200).send({ message: "Restock status migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate contributors field
router.route("/migrate_contributors").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          contributers: { $exists: true },
        },
      },
      {
        $project: {
          _id: 1,
          contributers: 1,
        },
      },
    ]);

    for (const product of productsToUpdate) {
      await Product.updateOne({ _id: product._id }, { $set: { contributors: product.contributers } });
    }

    res.status(200).send({ message: "Contributors migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_color_object").put(async (req, res) => {
  try {
    const result = await Product.updateMany(
      {}, // This will target all products
      [
        {
          $set: {
            color_object: {
              name: {
                $cond: {
                  if: { $ifNull: ["$color", false] },
                  then: "$color",
                  else: null,
                },
              },
              code: {
                $cond: {
                  if: { $ifNull: ["$color_code", false] },
                  then: "$color_code",
                  else: null,
                },
              },
              is_filament_color: {
                $cond: {
                  if: { $ifNull: ["$filament", false] },
                  then: true,
                  else: false,
                },
              },
              filament: {
                $cond: {
                  if: { $ifNull: ["$filament", false] },
                  then: "$filament",
                  else: null,
                },
              },
            },
          },
        },
        // {
        //   $unset: ["color", "color_code"],
        // },
      ]
    );

    res.status(200).send({
      message: "Color object migration completed successfully",
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_display_image").put(async (req, res) => {
  const createdImages = [];
  const errors = [];

  const migrateDisplayImage = async (item, modelName, parentId) => {
    if (item.display_image && typeof item.display_image === "string" && !item.display_image_object) {
      try {
        let image = await Image.findOne({ link: item.display_image });
        if (!image) {
          // Create new Image record
          image = new Image({
            link: item.display_image,
            album: `${item.name} Images`,
          });
          await image.save();
          createdImages.push({ modelName, parentId, itemName: item.name, imageId: image._id });
        }
        item.display_image_object = image._id;
        return true;
      } catch (error) {
        console.error(`Error processing item in ${modelName} ${parentId}:`, error);
        errors.push({ modelName, parentId, itemName: item.name, reason: error.message });
      }
    }
    return false;
  };

  try {
    // Migrate Cart schema
    const carts = await Cart.find({});
    for (const cart of carts) {
      let modified = false;
      for (const item of cart.cartItems) {
        if (await migrateDisplayImage(item, "Cart", cart._id)) {
          modified = true;
        }
      }
      if (modified) {
        await cart.save();
      }
    }

    // Migrate Order schema
    const orders = await Order.find({});
    for (const order of orders) {
      let modified = false;
      for (const item of order.orderItems) {
        if (await migrateDisplayImage(item, "Order", order._id)) {
          modified = true;
        }
      }
      if (modified) {
        await order.save();
      }
    }

    res.status(200).json({
      message: "display_image_object population completed for Cart and Order",
      createdImages: createdImages,
      errors: errors,
    });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).json({
      error: error.message,
      createdImages: createdImages,
      errors: errors,
    });
  }
});

router.route("/migrate_order_numeric_options").put(async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find({});

    let updatedCount = 0;

    for (let product of products) {
      let updated = false;

      if (product.options && product.options.length > 0) {
        for (let option of product.options) {
          if (option.values && option.values.length > 0) {
            // Separate numeric and non-numeric values
            const numericValues = [];
            const nonNumericValues = [];

            for (let value of option.values) {
              if (/^\d+$/.test(value.name)) {
                numericValues.push(value);
              } else {
                nonNumericValues.push(value);
              }
            }

            // Sort numeric values
            numericValues.sort((a, b) => parseInt(a.name) - parseInt(b.name));

            // Combine sorted numeric values with non-numeric values
            option.values = [...numericValues, ...nonNumericValues];
            updated = true;
          }
        }
      }

      if (updated) {
        await product.save();
        updatedCount++;
      }
    }

    res.status(200).json({
      message: "Product options ordered successfully",
      modifiedCount: updatedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate contributors field
router.route("/fetch_color_options").get(async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          options: { $exists: true, $ne: [] },
        },
      },
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.name": { $regex: /color/i },
        },
      },
      {
        $unwind: "$options.values",
      },
      {
        $group: {
          _id: {
            category: { $toLower: "$category" },
            subcategory: { $toLower: "$subcategory" },
            optionName: { $toLower: "$options.name" },
          },
          colorValues: { $addToSet: { $toLower: "$options.values.name" } },
        },
      },
      {
        $group: {
          _id: {
            category: "$_id.category",
            subcategory: "$_id.subcategory",
          },
          options: {
            $push: {
              k: {
                $reduce: {
                  input: { $split: ["$_id.optionName", " "] },
                  initialValue: "",
                  in: { $concat: ["$$value", { $cond: [{ $eq: ["$$value", ""] }, "", "_"] }, "$$this"] },
                },
              },
              v: "$colorValues",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          subcategories: {
            $push: {
              k: "$_id.subcategory",
              v: { $arrayToObject: "$options" },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          k: "$_id",
          v: { $arrayToObject: "$subcategories" },
        },
      },
    ]);

    // Convert the result to the desired JSON structure
    const colorOptions = Object.fromEntries(result.map(item => [item.k, item.v]));

    res.json(colorOptions);
  } catch (error) {
    console.error("Error fetching category color options:", error);
    res.status(500).json({ error: error.message });
  }
});

router.route("/migrate_filament").put(async (req, res) => {
  try {
    const products = await Product.find({
      "options.values.product": { $exists: true },
    });

    let updatedCount = 0;

    for (const product of products) {
      let updated = false;

      for (const option of product.options) {
        for (const value of option.values) {
          if (value.product) {
            const linkedProduct = await Product.findById(value.product);
            if (linkedProduct && linkedProduct.filament) {
              value.filament = linkedProduct.filament;
              updated = true;
            }
          }
        }
      }

      if (updated) {
        await product.save();
        updatedCount++;
      }
    }

    res.status(200).json({
      message: `Migration completed. Updated ${updatedCount} products.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/get_filaments").put(async (req, res) => {
  try {
    const filaments = await Filament.find({ deleted: false }).populate("tags");
    res.status(200).json(filaments);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/get_products").put(async (req, res) => {
  try {
    const products = await Product.find({ deleted: false, category: "glowskinz" });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/update_diffuser_caps").put(async (req, res) => {
  try {
    const products = await Product.find({ deleted: false, category: "diffuser_caps", hidden: false });

    // const products = await Product.updateMany(
    //   { deleted: false, category: "diffuser_caps", hidden: false },
    //   { $set: { isVariation: false } }
    // );
    res.status(200).json(products.map(product => product.name));
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/get_diffuser_caps").put(async (req, res) => {
  try {
    const product = await Product.findOne({ name: "Diffuser Caps + Adapters Starter Kit V4" });
    const products = await Product.find({ deleted: false, category: "diffuser_caps", hidden: false });

    res.status(200).json({ products: products.map(product => product.name), product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/update_diffuser_caps_kit").put(async (req, res) => {
  try {
    const mainProduct = await Product.findOne({ name: "Diffuser Caps + Adapters Starter Kit V4" });
    const capDesignProducts = await Product.find({ deleted: false, category: "diffuser_caps", hidden: false });

    if (!mainProduct) {
      return res.status(404).json({ message: "Main product not found" });
    }

    // Find the "Cap Design" option
    const capDesignOption = mainProduct.options.find(option => option.name === "Cap Design");

    if (!capDesignOption) {
      return res.status(404).json({ message: "Cap Design option not found" });
    }

    // Replace the Cap Design option values based on the found products
    capDesignOption.values = capDesignProducts.map(product => ({
      name: product.name,
      product: product._id,
      isDefault: false,
      additionalCost: 0,
    }));

    // Save the updated main product
    await mainProduct.save();

    res.status(200).json({
      message: "Diffuser Caps Kit updated successfully",
      updatedOptions: capDesignOption.values,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/fetch_all_replace_price_product_options").get(async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          deleted: false,
          // hidden: false,
          "options": {
            $elemMatch: {
              "replacePrice": true,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          options: {
            $filter: {
              input: "$options",
              as: "option",
              cond: { $eq: ["$$option.replacePrice", true] },
            },
          },
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/fetch_all_replace_price_product_options_no_price").get(async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          isVariation: true,
          "options": {
            $elemMatch: {
              "replacePrice": true,
              "values": {
                $elemMatch: {
                  "product": { $exists: true },
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "parent",
          foreignField: "_id",
          as: "parentProduct",
        },
      },
      // {
      //   $match: {
      //     "parentProduct.name": { $regex: /Novaskinz/i },
      //   },
      // },
      {
        $lookup: {
          from: "products",
          localField: "options.values.product",
          foreignField: "_id",
          as: "referencedProducts",
        },
      },
      {
        $project: {
          name: 1,
          parentName: { $arrayElemAt: ["$parentProduct.name", 0] },
          options: {
            $filter: {
              input: "$options",
              as: "option",
              cond: {
                $and: [
                  { $eq: ["$$option.replacePrice", true] },
                  {
                    $anyElementTrue: {
                      $map: {
                        input: "$$option.values",
                        as: "value",
                        in: {
                          $and: [
                            { $ifNull: ["$$value.product", false] },
                            { $eq: [{ $type: "$$value.product" }, "objectId"] },
                            {
                              $let: {
                                vars: {
                                  referencedProduct: {
                                    $arrayElemAt: [
                                      {
                                        $filter: {
                                          input: "$referencedProducts",
                                          cond: { $eq: ["$$this._id", "$$value.product"] },
                                        },
                                      },
                                      0,
                                    ],
                                  },
                                },
                                in: {
                                  $or: [
                                    { $eq: [{ $type: "$$referencedProduct.price" }, "missing"] },
                                    { $lte: ["$$referencedProduct.price", 0] },
                                  ],
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          "options": { $ne: [] },
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/update_replace_prices_clozd_glowskinz").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          category: "glowskinz",
          subcategory: "clozd",
          product_collection: "classics",
          "options": {
            $elemMatch: {
              "name": "Set of",
              "replacePrice": true,
            },
          },
        },
      },
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.name": "Set of",
          "options.replacePrice": true,
        },
      },
      {
        $unwind: "$options.values",
      },
      {
        $project: {
          productId: "$options.values.product",
          setValue: "$options.values.name",
        },
      },
    ]);

    const bulkOps = productsToUpdate
      .map(product => ({
        updateOne: {
          filter: { _id: product.productId },
          update: {
            $set: {
              price: (() => {
                switch (product.setValue) {
                  case "1":
                    return 2.95;
                  case "8":
                    return 17.99;
                  case "10":
                    return 19.99;
                  default:
                    return null; // This will not update the price if it doesn't match
                }
              })(),
            },
          },
        },
      }))
      .filter(op => op.updateOne.update.$set.price !== null);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      res.json({ message: `Updated prices for ${result.modifiedCount} products.` });
    } else {
      res.json({ message: "No products found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/update_omniskinz_prices").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          isVariation: true,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "parent",
          foreignField: "_id",
          as: "parentProduct",
        },
      },
      {
        $match: {
          "parentProduct.name": { $regex: /Omniskinz/i },
        },
      },
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.name": "Set of",
          "options.replacePrice": true,
        },
      },
      {
        $unwind: "$options.values",
      },
      {
        $project: {
          productId: "$options.values.product",
          setValue: "$options.values.name",
        },
      },
    ]);

    const bulkOps = productsToUpdate
      .map(product => ({
        updateOne: {
          filter: { _id: product.productId },
          update: {
            $set: {
              price: (() => {
                switch (product.setValue) {
                  case "1":
                    return 3.89;
                  case "8":
                    return 23.39;
                  case "10":
                    return 26.99;
                  default:
                    return null; // This will not update the price if it doesn't match
                }
              })(),
            },
          },
        },
      }))
      .filter(op => op.updateOne.update.$set.price !== null);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      res.json({ message: `Updated prices for ${result.modifiedCount} Omniskinz products.` });
    } else {
      res.json({ message: "No Omniskinz products found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/update_novaskinz_prices").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          isVariation: true,
          "options": {
            $elemMatch: {
              "replacePrice": true,
              "values": {
                $elemMatch: {
                  "product": { $exists: true },
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "parent",
          foreignField: "_id",
          as: "parentProduct",
        },
      },
      {
        $match: {
          "parentProduct.name": { $regex: /Novaskinz/i },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "options.values.product",
          foreignField: "_id",
          as: "referencedProducts",
        },
      },
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.name": "Set of",
          "options.replacePrice": true,
        },
      },
      {
        $unwind: "$options.values",
      },
      {
        $project: {
          productId: "$options.values.product",
          setValue: "$options.values.name",
          referencedProduct: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$referencedProducts",
                  cond: { $eq: ["$$this._id", "$options.values.product"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $match: {
          $or: [{ "referencedProduct.price": { $exists: false } }, { "referencedProduct.price": { $lte: 0 } }],
        },
      },
    ]);

    const bulkOps = productsToUpdate
      .map(product => ({
        updateOne: {
          filter: { _id: product.productId },
          update: {
            $set: {
              price: (() => {
                switch (product.setValue) {
                  case "1":
                    return 6.99;
                  case "2":
                    return 12.99;
                  case "4":
                    return 22.99;
                  case "10":
                    return 49.99;
                  default:
                    return null;
                }
              })(),
            },
          },
        },
      }))
      .filter(op => op.updateOne.update.$set.price !== null);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      res.json({ message: `Updated prices for ${result.modifiedCount} Novaskinz products.` });
    } else {
      res.json({ message: "No Novaskinz products found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/update_omniskinz_prices").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          isVariation: true,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "parent",
          foreignField: "_id",
          as: "parentProduct",
        },
      },
      {
        $match: {
          "parentProduct.name": { $regex: /Novaskinz/i },
        },
      },
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.name": "Set of",
          "options.replacePrice": true,
        },
      },
      {
        $unwind: "$options.values",
      },
      {
        $project: {
          productId: "$options.values.product",
          setValue: "$options.values.name",
        },
      },
    ]);

    const bulkOps = productsToUpdate
      .map(product => ({
        updateOne: {
          filter: { _id: product.productId },
          update: {
            $set: {
              price: (() => {
                switch (product.setValue) {
                  case "1":
                    return 3.89;
                  case "8":
                    return 23.39;
                  case "10":
                    return 26.99;
                  default:
                    return null; // This will not update the price if it doesn't match
                }
              })(),
            },
          },
        },
      }))
      .filter(op => op.updateOne.update.$set.price !== null);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      res.json({ message: `Updated prices for ${result.modifiedCount} Omniskinz products.` });
    } else {
      res.json({ message: "No Omniskinz products found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/update_replace_prices_opyn_glowskinz").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          category: "glowskinz",
          subcategory: "opyn",
          "options": {
            $elemMatch: {
              "name": "Set of",
              "replacePrice": true,
            },
          },
        },
      },
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.name": "Set of",
          "options.replacePrice": true,
        },
      },
      {
        $unwind: "$options.values",
      },
      {
        $project: {
          productId: "$options.values.product",
          setValue: "$options.values.name",
        },
      },
    ]);

    const bulkOps = productsToUpdate
      .map(product => ({
        updateOne: {
          filter: { _id: product.productId },
          update: {
            $set: {
              price: (() => {
                switch (product.setValue) {
                  case "1":
                    return 2.95;
                  case "8":
                    return 17.99;
                  case "10":
                    return 19.99;
                  default:
                    return null; // This will not update the price if it doesn't match
                }
              })(),
            },
          },
        },
      }))
      .filter(op => op.updateOne.update.$set.price !== null);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      res.json({ message: `Updated prices for ${result.modifiedCount} products.` });
    } else {
      res.json({ message: "No products found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/update_replace_prices_novaskinz").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          category: "glowskinz",
          subcategory: "clozd",
          product_collection: "novaskinz",
          "options": {
            $elemMatch: {
              "name": "Set of",
              "replacePrice": true,
            },
          },
        },
      },
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.name": "Set of",
          "options.replacePrice": true,
        },
      },
      {
        $unwind: "$options.values",
      },
      {
        $project: {
          productId: "$options.values.product",
          setValue: "$options.values.name",
        },
      },
    ]);

    const bulkOps = productsToUpdate
      .map(product => ({
        updateOne: {
          filter: { _id: product.productId },
          update: {
            $set: {
              price: (() => {
                switch (product.setValue) {
                  case "1":
                    return 6.99;
                  case "2":
                    return 12.99;
                  case "8":
                    return 22.99;
                  case "10":
                    return 49.99;
                  default:
                    return null; // This will not update the price if it doesn't match
                }
              })(),
            },
          },
        },
      }))
      .filter(op => op.updateOne.update.$set.price !== null);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      res.json({ message: `Updated prices for ${result.modifiedCount} products.` });
    } else {
      res.json({ message: "No products found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/migrate_replace_price_size").put(async (req, res) => {
  try {
    // Find all products with size options where replacePrice is true
    const productsToUpdate = await Product.find({
      "options": {
        $elemMatch: {
          "name": "Size",
          "replacePrice": true,
        },
      },
    });

    console.log(`Found ${productsToUpdate.length} products to update.`);

    let updatedCount = 0;
    let errorCount = 0;
    let noChangeCount = 0;

    for (const product of productsToUpdate) {
      try {
        let updated = false;
        product.options = product.options.map(option => {
          if (option.name === "Size" && option.replacePrice === true) {
            option.replacePrice = false;
            updated = true;
          }
          return option;
        });

        if (updated) {
          await product.save();
          updatedCount++;
          console.log(`Updated product: ${product._id} - ${product.name}`);
        } else {
          noChangeCount++;
          console.log(`No change needed for product: ${product._id} - ${product.name}`);
        }
      } catch (error) {
        errorCount++;
        console.error(`Error updating product ${product._id} - ${product.name}:`, error);
      }
    }

    console.log(`
      Migration completed:
      - Total products processed: ${productsToUpdate.length}
      - Products updated: ${updatedCount}
      - Products with no changes: ${noChangeCount}
      - Errors encountered: ${errorCount}
    `);

    res.status(200).json({
      message: "Migration completed",
      totalProcessed: productsToUpdate.length,
      updatedCount,
      noChangeCount,
      errorCount,
    });
  } catch (error) {
    console.error("Error in migrate_replace_price_size:", error);
    res.status(500).json({ message: "Error during migration", error: error.message });
  }
});
router.route("/migrate_replace_price_style").put(async (req, res) => {
  try {
    // Find all products with size options where replacePrice is true
    const productsToUpdate = await Product.find({
      "options": {
        $elemMatch: {
          "name": "Style",
          "replacePrice": true,
        },
      },
    });

    console.log(`Found ${productsToUpdate.length} products to update.`);

    let updatedCount = 0;
    let errorCount = 0;
    let noChangeCount = 0;

    for (const product of productsToUpdate) {
      try {
        let updated = false;
        product.options = product.options.map(option => {
          if (option.name === "Size" && option.replacePrice === true) {
            option.replacePrice = false;
            updated = true;
          }
          return option;
        });

        if (updated) {
          await product.save();
          updatedCount++;
          console.log(`Updated product: ${product._id} - ${product.name}`);
        } else {
          noChangeCount++;
          console.log(`No change needed for product: ${product._id} - ${product.name}`);
        }
      } catch (error) {
        errorCount++;
        console.error(`Error updating product ${product._id} - ${product.name}:`, error);
      }
    }

    console.log(`
      Migration completed:
      - Total products processed: ${productsToUpdate.length}
      - Products updated: ${updatedCount}
      - Products with no changes: ${noChangeCount}
      - Errors encountered: ${errorCount}
    `);

    res.status(200).json({
      message: "Migration completed",
      totalProcessed: productsToUpdate.length,
      updatedCount,
      noChangeCount,
      errorCount,
    });
  } catch (error) {
    console.error("Error in migrate_replace_price_size:", error);
    res.status(500).json({ message: "Error during migration", error: error.message });
  }
});

router.route("/check_size_option_structure").put(async (req, res) => {
  try {
    const productsWithSizeOption = await Product.find({
      "options": {
        $elemMatch: {
          "name": "Size",
        },
      },
    }).limit(5);

    const structureSamples = productsWithSizeOption.map(product => ({
      _id: product._id,
      name: product.name,
      sizeOption: product.options.find(opt => opt.name === "Size"),
    }));

    res.status(200).json({
      message: "Sample structures of products with Size option",
      samples: structureSamples,
    });
  } catch (error) {
    console.error("Error in check_size_option_structure:", error);
    res.status(500).json({ message: "Error during check", error: error.message });
  }
});

router.route("/check_prod_size_option_structure").put(async (req, res) => {
  try {
    const productsWithSizeOption = await Product.find({
      "options": {
        $elemMatch: {
          "name": "Size",
        },
      },
    }).limit(10);

    const structureSamples = productsWithSizeOption.map(product => ({
      _id: product._id,
      name: product.name,
      sizeOption: product.options.find(opt => opt.name === "Size"),
    }));

    const productsWithReplacePrice = productsWithSizeOption.filter(product =>
      product.options.find(opt => opt.name === "Size" && opt.replacePrice === true)
    );

    res.status(200).json({
      message: "Sample structures of products with Size option in production",
      totalSamples: productsWithSizeOption.length,
      samplesWithReplacePrice: productsWithReplacePrice.length,
      samples: structureSamples,
    });
  } catch (error) {
    console.error("Error in check_prod_size_option_structure:", error);
    res.status(500).json({ message: "Error during check", error: error.message });
  }
});

router.route("/migrate_style_order").put(async (req, res) => {
  try {
    // Find all products with a "Style" option
    const products = await Product.find({
      "options": {
        $elemMatch: {
          "name": "Style",
        },
      },
    });

    console.log(`Found ${products.length} products with Style options to update.`);

    let updatedCount = 0;

    for (const product of products) {
      const styleOptionIndex = product.options.findIndex(option => option.name === "Style");
      if (styleOptionIndex !== -1) {
        const styleOption = product.options[styleOptionIndex];

        // Sort the values array so that "Classic" comes first
        styleOption.values.sort((a, b) => {
          if (a.name === "Classic") return -1;
          if (b.name === "Classic") return 1;
          if (a.name === "Vortex") return -1;
          if (b.name === "Vortex") return 1;
          return 0;
        });

        // Update the product
        const updateResult = await Product.updateOne(
          { _id: product._id },
          { $set: { [`options.${styleOptionIndex}`]: styleOption } }
        );

        if (updateResult.modifiedCount > 0) {
          updatedCount++;
        }
      }
    }

    console.log(`Updated ${updatedCount} products.`);

    res.status(200).json({
      message: `Migration completed. Updated ${updatedCount} products.`,
      totalProductsFound: products.length,
      productsUpdated: updatedCount,
    });
  } catch (error) {
    console.error("Error in migrate_style_order:", error);
    res.status(500).json({ message: "Error during migration", error: error.message });
  }
});

// --------------------------------------------------

// Migrate lifestyle images
router.route("/migrate_lifestyle_images").put(async (req, res) => {
  try {
    await Product.updateMany({}, [
      {
        $set: {
          "features.lifestyle_images": {
            $reduce: {
              input: [
                { $ifNull: ["$images_object", []] },
                { $ifNull: ["$color_images_object", []] },
                { $ifNull: ["$secondary_color_images_object", []] },
                { $ifNull: ["$option_images_object", []] },
              ],
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);
    res.status(200).send({ message: "Lifestyle images migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate in_the_box
router.route("/migrate_in_the_box").put(async (req, res) => {
  try {
    await Product.updateMany({ included_items: { $exists: true } }, [
      {
        $set: {
          "in_the_box.title": "What you get",
          "in_the_box.items": {
            $map: {
              input: { $split: ["$included_items", "\n"] },
              as: "item",
              in: {
                description: "$$item",
              },
            },
          },
        },
      },
    ]);
    res.status(200).send({ message: "In the box migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate facts field
router.route("/migrate_facts").put(async (req, res) => {
  let successCount = 0;
  let failureCount = 0;
  let failedIds = [];

  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: { facts: { $exists: true } },
      },
      {
        $project: {
          _id: 1,
          facts: 1,
          color_images_object: 1,
          secondary_color_images_object: 1,
        },
      },
    ]);

    for (const product of productsToUpdate) {
      try {
        const facts = product.facts.split("\n").filter(fact => fact.trim() !== "");
        const images = [...(product.color_images_object || []), ...(product.secondary_color_images_object || [])];

        const fact = facts[0] || "";
        const image_grid_1 = facts.slice(0, 3).map((fact, index) => ({
          title: fact,
          image: images[index] || null,
        }));
        const image_grid_2 = facts.slice(3).map((fact, index) => ({
          title: fact,
          image: images[index + 3] || null,
        }));

        const updateObj = {
          $set: {
            fact: fact,
          },
        };

        if (image_grid_1.length > 0) {
          updateObj.$set["features.image_grid_1"] = image_grid_1;
        }
        if (image_grid_2.length > 0) {
          updateObj.$set["features.image_grid_2"] = image_grid_2;
        }

        await Product.updateOne({ _id: product._id }, updateObj);
        successCount++;
      } catch (error) {
        console.error(`Failed to update product ${product._id}: ${error.message}`);
        failureCount++;
        failedIds.push(product._id);
      }
    }

    res.status(200).send({
      message: "Facts and images migration completed",
      successCount,
      failureCount,
      failedIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_sale").put(async (req, res) => {
  try {
    const productsToUpdate = await Product.aggregate([
      {
        $match: {
          $or: [
            { sale_price: { $exists: true } },
            { sale_start_date: { $exists: true } },
            { sale_end_date: { $exists: true } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          sale: {
            price: "$sale_price",
            start_date: "$sale_start_date",
            end_date: "$sale_end_date",
          },
        },
      },
    ]);

    for (const product of productsToUpdate) {
      const updateObj = { sale: {} };
      if (product.sale.price !== undefined) updateObj.sale.price = product.sale.price;
      if (product.sale.start_date) updateObj.sale.start_date = new Date(product.sale.start_date);
      if (product.sale.end_date) updateObj.sale.end_date = new Date(product.sale.end_date);

      await Product.updateOne({ _id: product._id }, { $set: updateObj });
    }

    res.status(200).send({ message: "Sale fields migration completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate restock_status

router.route("/migrate_image_object").put(async (req, res) => {
  const skippedDocuments = [];

  const safelyMigrateAndSave = async (doc, modelName) => {
    try {
      await doc.save();
    } catch (error) {
      console.error(`Error saving ${modelName} document ${doc._id}:`, error.message);
      skippedDocuments.push({ modelName, id: doc._id, error: error.message });
    }
  };

  try {
    // Migrate Team schema
    const teams = await Team.find({});
    for (const team of teams) {
      team.map = undefined;
      team.picture = undefined;
      team.images = undefined;

      if (team.map_image_object) team.map = team.map_image_object;
      if (team.profile_image_object) team.profile_image = team.profile_image_object;
      if (team.images_object) team.images = team.images_object;

      await safelyMigrateAndSave(team, "Team");
    }

    // Migrate Chip schema
    const chips = await Chip.find({});
    for (const chip of chips) {
      chip.image = undefined;
      if (chip.image_object) chip.images = [chip.image_object];
      await safelyMigrateAndSave(chip, "Chip");
    }

    // Migrate Email schema
    const emails = await Email.find({});
    for (const email of emails) {
      email.image = undefined;
      email.images = undefined;

      if (email.image_object) email.image = email.image_object;
      if (email.images_object) email.images = email.images_object;

      await safelyMigrateAndSave(email, "Email");
    }

    // Migrate Product schema
    const products = await Product.find({});
    for (const product of products) {
      product.images = undefined;
      product.color_images = undefined;
      product.secondary_color_images = undefined;
      product.option_images = undefined;

      if (product.images_object) product.images = product.images_object;
      if (product.color_images_object) product.color_images = product.color_images_object;
      if (product.secondary_color_images_object) product.secondary_color_images = product.secondary_color_images_object;
      if (product.option_images_object) product.option_images = product.option_images_object;

      await safelyMigrateAndSave(product, "Product");
    }

    res.status(200).json({
      message: "Image migration completed",
      skippedDocuments: skippedDocuments,
    });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).json({
      error: error.message,
      skippedDocuments: skippedDocuments,
    });
  }
});

// Step 2: Update display_image to use display_image_object
router.route("/finalize_display_image").put(async (req, res) => {
  const skippedItems = [];

  const finalizeDisplayImage = (item, modelName, parentId) => {
    if (item.display_image_object) {
      item.display_image = item.display_image_object;
      return true;
    } else if (typeof item.display_image === "string") {
      skippedItems.push({ modelName, parentId, itemName: item.name, reason: "Missing display_image_object" });
    }
    return false;
  };

  try {
    // Finalize Cart schema
    const carts = await Cart.find({});
    for (const cart of carts) {
      let modified = false;
      for (const item of cart.cartItems) {
        if (finalizeDisplayImage(item, "Cart", cart._id)) {
          modified = true;
        }
      }
      if (modified) {
        await cart.save();
      }
    }

    // Finalize Order schema
    const orders = await Order.find({});
    for (const order of orders) {
      let modified = false;
      for (const item of order.orderItems) {
        if (finalizeDisplayImage(item, "Order", order._id)) {
          modified = true;
        }
      }
      if (modified) {
        await order.save();
      }
    }

    res.status(200).json({
      message: "display_image finalization completed for Cart and Order",
      skippedItems: skippedItems,
    });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).json({
      error: error.message,
      skippedItems: skippedItems,
    });
  }
});

router.route("/migrate_diffusers").put(async (req, res) => {
  try {
    // Find all products in the "diffusers" category
    const diffusers = await Product.find({ category: "diffusers" });

    let updatedCount = 0;
    let errorCount = 0;
    let errorProducts = [];

    for (const diffuser of diffusers) {
      try {
        // Find the "Diffuser Color" option
        const bulbStyleOptionIndex = diffuser.options.findIndex(option => option.name === "Diffuser Color");

        if (bulbStyleOptionIndex === -1) {
          // If "Diffuser Color" option doesn't exist, log it and skip this product
          console.log(`Product ${diffuser._id} does not have a "Diffuser Color" option.`);
          errorCount++;
          errorProducts.push(diffuser._id);
          continue;
        }

        // Update the option image
        diffuser.options[bulbStyleOptionIndex].image = "66d8de7baac904721cdabe8b";
        // diffuser.options[bulbStyleOptionIndex].image = "66d8dfc9ef229e4931014740";

        // Save the updated product
        await diffuser.save();
        updatedCount++;
      } catch (productError) {
        console.error(`Error updating product ${diffuser._id}:`, productError);
        errorCount++;
        errorProducts.push(diffuser._id);
      }
    }

    res.status(200).json({
      message: `Migration completed. Updated ${updatedCount} diffuser products. Encountered errors with ${errorCount} products.`,
      errorProducts: errorProducts,
    });
  } catch (error) {
    console.error("Migration failed:", error);
    res.status(500).send({ error: error.message });
  }
});

// router.route("/migrate_diffusers").put(async (req, res) => {
//   try {
//     // Find all products in the "diffusers" category
//     const diffusers = await Product.find({ category: "diffusers" });

//     let updatedCount = 0;

//     for (const diffuser of diffusers) {
//       // Find the "Bulb Style" option (previously "Fisheye")
//       const bulbStyleOptionIndex = diffuser.options.findIndex(option => option.name === "Diffuser Color");

//       // if (bulbStyleOptionIndex !== -1) {
//       // Update the option name to "Bulb Style"
//       diffuser.options[bulbStyleOptionIndex].image = "66d8de7baac904721cdabe8b";
//       // diffuser.options[bulbStyleOptionIndex].active = true;
//       // diffuser.options[bulbStyleOptionIndex].details =
//       //   "Choose from 4 diffuser sizes: Micro = 10 mm, Mini = 12.5 mm, Standard = 15 mm, Large = 20 mm";

//       // Find and update the specific value
//       // const specificValueIndex = diffuser.options[bulbStyleOptionIndex].values.findIndex(
//       //   value => value.name === "Vortex"
//       // );
//       // if (specificValueIndex !== -1) {
//       //   diffuser.options[bulbStyleOptionIndex].values[specificValueIndex].name = "Vortex NeoPixel";
//       // }

//       // Save the updated product
//       await diffuser.save();
//       updatedCount++;
//       // }
//     }

//     res.status(200).json({
//       message: `Migration completed. Updated ${updatedCount} diffuser products.`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// });

// router.route("/migrate_product_options_active").put(async (req, res) => {
//   try {
//     const products = await Product.find({});
//     let updatedCount = 0;

//     for (const product of products) {
//       await product.save();
//       updatedCount++;
//     }

//     res.status(200).json({
//       message: `Migration completed. Updated ${updatedCount} products.`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// });

router.route("/migrate_product_options_active").put(async (req, res) => {
  try {
    console.log("Starting product options migration...");
    const products = await Product.find({ deleted: false, hidden: false });
    console.log(`Found ${products.length} products to process.`);
    let updatedCount = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      let productUpdated = false;

      console.log(`Processing product ${i + 1}/${products.length}: ${product.name}`);

      // Update options
      product.options.forEach((option, optionIndex) => {
        // if (option.active !== true) {
        console.log(`  Updating option '${option.name}' to active`);
        option.active = true;
        productUpdated = true;
        // }

        // Update option values
        option.values.forEach((value, valueIndex) => {
          // if (value.active !== true) {
          console.log(`    Updating value '${value.name}' in option '${option.name}' to active`);
          value.active = true;
          productUpdated = true;
          // }
        });
      });

      if (productUpdated) {
        console.log(`  Saving updated product: ${product.name}`);
        await product.save();
        updatedCount++;
      } else {
        console.log(`  No changes needed for product: ${product.name}`);
      }

      // Log progress every 10 products
      if ((i + 1) % 10 === 0 || i === products.length - 1) {
        console.log(`Processed ${i + 1}/${products.length} products. Updated so far: ${updatedCount}`);
      }
    }

    console.log(`Migration completed. Total products updated: ${updatedCount}`);
    res.status(200).json({
      message: `Migration completed. Updated ${updatedCount} products with active options and option values.`,
    });
  } catch (error) {
    console.error("Error during migration:", error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/deactivate_bulb_style_options").put(async (req, res) => {
  try {
    console.log("Starting 'Bulb Style' option deactivation migration...");
    const products = await Product.find({ deleted: false, hidden: false });
    console.log(`Found ${products.length} products to process.`);
    let updatedCount = 0;

    for (const product of products) {
      const bulbStyleOption = product.options.find(option => option.name === "Bottom Color");
      if (bulbStyleOption && bulbStyleOption.active !== false) {
        bulbStyleOption.active = false;
        await product.save();
        updatedCount++;
      }
    }

    console.log(`Migration completed. Total products updated: ${updatedCount}`);
    res.status(200).json({
      message: `Migration completed. Deactivated 'Bulb Style' option in ${updatedCount} products.`,
    });
  } catch (error) {
    console.error("Error during migration:", error);
    res.status(500).send({ error: error.message });
  }
});

// router.route("/migrate_diffusers").put(async (req, res) => {
//   try {
//     // Find all products in the "diffusers" category
//     const diffusers = await Product.find({ category: "diffusers" });

//     let updatedCount = 0;

//     for (const diffuser of diffusers) {
//       // Find the "Bulb Style" and "Center Style" options
//       const bulbStyleIndex = diffuser.options.findIndex(option => option.name === "Bulb Style");
//       const centerStyleIndex = diffuser.options.findIndex(option => option.name === "Center Style");

//       if (bulbStyleIndex !== -1 && centerStyleIndex !== -1) {
//         // Swap the positions of "Bulb Style" and "Center Style"
//         [diffuser.options[bulbStyleIndex], diffuser.options[centerStyleIndex]] = [
//           diffuser.options[centerStyleIndex],
//           diffuser.options[bulbStyleIndex],
//         ];

//         // Ensure "Center Style" is at index 3 (4th position) and "Bulb Style" is at index 4 (5th position)
//         if (bulbStyleIndex < centerStyleIndex) {
//           diffuser.options.splice(3, 0, diffuser.options.splice(centerStyleIndex, 1)[0]);
//           diffuser.options.splice(4, 0, diffuser.options.splice(bulbStyleIndex, 1)[0]);
//         } else {
//           diffuser.options.splice(3, 0, diffuser.options.splice(bulbStyleIndex, 1)[0]);
//           diffuser.options.splice(4, 0, diffuser.options.splice(centerStyleIndex, 1)[0]);
//         }

//         // // Update the "Bottom Color" option image if it exists
//         // const bottomColorIndex = diffuser.options.findIndex(option => option.name === "Bottom Color");
//         // if (bottomColorIndex !== -1) {
//         //   diffuser.options[bottomColorIndex].image = "66d39f32834632c463c2f9b4";
//         // }

//         // Save the updated product
//         await diffuser.save();
//         updatedCount++;
//       }
//     }

//     res.status(200).json({
//       message: `Migration completed. Updated ${updatedCount} diffuser products.`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// });

router.route("/update_violet_colorcode").put(async (req, res) => {
  try {
    console.log(`Starting 'Violet' colorCode update...`);
    const orders = await Order.find({ deleted: false });
    console.log(`Found ${orders.length} orders to process`);
    let updatedCount = 0;

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      console.log(`Processing order ${i + 1} of ${orders.length} (ID: ${order._id})`);
      let orderUpdated = false;

      for (let j = 0; j < order.orderItems.length; j++) {
        const item = order.orderItems[j];
        console.log(`  Processing order item ${j + 1} of ${order.orderItems.length}`);

        // Update currentOptions
        if (item.currentOptions) {
          for (let k = 0; k < item.currentOptions.length; k++) {
            const option = item.currentOptions[k];
            if (option.values) {
              for (let l = 0; l < option.values.length; l++) {
                const value = option.values[l];
                if (value.colorCode === "Violet") {
                  console.log(`    Found Violet colorCode in currentOptions`);
                  value.colorCode = "#543abb";
                  orderUpdated = true;
                }
              }
            }
          }
        }

        // Update selectedOptions
        if (item.selectedOptions) {
          for (let k = 0; k < item.selectedOptions.length; k++) {
            const option = item.selectedOptions[k];
            if (option.colorCode === "Violet") {
              console.log(`    Found Violet colorCode in selectedOptions`);
              option.colorCode = "#543abb";
              orderUpdated = true;
            }
          }
        }
      }

      if (orderUpdated) {
        console.log(`  Saving updated order ${order._id}`);
        await order.save();
        updatedCount++;
      } else {
        console.log(`  No updates needed for order ${order._id}`);
      }
    }

    console.log(`Updated ${updatedCount} orders`);

    res.status(200).send({
      message: "Violet colorCode update completed",
      updatedOrders: updatedCount,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/update_set_of_products").put(async (req, res) => {
  try {
    const categorySetOfMap = {
      "diffusers": 10,
      "exo_diffusers": 10,
      "decals": 11,
      "diffuser_caps": 10,
    };

    const bulkOps = Object.entries(categorySetOfMap).map(([category, setOf]) => ({
      updateMany: {
        filter: { category: category },
        update: { $set: { set_of: setOf } },
      },
    }));

    const result = await Product.bulkWrite(bulkOps);

    res.status(200).json({
      message: "Products updated successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_diffuser_subcategory").put(async (req, res) => {
  try {
    // Find all products in the "diffusers" category
    const diffusers = await Product.find({ category: "diffusers" });

    let updatedCount = 0;

    for (const diffuser of diffusers) {
      // Remove the subcategory field
      diffuser.subcategory = undefined;

      // Save the updated product
      await diffuser.save();
      updatedCount++;
    }

    res.status(200).json({
      message: `Migration completed. Updated ${updatedCount} diffuser products.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.route("/swap_purple_violet_colors").put(async (req, res) => {
  try {
    const products = await Product.find({
      options: {
        $elemMatch: {
          values: {
            $all: [{ $elemMatch: { name: "Purple" } }, { $elemMatch: { name: "Violet" } }],
          },
        },
      },
    });

    let updatedCount = 0;

    for (let product of products) {
      let updated = false;
      product.options.forEach(option => {
        let purpleIndex = option.values.findIndex(value => value.name === "Purple");
        let violetIndex = option.values.findIndex(value => value.name === "Violet");

        if (purpleIndex !== -1 && violetIndex !== -1 && purpleIndex < violetIndex) {
          // Swap the positions
          [option.values[purpleIndex], option.values[violetIndex]] = [
            option.values[violetIndex],
            option.values[purpleIndex],
          ];
          updated = true;
        }
      });

      if (updated) {
        await Product.findByIdAndUpdate(product._id, { options: product.options });
        updatedCount++;
      }
    }

    res.status(200).json({ message: `Migration completed successfully. Updated ${updatedCount} products.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.route("/update_product_tags").put(async (req, res) => {
  try {
    // Find the tag IDs for the existing and new tags
    const requiredTagNames = ["Opyn"];
    const newTagNames = ["Diffusers", "Diffuser Caps", "Exo Diffusers"];

    const allTags = await Category.find({ name: { $in: [...requiredTagNames, ...newTagNames] } });

    const requiredTagIds = allTags.filter(tag => requiredTagNames.includes(tag.name)).map(tag => tag._id);

    const newTagIds = allTags.filter(tag => newTagNames.includes(tag.name)).map(tag => tag._id);

    // Find products that have both 'Glowskinz' and 'OPYN' tags
    const products = await Product.find({ tags: { $all: requiredTagIds } });

    let updatedCount = 0;

    for (const product of products) {
      // Add new tags if they don't already exist in the product's tags
      const updatedTags = [...new Set([...product.tags, ...newTagIds])];

      // Update the product with new tags
      await Product.findByIdAndUpdate(product._id, { tags: updatedTags });
      updatedCount++;
    }

    res.status(200).json({
      message: `Update completed. Updated tags for ${updatedCount} products.`,
      updatedCount,
    });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/migrate_max_quantity").put(async (req, res) => {
  try {
    const products = await Product.find({ deleted: false });

    let updatedCount = 0;

    for (const product of products) {
      if (product.max_quantity) {
        product.max_display_quantity = product.max_quantity;
        await product.save();
        updatedCount++;
      }
    }

    res.status(200).json({
      message: `Update completed. Updated tags for ${updatedCount} products.`,
      updatedCount,
    });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_max_quantity_everything").put(async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result = await Product.updateMany(
        { deleted: false, count_in_stock: { $exists: true, $ne: null } },
        { $set: { max_quantity: 0 } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: `Update completed. Updated ${result.modifiedCount} products.`,
        updatedCount: result.modifiedCount,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).send({ error: error.message });
  }
});
router.route("/migrate_max_quantity_gloves").put(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Product.updateMany(
      { deleted: false, category: "gloves", count_in_stock: { $exists: true, $ne: null } },
      [{ $set: { max_quantity: "$count_in_stock" } }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `Update completed. Updated ${result.modifiedCount} glove products.`,
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Update failed:", error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate max quantity for coin batteries
router.route("/migrate_max_quantity_batteries").put(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Product.updateMany(
      { deleted: false, category: "batteries", subcategory: "coin", count_in_stock: { $exists: true, $ne: null } },
      [{ $set: { max_quantity: "$count_in_stock" } }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `Update completed. Updated ${result.modifiedCount} coin battery products.`,
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Update failed:", error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate max display quantity for cart items and set all carts to active
router.route("/migrate_max_display_quantity_cart").put(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Cart.updateMany(
      {},
      [
        {
          $set: {
            "cartItems": {
              $map: {
                input: "$cartItems",
                as: "item",
                in: {
                  $mergeObjects: [
                    "$$item",
                    {
                      max_quantity: 30,
                      max_display_quantity: 30,
                    },
                  ],
                },
              },
            },
            active: true,
          },
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `Update completed. Updated ${result.modifiedCount} carts.`,
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Update failed:", error);
    res.status(500).send({ error: error.message });
  }
});

// Migrate max display quantity for order items
router.route("/migrate_max_display_quantity_order").put(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Order.updateMany(
      { deleted: false, "orderItems.count_in_stock": { $exists: true, $ne: null } },
      [
        {
          $set: {
            "orderItems": {
              $map: {
                input: "$orderItems",
                as: "item",
                in: {
                  $mergeObjects: [
                    "$$item",
                    {
                      max_display_quantity: {
                        $cond: [
                          { $ifNull: ["$$item.count_in_stock", false] },
                          "$$item.max_quantity",
                          "$$item.max_display_quantity",
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `Update completed. Updated items in ${result.modifiedCount} orders.`,
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Update failed:", error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/make_markdown").put(async (req, res) => {
  try {
    const specificProducts = [
      "Helios Gloveset",
      "Helios Microlight",
      "Glow Jar",
      "CLOZD Helioskinz",
      "OPYN Helioskinz",
    ];

    const products = await Product.find({
      deleted: false,
      isVariation: false,
      $or: [{ hidden: false }, { name: { $in: specificProducts } }],
    })
      .select("name options hidden category")
      .sort("category name");

    let markdown = "# Product Options\n\n";

    // Organize products by category
    const productsByCategory = {};
    products.forEach(product => {
      if (!product.hidden || specificProducts.includes(product.name)) {
        if (!productsByCategory[product.category]) {
          productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
      }
    });

    // Create a list of all main product names, organized by category
    markdown += "## Main Products\n\n";
    for (const [category, categoryProducts] of Object.entries(productsByCategory)) {
      markdown += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
      categoryProducts.forEach(product => {
        markdown += `- ${product.name}\n`;
      });
      markdown += "\n";
    }
    markdown += "---\n\n";

    // Generate detailed markdown for each category
    for (const [category, categoryProducts] of Object.entries(productsByCategory)) {
      markdown += `# ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;

      for (const product of categoryProducts) {
        markdown += `## ${product.name}\n\n`;

        if (product.options && product.options.length > 0) {
          const activeOptions = product.options.filter(option => option.active !== false);

          for (const option of activeOptions) {
            markdown += `### ${option.name}\n\n`;
            if (option.values && option.values.length > 0) {
              const activeValues = option.values.filter(value => value.active !== false);

              if (activeValues.length > 0) {
                for (const value of activeValues) {
                  markdown += `- ${value.name}\n`;
                }
                markdown += "\n";
              } else {
                markdown += "No active values for this option.\n\n";
              }
            } else {
              markdown += "No values for this option.\n\n";
            }
          }

          if (activeOptions.length === 0) {
            markdown += "No active options available for this product.\n\n";
          }
        } else {
          markdown += "No options available for this product.\n\n";
        }

        markdown += "---\n\n";
      }
    }

    // Create a temporary file
    const tempDir = path.join(process.cwd(), "temp");
    await fs.mkdir(tempDir, { recursive: true });
    const filePath = path.join(tempDir, "product_options.md");
    await fs.writeFile(filePath, markdown);

    // Send the file
    res.download(filePath, "product_options.md", err => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send({ error: "Error sending file" });
      }
      // Delete the temporary file after sending
      fs.unlink(filePath).catch(console.error);
    });
  } catch (error) {
    console.error("Error generating product options markdown:", error);
    res.status(500).send({ error: error.message });
  }
});

router.route("/migrate_content_links").put(async (req, res) => {
  try {
    const contents = await Content.find({});
    let updatedCount = 0;

    for (const content of contents) {
      let updated = false;

      // Update links
      if (content.links && content.links.length > 0) {
        content.links = content.links.map(link => {
          if (link.link && link.link.startsWith("/")) {
            link.link = `/menu${link.link}`;
            updated = true;
          }
          return link;
        });
      }

      // Update menus
      if (content.menus && content.menus.length > 0) {
        content.menus = content.menus.map(menu => {
          if (menu.menu_items && menu.menu_items.length > 0) {
            menu.menu_items = menu.menu_items.map(item => {
              if (item.link && item.link.startsWith("/")) {
                item.link = `/menu${item.link}`;
                updated = true;
              }
              return item;
            });
          }
          return menu;
        });
      }

      // Update learn articles
      if (content.learn && content.learn.articles && content.learn.articles.length > 0) {
        content.learn.articles = content.learn.articles.map(article => {
          if (article.pathname && article.pathname.startsWith("/")) {
            article.pathname = `/learn${article.pathname}`;
            updated = true;
          }
          return article;
        });
      }

      if (updated) {
        await content.save();
        updatedCount++;
      }
    }

    res.status(200).json({
      message: `Migration completed. Updated ${updatedCount} content documents.`,
      updatedCount,
    });
  } catch (error) {
    console.error("Migration failed:", error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
