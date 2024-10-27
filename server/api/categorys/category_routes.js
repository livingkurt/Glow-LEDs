import express from "express";
import category_controller from "./category_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .get(category_controller.findAll_categorys_c)
  .post(isAuth, isAdmin, category_controller.create_categorys_c);

router.route("/table").get(isAuth, isAdmin, category_controller.table_categorys_c);

router
  .route("/:id")
  .get(isAuth, isAdmin, category_controller.findById_categorys_c)
  .put(isAuth, isAdmin, category_controller.update_categorys_c)
  .delete(isAuth, isAdmin, category_controller.remove_categorys_c);

export default router;
