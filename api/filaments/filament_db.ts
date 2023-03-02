import { Filament } from "../filaments";

export default {
  findAll_filaments_db: async (filter: any, sort: unknown, limit: number, page: number) => {
    try {
      return await Filament.find(filter)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_filaments_db: async (id: string) => {
    try {
      return await Filament.findOne({ _id: id });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_filaments_db: async (user_id: string) => {
    try {
      return await Filament.find({ deleted: false, user: user_id }).sort({
        _id: -1
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filaments_db: async (body: any) => {
    try {
      return await Filament.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_filaments_db: async (id: string, body: any) => {
    try {
      const filament: any = await Filament.findOne({ _id: id });
      if (filament) {
        return await Filament.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_filaments_db: async (id: string) => {
    try {
      const filament: any = await Filament.findOne({ _id: id });
      if (filament) {
        return await Filament.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_filaments_db: async (filter: any) => {
    try {
      return await Filament.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
