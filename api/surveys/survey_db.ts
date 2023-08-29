import { Survey } from "../surveys";

export default {
  findAll_surveys_db: async (filter: any, sort: any, limit: string, page: string) => {
    try {
      return await Survey.find(filter)
        .sort(sort)
        .populate("user")
        .populate("affiliate")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_surveys_db: async (id: string) => {
    try {
      return await Survey.findOne({ _id: id }).populate("user").populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_surveys_db: async (body: any) => {
    try {
      return await Survey.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_surveys_db: async (id: string, body: any) => {
    try {
      const survey: any = await Survey.findOne({ _id: id });
      if (survey) {
        return await Survey.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_surveys_db: async (id: string) => {
    try {
      const survey: any = await Survey.findOne({ _id: id });
      if (survey) {
        return await Survey.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_surveys_db: async (filter: any) => {
    try {
      return await Survey.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
