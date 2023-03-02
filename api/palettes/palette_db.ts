import { Palette } from "../palettes";

export default {
  findAll_palettes_db: async (filter: any, sort: unknown, limit: string, page: string) => {
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
  findById_palettes_db: async (id: string) => {
    try {
      return await Palette.findOne({ _id: id });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_palettes_db: async (user_id: string) => {
    try {
      return await Palette.find({ deleted: false, user: user_id }).sort({ _id: -1 }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_palettes_db: async (body: any) => {
    try {
      return await Palette.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_palettes_db: async (id: string, body: any) => {
    try {
      const palette: any = await Palette.findOne({ _id: id });
      if (palette) {
        return await Palette.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_palettes_db: async (id: string) => {
    try {
      const palette: any = await Palette.findOne({ _id: id });
      if (palette) {
        return await Palette.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_palettes_db: async (filter: any) => {
    try {
      return await Palette.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
