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
import config from "../config";
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
          button_link: "/pages/contact",
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
          button_link: "/pages/contact/custom_orders",
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
          button_link: "/pages/contact",
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
      { _id: "657355e106cccc0f7a160afa" },
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

export default router;
