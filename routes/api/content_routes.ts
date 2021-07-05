import express from 'express';
import { content_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');
const router = express.Router();

// Matches with "/api/books"
router.route('/').get(content_controller.findAll).post(isAuth, isAdmin, content_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(content_controller.findById)
	.put(isAuth, isAdmin, content_controller.update)
	.delete(isAuth, isAdmin, content_controller.remove);

export default router;
