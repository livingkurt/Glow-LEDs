import { image_services } from "../images";

export default {
  findAll_images_c: async (req, res) => {
    const { query } = req;
    try {
      const images = await image_services.findAll_images_s(query);
      if (images) {
        return res.status(200).send(images);
      }
      return res.status(404).send({ message: "Images Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_images_c: async (req, res) => {
    const { params } = req;
    try {
      const image = await image_services.findById_images_s(params);

      if (image) {
        return res.status(200).send(image);
      }
      return res.status(404).send({ message: "Image Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByLink_images_c: async (req, res) => {
    const { body } = req;
    try {
      const image = await image_services.findByLink_images_s(body);

      if (image) {
        return res.status(200).send(image);
      }
      return res.status(404).send({ message: "Image Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  upload_images_c: async (req, res) => {
    const { body, files } = req;
    try {
      const image = await image_services.upload_images_s(body, files);
      if (image) {
        return res.status(201).send(image);
      }
      return res.status(500).send({ message: "Error Creating Image" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_images_c: async (req, res) => {
    const { body } = req;
    try {
      const image = await image_services.create_images_s(body);
      if (image) {
        return res.status(201).send(image);
      }
      return res.status(500).send({ message: "Error Creating Image" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_images_c: async (req, res) => {
    const { params, body } = req;
    try {
      const image = await image_services.update_images_s(params, body);
      if (image) {
        return res.status(200).send(image);
      }
      return res.status(500).send({ message: "Error Updating Image" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_images_c: async (req, res) => {
    const { params } = req;
    try {
      const image = await image_services.remove_images_s(params);
      if (image) {
        return res.status(204).send({ message: "Image Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Image" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_multiple_images_c: async (req, res) => {
    const { body } = req;
    try {
      const image = await image_services.remove_multiple_images_s(body);
      if (image) {
        return res.status(204).send({ message: "Image Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Image" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
