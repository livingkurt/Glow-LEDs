export const updateCartItems = (cartItems: any, cart_item: any) => {
  let new_cart_items = [];
  const item_exists: any = cartItems.find((x: any) => deepEqual(x, cart_item));
  if (item_exists) {
    new_cart_items = cartItems.map((x: any) => (deepEqual(x, cart_item) ? cart_item : x));
  } else {
    new_cart_items = [...cartItems, cart_item];
  }
  return new_cart_items;
};

export const deepEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
};
function isObject(object: any) {
  return object != null && typeof object === "object";
}
