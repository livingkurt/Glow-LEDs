import Cart from "./cart.js";
import cart_db from "./cart_db.js";
import { getFilteredData } from "../api_helpers.js";
import { aggregateCartItems, normalizeCartItem, updateCartItems } from "./cart_helpers.js";

export default {
  findAll_carts_s: async query => {
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
  findById_carts_s: async params => {
    try {
      return await cart_db.findById_carts_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByUser_carts_s: async params => {
    try {
      const { id } = params;
      return await cart_db.findByUser_carts_db(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_carts_s: async body => {
    try {
      return await cart_db.create_carts_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_carts_s: async (params, body) => {
    const { id } = params;
    try {
      return await cart_db.update_carts_db(id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_user_carts_s: async (params, body) => {
    const { id } = params;
    try {
      return await cart_db.update_user_carts_db(id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  add_to_cart_carts_s: async body => {
    const { existingCartItems, cartItems, current_user } = body;

    try {
      // Aggregate duplicate items
      const aggregatedCartItems = aggregateCartItems(cartItems);

      let data;
      let result;
      let messages = [];

      if (current_user && Object.keys(current_user).length > 0) {
        data = await cart_db.findByUser_carts_db(current_user._id);
        let existingItems = data ? data.cartItems : [];

        // Normalize existingItems
        existingItems = existingItems.map(normalizeCartItem);

        // Normalize newItems
        const normalizedNewItems = aggregatedCartItems.map(normalizeCartItem);

        // Process all items at once
        result = updateCartItems(existingItems, normalizedNewItems);

        // Update or create the cart and get the updated/created document
        data = data
          ? await cart_db.update_carts_db(data._id, { cartItems: result.items })
          : await cart_db.create_carts_db({ user: current_user._id, cartItems: result.items });

        messages = result.messages;
      } else {
        // Handle case without current_user
        let existingItems = existingCartItems || [];

        // Normalize existingItems
        existingItems = existingItems.map(normalizeCartItem);

        // Normalize newItems
        const normalizedNewItems = aggregatedCartItems.map(normalizeCartItem);

        result = updateCartItems(existingItems, normalizedNewItems);
        messages = result.messages;
        data = { cartItems: result.items };
      }

      return {
        data: data.toObject ? data.toObject() : data,
        messages,
      };
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  empty_carts_s: async params => {
    try {
      const data = await cart_db.update_carts_db(params.id, { active: false });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_carts_s: async params => {
    try {
      return await cart_db.remove_carts_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_cart_item_carts_s: async (params, body) => {
    const { id, item_index } = params;
    const { current_user, my_cart } = body;

    // Convert id and item_index to their proper types
    const actualId = id === "undefined" ? undefined : id;
    const actualItemIndex = parseInt(item_index, 10);

    try {
      if (current_user && Object.keys(current_user).length > 0) {
        if (!actualId) throw new Error("ID is undefined");

        const data = await cart_db.findById_carts_db(actualId);
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
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
