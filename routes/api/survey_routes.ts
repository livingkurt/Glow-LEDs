import express from 'express';
import { survey_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(isAuth, isAdmin, survey_controller.findAll).post(survey_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:id')
	.get(isAuth, isAdmin, survey_controller.findById)
	.put(isAuth, isAdmin, survey_controller.update)
	.delete(isAuth, isAdmin, survey_controller.remove);

export default router;
