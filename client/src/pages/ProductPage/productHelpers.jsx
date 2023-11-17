import config from "../../config";
import { getUrlParameter } from "../../utils/helper_functions";
import {
  set_add_on_price,
  set_color_products,
  set_option_products,
  set_price,
  set_secondary_color_products,
  set_secondary_products,
  set_show_add_on,
  update_color_product_state,
  update_option_product_state,
  update_secondary_color_product_state,
  update_secondary_product_state,
  update_universal_state,
} from "./productPageSlice";

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
    return "Supreme Gloves Sizing Sampler Pack V1";
  }
  if (name.includes("Supreme Gloves V2")) {
    return "Supreme Gloves Sizing Sampler Pack V2";
  }
  if (name.includes("Ultra Gloves")) {
    return "Ultra Gloves Sizing Sampler Pack";
  }
};
export const determine_sampler_pack_pathname = name => {
  if (name.includes("Supreme Gloves V1")) {
    return "supreme_gloves_v1_sizing_sampler_pack";
  }
  if (name.includes("Supreme Gloves V2")) {
    return "supreme_gloves_v2_sizing_sampler_pack";
  }
  if (name.includes("Ultra Gloves")) {
    return "ultra_gloves_sizing_sampler_pack";
  }
};

export const determine_sizing_quick_look = name => {
  if (
    name === "Supreme V2 Refresh Pack (6 Pairs Supreme Gloves V2 + 120 Batteries)" ||
    name === "Supreme V1 Refresh Pack (6 Pairs Supreme Gloves V2 + 120 Batteries)" ||
    name === "Ultra Refresh Pack (6 Pairs Ultra Gloves + 120 Batteries)" ||
    name === "Ultra Gloves" ||
    name === "Supreme Gloves V2" ||
    name === "Supreme Gloves V1"
  ) {
    return true;
  }
};
export const determine_sampler = name => {
  if (
    name === "Supreme V2 Refresh Pack (6 Pairs Supreme Gloves V2 + 120 Batteries)" ||
    name === "Supreme Gloves V2" ||
    name === "Ultra Gloves"
  ) {
    return true;
  }
};

export const names_hide_add_to_cart = [
  "Diffuser Caps + Adapters Starter Kit V4",
  "Supreme V2 Refresh Pack (6 Pairs Supreme Gloves V2 + 120 Batteries)",
  "Supreme V1 Refresh Pack (6 Pairs Supreme Gloves V2 + 120 Batteries)",
  "Ultra Refresh Pack (6 Pairs Ultra Gloves + 120 Batteries)",
  "CLOZD Batman Decals",
  "CLOZD Outline + Slim Batman Decals",
  "OPYN Batman Decals",
  "OPYN Outline + Slim Batman Decals",
  "CLOZD Alt Novaskinz",
  "CLOZD Novaskinz",
  "Supreme Gloves V1 Sizing Sampler Pack",
  "Supreme Gloves V2 Sizing Sampler Pack",
  "Ultra Gloves Sizing Sampler Pack",
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

export const determineSoldOut = product => {
  if (product.sold_out) {
    return "Sold Out";
  } else {
    return "Restocking Soon";
  }
};

export const determine_preorder = (option_product_object, count_in_stock, text, product) => {
  const choice = num => {
    if (option_product_object && option_product_object.hasOwnProperty("count_in_stock")) {
      if (option_product_object.count_in_stock > num) {
        return text;
      } else {
        return determineSoldOut(product);
      }
    } else if (count_in_stock > 0) {
      return text;
    } else {
      return determineSoldOut(product);
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
        text = determineSoldOut(product);
      }
    } else if (count_in_stock > 0) {
      text = "Add To Cart";
    } else {
      variant = "disabled";
      text = determineSoldOut(product);
    }
  } else {
    if (option_product_object && option_product_object.hasOwnProperty("count_in_stock")) {
      if (option_product_object.count_in_stock > 0) {
        text = "Add To Cart";
      } else {
        variant = "disabled";
        text = determineSoldOut(product);
      }
    } else if (count_in_stock > 0) {
      text = "Add To Cart";
    } else {
      variant = "disabled";
      text = determineSoldOut(product);
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
  // navigate({
  //   search: `${color ? "?color=" + color : ""}${
  //     show_add_on && secondary_color ? "?secondary_color=" + secondary_color : ""
  //   }${option ? "?option=" + option : ""}${secondary_product ? "?secondary=" + secondary_product : ""}`,
  // });
};

export const setColorDefaultOption = ({ product, query, dispatch }) => {
  if (product.color_products) {
    dispatch(set_color_products(product.color_products));

    const color = product.color_products.find(color => color.default_option === true);
    if (color) {
      dispatch(update_color_product_state({ color }));
    }
  }
};
export const setSecondaryColorDefaultOption = ({ product, query, dispatch }) => {
  if (product.secondary_color_products) {
    dispatch(set_secondary_color_products(product.secondary_color_products));

    const secondary_color = product.secondary_color_products.find(
      secondary_color => secondary_color.default_option === true
    );
    if (secondary_color) {
      dispatch(update_secondary_color_product_state({ secondary_color }));
      if (product.has_add_on) {
        dispatch(set_show_add_on(false));
      }
      if (product.name !== "CLOZD Omniskinz Sleds") {
        dispatch(set_add_on_price(secondary_color.price));
        dispatch(set_price(secondary_color.price + product.price));
      }
    } else {
      dispatch(set_show_add_on(true));
    }
  }
};
export const setOptionDefaultOption = ({ product, query, dispatch, current_user }) => {
  if (product.option_products) {
    dispatch(set_option_products(product.option_products));

    const option = product.option_products.find(option => option.default_option === true);
    if (option) {
      dispatch(update_option_product_state({ option, current_user }));
    }
  }
};

export const setColorUrlOption = ({ product, query, dispatch }) => {
  // if (product.color_products) {
  //   const color = product.color_products.find(color => color.color === query.color);
  //   if (color) {
  //     dispatch(update_color_product_state({ color }));
  //   }
  // }
};
export const setSecondaryColorUrlOption = ({ product, query, dispatch }) => {
  // if (product.secondary_color_products) {
  //   dispatch(set_secondary_products(product.secondary_products));
  //   const secondary_color = product.secondary_color_products.find(
  //     secondary_color => secondary_color.color === query.secondary_color
  //   );
  //   if (secondary_color) {
  //     dispatch(update_secondary_color_product_state({ secondary_color }));
  //   }
  // }
};
export const setOptionUrlOption = ({ product, query, dispatch, current_user }) => {
  // if (product.option_products) {
  //   let query_option = query.option;
  //   if (query.option && query.option.indexOf("%20") > -1) {
  //     query_option = query.option.split("%20").join(" ");
  //   }
  //   const option = product.option_products.find(option => option.size === query_option.split("%20").join(" "));
  //   if (option) {
  //     dispatch(update_option_product_state({ option, current_user }));
  //   }
  // }
};
export const setSecondaryProductUrlOption = ({ product, query, dispatch }) => {
  // if (product.secondary_products && product.secondary_products.length > 0) {
  //   dispatch(set_secondary_products(product.secondary_products));
  //   let query_secondary = query.secondary;
  //   if (query.secondary && query.secondary.indexOf("%20") > -1) {
  //     query_secondary = query.secondary.split("%20").join(" ");
  //   }
  //   const secondary =
  //     query.secondary &&
  //     product.secondary_products.find(secondary => secondary.name === query_secondary.split("%20").join(" "));
  //   if (secondary) {
  //     dispatch(update_secondary_product_state({ secondary }));
  //   }
  // }
};

export const normalizeProductPage = ({ product, dispatch, location, current_user }) => {
  dispatch(update_universal_state({ item: product, current_user }));
  // const query = getUrlParameter(location);
  // const urlParamsLength = location.search.length;
  // if (urlParamsLength === 0) {
  setColorDefaultOption({ product, dispatch });
  setSecondaryColorDefaultOption({ product, dispatch });
  setOptionDefaultOption({ product, dispatch });
  // } else if (urlParamsLength > 0) {
  //   setColorUrlOption({ product, query, dispatch });
  //   setSecondaryColorUrlOption({ product, query, dispatch });
  //   setOptionUrlOption({ product, query, dispatch, current_user });
  //   setSecondaryProductUrlOption({ product, query, dispatch });
  // }
};

export const updateRecentlyViewed = product => {
  if (config.NODE_ENV === "production") {
    const recently_viewed = sessionStorage.getItem("recently_viewed");
    const products = JSON.parse(recently_viewed);
    if (recently_viewed) {
      if (product && product.hasOwnProperty("name")) {
        sessionStorage.setItem("recently_viewed", JSON.stringify([product, ...products]));
      }
    } else {
      if (product && product.hasOwnProperty("name")) {
        sessionStorage.setItem("recently_viewed", JSON.stringify([product]));
      }
    }
  }
};

export const determine_secondary_product_name = (name, item) => {
  const { category, subcategory } = item;
  if (category === "diffuser_caps") {
    return name.split(" ")[0];
  } else if (category === "decals" && name.split(" ")[name.split(" ").length - 4] === "Outline") {
    return name.replace(" Outline + Batman Decals", "");
  } else if (category === "decals" && name.split(" ")[name.split(" ").length - 2] === "Batman") {
    return name.replace(" Batman Decals", "");
  } else if (subcategory === "refresh" && name.includes("Bulk")) {
    return name.split(" ")[1].trim();
  } else if (name.includes("Capez")) {
    return name.replace(" Capez", "");
  } else {
    return name.includes("-") ? name.split("-")[1].trim() : name;
  }
};

export const clozdGlowskinzColors = ["Clear", "Frosted", "Red", "Emerald", "Blue", "Purple"];
export const opynGlowskinzColors = ["Clear", "Frosted", "Red", "Emerald", "Blue", "Purple", "Black"];
export const sledColors = ["Clear", "Red", "Green", "Blue", "Purple", "Black", "White"];
export const exoDiffusersSkeletonColors = ["Black", "White", "Red", "Green", "Blue", "Purple"];
export const exoDiffusersPlugColors = ["Frosted", "Red", "Green", "Blue", "Purple"];
export const diffusersColors = ["Frosted", "Clear", "Red", "Green", "Blue", "Purple"];
export const diffuserCapsCapColors = ["Black", "White", "Red", "Green", "Blue", "Purple"];
export const diffuserCapsAdapterColors = ["Frosted", "Clear", "Red", "Green", "Blue", "Purple"];
export const framezColors = ["Clear", "Red", "Green", "Blue", "Purple"];
