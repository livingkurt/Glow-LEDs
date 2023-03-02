import { category_db } from "../categorys";
import { determine_filter } from "../../util";

export default {
  findAll_categorys_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const page: string = query.page ? query.page : "1";
      const limit: string = query.limit ? query.limit : "0";
      const filter = determine_filter(query, {});
      const sort = {};
      const categorys = await category_db.findAll_categorys_db(filter, sort, limit, page);
      const count = await category_db.count_categorys_db(filter);
      return {
        categorys,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_categorys_s: async (params: any) => {
    try {
      return await category_db.findById_categorys_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_categorys_s: async (body: any) => {
    try {
      return await category_db.create_categorys_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_categorys_s: async (params: any, body: any) => {
    try {
      return await category_db.update_categorys_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_categorys_s: async (params: any) => {
    try {
      return await category_db.remove_categorys_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
