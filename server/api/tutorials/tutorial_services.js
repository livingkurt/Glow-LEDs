import tutorial_db from "./tutorial_db.js";
import { getFilteredData } from "../api_helpers.js";
import { handleTagFiltering } from "../products/product_helpers.js";
import Affiliate from "../affiliates/affiliate.js";

export default {
  findAll_tutorials_s: async query => {
    try {
      const sort_options = ["active", "title", "video", "order", "level"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const tutorials = await tutorial_db.findAll_tutorials_db(filter, sort, limit, page);
      return tutorials;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_tutorials_s: async query => {
    try {
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options: ["active", "title", "video", "order", "level"],
      });
      const tutorials = await tutorial_db.findAll_tutorials_db(filter, sort, limit, page);
      const count = await tutorial_db.count_tutorials_db(filter);
      return {
        data: tutorials,
        total_count: count,
        currentPage: parseInt(page, 10),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_tutorials_s: async query => {
    try {
      let filter = { deleted: false };
      const limit = query.limit ? query.limit : 0;

      const tagFilter = await handleTagFiltering(query.tags);
      filter = { ...filter, ...tagFilter };

      if (query.level) {
        filter.level = query.level;
      }
      if (query.glover) {
        const affiliate = await Affiliate.findOne({ pathname: query.glover });
        if (affiliate) {
          filter.affiliate = affiliate._id;
        }
      }
      // Add search functionality
      if (query.search) {
        const searchRegex = new RegExp(query.search, "i");
        filter.$or = [{ title: searchRegex }, { "tags.pathname": searchRegex }];
      }

      let sortOption = { order: 1 };
      if (query.sort) {
        switch (query.sort) {
          case "-views":
            sortOption = { views: -1 };
            break;
          case "views":
            sortOption = { views: 1 };
            break;
          case "-createdAt":
            sortOption = { createdAt: -1 };
            break;
          case "createdAt":
            sortOption = { createdAt: 1 };
            break;
          default:
            sortOption = { order: 1 };
        }
      }

      const tutorials = await tutorial_db.findAllGrid_tutorials_db(filter, sortOption, limit);

      return tutorials;
    } catch (error) {
      console.error("Error in findAllGrid_tutorials_s:", error);
      throw new Error(error.message || "An error occurred while fetching tutorials");
    }
  },
  findById_tutorials_s: async params => {
    try {
      return await tutorial_db.findById_tutorials_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tutorials_s: async body => {
    try {
      return await tutorial_db.create_tutorials_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tutorials_s: async (params, body) => {
    try {
      return await tutorial_db.update_tutorials_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  reorder_tutorials_s: async body => {
    try {
      const { reorderedItems } = body;

      // Update each tutorial's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async item => {
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
  remove_tutorials_s: async params => {
    try {
      return await tutorial_db.remove_tutorials_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
