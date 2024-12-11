import Tag from "./tag.js";

export default {
  table_tags_db: async (filter, sort, limit, page) => {
    try {
      return await Tag.find(filter)
        .sort(sort)
        .limit(parseInt(limit, 10))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit, 10))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAll_tags_db: async (filter, sort) => {
    try {
      return await Tag.find({ deleted: false, ...filter }).sort(sort);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_tags_db: async id => {
    try {
      return await Tag.findOne({ _id: id, deleted: false });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_tags_db: async pathname => {
    try {
      return await Tag.findOne({ pathname: pathname, deleted: false });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_tags_db: async body => {
    try {
      return await Tag.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_tags_db: async (id, body) => {
    try {
      const tag = await Tag.findOne({ _id: id, deleted: false });
      if (tag) {
        return await Tag.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_tags_db: async id => {
    try {
      const tag = await Tag.findOne({ _id: id, deleted: false });
      if (tag) {
        return await Tag.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_tags_db: async filter => {
    try {
      return await Tag.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
