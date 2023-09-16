import { parcel_services } from "../parcels";

export default {
  findAll_parcels_c: async (req, res) => {
    const { query } = req;
    try {
      const parcels = await parcel_services.findAll_parcels_s(query);
      if (parcels) {
        return res.status(200).send(parcels);
      }
      return res.status(404).send({ message: "Parcels Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_parcels_c: async (req, res) => {
    const { params } = req;
    try {
      const parcel = await parcel_services.findById_parcels_s(params);

      if (parcel) {
        return res.status(200).send(parcel);
      }
      return res.status(404).send({ message: "Parcel Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_parcels_c: async (req, res) => {
    const { body } = req;
    try {
      const parcel = await parcel_services.create_parcels_s(body);
      if (parcel) {
        return res.status(201).send(parcel);
      }
      return res.status(500).send({ message: "Error Creating Parcel" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_parcels_c: async (req, res) => {
    const { params, body } = req;
    try {
      const parcel = await parcel_services.update_parcels_s(params, body);
      if (parcel) {
        return res.status(200).send(parcel);
      }
      return res.status(500).send({ message: "Error Updating Parcel" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_parcels_c: async (req, res) => {
    const { params } = req;
    try {
      const parcel = await parcel_services.remove_parcels_s(params);
      if (parcel) {
        return res.status(204).send({ message: "Parcel Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Parcel" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
