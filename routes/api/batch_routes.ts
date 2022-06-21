import express from "express";
import { batch_controller } from "../../controllers";
// const batch_controller = require("../../controllers/batch_controller");
const { isAuth, isAdmin } = require("../../util");

const router = express.Router();

router.route("/users").put(isAuth, isAdmin, batch_controller.find_all_users);
router
  .route("/expenses")
  .put(isAuth, isAdmin, batch_controller.find_all_expenses);
router
  .route("/products")
  .put(isAuth, isAdmin, batch_controller.find_all_products);
router
  .route("/features")
  .put(isAuth, isAdmin, batch_controller.find_all_features);
router.route("/orders").put(isAuth, isAdmin, batch_controller.find_all_orders);
router.route("/emails").put(isAuth, isAdmin, batch_controller.find_all_emails);
router
  .route("/affiliates")
  .put(isAuth, isAdmin, batch_controller.find_all_affiliates);
router
  .route("/paychecks")
  .put(isAuth, isAdmin, batch_controller.find_all_paychecks);
router
  .route("/product_sale_price")
  .put(isAuth, isAdmin, batch_controller.update_product_sale_price);
router
  .route("/clear_sale")
  .put(isAuth, isAdmin, batch_controller.update_clear_sale);
router.route("/update_order_items").put(batch_controller.update_order_items);
router
  .route("/find_duplicate_emails")
  .put(isAuth, isAdmin, batch_controller.find_duplicate_emails);
router
  .route("/make_emails_lowercase")
  .put(isAuth, isAdmin, batch_controller.make_emails_lowercase);
router
  .route("/update_diffuser_caps_product_name")
  .put(batch_controller.update_diffuser_caps_product_name);
router
  .route("/convert_away_from_count_in_stock")
  .put(batch_controller.convert_away_from_count_in_stock);
router.route("/remove_countInStock").put(batch_controller.remove_countInStock);
router.route("/remove_size").put(batch_controller.remove_size);
router
  .route("/change_size_to_string")
  .put(batch_controller.change_size_to_string);
router
  .route("/remove_product_options")
  .put(batch_controller.remove_product_options);
router
  .route("/rename_sizing_to_size")
  .put(batch_controller.rename_sizing_to_size);
router.route("/clozd_glowframez").put(batch_controller.clozd_glowframez);
router.route("/opyn_glowskinz").put(batch_controller.opyn_glowskinz);
router.route("/clozd_novaskinz").put(batch_controller.clozd_novaskinz);
router.route("/clozd_alt_novaskinz").put(batch_controller.clozd_alt_novaskinz);
router
  .route("/clozd_skin_color_options")
  .put(batch_controller.clozd_skin_color_options);
router
  .route("/clozd_casing_color_options")
  .put(batch_controller.clozd_casing_color_options);
router
  .route("/clozd_skin_size_options")
  .put(batch_controller.clozd_skin_size_options);
router
  .route("/clozd_casing_size_options")
  .put(batch_controller.clozd_casing_size_options);
router.route("/clozd_glowskinz").put(batch_controller.clozd_glowskinz);
router
  .route("/update_frosted_domes_items")
  .put(batch_controller.update_frosted_domes_items);
router
  .route("/update_translucent_white_domes_items")
  .put(batch_controller.update_translucent_white_domes_items);
router
  .route("/add_vortex_option_to_diffusers")
  .put(batch_controller.add_vortex_option_to_diffusers);
router.route("/updated_capez_price").put(batch_controller.updated_capez_price);
router.route("/vortex_language").put(batch_controller.vortex_language);
router
  .route("/processing_time_diffusers")
  .put(batch_controller.processing_time_diffusers);
router
  .route("/processing_time_exo_diffusers")
  .put(batch_controller.processing_time_exo_diffusers);
router
  .route("/processing_time_diffuser_caps")
  .put(batch_controller.processing_time_diffuser_caps);
router
  .route("/processing_time_decals")
  .put(batch_controller.processing_time_decals);
router
  .route("/processing_time_whites")
  .put(batch_controller.processing_time_whites);
router
  .route("/processing_time_glowskinz")
  .put(batch_controller.processing_time_glowskinz);
router
  .route("/processing_time_glowstringz")
  .put(batch_controller.processing_time_glowstringz);
router
  .route("/processing_time_battery_coin")
  .put(batch_controller.processing_time_battery_coin);
router
  .route("/processing_time_battery_storage")
  .put(batch_controller.processing_time_battery_storage);
router.route("/adding_clear_tpu").put(batch_controller.adding_clear_tpu);
router.route("/adding_clear_petg").put(batch_controller.adding_clear_petg);
router.route("/adding_frosted_tpu").put(batch_controller.adding_frosted_tpu);
router.route("/adding_frosted_petg").put(batch_controller.adding_frosted_petg);
router.route("/adding_red_tpu").put(batch_controller.adding_red_tpu);
router.route("/adding_red_petg").put(batch_controller.adding_red_petg);
router.route("/adding_emerald_tpu").put(batch_controller.adding_emerald_tpu);
router.route("/adding_green_petg").put(batch_controller.adding_green_petg);
router.route("/adding_teal_tpu").put(batch_controller.adding_teal_tpu);
router.route("/adding_blue_tpu").put(batch_controller.adding_blue_tpu);
router.route("/adding_blue_petg").put(batch_controller.adding_blue_petg);
router.route("/adding_violet_tpu").put(batch_controller.adding_violet_tpu);
router.route("/adding_violet_petg").put(batch_controller.adding_violet_petg);
router.route("/adding_purple_tpu").put(batch_controller.adding_purple_tpu);
router.route("/adding_purple_petg").put(batch_controller.adding_purple_petg);
router.route("/adding_black_tpu").put(batch_controller.adding_black_tpu);
router.route("/adding_black_petg").put(batch_controller.adding_black_petg);
router.route("/adding_white_petg").put(batch_controller.adding_white_petg);
router.route("/options_no_filament").put(batch_controller.options_no_filament);

// router.route('/create_categories').post();

export default router;
