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

  // start_cart_carts_s: async (body: any, user: any) => {
  //   const { cart_item } = body;
  //   try {
  //     if (user?._id) {
  //       const data: any = await cart_db.create_carts_db({ user: user._id, cartItems: [...cart_item] });
  //       return data;
  //     } else {
  //       const data: any = await cart_db.create_carts_db({ cartItems: [...cart_item] });
  //       return data;
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // },
  // add_to_cart_carts_s: async (params: any, body: any) => {
  //   const { cart_item, cartItems: cart_items } = body;
  //   const { id } = params;
  //   try {
  //     const data = await cart_db.findById_carts_db(id);
  //     if (data) {
  //       const cartItems = data.cartItems;
  //       let new_cart_items = [];
  //       const item_exists: any = cartItems.find((x: any) => deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }));
  //       if (item_exists) {
  //         new_cart_items = cartItems.map((x: any) => (deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }) ? cart_item : x));
  //       } else {
  //         new_cart_items = [...cartItems, cart_item];
  //       }
  //       await cart_db.update_carts_db(id, {
  //         cartItems: new_cart_items
  //       });
  //       const new_cart = await cart_db.findById_carts_db(id);
  //       return new_cart;
  //     } else {
  //       const data: any = await cart_db.create_carts_db({ cartItems: [...cart_items, ...cart_item] });
  //       return data;
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // },
  // add_to_cart_carts_s: async (params: any, body: any) => {
  //   const { cart_item, cartItems: cart_items, current_user } = body;
  //   try {
  //     let data;
  //     // Get the user's active cart if the user is logged in
  //     if (current_user) {
  //       data = await cart_db.findByUser_carts_db(current_user._id);
  //     } else {
  //       // Get the anonymous cart by its ID
  //       const { id } = params;
  //       data = await cart_db.findById_carts_db(id);
  //     }

  //     if (data) {
  //       const cartItems = data.cartItems;
  //       let new_cart_items = [];
  //       const item_exists: any = cartItems.find((x: any) => deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }));
  //       if (item_exists) {
  //         new_cart_items = cartItems.map((x: any) => (deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }) ? cart_item : x));
  //       } else {
  //         new_cart_items = [...cartItems, cart_item];
  //       }
  //       await cart_db.update_carts_db(data._id, {
  //         cartItems: new_cart_items
  //       });
  //       const new_cart = await cart_db.findById_carts_db(data._id);
  //       return new_cart;
  //     } else {
  //       // If no active cart, create a new one
  //       const userId = current_user ? current_user._id : null;
  //       data = await cart_db.create_carts_db({ user: userId, cartItems: [...cart_items, ...cart_item] });
  //       return data;
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // },

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

    try {
      if (current_user && Object.keys(current_user).length > 0) {
        const data: any = await cart_db.findById_carts_db(id);
        const cartItems = [...data.cartItems];
        cartItems.splice(item_index, 1); // 2nd parameter means remove one item only
        if (cartItems.length === 0) {
          await cart_db.remove_carts_db(id);
          return { message: "Cart Deleted" };
        } else {
          await cart_db.update_carts_db(id, {
            cartItems: cartItems,
          });
          const new_cart = await cart_db.findById_carts_db(id);
          return new_cart;
        }
      } else {
        if (my_cart && my_cart.length > 0) {
          my_cart.splice(item_index, 1);
          if (my_cart.length === 0) {
            return { message: "Cart is now empty" };
          } else {
            return { cartItems: my_cart };
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
