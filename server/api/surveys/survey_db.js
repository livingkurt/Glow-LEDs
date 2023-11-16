import { Survey } from "../surveys";

export default {
  findAll_surveys_db: async (filter, sort, limit, page) => {
    try {
      return await Survey.find(filter)
        .populate("user")
        .populate("order")
        .populate("survey")
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
  findById_surveys_db: async id => {
    try {
      return await Survey.findOne({ _id: id, deleted: false }).populate("user").populate("order").populate("survey");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_surveys_db: async body => {
    try {
      return await Survey.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_surveys_db: async (id, body) => {
    try {
      const survey = await Survey.findOne({ _id: id, deleted: false });
      if (survey) {
        return await Survey.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_surveys_db: async id => {
    try {
      const survey = await Survey.findOne({ _id: id, deleted: false });
      if (survey) {
        return await Survey.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_surveys_db: async filter => {
    try {
      return await Survey.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
