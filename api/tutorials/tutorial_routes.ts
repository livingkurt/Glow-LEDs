import express from "express";
import { tutorial_controller } from ".";
const { isAuth, isAdmin } = require("../../util");
const router = express.Router();

router.route("/").get(tutorial_controller.findAll_tutorials_c).post(isAuth, tutorial_controller.create_tutorials_c);

router.route("/:id").put(isAuth, tutorial_controller.update_tutorials_c).delete(isAuth, isAdmin, tutorial_controller.remove_tutorials_c);

export default router;
