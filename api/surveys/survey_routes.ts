import express from 'express';
import { survey_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(survey_controller.findAll_surveys_c).post(survey_controller.create_surveys_c);

router
	.route('/:id')
	.get(survey_controller.findById_surveys_c)
	.put(isAuth, isAdmin, survey_controller.update_surveys_c)
	.delete(isAuth, isAdmin, survey_controller.remove_surveys_c);

export default router;
