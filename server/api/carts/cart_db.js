import { Cart } from "../carts";

export default {
  findAll_carts_db: async (filter, sort, limit, page) => {
    try {
      return await Cart.find(filter)
        .sort(sort)
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate("cartItems.product")
        .populate("cartItems.selectedOptions.filament")
        .limit(parseInt(limit))
        .skip(Math.max(parseInt(page), 0) * parseInt(limit))
        .exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_carts_db: async id => {
    try {
      return await Cart.findOne({ _id: id, active: true, deleted: false })
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate("cartItems.product")
        .populate("cartItems.selectedOptions.filament")
        .populate("cartItems.tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByUser_carts_db: async user_id => {
    try {
      return await Cart.findOne({ user: user_id, active: true, deleted: false })
        .populate("user")
        .populate("cartItems.display_image_object")
        .populate("cartItems.product")
        .populate("cartItems.selectedOptions.filament")
        .populate("cartItems.tags");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_carts_db: async body => {
    try {
      return await Cart.create(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_carts_db: async (id, body) => {
    try {
      const cart = await Cart.findOne({ _id: id, active: true });
      if (cart) {
        return await Cart.updateOne({ _id: id }, body);
      }
      return cart;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_user_carts_db: async (id, body) => {
    try {
      const cart = await Cart.findOne({ user: id, active: true });
      if (cart) {
        cart.cartItems = body.cartItems;
        return await cart.save();
      } else {
        return await Cart.create({ ...body, user: id });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  remove_carts_db: async id => {
    try {
      const cart = await Cart.findOne({ _id: id, deleted: false });
      if (cart) {
        return await Cart.deleteOne({ _id: id });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  count_carts_db: async filter => {
    try {
      return await Cart.countDocuments(filter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
