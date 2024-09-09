import { Order } from "../orders";
import { Event } from "../events";
import Ticket from "./ticket";
import mongoose from "mongoose";

export default {
  findAll_tickets_db: async (filter, sort, limit, page) => {
    try {
      return await Ticket.find(filter)
        .sort(sort)
        .populate("event")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_tickets_db: async params => {
    try {
      return await Ticket.findOne(params).populate("event");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_tickets_db: async pathname => {
    try {
      return await Ticket.findOne({ pathname: pathname, deleted: false }).populate("event");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tickets_db: async id => {
    try {
      return await Ticket.findOne({ _id: id, deleted: false }).populate("event");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByEventPathname_tickets_db: async event_pathname => {
    try {
      const event = await Event.findOne({ pathname: event_pathname, deleted: false });
      const tickets = await Ticket.find({ event: event._id, deleted: false }).populate("event");
      return tickets;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tickets_db: async body => {
    try {
      return await Ticket.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tickets_db: async (params, body) => {
    const { id } = params;
    try {
      const ticket = await Ticket.findOne({ _id: id, deleted: false });
      if (ticket) {
        return await Ticket.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_tickets_db: async params => {
    try {
      const ticket = await Ticket.findOne({ pathname: params.pathname, deleted: false });
      if (ticket) {
        return await Ticket.updateOne({ pathname: params.pathname }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_tickets_db: async filter => {
    try {
      return await Ticket.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_scanned_tickets_db: async eventId => {
    try {
      const count = await Order.aggregate([
        { $unwind: "$orderItems" },
        {
          $match: {
            "orderItems.itemType": "ticket",
            "orderItems.ticketUsed": true,
          },
        },
        { $count: "scannedCount" },
      ]);
      return count[0]?.scannedCount || 0;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
