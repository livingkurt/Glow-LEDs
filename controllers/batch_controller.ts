import {
  User,
  Expense,
  Product,
  Feature,
  Order,
  Email,
  Affiliate,
  Content,
  Paycheck,
  Parcel,
  Chip,
} from "../models";
import { snake_case } from "../util";

export default {
  find_all_users: async (req: any, res: any) => {
    try {
      console.log({ users: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const users = await User.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ users });
        res.send(users);
      } else {
        const users = await User.find(parameter);
        console.log({ users_get: users });
        res.send(users);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_expenses: async (req: any, res: any) => {
    try {
      console.log({ expenses: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const expenses = await Expense.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ expenses });
        res.send(expenses);
      } else {
        const expenses = await Expense.find(parameter);
        console.log({ expenses_get: expenses });
        res.send(expenses);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_products: async (req: any, res: any) => {
    try {
      console.log({ products: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const products = await Product.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ products });
        res.send(products);
      } else {
        const products = await Product.find(parameter);
        console.log({ products_get: products });
        res.send(products);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_features: async (req: any, res: any) => {
    try {
      console.log({ features: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const features = await Feature.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ features });
        res.send(features);
      } else {
        const features = await Feature.find(parameter);
        console.log({ features_get: features });
        res.send(features);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_orders: async (req: any, res: any) => {
    try {
      console.log({ orders: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const orders = await Order.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ orders });
        res.send(orders);
      } else {
        const orders = await Order.find(parameter);
        console.log({ orders_get: orders });
        res.send(orders);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_emails: async (req: any, res: any) => {
    try {
      console.log({ emails: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const emails = await Email.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ emails });
        res.send(emails);
      } else {
        const emails = await Email.find(parameter);
        console.log({ emails_get: emails });
        res.send(emails);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_affiliates: async (req: any, res: any) => {
    try {
      console.log({ affiliates: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const affiliates = await Affiliate.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ affiliates });
        res.send(affiliates);
      } else {
        const affiliates = await Affiliate.find(parameter);
        console.log({ affiliates_get: affiliates });
        res.send(affiliates);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_contents: async (req: any, res: any) => {
    try {
      console.log({ contents: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const contents = await Content.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ contents });
        res.send(contents);
      } else {
        const contents = await Content.find(parameter);
        console.log({ contents_get: contents });
        res.send(contents);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_paychecks: async (req: any, res: any) => {
    try {
      console.log({ paychecks: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const paychecks = await Paycheck.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ paychecks });
        res.send(paychecks);
      } else {
        const paychecks = await Paycheck.find(parameter);
        console.log({ paychecks_get: paychecks });
        res.send(paychecks);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_parcels: async (req: any, res: any) => {
    try {
      console.log({ parcels: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const parcels = await Parcel.updateMany(parameter, {
          [action]: { [property]: value },
        });
        console.log({ parcels });
        res.send(parcels);
      } else {
        const parcels = await Parcel.find(parameter);
        console.log({ parcels_get: parcels });
        res.send(parcels);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  find_all_chips: async (req: any, res: any) => {
    try {
      // console.log({ chips: req.body });
      const {
        method,
        collection,
        search_parameter_field,
        search_parameter,
        action,
        property,
        value,
      } = req.body;
      let parameter: any = {};
      if (search_parameter_field && search_parameter) {
        parameter = { [search_parameter_field]: search_parameter };
      }
      if (method === "updateMany") {
        const chips = await Chip.updateMany(parameter, {
          [action]: { [property]: value },
        });
        // console.log({ chips });
        res.send(chips);
      } else {
        const chips = await Chip.find(parameter);
        // console.log({ chips_get: chips });
        res.send(chips);
      }
    } catch (error) {
      console.log({ error });
      console.log({ error });
    }
  },
  update_product_sale_price: async (req: any, res: any) => {
    const products = await Product.find({});
    console.log({ discount_percentage: req.body.discount_percentage });
    const sale_start_date = req.body.sale_start_date;
    const sale_end_date = req.body.sale_end_date;
    products
      .filter((product: any) => !product.hidden)
      .forEach(async (product: any) => {
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
  },
  update_clear_sale: async (req: any, res: any) => {
    const products = await Product.find({});
    const cleared_sale_price = 0;
    const sale_start_date = req.body.sale_start_date;
    const sale_end_date = req.body.sale_end_date;
    products
      .filter((product: any) => !product.hidden)
      .forEach(async (product: any) => {
        await Product.updateOne(
          { _id: product._id },
          { sale_price: cleared_sale_price, sale_start_date, sale_end_date }
        );
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
        console.log("Yes Uppercase");
        console.log({
          original: userss.email,
          lower: userss.email.toLowerCase(),
        });
        const same_user: any = await User.findOne({
          email: userss.email.toLowerCase(),
        });
        if (!same_user) {
          console.log("No Same User");

          updated_user.email = updated_user.email.toLowerCase();
          await updated_user.save();
        } else if (same_user) {
          console.log("Yes Same User");
          console.log({ same_user });
          const orders: any = await Order.find({ user: updated_user._id });
          orders.forEach(async (order: any) => {
            // const orderss: any = await Order.findOne({ _id: order._id });
            console.log("Order Change User");
            const updated_order: any = new Order(order);
            updated_order.shipping.email = same_user.email;
            updated_order.user = same_user._id;
            updated_order.save();
          });
          console.log("Delete User");
          updated_user.deleted = true;
          await updated_user.save();
        }
      }
    });
    res.send("Done");
  },
  find_duplicate_emails: async (req: any, res: any) => {
    const users = await User.find({ email: { $exists: true } });
    const valueArr = users.map((item: any) => item.email).sort();
    console.log({ valueArr });
    const isDuplicate = valueArr.some((item: any, idx: any) => {
      return valueArr.indexOf(item) != idx;
    });
    console.log({ valueArr });
    res.send(valueArr);
  },
  update_order_items: async (req: any, res: any) => {
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
    console.log({ order });
    res.send(order);
  },
  update_diffuser_caps_product_name: async (req: any, res: any) => {
    // const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
    const products = await Product.find({});
    console.log({ discount_percentage: req.body.discount_percentage });
    const diffuser_caps = products.filter(
      (product: any) => product.category === "diffuser_caps"
    );

    diffuser_caps.forEach(async (product: any) => {
      product.name = product.name + " V4";
      const result = await product.save();
      console.log({ result });
    });
    // console.log({ products });
    res.send(products);
  },
  convert_away_from_count_in_stock: async (req: any, res: any) => {
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
  },
  remove_countInStock: async (req: any, res: any) => {
    const products = await Product.updateMany(
      {},
      {
        $unset: { countInStock: 1 },
      },
      { multi: true }
    );

    res.send(products);
  },
  change_size_to_string: async (req: any, res: any) => {
    const products = await Product.find({ deleted: false });
    // console.log({ discount_percentage: req.body.discount_percentage });
    // const diffuser_caps = products.filter((product: any) => product.category === 'diffuser_caps');

    products.forEach(async (product: any) => {
      product.sizing = product.size ? `${product.size}` : "";
      const result = await product.save();
      console.log({ result });
    });

    res.send(products);
  },
  remove_size: async (req: any, res: any) => {
    const products = await Product.updateMany(
      {},
      {
        $unset: { size: 1 },
      },
      { multi: true }
    );

    res.send(products);
  },
  rename_sizing_to_size: async (req: any, res: any) => {
    const products = await Product.updateMany(
      {},
      {
        $rename: { sizing: "size" },
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
        $unset: { product_options: 1 },
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
      subcategory: "nova",
    });

    products.forEach(async (product: any) => {
      const product_name =
        "OPYN " + product.name.replace(" Glow Casings", "framez");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      product.category = "glowframez";
      product.subcategory = "opyn";
      product.product_collection = "novaframez";
      product.facts = product.facts.replaceAll(" Casings", "framez");
      product.description = product.description.replaceAll(
        " Glow Casings",
        "framez"
      );
      const result = await product.save();
      console.log({ result });
    });

    res.send(products);
  },
  opyn_glowskinz: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "glow_casings",
    });

    products.forEach(async (product: any) => {
      const product_name =
        "OPYN " + product.name.replace(" Glow Casings", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      product.category = "glowskinz";
      product.subcategory = "opyn";
      product.product_collection = "classics";
      product.facts = product.facts.replaceAll(" Casings", "skinz");
      product.description = product.description.replaceAll(" Casings", "skinz");
      const result = await product.save();
      console.log({ result });
    });

    res.send(products);
  },
  clozd_novaskinz: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "glowskins",
      subcategory: "novaskins",
    });

    products.forEach(async (product: any) => {
      const product_name = "CLOZD " + product.name.replace("skins", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      product.category = "glowskinz";
      product.subcategory = "clozd";
      product.product_collection = "novaskinz";
      product.facts = product.facts.replaceAll("skins", "skinz");
      product.description = product.description.replaceAll("skins", "skinz");
      const result = await product.save();
      console.log({ result });
    });

    res.send(products);
  },
  clozd_alt_novaskinz: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "glowskins",
      subcategory: "alt_novaskins",
    });

    products.forEach(async (product: any) => {
      const product_name = "CLOZD " + product.name.replace("skins", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      product.category = "glowskinz";
      product.subcategory = "clozd";
      product.product_collection = "novaskinz";
      product.facts = product.facts.replaceAll("skins", "skinz");
      product.description = product.description.replaceAll("skins", "skinz");
      const result = await product.save();
      console.log({ result });
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
        $options: "i",
      },
    });

    products.forEach(async (product: any) => {
      const product_name = product.name
        .replace(
          product.name.split(" ")[0],
          product.name.split(" ")[0] + " CLOZD"
        )
        .replace("skins", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      const result = await product.save();
      console.log({ result });
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
        $options: "i",
      },
    });

    products.forEach(async (product: any) => {
      const product_name = "CLOZD " + product.name.replace("skins", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      const result = await product.save();
      console.log({ result });
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
        $options: "i",
      },
    });

    products.forEach(async (product: any) => {
      const product_name = product.name
        .replace(
          product.name.split(" ")[0],
          product.name.split(" ")[0] + " CLOZD"
        )
        .replace(" Glow Casings", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      const result = await product.save();
      console.log({ result });
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
        $options: "i",
      },
    });

    products.forEach(async (product: any) => {
      const product_name =
        "CLOZD " + product.name.replace(" Glow Casings", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      const result = await product.save();
      console.log({ result });
    });

    res.send(products);
  },
  clozd_glowskinz: async (req: any, res: any) => {
    const products = await Product.find({
      deleted: false,
      category: "glowskins",
      subcategory: "classics",
    });

    products.forEach(async (product: any) => {
      const product_name = "CLOZD " + product.name.replace("skins", "skinz");
      product.included_items = product.included_items.replace(
        product.name,
        product_name
      );
      product.meta_title = product.included_items.replace(
        product.name,
        product_name
      );
      product.name = product_name;
      product.pathname = snake_case(product_name);
      product.category = "glowskinz";
      product.subcategory = "clozd";
      product.product_collection = "classics";
      product.facts = product.facts.replaceAll("skins", "skinz");
      product.description = product.description.replaceAll("skins", "skinz");
      const result = await product.save();
      console.log({ result });
    });

    res.send(products);
  },
  update_frosted_domes_items: async (req: any, res: any) => {
    // const order: any = await Order.find({
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
    console.log({ order });
    res.send(order);
  },
  update_translucent_white_domes_items: async (req: any, res: any) => {
    // const order: any = await Order.find({
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
    console.log({ order });
    res.send(order);
  },
};
