import express from 'express';
import { payment_controller } from '../../controllers';
// const payment_controller = require("../../controllers/payment_controller");

const router = express.Router();

// // Matches with "/api/books"
// router.route('/').get(payment_controller.findAll).post(payment_controller.create);

// // Matches with "/api/books/:id"
// router.route('/:id').get(payment_controller.findById).put(payment_controller.update).delete(payment_controller.remove);

router.route('/:id/pay').put(payment_controller.pay);
router.route('/guestcheckout/:id/pay').put(payment_controller.guestcheckout_pay);
router.route('/:id/refund').put(payment_controller.refund);

export default router;
