import { Expense } from "../expenses";

export default {
  findAll_expenses_db: async (filter, sort, limit, page) => {
    try {
      return await Expense.find(filter)
        .sort(sort)
        .populate("documents")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_expenses_db: async id => {
    try {
      return await Expense.findOne({ _id: id }).populate("documents");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_expenses_db: async body => {
    try {
      return await Expense.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_expenses_db: async (id, body) => {
    try {
      const expense = await Expense.findOne({ _id: id });
      if (expense) {
        return await Expense.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_expenses_db: async id => {
    try {
      const expense = await Expense.findOne({ _id: id });
      if (expense) {
        return await Expense.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_expenses_db: async filter => {
    try {
      return await Expense.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  get_range_expenses_expenses_db: async (start_date, end_date) => {
    try {
      const totalAmount = await Expense.aggregate([
        {
          $match: {
            deleted: false,
            date_of_purchase: {
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
  get_monthly_expenses_expenses_db: async year => {
    try {
      const amountByMonth = await Expense.aggregate([
        {
          $match: {
            deleted: false,
            date_of_purchase: {
              // Assuming 'date_of_purchase' is the field that holds the date_of_purchase information
              $gte: new Date(`${year}-01-01T00:00:00.000Z`),
              $lt: new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`),
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$date_of_purchase" }, // Apply $month and $dayOfMonth to 'date_of_purchase' field
              day: { $dayOfMonth: "$date_of_purchase" },
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

  get_yearly_expenses_expenses_db: async () => {
    try {
      const amountByYear = await Expense.aggregate([
        {
          $match: {
            deleted: false,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date_of_purchase" },
              month: { $month: "$date_of_purchase" },
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
  get_daily_expenses_expenses_db: async (start_date, end_date) => {
    try {
      const amountByDay = await Expense.aggregate([
        {
          $match: {
            deleted: false,
            date_of_purchase: {
              $gte: new Date(start_date),
              $lt: new Date(end_date),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date_of_purchase" },
              month: { $month: "$date_of_purchase" },
              day: { $dayOfMonth: "$date_of_purchase" },
              hour: { $hour: "$date_of_purchase" },
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
