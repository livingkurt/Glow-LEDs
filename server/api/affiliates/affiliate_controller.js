import { affiliate_db, affiliate_services } from "../affiliates";

export default {
  findAll_affiliates_c: async (req, res) => {
    const { query } = req;
    try {
      const affiliates = await affiliate_services.findAll_affiliates_s(query);
      if (affiliates) {
        return res.status(200).send(affiliates);
      }
      return res.status(404).send({ message: "Affiliates Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByPathname_affiliates_c: async (req, res) => {
    const { params } = req;
    try {
      const affiliate = await affiliate_services.findByPathname_affiliates_s(params);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(404).send({ message: "Affiliate Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_affiliates_c: async (req, res) => {
    const { params } = req;
    try {
      const affiliate = await affiliate_services.findById_affiliates_s(params);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(404).send({ message: "Affiliate Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_affiliates_c: async (req, res) => {
    const { body } = req;
    try {
      const affiliate = await affiliate_services.create_affiliates_s(body);
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  payout_affiliates_c: async (req, res) => {
    try {
      const affiliate = await affiliate_services.payout_affiliates_s();
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  sponsor_monthly_checkin_affiliates_c: async (req, res) => {
    const { body, params } = req;
    try {
      const affiliate = await affiliate_services.sponsor_monthly_checkin_affiliates_s(params, body);
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  checkin_status_affiliates_c: async (req, res) => {
    const { query } = req;
    try {
      const affiliate = await affiliate_services.checkin_status_affiliates_s(query);
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  question_concerns_affiliates_c: async (req, res) => {
    const { query } = req;
    try {
      const affiliate = await affiliate_db.question_concerns_affiliates_db(query.start_date, query.end_date);
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_affiliates_c: async (req, res) => {
    const { params, body } = req;
    try {
      const affiliate = await affiliate_services.update_affiliates_s(params, body);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(500).send({ message: "Error Updating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_rave_mob_affiliates_affiliates_c: async (req, res) => {
    const { params, body } = req;

    try {
      const affiliate = await affiliate_services.create_rave_mob_affiliates_affiliates_s(params, body);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(500).send({ message: "Error Updating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_affiliates_c: async (req, res) => {
    const { params } = req;
    try {
      const affiliate = await affiliate_services.remove_affiliates_s(params);
      if (affiliate) {
        return res.status(204).send({ message: "Affiliate Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  generate_sponsor_codes_affiliates_c: async (req, res) => {
    const { params } = req;
    try {
      const affiliate = await affiliate_services.generate_sponsor_codes_affiliates_s(params);
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
