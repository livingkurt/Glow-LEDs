import express from 'express';
import { cart_controller } from '../../controllers';
// const cart_controller = require("../../controllers/cart_controller");
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(isAuth, isAdmin, cart_controller.findAll).post(cart_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(cart_controller.findById)
	.put(cart_controller.update)
	.delete(isAuth, isAdmin, cart_controller.remove);

export default router;
