import { tutorial_services } from ".";

export default {
  findAll_tutorials_c: async (req: any, res: any) => {
    const { query } = req;
    try {
      const tutorials = await tutorial_services.findAll_tutorials_s(query);
      if (tutorials) {
        return res.status(200).send(tutorials);
      }
      return res.status(404).send({ message: "Tutorials Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Tutorials" });
    }
  },
  findById_tutorials_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const tutorial = await tutorial_services.findById_tutorials_s(params);
      if (tutorial) {
        return res.status(200).send(tutorial);
      }
      return res.status(404).send({ message: "Tutorial Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Finding Tutorial" });
    }
  },
  create_tutorials_c: async (req: any, res: any) => {
    const { body } = req;
    try {
      const tutorial = await tutorial_services.create_tutorials_s(body);
      if (tutorial) {
        return res.status(201).send(tutorial);
      }
      return res.status(500).send({ message: "Error Creating Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Creating Tutorial" });
    }
  },
  update_tutorials_c: async (req: any, res: any) => {
    const { params, body } = req;
    try {
      const tutorial = await tutorial_services.update_tutorials_s(params, body);
      if (tutorial) {
        return res.status(200).send(tutorial);
      }
      return res.status(500).send({ message: "Error Updating Tutorial" });
    } catch (error) {
      console.log({ error });
      res.status(500).send({ error, message: "Error Updating Tutorial" });
    }
  },
  remove_tutorials_c: async (req: any, res: any) => {
    const { params } = req;
    try {
      const tutorial = await tutorial_services.remove_tutorials_s(params);
      if (tutorial) {
        return res.status(204).send({ message: "Tutorial Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Tutorial" });
    } catch (error) {
      res.status(500).send({ error, message: "Error Deleting Tutorial" });
    }
  }
};
