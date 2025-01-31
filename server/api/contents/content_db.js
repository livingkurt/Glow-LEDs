import mongoose from "mongoose";
import Content from "./content.js";

export default {
  findAll_contents_db: async (filter, sort, limit, page) => {
    try {
      return await Content.find(filter)
        .populate({
          path: "home_page.featured_products",
          populate: {
            path: "images",
            model: "Image",
          },
        })
        .populate("home_page.learn_more_products.image")
        .populate("home_page.learn_highlights.images_data.image")
        .populate("home_page.discover_more.image")
        .populate("home_page.get_more_out_of.image")
        .populate("home_page.slideshow.image")
        .populate("home_page.support_banner.image")
        .populate("faq_page.sections.image")
        .populate("products_grid_page.category_banners.image")
        .populate("products_grid_page.category_banners.tag")
        .populate("products_grid_page.our_picks")
        .populate("faq_page.sections.subsections.image")
        .populate("about_page.sections.image")
        .populate("menus.menu_items.image")
        .sort(sort)
        .limit(parseInt(limit, 10))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit, 10))
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
        .populate({
          path: "home_page.modules.content.featured_products",
          populate: {
            path: "images",
            model: "Image",
          },
        })
        .populate({
          path: "home_page.modules.content.featured_product_bundles",
          populate: [
            { path: "images" },
            { path: "affiliate" },
            {
              path: "cartItems",
              populate: [{ path: "tags" }, { path: "display_image_object" }],
            },
          ],
        })
        .populate({
          path: "academy_page.featured_articles",
          populate: {
            path: "image",
            model: "Image",
          },
        })
        .populate({
          path: "academy_page.featured_articles",
          populate: {
            path: "author",
            model: "User",
          },
        })
        .populate({
          path: "academy_page.featured_tutorials",
          populate: {
            path: "affiliate",
            model: "Affiliate",
          },
        })
        .populate("home_page.modules.content.learn_more_products.image")
        .populate("home_page.modules.content.learn_highlights.images_data.image")
        .populate("home_page.modules.content.discover_more.image")
        .populate("home_page.modules.content.get_more_out_of.image")
        .populate("home_page.modules.content.slideshow.image")
        .populate("home_page.modules.content.support_banner.image")
        .populate("home_page.modules.content.sponsors")
        .populate("faq_page.sections.image")
        .populate("faq_page.sections.subsections.image")
        .populate("products_grid_page.category_banners.image")
        .populate("products_grid_page.category_banners.tag")
        .populate("menus.menu_items.image")
        .populate("products_grid_page.our_picks")
        .populate("academy_page.featured_articles.image")
        .populate("academy_page.featured_tutorials.image")
        .populate("academy_page.sponsors")
        .populate("about_page.sections.image");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_contents_db: async body => {
    try {
      // If there's an active content, deactivate it
      await Content.updateMany({ active: true }, { $set: { active: false } });

      // Create the new content
      let newContent = new Content({
        ...body,
        _id: new mongoose.Types.ObjectId(),
      });

      newContent = await newContent.save();

      if (!newContent._id) {
        throw new Error("Failed to create new content: _id is missing");
      }

      // Fetch the newly created content
      const createdContent = await Content.findById(newContent._id)
        .populate({
          path: "home_page.featured_products",
          populate: {
            path: "images",
            model: "Image",
          },
        })
        .populate("home_page.learn_more_products.image")
        .populate("home_page.learn_highlights.images_data.image")
        .populate("home_page.discover_more.image")
        .populate("home_page.get_more_out_of.image")
        .populate("home_page.slideshow.image")
        .populate("home_page.support_banner.image")
        .populate("faq_page.sections.image")
        .populate("faq_page.sections.subsections.image")
        .populate("about_page.sections.image")
        .populate("products_grid_page.category_banners.image")
        .populate("products_grid_page.category_banners.tag")
        .populate("products_grid_page.our_picks")
        .populate("menus.menu_items.image");

      if (!createdContent) {
        throw new Error("Failed to fetch newly created content");
      }

      return createdContent;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
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
