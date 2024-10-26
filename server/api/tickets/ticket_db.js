import Order from "../orders/order.js";
import Event from "../events/event.js";
import Ticket from "./ticket.js";
import { countScannedTickets } from "./ticket_interactors.js";

export default {
  findAll_tickets_db: async (filter, sort, limit, page) => {
    try {
      return await Ticket.find(filter)
        .sort(sort)

        .populate("image")
        .populate({
          path: "backup_ticket",
          populate: { path: "image" },
        })
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
      return await Ticket.findOne(params)
        .populate("image")
        .populate({
          path: "backup_ticket",
          populate: { path: "image" },
        });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_tickets_db: async pathname => {
    try {
      return await Ticket.findOne({ pathname: pathname, deleted: false })
        .populate("image")
        .populate({
          path: "backup_ticket",
          populate: { path: "image" },
        });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tickets_db: async id => {
    try {
      return await Ticket.findOne({ _id: id, deleted: false })
        .populate("image")
        .populate({
          path: "backup_ticket",
          populate: { path: "image" },
        });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByEventPathname_tickets_db: async event_pathname => {
    try {
      const event = await Event.findOne({ pathname: event_pathname, deleted: false });
      const tickets = await Ticket.find({ event: event._id, deleted: false })
        .populate("image")
        .populate({
          path: "backup_ticket",
          populate: { path: "image" },
        });
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
    console.log({ id, body });
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
          $lookup: {
            from: "tickets",
            localField: "orderItems.ticket",
            foreignField: "_id",
            as: "ticketInfo",
          },
        },
        { $unwind: "$ticketInfo" },
        {
          $match: {
            "orderItems.itemType": "ticket",
            "ticketInfo._id": { $in: await countScannedTickets(eventId) },
          },
        },
        {
          $project: {
            usedTickets: {
              $size: {
                $filter: {
                  input: "$orderItems.ticketsUsed",
                  as: "ticket",
                  cond: { $eq: ["$$ticket.used", true] },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            scannedCount: { $sum: "$usedTickets" },
          },
        },
      ]);

      return count[0]?.scannedCount || 0;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
