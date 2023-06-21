import { deepEqual } from "../../util";

export const updateCartItems = (cartItems: any, cart_item: any) => {
  let new_cart_items = [];
  const item_exists: any = cartItems.find((x: any) => deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }));
  if (item_exists) {
    new_cart_items = cartItems.map((x: any) => (deepEqual({ ...x, qty: null }, { ...cart_item, qty: null }) ? cart_item : x));
  } else {
    new_cart_items = [...cartItems, cart_item];
  }
  return new_cart_items;
};
