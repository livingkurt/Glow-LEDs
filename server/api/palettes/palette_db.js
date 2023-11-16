import { Palette } from "../palettes";

export default {
  findAll_palettes_db: async (filter, sort, limit, page) => {
    try {
      return await Palette.find(filter)
        .sort(sort)
        .populate("user")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_palettes_db: async id => {
    try {
      return await Palette.findOne({ _id: id, deleted: false });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_palettes_db: async user_id => {
    try {
      return await Palette.find({ deleted: false, user: user_id }).sort({ _id: -1 }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_palettes_db: async body => {
    try {
      return await Palette.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_palettes_db: async (id, body) => {
    try {
      const palette = await Palette.findOne({ _id: id, deleted: false });
      if (palette) {
        return await Palette.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_palettes_db: async id => {
    try {
      const palette = await Palette.findOne({ _id: id, deleted: false });
      if (palette) {
        return await Palette.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_palettes_db: async filter => {
    try {
      return await Palette.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
