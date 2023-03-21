import { Promo } from "../promos";
import { Wholesaler } from "../wholesalers";

export default {
  findAll_wholesalers_db: async (filter: any, sort: any, limit: any, page: any) => {
    try {
      return await Wholesaler.find(filter)
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
  findBy_wholesalers_db: async (params: any) => {
    try {
      return await Wholesaler.findOne(params).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_wholesalers_db: async (pathname: string) => {
    try {
      return await Wholesaler.findOne({ pathname: pathname }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_wholesalers_db: async (id: string) => {
    try {
      return await Wholesaler.findOne({ _id: id }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_wholesalers_db: async (body: any) => {
    try {
      return await Wholesaler.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_wholesalers_db: async (params: any, body: any) => {
    try {
      const wholesaler: any = await Wholesaler.findOne({ pathname: params.pathname });
      if (wholesaler) {
        return await Wholesaler.updateOne({ pathname: params.pathname }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_wholesalers_db: async (params: { pathname: string }) => {
    try {
      const wholesaler: any = await Wholesaler.findOne({ pathname: params.pathname });
      if (wholesaler) {
        return await Wholesaler.updateOne({ pathname: params.pathname }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_wholesalers_db: async (filter: any) => {
    try {
      return await Wholesaler.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
