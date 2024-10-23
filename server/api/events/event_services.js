import event_db from "./event_db";
import { getFilteredData } from "../api_helpers";
import { Order } from "../orders";
import mongoose from "mongoose";

export default {
  findAll_events_s: async query => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const events = await event_db.findAll_events_db(filter, sort, limit, page);
      const count = await event_db.count_events_db(filter);
      return events;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_events_s: async query => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const events = await event_db.findAll_events_db(filter, sort, limit, page);
      const count = await event_db.count_events_db(filter);
      return {
        data: events,
        total_count: count,
        currentPage: parseInt(page),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_events_s: async params => {
    try {
      return await event_db.findById_events_db(params.id);
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_events_s: async body => {
    try {
      return await event_db.create_events_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_events_s: async (params, body) => {
    try {
      return await event_db.update_events_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  reorder_events_s: async body => {
    try {
      const { reorderedItems } = body;

      // Update each event's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async item => {
        await event_db.update_events_db({ id: item._id }, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Events reordered successfully.";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_events_s: async params => {
    try {
      return await event_db.remove_events_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  getTicketHolders_events_s: async params => {
    try {
      const eventId = params.id;

      // Find all orders that have orderItems with the specified event ID
      const orders = await Order.find({
        "orderItems.event": eventId,
        "orderItems.itemType": "ticket",
        status: { $nin: ["unpaid", "canceled"] },
        deleted: false,
      }).populate("orderItems.ticket");

      // // Update all orderitems with tickets to have the event ID
      // orders.forEach(async order => {
      //   order.orderItems.forEach(item => {
      //     if (item.itemType === "ticket") {
      //       item.event = eventId;
      //     }
      //   });
      //   await order.save();
      // });

      const ticketHolders = orders.flatMap(order =>
        order.orderItems
          .filter(item => item.itemType === "ticket" && item.event.toString() === eventId)
          .map(item => {
            return {
              firstName: order.shipping.first_name,
              lastName: order.shipping.last_name,
              orderDate: order.createdAt,
              ticketType: item?.ticket_type,
              quantity: item?.quantity,
            };
          })
      );

      return ticketHolders;
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  // getTicketHolders_events_s: async params => {
  //   try {
  //     const eventId = params.id;

  //     // Find all orders that have orderItems with the specified event ID
  //     const orders = await Order.find({
  //       "orderItems.event": eventId,
  //       "orderItems.itemType": "ticket",
  //     }).populate("orderItems.ticket");

  //     const ticketHolders = orders.flatMap(order =>
  //       order.orderItems
  //         .filter(item => item.itemType === "ticket" && item.event.toString() === eventId)
  //         .map(item => {
  //           console.log({ item });
  //           return {
  //             firstName: order.shipping.first_name,
  //             lastName: order.shipping.last_name,
  //             orderDate: order.createdAt,
  //             ticketType: item?.ticket_type,
  //             quantity: item?.quantity,
  //           };
  //         })
  //     );

  //     return ticketHolders;
  //   } catch (error) {
  //     console.log({ error });
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // },
};
