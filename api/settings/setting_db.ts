import { Setting } from "../settings";

export default {
  findAll_settings_db: async (filter: any, sort: unknown, limit: number, page: number) => {
    try {
      return await Setting.find(filter)
        .sort(sort)
        .populate("user")
        .populate("affiliate")
        .populate("team")
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_settings_db: async (id: string) => {
    try {
      return await Setting.findOne({ _id: id }).populate("user").populate("affiliate").populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_settings_db: async (body: any) => {
    try {
      return await Setting.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_settings_db: async (id: string, body: any) => {
    try {
      const setting: any = await Setting.findOne({ _id: id });
      if (setting) {
        return await Setting.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_settings_db: async (id: string) => {
    try {
      const setting: any = await Setting.findOne({ _id: id });
      if (setting) {
        return await Setting.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_settings_db: async (filter: any) => {
    try {
      return await Setting.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
