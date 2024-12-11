import Microlight from "./microlight.js";

export default {
  findAll_microlights_db: async (filter, sort, limit, page) => {
    try {
      return await Microlight.find(filter)
        .sort(sort)
        .limit(parseInt(limit, 10))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit, 10))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_microlights_db: async id => {
    try {
      return await Microlight.findOne({ _id: id, deleted: false });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByName_microlights_db: async name => {
    try {
      return await Microlight.findOne({ name: name, deleted: false });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_microlights_db: async body => {
    try {
      return await Microlight.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_microlights_db: async (id, body) => {
    try {
      const microlight = await Microlight.findOne({ _id: id, deleted: false });
      if (microlight) {
        return await Microlight.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_microlights_db: async id => {
    try {
      const microlight = await Microlight.findOne({ _id: id, deleted: false });
      if (microlight) {
        return await Microlight.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_microlights_db: async filter => {
    try {
      return await Microlight.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
