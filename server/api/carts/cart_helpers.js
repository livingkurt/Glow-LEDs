export const areCartItemsEqual = (item1, item2) => {
  // List the fields you're interested in
  const fields = [
    "name",
    "price",
    "category",
    "subcategory",
    "product_collection",
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

  const compareSelectedOptions = (options1, options2) => {
    if (options1.length !== options2.length) {
      return false;
    }

    return options1.every((option1, index) => {
      const option2 = options2[index];
      return option1?._id?.toString() === option2?._id?.toString();
    });
  };

  const fieldsEqual = fields.every(field => {
    const nestedFields = field.split(".");
    let val1 = item1;
    let val2 = item2;

    for (const nestedField of nestedFields) {
      if (val1 && val1.hasOwnProperty(nestedField)) {
        val1 = val1[nestedField];
      } else {
        return true; // Skip comparison if the field is missing in item1
      }

      if (val2 && val2.hasOwnProperty(nestedField)) {
        val2 = val2[nestedField];
      } else {
        return true; // Skip comparison if the field is missing in item2
      }
    }

    return val1 === val2;
  });

  const selectedOptionsEqual = compareSelectedOptions(item1.selectedOptions, item2.selectedOptions);

  return fieldsEqual && selectedOptionsEqual;
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
