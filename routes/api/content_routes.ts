import express from 'express';
import { content_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');
const router = express.Router();

router
	.route('/')
	.get(content_controller.findAll_contents_c)
	.post(isAuth, isAdmin, content_controller.create_contents_c);

router.route('/events').get(content_controller.findAllEvents_contents_c);
router.route('/display').get(content_controller.findDisplay_contents_c);

router
	.route('/:id')
	.get(content_controller.findById_contents_c)
	.put(isAuth, isAdmin, content_controller.update_contents_c)
	.delete(isAuth, isAdmin, content_controller.remove_contents_c);

export default router;
