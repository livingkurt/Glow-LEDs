import { User, Token } from "../models";
import { prnt } from "../util";
require("dotenv");

export default {
  findAll_users_db: async (filter: any, sort: any) => {
    try {
      return await User.find(filter)
        .sort(sort)
        .populate({
          path: "affiliate",
          populate: [
            {
              path: "public_code"
            },
            {
              path: "private_code"
            }
          ]
        })
        .populate("products");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  findById_users_db: async (id: string) => {
    try {
      return await User.findOne({ _id: id })
        .populate({
          path: "affiliate",
          populate: [
            {
              path: "public_code"
            },
            {
              path: "private_code"
            }
          ]
        })
        .populate("products");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  findByEmail_users_db: async (email: string) => {
    try {
      return await User.findOne({ email })
        .populate({
          path: "affiliate",
          populate: [
            {
              path: "public_code"
            },
            {
              path: "private_code"
            }
          ]
        })
        .populate("products");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  create_users_db: async (user: any) => {
    prnt({ create_users_db: user });
    try {
      return await User.create(user);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  create_token_users_db: async (token: any) => {
    prnt({ create_users_db: token });
    try {
      return await Token.create(token);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update_users_db: async (id: string, body: any) => {
    try {
      const user: any = await User.findOne({ _id: id });

      if (user) {
        return await User.updateOne({ _id: id }, body);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  remove_users_db: async (id: string) => {
    try {
      const user: any = await User.findOne({ _id: id });
      if (user) {
        return await User.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
