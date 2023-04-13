import { Image } from "../images";

export default {
  findAll_images_db: async (filter: any, sort: unknown, limit: string, page: string) => {
    try {
      return await Image.find(filter)
        .sort(sort)
        .populate("user")
        .populate("affiliate")
        .populate("team")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page) - 1, 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_images_db: async (id: string) => {
    try {
      return await Image.findOne({ _id: id }).populate("user").populate("affiliate").populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_images_db: async (body: any) => {
    console.log({ body });
    try {
      return await Image.create(body);
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_images_db: async (id: string, body: any) => {
    try {
      const image: any = await Image.findOne({ _id: id });
      if (image) {
        return await Image.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_images_db: async (id: string) => {
    try {
      const image: any = await Image.findOne({ _id: id });
      if (image) {
        return await Image.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_images_db: async (ids: string[]) => {
    try {
      return await Image.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_images_db: async (filter: any) => {
    try {
      return await Image.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
