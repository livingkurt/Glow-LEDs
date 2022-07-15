require("babel-register")({
  presets: [ "es2015", "react" ],
});

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;
const fetch = require("node-fetch");
const API = "http://localhost:8080";
const categories = [
  "whites",
  "batteries",
  "decals",
  "diffuser_caps",
  "diffusers",
  "exo_diffusers",
  "glowstringz",
  "glowskinz",
];
const subcategories = [
  "whites",
  "refresh",
  "battery_storage",
  "batteries",
  "stickers",
  "opyn",
  "clozd",
  "clips",
  "casings",
  "universal",
  "batman",
  "outline",
  "patterns",
  "abstract",
  "shapes",
  "diffuser_adapters",
  "geometric",
  "starter_kit",
  "sacred_geometry",
  "imperfect",
  "domes",
  "closed_hole",
  "fisheye",
  "open_hole",
  "polygons",
  "cylinders",
  "polyhedrons",
  "gift_card",
  "nova",
  "classics",
  "novaskinz",
  "alt_novaskinz",
  "symbols",
  "emoji",
  "custom",
  "colors",
  "sizes",
  "secondary_colors",
];

const collections = [
  "novaskinz",
  "classics",
  "space_cadet",
  "platonic_solids",
  "festie_bestie",
  "fractal",
  "texture",
];

async function generateSitemap() {
  let products_res = await fetch(
    API + "/api/products?deleted=false&hidden=false&option=false"
  );
  let { products } = await products_res.json();

  let productMap = products
    .filter(product => product.hidden === false)
    .map(product => {
      return { pathname: product.pathname };
    });
  let categoryMap = categories.map(category => {
    return { category };
  });
  let subcategoryMap = subcategories.map(subcategory => {
    return { subcategory };
  });
  let collectionsMap = collections.map(collection => {
    return { collection };
  });

  const contact_reason = [
    { reason: "did_not_recieve_verification_email" },
    { reason: "order_issues" },
    { reason: "returns" },
    { reason: "technical_support" },
    { reason: "website_bugs" },
    { reason: "custom_orders" },
    { reason: "product_suggestions" },
    { reason: "submit_content_to_be_featured" },
  ];
  const menu_types = [
    { pathname: "gloving" },
    { pathname: "featured" },
    { pathname: "support" },
  ];

  console.log({ productMap });
  console.log({ categoryMap });
  console.log({ subcategoryMap });

  const paramsConfig = {
    "/collections/all/products/category/:category": categoryMap,
    "/collections/all/products/category/glowskinz/subcategory/:subcategory": subcategoryMap,
    "/collections/all/products/category/exo_diffusers/subcategory/:subcategory": subcategoryMap,
    "/collections/all/products/category/diffuser_caps/subcategory/:subcategory": subcategoryMap,
    "/collections/all/products/category/diffusers/subcategory/:subcategory": subcategoryMap,
    "/collections/all/products/category/glowstringz/subcategory/:subcategory": subcategoryMap,
    "/collections/all/products/category/glowskinz/subcategory/clozd/collection/:collection": collectionsMap,
    "/collections/all/products/category/glowskinz/subcategory/opyn/collection/:collection": collectionsMap,
    "/collections/all/products/category/diffuser_caps/subcategory/texture/collection/:collection": collectionsMap,
    "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/:collection": collectionsMap,
    "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/:collection": collectionsMap,
    "/collections/all/products/:pathname": productMap,
    "/pages/contact/:reason": contact_reason,
    "/pages/menu/:pathname": menu_types,
  };
  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build("https://glow-leds.com")
    .save("../sitemap.xml")
    .save("public/sitemap.xml");
}

generateSitemap();
