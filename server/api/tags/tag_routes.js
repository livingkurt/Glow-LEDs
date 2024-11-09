import express from "express";
import tag_controller from "./tag_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();
router.route("/").get(tag_controller.findAll_tags_c).post(isAuth, isAdmin, tag_controller.create_tags_c);

router.route("/table").get(tag_controller.table_tags_c);

router
  .route("/:id")
  .get(tag_controller.findById_tags_c)
  .put(isAuth, isAdmin, tag_controller.update_tags_c)
  .delete(isAuth, isAdmin, tag_controller.remove_tags_c);

export default router;
