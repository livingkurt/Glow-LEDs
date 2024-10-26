import Content from "./content.js";
import content_db from "./content_db.js";
import { normalizeContentFilters, normalizeContentSearch } from "./content_helpers.js";
import { getFilteredData } from "../api_helpers.js";

export default {
  get_table_contents_s: async query => {
    try {
      const sort_options = ["createdAt", "active", "home_page", "banner"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeFilters: normalizeContentFilters,
        normalizeSearch: normalizeContentSearch,
      });
      const contents = await content_db.findAll_contents_db(filter, sort, limit, page);
      const count = await content_db.count_contents_db(filter);
      return {
        data: contents,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_contents_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      // Initialize an empty filter object
      const filter = {};

      // Apply the active status if it exists
      if (query.active !== undefined) {
        filter.active = query.active === "true" ? true : false;
      }

      // Add deleted flag as false
      filter.deleted = false;
      // let filter = query
      // filter.

      const contents = await Content.find(filter)
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
        .populate("about_page.sections.image")
        .populate("faq_page.sections.image")
        .populate("faq_page.sections.subsections.image")
        .populate("products_grid_page.category_banners.image")
        .populate("products_grid_page.category_banners.tag")

        .populate("menus.menu_items.image")
        .sort({ _id: -1 })
        .limit(3);
      const count = await content_db.count_contents_db(filter);
      if (count !== undefined) {
        return {
          contents,
          totalPages: Math.ceil(count / parseInt(limit)),
          currentPage: page,
        };
      } else {
        throw new Error("Count is undefined");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  current_contents_s: async query => {
    try {
      const sort = { createdAt: -1 }; // Sort by createdAt field in descending order
      const filter = { deleted: false, active: true }; // Filter for non-deleted and active records

      return await Content.find(filter)
        .sort(sort)
        .limit(1)
        .populate({
          path: "home_page.featured_products",
          populate: {
            path: "images",
            model: "Image",
          },
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
        .populate("home_page.learn_more_products.image")
        .populate("home_page.learn_highlights.images_data.image")
        .populate("home_page.discover_more.image")
        .populate("home_page.get_more_out_of.image")
        .populate("home_page.slideshow.image")
        .populate("home_page.support_banner.image")
        // .populate("home_page.sponsors_banner.image")
        // .populate("home_page.sponsors_banner.quotes.image")
        // .populate("home_page.sponsors_banner.quotes.sponsor")
        .populate("home_page.sponsors")
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
  findDisplay_contents_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "1";
      const sort = { _id: -1 };
      const filter = { deleted: false, active: true };
      return await content_db.findAll_contents_db(filter, sort, limit, page);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  slideshow_contents_s: async query => {
    try {
      const slideshow = await Content.findOne({ active: true, deleted: false }).sort({ createdAt: -1 });
      return slideshow;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_contents_s: async params => {
    try {
      return await content_db.findById_contents_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_contents_s: async body => {
    try {
      return await content_db.create_contents_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_contents_s: async (params, body) => {
    try {
      return await content_db.update_contents_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_contents_s: async params => {
    try {
      return await content_db.remove_contents_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
