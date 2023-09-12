import { Content } from "../contents";

export default {
  findAll_contents_db: async (filter: any, sort: any, limit: string, page: string) => {
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
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_contents_db: async (id: string) => {
    try {
      return await Content.findOne({ _id: id })
        .populate("home_page.image_object")
        .populate("home_page.images_object")
        .populate("home_page.images_object")
        .populate("home_page.banner_image_object")
        .populate("home_page.slideshow.image_object");
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_contents_db: async (body: any) => {
    try {
      return await Content.create(body);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_contents_db: async (id: string, body: any) => {
    try {
      const content: any = await Content.findOne({ _id: id });
      if (content) {
        return await Content.updateOne({ _id: id }, body);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_contents_db: async (id: string) => {
    try {
      const content: any = await Content.findOne({ _id: id });
      if (content) {
        return await Content.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_contents_db: async (filter: any) => {
    try {
      return await Content.countDocuments(filter);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
