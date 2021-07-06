import express from 'express';
import { team_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

// Matches with "/api/books"
router.route('/').get(team_controller.findAll).post(isAuth, isAdmin, team_controller.create);

// Matches with "/api/books/:id"
router
	.route('/:pathname')
	.get(team_controller.findById)
	.put(isAuth, isAdmin, team_controller.update)
	.delete(isAuth, isAdmin, team_controller.remove);

router.route('/affiliate/:affiliate_id').get(team_controller.find_by_affiliates);

export default router;
