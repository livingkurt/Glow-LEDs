import { determine_filter } from "../../util";
import dotenv from "dotenv";
import tutorial_db from "./tutorial_db";
dotenv.config();

export default {
  findAll_tutorials_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
    try {
      const page: any = query.page ? query.page : 1;
      const limit: any = query.limit ? query.limit : 0;
      const search = query.search
        ? {
            title: {
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
      } else if (sort_query === "sponsor") {
        sort = { sponsor: -1 };
      } else if (sort_query === "promoter") {
        sort = { promoter: -1 };
      } else if (sort_query === "active") {
        sort = { active: -1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }

      const tutorials = await tutorial_db.findAll_tutorials_db(filter, sort, limit, page);
      const count = await tutorial_db.count_tutorials_db(filter);
      return {
        data: tutorials,
        total_count: count,
        currentPage: parseInt(page)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tutorials_s: async (params: { id: string }) => {
    try {
      return await tutorial_db.findById_tutorials_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tutorials_s: async (body: any) => {
    try {
      return await tutorial_db.create_tutorials_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tutorials_s: async (params: any, body: any) => {
    try {
      return await tutorial_db.update_tutorials_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_tutorials_s: async (params: any) => {
    try {
      return await tutorial_db.remove_tutorials_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
