import Email from "./email.js";

export default {
  findAll_emails_db: async (filter, sort, limit, page) => {
    try {
      return await Email.find(filter)
        .sort(sort)
        .limit(parseInt(limit, 10))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit, 10))
        .populate({
          path: "modules.content.line_break",
          model: "Image",
        })
        .populate({
          path: "modules.content.title_image",
          model: "Image",
        })
        .populate({
          path: "modules.content.image",
          model: "Image",
        })
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_emails_db: async id => {
    try {
      return await Email.findOne({ _id: id, deleted: false })
        .populate({
          path: "modules.content.line_break",
          model: "Image",
        })
        .populate({
          path: "modules.content.image",
          model: "Image",
        })
        .populate({
          path: "modules.content.title_image",
          model: "Image",
        });
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
