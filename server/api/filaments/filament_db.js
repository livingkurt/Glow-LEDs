import Filament from "./filament.js";

export default {
  findAll_filaments_db: async (filter, sort, limit, page) => {
    try {
      return await Filament.find(filter)
        .sort(sort)
        .populate("tags")
        .limit(parseInt(limit, 10))
        .skip(Math.max(parseInt(page, 10), 0) * parseInt(limit, 10))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_filaments_db: async id => {
    try {
      return await Filament.findOne({ _id: id, deleted: false }).populate("tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findMy_filaments_db: async user_id => {
    try {
      return await Filament.find({ deleted: false, user: user_id })
        .sort({
          _id: -1,
        })
        .populate("tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_filaments_db: async body => {
    try {
      return await Filament.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_filaments_db: async (id, body) => {
    try {
      const filament = await Filament.findOne({ _id: id, deleted: false });
      if (filament) {
        return await Filament.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_filaments_db: async id => {
    try {
      const filament = await Filament.findOne({ _id: id, deleted: false });
      if (filament) {
        return await Filament.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_filaments_db: async filter => {
    try {
      return await Filament.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
