import express from "express";
import microlight_controller from "./microlight_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/table").get(microlight_controller.table_microlights_c);
router
  .route("/")
  .get(microlight_controller.findAll_microlights_c)
  .post(isAuth, isAdmin, microlight_controller.create_microlights_c);

router.route("/:name").get(microlight_controller.findByName_microlights_c);

router
  .route("/:id")
  .get(microlight_controller.findById_microlights_c)
  .put(isAuth, isAdmin, microlight_controller.update_microlights_c)
  .delete(isAuth, isAdmin, microlight_controller.remove_microlights_c);

export default router;
