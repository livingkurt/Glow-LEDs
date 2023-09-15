import express from "express";
import { email_controller } from "../emails";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";
const router = express.Router();
const cors = require("cors");

router.route("/email_subscription").post(email_controller.send_email_subscription_emails_c);
router.route("/order").post(email_controller.send_order_emails_c);
router.route("/refund").post(email_controller.send_refund_emails_c);
router.route("/invoice").post(email_controller.get_invoice_emails_c);
router.route("/affiliate").post(email_controller.send_affiliate_emails_c);
router.route("/order_status").post(email_controller.send_order_status_emails_c);
router.route("/review").post(email_controller.send_review_emails_c);
router.route("/affiliate").post(email_controller.send_affiliate_emails_c);
router.route("/feature").post(email_controller.send_feature_emails_c);
router.route("/announcement").post(email_controller.send_announcement_emails_c);
router.route("/code_used/:promo_code").post(email_controller.send_code_used_emails_c);
router.route("/view_announcement").post(email_controller.view_announcement_emails_c);

router.route("/external_contact").post(cors(), email_controller.send_external_contact_emails_c);
router.route("/contact").post(email_controller.send_user_contact_emails_c);
router.route("/contact_confirmation").post(email_controller.send_admin_contact_emails_c);
router.route("/custom_contact").post(email_controller.send_custom_contact_emails_c);
router.route("/verify_email_password_reset").post(email_controller.send_verify_email_password_reset_emails_c);
router.route("/reset_password").post(email_controller.send_successful_password_reset_emails_c);
router.route("/account_created").post(email_controller.send_account_created_emails_c);
router.route("/send_shipping_status").post(email_controller.send_shipping_status_emails_c);
router.route("/current_stock").post(email_controller.send_current_stock_emails_c);

router.route("/verify").post(email_controller.send_verified_emails_c);

router.route("/table").get(email_controller.get_table_emails_c);
router.route("/").get(email_controller.findAll_emails_c).post(isAuth, isAdmin, email_controller.create_emails_c);

router
  .route("/:id")
  .get(email_controller.findById_emails_c)
  .put(isAuth, isAdmin, email_controller.update_emails_c)
  .delete(isAuth, isAdmin, email_controller.remove_emails_c);

export default router;
