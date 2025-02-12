import feature_db from "./feature_db.js";
import { determine_filter } from "../../utils/util.js";
import { normalizeFeatureSearch } from "./feature_helpers.js";
import { getFilteredData } from "../api_helpers.js";

export default {
  get_table_features_s: async query => {
    try {
      const sort_options = ["release-date", "category", "artist_name", "instagram_handle", "facebook_name", "video"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeSearch: normalizeFeatureSearch,
      });
      const features = await feature_db.findAll_features_db(filter, sort, limit, page);
      const count = await feature_db.count_features_db(filter);
      return {
        data: features,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_features_s: async query => {
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
        sort = { release_date: -1 };
      }

      const features = await feature_db.findAll_features_db(filter, sort, limit, page);
      const count = await feature_db.count_features_db(filter);
      if (count !== undefined) {
        return {
          features,
          totalPages: Math.ceil(count / parseInt(limit, 10)),
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
  findByPathname_features_s: async params => {
    try {
      return await feature_db.findByPathname_features_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_features_s: async body => {
    try {
      return await feature_db.create_features_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_features_s: async (params, body) => {
    try {
      return await feature_db.update_features_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_features_s: async params => {
    try {
      return await feature_db.remove_features_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
