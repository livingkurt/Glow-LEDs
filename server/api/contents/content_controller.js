import content_services from "./content_services";

export default {
  get_table_contents_c: async (req, res) => {
    const { query } = req;
    try {
      const contents = await content_services.get_table_contents_s(query);
      if (contents) {
        return res.status(200).send(contents);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_contents_c: async (req, res) => {
    const { query } = req;
    try {
      const contents = await content_services.findAll_contents_s(query);
      if (contents) {
        return res.status(200).send(contents);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  current_contents_c: async (req, res) => {
    try {
      const contents = await content_services.current_contents_s();

      if (contents.length === 1) {
        return res.status(200).send(contents[0]);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findDisplay_contents_c: async (req, res) => {
    const { query } = req;
    try {
      const contents = await content_services.findDisplay_contents_s(query);
      if (contents) {
        return res.status(200).send(contents);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  slideshow_contents_c: async (req, res) => {
    const { query } = req;
    try {
      const contents = await content_services.slideshow_contents_s(query);
      if (contents) {
        return res.status(200).send(contents);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_contents_c: async (req, res) => {
    const { params } = req;
    try {
      const content = await content_services.findById_contents_s(params);
      if (content) {
        return res.status(200).send(content);
      }
      return res.status(404).send({ message: "Content Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_contents_c: async (req, res) => {
    const { body } = req;
    try {
      const content = await content_services.create_contents_s(body);
      if (content) {
        return res.status(201).send(content);
      }
      return res.status(500).send({ message: "Error Creating Content" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_contents_c: async (req, res) => {
    const { params, body } = req;
    try {
      const content = await content_services.update_contents_s(params, body);
      if (content) {
        return res.status(200).send(content);
      }
      return res.status(500).send({ message: "Error Updating Content" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_contents_c: async (req, res) => {
    const { params } = req;
    try {
      const content = await content_services.remove_contents_s(params);
      if (content) {
        return res.status(204).send({ message: "Content Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Content" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
