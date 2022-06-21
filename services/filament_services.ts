import { filament_db } from "../db";
import { determine_filter } from "../util";

export default {
  findAll_filaments_s: async (query: any) => {
    try {
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
      const sort: any = { name: 1 };

      return await filament_db.findAll_filaments_db(filter, sort);
    } catch (error) {
      console.log({ findAll_filaments_s_error: error });
      throw new Error(error.message);
    }
  },
  findById_filaments_s: async (params: any) => {
    try {
      return await filament_db.findById_filaments_db(params.id);
    } catch (error) {
      console.log({ findById_filaments_s_error: error });
      throw new Error(error.message);
    }
  },
  findMy_filaments_s: async (params: any) => {
    try {
      return await filament_db.findMy_filaments_db(params.id);
    } catch (error) {
      console.log({ findById_filaments_s_error: error });
      throw new Error(error.message);
    }
  },
  create_filaments_s: async (body: any) => {
    try {
      return await filament_db.create_filaments_db(body);
    } catch (error) {
      console.log({ create_filaments_s_error: error });
      throw new Error(error.message);
    }
  },
  update_filaments_s: async (params: any, body: any) => {
    try {
      return await filament_db.update_filaments_db(params.id, body);
    } catch (error) {
      console.log({ update_filaments_s_error: error });
      throw new Error(error.message);
    }
  },
  remove_filaments_s: async (params: any) => {
    try {
      return await filament_db.remove_filaments_db(params.id);
    } catch (error) {
      console.log({ remove_filaments_s_error: error });
      throw new Error(error.message);
    }
  },
};
