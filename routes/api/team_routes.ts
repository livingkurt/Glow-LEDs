import express from 'express';
import { team_controller } from '../../controllers';
// const team_controller = require("../../controllers/team_controller");

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(team_controller.findAll).post(team_controller.create);
router.route('/affiliate/:affiliate_id').get(team_controller.find_by_affiliates);

// Matches with "/api/books/:id"
router.route('/:id').get(team_controller.findById).put(team_controller.update).delete(team_controller.remove);

export default router;
