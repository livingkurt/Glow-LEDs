import { paycheck_services } from "../paychecks";

export default {
  findAll_paychecks_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const paychecks = await paycheck_services.findAll_paychecks_s(query);
      if (paychecks) {
        return res.status(200).send(paychecks);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Paychecks" });
    }
  },
  create_filters_paychecks_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const paycheck_filters = await paycheck_services.create_filters_paychecks_s(query);
      if (paycheck_filters) {
        return res.status(200).send(paycheck_filters);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Paychecks" });
    }
  },
  findById_paychecks_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const paycheck = await paycheck_services.findById_paychecks_s(params);

      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(404).send({ message: "Paycheck Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Paycheck" });
    }
  },
  findMy_paychecks: async (req: any, res: any) => {
    const { params } = req;
    try {
      const paycheck = await paycheck_services.findMy_paychecks_s(params);

      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(404).send({ message: "Paycheck Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Paycheck" });
    }
  },
  create_paychecks_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const paycheck = await paycheck_services.create_paychecks_s(body);
      if (paycheck) {
        return res.status(201).send(paycheck);
      }
      return res.status(500).send({ message: "Error Creating Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Paycheck" });
    }
  },
  create_affiliate_paychecks_c: async (req: any, res: any) => {
    const { params, query } = req;
    try {
      const paycheck = await paycheck_services.create_affiliate_paychecks_s(params);
      if (paycheck) {
        return res.status(201).send(paycheck);
      }
      return res.status(500).send({ message: "Error Creating Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Paycheck" });
    }
  },
  update_paychecks_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const paycheck = await paycheck_services.update_paychecks_s(params, body);
      if (paycheck) {
        return res.status(200).send(paycheck);
      }
      return res.status(500).send({ message: "Error Updating Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Paycheck" });
    }
  },
  remove_paychecks_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const paycheck = await paycheck_services.remove_paychecks_s(params);
      if (paycheck) {
        return res.status(204).send({ message: "Paycheck Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Paycheck" });
    }
  },
  remove_multiple_paychecks_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const paycheck = await paycheck_services.remove_multiple_paychecks_s(body);
      if (paycheck) {
        return res.status(204).send({ message: "Paycheck Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Paycheck" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Paycheck" });
    }
  }
};
