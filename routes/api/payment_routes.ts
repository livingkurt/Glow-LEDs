import express from 'express';
import { payment_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/:id/pay').put(isAuth, payment_controller.pay);
router.route('/guestcheckout/:id/pay').put(payment_controller.guestcheckout_pay);
router.route('/:id/refund').put(isAuth, isAdmin, payment_controller.refund);

export default router;
