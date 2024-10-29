import category_services from "./category_services.js";

export default {
  table_categorys_c: async (req, res) => {
    const { query } = req;
    try {
      const categorys = await category_services.table_categorys_s(query);
      if (categorys) {
        return res.status(200).send(categorys);
      }
      return res.status(404).send({ message: "Categorys Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_categorys_c: async (req, res) => {
    const { query } = req;
    try {
      const categorys = await category_services.findAll_categorys_s(query);
      if (categorys) {
        return res.status(200).send(categorys);
      }
      return res.status(404).send({ message: "Categorys Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_categorys_c: async (req, res) => {
    const { params } = req;
    try {
      const category = await category_services.findById_categorys_s(params);
      if (category) {
        return res.status(200).send(category);
      }
      return res.status(404).send({ message: "Category Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_categorys_c: async (req, res) => {
    const { body } = req;
    try {
      const category = await category_services.create_categorys_s(body);
      if (category) {
        return res.status(201).send(category);
      }
      return res.status(500).send({ message: "Error Creating Category" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_categorys_c: async (req, res) => {
    const { params, body } = req;
    try {
      const category = await category_services.update_categorys_s(params, body);
      if (category) {
        return res.status(200).send(category);
      }
      return res.status(500).send({ message: "Error Updating Category" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_categorys_c: async (req, res) => {
    const { params } = req;
    try {
      const category = await category_services.remove_categorys_s(params);
      if (category) {
        return res.status(204).send({ message: "Category Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Category" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
