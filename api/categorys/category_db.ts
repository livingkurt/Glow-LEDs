import Category from "../models/category";

export default {
  findAll_categorys_db: async (filter: any, sort: any) => {
    try {
      return await Category.find(filter).sort(sort).populate("subcategorys");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_categorys_db: async (id: string) => {
    try {
      return await Category.findOne({ _id: id }).populate("subcategorys");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_categorys_db: async (body: any) => {
    try {
      return await Category.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_categorys_db: async (id: string, body: any) => {
    try {
      const category: any = await Category.findOne({ _id: id });
      if (category) {
        return await Category.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_categorys_db: async (id: string) => {
    try {
      const category: any = await Category.findOne({ _id: id });
      if (category) {
        return await Category.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
