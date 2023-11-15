import { Paycheck } from "../paychecks";

export default {
  findAll_paychecks_db: async (filter, sort, limit, page) => {
    try {
      return await Paycheck.find(filter)
        .sort(sort)
        .populate("user")
        .populate("affiliate")
        .populate("team")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_paychecks_db: async id => {
    try {
      return await Paycheck.findOne({ _id: id, deleted: false })
        .populate("user")
        .populate("affiliate")
        .populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_paychecks_db: async filter => {
    try {
      return await Paycheck.findOne(filter).populate("user").populate("affiliate").populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_paychecks_db: async affiliate_id => {
    try {
      return await Paycheck.find({ deleted: false, affiliate: affiliate_id })
        .sort({ _id: -1 })
        .populate("affiliate")
        .populate("team");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_paychecks_db: async body => {
    try {
      return await Paycheck.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_paychecks_db: async (id, body) => {
    try {
      const paycheck = await Paycheck.findOne({ _id: id, deleted: false });
      if (paycheck) {
        return await Paycheck.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_paychecks_db: async id => {
    try {
      const paycheck = await Paycheck.findOne({ _id: id, deleted: false });
      if (paycheck) {
        return await Paycheck.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_multiple_paychecks_db: async ids => {
    try {
      return await Paycheck.updateMany({ _id: { $in: ids } }, { deleted: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_paychecks_db: async filter => {
    try {
      return await Paycheck.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_all_time_payouts_paychecks_db: async () => {
    try {
      const totalAmount = await Paycheck.aggregate([
        {
          $match: {
            deleted: false,
            paid: true,
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]).exec();
      return totalAmount;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_payouts_paychecks_db: async (start_date, end_date) => {
    try {
      const totalAmount = await Paycheck.aggregate([
        {
          $match: {
            deleted: false,
            paid: true,
            paid_at: {
              $gte: new Date(start_date),
              $lt: new Date(end_date),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]).exec();
      return totalAmount;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
