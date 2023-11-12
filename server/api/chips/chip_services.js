import { determine_filter } from "../../utils/util";
import { chip_db } from "../chips";

export default {
  findAll_chips_s: async query => {
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
      const chips = await chip_db.findAll_chips_db(filter, sort, limit, page);
      const count = await chip_db.count_chips_db(filter);
      if (count !== undefined) {
        return {
          chips,
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
  findById_chips_s: async params => {
    try {
      return await chip_db.findById_chips_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByName_chips_s: async params => {
    try {
      return await chip_db.findByName_chips_db(params.name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_chips_s: async body => {
    try {
      return await chip_db.create_chips_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_chips_s: async (params, body) => {
    try {
      return await chip_db.update_chips_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_chips_s: async params => {
    try {
      return await chip_db.remove_chips_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
