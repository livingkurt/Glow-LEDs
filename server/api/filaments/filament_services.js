import filament_db from "./filament_db.js";
import { determine_filter } from "../../utils/util.js";
import { getFilteredData } from "../api_helpers.js";

export default {
  get_table_filaments_s: async query => {
    try {
      const sort_options = ["color", "type", "color_code", "active", "category"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        // normalizeFilters: normalizeFilamentFilters,
        // normalizeSearch: normalizeFilamentSearch,
      });
      const filaments = await filament_db.findAll_filaments_db(filter, sort, limit, page);
      const count = await filament_db.count_filaments_db(filter);
      return {
        data: filaments,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_filaments_s: async query => {
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
      const sort = { name: 1 };

      const filaments = await filament_db.findAll_filaments_db(filter, sort, limit, page);
      return filaments;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_filaments_s: async params => {
    try {
      return await filament_db.findById_filaments_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_filaments_s: async params => {
    try {
      return await filament_db.findMy_filaments_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filaments_s: async body => {
    try {
      return await filament_db.create_filaments_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_filaments_s: async (params, body) => {
    try {
      return await filament_db.update_filaments_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_filaments_s: async params => {
    try {
      return await filament_db.remove_filaments_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
