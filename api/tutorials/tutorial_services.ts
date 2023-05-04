import dotenv from "dotenv";
import tutorial_db from "./tutorial_db";
import { getFilteredData } from "../api_helpers";
dotenv.config();

export default {
  findAll_tutorials_s: async (query: { search: string; sort: string; page: string; limit: string }) => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

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
  reorder_tutorials_s: async (body: any) => {
    try {
      const { reorderedItems } = body;

      // Update each tutorial's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async (item: any) => {
        await tutorial_db.update_tutorials_db({ id: item._id }, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Tutorials reordered successfully.";
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
