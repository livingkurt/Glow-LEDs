import express from "express";
import chip_controller from "./chip_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/table").get(chip_controller.table_chips_c);
router.route("/").get(chip_controller.findAll_chips_c).post(isAuth, isAdmin, chip_controller.create_chips_c);

router.route("/:name").get(chip_controller.findByName_chips_c);

router
  .route("/:id")
  .get(chip_controller.findById_chips_c)
  .put(isAuth, isAdmin, chip_controller.update_chips_c)
  .delete(isAuth, isAdmin, chip_controller.remove_chips_c);

export default router;
