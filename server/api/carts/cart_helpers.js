export const areCartItemsEqual = (item1, item2) => {
  // Compare names
  if (item1.name !== item2.name) {
    return false;
  }

  // Compare selectedOptions
  if (item1.selectedOptions.length !== item2.selectedOptions.length) {
    return false;
  }

  // Sort selectedOptions to ensure consistent comparison
  const sortedOptions1 = [...item1.selectedOptions].sort((a, b) => a.name.localeCompare(b.name));
  const sortedOptions2 = [...item2.selectedOptions].sort((a, b) => a.name.localeCompare(b.name));

  for (let i = 0; i < sortedOptions1.length; i++) {
    const option1 = sortedOptions1[i];
    const option2 = sortedOptions2[i];

    if (option1.name !== option2.name || option1.value !== option2.value) {
      return false;
    }
  }

  // If we've made it this far, the items are considered equal
  return true;
};

// The updateCartItems function remains the same
export const updateCartItems = (cartItems, cart_item) => {
  let found = false;

  const updatedItems = cartItems.map(x => {
    if (areCartItemsEqual(x, cart_item)) {
      found = true;
      return { ...x, quantity: x.quantity + cart_item.quantity };
    }
    return x;
  });

  if (!found) {
    return [...cartItems, cart_item];
  }

  return updatedItems;
};
