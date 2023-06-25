import express from "express";
import { User } from "./users";
import { Expense } from "./expenses";
import { Product } from "./products";
import { Feature } from "./features";
import { Order } from "./orders";
import { Email } from "./emails";
import { Affiliate } from "./affiliates";
import { Content } from "./contents";
import { Paycheck } from "./paychecks";
import { Parcel } from "./parcels";
import Chip from "./chips/chip";
import { snake_case } from "../util";
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

const router = express.Router();

router.route("/users").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const users = await User.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/expenses").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const expenses = await Expense.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/products").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const products = await Product.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/features").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const features = await Feature.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/orders").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const orders = await Order.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/emails").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const emails = await Email.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/affiliates").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const affiliates = await Affiliate.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/paychecks").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const paychecks = await Paycheck.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/parcels").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const parcels = await Parcel.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/chips").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const chips = await Chip.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/filaments").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const filaments = await Filament.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/contents").put(isAuth, isAdmin, async (req: any, res: any) => {
  try {
    const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
    let parameter: any = {};
    if (search_parameter_field && search_parameter) {
      parameter = { [search_parameter_field]: search_parameter };
    }
    if (method === "updateMany") {
      const contents = await Content.updateMany(parameter, {
        [action]: { [property]: value }
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
router.route("/product_sale_price").put(isAuth, isAdmin, async (req: any, res: any) => {
  const products = await Product.find({});

  const sale_start_date = req.body.sale_start_date;
  const sale_end_date = req.body.sale_end_date;
  products
    // .filter((product: any) => !product.hidden)
    .forEach(async (product: any) => {
      const main_discount = product.price * req.body.discount_percentage;
      await Product.updateOne(
        { _id: product._id },
        {
          sale_price: product.price - main_discount,
          sale_start_date,
          sale_end_date
        }
      );
    });
  res.send(products);
});
router.route("/clear_sale").put(isAuth, isAdmin, async (req: any, res: any) => {
  const products = await Product.find({});
  const cleared_sale_price = 0;
  const sale_start_date = req.body.sale_start_date;
  const sale_end_date = req.body.sale_end_date;
  products
    // .filter((product: any) => !product.hidden)
    .forEach(async (product: any) => {
      await Product.updateOne({ _id: product._id }, { sale_price: cleared_sale_price, sale_start_date, sale_end_date });
    });
  res.send(products);
});
router.route("/make_emails_lowercase").put(isAuth, isAdmin, async (req: any, res: any) => {
  const users = await User.find({ email: { $exists: true } });
  users.forEach(async (user: any) => {
    const userss: any = await User.findOne({ _id: user._id });
    const updated_user: any = new User(userss);
    // Check if user exists
    if (userss.email !== userss.email.toLowerCase()) {
      const same_user: any = await User.findOne({
        email: userss.email.toLowerCase()
      });
      if (!same_user) {
        updated_user.email = updated_user.email.toLowerCase();
        await updated_user.save();
      } else if (same_user) {
        const orders: any = await Order.find({ user: updated_user._id });
        orders.forEach(async (order: any) => {
          // const orderss: any = await Order.findOne({ _id: order._id });

          const updated_order: any = new Order(order);
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
router.route("/find_duplicate_emails").put(async (req: any, res: any) => {
  // get all users with email
  const users = await User.find({ email: { $exists: true } });

  // // find all emails that are not lowercase
  const not_lowercase = users.filter((user: any) => user.email !== user.email.toLowerCase());

  // // find all emails that have duplicates to the lowercase version
  const duplicates = not_lowercase.filter((user: any) => {
    const lowercase = user.email.toLowerCase();
    const same_email = users.filter((user: any) => user.email === lowercase);
    return same_email.length > 1;
  });

  // // delete all uppercase email users and update all records that are associated with that user id to the lowercase version email user id
  // duplicates.forEach(async (user: any) => {
  //   const lowercase = user.email.toLowerCase();
  //   const same_email = users.filter((user: any) => user.email === lowercase);
  //   const lowercase_user = same_email[0];
  //   const orders: any = await Order.find({ user: user._id });
  //   orders.forEach(async (order: any) => {
  //     const updated_order: any = new Order(order);
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
  // const valueArr = users.map((item: any) => item.email).sort();

  // const isDuplicate = valueArr.some((item: any, idx: any) => {
  //   return valueArr.indexOf(item) != idx;
  // });

  // res.send(valueArr);
  res.send("Done");
});
router.route("/update_order_items").put(async (req: any, res: any) => {
  const order = await Order.updateMany(
    {
      "orderItems.category": {
        $regex: "frosted_diffusers",
        $options: "i"
      }
    },
    {
      // $rename: { shipping_price: 'volume' }
      $set: {
        "orderItems.$.category": "diffusers"
      }
      // $unset: { shipping_price: 1 }
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(order);
});
router.route("/update_diffuser_caps_product_name").put(async (req: any, res: any) => {
  // const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
  const products = await Product.find({});

  const diffuser_caps = products.filter((product: any) => product.category === "diffuser_caps");

  diffuser_caps.forEach(async (product: any) => {
    product.name = product.name + " V4";
    const result = await product.save();
  });
  //
  res.send(products);
});
router.route("/convert_away_from_count_in_stock").put(async (req: any, res: any) => {
  const products = await Product.updateMany(
    {},
    {
      $rename: { countInStock: "count_in_stock" },
      $set: {
        quantity: 20
      }
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/remove_countInStock").put(async (req: any, res: any) => {
  const products = await Product.updateMany(
    {},
    {
      $unset: { countInStock: 1 }
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/change_size_to_string").put(async (req: any, res: any) => {
  const products = await Product.find({ deleted: false });
  //
  // const diffuser_caps = products.filter((product: any) => product.category === 'diffuser_caps');

  products.forEach(async (product: any) => {
    product.sizing = product.size ? `${product.size}` : "";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/remove_size").put(async (req: any, res: any) => {
  const products = await Product.updateMany(
    {},
    {
      $unset: { size: 1 }
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/rename_sizing_to_size").put(async (req: any, res: any) => {
  const products = await Product.updateMany(
    {},
    {
      $rename: { sizing: "size" }
    },
    { multi: true }
  );

  res.send(products);
});
router.route("/remove_product_options").put(async (req: any, res: any) => {
  const products = await Product.updateMany(
    {},
    {
      // $rename: { shipping_price: 'volume' }
      // $set: {
      // 	product_options: []
      // }
      $unset: { product_options: 1 }
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(products);
});
router.route("/add_vortex_option_to_diffusers").put(async (req: any, res: any) => {
  // const products = await Product.find({
  //   deleted: false,
  //   category: "diffusers",
  // });
  const products = await Product.updateMany(
    {
      deleted: false,
      category: "diffusers"
    },
    {
      // $rename: { shipping_price: 'volume' }
      $set: {
        option_product_group: true,
        option_products: ["62732d2853e344002be8037f", "6261b1fd2fc16b002b58c2f7"]
      }
      // $unset: { product_options: 1 },
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(products);
});
router.route("/clozd_glowframez").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "glow_casings",
    subcategory: "nova"
  });

  products.forEach(async (product: any) => {
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
router.route("/opyn_glowskinz").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "glow_casings"
  });

  products.forEach(async (product: any) => {
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
router.route("/clozd_novaskinz").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "glowskins",
    subcategory: "novaskins"
  });

  products.forEach(async (product: any) => {
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
router.route("/clozd_alt_novaskinz").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "glowskins",
    subcategory: "alt_novaskins"
  });

  products.forEach(async (product: any) => {
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
router.route("/clozd_skin_color_options").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "colors",
    name: {
      $regex: "skins",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    const product_name = product.name.replace(product.name.split(" ")[0], product.name.split(" ")[0] + " CLOZD").replace("skins", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_skin_size_options").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "sizes",
    name: {
      $regex: "skins",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    const product_name = "CLOZD " + product.name.replace("skins", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_casing_color_options").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "colors",
    name: {
      $regex: "Casings",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
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
router.route("/clozd_casing_size_options").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "options",
    subcategory: "sizes",
    name: {
      $regex: "Casings",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    const product_name = "CLOZD " + product.name.replace(" Glow Casings", "skinz");
    product.included_items = product.included_items.replace(product.name, product_name);
    product.meta_title = product.included_items.replace(product.name, product_name);
    product.name = product_name;
    product.pathname = snake_case(product_name);
    const result = await product.save();
  });

  res.send(products);
});
router.route("/clozd_glowskinz").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "glowskins",
    subcategory: "classics"
  });

  products.forEach(async (product: any) => {
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
router.route("/update_frosted_domes_items").put(async (req: any, res: any) => {
  // const order: any = await Order.find({
  //   "orderItems.0.name": "Frosted Dome Diffusers",
  // });
  const order = await Order.updateMany(
    {
      "orderItems.0.name": "Frosted Dome Diffusers"
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
        "orderItems.0.color_product_name": "Frosted Dome Diffusers"
      }
      // $unset: { shipping_price: 1 }
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(order);
});
router.route("/update_translucent_white_domes_items").put(async (req: any, res: any) => {
  // const order: any = await Order.find({
  //   "orderItems.0.name": "Frosted Dome Diffusers",
  // });
  const order = await Order.updateMany(
    {
      "orderItems.0.name": "Dome Diffusers",
      "orderItems.0.color": "Translucent White"
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
        "orderItems.0.color_product_name": "Frosted Dome Diffusers"
      }
      // $unset: { shipping_price: 1 }
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(order);
});
router.route("/updated_capez_price").put(async (req: any, res: any) => {
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
        $options: "i"
      }
    },
    {
      // $rename: { shipping_price: 'volume' }
      $set: {
        price: 4
      }
      // $unset: { product_options: 1 },
    },
    { multi: true }
    // { upsert: true }
  );

  res.send(products);
});
router.route("/vortex_language").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "diffusers"
  });

  products.forEach(async (product: any) => {
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
router.route("/processing_time_diffusers").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "diffusers"
  });

  products.forEach(async (product: any) => {
    product.processing_time = [2, 5];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_exo_diffusers").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "exo_diffusers"
  });

  products.forEach(async (product: any) => {
    product.processing_time = [3, 6];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_diffuser_caps").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "diffuser_caps"
  });

  products.forEach(async (product: any) => {
    product.processing_time = [3, 6];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_decals").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "decals"
  });

  products.forEach(async (product: any) => {
    product.processing_time = [3, 6];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_gloves").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: { $in: ["gloves"] }
  });

  products.forEach(async (product: any) => {
    product.processing_time = [1, 3];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_glowskinz").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: { $in: ["glowskinz"] }
  });

  products.forEach(async (product: any) => {
    product.processing_time = [3, 7];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_glowstringz").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: { $in: ["glowstringz"] }
  });

  products.forEach(async (product: any) => {
    product.processing_time = [6, 10];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_battery_coin").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "batteries",
    subcategory: "coin"
  });

  products.forEach(async (product: any) => {
    product.processing_time = [1, 3];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/processing_time_battery_storage").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    category: "batteries",
    subcategory: "storage"
  });

  products.forEach(async (product: any) => {
    product.processing_time = [5, 8];
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_clear_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#4b4b4b",
    name: {
      $regex: "Skin",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62b12ad5e9a1c4705bd04412";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_clear_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#4b4b4b",
    name: {
      $regex: "Sled",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62afae4e01f26dbb73774e19";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_frosted_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "white",
    name: {
      $regex: "Skin",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62afaee901f26dbb73774e3d";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_frosted_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#abaeb5"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afae6901f26dbb73774e1f";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_red_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#c11c22",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62afad6101f26dbb73774df0";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_red_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    product_collection: "secondary_colors",
    color_code: "#c11c22"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afad4701f26dbb73774de4";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_emerald_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#15715a"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afadb301f26dbb73774e01";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_green_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#00c700"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afad7701f26dbb73774df6";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_teal_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#1da5b3"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afadee01f26dbb73774e07";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_blue_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#0014ff",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62afae1901f26dbb73774e0d";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_blue_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#0014ff"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afae8301f26dbb73774e25";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_violet_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#543abb",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62afad1901f26dbb73774ddd";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_violet_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color_code: "#543abb"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afad0c01f26dbb73774dd7";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_purple_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Purple",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62afae3001f26dbb73774e13";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_purple_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Purple"
    // color_code: "purple",
  });

  products.forEach(async (product: any) => {
    product.filament = "62afae9d01f26dbb73774e2b";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_black_tpu").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Black",
    product_collection: "colors",
    pathname: {
      $regex: "_skin",
      $options: "i"
    }
  });

  products.forEach(async (product: any) => {
    product.filament = "62afaeb801f26dbb73774e37";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_black_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    color: "Black"
    // color_code: "purple",
  });

  products.forEach(async (product: any) => {
    product.filament = "62afaeb101f26dbb73774e31";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/adding_white_petg").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    // color: "White",
    color_code: "white"
  });

  products.forEach(async (product: any) => {
    product.filament = "62afaef401f26dbb73774e43";
    const result = await product.save();
  });

  res.send(products);
});
router.route("/options_no_filament").put(async (req: any, res: any) => {
  const products = await Product.find({
    deleted: false,
    option: true,
    filament: null,
    color: ""
    // filament: { $exists: false },
    // filament: { $type: 10 },
  });

  // products.forEach(async (product: any) => {
  //   product.filament = "62afaef401f26dbb73774e43";
  //   const result = await product.save();
  // });

  res.send(products);
});
router.route("/delete_multiple_products").put(async (req: any, res: any) => {
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
        "60ee86a2701941002a37669c"
      ]
    }
  });

  res.send(product);
});
// router.route("/get_all_referenced_options_not_hidden").put(async (req: any, res: any) => {
//   const products = await Product.find({ deleted: false, hidden: false });

//   const ids = products.map((product: any) => product._id);
//   const color_product_ids = _.flatten(products.map((product: any) => product.color_products));

//   const secondary_color_product_ids = _.flatten(products.map((product: any) => product.secondary_color_products));

//   const option_product_ids = _.flatten(products.map((product: any) => product.option_products));
//   // const not_associated_products = await Product.find({
//   //   option: true,
//   //   color_products: { $nin: ids },
//   // });
//   //
//   res.send([...color_product_ids, ...secondary_color_product_ids, ...option_product_ids]);
// });
// router.route("/get_all_referenced_options").put(async (req: any, res: any) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product: any) => product._id);
//   const color_product_ids = _.flatten(products.map((product: any) => product.color_products));

//   const secondary_color_product_ids = _.flatten(products.map((product: any) => product.secondary_color_products));

//   const option_product_ids = _.flatten(products.map((product: any) => product.option_products));
//   // const not_associated_products = await Product.find({
//   //   option: true,
//   //   color_products: { $nin: ids },
//   // });
//   //
//   res.send([...color_product_ids, ...secondary_color_product_ids, ...option_product_ids]);
// });
router.route("/all_options").put(async (req: any, res: any) => {
  const products = await Product.find({ deleted: false, option: true });
  //
  const ids = products.map((product: any) => {
    return {
      id: product._id,
      name: product.name,
      pathname: product.pathname
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
router.route("/all_products").put(async (req: any, res: any) => {
  const products = await Product.find({ deleted: false });
  //
  const ids = products.map((product: any) => {
    return {
      id: product._id,
      name: product.name,
      pathname: product.pathname
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
router.route("/add_shipping").put(async (req: any, res: any) => {
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
    country: ""
  };
  // Loop through users and add shipping
  users.forEach(async (user: any) => {
    const u: any = await User.findOne({ _id: user._id });
    const updated_user: any = new User(u);
    updated_user.shipping = shipping;
    await updated_user.save();
  });

  res.send(users);
});
router.route("/add_public_url").put(async (req: any, res: any) => {
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
    country: ""
  };
  // Loop through users and add shipping
  users.forEach(async (user: any) => {
    const u: any = await User.findOne({ _id: user._id });
    const updated_user: any = new User(u);
    updated_user.shipping = shipping;
    await updated_user.save();
  });

  res.send(users);
});
router.route("/update_all_orders_easy_post_tracking_url").put(async (req: any, res: any) => {
  // Get all orders that arent deleted
  const orders = await Order.find({ deleted: false });
  // Loop through orders and update easy_post_tracking_url
  orders.forEach(async (order: any) => {
    const o: any = await Order.findOne({ _id: order._id });
    const updated_order: any = new Order(o);
    updated_order.tracking_url = order.easy_post_tracking_url;
    await updated_order.save();
  });
});
router.route("/update_refund_price").put(async (req: any, res: any) => {
  try {
    // // find all orders with isRefunded: true
    const orders = await Order.find({ deleted: false, isRefunded: true });

    const refunds = orders.map((order: any) => {
      // Update refundPrice with the refund amount
      const totalRefunds = order.payment?.refund.reduce((acc: number, curr: { amount: number }) => {
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
// router.route("/get_all_referenced_color_options").put(async (req: any, res: any) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product: any) => product._id);
//   const color_product_ids = _.flatten(products.map((product: any) => product.color_products));

//   res.send(color_product_ids);
// });
// router.route("/get_all_referenced_secondary_color_options").put(async (req: any, res: any) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product: any) => product._id);
//   const color_product_ids = _.flatten(products.map((product: any) => product.secondary_color_products));

//   res.send(color_product_ids);
// });
// router.route("/get_all_referenced_option_options").put(async (req: any, res: any) => {
//   const products = await Product.find({ deleted: false });

//   const ids = products.map((product: any) => product._id);
//   const color_product_ids = _.flatten(products.map((product: any) => product.option_products));

//   res.send(color_product_ids);
// });

router.route("/create_image_records_and_reference_them_in_product").put(async (req: any, res: any) => {
  const products = await Product.find({ deleted: false }).sort({ order: 1 });

  const processProduct = async (product: any) => {
    const { _id, name } = product;
    const imagesToUpdate = [
      { array: "images", object: "images_object" },
      { array: "color_images", object: "color_images_object" },
      { array: "secondary_color_images", object: "secondary_color_images_object" },
      { array: "option_images", object: "option_images_object" },
      { array: "secondary_images", object: "secondary_images_object" }
    ];

    for (const { array, object } of imagesToUpdate) {
      if (product[array] && product[array].length > 0) {
        const newImageIds = await Promise.all(
          product[array].map(async (imageUrl: string) => {
            const response: any = await Image.create({ link: imageUrl, album: name });
            return response._id;
          })
        );

        const update_product: any = await Product.findOne({ _id });
        if (update_product) {
          await Product.updateOne({ _id }, { [object]: newImageIds });
        }
      }
    }
  };

  await Promise.all(products.map(processProduct));
  res.send(products);
});
router.route("/create_category_records_and_reference_them_in_product").put(async (req: any, res: any) => {
  const findOrCreateCategory = async (name: any) => {
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
router.route("/delete_old_carts").put(async (req: any, res: any) => {
  try {
    // Get the ids of the most recent cart for each user
    const mostRecentCarts = await Cart.aggregate([
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$user", cart: { $first: "$_id" } } },
      { $match: { _id: { $ne: null } } } // Exclude carts with no user
    ]);

    const mostRecentCartIds = mostRecentCarts.map(c => c.cart);
    console.log({ mostRecentCartIds });

    // Delete all carts that are not in the list of most recent cart ids
    // And carts with no user
    const result = await Cart.deleteMany({
      $or: [{ _id: { $nin: mostRecentCartIds } }, { user: null }]
    });

    console.log(`Deleted ${result.deletedCount} extra carts.`);
  } catch (err) {
    console.error("An error occurred:", err);
  }
});
router.route("/make_expenses_positive").put(async (req: any, res: any) => {
  try {
    const expenses = await Expense.find({ deleted: false });
    const updated_expenses = expenses.map(async (expense: any) => {
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
router.route("/card_migration").put(async (req: any, res: any) => {
  try {
    // Replace FID with Fidelity 7484 in expenses
    const expenses = await Expense.find({ deleted: false });
    const updated_expenses = expenses.map(async (expense: any) => {
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
router.route("/airtable_invoice_download").put(async (req: any, res: any) => {
  try {
    // Replace FID with Fidelity 7484 in expenses
    const expenses = await Expense.find({ deleted: false });

    expenses.forEach(async (expense: any) => {
      if (expense.airtable_invoice_links && expense.airtable_invoice_links.length > 0) {
        expense.airtable_invoice_links.forEach(async (link: any, index: any) => {
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
router.route("/link_documents_to_expenses").put(async (req: any, res: any) => {
  try {
    // Get the path to the temp directory
    const tempDir = path.join(appRoot.path, "temp");

    // Read the files from the temp directory
    const files = fs
      .readdirSync(tempDir)
      .filter(file => [".jpg", ".jpeg", ".png", ".gif"].includes(path.extname(file).toLowerCase()))
      .map(file => ({
        name: file,
        path: path.join(tempDir, file)
      }));

    // Group the files by airtable_id
    const filesByAirtableId: { [key: string]: any[] } = {};
    for (const file of files) {
      // Split the filename by underscore
      const splitName = file.name.split("_");
      const airtable_id: any = splitName.shift();
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
            headers: { Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}` }
          }
        );
        const album = albumResponse.data.data;

        for (const image of files) {
          const imageData = fs.createReadStream(image.path);
          const imgResponse = await axios.post("https://api.imgur.com/3/image", imageData, {
            headers: {
              Authorization: `Client-ID ${config.IMGUR_ClIENT_ID}`,
              "Content-Type": "multipart/form-data"
            },
            params: { album: album.deletehash }
          });
          uploadedImageLinks.push(imgResponse.data.data.link);
        }

        const images: any = await Promise.all(
          uploadedImageLinks.map(async (link: any) => {
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
router.route("/export_expenses_as_csv").put(async (req: any, res: any) => {
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
router.route("/delete_all_expenses").put(async (req: any, res: any) => {
  try {
    // Delete all expenses
    await Expense.deleteMany({});
    res.status(200).send({ message: "Expenses Deleted" });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
// (expense.card === "Joint Amex 1006")
// (expense.card === "Fidelity 7484")
// (expense.card === "Covantage 0933")
// (expense.card === "Amazon 9204")
// (expense.card === "Amazon Business 1004")
// (expense.card === "Destanye 1991")
// (expense.card === "Amazon Business 1005")
// (expense.card === "Stripe")
// (expense.card === "Chase 2365")
// (expense.card === "Joint Amex 2012")
// (expense.card === "Amazon 4654")
// (expense.card === "Mastercard 2713")
// (expense.card === "Amazon Business 1004")
// (expense.card === "Amazon Business 0584")
//  (expense.card === "Charles Schwab 9432")
//  (expense.card === "Charles Schwab 7633")
//  (expense.card === "Venmo Balance")
//  (expense.card === "Charles Schwab 2628")
// (expense.card === "Venmo balance")
// (expense.card === "Covantage 7060")
// (expense.card === "Mastercard 7404")
