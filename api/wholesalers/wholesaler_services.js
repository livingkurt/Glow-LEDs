import wholesaler_db from "./wholesaler_db";
import { getFilteredData } from "../api_helpers";

export default {
  findAll_wholesalers_s: async (query: { page; search; sort; limit; filters }) => {
    try {
      const sort_options = ["company", "minimum_order_amount", "active"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "company" });
      const wholesalers = await wholesaler_db.findAll_wholesalers_db(filter, sort, limit, page);
      const count = await wholesaler_db.count_wholesalers_db(filter);
      return {
        data: wholesalers,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_wholesalers_s: async (params: { id }) => {
    try {
      return await wholesaler_db.findById_wholesalers_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_wholesalers_s: async (body) => {
    try {
      return await wholesaler_db.create_wholesalers_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_wholesalers_s: async (params, body) => {
    try {
      return await wholesaler_db.update_wholesalers_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_wholesalers_s: async (params) => {
    try {
      return await wholesaler_db.remove_wholesalers_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
