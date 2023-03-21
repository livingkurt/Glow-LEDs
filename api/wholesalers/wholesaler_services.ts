import { determine_filter } from "../../util";
import dotenv from "dotenv";
import wholesaler_db from "./wholesaler_db";
dotenv.config();

export default {
  findAll_wholesalers_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
    try {
      const page: any = query.page ? query.page : 1;
      const limit: any = query.limit ? query.limit : 0;
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
      } else if (sort_query === "sponsor") {
        sort = { sponsor: -1 };
      } else if (sort_query === "promoter") {
        sort = { promoter: -1 };
      } else if (sort_query === "active") {
        sort = { active: -1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }

      const wholesalers = await wholesaler_db.findAll_wholesalers_db(filter, sort, limit, page);
      const count = await wholesaler_db.count_wholesalers_db(filter);
      return {
        wholesalers,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_wholesalers_s: async (params: { id: string }) => {
    try {
      return await wholesaler_db.findById_wholesalers_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_wholesalers_s: async (body: any) => {
    try {
      return await wholesaler_db.create_wholesalers_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_wholesalers_s: async (params: any, body: any) => {
    try {
      return await wholesaler_db.update_wholesalers_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_wholesalers_s: async (params: any) => {
    try {
      return await wholesaler_db.remove_wholesalers_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
