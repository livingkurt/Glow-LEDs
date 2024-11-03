import express from "express";
import gift_card_controller from "./gift_card_controller.js";
import { isAuth, isAdmin } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.route("/validate/:code").get(gift_card_controller.validate_gift_card_c);
router.route("/balance/:code").get(gift_card_controller.check_balance_c);

// Protected routes (require authentication)
router.route("/my-cards").get(isAuth, gift_card_controller.get_user_gift_cards_c);
router.route("/use").post(isAuth, gift_card_controller.use_gift_card_c);

// Admin routes
router
  .route("/")
  .get(isAuth, isAdmin, gift_card_controller.get_all_gift_cards_c)
  .post(isAuth, isAdmin, gift_card_controller.create_gift_card_c);

router
  .route("/:id")
  .get(isAuth, gift_card_controller.get_gift_card_c)
  .put(isAuth, isAdmin, gift_card_controller.update_gift_card_c)
  .delete(isAuth, isAdmin, gift_card_controller.delete_gift_card_c);

router.route("/:id/add-funds").post(isAuth, isAdmin, gift_card_controller.add_funds_c);
router.route("/:id/deactivate").put(isAuth, isAdmin, gift_card_controller.deactivate_gift_card_c);
router.route("/:id/transactions").get(isAuth, gift_card_controller.get_transactions_c);

export default router;
