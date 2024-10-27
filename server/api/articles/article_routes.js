import express from "express";
import article_controller from "./article_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(article_controller.findAll_articles_c)
  .post(isAuth, isAdmin, article_controller.create_articles_c);
router.route("/reorder").put(isAuth, isAdmin, article_controller.reorder_articles_c);
router.route("/grid").get(article_controller.findAllGrid_articles_c);

router.route("/table").get(isAuth, isAdmin, article_controller.table_articles_c);

router
  .route("/:id")
  .get(article_controller.findById_articles_c)
  .put(isAuth, isAdmin, article_controller.update_articles_c)
  .delete(isAuth, isAdmin, article_controller.remove_articles_c);

export default router;
