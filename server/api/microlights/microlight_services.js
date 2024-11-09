import { getFilteredData } from "../api_helpers.js";
import { determine_filter } from "../../utils/util.js";
import microlight_db from "./microlight_db.js";
import { normalizeMicrolightSearch } from "./microlight_helpers.js";

export default {
  findAll_microlights_s: async query => {
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
      let sort = { name: 1 };
      if (sort_query === "glover name") {
        sort = { artist_name: 1 };
      } else if (sort_query === "facebook name") {
        sort = { facebook_name: 1 };
      } else if (sort_query === "newest") {
        sort = { name: 1 };
      }
      const microlights = await microlight_db.findAll_microlights_db(filter, sort, limit, page);
      return microlights;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_microlights_s: async query => {
    try {
      const sort_options = ["name", "company", "category", "programmable"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "name",
        // normalizeFilters: normalizeMicrolightFilters,
        normalizeSearch: normalizeMicrolightSearch,
      });
      const microlights = await microlight_db.findAll_microlights_db(filter, sort, limit, page);
      const count = await microlight_db.count_microlights_db(filter);
      return {
        data: microlights,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_microlights_s: async params => {
    try {
      return await microlight_db.findById_microlights_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByName_microlights_s: async params => {
    try {
      return await microlight_db.findByName_microlights_db(params.name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_microlights_s: async body => {
    try {
      return await microlight_db.create_microlights_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_microlights_s: async (params, body) => {
    try {
      return await microlight_db.update_microlights_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_microlights_s: async params => {
    try {
      return await microlight_db.remove_microlights_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
