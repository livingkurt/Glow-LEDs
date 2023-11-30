export const areCartItemsEqual = (item1, item2) => {
  // List the fields you're interested in
  const fields = [
    "name",
    // "qty",
    "display_image",
    "secondary_image",
    "color",
    "secondary_color",
    "color_group_name",
    "secondary_color_group_name",
    "color_code",
    "secondary_color_code",
    "price",
    "category",
    "subcategory",
    "product_collection",
    "pathname",
    "size",
    "preorder",
    "sale_price",
    // "sale_start_date",
    // "sale_end_date",
    "package_volume",
    "weight_pounds",
    "weight_ounces",
    "count_in_stock",
    "length",
    "width",
    "height",
    "package_length",
    "package_width",
    "package_height",
    "processing_time",
    "quantity",
    // "finite_stock",
    "add_on_price",
    "show_add_on",
    "wholesale_product",
    "wholesale_price",
    "product",
    "color_product",
    "color_product_name",
    "secondary_color_product",
    "secondary_color_product_name",
    "option_product_name",
    "option_product",
    "secondary_product_name",
    "secondary_product",
  ];

  return fields.every(field => {
    const val1 = item1[field]?.toString();
    const val2 = item2[field]?.toString();
    if (val1 === val2) {
      return true;
    } else {
      console.log({ field, val1, val2 });
    }
  });
};

export const updateCartItems = (cartItems, cart_item) => {
  let found = false;

  const updatedItems = cartItems.map(x => {
    if (areCartItemsEqual(x, cart_item)) {
      found = true;
      return { ...x, qty: x.qty + cart_item.qty };
    }
    return x;
  });

  if (!found) {
    return [...cartItems, cart_item];
  }

  return updatedItems;
};
