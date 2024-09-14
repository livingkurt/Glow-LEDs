import ticket_db from "./ticket_db";
import { getFilteredData } from "../api_helpers";
import { order_db } from "../orders";
import { event_db } from "../events";

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
      const [orderId, itemId, ticketIndex] = ticketId.split("-");

      const order = await order_db.findById_orders_db(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      const ticketItem = order.orderItems.find(item => item._id.toString() === itemId);
      if (!ticketItem || ticketItem.itemType !== "ticket") {
        throw new Error("Ticket item not found in order");
      }

      // Ensure ticketsUsed is an array and has the correct length
      if (!Array.isArray(ticketItem.ticketsUsed) || ticketItem.ticketsUsed.length !== ticketItem.quantity) {
        ticketItem.ticketsUsed = Array(ticketItem.quantity)
          .fill()
          .map((_, index) => ({
            ticketId: `${orderId}-${itemId}-${index}`,
            used: false,
          }));
      }

      const ticketToUse = ticketItem.ticketsUsed[ticketIndex];
      if (!ticketToUse) {
        throw new Error("Invalid ticket index");
      }

      if (ticketToUse.used) {
        throw new Error("Ticket already used");
      }

      // Mark the specific ticket as used
      ticketToUse.used = true;
      await order.save();

      // Update the event's scanned_tickets_count
      // Assuming the ticket reference is stored in the ticketItem
      if (ticketItem.ticket) {
        const ticket = await ticket_db.findById_tickets_db(ticketItem.ticket);
        if (ticket && ticket.event) {
          const scanned_tickets_count = await ticket_db.count_scanned_tickets_db(ticket.event._id);
          return { message: "Ticket validated successfully", scanned_tickets_count };
        }
      }

      return { message: "Ticket validated successfully" };
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
