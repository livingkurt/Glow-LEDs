import { determine_filter } from "../../util";
import { getFilteredData } from "../api_helpers";
import { survey_db } from "../surveys";
import { normalizeSurveyFilters, normalizeSurveySearch } from "./survey_helpers";

export default {
  get_table_surveys_s: async (query: { page: string; search: string; sort: any; limit: string; filters: any }) => {
    try {
      const sort_options = ["createdAt", "active", "home_page", "banner"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        normalizeFilters: normalizeSurveyFilters,
        normalizeSearch: normalizeSurveySearch,
      });
      const surveys = await survey_db.findAll_surveys_db(filter, sort, limit, page);
      const count = await survey_db.count_surveys_db(filter);
      return {
        data: surveys,
        total_count: count,
        currentPage: page,
      };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_surveys_s: async (query: any) => {
    const { limit, page, search, sort, filters } = query;
    console.log({ query });
    try {
      const surveys = await survey_db.findAll_surveys_db(JSON.parse(filters), sort, limit, page);
      const count = await survey_db.count_surveys_db(filters);
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
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_surveys_s: async (params: any) => {
    try {
      return await survey_db.findById_surveys_db(params.id);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_surveys_s: async (body: any) => {
    try {
      return await survey_db.create_surveys_db(body);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_surveys_s: async (params: any, body: any) => {
    try {
      return await survey_db.update_surveys_db(params.id, body);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_surveys_s: async (params: any) => {
    try {
      return await survey_db.remove_surveys_db(params.id);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
