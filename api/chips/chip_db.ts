import Chip from "./chip";

export default {
  findAll_chips_db: async (filter: any, sort: unknown, limit: number, page: number) => {
    try {
      return await Chip.find(filter)
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
  findById_chips_db: async (id: string) => {
    try {
      return await Chip.findOne({ _id: id });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByName_chips_db: async (name: string) => {
    try {
      return await Chip.findOne({ name: name });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_chips_db: async (body: any) => {
    try {
      return await Chip.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_chips_db: async (id: string, body: any) => {
    try {
      const chip: any = await Chip.findOne({ _id: id });
      if (chip) {
        return await Chip.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_chips_db: async (id: string) => {
    try {
      const chip: any = await Chip.findOne({ _id: id });
      if (chip) {
        return await Chip.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_chips_db: async (filter: any) => {
    try {
      return await Chip.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
