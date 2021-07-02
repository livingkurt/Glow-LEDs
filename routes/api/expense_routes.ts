import express from 'express';
import { expense_controller } from '../../controllers';
// const expense_controller = require("../../controllers/expense_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(expense_controller.findAll).post(expense_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(expense_controller.findById).put(expense_controller.update).delete(expense_controller.remove);

router.route('/post_expense').post(expense_controller.create_all);

export default router;
