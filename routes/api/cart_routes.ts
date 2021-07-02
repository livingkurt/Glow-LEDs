import express from 'express';
import { cart_controller } from '../../controllers';
// const cart_controller = require("../../controllers/cart_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(cart_controller.findAll).post(cart_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(cart_controller.findById).put(cart_controller.update).delete(cart_controller.remove);

export default router;
