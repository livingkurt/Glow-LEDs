import Ticket from "./ticket";

export default {
  findAll_tickets_db: async (filter, sort, limit, page) => {
    try {
      return await Ticket.find(filter)
        .sort(sort)
        .populate("affiliate")
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
      return await Ticket.findOne(params).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_tickets_db: async pathname => {
    try {
      return await Ticket.findOne({ pathname: pathname, deleted: false }).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tickets_db: async id => {
    try {
      return await Ticket.findOne({ _id: id, deleted: false }).populate("affiliate");
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
};
