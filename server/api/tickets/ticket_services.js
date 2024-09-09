import ticket_db from "./ticket_db";
import { getFilteredData } from "../api_helpers";
import { order_db } from "../orders";

export default {
  findAll_tickets_s: async query => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const tickets = await ticket_db.findAll_tickets_db(filter, sort, limit, page);
      return tickets;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_tickets_s: async query => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const tickets = await ticket_db.findAll_tickets_db(filter, sort, limit, page);
      const count = await ticket_db.count_tickets_db(filter);
      return {
        data: tickets,
        total_count: count,
        currentPage: parseInt(page),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tickets_s: async params => {
    try {
      return await ticket_db.findById_tickets_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByEventPathname_tickets_s: async params => {
    try {
      return await ticket_db.findByEventPathname_tickets_db(params.event_pathname);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tickets_s: async body => {
    try {
      return await ticket_db.create_tickets_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tickets_s: async (params, body) => {
    try {
      return await ticket_db.update_tickets_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  validate_ticket_s: async body => {
    const { ticketId } = body;
    try {
      // Parse the ticketId to get order, item, and ticket index
      const [orderId, itemId, ticketIndex] = ticketId.split("-");

      // Find the order and validate the ticket
      const order = await order_db.findById_orders_db(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      const ticketItem = order.orderItems.find(item => item._id.toString() === itemId);
      if (!ticketItem || ticketItem.itemType !== "ticket") {
        throw new Error("Ticket not found");
      }

      console.log({ ticketItem, ticketUsed: ticketItem.ticketUsed });
      if (ticketItem.ticketUsed) {
        throw new Error("Ticket already used");
      }

      // Mark the ticket as used
      if (!ticketItem.ticketUsed) {
        ticketItem.ticketUsed = true;
      }
      await order.save();

      // Update the event's scanned_tickets_count
      const ticket = await ticket_db.findById_tickets_db(itemId);
      const event = await event_db.findById_events_db(ticket.event);
      event.scanned_events_count = (ticket.scanned_tickets_count || 0) + 1;
      await event.save();

      return { message: "Ticket validated successfully", scanned_events_count: event.scanned_events_count };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  reorder_tickets_s: async body => {
    try {
      const { reorderedItems } = body;

      // Update each ticket's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async item => {
        await ticket_db.update_tickets_db({ id: item._id }, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Tickets reordered successfully.";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_tickets_s: async params => {
    try {
      return await ticket_db.remove_tickets_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
