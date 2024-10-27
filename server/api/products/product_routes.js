import express from "express";
import product_controller from "./product_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();
router.route("/grid").get(product_controller.findAllGrid_products_c);
router.route("/filters").get(product_controller.create_filters_products_c);

router.route("/reviews/:pathname").post(isAuth, product_controller.reviews_products_c);

router.route("/best_sellers").post(product_controller.get_best_sellers_products_c);
router.route("/our_picks").get(product_controller.get_our_picks_products_c);
router.route("/new_releases").get(product_controller.get_new_releases_products_c);

router.route("/update_stock").put(product_controller.update_stock_products_c);
router.route("/update_product_order").put(product_controller.update_product_order_products_c);
router.route("/add_product_options").put(product_controller.add_product_options_products_c);
router.route("/save_item_group_id").put(product_controller.save_item_group_id_products_c);
router.route("/reorder").put(isAuth, isAdmin, product_controller.reorder_products_c);
router.route("/delete_multiple").put(isAuth, isAdmin, product_controller.remove_multiple_products_c);
router.route("/current_stock").get(product_controller.current_stock_products_c);
router.route("/facebook_catelog").get(product_controller.facebook_catelog_products_c);
router.route("/table").get(isAuth, isAdmin, product_controller.table_products_c);
router.route("/check_stock").post(product_controller.check_stock_products_c);
router.route("/:id/option_product/:option_product_id?").put(product_controller.create_option_products_c);
router.route("/generate_product_options").put(product_controller.generate_product_options_products_c);
router.route("/:id/check_password").post(product_controller.check_password_products_c);
// router
//   .route("/compress_images")
//   .post(product_controller.compress_images_products_c);

// CRUD Actions

router.route("/:pathname/page").get(product_controller.page_products_c);

router
  .route("/:id")
  .get(product_controller.findById_products_c)
  .put(isAuth, isAdmin, product_controller.update_products_c)
  .delete(isAuth, isAdmin, product_controller.remove_products_c);

router.route("/").get(product_controller.findAll_products_c).post(product_controller.create_products_c);
router.route("/image_upload").post(product_controller.image_upload_products_c);

export default router;
