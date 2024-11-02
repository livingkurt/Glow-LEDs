import Category from "../categorys/category.js";
import Affiliate from "../affiliates/affiliate.js";

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

      if (
        option1.name !== option2.name ||
        option1.value !== option2.value ||
        option1.filament?.toString() !== option2.filament?.toString()
      ) {
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

export const normalizeCartItem = item => {
  // Convert Mongoose documents to plain objects
  const normalizedItem = item.toObject ? item.toObject() : { ...item };

  // Ensure selectedOptions are in consistent format
  if (normalizedItem.selectedOptions && Array.isArray(normalizedItem.selectedOptions)) {
    normalizedItem.selectedOptions = normalizedItem.selectedOptions.map(option => {
      return {
        name: option.name,
        value: option.value,
        filament: option.filament?._id || option.filament,
        colorCode: option.colorCode,
        product: option.product?._id || option.product,
        isDefault: option.isDefault,
        additionalCost: option.additionalCost,
        active: option.active,
      };
    });
  } else {
    normalizedItem.selectedOptions = [];
  }

  // Ensure ticket is a string
  if (normalizedItem.ticket && normalizedItem.ticket._id) {
    normalizedItem.ticket = normalizedItem.ticket._id.toString();
  } else if (normalizedItem.ticket && normalizedItem.ticket.toString) {
    normalizedItem.ticket = normalizedItem.ticket.toString();
  }

  // Ensure product is a string
  if (normalizedItem.product && normalizedItem.product._id) {
    normalizedItem.product = normalizedItem.product._id.toString();
  } else if (normalizedItem.product && normalizedItem.product.toString) {
    normalizedItem.product = normalizedItem.product.toString();
  }

  return normalizedItem;
};

export const handleBundleTagFiltering = async tags => {
  if (!tags || tags.length === 0) return {};
  const tagArray = Array.isArray(tags) ? tags : [tags];
  const tagCategories = await Category.find({ deleted: false, pathname: { $in: tagArray } });
  const tagIds = tagCategories.map(cat => cat._id);
  return { tags: { $all: tagIds } };
};

export const handleBundleAffiliateFiltering = async affiliateName => {
  if (!affiliateName) return {};
  const affiliate = await Affiliate.findOne({
    pathname: affiliateName,
    deleted: false,
    active: true,
  });
  return affiliate ? { affiliate: affiliate._id } : { affiliate: { $exists: true } };
};

export const handleBundleSortFiltering = sort => {
  switch (sort) {
    case "price_low":
      return { total_price: 1 };
    case "price_high":
      return { total_price: -1 };
    case "newest":
      return { createdAt: -1 };
    case "oldest":
      return { createdAt: 1 };
    default:
      return { createdAt: -1 };
  }
};

export const normalizeBundleFilters = async query => {
  const { tags, affiliate, sort } = query;

  const tagFilter = await handleBundleTagFiltering(tags);
  const affiliateFilter = await handleBundleAffiliateFiltering(affiliate);
  const sortFilter = handleBundleSortFiltering(sort);

  return {
    filter: {
      deleted: false,
      active: true,
      ...tagFilter,
      ...affiliateFilter,
      title: { $exists: true },
    },
    sort: sortFilter,
  };
};
