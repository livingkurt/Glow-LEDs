import { Image } from "../images";

export default {
  findAll_images_db: async (filter, sort, limit, page) => {
    try {
      return await Image.find(filter)
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_images_db: async (id) => {
    let query = {};

    try {
      if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        query = { _id: id };
      } else {
        query = { link: id };
      }
      return await Image.findOne(query);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByLink_images_db: async (link) => {
    try {
      return await Image.findOne({ link: link });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_images_db: async (body) => {
    try {
      return await Image.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_images_db: async (id, body) => {
    try {
      const image = await Image.findOne({ _id: id });
      if (image) {
        return await Image.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_images_db: async (id) => {
    try {
      const image = await Image.findOne({ _id: id });
      if (image) {
        return await Image.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_images_db: async (ids[]) => {
    try {
      return await Image.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_images_db: async (filter) => {
    try {
      return await Image.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
