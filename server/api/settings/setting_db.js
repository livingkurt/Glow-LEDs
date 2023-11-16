import { Setting } from "../settings";

export default {
  findAll_settings_db: async (filter, sort, limit, page) => {
    try {
      return await Setting.find(filter)
        .sort(sort)
        .populate("user")
        .populate("affiliate")
        .populate("team")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_settings_db: async id => {
    try {
      return await Setting.findOne({ _id: id, deleted: false }).populate("user").populate("affiliate").populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_settings_db: async body => {
    try {
      return await Setting.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_settings_db: async (id, body) => {
    try {
      const setting = await Setting.findOne({ _id: id, deleted: false });
      if (setting) {
        return await Setting.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_settings_db: async id => {
    try {
      const setting = await Setting.findOne({ _id: id, deleted: false });
      if (setting) {
        return await Setting.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_settings_db: async filter => {
    try {
      return await Setting.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
