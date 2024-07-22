import { Email } from "../emails";

export default {
  findAll_emails_db: async (filter, sort, limit, page) => {
    try {
      return await Email.find(filter)
        .populate("image")
        .populate("images")
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
  findById_emails_db: async id => {
    try {
      return await Email.findOne({ _id: id, deleted: false }).populate("image").populate("images");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_emails_db: async body => {
    try {
      return await Email.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_emails_db: async (id, body) => {
    try {
      const email = await Email.findOne({ _id: id, deleted: false });
      if (email) {
        return await Email.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_emails_db: async id => {
    try {
      const email = await Email.findOne({ _id: id, deleted: false });
      if (email) {
        return await Email.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_emails_db: async filter => {
    try {
      return await Email.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
