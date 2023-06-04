import express from "express";
import { shipping_controller } from "../shippings";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";

const router = express.Router();

router.route("/:order_id/buy_label").put(isAuth, isAdmin, shipping_controller.buy_label_shipping_c);
router.route("/:order_id/create_label/:speed").put(isAuth, isAdmin, shipping_controller.create_label_shipping_c);
router.route("/:order_id/create_return_label").put(isAuth, isAdmin, shipping_controller.create_return_label_shipping_c);
router.route("/:order_id/generate_csv_label").put(isAuth, isAdmin, shipping_controller.generate_csv_label_shipping_c);
router.route("/create_pickup").put(isAuth, isAdmin, shipping_controller.create_pickup_shipping_c);
router.route("/:order_id/refund_label/:is_return_tracking").put(isAuth, isAdmin, shipping_controller.refund_label_shipping_c);

router.route("/:order_id/create_tracker").put(isAuth, isAdmin, shipping_controller.create_tracker_shipping_c);
router.route("/custom_shipping_rates").put(isAuth, isAdmin, shipping_controller.custom_shipping_rates_shipping_c);
router
  .route("/:order_id/different_shipping_rates/:shipment_id")
  .get(isAuth, isAdmin, shipping_controller.different_shipping_rates_shipping_c);
router.route("/shipping_rates").put(shipping_controller.shipping_rates_shipping_c);
export default router;
