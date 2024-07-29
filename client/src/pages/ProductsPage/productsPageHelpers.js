export const productColors = [
  { name: "Not Category", color: "#333333" },
  { name: "OPYN Glowskinz", color: "#557b68" },
  { name: "Glowstringz", color: "#4b7188" },
  { name: "CLOZD Glowskinz", color: "#736084" },
  { name: "Decals", color: "#6f5aa3" },
  { name: "Diffusers", color: "#ca9160" },
  { name: "Diffuser Caps", color: "#6c7ea9" },
  { name: "Accessories", color: "#925757" },
  { name: "EXO Diffusers", color: "#4162ad" },
  { name: "Gloves", color: "#4f85a7" },
];

export const determineColor = product => {
  let result = "#797979";

  if (product.category === "gloves") {
    result = productColors[9].color;
  }
  if (product.subcategory === "opyn") {
    result = productColors[1].color;
  }
  if (product.category === "glowstringz") {
    result = productColors[2].color;
  }
  if (product.subcategory === "clozd") {
    result = productColors[3].color;
  }
  if (product.category === "decals") {
    result = productColors[4].color;
  }
  if (product.category === "diffusers") {
    result = productColors[5].color;
  }
  if (product.category === "diffuser_caps") {
    result = productColors[6].color;
  }
  if (product.category === "batteries") {
    result = productColors[7].color;
  }
  if (product.category === "exo_diffusers") {
    result = productColors[8].color;
  }
  if (product.hidden) {
    result = productColors[0].color;
  }
  return result;
};

export const productInitalState = {
  name: "",
  images: [],
  color_images: [],
  secondary_color_images: [],
  option_images: [],
  secondary_images: [],
  video: "",
  brand: "",
  price: 0,
  wholesale_price: 0,
  wholesale_product: false,
  previous_price: 0,
  category: "",
  product_collection: "",
  categorys: [],
  subcategorys: [],
  subcategory: "",
  count_in_stock: 0,
  quantity: 0,
  finite_stock: false,
  facts: "",
  included_items: "",
  contributors: [],
  description: "",
  rating: 0,
  numReviews: 0,
  reviews: [],
  hidden: false,
  sale_price: 0,
  sale_start_date: "",
  sale_end_date: "",
  deleted: false,
  preorder: false,
  pathname: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  length: 0,
  width: 0,
  height: 0,
  volume: 0,
  package_length: 0,
  package_width: 0,
  package_height: 0,
  package_volume: 0,
  product_length: 0,
  product_width: 0,
  product_height: 0,
  weight_pounds: 0,
  weight_ounces: 0,
  processing_time: [],
  material_cost: 0,
  filament_used: 0,
  printing_time: 0,
  assembly_time: 0,
  order: 0,
  item_group_id: "",
  chips: [],
  products: [],
  has_add_on: false,
  color_product_group: false,
  color_group_name: "",
  color_products: [],
  filament: {},

  secondary_color_product_group: false,
  secondary_color_group_name: "",
  secondary_color_products: [],
  secondary_product_group: false,
  secondary_group_name: "",
  secondary_products: [],

  option_product_group: false,
  option_group_name: "",
  option_products: [],
  color: "",
  color_code: "",
  size: "",
  sizing: "",
  default_option: false,
  option: false,
  macro_product: false,
  extra_cost: 0,
};

export const hasUpdatedProductOptionProduct = (parentProduct, option, value, valueProduct) => {
  const newProductName = `${parentProduct?.name} - ${option?.name} - ${value?.name}`;
  const newPathname = `${parentProduct.pathname}_${option?.name.toLowerCase().replace(/\s+/g, "_")}_${value?.name.toLowerCase().replace(/\s+/g, "_")}`;
  if (newProductName === valueProduct?.name && newPathname === valueProduct?.pathname) {
    return true;
  }
  return false;
};
