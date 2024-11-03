import express from "express";
import affiliate_routes from "./affiliates/affiliate_routes.js";
import article_routes from "./articles/article_routes.js";
import cart_routes from "./carts/cart_routes.js";
import category_routes from "./categorys/category_routes.js";
import chip_routes from "./chips/chip_routes.js";
import content_routes from "./contents/content_routes.js";
import email_routes from "./emails/email_routes.js";
import event_routes from "./events/event_routes.js";
import expense_routes from "./expenses/expense_routes.js";
import feature_routes from "./features/feature_routes.js";
import filament_routes from "./filaments/filament_routes.js";
import gift_card_routes from "./gift_cards/gift_card_routes.js";
import image_routes from "./images/image_routes.js";
import order_routes from "./orders/order_routes.js";
import parcel_routes from "./parcels/parcel_routes.js";
import paycheck_routes from "./paychecks/paycheck_routes.js";
import payment_routes from "./payments/payment_routes.js";
import product_routes from "./products/product_routes.js";
import promo_routes from "./promos/promo_routes.js";
import shipping_routes from "./shippings/shipping_routes.js";
import survey_routes from "./surveys/survey_routes.js";
import team_routes from "./teams/team_routes.js";
import ticket_routes from "./tickets/ticket_routes.js";
import tutorial_routes from "./tutorials/tutorial_routes.js";
import user_routes from "./users/user_routes.js";
import version_routes from "./versions/version_routes.js";
import wholesaler_routes from "./wholesalers/wholesaler_routes.js";

const router = express.Router();

router.use("/api/affiliates", affiliate_routes);
router.use("/api/articles", article_routes);
router.use("/api/carts", cart_routes);
router.use("/api/categorys", category_routes);
router.use("/api/chips", chip_routes);
router.use("/api/contents", content_routes);
router.use("/api/emails", email_routes);
router.use("/api/events", event_routes);
router.use("/api/expenses", expense_routes);
router.use("/api/features", feature_routes);
router.use("/api/filaments", filament_routes);
router.use("/api/gift_cards", gift_card_routes);
router.use("/api/images", image_routes);
router.use("/api/orders", order_routes);
router.use("/api/parcels", parcel_routes);
router.use("/api/paychecks", paycheck_routes);
router.use("/api/payments", payment_routes);
router.use("/api/products", product_routes);
router.use("/api/promos", promo_routes);
router.use("/api/shipping", shipping_routes);
router.use("/api/surveys", survey_routes);
router.use("/api/teams", team_routes);
router.use("/api/tickets", ticket_routes);
router.use("/api/tutorials", tutorial_routes);
router.use("/api/users", user_routes);
router.use("/api/versions", version_routes);
router.use("/api/wholesalers", wholesaler_routes);

export default router;
