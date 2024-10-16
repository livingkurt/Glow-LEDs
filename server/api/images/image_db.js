import { Image } from "../images";
import mongoose from "mongoose";

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
  findById_images_db: async id => {
    let query = {};

    try {
      if (id && mongoose.isValidObjectId(id)) {
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
  findByLink_images_db: async link => {
    const image = await Image.findOne({ link, deleted: false });
    if (image) {
      return image;
    }
    return null; // Returning null or undefined when not found
  },
  create_images_db: async body => {
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
      const image = await Image.findOne({ _id: id, deleted: false });
      if (image) {
        return await Image.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_images_db: async id => {
    try {
      const image = await Image.findOne({ _id: id, deleted: false });
      if (image) {
        return await Image.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_images_db: async ids => {
    try {
      return await Image.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_images_db: async filter => {
    try {
      return await Image.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
