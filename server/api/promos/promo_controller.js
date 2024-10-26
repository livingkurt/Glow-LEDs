import promo_services from "./promo_services.js";

export default {
  findAll_promos_c: async (req, res) => {
    const { query } = req;
    try {
      const promos = await promo_services.findAll_promos_s(query);
      if (promos) {
        return res.status(200).send(promos);
      }
      return res.status(404).send({ message: "Promos Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAllTable_promos_c: async (req, res) => {
    const { query } = req;
    try {
      const promos = await promo_services.findAllTable_promos_s(query);
      if (promos) {
        return res.status(200).send(promos);
      }
      return res.status(404).send({ message: "Promos Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_filters_promos_c: async (req, res) => {
    const { query } = req;
    try {
      const promo_filters = await promo_services.create_filters_promos_s(query);
      if (promo_filters) {
        return res.status(200).send(promo_filters);
      }
      return res.status(404).send({ message: "Paychecks Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_promos_c: async (req, res) => {
    const { params } = req;
    try {
      const promo = await promo_services.findById_promos_s(params);
      if (promo) {
        return res.status(200).send(promo);
      }
      return res.status(404).send({ message: "Promo Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByAffiliateId_promos_c: async (req, res) => {
    const { params } = req;
    try {
      const promo = await promo_services.findByAffiliateId_promos_s(params);
      if (promo) {
        return res.status(200).send(promo);
      }
      return res.status(404).send({ message: "Promo Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByCode_promos_c: async (req, res) => {
    const { params } = req;
    try {
      const promo = await promo_services.findByCode_promos_s(params);
      if (promo) {
        return res.status(200).send(promo);
      }
      return res.status(404).send({ message: "Promo Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_promos_c: async (req, res) => {
    const { body } = req;
    try {
      const promo = await promo_services.create_promos_s(body);
      if (promo) {
        return res.status(201).send(promo);
      }
      return res.status(500).send({ message: "Error Creating Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_one_time_use_code_promos_c: async (req, res) => {
    const { body } = req;
    try {
      const promo = await promo_services.create_one_time_use_code_promos_s(body);
      if (promo) {
        return res.status(201).send(promo);
      }
      return res.status(500).send({ message: "Error Creating Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  refresh_sponsor_codes_promos_c: async (req, res) => {
    try {
      const promo = await promo_services.refresh_sponsor_codes_promos_s();
      if (promo) {
        return res.status(201).send(promo);
      }
      return res.status(500).send({ message: "Error Creating Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_promos_c: async (req, res) => {
    const { params, body } = req;
    try {
      const promo = await promo_services.update_promos_s(params, body);
      if (promo) {
        return res.status(200).send(promo);
      }
      return res.status(500).send({ message: "Error Updating Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_code_used_promos_c: async (req, res) => {
    const { params, body } = req;
    try {
      const promo = await promo_services.update_code_used_promos_s(params, body);
      if (promo) {
        return res.status(200).send(promo);
      }
      return res.status(500).send({ message: "Error Updating Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_affiliate_codes_promos_c: async (req, res) => {
    const { params, query } = req;
    try {
      const promo = await promo_services.update_affiliate_codes_promos_s(params, query);
      if (promo) {
        return res.status(200).send(promo);
      }
      return res.status(500).send({ message: "Error Updating Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  remove_promos_c: async (req, res) => {
    const { params } = req;
    try {
      const promo = await promo_services.remove_promos_s(params);
      if (promo) {
        return res.status(204).send({ message: "Promo Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_multiple_promos_c: async (req, res) => {
    const { body } = req;
    try {
      const promo = await promo_services.remove_multiple_promos_s(body);
      if (promo) {
        return res.status(204).send({ message: "Promo Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  validate_promo_code_promos_c: async (req, res) => {
    const { params, body } = req;
    try {
      const promo = await promo_services.validate_promo_code_promos_s(params, body);
      if (promo) {
        return res.status(200).send(promo);
      }
      return res.status(500).send({ message: "Error Deleting Promo" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
