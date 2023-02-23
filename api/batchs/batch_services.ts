import { User } from "../users";
import { Expense } from "../expenses";
import { Product } from "../products";
import { Feature } from "../features";
import { Order } from "../orders";
import { Email } from "../emails";
import { Affiliate } from "../affiliates";
import { Content } from "../contents";
import { Paycheck } from "../paychecks";
import { Parcel } from "../parcels";
import Chip from "../chips/chip";

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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_product_sale_price: async (req: any, res: any) => {
    // const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });
    const products = await Product.find({});

    products
      .filter((product: any) => !product.hidden)
      .forEach(async (product: any) => {
        const main_discount = product.price * req.body.discount_percentage;
        const sale_start_date = req.body.sale_start_date;
        const sale_end_date = req.body.sale_end_date;

        product.sale_price = product.price - main_discount;
        product.sale_start_date = sale_start_date;
        product.sale_end_date = sale_end_date;

        if (product.product_options) {
          product.product_options.forEach(async (option: any) => {
            const option_discount = option.price * req.body.discount_percentage;
            return (option.sale_price = option.price - option_discount);
          });
        }
        const result = await product.save();
        //
      });
    //
    res.send(products);
  },
  update_clear_sale: async (req: any, res: any) => {
    // const orders = await Order.find({ 'orderItems.name': 'Diffuser Caps + Adapters Starter Kit' });

    try {
      const products = await Product.find({});

      products
        .filter((product: any) => !product.hidden)
        .forEach(async (product: any) => {
          try {
            const cleared_sale_price = 0;
            const sale_start_date = req.body.sale_start_date;
            const sale_end_date = req.body.sale_end_date;
            product.sale_price = cleared_sale_price;
            product.sale_start_date = sale_start_date;
            product.sale_end_date = sale_end_date;

            if (product.product_options) {
              product.product_options.forEach((option: any) => (option.sale_price = cleared_sale_price));
            }
            const result = await product.save();
          } catch (error) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
          }

          //
        });
      //
      res.send(products);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  make_emails_lowercase: async (req: any, res: any) => {
    const users = await User.find({ email: { $exists: true } });
    users.forEach(async (user: any) => {
      const userss: any = await User.findOne({ _id: user._id });
      const updated_user: any = new User(userss);
      // Check if user exists
      if (userss.email !== userss.email.toLowerCase()) {
        const same_user: any = await User.findOne({ email: userss.email.toLowerCase() });
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
    const users = await User.find({ email: { $exists: true } });
    const valueArr = users.map((item: any) => item.email).sort();

    const isDuplicate = valueArr.some((item: any, idx: any) => {
      return valueArr.indexOf(item) != idx;
    });

    res.send(valueArr);
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
  }
};
