import express from 'express';
import { team_controller } from '../../controllers';
const { isAuth, isAdmin } = require('../../util');

const router = express.Router();

router.route('/').get(team_controller.findAll_teams_c).post(isAuth, isAdmin, team_controller.create_teams_c);

router
	.route('/:pathname')
	.get(team_controller.findByPathname_teams_c)
	.put(isAuth, isAdmin, team_controller.update_teams_c)
	.delete(isAuth, isAdmin, team_controller.remove_teams_c);
router.route('/affiliate/:affiliate_id').get(team_controller.findByAffiliate_teams_c);

export default router;
