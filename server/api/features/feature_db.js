import { Feature } from "../features";

export default {
  findAll_features_db: async (filter, sort, limit, page) => {
    try {
      return await Feature.find(filter)
        .populate("user")
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_features_db: async pathname => {
    try {
      return await Feature.findOne({ pathname: pathname, deleted: false }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_features_db: async body => {
    try {
      return await Feature.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_features_db: async (id, body) => {
    try {
      const feature = await Feature.findOne({ _id: id, deleted: false });
      if (feature) {
        return await Feature.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_features_db: async id => {
    try {
      const feature = await Feature.findOne({ _id: id, deleted: false });
      if (feature) {
        return await Feature.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_features_db: async filter => {
    try {
      return await Feature.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
