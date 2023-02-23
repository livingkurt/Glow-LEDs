import { Email } from "../emails";

export default {
  findAll_emails_db: async (filter: any, sort: any, limit = 0) => {
    try {
      return await Email.find(filter).sort(sort).limit(limit);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_emails_db: async (id: string) => {
    try {
      return await Email.findOne({ _id: id });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_emails_db: async (body: any) => {
    try {
      return await Email.create(body);
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
