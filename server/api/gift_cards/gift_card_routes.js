import express from "express";
import gift_card_services from "./gift_card_services.js";
import { admin, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes
router.route("/").get(protect, admin, gift_card_services.get_table_gift_cards_s);
router.route("/").post(protect, admin, gift_card_services.create_gift_cards_s);
router.route("/:id").get(protect, admin, gift_card_services.findById_gift_cards_s);
router.route("/:id").put(protect, admin, gift_card_services.update_gift_cards_s);
router.route("/:id").delete(protect, admin, gift_card_services.remove_gift_cards_s);

// Public routes
router.route("/validate/:code").get(gift_card_services.validate_gift_card_s);
router.route("/balance/:code").get(gift_card_services.check_balance_s);
router.route("/transactions/:code").get(protect, gift_card_services.get_transactions_s);
router.route("/use/:code").post(protect, gift_card_services.use_gift_card_s);

export default router;
