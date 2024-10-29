import article_services from "./article_services.js";

export default {
  findAll_articles_c: async (req, res) => {
    const { query } = req;
    try {
      const articles = await article_services.findAll_articles_s(query);
      if (articles) {
        return res.status(200).send(articles);
      }
      return res.status(404).send({ message: "Articles Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_articles_c: async (req, res) => {
    const { query } = req;
    try {
      const articles = await article_services.table_articles_s(query);
      if (articles) {
        return res.status(200).send(articles);
      }
      return res.status(404).send({ message: "Articles Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAllGrid_articles_c: async (req, res) => {
    const { query } = req;
    try {
      const articles = await article_services.findAllGrid_articles_s(query);
      if (articles) {
        return res.status(200).send(articles);
      }
      return res.status(404).send({ message: "Articles Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_articles_c: async (req, res) => {
    const { params } = req;
    try {
      const article = await article_services.findById_articles_s(params);
      if (article) {
        return res.status(200).send(article);
      }
      return res.status(404).send({ message: "Article Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_articles_c: async (req, res) => {
    const { body } = req;
    try {
      const article = await article_services.create_articles_s(body);
      if (article) {
        return res.status(201).send(article);
      }
      return res.status(500).send({ message: "Error Creating Article" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_articles_c: async (req, res) => {
    const { params, body } = req;
    try {
      const article = await article_services.update_articles_s(params, body);
      if (article) {
        return res.status(200).send(article);
      }
      return res.status(500).send({ message: "Error Updating Article" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  reorder_articles_c: async (req, res) => {
    const { body } = req;
    try {
      const article = await article_services.reorder_articles_s(body);
      if (article) {
        return res.status(200).send(article);
      }
      return res.status(500).send({ message: "Error Reordering Article" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_articles_c: async (req, res) => {
    const { params } = req;
    try {
      const article = await article_services.remove_articles_s(params);
      if (article) {
        return res.status(204).send({ message: "Article Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Article" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
