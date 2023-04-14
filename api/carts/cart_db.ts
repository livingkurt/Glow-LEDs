import { Cart } from "../carts";

export default {
  findAll_carts_db: async (filter: any, sort: unknown, limit: string, page: string) => {
    try {
      return await Cart.find(filter)
        .sort(sort)
        .populate("user")
        .populate("cartItems.product")
        .populate("cartItems.color_product")
        .populate("cartItems.secondary_color_product")
        .populate("cartItems.option_product")
        .populate("cartItems.secondary_product")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_carts_db: async (id: string) => {
    try {
      return await Cart.findOne({ _id: id, active: true }).populate("user");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByUser_carts_db: async (user_id: string) => {
    try {
      return await Cart.findOne({ user: user_id, active: true }).populate("user");
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
      const cart: any = await Cart.findOne({ _id: id, active: true });
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
        return await Cart.deleteOne({ _id: id });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_carts_db: async (filter: any) => {
    try {
      return await Cart.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
