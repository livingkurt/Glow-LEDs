import express from "express";
import { shipping_controller } from "../shippings";
const { isAuth, isAdmin } = require("../../util");

const router = express.Router();

router.route("/:order_id/buy_label").put(isAuth, isAdmin, shipping_controller.buy_label_shipping_c);
router.route("/:order_id/create_label/:speed").put(isAuth, isAdmin, shipping_controller.create_label_shipping_c);
router.route("/:order_id/create_return_label").put(isAuth, isAdmin, shipping_controller.create_return_label_shipping_c);

router.route("/get_custom_shipping_rates").put(isAuth, isAdmin, shipping_controller.get_custom_shipping_rates_shipping_c);
router.route("/get_different_shipping_rates").put(isAuth, isAdmin, shipping_controller.different_shipping_rates_shipping_c);
router.route("/get_shipping_rates").put(shipping_controller.get_shipping_rates_shipping_c);
export default router;
