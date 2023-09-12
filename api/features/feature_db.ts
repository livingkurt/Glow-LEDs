import { Feature } from "../features";

export default {
  findAll_features_db: async (filter: any, sort: any, limit: string, page: string) => {
    try {
      return await Feature.find(filter)
        .sort(sort)
        .populate("user")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_features_db: async (pathname: string) => {
    try {
      return await Feature.findOne({ pathname: pathname }).populate("user");
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_features_db: async (body: any) => {
    try {
      return await Feature.create(body);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_features_db: async (id: string, body: any) => {
    try {
      const feature: any = await Feature.findOne({ _id: id });
      if (feature) {
        return await Feature.updateOne({ _id: id }, body);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_features_db: async (id: string) => {
    try {
      const feature: any = await Feature.findOne({ _id: id });
      if (feature) {
        return await Feature.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_features_db: async (filter: any) => {
    try {
      return await Feature.countDocuments(filter);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
