import User from "../users/user.js";
import Affiliate from "../affiliates/affiliate.js";
import Mode from "./mode.js";

export default {
  findAll_modes_db: async (filter, sort, limit, page) => {
    try {
      return await Mode.find(filter)
        .populate("microlight")
        .populate("user")
        .sort(sort)
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_modes_db: async id => {
    try {
      return await Mode.findOne({ _id: id, deleted: false }).populate("microlight").populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_modes_db: async body => {
    try {
      const mode = await Mode.create(body);

      if (body.user) {
        await User.findByIdAndUpdate(body.user, { $push: { modes: mode._id } });
      }

      if (body.affiliate) {
        await Affiliate.findByIdAndUpdate(body.affiliate, { $push: { modes: mode._id } });
      }

      return mode;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_modes_db: async (id, body) => {
    try {
      const mode = await Mode.findOne({ _id: id, deleted: false });
      if (mode) {
        return await Mode.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_modes_db: async id => {
    try {
      const mode = await Mode.findOne({ _id: id, deleted: false });
      if (mode) {
        return await Mode.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_modes_db: async filter => {
    try {
      return await Mode.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
