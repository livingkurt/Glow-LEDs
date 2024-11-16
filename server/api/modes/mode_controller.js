import mode_services from "./mode_services.js";

export default {
  findAll_modes_c: async (req, res) => {
    const { query } = req;
    try {
      const modes = await mode_services.findAll_modes_s(query);
      if (modes) {
        return res.status(200).send(modes);
      }
      return res.status(404).send({ message: "Modes Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_modes_c: async (req, res) => {
    const { query } = req;
    try {
      const modes = await mode_services.table_modes_s(query);
      if (modes) {
        return res.status(200).send(modes);
      }
      return res.status(404).send({ message: "Modes Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_modes_c: async (req, res) => {
    const { params } = req;
    try {
      const mode = await mode_services.findById_modes_s(params);
      if (mode) {
        return res.status(200).send(mode);
      }
      return res.status(404).send({ message: "Mode Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_modes_c: async (req, res) => {
    const { body } = req;
    try {
      const mode = await mode_services.create_modes_s(body);
      if (mode) {
        return res.status(201).send(mode);
      }
      return res.status(500).send({ message: "Error Creating Mode" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_modes_c: async (req, res) => {
    const { params, body } = req;
    try {
      const mode = await mode_services.update_modes_s(params, body);
      if (mode) {
        return res.status(200).send(mode);
      }
      return res.status(500).send({ message: "Error Updating Mode" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_modes_c: async (req, res) => {
    const { params } = req;
    try {
      const mode = await mode_services.remove_modes_s(params);
      if (mode) {
        return res.status(204).send({ message: "Mode Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Mode" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
