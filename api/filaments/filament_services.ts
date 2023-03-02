import { filament_db } from "../filaments";
import { determine_filter } from "../../util";

export default {
  findAll_filaments_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const page: string = query.page ? query.page : "1";
      const limit: string = query.limit ? query.limit : "0";
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
      const sort: any = { name: 1 };

      const filaments = await filament_db.findAll_filaments_db(filter, sort, limit, page);
      const count = await filament_db.count_filaments_db(filter);
      return {
        filaments,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_filaments_s: async (params: any) => {
    try {
      return await filament_db.findById_filaments_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_filaments_s: async (params: any) => {
    try {
      return await filament_db.findMy_filaments_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filaments_s: async (body: any) => {
    try {
      return await filament_db.create_filaments_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_filaments_s: async (params: any, body: any) => {
    try {
      return await filament_db.update_filaments_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_filaments_s: async (params: any) => {
    try {
      return await filament_db.remove_filaments_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
