import { affiliate_services } from "../affiliates";

export default {
  findAll_affiliates_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const affiliates = await affiliate_services.findAll_affiliates_s(query);
      if (affiliates) {
        return res.status(200).send(affiliates);
      }
      return res.status(404).send({ message: "Affiliates Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Affiliates" });
    }
  },
  findByPathname_affiliates_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const affiliate = await affiliate_services.findByPathname_affiliates_s(params);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(404).send({ message: "Affiliate Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Affiliate" });
    }
  },
  findById_affiliates_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const affiliate = await affiliate_services.findById_affiliates_s(params);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(404).send({ message: "Affiliate Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Affiliate" });
    }
  },
  create_affiliates_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const affiliate = await affiliate_services.create_affiliates_s(body);
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Affiliate" });
    }
  },
  monthly_checkin_affiliates_c: async (req: any, res: any) => {
    const { body, params } = req;
    try {
      const affiliate = await affiliate_services.monthly_checkin_affiliates_s(params, body);
      if (affiliate) {
        return res.status(201).send(affiliate);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Affiliate" });
    }
  },
  update_affiliates_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const affiliate = await affiliate_services.update_affiliates_s(params, body);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(500).send({ message: "Error Updating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Affiliate" });
    }
  },
  create_rave_mob_affiliates_affiliates_c: async (req: any, res: any) => {
    const { params, body } = req;

    try {
      const affiliate = await affiliate_services.create_rave_mob_affiliates_affiliates_s(params, body);
      if (affiliate) {
        return res.status(200).send(affiliate);
      }
      return res.status(500).send({ message: "Error Updating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Affiliate" });
    }
  },
  remove_affiliates_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const affiliate = await affiliate_services.remove_affiliates_s(params);
      if (affiliate) {
        return res.status(204).send({ message: "Affiliate Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Affiliate" });
    }
  }
};
