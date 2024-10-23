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

export const updateCartItems = (existingItems, newItems) => {
  let messages = [];
  let updatedItems = [...existingItems];

  const getEffectiveMaxQuantity = item => {
    return item.max_quantity > 0 ? item.max_quantity : Infinity;
  };

  for (const newItem of newItems) {
    let found = false;

    updatedItems = updatedItems.map(existingItem => {
      if (areCartItemsEqual(existingItem, newItem)) {
        found = true;
        const totalQuantity = existingItem.quantity + newItem.quantity;
        const maxQuantity = getEffectiveMaxQuantity(existingItem);

        if (totalQuantity > maxQuantity) {
          messages.push(`Maximum quantity of ${maxQuantity} reached for ${existingItem.name}`);
          return { ...existingItem, quantity: maxQuantity };
        }

        return { ...existingItem, quantity: totalQuantity };
      }
      return existingItem;
    });

    if (!found) {
      const maxQuantity = getEffectiveMaxQuantity(newItem);
      if (newItem.quantity > maxQuantity) {
        messages.push(`Maximum quantity of ${maxQuantity} reached for ${newItem.name}`);
        newItem.quantity = maxQuantity;
      }
      updatedItems.push(newItem);
    }
  }

  return { items: updatedItems, messages };
};

// First, aggregate duplicate items in cartItems
export const aggregateCartItems = items => {
  const itemMap = {};
  for (const item of items) {
    const key = JSON.stringify({
      name: item.name,
      selectedOptions: item.selectedOptions,
      // Include other properties that define item uniqueness
    });
    if (itemMap[key]) {
      itemMap[key].quantity += item.quantity;
    } else {
      itemMap[key] = { ...item };
    }
  }
  return Object.values(itemMap);
};
