import express from 'express';
import { affiliate_controller } from '../../controllers';
// const affiliate_controller = require("../../controllers/affiliate_controller");
const { isAuth, isAdmin } = require('../../util');
const router = express.Router();

// Matches with "/api/books"
router.route('/').get(affiliate_controller.findAll).post(isAuth, affiliate_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:pathname')
	.get(affiliate_controller.findById)
	.put(isAuth, affiliate_controller.update)
	.delete(isAuth, isAdmin, affiliate_controller.remove);

export default router;
