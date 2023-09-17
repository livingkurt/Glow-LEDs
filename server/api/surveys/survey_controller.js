import { survey_services } from "../surveys";

export default {
  get_table_surveys_c: async (req, res) => {
    const { query } = req;
    try {
      const surveys = await survey_services.get_table_surveys_s(query);
      if (surveys) {
        return res.status(200).send(surveys);
      }
      return res.status(404).send({ message: "Contents Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findAll_surveys_c: async (req, res) => {
    const { query } = req;
    try {
      const surveys = await survey_services.findAll_surveys_s(query);
      if (surveys) {
        return res.status(200).send(surveys);
      }
      return res.status(404).send({ message: "Surveys Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_surveys_c: async (req, res) => {
    const { params } = req;
    try {
      const survey = await survey_services.findById_surveys_s(params);
      if (survey) {
        return res.status(200).send(survey);
      }
      return res.status(404).send({ message: "Survey Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_surveys_c: async (req, res) => {
    const { body } = req;
    try {
      const survey = await survey_services.create_surveys_s(body);
      if (survey) {
        return res.status(201).send(survey);
      }
      return res.status(500).send({ message: "Error Creating Survey" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_surveys_c: async (req, res) => {
    const { params, body } = req;
    try {
      const survey = await survey_services.update_surveys_s(params, body);
      if (survey) {
        return res.status(200).send(survey);
      }
      return res.status(500).send({ message: "Error Updating Survey" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_surveys_c: async (req, res) => {
    const { params } = req;
    try {
      const survey = await survey_services.remove_surveys_s(params);
      if (survey) {
        return res.status(204).send({ message: "Survey Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Survey" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
