import express from "express";
import mode_controller from "./mode_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/table").get(mode_controller.table_modes_c);
router.route("/").get(mode_controller.findAll_modes_c).post(isAuth, isAdmin, mode_controller.create_modes_c);

router.route("/:name").get(mode_controller.findByName_modes_c);

router
  .route("/:id")
  .get(mode_controller.findById_modes_c)
  .put(isAuth, isAdmin, mode_controller.update_modes_c)
  .delete(isAuth, isAdmin, mode_controller.remove_modes_c);

export default router;
