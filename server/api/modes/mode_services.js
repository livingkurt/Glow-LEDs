import { getFilteredData } from "../api_helpers.js";
import { determine_filter } from "../../utils/util.js";
import mode_db from "./mode_db.js";
import { normalizeModeSearch } from "./mode_helpers.js";
import User from "../users/user.js";
import Affiliate from "../affiliates/affiliate.js";

export default {
  findAll_modes_s: async query => {
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
      const modes = await mode_db.findAll_modes_db(filter, sort, limit, page);
      return modes;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_modes_s: async query => {
    try {
      const sort_options = ["name", "description", "author", "microlight", "order", "visibility"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "name",
        // normalizeFilters: normalizeModeFilters,
        normalizeSearch: normalizeModeSearch,
      });
      const modes = await mode_db.findAll_modes_db(filter, sort, limit, page);
      const count = await mode_db.count_modes_db(filter);
      return {
        data: modes,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  reorder_modes_s: async body => {
    try {
      const { reorderedItems } = body;

      // Update each article's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async item => {
        await mode_db.update_modes_db({ id: item._id }, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Modes reordered successfully.";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_modes_s: async params => {
    try {
      return await mode_db.findById_modes_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_modes_s: async body => {
    console.log({ body });
    try {
      const mode = await mode_db.create_modes_db(body);
      if (body.user) {
        await User.findByIdAndUpdate(body.user, { $push: { modes: mode._id } });
      }

      if (body.affiliate) {
        await Affiliate.findByIdAndUpdate(body.affiliate, { $push: { modes: mode._id } });
      }
      console.log({ mode });

      return mode;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_modes_s: async (params, body) => {
    try {
      return await mode_db.update_modes_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_modes_s: async params => {
    try {
      return await mode_db.remove_modes_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
