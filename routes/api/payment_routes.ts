import express from "express";
import { payment_controller } from "../../controllers";
const { isAuth, isAdmin } = require("../../util");

const router = express.Router();

router.route("/secure/pay/:id").put(isAuth, payment_controller.secure_pay_payments_c);
router.route("/guest/pay/:id").put(payment_controller.secure_pay_payments_c);
router.route("/secure/refund/:id").put(isAuth, isAdmin, payment_controller.secure_refund_payments_c);
router.route("/secure/payout_transfer").put(isAuth, isAdmin, payment_controller.secure_payout_payments_c);

export default router;
