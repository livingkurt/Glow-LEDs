import Parcel from "./parcel.js";

export default {
  findAll_parcels_db: async (filter, sort, limit, page) => {
    try {
      return await Parcel.find(filter)
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_parcels_db: async id => {
    try {
      return await Parcel.findOne({ _id: id, deleted: false }).populate("user").populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_parcels_db: async body => {
    try {
      return await Parcel.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_parcels_db: async (id, body) => {
    try {
      const parcel = await Parcel.findOne({ _id: id, deleted: false });
      if (parcel) {
        return await Parcel.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_parcels_db: async id => {
    try {
      const parcel = await Parcel.findOne({ _id: id, deleted: false });
      if (parcel) {
        return await Parcel.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_parcels_db: async filter => {
    try {
      return await Parcel.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
