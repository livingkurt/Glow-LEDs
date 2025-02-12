import email_controller from "../emails/email_controller.js";
import paycheck_db from "./paycheck_db.js";
import paycheck_services from "./paycheck_services.js";

export default {
  get_table_paychecks_c: async (req, res) => {
    const { query } = req;
    try {
      const paychecks = await paycheck_services.get_table_paychecks_s(query);
      if (paychecks) {
        return res.status(200).send(paychecks);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_affiliate_table_paychecks_c: async (req, res) => {
    const { query, params } = req;
    try {
      const paychecks = await paycheck_services.get_affiliate_table_paychecks_s(query, params);
      if (paychecks) {
        return res.status(200).send(paychecks);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_team_table_paychecks_c: async (req, res) => {
    const { query, params } = req;
    try {
      const paychecks = await paycheck_services.get_team_table_paychecks_s(query, params);
      if (paychecks) {
        return res.status(200).send(paychecks);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_paychecks_c: async (req, res) => {
    const { query } = req;
    try {
      const paychecks = await paycheck_services.findAll_paychecks_s(query);
      if (paychecks) {
        return res.status(200).send(paychecks);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_filters_paychecks_c: async (req, res) => {
    const { query } = req;
    try {
      const paycheck_filters = await paycheck_services.create_filters_paychecks_s(query);
      if (paycheck_filters) {
        return res.status(200).send(paycheck_filters);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_paychecks_c: async (req, res) => {
    const { params } = req;
    try {
      const paycheck = await paycheck_services.findById_paychecks_s(params);

      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(404).send({ message: "Paycheck Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findMy_paychecks: async (req, res) => {
    const { params } = req;
    try {
      const paycheck = await paycheck_services.findMy_paychecks_s(params);

      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(404).send({ message: "Paycheck Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_paychecks_c: async (req, res) => {
    const { body } = req;
    try {
      const paycheck = await paycheck_services.create_paychecks_s(body);
      if (body?.email && body?.amount > 0 && body?.stripe_connect_id) {
        email_controller.send_paycheck_emails_c(req, res);
      }
      if (paycheck) {
        return res.status(201).send(paycheck);
      }
      return res.status(500).send({ message: "Error Creating Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_paychecks_c: async (req, res) => {
    const { params, body } = req;
    try {
      const paycheck = await paycheck_services.update_paychecks_s(params, body);
      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(500).send({ message: "Error Updating Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_paychecks_c: async (req, res) => {
    const { params } = req;
    try {
      const paycheck = await paycheck_services.remove_paychecks_s(params);
      if (paycheck) {
        return res.status(204).send({ message: "Paycheck Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_multiple_paychecks_c: async (req, res) => {
    const { body } = req;
    try {
      const paycheck = await paycheck_services.remove_multiple_paychecks_s(body);
      if (paycheck) {
        return res.status(204).send({ message: "Paycheck Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_range_payouts_paychecks_c: async (req, res) => {
    const { start_date, end_date } = req.query;
    try {
      const paycheck = await paycheck_db.get_range_payouts_paychecks_db(start_date, end_date);
      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(500).send({ message: "Error Deleting Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_daily_paychecks_paychecks_c: async (req, res) => {
    const { start_date, end_date } = req.query;
    try {
      const paycheck = await paycheck_db.get_daily_paychecks_paychecks_db(start_date, end_date);
      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(500).send({ message: "Error Finding Expenses" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_monthly_paychecks_paychecks_c: async (req, res) => {
    const { year } = req.query;
    try {
      const paycheck = await paycheck_db.get_monthly_paychecks_paychecks_db(year);
      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(500).send({ message: "Error Finding Expenses" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  get_yearly_paychecks_paychecks_c: async (req, res) => {
    try {
      const paycheck = await paycheck_db.get_yearly_paychecks_paychecks_db();
      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(500).send({ message: "Error Finding Expenses" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
