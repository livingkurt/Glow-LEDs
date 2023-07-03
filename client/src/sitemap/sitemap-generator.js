const { default: axios } = require("axios");

const domain = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://www.glow-leds.com";
  } else {
    return "http://localhost:3000";
  }
};

require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

async function generateSitemap() {
  try {
    const domainUrl = domain();
    const fetchPromises = [
      axios.get(`${domainUrl}/api/products/category/distinct`),
      axios.get(`${domainUrl}/api/products/subcategory/distinct`),
      axios.get(`${domainUrl}/api/products/product_collection/distinct`),
      axios.get(`${domainUrl}/api/products/pathname/distinct`)
      // axios.get(`${domainUrl}/api/teams/category/distinct`),
      // axios.get(`${domainUrl}/api/features/category/distinct`),
      // axios.get(`${domainUrl}/api/affiliates/category/distinct`),
      // axios.get(`${domainUrl}/api/affiliates/promo_code/distinct`)
    ];

    const [categoriesRes, subcategoriesRes, collectionsRes, pathnameRes] = await Promise.all(fetchPromises);
    const categories = categoriesRes.data;
    const subcategories = subcategoriesRes.data;
    const collections = collectionsRes.data;
    const pathnames = pathnameRes.data;

    console.log({ categories, subcategories, collections, pathnames });
    let pathnameMap = pathnames.map(pathname => ({ pathname }));
    let categoryMap = categories.map(category => ({ category }));
    let subcategoryMap = subcategories.map(subcategory => ({ subcategory }));
    let collectionsMap = collections.map(collection => ({ collection }));

    const contact_reason = [
      { reason: "did_not_recieve_verification_email" },
      { reason: "order_issues" },
      { reason: "returns" },
      { reason: "technical_support" },
      { reason: "website_bugs" },
      { reason: "custom_orders" },
      { reason: "product_suggestions" }
      // { reason: "submit_content_to_be_featured" },
    ];
    const menu_types = [{ pathname: "gloving" }, { pathname: "featured" }, { pathname: "support" }];

    const paramsConfig = {
      // "/collections/all/products/category/:category": categoryMap,
      // "/collections/all/products/category/glowskinz/subcategory/:subcategory": subcategoryMap,
      // "/collections/all/products/category/exo_diffusers/subcategory/:subcategory": subcategoryMap,
      // "/collections/all/products/category/diffuser_caps/subcategory/:subcategory": subcategoryMap,
      // "/collections/all/products/category/diffusers/subcategory/:subcategory": subcategoryMap,
      // "/collections/all/products/category/glowstringz/subcategory/:subcategory": subcategoryMap,
      // "/collections/all/products/category/glowskinz/subcategory/clozd/collection/:collection": collectionsMap,
      // "/collections/all/products/category/glowskinz/subcategory/opyn/collection/:collection": collectionsMap,
      // "/collections/all/products/category/diffuser_caps/subcategory/texture/collection/:collection": collectionsMap,
      // "/collections/all/products/category/diffuser_caps/subcategory/shapes/collection/:collection": collectionsMap,
      // "/collections/all/products/category/diffuser_caps/subcategory/geometric/collection/:collection": collectionsMap,
      "/collections/all/products/:pathname": pathnameMap,
      // "/pages/contact/:reason": contact_reason,
      "/pages/menu/:pathname": menu_types
    };
    return new Sitemap(router).applyParams(paramsConfig).build("https://glow-leds.com").save("../sitemap.xml").save("public/sitemap.xml");
  } catch (error) {
    console.error("An error occurred while generating the sitemap:", error);
  }
}

generateSitemap();
