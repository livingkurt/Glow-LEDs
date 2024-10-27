import User from "./user.js";

export default {
  findAll_users_db: async (filter, sort, limit, page) => {
    try {
      return await User.find(filter)
        .sort(sort)
        .populate({
          path: "affiliate",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
            {
              path: "products",
            },
          ],
        })
        .populate({
          path: "team",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
          ],
        })
        .populate("employee_code")
        .populate("wholesaler")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findBy_users_db: async filter => {
    try {
      return await User.findOne(filter)
        .populate({
          path: "affiliate",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
            {
              path: "products",
            },
          ],
        })
        .populate({
          path: "team",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
          ],
        })
        .populate("employee_code")
        .populate("wholesaler");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_users_db: async id => {
    try {
      return await User.findOne({ _id: id, deleted: false })
        .populate({
          path: "affiliate",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
            {
              path: "products",
            },
          ],
        })
        .populate({
          path: "team",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
          ],
        })
        .populate("employee_code")
        .populate("wholesaler");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliateId_users_db: async id => {
    try {
      return await User.findOne({ affiliate: id, deleted: false })
        .populate({
          path: "affiliate",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
            {
              path: "products",
            },
          ],
        })
        .populate({
          path: "team",
          populate: [
            {
              path: "public_code",
            },
            {
              path: "private_code",
            },
          ],
        })
        .populate("wholesaler");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByEmail_users_db: async email => {
    try {
      return await User.findOne({ email: email.toLowerCase(), deleted: false }).populate("wholesaler");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_users_db: async user => {
    try {
      return await User.create(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_users_db: async (id, body) => {
    try {
      const user = await User.findOne({ _id: id, deleted: false });

      if (user) {
        return await User.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_users_db: async id => {
    try {
      const user = await User.findOne({ _id: id, deleted: false });
      if (user) {
        return await User.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_users_db: async filter => {
    try {
      return await User.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
