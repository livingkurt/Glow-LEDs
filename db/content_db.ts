import Content from "../models/content";

export default {
  findAll_contents_db: async (filter: any, sort: any, limit: any) => {
    try {
      return await Content.find(filter).sort(sort).limit(parseInt(limit));
    } catch (error) {
      throw new Error(error.message);
    }
  },
  findById_contents_db: async (id: string) => {
    try {
      return await Content.findOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  create_contents_db: async (body: any) => {
    try {
      return await Content.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update_contents_db: async (id: string, body: any) => {
    try {
      const content: any = await Content.findOne({ _id: id });
      if (content) {
        return await Content.updateOne({ _id: id }, body);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  remove_contents_db: async (id: string) => {
    try {
      const content: any = await Content.findOne({ _id: id });
      if (content) {
        return await Content.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
