import { consoleLogFn } from "@scout_apm/scout-apm/dist/lib/types";
import { Content } from "../contents";

export default {
  findAll_contents_db: async (filter, sort, limit, page) => {
    try {
      return await Content.find(filter)
        .populate("home_page.image_object")
        .populate("home_page.images_object")
        .populate("home_page.images_object")
        .populate("home_page.banner_image_object")
        .populate("home_page.slideshow.image_object")
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
  findById_contents_db: async id => {
    try {
      return await Content.findOne({ _id: id })
        .populate("home_page.image_object")
        .populate("home_page.images_object")
        .populate("home_page.images_object")
        .populate("home_page.banner_image_object")
        .populate("home_page.slideshow.image_object");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_contents_db: async body => {
    try {
      return await Content.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_contents_db: async (id, body) => {
    try {
      const content = await Content.findOne({ _id: id });
      if (content) {
        return await Content.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_contents_db: async id => {
    try {
      const content = await Content.findOne({ _id: id });
      if (content) {
        return await Content.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_contents_db: async filter => {
    try {
      return await Content.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
