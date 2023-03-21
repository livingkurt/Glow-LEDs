import { Promo } from "../promos";
import { Tutorial } from ".";

export default {
  findAll_tutorials_db: async (filter: any, sort: any, limit: any, page: any) => {
    try {
      return await Tutorial.find(filter)
        .sort(sort)
        .populate("user")

        .limit(parseInt(limit))
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_tutorials_db: async (params: any) => {
    try {
      return await Tutorial.findOne(params).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_tutorials_db: async (pathname: string) => {
    try {
      return await Tutorial.findOne({ pathname: pathname }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tutorials_db: async (id: string) => {
    try {
      return await Tutorial.findOne({ _id: id }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tutorials_db: async (body: any) => {
    try {
      return await Tutorial.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tutorials_db: async (params: any, body: any) => {
    try {
      const tutorial: any = await Tutorial.findOne({ pathname: params.pathname });
      if (tutorial) {
        return await Tutorial.updateOne({ pathname: params.pathname }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_tutorials_db: async (params: { pathname: string }) => {
    try {
      const tutorial: any = await Tutorial.findOne({ pathname: params.pathname });
      if (tutorial) {
        return await Tutorial.updateOne({ pathname: params.pathname }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_tutorials_db: async (filter: any) => {
    try {
      return await Tutorial.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
