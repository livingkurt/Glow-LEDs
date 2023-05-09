// import express from "express";
// import { affiliate_controller } from "../affiliates";
// import { isAdmin, isAuth } from "../../middlewares/authMiddleware";
// const router = express.Router();

// router.route("/id/:id").get(affiliate_controller.findById_affiliates_c);
// router.route("/:pathname/pathname").get(affiliate_controller.findByPathname_affiliates_c);

// router.route("/create_rave_mob_affiliates").put(affiliate_controller.create_rave_mob_affiliates_affiliates_c);
// router.route("/").get(affiliate_controller.findAll_affiliates_c).post(isAuth, affiliate_controller.create_affiliates_c);

// router
//   .route("/:id")
//   // .get(affiliate_controller.findByPathname_affiliates_c)
//   .put(isAuth, affiliate_controller.update_affiliates_c)
//   .delete(isAuth, isAdmin, affiliate_controller.remove_affiliates_c);

// export default router;

import express from "express";
import { affiliate_controller } from ".";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";
const router = express.Router();

router
  .route("/:pathname/pathname")
  .get(affiliate_controller.findByPathname_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c);

router.route("/").get(affiliate_controller.findAll_affiliates_c).post(isAuth, affiliate_controller.create_affiliates_c);
// router.route("/reorder").put(affiliate_controller.reorder_affiliates_c);

router
  .route("/:id")
  .get(affiliate_controller.findById_affiliates_c)
  .put(isAuth, affiliate_controller.update_affiliates_c)
  .delete(isAuth, isAdmin, affiliate_controller.remove_affiliates_c);

export default router;
