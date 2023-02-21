import Parcel from "../models/parcel";

export default {
  findAll_parcels_db: async (filter: any, sort: any) => {
    try {
      return await Parcel.find(filter).sort(sort).populate("user").populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_parcels_db: async (id: string) => {
    try {
      return await Parcel.findOne({ _id: id }).populate("user").populate("affiliate");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_parcels_db: async (body: any) => {
    try {
      return await Parcel.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_parcels_db: async (id: string, body: any) => {
    try {
      const parcel: any = await Parcel.findOne({ _id: id });
      if (parcel) {
        return await Parcel.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_parcels_db: async (id: string) => {
    try {
      const parcel: any = await Parcel.findOne({ _id: id });
      if (parcel) {
        return await Parcel.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
