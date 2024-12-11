import Wholesaler from "./wholesaler.js";

export default {
  findAll_wholesalers_db: async (filter, sort, limit, page) => {
    try {
      return await Wholesaler.find(filter)
        .sort(sort)
        .populate("user")
        .limit(parseInt(limit, 10))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit, 10))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_wholesalers_db: async params => {
    try {
      return await Wholesaler.findOne(params).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_wholesalers_db: async pathname => {
    try {
      return await Wholesaler.findOne({ pathname: pathname, deleted: false }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_wholesalers_db: async id => {
    try {
      return await Wholesaler.findOne({ _id: id, deleted: false }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_wholesalers_db: async body => {
    try {
      return await Wholesaler.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_wholesalers_db: async (params, body) => {
    try {
      const wholesaler = await Wholesaler.findOne({ _id: params.id, deleted: false });
      if (wholesaler) {
        return await Wholesaler.updateOne({ _id: params.id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_wholesalers_db: async params => {
    try {
      const wholesaler = await Wholesaler.findOne({ pathname: params.pathname, deleted: false });
      if (wholesaler) {
        return await Wholesaler.updateOne({ pathname: params.pathname }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_wholesalers_db: async filter => {
    try {
      return await Wholesaler.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
