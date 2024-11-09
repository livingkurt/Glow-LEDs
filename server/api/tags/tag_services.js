import tag_db from "./tag_db.js";
import { getFilteredData } from "../api_helpers.js";
import { normalizeTagSearch } from "./tag_helpers.js";

export default {
  table_tags_s: async query => {
    try {
      const sort_options = ["name", "pathname"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        search_name: "name",
        normalizeSearch: normalizeTagSearch,
      });
      const tags = await tag_db.table_tags_db(filter, sort, limit, page);
      const count = await tag_db.count_tags_db(filter);
      return {
        data: tags,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_tags_s: async query => {
    try {
      const tags = await tag_db.findAll_tags_db({ deleted: false, ...query }, {});
      return tags;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tags_s: async params => {
    try {
      return await tag_db.findById_tags_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tags_s: async body => {
    try {
      return await tag_db.create_tags_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tags_s: async (params, body) => {
    try {
      return await tag_db.update_tags_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_tags_s: async params => {
    try {
      return await tag_db.remove_tags_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
