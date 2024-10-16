import { palette_db } from "../palettes";
import { determine_filter } from "../../utils/util";
import { getFilteredData } from "../api_helpers";
import { normalizeParcelSearch } from "../parcels/parcel_helpers";

export default {
  get_table_palettes_s: async query => {
    try {
      const sort_options = ["name", "type", "length", "width", "height", "volume"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeSearch: normalizeParcelSearch,
      });
      const palettes = await palette_db.findAll_palettes_db(filter, sort, limit, page);
      const count = await palette_db.count_palettes_db(filter);
      return {
        data: palettes,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_palettes_s: async query => {
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

      const palettes = await palette_db.findAll_palettes_db(filter, sort, limit, page);
      const count = await palette_db.count_palettes_db(filter);
      if (count !== undefined) {
        return {
          palettes,
          totalPages: Math.ceil(count / parseInt(limit)),
          currentPage: page,
        };
      }
      throw new Error("Count is undefined");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_palettes_s: async params => {
    try {
      return await palette_db.findById_palettes_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_palettes_s: async params => {
    try {
      return await palette_db.findMy_palettes_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_palettes_s: async body => {
    try {
      return await palette_db.create_palettes_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_palettes_s: async (params, body) => {
    try {
      return await palette_db.update_palettes_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_palettes_s: async params => {
    try {
      return await palette_db.remove_palettes_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
