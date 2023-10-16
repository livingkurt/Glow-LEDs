import { category_db } from "../categorys";
import { getFilteredData } from "../api_helpers";

export default {
  findAll_categorys_s: async query => {
    try {
      const sort_options = ["name", "type", "pathname"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "name" });
      const categorys = await category_db.findAll_categorys_db(filter, sort, limit, page);
      const count = await category_db.count_categorys_db(filter);
      return {
        data: categorys,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_categorys_s: async params => {
    try {
      return await category_db.findById_categorys_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_categorys_s: async body => {
    try {
      return await category_db.create_categorys_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_categorys_s: async (params, body) => {
    try {
      return await category_db.update_categorys_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_categorys_s: async params => {
    try {
      return await category_db.remove_categorys_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
