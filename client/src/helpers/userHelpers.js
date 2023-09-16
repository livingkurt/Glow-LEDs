export const updateCartItems = (cartItems, cart_item) => {
  let new_cart_items = [];
  const item_exists = cartItems.find((x) => deepEqual(x, cart_item));
  if (item_exists) {
    new_cart_items = cartItems.map((x) => (deepEqual(x, cart_item) ? cart_item : x));
  } else {
    new_cart_items = [...cartItems, cart_item];
  }
  return new_cart_items;
};

export const loginUpdateCartItems = (userCartItems[], anonymousCartItems[]) => {
  const mergedCart = [...userCartItems];

  anonymousCartItems.forEach(anonymousItem => {
    const existingItem = mergedCart.find(userItem => deepEqual(userItem, anonymousItem));

    if (existingItem) {
      // Update the existing item if needed
      // existingItem.qty += anonymousItem.qty;
    } else {
      mergedCart.push(anonymousItem);
    }
  });

  return mergedCart;
};

export const deepEqual = (object1, object2) => {
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
function isObject(object) {
  return object != null && typeof object === "object";
}
