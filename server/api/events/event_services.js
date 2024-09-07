import event_db from "./event_db";
import { getFilteredData } from "../api_helpers";

export default {
  findAll_events_s: async query => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const events = await event_db.findAll_events_db(filter, sort, limit, page);
      const count = await event_db.count_events_db(filter);
      return events;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_events_s: async query => {
    try {
      const sort_options = ["title", "video", "level", "order"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: "title" });

      const events = await event_db.findAll_events_db(filter, sort, limit, page);
      const count = await event_db.count_events_db(filter);
      return {
        data: events,
        total_count: count,
        currentPage: parseInt(page),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_events_s: async params => {
    try {
      return await event_db.findById_events_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_events_s: async body => {
    try {
      return await event_db.create_events_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_events_s: async (params, body) => {
    try {
      return await event_db.update_events_db(params, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  reorder_events_s: async body => {
    try {
      const { reorderedItems } = body;

      // Update each event's order using the reorderedItems array
      const updatePromises = reorderedItems.map(async item => {
        await event_db.update_events_db({ id: item._id }, { ...item, order: item.order });
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Send success response
      return "Events reordered successfully.";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_events_s: async params => {
    try {
      return await event_db.remove_events_db(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
