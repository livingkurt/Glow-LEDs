import express from "express";
import gift_card_controller from "./gift_card_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes
router
  .route("/")
  .get(isAuth, isAdmin, gift_card_controller.get_table_gift_cards_c)
  .post(isAuth, isAdmin, gift_card_controller.create_gift_cards_c);

router
  .route("/:id")
  .get(isAuth, isAdmin, gift_card_controller.findById_gift_cards_c)
  .put(isAuth, isAdmin, gift_card_controller.update_gift_cards_c)
  .delete(isAuth, isAdmin, gift_card_controller.remove_gift_cards_c);

// Public routes
router.route("/validate/:code").get(gift_card_controller.validate_gift_card_c);
router.route("/balance/:code").get(gift_card_controller.check_balance_c);
router.route("/transactions/:code").get(isAuth, gift_card_controller.get_transactions_c);
router.route("/use/:code").post(isAuth, gift_card_controller.use_gift_card_c);

export default router;
