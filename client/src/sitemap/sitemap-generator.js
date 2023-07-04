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

    const menu_types = [{ pathname: "gloving" }, { pathname: "featured" }, { pathname: "support" }];

    const paramsConfig = {
      "/collections/all/products/:pathname": pathnameMap,
      "/pages/menu/:pathname": menu_types
    };
    return new Sitemap(router).applyParams(paramsConfig).build("https://glow-leds.com").save("../sitemap.xml").save("public/sitemap.xml");
  } catch (error) {
    console.error("An error occurred while generating the sitemap:", error);
  }
}

generateSitemap();
