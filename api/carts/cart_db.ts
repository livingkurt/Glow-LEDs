import { Cart } from "../carts";

export default {
  findAll_carts_db: async (filter: any, sort: any) => {
    try {
      return await Cart.find(filter).sort(sort).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_carts_db: async (id: string) => {
    try {
      return await Cart.findOne({ _id: id }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByUser_carts_db: async (user_id: string) => {
    try {
      return await Cart.findOne({ user: user_id }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_carts_db: async (body: any) => {
    try {
      return await Cart.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_carts_db: async (id: string, body: any) => {
    try {
      const cart: any = await Cart.findOne({ _id: id });
      if (cart) {
        return await Cart.updateOne({ _id: id }, body);
      }
      return "No Cart";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_carts_db: async (id: string) => {
    try {
      const cart: any = await Cart.findOne({ _id: id });
      if (cart) {
        return await Cart.updateOne({ _id: id }, { deleted: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
