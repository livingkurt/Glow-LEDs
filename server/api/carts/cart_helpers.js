export const areCartItemsEqual = (item1, item2) => {
  // Compare names
  if (item1.name !== item2.name) {
    return false;
  }

  // Special handling for ticket items
  if (item1.itemType === "ticket" && item2.itemType === "ticket") {
    // For tickets, compare ticket IDs instead of selectedOptions
    if (item1.ticket.toString() === item2.ticket.toString()) {
      return true;
    }
    return false;
  }

  // For non-ticket items, continue with the existing comparison logic
  // Compare selectedOptions
  if (item1?.selectedOptions?.length !== item2?.selectedOptions?.length) {
    return false;
  }

  // Sort selectedOptions to ensure consistent comparison
  const sortedOptions1 = [...(item1.selectedOptions || [])].sort((a, b) => a.name.localeCompare(b.name));
  const sortedOptions2 = [...(item2.selectedOptions || [])].sort((a, b) => a.name.localeCompare(b.name));

  if (sortedOptions1?.length > 0 && sortedOptions2?.length > 0) {
    for (let i = 0; i < sortedOptions1?.length; i++) {
      const option1 = sortedOptions1[i];
      const option2 = sortedOptions2[i];

      if (option1.name !== option2.name || option1.value !== option2.value) {
        return false;
      }
    }
  }

  // If we've made it this far, the items are considered equal
  return true;
};

export const updateCartItems = (cartItems, cart_item) => {
  let found = false;
  let message = null;

  const getEffectiveMaxQuantity = item => {
    if (item.max_quantity === 0 || item.max_quantity === undefined) {
      return Infinity;
    }
    return item.max_quantity;
  };

  const updatedItems = cartItems.map(x => {
    if (areCartItemsEqual(x, cart_item)) {
      found = true;
      const newQuantity = x.quantity + cart_item.quantity;
      const maxQuantity = getEffectiveMaxQuantity(x);

      if (maxQuantity !== Infinity && newQuantity > maxQuantity) {
        message = `Maximum quantity of ${maxQuantity} reached for ${x.name}`;
        return { ...x, quantity: maxQuantity };
      }

      return { ...x, quantity: newQuantity };
    }
    return x;
  });

  if (!found) {
    const maxQuantity = getEffectiveMaxQuantity(cart_item);
    if (maxQuantity !== Infinity && cart_item.quantity > maxQuantity) {
      message = `Maximum quantity of ${maxQuantity} reached for ${cart_item.name}`;
      cart_item = { ...cart_item, quantity: maxQuantity };
    }
    return { items: [...cartItems, cart_item], message };
  }

  return { items: updatedItems, message };
};
