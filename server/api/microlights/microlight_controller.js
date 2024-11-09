import microlight_services from "./microlight_services.js";

export default {
  findAll_microlights_c: async (req, res) => {
    const { query } = req;
    try {
      const microlights = await microlight_services.findAll_microlights_s(query);
      if (microlights) {
        return res.status(200).send(microlights);
      }
      return res.status(404).send({ message: "Microlights Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_microlights_c: async (req, res) => {
    const { query } = req;
    try {
      const microlights = await microlight_services.table_microlights_s(query);
      if (microlights) {
        return res.status(200).send(microlights);
      }
      return res.status(404).send({ message: "Microlights Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_microlights_c: async (req, res) => {
    const { params } = req;
    try {
      const microlight = await microlight_services.findById_microlights_s(params);
      if (microlight) {
        return res.status(200).send(microlight);
      }
      return res.status(404).send({ message: "Microlight Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByName_microlights_c: async (req, res) => {
    const { params } = req;
    try {
      const microlight = await microlight_services.findByName_microlights_s(params);
      if (microlight) {
        return res.status(200).send(microlight);
      }
      return res.status(404).send({ message: "Microlight Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_microlights_c: async (req, res) => {
    const { body } = req;
    try {
      const microlight = await microlight_services.create_microlights_s(body);
      if (microlight) {
        return res.status(201).send(microlight);
      }
      return res.status(500).send({ message: "Error Creating Microlight" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_microlights_c: async (req, res) => {
    const { params, body } = req;
    try {
      const microlight = await microlight_services.update_microlights_s(params, body);
      if (microlight) {
        return res.status(200).send(microlight);
      }
      return res.status(500).send({ message: "Error Updating Microlight" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_microlights_c: async (req, res) => {
    const { params } = req;
    try {
      const microlight = await microlight_services.remove_microlights_s(params);
      if (microlight) {
        return res.status(204).send({ message: "Microlight Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Microlight" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
