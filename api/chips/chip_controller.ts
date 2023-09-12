import chip_services from "./chip_services";

export default {
  findAll_chips_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const chips = await chip_services.findAll_chips_s(query);
      if (chips) {
        return res.status(200).send(chips);
      }
      return res.status(404).send({ message: "Chips Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_chips_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const chip = await chip_services.findById_chips_s(params);
      if (chip) {
        return res.status(200).send(chip);
      }
      return res.status(404).send({ message: "Chip Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByName_chips_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const chip = await chip_services.findByName_chips_s(params);
      if (chip) {
        return res.status(200).send(chip);
      }
      return res.status(404).send({ message: "Chip Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_chips_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const chip = await chip_services.create_chips_s(body);
      if (chip) {
        return res.status(201).send(chip);
      }
      return res.status(500).send({ message: "Error Creating Chip" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_chips_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const chip = await chip_services.update_chips_s(params, body);
      if (chip) {
        return res.status(200).send(chip);
      }
      return res.status(500).send({ message: "Error Updating Chip" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_chips_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const chip = await chip_services.remove_chips_s(params);
      if (chip) {
        return res.status(204).send({ message: "Chip Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Chip" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
