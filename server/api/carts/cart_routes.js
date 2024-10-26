import express from "express";
import { setCurrentUser } from "../../middlewares/authMiddleware.js";
import cart_controller from "./cart_controller.js";

const router = express.Router();

router.route("/").get(cart_controller.findAll_carts_c).post(cart_controller.create_carts_c);
router.route("/:id/user").get(cart_controller.findByUser_carts_c);
router.route("/:id/user").put(cart_controller.update_user_carts_c);
router.route("/:id/empty_cart").post(cart_controller.empty_carts_c);
// router.route("/start_cart").post(setCurrentUser, cart_controller.start_cart_carts_c);
router.route("/:id?/add_to_cart").post(setCurrentUser, cart_controller.add_to_cart_carts_c);
// router.route("/:id/add_to_cart").put(cart_controller.add_to_cart_carts_c);
router.route("/:id/cart_item/:item_index").put(cart_controller.remove_cart_item_carts_c);

router
  .route("/:id")
  .get(cart_controller.findById_carts_c)
  .put(cart_controller.update_carts_c)
  .delete(cart_controller.remove_carts_c);

export default router;
