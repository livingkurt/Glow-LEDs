import { Expense } from "../expenses";

export default {
  findAll_expenses_db: async (filter: any, sort: unknown, limit: string, page: string) => {
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
  findById_expenses_db: async (id: string) => {
    try {
      return await Expense.findOne({ _id: id }).populate("documents");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_expenses_db: async (body: any) => {
    try {
      return await Expense.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_expenses_db: async (id: string, body: any) => {
    try {
      const expense: any = await Expense.findOne({ _id: id });
      if (expense) {
        return await Expense.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_expenses_db: async (id: string) => {
    try {
      const expense: any = await Expense.findOne({ _id: id });
      if (expense) {
        return await Expense.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_expenses_db: async (filter: any) => {
    try {
      return await Expense.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
