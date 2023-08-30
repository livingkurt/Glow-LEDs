export const determine_alt_skin_pathname = (subcategory, pathname) => {
  if (subcategory === "clozd") {
    const empty_pathname = pathname.substring(5);
    return "opyn" + empty_pathname;
  }
  if (subcategory === "opyn") {
    const empty_pathname = pathname.substring(4);
    return "clozd" + empty_pathname;
  }
};
export const determine_alt_skin_name = (subcategory, name) => {
  if (subcategory === "clozd") {
    const empty_name = name.substring(5);
    return "OPYN " + empty_name;
  }
  if (subcategory === "opyn") {
    const empty_name = name.substring(4);
    return "CLOZD " + empty_name;
  }
};
export const determine_sampler_pack_name = name => {
  if (name.includes("Supreme Gloves V1")) {
    return "Sizing Sampler Pack V1";
  }
  if (name.includes("Supreme Gloves V2")) {
    return "Sizing Sampler Pack V2";
  }
};
export const determine_sampler_pack_pathname = name => {
  if (name.includes("Supreme Gloves V1")) {
    return "supreme_gloves_v1_sizing_sampler_pack";
  }
  if (name.includes("Supreme Gloves V2")) {
    return "supreme_gloves_v2_sizing_sampler_pack";
  }
};

export const determine_sizing_quick_look = name => {
  if (
    name === "Refresh Pack V2 (6 Pairs Supreme Gloves V2 + 120 Batteries)" ||
    name === "Refresh Pack V1 (6 Pairs Supreme Gloves V1 + 120 Batteries)" ||
    name === "Supreme Gloves V2" ||
    name === "Supreme Gloves V1"
  ) {
    return true;
  }
};
export const determine_sampler = name => {
  if (name === "Refresh Pack V2 (6 Pairs Supreme Gloves V2 + 120 Batteries)" || name === "Supreme Gloves V2") {
    return true;
  }
};

export const names_hide_add_to_cart = [
  "Diffuser Caps + Adapters Starter Kit V4",
  "Refresh Pack V2 (6 Pairs Supreme Gloves V2 + 120 Batteries)",
  "Refresh Pack V1 (6 Pairs Supreme Gloves V1 + 120 Batteries)",
  "CLOZD Batman Decals",
  "CLOZD Outline + Slim Batman Decals",
  "OPYN Batman Decals",
  "OPYN Outline + Slim Batman Decals",
  "CLOZD Alt Novaskinz",
  "CLOZD Novaskinz",
  "Supreme Gloves V1 Sizing Sampler Pack",
  "Supreme Gloves V2 Sizing Sampler Pack",
  "Capez",
  "CLOZD Omniskinz",
  "CLOZD Omniskinz Sleds",
  "Nova Clip",
];
export const categories_hide_add_to_cart = ["exo_diffusers"];

export const determine_option_styles = (option_product_object, option) => {
  const classes = "packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem ";
  if (option_product_object.hasOwnProperty("size")) {
    if (option_product_object.size === option.size) {
      return `${classes} off ft-primary`;
    } else {
      return `${classes} on ft-white`;
    }
  } else if (option.default_option) {
    return `${classes} off ft-primary`;
  } else {
    return `${classes} on ft-white`;
  }
};

export const determine_addon_color = ({ has_add_on, show_add_on, secondary_color }) => {
  if (has_add_on && show_add_on && secondary_color) {
    return true;
  } else if (!has_add_on && secondary_color) {
    return true;
  }
  return false;
};

export const determine_preorder = (option_product_object, count_in_stock, text, product) => {
  const choice = num => {
    if (option_product_object && option_product_object.hasOwnProperty("count_in_stock")) {
      if (option_product_object.count_in_stock > num) {
        return text;
      } else {
        return "Out of Stock";
      }
    } else if (count_in_stock > 0) {
      return text;
    } else {
      return "Out of Stock";
    }
  };
  if (product?.name?.includes("Refresh")) {
    return choice(6);
  } else {
    return choice(0);
  }
};

export const determine_add_to_cart = (product, secondary_product, count_in_stock, option_product_object) => {
  let variant = "primary";
  let text = "Add To Cart";
  if (names_hide_add_to_cart.includes(product.name) && !secondary_product) {
    variant = "disabled";
  }
  if (categories_hide_add_to_cart.includes(product.category) && !secondary_product) {
    variant = "disabled";
  }
  if (product?.name?.includes("Refresh")) {
    if (option_product_object && option_product_object.hasOwnProperty("count_in_stock")) {
      if (option_product_object.count_in_stock > 6) {
        text = "Add To Cart";
      } else {
        variant = "disabled";
        text = "Out of Stock";
      }
    } else if (count_in_stock > 0) {
      text = "Add To Cart";
    } else {
      variant = "disabled";
      text = "Out of Stock";
    }
  } else {
    if (option_product_object && option_product_object.hasOwnProperty("count_in_stock")) {
      if (option_product_object.count_in_stock > 0) {
        text = "Add To Cart";
      } else {
        variant = "disabled";
        text = "Out of Stock";
      }
    } else if (count_in_stock > 0) {
      text = "Add To Cart";
    } else {
      variant = "disabled";
      text = "Out of Stock";
    }
  }
  return { variant, text };
};

export const update_url = ({
  color = "",
  secondary_color = "",
  option = "",
  secondary_product = "",
  navigate,
  show_add_on,
}) => {
  navigate({
    search: `${color ? "?color=" + color : ""}${
      show_add_on && secondary_color ? "?secondary_color=" + secondary_color : ""
    }${option ? "?option=" + option : ""}${secondary_product ? "?secondary=" + secondary_product : ""}`,
  });
};
