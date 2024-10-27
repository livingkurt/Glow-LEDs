import express from "express";
import filament_controller from "./filament_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(filament_controller.findAll_filaments_c).post(filament_controller.create_filaments_c);

router.route("/table").get(isAuth, isAdmin, filament_controller.get_table_filaments_c);

router
  .route("/:id")
  .get(filament_controller.findById_filaments_c)
  .put(filament_controller.update_filaments_c)
  .delete(isAuth, isAdmin, filament_controller.remove_filaments_c);

export default router;
