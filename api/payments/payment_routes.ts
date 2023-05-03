import express from "express";
import { payment_controller } from "../payments";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";

const router = express.Router();

router.route("/:id/pay").put(payment_controller.secure_pay_payments_c);
router.route("/secure/pay/:id").put(isAuth, payment_controller.secure_pay_payments_c);
router.route("/guest/pay/:id").put(payment_controller.secure_pay_payments_c);
router.route("/secure/refund/:id").put(isAuth, isAdmin, payment_controller.secure_refund_payments_c);
router.route("/payout_transfer").post(payment_controller.secure_payout_payments_c);

export default router;
