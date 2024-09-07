import Event from "./event";

export default {
  findAll_events_db: async (filter, sort, limit, page) => {
    try {
      return await Event.find(filter)
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
  findBy_events_db: async params => {
    try {
      return await Event.findOne(params).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_events_db: async pathname => {
    try {
      return await Event.findOne({ pathname: pathname, deleted: false }).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_events_db: async id => {
    try {
      return await Event.findOne({ _id: id, deleted: false }).populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_events_db: async body => {
    try {
      return await Event.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_events_db: async (params, body) => {
    const { id } = params;
    try {
      const event = await Event.findOne({ _id: id, deleted: false });
      if (event) {
        return await Event.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_events_db: async params => {
    try {
      const event = await Event.findOne({ pathname: params.pathname, deleted: false });
      if (event) {
        return await Event.updateOne({ pathname: params.pathname }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_events_db: async filter => {
    try {
      return await Event.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
