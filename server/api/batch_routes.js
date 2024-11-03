import express from "express";
import User from "./users/user.js";
import Expense from "./expenses/expense.js";
import Product from "./products/product.js";
import Feature from "./features/feature.js";
import Order from "./orders/order.js";
import Email from "./emails/email.js";
import Affiliate from "./affiliates/affiliate.js";
import Content from "./contents/content.js";
import Paycheck from "./paychecks/paycheck.js";
import Parcel from "./parcels/parcel.js";
import Chip from "./chips/chip.js";
import Filament from "./filaments/filament.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/users").put(isAuth, isAdmin, async (req, res) => {
  try {
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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
    const { method, search_parameter_field, search_parameter, action, property, value } = req.body;
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

export default router;
