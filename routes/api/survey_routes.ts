import express from 'express';
import { survey_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(survey_controller.findAll).post(survey_controller.create);

router
	.route('/:id')
	.get(survey_controller.findById)
	.put(isAuth, isAdmin, survey_controller.update)
	.delete(isAuth, isAdmin, survey_controller.remove);

export default router;
