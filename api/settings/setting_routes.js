import express from "express";
import { setting_controller } from "../settings";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";

const router = express.Router();

router.route("/env").get(setting_controller.database_settings_c);
router
  .route("/:id")
  .get(setting_controller.findById_settings_c)
  .put(isAuth, isAdmin, setting_controller.update_settings_c)
  .delete(isAuth, isAdmin, setting_controller.remove_settings_c);

router
  .route("/")
  .get(isAuth, isAdmin, setting_controller.findAll_settings_c)
  .post(isAuth, isAdmin, setting_controller.create_settings_c);

export default router;
