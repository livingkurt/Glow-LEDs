import tutorial_services from "./tutorial_services.js";

export default {
  findAll_tutorials_c: async (req, res) => {
    const { query } = req;
    try {
      const tutorials = await tutorial_services.findAll_tutorials_s(query);
      if (tutorials) {
        return res.status(200).send(tutorials);
      }
      return res.status(404).send({ message: "Tutorials Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_tutorials_c: async (req, res) => {
    const { query } = req;
    try {
      const tutorials = await tutorial_services.table_tutorials_s(query);
      if (tutorials) {
        return res.status(200).send(tutorials);
      }
      return res.status(404).send({ message: "Tutorials Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAllGrid_tutorials_c: async (req, res) => {
    const { query } = req;
    try {
      const tutorials = await tutorial_services.findAllGrid_tutorials_s(query);
      if (tutorials) {
        return res.status(200).send(tutorials);
      }
      return res.status(404).send({ message: "Tutorials Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_tutorials_c: async (req, res) => {
    const { params } = req;
    try {
      const tutorial = await tutorial_services.findById_tutorials_s(params);
      if (tutorial) {
        return res.status(200).send(tutorial);
      }
      return res.status(404).send({ message: "Tutorial Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_tutorials_c: async (req, res) => {
    const { body } = req;
    try {
      const tutorial = await tutorial_services.create_tutorials_s(body);
      if (tutorial) {
        return res.status(201).send(tutorial);
      }
      return res.status(500).send({ message: "Error Creating Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_tutorials_c: async (req, res) => {
    const { params, body } = req;
    try {
      const tutorial = await tutorial_services.update_tutorials_s(params, body);
      if (tutorial) {
        return res.status(200).send(tutorial);
      }
      return res.status(500).send({ message: "Error Updating Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  reorder_tutorials_c: async (req, res) => {
    const { body } = req;
    try {
      const tutorial = await tutorial_services.reorder_tutorials_s(body);
      if (tutorial) {
        return res.status(200).send(tutorial);
      }
      return res.status(500).send({ message: "Error Reordering Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_tutorials_c: async (req, res) => {
    const { params } = req;
    try {
      const tutorial = await tutorial_services.remove_tutorials_s(params);
      if (tutorial) {
        return res.status(204).send({ message: "Tutorial Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
