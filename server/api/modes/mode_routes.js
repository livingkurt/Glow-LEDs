import express from "express";
import mode_controller from "./mode_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/table").get(mode_controller.table_modes_c);
router.route("/").get(mode_controller.findAll_modes_c).post(mode_controller.create_modes_c);

router.route("/reorder").put(mode_controller.reorder_modes_c);
router
  .route("/:id")
  .get(mode_controller.findById_modes_c)
  .put(mode_controller.update_modes_c)
  .delete(isAuth, isAdmin, mode_controller.remove_modes_c);

export default router;
