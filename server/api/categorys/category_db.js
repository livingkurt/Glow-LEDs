import { Category } from "../categorys";

export default {
  findAll_categorys_db: async (filter, sort, limit, page) => {
    try {
      return await Category.find(filter)
        .sort(sort)
        .populate("subcategorys")
        .populate("collections")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_categorys_db: async id => {
    try {
      return await Category.findOne({ _id: id, deleted: false }).populate("subcategorys").populate("collections");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_categorys_db: async pathname => {
    try {
      return await Category.findOne({ pathname: pathname, deleted: false })
        .populate("subcategorys")
        .populate("collections");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_categorys_db: async body => {
    try {
      return await Category.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_categorys_db: async (id, body) => {
    try {
      const category = await Category.findOne({ _id: id, deleted: false });
      if (category) {
        return await Category.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_categorys_db: async id => {
    try {
      const category = await Category.findOne({ _id: id, deleted: false });
      if (category) {
        return await Category.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_categorys_db: async filter => {
    try {
      return await Category.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
