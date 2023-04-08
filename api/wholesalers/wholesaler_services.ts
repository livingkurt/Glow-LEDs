import { determine_filter } from "../../util";
import dotenv from "dotenv";
import wholesaler_db from "./wholesaler_db";
import { getFilteredData } from "../paychecks/paycheck_helper";
dotenv.config();

export default {
  findAll_wholesalers_s: async (query: { page: string; search: string; sort: any; limit: string; filters: any }) => {
    try {
      const sort_options = ["user", "company", "minimum_order_amount"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "company" });
      const wholesalers = await wholesaler_db.findAll_wholesalers_db(filter, sort, limit, page);
      const count = await wholesaler_db.count_wholesalers_db(filter);
      return {
        data: wholesalers,
        total_count: count,
        currentPage: page
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
