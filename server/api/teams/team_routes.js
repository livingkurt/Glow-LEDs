import express from "express";
import { team_controller } from "../teams";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";

const router = express.Router();

router.route("/").get(team_controller.findAll_teams_c).post(isAuth, isAdmin, team_controller.create_teams_c);
router.route("/table").get(team_controller.table_teams_c);
router.route("/:id/monthly_checkin").put(team_controller.team_monthly_checkin_teams_c);

// router
//   .route("/:pathname")
//   .get(team_controller.findByPathname_teams_c)
//   .put(isAuth, isAdmin, team_controller.update_teams_c)
//   .delete(isAuth, isAdmin, team_controller.remove_teams_c);
router
  .route("/:id")
  .get(team_controller.findById_teams_c)
  .put(isAuth, isAdmin, team_controller.update_teams_c)
  .delete(isAuth, isAdmin, team_controller.remove_teams_c);
router.route("/affiliate/:affiliate_id").get(team_controller.findByAffiliate_teams_c);

export default router;
