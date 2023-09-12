import { Email } from "../emails";

export default {
  findAll_emails_db: async (filter: any, sort: any, limit: string, page: string) => {
    try {
      return await Email.find(filter)
        .populate("image_object")
        .populate("images_object")
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_emails_db: async (id: string) => {
    try {
      return await Email.findOne({ _id: id }).populate("image_object").populate("images_object");
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_emails_db: async (body: any) => {
    try {
      return await Email.create(body);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_emails_db: async (id: string, body: any) => {
    try {
      const email: any = await Email.findOne({ _id: id });
      if (email) {
        return await Email.updateOne({ _id: id }, body);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_emails_db: async (id: string) => {
    try {
      const email: any = await Email.findOne({ _id: id });
      if (email) {
        return await Email.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_emails_db: async (filter: any) => {
    try {
      return await Email.countDocuments(filter);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
