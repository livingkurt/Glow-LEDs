import { Content } from "../contents";

export default {
  findAll_contents_db: async (filter, sort, limit, page) => {
    try {
      return await Content.find(filter)
        .populate("home_page.featured_products")
        .populate("home_page.learn_more_products.image")
        .populate("home_page.learn_highlights.images_data.image")
        .populate("home_page.discover_more.image")
        .populate("home_page.get_more_out_of.image")
        .populate("home_page.slideshow.image")
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
      return await Content.findOne({ _id: id, deleted: false })
        .populate("home_page.featured_products")
        .populate("home_page.learn_more_products.image")
        .populate("home_page.learn_highlights.images_data.image")
        .populate("home_page.discover_more.image")
        .populate("home_page.get_more_out_of.image")
        .populate("home_page.slideshow.image");
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
      const content = await Content.findOne({ _id: id, deleted: false });
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
      const content = await Content.findOne({ _id: id, deleted: false });
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
