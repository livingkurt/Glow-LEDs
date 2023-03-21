import express from "express";
import { wholesaler_controller } from "../wholesalers";
const { isAuth, isAdmin } = require("../../util");
const router = express.Router();

router.route("/").get(wholesaler_controller.findAll_wholesalers_c).post(isAuth, wholesaler_controller.create_wholesalers_c);

router
  .route("/:id")
  .put(isAuth, wholesaler_controller.update_wholesalers_c)
  .delete(isAuth, isAdmin, wholesaler_controller.remove_wholesalers_c);

export default router;
