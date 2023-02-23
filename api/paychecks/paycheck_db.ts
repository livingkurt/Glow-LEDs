import { Paycheck } from "../paychecks";

export default {
  findAll_paychecks_db: async (filter: any, sort: any, limit: any, page: any) => {
    try {
      return await Paycheck.find(filter)
        .sort(sort)
        .populate("user")
        .populate("affiliate")
        .populate("team")
        .limit(parseInt(limit))
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_paychecks_db: async (id: string) => {
    try {
      return await Paycheck.findOne({ _id: id }).populate("user").populate("affiliate").populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_paychecks_db: async (affiliate_id: string) => {
    try {
      return await Paycheck.find({ deleted: false, affiliate: affiliate_id }).sort({ _id: -1 }).populate("affiliate").populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_paychecks_db: async (body: any) => {
    try {
      return await Paycheck.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_paychecks_db: async (id: string, body: any) => {
    try {
      const paycheck: any = await Paycheck.findOne({ _id: id });
      if (paycheck) {
        return await Paycheck.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_paychecks_db: async (id: string) => {
    try {
      const paycheck: any = await Paycheck.findOne({ _id: id });
      if (paycheck) {
        return await Paycheck.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_paychecks_db: async (filter: any) => {
    try {
      return await Paycheck.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
