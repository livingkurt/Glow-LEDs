import { API_Products } from "..";
import { snake_case } from "../helper_functions";

export const determine_color_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "Skin";
  } else if (category === "diffuser_caps") {
    return "Cap";
  } else if (category === "glowframez") {
    return "Frame";
  } else {
    return "";
  }
};

export const determine_secondary_color_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "Sled";
  } else if (category === "diffuser_caps") {
    return "Adapter";
  } else if (category === "glowframez") {
    return "Frame";
  } else {
    return "";
  }
};

export const determine_option_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "";
  } else if (category === "diffuser_caps") {
    return "";
  } else if (category === "glowframez") {
    return "";
  } else {
    return "";
  }
};

export const determine_secondary_modifier = (category: string) => {
  if (category === "glowskinz") {
    return "Style";
  } else if (category === "diffuser_caps") {
    return "Cap Design";
  } else if (category === "glowframez") {
    return "";
  } else {
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
  meta_description: "",
  facts: "",
  description: "",
  chips: [],
  video: "",
};

const save_products = (
  list: any,
  product: any,
  products: any,
  set_products: Function
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
};

export const create_color_products = async (
  product: any,
  set_color_products: Function,
  color_products: any,
  color_modifier: string,
  color_images: any
) => {
  console.log({ color_modifier });
  let list: any = [];
  if (
    product.category === "glowskinz" &&
    product.subcategory === "clozd" &&
    product.collection === "capez"
  ) {
    list = [
      {
        name: `Clear ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: true,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },

      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Green ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Green ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Green",
        color_code: "#15715a",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[6] ? [ color_images[6] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[7] ? [ color_images[7] ] : [],
        ...no_state,
      },
      {
        name: `Frosted ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Frosted",
        color_code: "white",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `Black ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Black ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `White ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `White ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "White",
        color_code: "white",
        subcategory: "clozd",
        product_collection: "capez",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
    ];
  } else if (
    product.category === "glowskinz" &&
    product.subcategory === "clozd"
  ) {
    list = [
      {
        name: `Clear ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: true,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },
      {
        name: `Frosted ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Frosted",
        color_code: "white",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Emerald ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Emerald ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Emerald",
        color_code: "#15715a",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Teal ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Teal ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Teal",
        color_code: "#1da5b3",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[4] ? [ color_images[4] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[6] ? [ color_images[6] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[7] ? [ color_images[7] ] : [],
        ...no_state,
      },
    ];
  } else if (
    product.category === "glowskinz" &&
    product.subcategory === "opyn"
  ) {
    list = [
      {
        name: `Clear ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: true,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },
      {
        name: `Frosted ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Frosted",
        color_code: "white",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        secondary_products: [],
        ...no_state,
      },
      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Emerald ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Emerald ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Emerald",
        color_code: "#15715a",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Teal ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Teal ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Teal",
        color_code: "#1da5b3",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[4] ? [ color_images[4] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[6] ? [ color_images[6] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[7] ? [ color_images[7] ] : [],
        ...no_state,
      },
      {
        name: `Black  ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Black  ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[9] ? [ color_images[9] ] : [],
        ...no_state,
      },
    ];
  } else if (product.category === "diffuser_caps") {
    list = [
      {
        name: `Black ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Black ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: true,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },
      {
        name: `White ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `White ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "White",
        color_code: "white",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Green ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Green ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[4] ? [ color_images[4] ] : [],
        ...no_state,
      },
      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[6] ? [ color_images[6] ] : [],
        ...no_state,
      },
    ];
  } else if (product.category === "diffusers") {
    list = [
      {
        name: `Frosted ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Frosted",
        color_code: "#abaeb5",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },
      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `Green ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Green ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[4] ? [ color_images[4] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
    ];
  } else if (product.category === "exo_diffusers") {
    list = [
      {
        name: `Black ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Black ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },
      {
        name: `White ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `White ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "White",
        color_code: "white",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Green ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Green ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[4] ? [ color_images[4] ] : [],
        ...no_state,
      },

      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[6] ? [ color_images[6] ] : [],
        ...no_state,
      },
    ];
  } else if (product.category === "batteries") {
    list = [
      {
        name: `White ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `White ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "White",
        color_code: "white",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },
      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `Green ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Green ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[4] ? [ color_images[4] ] : [],
        ...no_state,
      },
      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
      {
        name: `Black ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Black ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[6] ? [ color_images[6] ] : [],
        ...no_state,
      },
      {
        name: `Clear ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[7] ? [ color_images[7] ] : [],
        ...no_state,
      },
    ];
  } else if (product.product_collection === "novaskinz") {
    list = [
      {
        name: `Clear ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: true,
        images: color_images[0] ? [ color_images[0] ] : [],
        ...no_state,
      },
      {
        name: `Red ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[1] ? [ color_images[1] ] : [],
        ...no_state,
      },
      {
        name: `Emerald ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Emerald ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Emerald",
        color_code: "#15715a",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[2] ? [ color_images[2] ] : [],
        ...no_state,
      },
      {
        name: `Teal ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Teal ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Teal",
        color_code: "#1da5b3",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[3] ? [ color_images[3] ] : [],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${color_modifier && " - " + color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[4] ? [ color_images[4] ] : [],
        ...no_state,
      },
      {
        name: `Violet ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[5] ? [ color_images[5] ] : [],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${color_modifier &&
          " - " + color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${color_modifier && " - " + color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: false,
        images: color_images[6] ? [ color_images[6] ] : [],
        ...no_state,
      },
    ];
  }
  save_products(list, product, color_products, set_color_products);
};

export const create_secondary_color_products = async (
  product: any,
  set_secondary_color_products: Function,
  secondary_color_products: any,
  secondary_color_modifier: string,
  secondary_color_images: any
) => {
  console.log({ product });
  let list: any = [];
  if (product.category === "glowskinz") {
    console.log({ create_secondary_color_products: "secondary_color" });
    list = [
      {
        name: `Clear ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Clear ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Clear",
        color_code: "#4b4b4b",
        subcategory: "options",
        product_collection: "colors",
        item_group_id: product._id,
        default_option: true,
        images: [ secondary_color_images[0] ],
        ...no_state,
      },
      {
        name: `Red ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Red ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Red",
        color_code: "#c11c22",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[2] ],
        ...no_state,
      },
      {
        name: `Green ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Green ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Green",
        color_code: "#00c700",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[3] ],
        ...no_state,
      },
      {
        name: `Blue ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Blue ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Blue",
        color_code: "#0014ff",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[4] ],
        ...no_state,
      },

      {
        name: `Violet ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Violet ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Violet",
        color_code: "#543abb",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[5] ],
        ...no_state,
      },
      {
        name: `Purple ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Purple ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Purple",
        color_code: "purple",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[6] ],
        ...no_state,
      },
      {
        name: `Frosted ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Frosted ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Frosted",
        color_code: "#abaeb5",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[1] ],
        ...no_state,
      },
      {
        name: `Black ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `Black ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "Black",
        color_code: "black",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[7] ],
        ...no_state,
      },
      {
        name: `White ${product.name}${secondary_color_modifier &&
          " - " + secondary_color_modifier}`,
        pathname: snake_case(
          `White ${product.name}${secondary_color_modifier &&
            " - " + secondary_color_modifier}`
        ),
        color: "White",
        color_code: "white",
        subcategory: "options",
        product_collection: "secondary_colors",
        item_group_id: product._id,
        default_option: false,
        images: [ secondary_color_images[7] ],
        ...no_state,
      },
    ];
  }
  // else if (product.category === "diffuser_caps") {
  //   list = [
  //     {
  //       name: `Frosted ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Frosted ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Frosted",
  //       color_code: "#abaeb5",
  //       subcategory: "options",
  //       product_collection: "colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[0] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Red ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Red ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Red",
  //       color_code: "#c11c22",
  //       subcategory: "options",
  //       product_collection: "colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[1] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Green ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Green ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Green",
  //       color_code: "#00c700",
  //       subcategory: "options",
  //       product_collection: "colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[2] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Blue ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Blue ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Blue",
  //       color_code: "#0014ff",
  //       subcategory: "options",
  //       product_collection: "colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[3] ],
  //       ...no_state,
  //     },

  //     {
  //       name: `Violet ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Violet ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Violet",
  //       color_code: "#543abb",
  //       subcategory: "options",
  //       product_collection: "colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[4] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Purple ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Purple ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Purple",
  //       color_code: "purple",
  //       subcategory: "options",
  //       product_collection: "colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[5] ],
  //       ...no_state,
  //     },
  //   ];
  // } else if (product.category === "diffusers") {
  //   list = [];
  // } else if (product.category === "exo_diffusers") {
  //   list = [
  //     {
  //       name: `Frosted ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Frosted ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Frosted",
  //       color_code: "#abaeb5",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[0] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Red ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Red ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Red",
  //       color_code: "#c11c22",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[1] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Green ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Green ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Green",
  //       color_code: "#00c700",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[2] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Blue ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Blue ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Blue",
  //       color_code: "#0014ff",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[3] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Violet ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Violet ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Violet",
  //       color_code: "#543abb",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[4] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Purple ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Purple ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Purple",
  //       color_code: "purple",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[5] ],
  //       ...no_state,
  //     },
  //   ];
  // } else if (product.category === "batteries") {
  //   list = [];
  // }
  // else if (product.product_collection === "novaskinz") {
  //   list = [
  //     {
  //       name: `Clear ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Clear ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Clear",
  //       color_code: "#4b4b4b",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[0] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Red ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Red ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Red",
  //       color_code: "#c11c22",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[2] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Green ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Green ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Green",
  //       color_code: "#00c700",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[3] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Blue ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Blue ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Blue",
  //       color_code: "#0014ff",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[4] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Violet ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Violet ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Violet",
  //       color_code: "#543abb",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[5] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Purple ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Purple ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Purple",
  //       color_code: "purple",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[6] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Frosted ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Frosted ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Frosted",
  //       color_code: "#abaeb5",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[1] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `Black ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `Black ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "Black",
  //       color_code: "black",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[8] ],
  //       ...no_state,
  //     },
  //     {
  //       name: `White ${product.name}${secondary_color_modifier &&
  //         " - " + secondary_color_modifier}`,
  //       pathname: snake_case(
  //         `White ${product.name}${secondary_color_modifier &&
  //           " - " + secondary_color_modifier}`
  //       ),
  //       color: "White",
  //       color_code: "white",
  //       subcategory: "options",
  //       product_collection: "secondary_colors",
  //       item_group_id: product._id,
  //       default_option: false,
  //       images: [ secondary_color_images[7] ],
  //       ...no_state,
  //     },
  //   ];
  // }
  save_products(
    list,
    product,
    secondary_color_products,
    set_secondary_color_products
  );
};

export const create_option_products = async (
  product: any,
  set_option_products: Function,
  option_products: any,
  option_modifier: string,
  option_images: any
) => {
  let list: any = [];
  if (product.category === "glowskinz" && product.subcategory === "clozd") {
    list = [
      {
        name: `${product.name} - 1${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 1${option_modifier && " - " + option_modifier}`
        ),
        size: 1,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 0.1495747874).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[0] ],
        ...no_state,
      },
      {
        name: `${product.name} - 8${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 8${option_modifier && " - " + option_modifier}`
        ),
        size: 8,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 0.899949975).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[1] ],
        ...no_state,
      },
      {
        name: `${product.name} - 10${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 10${option_modifier && " - " + option_modifier}`
        ),
        size: 10,
        subcategory: "options",
        product_collection: "sizes",
        price: product.price,
        item_group_id: product._id,
        default_option: true,
        images: [ option_images[2] ],
        ...no_state,
      },
    ];
  } else if (
    product.category === "glowskinz" &&
    product.subcategory === "opyn"
  ) {
    list = [
      {
        name: `${product.name} - 1${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 1${option_modifier && " - " + option_modifier}`
        ),
        size: 1,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 0.1495747874).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[0] ],
        ...no_state,
      },
      {
        name: `${product.name} - 8${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 8${option_modifier && " - " + option_modifier}`
        ),
        size: 8,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 0.899949975).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[1] ],
        ...no_state,
      },
      {
        name: `${product.name} - 10${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 10${option_modifier && " - " + option_modifier}`
        ),
        size: 10,
        subcategory: "options",
        product_collection: "sizes",
        price: product.price,
        item_group_id: product._id,
        default_option: true,
        images: [ option_images[2] ],
        ...no_state,
      },
    ];
  } else if (product.category === "diffuser_caps") {
    list = [
      {
        name: `${product.name} - 15 mm (Classic${option_modifier &&
          " - " + option_modifier})`,
        pathname: snake_case(
          `${product.name} - 15 mm (Classic${option_modifier &&
            " - " + option_modifier})`
        ),
        size: 1,
        subcategory: "options",
        product_collection: "sizes",
        price: 0,
        item_group_id: product._id,
        default_option: true,
        images: [ option_images[0] ],
        ...no_state,
      },
      {
        name: `${product.name} - 20 mm (Mega${option_modifier &&
          " - " + option_modifier})`,
        pathname: snake_case(
          `${product.name} - 20 mm (Mega${option_modifier &&
            " - " + option_modifier})`
        ),
        size: 8,
        subcategory: "options",
        product_collection: "sizes",
        price: 0,
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[1] ],
        ...no_state,
      },
    ];
  } else if (product.category === "diffusers") {
    list = [];
  } else if (product.category === "exo_diffusers") {
    list = [];
  } else if (product.category === "batteries") {
    list = [];
  } else if (product.product_collection === "novaskinz") {
    list = [
      {
        name: `${product.name} - 1${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 1${option_modifier && " - " + option_modifier}`
        ),
        size: 1,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 0.4611239415).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[0] ],
        ...no_state,
      },
      {
        name: `${product.name} - 2${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 2${option_modifier && " - " + option_modifier}`
        ),
        size: 2,
        subcategory: "options",
        product_collection: "sizes",
        price: product.price,
        item_group_id: product._id,
        default_option: true,
        images: [ option_images[1] ],
        ...no_state,
      },
      {
        name: `${product.name} - 4${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 4${option_modifier && " - " + option_modifier}`
        ),
        size: 4,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 1.9237875289).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[2] ],
        ...no_state,
      },
      {
        name: `${product.name} - 10${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 10${option_modifier && " - " + option_modifier}`
        ),
        size: 10,
        subcategory: "options",
        product_collection: "sizes",
        price: 59.99,
        item_group_id: product._id,
        default_option: true,
        images: [ option_images[3] ],
        ...no_state,
      },
      {
        name: `${product.name} - 1 Skin${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 1 Skin${option_modifier &&
            " - " + option_modifier}`
        ),
        size: 4,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 0.1495747874).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[4] ],
        ...no_state,
      },
      {
        name: `${product.name} - 1 Sled${option_modifier &&
          " - " + option_modifier}`,
        pathname: snake_case(
          `${product.name} - 1 Sled${option_modifier &&
            " - " + option_modifier}`
        ),
        size: 10,
        subcategory: "options",
        product_collection: "sizes",
        price: (product.price * 0.1495747874).toFixed(2),
        item_group_id: product._id,
        default_option: false,
        images: [ option_images[5] ],
        ...no_state,
      },
    ];
  }
  save_products(list, product, option_products, set_option_products);
};

export const create_secondary_products = async (
  product: any,
  set_secondary_products: Function,
  secondary_products: any,
  secondary_modifier: string,
  secondary_images: any
) => {
  let list: any = [];
  if (product.name.includes("Nanoskinz")) {
    list = [
      {
        name: `${product.name} - No Bubble Button (spectra EVOs)`,
        pathname: snake_case(
          `${product.name} - No Bubble Button (spectra EVOs)`
        ),
        size: 1,
        subcategory: "options",
        product_collection: "sizes",
        price: 0,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - Bubble Button (Atoms)`,
        pathname: snake_case(`${product.name} - Bubble Button (Atoms)`),
        size: 8,
        subcategory: "options",
        product_collection: "sizes",
        price: 0,
        item_group_id: product._id,
      },
    ];
  } else if (product.name.includes("Omniskinz")) {
    list = [
      {
        name: `${product.name} - Apollo Sleds`,
        pathname: snake_case(`${product.name} - Apollo Sleds`),
        size: 1,
        category: "glowskinz",
        subcategory: "clozd",
        product_collection: "sleds",
        price: 9.99,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - Coffin Sleds`,
        pathname: snake_case(`${product.name} - Coffin Sleds`),
        size: 8,
        category: "glowskinz",
        subcategory: "clozd",
        product_collection: "sleds",
        price: 9.99,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - Coin Sleds`,
        pathname: snake_case(`${product.name} - Coin Sleds`),
        size: 8,
        category: "glowskinz",
        subcategory: "clozd",
        product_collection: "sleds",
        price: 9.99,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - Nano Sleds (spectra EVO)`,
        pathname: snake_case(`${product.name} - Nano Sleds (spectra EVO)`),
        size: 8,
        category: "glowskinz",
        subcategory: "clozd",
        product_collection: "sleds",
        price: 9.99,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - Nano Sleds (Atoms)`,
        pathname: snake_case(`${product.name} - Nano Sleds (Atoms)`),
        size: 8,
        category: "glowskinz",
        subcategory: "clozd",
        product_collection: "sleds",
        price: 9.99,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - OSM Sleds`,
        pathname: snake_case(`${product.name} - OSM Sleds`),
        size: 8,
        category: "glowskinz",
        subcategory: "clozd",
        product_collection: "sleds",
        price: 9.99,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - Vortex Sleds`,
        pathname: snake_case(`${product.name} - Vortex Sleds`),
        size: 8,
        category: "glowskinz",
        subcategory: "clozd",
        product_collection: "sleds",
        price: 9.99,
        item_group_id: product._id,
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
  } else if (product.product_collection === "novaskinz") {
    list = [
      {
        name: `${product.name} - No Button Mod (spectra EVOs)`,
        pathname: snake_case(`${product.name} - No Button Mod (spectra EVOs)`),
        size: 1,
        subcategory: "options",
        product_collection: "sizes",
        price: 0,
        item_group_id: product._id,
      },
      {
        name: `${product.name} - Bubble Mod (Atoms)`,
        pathname: snake_case(`${product.name} - Bubble Mod (Atoms)`),
        size: 8,
        subcategory: "options",
        product_collection: "sizes",
        price: 0,
        item_group_id: product._id,
      },
    ];
  }
  save_products(list, product, secondary_products, set_secondary_products);
};
