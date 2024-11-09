import tag_services from "./tag_services.js";

export default {
  table_tags_c: async (req, res) => {
    const { query } = req;
    try {
      const tags = await tag_services.table_tags_s(query);
      if (tags) {
        return res.status(200).send(tags);
      }
      return res.status(404).send({ message: "Tags Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_tags_c: async (req, res) => {
    const { query } = req;
    try {
      const tags = await tag_services.findAll_tags_s(query);
      if (tags) {
        return res.status(200).send(tags);
      }
      return res.status(404).send({ message: "Tags Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_tags_c: async (req, res) => {
    const { params } = req;
    try {
      const tag = await tag_services.findById_tags_s(params);
      if (tag) {
        return res.status(200).send(tag);
      }
      return res.status(404).send({ message: "Tag Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_tags_c: async (req, res) => {
    const { body } = req;
    try {
      const tag = await tag_services.create_tags_s(body);
      if (tag) {
        return res.status(201).send(tag);
      }
      return res.status(500).send({ message: "Error Creating Tag" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_tags_c: async (req, res) => {
    const { params, body } = req;
    try {
      const tag = await tag_services.update_tags_s(params, body);
      if (tag) {
        return res.status(200).send(tag);
      }
      return res.status(500).send({ message: "Error Updating Tag" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_tags_c: async (req, res) => {
    const { params } = req;
    try {
      const tag = await tag_services.remove_tags_s(params);
      if (tag) {
        return res.status(204).send({ message: "Tag Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Tag" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
