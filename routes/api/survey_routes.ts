import express from 'express';
import { survey_controller } from '../../controllers';
// const survey_controller = require("../../controllers/survey_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(survey_controller.findAll).post(survey_controller.create);

// Matches with "/api/books/:id"
router.route('/:id').get(survey_controller.findById).put(survey_controller.update).delete(survey_controller.remove);

export default router;
