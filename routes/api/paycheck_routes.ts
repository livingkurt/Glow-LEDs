import express from 'express';
import { paycheck_controller } from '../../controllers';
// const paycheck_controller = require("../../controllers/paycheck_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(paycheck_controller.findAll).post(paycheck_controller.create);
router.route('/get_mine').get(paycheck_controller.get_mine);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(paycheck_controller.findById)
	.put(paycheck_controller.update)
	.delete(paycheck_controller.remove);

export default router;
