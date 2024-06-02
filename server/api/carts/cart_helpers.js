export const areCartItemsEqual = (item1, item2) => {
  // List the fields you're interested in
  const fields = [
    "name",
    "price",
    "category",
    "subcategory",
    "product_collection",
    "display_image",
    "color_code",
    "pathname",
    "sale_price",
    "sale_start_date",
    "sale_end_date",
    "dimensions.weight_pounds",
    "dimensions.weight_ounces",
    "dimensions.length",
    "dimensions.width",
    "dimensions.height",
    "dimensions.package_length",
    "dimensions.package_width",
    "dimensions.package_height",
    "dimensions.package_volume",
    "processing_time",
    "finite_stock",
    "wholesale_product",
    "wholesale_price",
    "product",
  ];

  return fields.every(field => {
    const nestedFields = field.split(".");
    let val1 = item1;
    let val2 = item2;

    for (const nestedField of nestedFields) {
      val1 = val1[nestedField];
      val2 = val2[nestedField];
    }

    if (val1 === val2) {
      return true;
    } else {
      return false;
    }
  });
};

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
