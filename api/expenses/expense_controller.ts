import { expense_db, expense_services } from "../expenses";

export default {
  findAll_expenses_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const expenses = await expense_services.findAll_expenses_s(query);
      if (expenses) {
        return res.status(200).send(expenses);
      }
      return res.status(404).send({ message: "Expenses Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expenses" });
    }
  },
  create_filters_expenses_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const expense_filters = await expense_services.create_filters_expenses_s(query);
      if (expense_filters) {
        return res.status(200).send(expense_filters);
      }
      return res.status(404).send({ message: "Expenses Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expenses" });
    }
  },
  findAllByDate_expenses_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const expenses = await expense_services.findAllByDate_expenses_s(body);
      if (expenses) {
        return res.status(200).send(expenses);
      }
      return res.status(404).send({ message: "Expenses Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expenses" });
    }
  },
  findById_expenses_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const expense = await expense_services.findById_expenses_s(params);

      if (expense) {
        return res.status(200).send(expense);
      }
      return res.status(404).send({ message: "Expense Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expense" });
    }
  },
  create_expenses_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const expense = await expense_services.create_expenses_s(body);
      if (expense) {
        return res.status(201).send(expense);
      }
      return res.status(500).send({ message: "Error Creating Expense" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Expense" });
    }
  },
  get_airtable_expenses_c: async (req: any, res: any) => {
    try {
      const expense = await expense_services.get_airtable_expenses_s();
      // if (expense) {
      return res.status(201).send(expense);
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Expense" });
    }
  },
  create_all_expenses_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const expense = await expense_services.create_all_expenses_s(body);
      if (expense) {
        return res.status(201).send(expense);
      }
      return res.status(500).send({ message: "Error Creating Expense" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Expense" });
    }
  },
  update_expenses_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const expense = await expense_services.update_expenses_s(params, body);
      if (expense) {
        return res.status(200).send(expense);
      }
      return res.status(500).send({ message: "Error Updating Expense" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Expense" });
    }
  },
  remove_expenses_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const expense = await expense_services.remove_expenses_s(params);
      if (expense) {
        return res.status(204).send({ message: "Expense Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Expense" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Expense" });
    }
  },
  get_range_expenses_expenses_c: async (req: any, res: any) => {
    const { start_date, end_date } = req.query;
    try {
      const expense = await expense_db.get_range_expenses_expenses_db(start_date, end_date);
      if (expense) {
        return res.status(200).send(expense);
      }
      return res.status(500).send({ message: "Error Finding Expenses" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expenses" });
    }
  },
  get_daily_expenses_expenses_c: async (req: any, res: any) => {
    const { start_date, end_date } = req.query;
    try {
      const expense = await expense_db.get_daily_expenses_expenses_db(start_date, end_date);
      if (expense) {
        return res.status(200).send(expense);
      }
      return res.status(500).send({ message: "Error Finding Expenses" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expenses" });
    }
  },
  get_monthly_expenses_expenses_c: async (req: any, res: any) => {
    const { year } = req.query;
    try {
      const expense = await expense_db.get_monthly_expenses_expenses_db(year);
      if (expense) {
        return res.status(200).send(expense);
      }
      return res.status(500).send({ message: "Error Finding Expenses" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expenses" });
    }
  },
  get_yearly_expenses_expenses_c: async (req: any, res: any) => {
    try {
      const expense = await expense_db.get_yearly_expenses_expenses_db();
      if (expense) {
        return res.status(200).send(expense);
      }
      return res.status(500).send({ message: "Error Finding Expenses" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Expenses" });
    }
  },
};
