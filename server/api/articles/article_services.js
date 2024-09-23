import article_db from "./article_db";
import { getFilteredData } from "../api_helpers";
import { handleTagFiltering } from "../products/product_helpers";
import { Affiliate } from "../affiliates";

export default {
  findAll_articles_s: async query => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const articles = await article_db.findAll_article_db(filter, sort, limit, page);
      return articles;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_articles_s: async query => {
    try {
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options: ["active", "title", "author"],
      });
      const articles = await article_db.findAll_article_db(filter, sort, limit, page);
      const count = await article_db.count_article_db(filter);
      return {
        data: articles,
        total_count: count,
        currentPage: parseInt(page),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllGrid_articles_s: async query => {
    try {
      let filter = { deleted: false };
      let limit = 0;

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
        }
      }

      let articles = await article_db.findAllGrid_articles_db(filter, sortOption, limit);

      return articles;
    } catch (error) {
      console.error("Error in findAllGrid_articles_s:", error);
      throw new Error(error.message || "An error occurred while fetching articles");
    }
  },
  findById_articles_s: async params => {
    try {
      return await article_db.findById_articles_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_articles_s: async body => {
    try {
      return await article_db.create_articles_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_articles_s: async (params, body) => {
    try {
      return await article_db.update_articles_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  reorder_articles_s: async body => {
    try {
      const { reorderedItems } = body;

      // Update each article's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async item => {
        await article_db.update_articles_db({ id: item._id }, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Articles reordered successfully.";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_articles_s: async params => {
    try {
      return await article_db.remove_articles_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
