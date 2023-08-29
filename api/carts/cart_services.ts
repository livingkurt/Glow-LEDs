import { cart_db } from "../carts";
import { deepEqual } from "../../util";
import { getFilteredData } from "../api_helpers";
import { updateCartItems } from "./cart_helpers";

export default {
  findAll_carts_s: async (query: { page: string; search: string; sort: string; limit: string }) => {
    try {
      const sort_options = ["active", "updatedAt", "user", "cartItems"];
      const { filter, sort, limit, page } = getFilteredData({ query, sort_options, search_name: { updatedAt: 1 } });
      const carts = await cart_db.findAll_carts_db(filter, sort, limit, page);
      const count = await cart_db.count_carts_db(filter);
      return {
        data: carts,
        total_count: count,
        currentPage: page,
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
      const { id } = params;
      return await cart_db.findByUser_carts_db(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_carts_s: async (body: any) => {
    try {
      return await cart_db.create_carts_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_carts_s: async (params: any, body: any) => {
    const { id } = params;
    try {
      return await cart_db.update_carts_db(id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_user_carts_s: async (params: any, body: any) => {
    const { id } = params;
    try {
      return await cart_db.update_user_carts_db(id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  add_to_cart_carts_s: async (body: any) => {
    const { cart_item, cartItems, current_user } = body;

    try {
      // Get the user's active cart if the user is logged in
      if (current_user && Object.keys(current_user).length > 0) {
        let data: any = await cart_db.findByUser_carts_db(current_user._id);
        if (data) {
          data.cartItems = updateCartItems(data.cartItems, cart_item);
          await cart_db.update_carts_db(data._id, { cartItems: data.cartItems });
          data = await cart_db.findById_carts_db(data._id);
          return data;
        } else {
          data = await cart_db.create_carts_db({ user: current_user._id, cartItems: [cart_item] });
          return data;
        }
      } else {
        // If the user is not logged in, update the anonymous cart
        if (cartItems && cartItems.length > 0) {
          const new_cart_items = updateCartItems(cartItems, cart_item);
          return { cartItems: new_cart_items };
        } else {
          return { cartItems: [cart_item] };
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  empty_carts_s: async (params: any) => {
    try {
      return await cart_db.update_carts_db(params.id, { active: false });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_carts_s: async (params: any) => {
    try {
      console.log({ params });
      return await cart_db.remove_carts_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_cart_item_carts_s: async (params: any, body: any) => {
    const { id, item_index } = params;
    const { current_user, my_cart } = body;

    // Convert id and item_index to their proper types
    const actualId = id === "undefined" ? undefined : id;
    const actualItemIndex = parseInt(item_index, 10);

    console.log({ actualId, actualItemIndex, current_user, my_cart });

    try {
      if (current_user && Object.keys(current_user).length > 0) {
        if (!actualId) throw new Error("ID is undefined");

        const data: any = await cart_db.findById_carts_db(actualId);
        const cartItems = [...data.cartItems];
        cartItems.splice(actualItemIndex, 1);

        if (cartItems.length === 0) {
          await cart_db.remove_carts_db(actualId);
          return { message: "Cart Deleted" };
        } else {
          await cart_db.update_carts_db(actualId, { cartItems });
          const new_cart = await cart_db.findById_carts_db(actualId);
          return new_cart;
        }
      } else {
        if (my_cart && my_cart.cartItems.length > 0) {
          my_cart.cartItems.splice(actualItemIndex, 1);

          if (my_cart.cartItems.length === 0) {
            return { message: "Cart is now empty" };
          } else {
            return { cartItems: my_cart.cartItems };
          }
        } else {
          throw new Error("There is no cart to modify");
        }
      }
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
