import express from "express";
import event_controller from "./event_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(isAuth, isAdmin, event_controller.findAll_events_c)
  .post(isAuth, isAdmin, event_controller.create_events_c);
router.route("/table").get(isAuth, isAdmin, event_controller.table_events_c);
router.route("/reorder").put(isAuth, isAdmin, event_controller.reorder_events_c);
router.route("/:id/ticket_holders").get(isAuth, isAdmin, event_controller.getTicketHolders_events_c);

router
  .route("/:id")
  .get(event_controller.findById_events_c)
  .put(isAuth, isAdmin, event_controller.update_events_c)
  .delete(isAuth, isAdmin, event_controller.remove_events_c);

export default router;
