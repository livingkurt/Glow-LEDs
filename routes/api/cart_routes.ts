import express from 'express';
import { cart_controller } from '../../controllers';
// const cart_controller = require("../../controllers/cart_controller");
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(isAuth, isAdmin, cart_controller.findAll_carts_c).post(cart_controller.create_carts_c);
router.route('/user/:id').get(cart_controller.findByUser_carts_c).put(cart_controller.remove_cartitem_carts_c);

router
	.route('/:id')
	.get(cart_controller.findById_carts_c)
	.put(cart_controller.update_carts_c)
	.delete(isAuth, isAdmin, cart_controller.remove_carts_c);

export default router;
