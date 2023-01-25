import { User, Expense, Product, Feature, Order, Email, Affiliate, Content, Paycheck, Parcel, Chip } from "../models";
import { onlyUnique, snake_case } from "../util";
const _ = require("lodash");

export default {
  find_all_users: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_expenses: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_products: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_features: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_orders: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_emails: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_affiliates: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_contents: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_paychecks: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_parcels: async (req: any, res: any) => {
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
    } catch (error) {}
  },
  find_all_chips: async (req: any, res: any) => {
    try {
      //
      const { method, collection, search_parameter_field, search_parameter, action, property, value } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const chips = await Chip.updateMany(parameter, {
          [action]: { [property]: value }
        });
        //
        res.send(chips);
      } else {
        const chips = await Chip.find(parameter);
        //
        res.send(chips);
      }
    } catch (error) {}
  },
  update_product_sale_price: async (req: any, res: any) => {
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
  },
  update_clear_sale: async (req: any, res: any) => {
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
  },
  make_emails_lowercase: async (req: any, res: any) => {
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
  },
  find_duplicate_emails: async (req: any, res: any) => {
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

    console.log({ duplicates });
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
  },
  update_order_items: async (req: any, res: any) => {
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
  },
  update_diffuser_caps_product_name: async (req: any, res: any) => {
    // const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
    const products = await Product.find({});

    const diffuser_caps = products.filter((product: any) => product.category === "diffuser_caps");

    diffuser_caps.forEach(async (product: any) => {
      product.name = product.name + " V4";
      const result = await product.save();
    });
    //
    res.send(products);
  },
  convert_away_from_count_in_stock: async (req: any, res: any) => {
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
  },
  remove_countInStock: async (req: any, res: any) => {
    const products = await Product.updateMany(
      {},
      {
        $unset: { countInStock: 1 }
      },
      { multi: true }
    );

    res.send(products);
  },
  change_size_to_string: async (req: any, res: any) => {
    const products = await Product.find({ deleted: false });
    //
    // const diffuser_caps = products.filter((product: any) => product.category === 'diffuser_caps');

    products.forEach(async (product: any) => {
      product.sizing = product.size ? `${product.size}` : "";
      const result = await product.save();
    });

    res.send(products);
  },
  remove_size: async (req: any, res: any) => {
    const products = await Product.updateMany(
      {},
      {
        $unset: { size: 1 }
      },
      { multi: true }
    );

    res.send(products);
  },
  rename_sizing_to_size: async (req: any, res: any) => {
    const products = await Product.updateMany(
      {},
      {
        $rename: { sizing: "size" }
      },
      { multi: true }
    );

    res.send(products);
  },
  remove_product_options: async (req: any, res: any) => {
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
  },
  add_vortex_option_to_diffusers: async (req: any, res: any) => {
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
  },

  clozd_glowframez: async (req: any, res: any) => {
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
  },
  opyn_glowskinz: async (req: any, res: any) => {
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
  },
  clozd_novaskinz: async (req: any, res: any) => {
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
  },
  clozd_alt_novaskinz: async (req: any, res: any) => {
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
  },
  clozd_skin_color_options: async (req: any, res: any) => {
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
  },
  clozd_skin_size_options: async (req: any, res: any) => {
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
  },
  clozd_casing_color_options: async (req: any, res: any) => {
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
  },
  clozd_casing_size_options: async (req: any, res: any) => {
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
  },
  clozd_glowskinz: async (req: any, res: any) => {
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
  },
  update_frosted_domes_items: async (req: any, res: any) => {
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
  },
  update_translucent_white_domes_items: async (req: any, res: any) => {
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
  },
  updated_capez_price: async (req: any, res: any) => {
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
  },
  vortex_language: async (req: any, res: any) => {
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
  },
  processing_time_diffusers: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "diffusers"
    });

    products.forEach(async (product: any) => {
      product.processing_time = [2, 5];
      const result = await product.save();
    });

    res.send(products);
  },
  processing_time_exo_diffusers: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "exo_diffusers"
    });

    products.forEach(async (product: any) => {
      product.processing_time = [3, 6];
      const result = await product.save();
    });

    res.send(products);
  },
  processing_time_diffuser_caps: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "diffuser_caps"
    });

    products.forEach(async (product: any) => {
      product.processing_time = [3, 6];
      const result = await product.save();
    });

    res.send(products);
  },
  processing_time_decals: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "decals"
    });

    products.forEach(async (product: any) => {
      product.processing_time = [3, 6];
      const result = await product.save();
    });

    res.send(products);
  },
  processing_time_gloves: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: { $in: ["gloves"] }
    });

    products.forEach(async (product: any) => {
      product.processing_time = [1, 3];
      const result = await product.save();
    });

    res.send(products);
  },
  processing_time_glowskinz: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: { $in: ["glowskinz"] }
    });

    products.forEach(async (product: any) => {
      product.processing_time = [3, 7];
      const result = await product.save();
    });

    res.send(products);
  },
  processing_time_glowstringz: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: { $in: ["glowstringz"] }
    });

    products.forEach(async (product: any) => {
      product.processing_time = [6, 10];
      const result = await product.save();
    });

    res.send(products);
  },
  processing_time_battery_coin: async (req: any, res: any) => {
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
  },
  processing_time_battery_storage: async (req: any, res: any) => {
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
  },

  adding_clear_tpu: async (req: any, res: any) => {
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
  },
  adding_clear_petg: async (req: any, res: any) => {
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
  },

  adding_frosted_tpu: async (req: any, res: any) => {
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
  },
  adding_frosted_petg: async (req: any, res: any) => {
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
  },
  adding_red_tpu: async (req: any, res: any) => {
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
  },
  adding_red_petg: async (req: any, res: any) => {
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
  },
  adding_emerald_tpu: async (req: any, res: any) => {
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
  },
  adding_green_petg: async (req: any, res: any) => {
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
  },
  adding_teal_tpu: async (req: any, res: any) => {
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
  },
  adding_blue_tpu: async (req: any, res: any) => {
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
  },
  adding_blue_petg: async (req: any, res: any) => {
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
  },
  adding_violet_tpu: async (req: any, res: any) => {
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
  },
  adding_violet_petg: async (req: any, res: any) => {
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
  },
  adding_purple_tpu: async (req: any, res: any) => {
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
  },
  adding_purple_petg: async (req: any, res: any) => {
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
  },
  adding_black_tpu: async (req: any, res: any) => {
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
  },
  adding_black_petg: async (req: any, res: any) => {
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
  },
  adding_white_petg: async (req: any, res: any) => {
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
  },
  options_no_filament: async (req: any, res: any) => {
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
  },
  delete_multiple_products: async (req: any, res: any) => {
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
  },
  get_all_referenced_options_not_hidden: async (req: any, res: any) => {
    const products = await Product.find({ deleted: false, hidden: false });

    const ids = products.map((product: any) => product._id);
    const color_product_ids = _.flatten(products.map((product: any) => product.color_products));

    const secondary_color_product_ids = _.flatten(products.map((product: any) => product.secondary_color_products));

    const option_product_ids = _.flatten(products.map((product: any) => product.option_products));
    // const not_associated_products = await Product.find({
    //   option: true,
    //   color_products: { $nin: ids },
    // });
    //
    res.send([...color_product_ids, ...secondary_color_product_ids, ...option_product_ids]);
  },
  get_all_referenced_options: async (req: any, res: any) => {
    const products = await Product.find({ deleted: false });

    const ids = products.map((product: any) => product._id);
    const color_product_ids = _.flatten(products.map((product: any) => product.color_products));

    const secondary_color_product_ids = _.flatten(products.map((product: any) => product.secondary_color_products));

    const option_product_ids = _.flatten(products.map((product: any) => product.option_products));
    // const not_associated_products = await Product.find({
    //   option: true,
    //   color_products: { $nin: ids },
    // });
    //
    res.send([...color_product_ids, ...secondary_color_product_ids, ...option_product_ids]);
  },

  all_options: async (req: any, res: any) => {
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
  },
  all_products: async (req: any, res: any) => {
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
  },
  get_all_referenced_color_options: async (req: any, res: any) => {
    const products = await Product.find({ deleted: false });

    const ids = products.map((product: any) => product._id);
    const color_product_ids = _.flatten(products.map((product: any) => product.color_products));

    res.send(color_product_ids);
  },
  get_all_referenced_secondary_color_options: async (req: any, res: any) => {
    const products = await Product.find({ deleted: false });

    const ids = products.map((product: any) => product._id);
    const color_product_ids = _.flatten(products.map((product: any) => product.secondary_color_products));

    res.send(color_product_ids);
  },
  get_all_referenced_option_options: async (req: any, res: any) => {
    const products = await Product.find({ deleted: false });

    const ids = products.map((product: any) => product._id);
    const color_product_ids = _.flatten(products.map((product: any) => product.option_products));

    res.send(color_product_ids);
  },
  add_shipping: async (req: any, res: any) => {
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
  },
  get_product_quantities: async (req: any, res: any) => {
    const products = await Order.aggregate([
      {
        $match: { deleted: false }
      },
      {
        $unwind: "$orderItems"
      },
      {
        $group: {
          _id: "$orderItems.product",
          quantity: { $sum: "$orderItems.qty" }
        }
      }
    ]);

    // Loop through products and get the name
    const products_with_names = await Promise.all(
      products.map(async (product: any) => {
        // Get the product
        const p = await Product.findOne({ _id: product._id });
        // Return the product with the name
        return {
          name: p ? p.name : "No Name",
          category: p ? p.category : "No Category",
          quantity: product.quantity
        };
      })
    );

    res.send(products_with_names);
  },
  get_category_quantities: async (req: any, res: any) => {
    const products = await Order.aggregate([
      {
        $match: { deleted: false }
      },
      {
        $unwind: "$orderItems"
      },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $group: {
          _id: "$product.category",
          quantity: { $sum: "$orderItems.qty" }
        }
      }
    ]);

    // // Loop through products and get the name
    // const products_with_names = await Promise.all(
    //   products.map(async (product: any) => {
    //     // Get the product
    //     const p = await Product.findOne({ _id: product._id });
    //     // Return the product with the name
    //     return {
    //       name: p ? p.name : "No Name",
    //       category: p ? p.category : "No Category",
    //       quantity: product.quantity
    //     };
    //   })
    // );

    res.send(products);
  }
  // all_no_reference: async (req: any, res: any) => {
  //   const products = await Product.find({ deleted: false, option: true });
  //   //
  //   const ids = products.map((product: any) => {
  //     return {
  //       id: product._id,
  //       name: product.name,
  //       pathname: product.pathname,
  //     };
  //   });
  //   // .flat()
  //   // .filter(onlyUnique);
  //
  //   // const not_associated_products = await Product.find({
  //   //   option: true,
  //   //   color_products: { $nin: ids },
  //   // });
  //   //
  //   res.send(ids);
  // },

  // all_no_reference: async (req: any, res: any) => {
  //   const products = await Product.find({ deleted: false, hidden: false });
  //   const option_products = await Product.find({
  //     deleted: false,
  //     option: true,
  //   });

  //   //
  //   // const ids = products.map((product: any) => product._id);
  //   // const color_product_ids_no = products.map(
  //   //   (product: any) => product.color_products
  //   // );
  //   // const color_product_ids_no = _.flatten(
  //   //   products.map((product: any) => product.color_products)
  //   // );

  //   // const secondary_color_product_ids_no = _.flatten(
  //   //   products.map((product: any) => product.secondary_color_products)
  //   // );
  //   const color_product_ids = _.flatten(
  //     products.map((product: any) => product.color_products)
  //   );

  //   const secondary_color_product_ids = _.flatten(
  //     products.map((product: any) => product.secondary_color_products)
  //   );
  //   //
  //   //   color_product_ids_no_length: color_product_ids_no.length,
  //   //   secondary_color_product_ids_no_length:
  //   //     secondary_color_product_ids_no.length,
  //   //   color_product_ids_length: color_product_ids.length,
  //   //   secondary_color_product_ids_length: secondary_color_product_ids.length,
  //   // });

  //   const option_product_ids = option_products.map(
  //     (product: any) => product._id
  //   );

  //   const colors = [
  //     ...color_product_ids,
  //     ...secondary_color_product_ids,
  //   ].sort();

  //   let new_array: any[] = [];
  //   for (let i = 0; i < colors.length; i++) {
  //     const color = colors[i];
  //     const next_color = colors[i + 1];
  //     if (color !== next_color) {
  //
  //       new_array = [];
  //       // new_array = [ ...new_array, color ];
  //     }
  //   }

  //   // const colors = [
  //   //   ...new Set([ ...color_product_ids, ...secondary_color_product_ids ]),
  //   // ];
  //   const associated_options_ids = _.uniq([
  //     ...color_product_ids,
  //     ...secondary_color_product_ids,
  //   ]);
  //   // .flat()
  //   // .filter(onlyUnique);
  //   //
  //   //

  //   // const not_associated_ids = option_product_ids.filter((item: any) => {
  //   //   return !associated_options_ids.includes(item);
  //   // });
  //   const not_associated_ids = _.difference(
  //     option_product_ids,
  //     associated_options_ids
  //   );

  //   //   const not_associated_products = await Product.find({
  //   //   option: true,
  //   //   color_products: { $nin: ids },
  //   // });
  //   //
  //   // const not_associated_products = await Product.find({
  //   //   option: true,
  //   //   color_products: { $nin: ids },
  //   // });
  //   //
  //   res.send({
  //     new_array,
  //   });
  //   // res.send({
  //   //   option_num: option_product_ids.length ? option_product_ids.length : 0,
  //   //   associated_options_num: associated_options_ids.length
  //   //     ? associated_options_ids.length
  //   //     : 0,
  //   //   not_associated_num: not_associated_ids.length
  //   //     ? not_associated_ids.length
  //   //     : 0,
  //   //   option_product_ids,
  //   //   associated_options_ids,
  //   //   not_associated_ids,
  //   // });
  // },
  // all_no_reference: async (req: any, res: any) => {
  //   const products = await Product.find({ option: true });
  //   //
  //   const ids = products.map((product: any) => product._id);
  //   // .flat()
  //   // .filter(onlyUnique);
  //
  //   // const not_associated_products = await Product.find({
  //   //   option: true,
  //   //   color_products: { $nin: ids },
  //   // });
  //   //
  //   res.send(ids);
  // },

  // all_no_reference: async (req: any, res: any) => {
  //   const products = await Product.find({
  //     hidden: false,
  //     options: true,
  //   }).aggregate([
  //     {
  //       $lookup: {
  //         from: "product", // <-- secondary collection name containing references to _id of 'a'
  //         localField: "_id", //  <-- the _id field of the 'a' collection
  //         foreignField: "secondary_product", // <-- the referencing field of the 'b' collection
  //         as: "references",
  //       },
  //     },

  //     {
  //       $match: {
  //         references: [],
  //       },
  //     },
  //   ]);
  //   res.send(products);
  // },
  // all_no_reference: async (req: any, res: any) => {
  //   const all_products = await Product.find({ hidden: false, options: true })
  //     .exec()
  //     .then((products: any) => {
  //       const productsIds = products.map((o: any) => o._id);
  //       return Product.find({ id: { $nin: productsIds } }).exec();
  //     })
  //     .then((companiesWithoutRefs: any) => {
  //       return companiesWithoutRefs;
  //     })
  //     .catch((err: any) => {
  //       throw new err();
  //     });
  //

  //   // products.forEach(async (product: any) => {
  //   //   product.filament = "62afaef401f26dbb73774e43";
  //   //   const result = await product.save();
  //   // });

  //   res.send(all_products);
  // },
};
