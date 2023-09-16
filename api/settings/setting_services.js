import { setting_db } from "../settings";
import { determine_filter } from "../../util";

export default {
  findAll_settings_s: async (query: { page; search; sort; limit }) => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            facebook_name: {
              $regex: query.search,
              $options: "i",
            },
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort = { _id: -1 };
      if (sort_query === "glover name") {
        sort = { artist_name: 1 };
      } else if (sort_query === "facebook name") {
        sort = { facebook_name: 1 };
      } else if (sort_query === "newest") {
        sort = { name: 1 };
      }

      const settings = await setting_db.findAll_settings_db(filter, sort, limit, page);
      const count = await setting_db.count_settings_db(filter);
      if (count !== undefined) {
        return {
          settings,
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
  findById_settings_s: async (params) => {
    try {
      return await setting_db.findById_settings_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_settings_s: async (body) => {
    try {
      return await setting_db.create_settings_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_settings_s: async (params, body) => {
    try {
      return await setting_db.update_settings_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_settings_s: async (params) => {
    try {
      return await setting_db.remove_settings_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
