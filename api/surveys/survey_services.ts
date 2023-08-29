import { determine_filter } from "../../util";
import { survey_db } from "../surveys";

export default {
  findAll_surveys_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const page: string = query.page ? query.page : "1";
      const limit: string = query.limit ? query.limit : "0";
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
      let sort: any = { _id: -1 };
      if (sort_query === "glover name") {
        sort = { artist_name: 1 };
      } else if (sort_query === "facebook name") {
        sort = { facebook_name: 1 };
      } else if (sort_query === "newest") {
        sort = { name: 1 };
      }
      const surveys = await survey_db.findAll_surveys_db(filter, sort, limit, page);
      const count = await survey_db.count_surveys_db(filter);
      if (count !== undefined) {
        return {
          surveys,
          totalPages: Math.ceil(count / parseInt(limit)),
          currentPage: page,
        };
      } else {
        // Handle the case where count is undefined
        throw new Error("Count is undefined");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_surveys_s: async (params: any) => {
    try {
      return await survey_db.findById_surveys_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_surveys_s: async (body: any) => {
    try {
      return await survey_db.create_surveys_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_surveys_s: async (params: any, body: any) => {
    try {
      return await survey_db.update_surveys_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_surveys_s: async (params: any) => {
    try {
      return await survey_db.remove_surveys_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
