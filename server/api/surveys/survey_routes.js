import express from "express";
import survey_controller from "./survey_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(survey_controller.findAll_surveys_c).post(survey_controller.create_surveys_c);

router.route("/table").get(isAuth, isAdmin, survey_controller.get_table_surveys_c);

router
  .route("/:id")
  .get(survey_controller.findById_surveys_c)
  .put(isAuth, isAdmin, survey_controller.update_surveys_c)
  .delete(isAuth, isAdmin, survey_controller.remove_surveys_c);

export default router;
