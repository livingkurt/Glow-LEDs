import Paycheck from "./paycheck.js";

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
  table_paychecks_db: async (filter, sort, limit, page) => {
    try {
      return await Paycheck.find(filter)
        .sort(sort)
        .populate("user")
        .populate("affiliate")
        .populate("team")
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
      const paycheck = await Paycheck.findOne({ _id: id });
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
  get_monthly_paychecks_paychecks_db: async year => {
    try {
      const amountByMonth = await Paycheck.aggregate([
        {
          $match: {
            deleted: false,
            paid_at: {
              // Assuming 'paid_at' is the field that holds the paid_at information
              $gte: new Date(`${year}-01-01T00:00:00.000Z`),
              $lt: new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`),
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$paid_at" }, // Apply $month and $dayOfMonth to 'paid_at' field
              day: { $dayOfMonth: "$paid_at" },
            },
            dailyAmount: {
              $sum: "$amount",
            },
          },
        },
        {
          $group: {
            _id: {
              month: "$_id.month",
            },
            amount: {
              $sum: "$dailyAmount",
            },
            dailyAverage: {
              $avg: "$dailyAmount",
            },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            amount: 1,
            dailyAverage: 1,
          },
        },
      ]).exec();

      return amountByMonth;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  get_yearly_paychecks_paychecks_db: async () => {
    try {
      const amountByYear = await Paycheck.aggregate([
        {
          $match: {
            deleted: false,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$paid_at" },
              month: { $month: "$paid_at" },
            },
            monthlyAmount: {
              $sum: "$amount",
            },
          },
        },
        {
          $group: {
            _id: {
              year: "$_id.year",
            },
            amount: {
              $sum: "$monthlyAmount",
            },
            monthlyAverage: {
              $avg: "$monthlyAmount",
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            amount: 1,
            monthlyAverage: 1,
          },
        },
      ]).exec();
      return amountByYear;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_daily_paychecks_paychecks_db: async (start_date, end_date) => {
    try {
      const amountByDay = await Paycheck.aggregate([
        {
          $match: {
            deleted: false,
            paid_at: {
              $gte: new Date(start_date),
              $lt: new Date(end_date),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$paid_at" },
              month: { $month: "$paid_at" },
              day: { $dayOfMonth: "$paid_at" },
              hour: { $hour: "$paid_at" },
            },
            hourlyAmount: {
              $sum: "$amount",
            },
          },
        },
        {
          $group: {
            _id: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
            amount: {
              $sum: "$hourlyAmount",
            },
            hourlyAverage: {
              $avg: "$hourlyAmount",
            },
          },
        },
        {
          $project: {
            date: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
            amount: 1,
            hourlyAverage: 1,
            _id: 0,
          },
        },
        {
          $sort: {
            date: 1,
          },
        },
      ]).exec();

      return amountByDay;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
