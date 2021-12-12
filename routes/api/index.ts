import express from 'express';
import promo_routes from './promo_routes';
import cart_routes from './cart_routes';
import content_routes from './content_routes';
import affiliate_routes from './affiliate_routes';
import expense_routes from './expense_routes';
import feature_routes from './feature_routes';
import user_routes from './user_routes';
import chip_routes from './chip_routes';
import product_routes from './product_routes';
import order_routes from './order_routes';
import email_routes from './email_routes';
import team_routes from './team_routes';
import batch_routes from './batch_routes';
import shipping_routes from './shipping_routes';
import payment_routes from './payment_routes';
import paycheck_routes from './paycheck_routes';
import survey_routes from './survey_routes';
import parcel_routes from './parcel_routes';
import category_routes from './category_routes';
import setting_routes from './setting_routes';
import palette_routes from './palette_routes';

const router = express.Router();

// Book routes
router.use('/promos', promo_routes);
router.use('/carts', cart_routes);
router.use('/contents', content_routes);
router.use('/affiliates', affiliate_routes);
router.use('/expenses', expense_routes);
router.use('/features', feature_routes);
router.use('/users', user_routes);
router.use('/chips', chip_routes);
router.use('/products', product_routes);
router.use('/orders', order_routes);
router.use('/emails', email_routes);
router.use('/teams', team_routes);
router.use('/all', batch_routes);
router.use('/shipping', shipping_routes);
router.use('/payments', payment_routes);
router.use('/paychecks', paycheck_routes);
router.use('/surveys', survey_routes);
router.use('/parcels', parcel_routes);
router.use('/categorys', category_routes);
router.use('/settings', setting_routes);
router.use('/palettes', palette_routes);

export default router;
