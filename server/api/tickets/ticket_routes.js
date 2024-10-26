import express from "express";
import ticket_controller from "./ticket_controller.js";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(ticket_controller.findAll_tickets_c).post(isAuth, isAdmin, ticket_controller.create_tickets_c);
router.route("/table").get(ticket_controller.table_tickets_c);
router.route("/reorder").put(ticket_controller.reorder_tickets_c);
router.route("/validate").post(ticket_controller.validate_ticket_c);

router.route("/event/:event_pathname").get(ticket_controller.findByEventPathname_tickets_c);

router
  .route("/:id")
  .get(ticket_controller.findById_tickets_c)
  .put(isAuth, isAdmin, ticket_controller.update_tickets_c)
  .delete(isAuth, isAdmin, ticket_controller.remove_tickets_c);

export default router;
