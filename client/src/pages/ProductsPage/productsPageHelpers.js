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

export const productInitialState = {
  images: [],
  name: "",
  fact: "",
  price: 0,
  wholesale_price: 0,
  wholesale_product: false,
  previous_price: 0,
  short_description: "",
  max_display_quantity: 30,
  max_quantity: 30,
  count_in_stock: 30,
  finite_stock: false,
  options: [],
  pathname: "",
  isPreOrder: false,
  preOrderReleaseDate: null,
  preOrderQuantity: 0,
  hero_video: {
    title: "",
    description: "",
    video: "",
    hidden: false,
  },
  hero_image: null,
  icon_specs: [],
  icon_specs_hidden: false,
  navigation: {
    navigation_buttons: [],
    hidden: false,
  },
  title_image: null,
  themed_logo: null,
  line_break: null,
  pattern_tile: null,
  corner_image: null,
  subtitle_text: "",
  primary_color: "",
  secondary_color: "",
  background_color: "",
  header_text_color: "",
  text_color: "",
  navigation_buttons_hidden: true,
  features: {
    image_grid_1: [],
    image_grid_1_hidden: false,
    hero_image_1: null,
    hero_fact_1: {
      title: "",
      subtitle: "",
      description: "",
      hidden: false,
    },
    image_grid_2: [],
    image_grid_2_hidden: false,
    hero_fact_2: {
      title: "",
      subtitle: "",
      description: "",
      hidden: false,
    },
    hero_image_2: null,
    lifestyle_images: [],
    lifestyle_images_hidden: false,
    hero_fact_3: {
      title: "",
      subtitle: "",
      description: "",
      hidden: false,
    },
    hero_image_3: null,
  },
  not_sure: {
    title: "",
    button_text: "",
    link: "",
    hidden: false,
  },
  tech_specs: {
    title: "",
    navigation: [],
    hidden: false,
  },
  in_the_box: {
    title: "",
    items: [],
    hidden: false,
  },
  elevate_your_experience: {
    title: "",
    description: "",
    products: [],
    hidden: false,
  },
  product_support: {
    quick_guide: "",
    manual: "",
    support_link: "",
    tutorial_video: "",
    hidden: false,
  },
  tags: [],
  category: "",
  subcategory: "",
  product_collection: "",
  contributors: [],
  rating: 0,
  numReviews: 0,
  reviews: [],
  hidden: false,
  sale: {
    price: 0,
    start_date: null,
    end_date: null,
  },
  seo: {
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  },
  dimensions: {
    package_length: 0,
    package_width: 0,
    package_height: 0,
    package_volume: 0,
    product_length: 0,
    product_width: 0,
    product_height: 0,
    weight_pounds: 0,
    weight_ounces: 0,
  },
  meta_data: {
    processing_time: [],
    material_cost: 0,
    filament_used: 0,
    printing_time: 0,
    assembly_time: 0,
  },
  order: 0,
  parent: null,
  parents: [],
  isVariation: false,
  color_object: {
    name: "",
    code: "",
    is_filament_color: false,
    filament: null,
  },
  size: "",
  set_of: 0,
  chips: [],
  isPasswordProtected: false,
  passwordProtection: {
    password: "",
    expirationDate: null,
  },
  deleted: false,
};

export const hasUpdatedProductOptionProduct = (parentProduct, option, value, valueProduct) => {
  const newProductName = `${parentProduct?.name} - ${option?.name} - ${value?.name}`;
  const newPathname = `${parentProduct.pathname}_${option?.name.toLowerCase().replace(/\s+/g, "_")}_${value?.name.toLowerCase().replace(/\s+/g, "_")}`;
  if (newProductName === valueProduct?.name && newPathname === valueProduct?.pathname) {
    return true;
  }
  return false;
};
