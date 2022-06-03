import { filament_services } from "../services";

export default {
  findAll_filaments_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const filaments = await filament_services.findAll_filaments_s(query);
      if (filaments) {
        return res.status(200).send(filaments);
      }
      return res.status(404).send({ message: "Filaments Not Found" });
    } catch (error) {
      console.log({ findAll_filaments_c_error: error });
      res.status(500).send({ error, message: "Error Finding Filaments" });
    }
  },
  findById_filaments_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const filament = await filament_services.findById_filaments_s(params);
      console.log({ filament });
      if (filament) {
        return res.status(200).send(filament);
      }
      return res.status(404).send({ message: "Filament Not Found" });
    } catch (error) {
      console.log({ findById_filaments_c_error: error });
      res.status(500).send({ error, message: "Error Finding Filament" });
    }
  },
  findMy_filaments: async (req: any, res: any) => {
    const { params } = req;
    try {
      const filament = await filament_services.findMy_filaments_s(params);
      console.log({ filament });
      if (filament) {
        return res.status(200).send(filament);
      }
      return res.status(404).send({ message: "Paycheck Not Found" });
    } catch (error) {
      console.log({ findById_filaments_c_error: error });
      res.status(500).send({ error, message: "Error Finding Paycheck" });
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
    } catch (error) {
      console.log({ create_filaments_c_error: error });
      res.status(500).send({ error, message: "Error Creating Filament" });
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
    } catch (error) {
      console.log({ update_filaments_c_error: error });
      res.status(500).send({ error, message: "Error Updating Filament" });
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
    } catch (error) {
      console.log({ remove_filaments_c_error: error });
      res.status(500).send({ error, message: "Error Deleting Filament" });
    }
  },
};
