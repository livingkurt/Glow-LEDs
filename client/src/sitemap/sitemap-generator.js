const React = require("react");
const { default: axios } = require("axios");
const path = require("path");

const domain = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://www.glow-leds.com";
  } else {
    return "http://localhost:3000";
  }
};

require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemap-routes").default;
// const Sitemap = require("react-router-sitemap").default;

console.log({ router: router.props.children[0].props.path });

async function generateSitemap() {
  // try {
  //   const domainUrl = domain();
  //   const fetchPromises = [
  //     // axios.get(`${domainUrl}/api/products/category/distinct`),
  //     // axios.get(`${domainUrl}/api/products/subcategory/distinct`),
  //     // axios.get(`${domainUrl}/api/products/product_collection/distinct`),
  //     axios.get(`${domainUrl}/api/products/pathname/distinct`),
  //     // axios.get(`${domainUrl}/api/teams/category/distinct`),
  //     // axios.get(`${domainUrl}/api/features/category/distinct`),
  //     // axios.get(`${domainUrl}/api/affiliates/category/distinct`),
  //     // axios.get(`${domainUrl}/api/affiliates/promo_code/distinct`)
  //   ];
  //   const [pathnameRes] = await Promise.all(fetchPromises);
  //   const pathnames = pathnameRes.data;
  //   let pathnameMap = pathnames.map(pathname => ({ pathname }));
  //   const menu_types = [{ pathname: "gloving" }, { pathname: "featured" }, { pathname: "support" }];
  //   const paramsConfig = {
  //     "/collections/all/products/:pathname": pathnameMap,
  //     // "/pages/contact/:reason": contact_reason,
  //     "/pages/menu/:pathname": menu_types,
  //   };
  //   const paths = new Set();
  //   // Filter out duplicate paths
  //   const filteredRoutes = router.props.children.filter(route => {
  //     const path = route.props.path;
  //     // If the path is the home URL and it's already in the set, return false
  //     if (path === "/") {
  //       return false;
  //     }
  //     // If the path is already in the set, it's a duplicate
  //     if (paths.has(path)) {
  //       return false;
  //     } else {
  //       // Otherwise, add it to the set and include it in the routes
  //       paths.add(path);
  //       return true;
  //     }
  //   });
  //   // Use the filtered routes to create the sitemap
  //   const filteredRouter = React.cloneElement(router, { children: filteredRoutes });
  //   return new Sitemap(filteredRouter)
  //     .applyParams(paramsConfig)
  //     .build("https://www.glow-leds.com")
  //     .save("../sitemap.xml");
  // } catch (error) {
  //   console.error("An error occurred while generating the sitemap:", error);
  // }
}

generateSitemap();
