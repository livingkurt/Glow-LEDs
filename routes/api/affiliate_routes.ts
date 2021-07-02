import express from 'express';
import { affiliate_controller } from '../../controllers';
// const affiliate_controller = require("../../controllers/affiliate_controller");
import { isAuth, isAdmin } from '../../util';
const router = express.Router();

// Matches with "/api/books"
router.route('/').get(affiliate_controller.findAll).post(affiliate_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:pathname')
	.get(affiliate_controller.findById)
	.put(affiliate_controller.update)
	.delete(affiliate_controller.remove);

export default router;
