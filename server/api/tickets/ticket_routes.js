import express from "express";
import { ticket_controller } from ".";
import { isAdmin, isAuth } from "../../middlewares/authMiddleware";
const router = express.Router();

router.route("/").get(ticket_controller.findAll_tickets_c).post(isAuth, isAdmin, ticket_controller.create_tickets_c);
router.route("/reorder").put(ticket_controller.reorder_tickets_c);

router
  .route("/:id")
  .get(ticket_controller.findById_tickets_c)
  .put(isAuth, isAdmin, ticket_controller.update_tickets_c)
  .delete(isAuth, isAdmin, ticket_controller.remove_tickets_c);

export default router;
