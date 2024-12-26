import Affiliate from "./affiliate.js";
import affiliate_services from "./affiliate_services.js";

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

  table_affiliates_c: async (req, res) => {
    const { query } = req;
    try {
      const affiliates = await affiliate_services.table_affiliates_s(query);
      if (affiliates) {
        return res.status(200).send(affiliates);
      }
      return res.status(404).send({ message: "Affiliates Not Found" });
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
  create_product_bundle_affiliates_c: async (req, res) => {
    const { params, body } = req;
    try {
      const affiliate = await affiliate_services.create_product_bundle_affiliates_s(params, body);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Product Bundle" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  payout_affiliates_c: async (req, res) => {
    try {
      const result = await affiliate_services.payout_affiliates_s();
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(500).send({ message: "Error Processing Affiliate Payouts" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  addSponsorTask: async (req, res) => {
    try {
      const { id } = req.params;
      const task = req.body;

      const affiliate = await Affiliate.findById(id);
      if (!affiliate) {
        return res.status(404).json({ message: "Affiliate not found" });
      }

      affiliate.sponsorTasks = affiliate.sponsorTasks || [];
      affiliate.sponsorTasks.push({
        ...task,
        verifiedBy: req.user._id,
      });

      await affiliate.save();

      return res.json(affiliate);
    } catch (error) {
      console.error("Error adding sponsor task:", error);
      return res.status(500).json({ message: "Error adding sponsor task" });
    }
  },
};
