import { parcel_db } from "../parcels";
import { determine_filter } from "../../utils/util";

export default {
  findAll_parcels_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            facebook_name: {
              $regex: query.search,
              $options: "i",
            },
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort = { _id: -1 };
      if (sort_query === "glover name") {
        sort = { artist_name: 1 };
      } else if (sort_query === "facebook name") {
        sort = { facebook_name: 1 };
      } else if (sort_query === "newest") {
        sort = { name: 1 };
      }
      const parcels = await parcel_db.findAll_parcels_db(filter, sort, limit, page);
      const count = await parcel_db.count_parcels_db(filter);

      if (count !== undefined) {
        return {
          parcels,
          totalPages: Math.ceil(count / parseInt(limit)),
          currentPage: page,
        };
      } else {
        throw new Error("Count is undefined");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_parcels_s: async params => {
    try {
      return await parcel_db.findById_parcels_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_parcels_s: async body => {
    try {
      return await parcel_db.create_parcels_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_parcels_s: async (params, body) => {
    try {
      return await parcel_db.update_parcels_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_parcels_s: async params => {
    try {
      return await parcel_db.remove_parcels_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
