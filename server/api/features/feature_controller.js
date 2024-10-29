import feature_services from "./feature_services.js";

export default {
  get_table_features_c: async (req, res) => {
    const { query } = req;
    try {
      const features = await feature_services.get_table_features_s(query);
      if (features) {
        return res.status(200).send(features);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_features_c: async (req, res) => {
    const { query } = req;
    try {
      const features = await feature_services.findAll_features_s(query);
      if (features) {
        return res.status(200).send(features);
      }
      return res.status(404).send({ message: "Features Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByPathname_features_c: async (req, res) => {
    const { params } = req;

    try {
      const feature = await feature_services.findByPathname_features_s(params);

      if (feature) {
        return res.status(200).send(feature);
      }
      return res.status(404).send({ message: "Feature Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },

  create_features_c: async (req, res) => {
    const { body } = req;
    try {
      const feature = await feature_services.create_features_s(body);
      if (feature) {
        return res.status(201).send(feature);
      }
      return res.status(500).send({ message: "Error Creating Feature" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_features_c: async (req, res) => {
    const { params, body } = req;
    try {
      const feature = await feature_services.update_features_s(params, body);
      if (feature) {
        return res.status(200).send(feature);
      }
      return res.status(500).send({ message: "Error Updating Feature" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_features_c: async (req, res) => {
    const { params } = req;
    try {
      const feature = await feature_services.remove_features_s(params);
      if (feature) {
        return res.status(204).send({ message: "Feature Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Feature" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
