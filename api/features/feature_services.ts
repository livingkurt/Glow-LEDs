import { feature_db } from "../features";
import { determine_filter } from "../../util";

export default {
  findAll_features_s: async (query: { page: number; search: string; sort: string; limit: number }) => {
    try {
      const page: number = query.page ? query.page : 1;
      const limit: number = query.limit ? query.limit : 0;
      const search = query.search
        ? {
            facebook_name: {
              $regex: query.search,
              $options: "i"
            }
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort: any = { _id: -1 };
      if (sort_query === "glover name") {
        sort = { artist_name: 1 };
      } else if (sort_query === "facebook name") {
        sort = { facebook_name: 1 };
      } else if (sort_query === "newest") {
        sort = { release_date: -1 };
      }

      const features = await feature_db.findAll_features_db(filter, sort, limit, page);
      const count = await feature_db.count_features_db(filter);
      return {
        features,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_features_s: async (params: any) => {
    try {
      return await feature_db.findByPathname_features_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  create_features_s: async (body: any) => {
    try {
      return await feature_db.create_features_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_features_s: async (params: any, body: any) => {
    try {
      return await feature_db.update_features_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_features_s: async (params: any) => {
    try {
      return await feature_db.remove_features_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
