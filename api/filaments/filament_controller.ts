import { filament_services } from "../filaments";

export default {
  findAll_filaments_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const filaments = await filament_services.findAll_filaments_s(query);
      if (filaments) {
        return res.status(200).send(filaments);
      }
      return res.status(404).send({ message: "Filaments Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_filaments_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const filament = await filament_services.findById_filaments_s(params);

      if (filament) {
        return res.status(200).send(filament);
      }
      return res.status(404).send({ message: "Filament Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findMy_filaments: async (req: any, res: any) => {
    const { params } = req;
    try {
      const filament = await filament_services.findMy_filaments_s(params);

      if (filament) {
        return res.status(200).send(filament);
      }
      return res.status(404).send({ message: "Paycheck Not Found" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_filaments_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const filament = await filament_services.create_filaments_s(body);
      if (filament) {
        return res.status(201).send(filament);
      }
      return res.status(500).send({ message: "Error Creating Filament" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_filaments_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const filament = await filament_services.update_filaments_s(params, body);
      if (filament) {
        return res.status(200).send(filament);
      }
      return res.status(500).send({ message: "Error Updating Filament" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_filaments_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const filament = await filament_services.remove_filaments_s(params);
      if (filament) {
        return res.status(204).send({ message: "Filament Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Filament" });
    } catch (error: any) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
