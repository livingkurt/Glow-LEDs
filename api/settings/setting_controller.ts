import config from "../../config";
import { setting_services } from "../settings";

export default {
  findAll_settings_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const settings = await setting_services.findAll_settings_s(query);
      if (settings) {
        return res.status(200).send(settings);
      }
      return res.status(404).send({ message: "Settings Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_settings_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const setting = await setting_services.findById_settings_s(params);

      if (setting) {
        return res.status(200).send(setting);
      }
      return res.status(404).send({ message: "Setting Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_settings_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const setting = await setting_services.create_settings_s(body);
      if (setting) {
        return res.status(201).send(setting);
      }
      return res.status(500).send({ message: "Error Creating Setting" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_settings_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const setting = await setting_services.update_settings_s(params, body);
      if (setting) {
        return res.status(200).send(setting);
      }
      return res.status(500).send({ message: "Error Updating Setting" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_settings_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const setting = await setting_services.remove_settings_s(params);
      if (setting) {
        return res.status(204).send({ message: "Setting Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Setting" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  database_settings_c: async (req: any, res: any) => {
    return res.status(201).send(config.DATABASE);
  },
};
