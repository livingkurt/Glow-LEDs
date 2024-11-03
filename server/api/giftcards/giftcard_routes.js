import express from "express";
import giftcard_controller from "./giftcard_controller.js";
import { isAuth, isAdmin } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.route("/validate/:code").get(giftcard_controller.validate_giftcard_c);
router.route("/balance/:code").get(giftcard_controller.check_balance_c);

// Protected routes (require authentication)
router.route("/my-cards").get(isAuth, giftcard_controller.get_user_giftcards_c);
router.route("/use").post(isAuth, giftcard_controller.use_giftcard_c);

// Admin routes
router
  .route("/")
  .get(isAuth, isAdmin, giftcard_controller.get_all_giftcards_c)
  .post(isAuth, isAdmin, giftcard_controller.create_giftcard_c);

router
  .route("/:id")
  .get(isAuth, giftcard_controller.get_giftcard_c)
  .put(isAuth, isAdmin, giftcard_controller.update_giftcard_c)
  .delete(isAuth, isAdmin, giftcard_controller.delete_giftcard_c);

router.route("/:id/add-funds").post(isAuth, isAdmin, giftcard_controller.add_funds_c);
router.route("/:id/deactivate").put(isAuth, isAdmin, giftcard_controller.deactivate_giftcard_c);
router.route("/:id/transactions").get(isAuth, giftcard_controller.get_transactions_c);

export default router;
