import express from "express";
import { content_controller } from "../contents";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";
const router = express.Router();

router
  .route("/")
  .get(content_controller.findAll_contents_c)
  .post(isAuth, isAdmin, content_controller.create_contents_c);
router.route("/table").get(content_controller.get_table_contents_c);

router.route("/display").get(content_controller.findDisplay_contents_c);
router.route("/slideshow").get(content_controller.slideshow_contents_c);

router
  .route("/:id")
  .get(content_controller.findById_contents_c)
  .put(isAuth, isAdmin, content_controller.update_contents_c)
  .delete(isAuth, isAdmin, content_controller.remove_contents_c);

export default router;
