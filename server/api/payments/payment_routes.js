import express from "express";
import payment_controller from "./payment_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:id/pay").put(payment_controller.secure_pay_payments_c);
router.route("/secure/pay/:id").put(isAuth, payment_controller.secure_pay_payments_c);
router.route("/guest/pay/:id").put(payment_controller.secure_pay_payments_c);
router.route("/:order_id/refund/").put(isAuth, isAdmin, payment_controller.secure_refund_payments_c);
router.route("/payout_transfer").post(payment_controller.secure_payout_payments_c);
router.route("/stripe_account/:user_id").put(payment_controller.stripe_account_payments_c);
// router.route("/payout_employees").post(payment_controller.payout_employees_payments_c);

export default router;
