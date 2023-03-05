import { cart_db } from "../carts";
import { deepEqual, determine_filter } from "../../util";
import { user_db } from "../users";

export default {
  findAll_carts_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const page: string = query.page ? query.page : "1";
      const limit: string = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            facebook_name: {
              $regex: query.search,
              $options: "i"
            }
          }
        : {};
      const filter = determine_filter(query, search);
      const sort = {};

      const carts = await cart_db.findAll_carts_db(filter, sort, limit, page);
      const count = await cart_db.count_carts_db(filter);
      return {
        carts,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: page
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_carts_s: async (params: any) => {
    try {
      return await cart_db.findById_carts_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByUser_carts_s: async (params: any) => {
    try {
      return await cart_db.findByUser_carts_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_carts_s: async (body: any) => {
    const { cart_item, current_user } = body;
    try {
      const data: any = await cart_db.create_carts_db({ user: current_user._id, cartItems: [...cart_item] });

      await user_db.update_users_db(current_user._id, { cart: data._id });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_carts_s: async (params: any, body: any) => {
    const { cart_item } = body;
    const { id } = params;
    try {
      const data = await cart_db.findById_carts_db(id);
      const cartItems = data.cartItems;
      let new_cart_items = [];
      const item_exists: any = cartItems.find((x: any) => deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }));
      if (item_exists) {
        new_cart_items = cartItems.map((x: any) => (deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }) ? cart_item : x));
      } else {
        new_cart_items = [...cartItems, cart_item];
      }
      await cart_db.update_carts_db(id, {
        cartItems: new_cart_items
      });
      const new_cart = await cart_db.findById_carts_db(id);
      return new_cart;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_carts_s: async (params: any) => {
    try {
      return await cart_db.remove_carts_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_cart_item_carts_s: async (params: any) => {
    const { cart_id, item_index } = params;

    try {
      const data = await cart_db.findById_carts_db(cart_id);

      const cartItems = [...data.cartItems];
      cartItems.splice(item_index, 1); // 2nd parameter means remove one item only
      console.log({ length: cartItems.length, item_index });
      if (cartItems.length === 0) {
        await cart_db.remove_carts_db(cart_id);
        return { message: "Cart Deleted" };
      } else {
        await cart_db.update_carts_db(cart_id, {
          cartItems: cartItems
        });
        const new_cart = await cart_db.findById_carts_db(cart_id);
        return new_cart;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
