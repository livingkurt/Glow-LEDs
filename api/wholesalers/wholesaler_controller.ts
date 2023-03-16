import { wholesaler_services } from "../wholesalers";

export default {
  findAll_wholesalers_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const wholesalers = await wholesaler_services.findAll_wholesalers_s(query);
      if (wholesalers) {
        return res.status(200).send(wholesalers);
      }
      return res.status(404).send({ message: "Affiliates Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Affiliates" });
    }
  },
  findById_wholesalers_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const wholesaler = await wholesaler_services.findById_wholesalers_s(params);
      if (wholesaler) {
        return res.status(200).send(wholesaler);
      }
      return res.status(404).send({ message: "Affiliate Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Affiliate" });
    }
  },
  create_wholesalers_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const wholesaler = await wholesaler_services.create_wholesalers_s(body);
      if (wholesaler) {
        return res.status(201).send(wholesaler);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Affiliate" });
    }
  },
  update_wholesalers_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const wholesaler = await wholesaler_services.update_wholesalers_s(params, body);
      if (wholesaler) {
        return res.status(200).send(wholesaler);
      }
      return res.status(500).send({ message: "Error Updating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Updating Affiliate" });
    }
  },
  remove_wholesalers_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const wholesaler = await wholesaler_services.remove_wholesalers_s(params);
      if (wholesaler) {
        return res.status(204).send({ message: "Affiliate Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Affiliate" });
    }
  }
};
