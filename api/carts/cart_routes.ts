import express from "express";
import { cart_controller } from "../carts";
// const cart_controller = require("..//cart_controller");
const { isAuth, isAdmin } = require("../../util");

const router = express.Router();

router.route("/").get(cart_controller.findAll_carts_c).post(cart_controller.create_carts_c);
router.route("/:id/empty_cart").post(cart_controller.empty_carts_c);
router.route("/start_cart").post(cart_controller.start_cart_carts_c);
router.route("/:id/add_to_cart").put(cart_controller.add_to_cart_carts_c);
router.route("/:id/cart_item/:item_index").put(cart_controller.remove_cart_item_carts_c);

router.route("/:id").get(cart_controller.findById_carts_c).put(cart_controller.update_carts_c).delete(cart_controller.remove_carts_c);

export default router;
