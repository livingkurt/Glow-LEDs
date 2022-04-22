import { API_Products } from "..";
import { snake_case } from "../helper_functions";

export const determine_color_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "Skin";
  } else if (category === "diffuser_caps") {
    return "Cap";
  } else if (category === "glowframez") {
    return "Frame";
  }
};

export const determine_secondary_color_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "Sled";
  } else if (category === "diffuser_caps") {
    return "Adapter";
  } else if (category === "glowframez") {
    return "Frame";
  }
};

export const determine_option_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "";
  } else if (category === "diffuser_caps") {
    return "";
  } else if (category === "glowframez") {
    return "";
  }
};

export const determine_secondary_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "";
  } else if (category === "diffuser_caps") {
    return "";
  } else if (category === "glowframez") {
    return "";
  }
};

const no_state = {
  option: true,
  option_products: [],
  color_products: [],
  secondary_color_products: [],
  product_options: [],
  option_products_name: "",
  color_products_name: "",
  secondary_color_products_name: "",
  secondary_products_name: "",
  macro_product: false,
  option_product_group: false,
  color_product_group: false,
  secondary_color_product_group: false,
  secondary_product_group: false,
  chips: [],
};

const save_products = (
  list: any,
  product: any,
  products: any,
  set_products: Function,
  set_loading_options: Function
) => {
  list.map(async (item: any, index: number) => {
    const new_product = { ...product, ...item };
    delete new_product._id;
    const { data } = await API_Products.create_products_a(new_product);
    if (products) {
      set_products((products: any) => [ ...products, data ]);
    } else {
      set_products([ data ]);
    }
  });
  set_loading_options(false);
};

export const create_color_products = async (
  e: any,
  product: any,
  set_color_products: Function,
  color_products: any,
  color_modifier: string,
  set_loading_options: Function
) => {
  e.preventDefault();
  set_loading_options(true);
  let list: any = [];
  if (product.category === "glowskinz" && product.subcategory === "clozd") {
    list = [
      {
        name: `Clear ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Clear ${product.name} - ${color_modifier}`),
        color: "Clear",
        color_code: "#4b4b4b",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `Frosted ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Frosted ${product.name} - ${color_modifier}`),
        color: "Frosted",
        color_code: "white",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Red ${product.name} - ${color_modifier}`),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Emerald ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Emerald ${product.name} - ${color_modifier}`),
        color: "Emerald",
        color_code: "#15715a",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Teal ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Teal ${product.name} - ${color_modifier}`),
        color: "Teal",
        color_code: "#1da5b3",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Blue ${product.name} - ${color_modifier}`),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Violet ${product.name} - ${color_modifier}`),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Purple ${product.name} - ${color_modifier}`),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (
    product.category === "glowskinz" &&
    product.subcategory === "opyn"
  ) {
    list = [
      {
        name: `Clear ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Clear ${product.name} - ${color_modifier}`),
        color: "Clear",
        color_code: "#4b4b4b",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `Frosted ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Frosted ${product.name} - ${color_modifier}`),
        color: "Frosted",
        color_code: "white",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        secondary_products: [],
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Red ${product.name} - ${color_modifier}`),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Emerald ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Emerald ${product.name} - ${color_modifier}`),
        color: "Emerald",
        color_code: "#15715a",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Teal ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Teal ${product.name} - ${color_modifier}`),
        color: "Teal",
        color_code: "#1da5b3",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Blue ${product.name} - ${color_modifier}`),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Violet ${product.name} - ${color_modifier}`),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `White  ${product.name} - ${color_modifier}`,
        pathname: snake_case(`White  ${product.name} - ${color_modifier}`),
        color: "White",
        color_code: "white",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Black  ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Black  ${product.name} - ${color_modifier}`),
        color: "Black",
        color_code: "black",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "diffuser_caps") {
    list = [
      {
        name: `Black ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Black ${product.name} - ${color_modifier}`),
        color: "Black",
        color_code: "black",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `White ${product.name} - ${color_modifier}`,
        pathname: snake_case(`White ${product.name} - ${color_modifier}`),
        color: "White",
        color_code: "white",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Red ${product.name} - ${color_modifier}`),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Green ${product.name} - ${color_modifier}`),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Blue ${product.name} - ${color_modifier}`),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Violet ${product.name} - ${color_modifier}`),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Purple ${product.name} - ${color_modifier}`),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "diffusers") {
    list = [
      {
        name: `Frosted ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Frosted ${product.name} - ${color_modifier}`),
        color: "Frosted",
        color_code: "#abaeb5",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Red ${product.name} - ${color_modifier}`),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Green ${product.name} - ${color_modifier}`),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Blue ${product.name} - ${color_modifier}`),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Violet ${product.name} - ${color_modifier}`),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Purple ${product.name} - ${color_modifier}`),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "exo_diffusers") {
    list = [
      {
        name: `Black ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Black ${product.name} - ${color_modifier}`),
        color: "Black",
        color_code: "black",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `White ${product.name} - ${color_modifier}`,
        pathname: snake_case(`White ${product.name} - ${color_modifier}`),
        color: "White",
        color_code: "white",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Red ${product.name} - ${color_modifier}`),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Green ${product.name} - ${color_modifier}`),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Blue ${product.name} - ${color_modifier}`),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },

      {
        name: `Violet ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Violet ${product.name} - ${color_modifier}`),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Purple ${product.name} - ${color_modifier}`),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "batteries") {
    list = [
      {
        name: `White ${product.name} - ${color_modifier}`,
        pathname: snake_case(`White ${product.name} - ${color_modifier}`),
        color: "White",
        color_code: "white",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Red ${product.name} - ${color_modifier}`),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Green ${product.name} - ${color_modifier}`),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Blue ${product.name} - ${color_modifier}`),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Purple ${product.name} - ${color_modifier}`),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Violet ${product.name} - ${color_modifier}`),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Black ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Black ${product.name} - ${color_modifier}`),
        color: "Black",
        color_code: "black",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Clear ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Clear ${product.name} - ${color_modifier}`),
        color: "Clear",
        color_code: "#4b4b4b",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.collection === "novaskinz") {
    list = [
      {
        name: `Clear ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Clear ${product.name} - ${color_modifier}`),
        color: "Clear",
        color_code: "#4b4b4b",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Red ${product.name} - ${color_modifier}`),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Emerald ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Emerald ${product.name} - ${color_modifier}`),
        color: "Emerald",
        color_code: "#15715a",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Teal ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Teal ${product.name} - ${color_modifier}`),
        color: "Teal",
        color_code: "#1da5b3",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Blue ${product.name} - ${color_modifier}`),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Violet ${product.name} - ${color_modifier}`),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${color_modifier}`,
        pathname: snake_case(`Purple ${product.name} - ${color_modifier}`),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  }
  save_products(
    list,
    product,
    color_products,
    set_color_products,
    set_loading_options
  );
  // list.map(async (item: any, index: number) => {
  //   const new_product = { ...product, ...item };
  //   delete new_product._id;
  //   const { data } = await API_Products.create_products_a(new_product);
  //   if (color_products) {
  //     set_color_products((colors_products: any) => [
  //       ...colors_products,
  //       data,
  //     ]);
  //   } else {
  //     set_color_products([ data ]);
  //   }
  // });
};

export const create_secondary_color_products = async (
  e: any,
  product: any,
  set_secondary_color_products: Function,
  secondary_color_products: any,
  secondary_color_modifier: string,
  set_loading_options: Function
) => {
  e.preventDefault();
  set_loading_options(true);
  let list: any = [];
  if (product.category === "glowskinz" && product.subcategory === "clozd") {
    list = [
      {
        name: `Clear ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `Frosted ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Frosted",
        color_code: "#abaeb5",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Red ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Green ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },

      {
        name: `Violet ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Black ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Black ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (
    product.category === "glowskinz" &&
    product.subcategory === "opyn"
  ) {
    list = [
      {
        name: `Clear ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `Frosted ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Frosted",
        color_code: "#abaeb5",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Red ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Green ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },

      {
        name: `Violet ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `White ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `White ${product.name} - ${secondary_color_modifier}`
        ),
        color: "White",
        color_code: "white",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Black ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Black ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "diffuser_caps") {
    list = [
      {
        name: `Frosted ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Frosted",
        color_code: "#abaeb5",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Red ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Green ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },

      {
        name: `Violet ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "diffusers") {
    list = [];
  } else if (product.category === "exo_diffusers") {
    list = [
      {
        name: `Frosted ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Frosted",
        color_code: "#abaeb5",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Red ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Green ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "batteries") {
    list = [];
  } else if (product.collection === "novaskinz") {
    list = [
      {
        name: `Clear ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Frosted ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Frosted",
        color_code: "#abaeb5",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Red ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Red ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Green ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Green ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Blue ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Violet ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Purple ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `White ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `White ${product.name} - ${secondary_color_modifier}`
        ),
        color: "White",
        color_code: "white",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `Black ${product.name} - ${secondary_color_modifier}`,
        pathname: snake_case(
          `Black ${product.name} - ${secondary_color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        category: "options",
        subcategory: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  }
  save_products(
    list,
    product,
    secondary_color_products,
    set_secondary_color_products,
    set_loading_options
  );
  // list.map(async (item: any, index: number) => {
  //   const new_product = { ...product, ...item };
  //   delete new_product._id;
  //   const { data } = await API_Products.create_products_a(new_product);
  //   if (secondary_color_products) {
  //     set_secondary_color_products((colors_products: any) => [
  //       ...colors_products,
  //       data,
  //     ]);
  //   } else {
  //     set_secondary_color_products([ data ]);
  //   }
  // });
};

export const create_option_products = async (
  e: any,
  product: any,
  set_option_products: Function,
  option_products: any,
  option_modifier: string,
  set_loading_options: Function
) => {
  e.preventDefault();
  set_loading_options(true);
  let list: any = [];
  if (product.category === "glowskinz" && product.subcategory === "clozd") {
    list = [
      {
        name: `${product.name} - 1${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 1${" - " + option_modifier}`),
        size: 1,
        category: "options",
        subcategory: "sizes",
        price: 2.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 8${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 8${" - " + option_modifier}`),
        size: 8,
        category: "options",
        subcategory: "sizes",
        price: 17.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 10${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 10${" - " + option_modifier}`),
        size: 10,
        category: "options",
        subcategory: "sizes",
        price: 19.99,
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
    ];
  } else if (
    product.category === "glowskinz" &&
    product.subcategory === "opyn"
  ) {
    list = [
      {
        name: `${product.name} - 1${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 1${" - " + option_modifier}`),
        size: 1,
        category: "options",
        subcategory: "sizes",
        price: 2.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 8${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 8${" - " + option_modifier}`),
        size: 8,
        category: "options",
        subcategory: "sizes",
        price: 17.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 10${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 10${" - " + option_modifier}`),
        size: 10,
        category: "options",
        subcategory: "sizes",
        price: 19.99,
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
    ];
  } else if (product.category === "diffuser_caps") {
    list = [
      {
        name: `${product.name} - 15 mm (Classic${" - " + option_modifier})`,
        pathname: snake_case(
          `${product.name} - 15 mm (Classic${" - " + option_modifier})`
        ),
        size: 1,
        category: "options",
        subcategory: "sizes",
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `${product.name} - 20 mm (Mega${" - " + option_modifier})`,
        pathname: snake_case(
          `${product.name} - 20 mm (Mega${" - " + option_modifier})`
        ),
        size: 8,
        category: "options",
        subcategory: "sizes",
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "diffusers") {
    list = [];
  } else if (product.category === "exo_diffusers") {
    list = [];
  } else if (product.category === "batteries") {
    list = [];
  } else if (product.collection === "novaskinz") {
    list = [
      {
        name: `${product.name} - 1${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 1${" - " + option_modifier}`),
        size: 1,
        category: "options",
        subcategory: "sizes",
        price: 5.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 2${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 2${" - " + option_modifier}`),
        size: 2,
        category: "options",
        subcategory: "sizes",
        price: 12.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 4${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 4${" - " + option_modifier}`),
        size: 4,
        category: "options",
        subcategory: "sizes",
        price: 22.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 10${" - " + option_modifier}`,
        pathname: snake_case(`${product.name} - 10${" - " + option_modifier}`),
        size: 10,
        category: "options",
        subcategory: "sizes",
        price: 59.99,
        item_group_id: product._id,
        default_option: true,
        ...no_state,
      },
      {
        name: `${product.name} - 1 Skin${" - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 1 Skin${" - " + option_modifier}`
        ),
        size: 4,
        category: "options",
        subcategory: "sizes",
        price: 2.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - 1 Sled${" - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 1 Sled${" - " + option_modifier}`
        ),
        size: 10,
        category: "options",
        subcategory: "sizes",
        price: 2.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  }
  save_products(
    list,
    product,
    option_products,
    set_option_products,
    set_loading_options
  );
  // list.map(async (item: any, index: number) => {
  //   const new_product = { ...product, ...item };
  //   delete new_product._id;
  //   const { data } = await API_Products.create_products_a(new_product);
  //   if (option_products) {
  //     set_option_products((colors_products: any) => [
  //       ...colors_products,
  //       data,
  //     ]);
  //   } else {
  //     set_option_products([ data ]);
  //   }
  // });
};
export const create_secondary_products = async (
  e: any,
  product: any,
  set_secondary_products: Function,
  secondary_products: any,
  secondary_modifier: string,
  set_loading_options: Function
) => {
  e.preventDefault();
  set_loading_options(true);
  let list: any = [];
  if (product.category === "glowskinz") {
    list = [
      {
        name: `${product.name} - No Bubble Button (spectra EVOs)}`,
        pathname: snake_case(
          `${product.name} - No Bubble Button (spectra EVOs)`
        ),
        size: 1,
        category: "options",
        subcategory: "sizes",
        price: 2.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - Bubble Button (Atoms)`,
        pathname: snake_case(`${product.name} - Bubble Button (Atoms)`),
        size: 8,
        category: "options",
        subcategory: "sizes",
        price: 17.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  } else if (product.category === "diffuser_caps") {
    list = [];
  } else if (product.category === "diffusers") {
    list = [];
  } else if (product.category === "exo_diffusers") {
    list = [];
  } else if (product.category === "batteries") {
    list = [];
  } else if (product.collection === "novaskinz") {
    list = [
      {
        name: `${product.name} - No Button Mod (spectra EVOs)}`,
        pathname: snake_case(`${product.name} - No Button Mod (spectra EVOs)`),
        size: 1,
        category: "options",
        subcategory: "sizes",
        price: 2.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
      {
        name: `${product.name} - Bubble Mod (Atoms)`,
        pathname: snake_case(`${product.name} - Bubble Mod (Atoms)`),
        size: 8,
        category: "options",
        subcategory: "sizes",
        price: 17.99,
        item_group_id: product._id,
        default_option: false,
        ...no_state,
      },
    ];
  }
  save_products(
    list,
    product,
    secondary_products,
    set_secondary_products,
    set_loading_options
  );
  // list.map(async (item: any, index: number) => {
  //   const new_product = { ...product, ...item };
  //   delete new_product._id;
  //   const { data } = await API_Products.create_products_a(new_product);
  //   if (option_products) {
  //     set_option_products((colors_products: any) => [
  //       ...colors_products,
  //       data,
  //     ]);
  //   } else {
  //     set_option_products([ data ]);
  //   }
  // });
  // set_loading_options(false);
};
