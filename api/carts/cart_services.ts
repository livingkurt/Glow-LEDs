import { cart_db } from "../carts";
import { deepEqual, determine_filter } from "../../util";

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
    // const { cart_item, current_user } = headers;
    console.log({ cart_item, current_user });
    try {
      const response = cart_db.create_carts_db({ user: current_user._id, cartItems: [...cart_item] });
      console.log({ response });
      return response;
      // const item = cart_item;
      // const item_exists: any = cartItems.find((x: any) => JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item, qty: null }));
      // if (item_exists) {
      //   return await cart_db.create_carts_db({
      //     user: current_user._id,
      //     cartItems: cartItems.map((x: any) =>
      //       JSON.stringify({ ...x, qty: null }) === JSON.stringify({ ...item_exists, qty: null }) ? item : x
      //     )
      //   });
      // } else {
      //   return await cart_db.create_carts_db({ user: current_user._id, cartItems: [...cartItems, item] });
      // }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_carts_s: async (params: any, body: any) => {
    const { cartItems, cartItem, current_user } = body;
    try {
      const item = cartItem;
      const item_exists: any = cartItems.find((x: any) => deepEqual({ ...x, qty: null }, { ...cartItem, qty: null }));

      if (item_exists) {
        return await cart_db.update_carts_db(params.id, {
          user: current_user._id,
          cartItems: cartItems.map((x: any) => (deepEqual({ ...x, qty: null }, { ...cartItem, qty: null }) ? item : x))
        });
      } else {
        return await cart_db.update_carts_db(params.id, {
          user: current_user._id,
          cartItems: [...cartItems, item]
        });
      }
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
  remove_cartitem_carts_s: async (params: any, body: any) => {
    const { cartItems, cartItem, current_user } = body;
    //

    try {
      const new_cart_items = cartItems.filter((x: any) => JSON.stringify(x) !== JSON.stringify(cartItem));

      return await cart_db.update_carts_db(params.id, {
        user: current_user._id,
        cartItems: [...new_cart_items]
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
