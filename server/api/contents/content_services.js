import { Content, content_db } from "../contents";
import { normalizeContentFilters, normalizeContentSearch } from "./content_helpers";
import { getFilteredData } from "../api_helpers";

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
        .populate("home_page.image_object")
        .populate("home_page.images_object")
        .populate("home_page.images_object")
        .populate("home_page.banner_image_object")
        .populate("home_page.slideshow.image_object")
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
