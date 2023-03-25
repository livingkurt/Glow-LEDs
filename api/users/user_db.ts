import User from "../users/user";
import { prnt } from "../../util";
// import Token from "../tokens/token";
require("dotenv");

export default {
  findAll_users_db: async (filter: any, sort: unknown, limit: string, page: string) => {
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
        .populate("products")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
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
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliateId_users_db: async (id: string) => {
    try {
      return await User.findOne({ affiliate: id })
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
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByEmail_users_db: async (email: string) => {
    console.log({ email });
    try {
      return await User.findOne({ email });
      // .populate({
      //   path: "affiliate",
      //   populate: [
      //     {
      //       path: "public_code"
      //     },
      //     {
      //       path: "private_code"
      //     }
      //   ]
      // })
      // .populate("products");
    } catch (error) {}
  },
  create_users_db: async (user: any) => {
    prnt({ create_users_db: user });
    try {
      return await User.create(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_token_users_db: async (token: any) => {
    prnt({ create_users_db: token });
    try {
      // return await Token.create(token);
      return "";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_users_db: async (id: string, body: any) => {
    try {
      const user: any = await User.findOne({ _id: id });

      if (user) {
        return await User.updateOne({ _id: id }, body);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_users_db: async (id: string) => {
    try {
      const user: any = await User.findOne({ _id: id });
      if (user) {
        return await User.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_users_db: async (filter: any) => {
    try {
      return await User.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
