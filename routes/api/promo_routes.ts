import express from 'express';
import { promo_controller } from '../../controllers';
// const promo_controller = require("../../controllers/promo_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(promo_controller.findAll).post(promo_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(promo_controller.findById).put(promo_controller.update).delete(promo_controller.remove);

router.route('/code/:promo_code').get(promo_controller.find_by_code);
router.route('used').put(promo_controller.used);
router.route('update_discount').put(promo_controller.update_discount);

export default router;
