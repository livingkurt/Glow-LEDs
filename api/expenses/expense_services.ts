import { expense_db } from "../expenses";
import { determine_category, determine_application, determine_filter, determine_place, unformat_date } from "../../util";

export default {
  findAll_expenses_s: async (query: { page: number; search: string; sort: string; limit: number }) => {
    try {
      const page: number = query.page ? query.page : 1;
      const limit: number = query.limit ? query.limit : 0;
      const search = query.search
        ? {
            expense_name: {
              $regex: query.search,
              $options: "i"
            }
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort: any = { date_of_purchase: -1 };
      if (sort_query === "lowest") {
        sort = { amount: 1 };
      } else if (sort_query === "highest") {
        sort = { amount: -1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      } else if (sort_query === "date") {
        sort = { date_of_purchase: -1 };
      } else if (sort_query === "category") {
        sort = { category: 1, createdAt: -1 };
      } else if (sort_query === "application") {
        sort = { application: 1, createdAt: -1 };
      }

      const expenses = await expense_db.findAll_expenses_db(filter, sort, limit, page);
      const count = await expense_db.count_expenses_db(filter);
      return {
        expenses,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findAllByDate_expenses_s: async (body: any) => {
    try {
      const filter = {
        deleted: false,
        date_of_purchase: {
          $gte: new Date(body.date_1),
          $lt: new Date(body.date_2)
        }
      };
      const sort = { date_of_purchase: 1 };

      return await expense_db.findAll_expenses_db(filter, sort, 0, 1);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_expenses_s: async (params: any) => {
    try {
      return await expense_db.findById_expenses_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_expenses_s: async (body: any) => {
    try {
      return await expense_db.create_expenses_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_all_expenses_s: async (body: any) => {
    const { data, card, properties } = body;
    try {
      const expenses: any = [];
      for (let line = 1; line < data.length; line++) {
        const object: any = {};
        for (let i = 0; i < data[line].length; i++) {
          object[properties[i]] = data[line][i];
        }
        expenses.push(object);
      }

      const payment_check = ["AUTOPAY PAYMENT - THANK YOU", "CUSTOMER SERVICE PAYMENT - THANK YOU", "RETURNED AUTOPAY (DEORY)"];

      expenses.forEach(async (expense: any) => {
        if (!payment_check.includes(expense.description)) {
          const row = {
            date_of_purchase: unformat_date(expense.date),
            expense_name: expense.description,
            place_of_purchase: determine_place(expense.description),
            card: card,
            url: "",
            application: determine_application(expense.description),
            category: determine_category(expense.description),
            amount: card === "GL AMEX" ? Math.abs(parseFloat(expense.amount)) * -1 : parseFloat(expense.amount)
          };
          await expense_db.create_expenses_db(row);
        }
      });

      return "Success";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_expenses_s: async (params: any, body: any) => {
    try {
      return await expense_db.update_expenses_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_expenses_s: async (params: any) => {
    try {
      return await expense_db.remove_expenses_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
