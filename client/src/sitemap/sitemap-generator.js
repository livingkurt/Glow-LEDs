const fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");
const { routes } = require("../utils/helpers/routes");

function generateUrlXML(url) {
  return `
    <url><loc>${url}</loc></url>`;
}

async function generateSitemap() {
  try {
    const fetchPromises = [axios.get(`https://www.glow-leds.com/api/products/pathname/distinct`)];

    const [pathnameRes] = await Promise.all(fetchPromises);
    const pathnames = pathnameRes.data;

    let pathnameMap = pathnames.map(pathname => ({ pathname }));
    const menu_types = [{ pathname: "menu" }];

    const paramsConfig = {
      "/products/:pathname": pathnameMap,
      "/menu/:pathname": menu_types,
    };

    let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>';
    sitemapXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    routes.forEach(route => {
      let url = route.path;

      // Handle dynamic routes
      if (url.includes(":")) {
        const param = url.split(":")[1];
        const values = paramsConfig[url];

        values?.forEach(value => {
          const dynamicUrl = url.replace(`:${param}`, value.pathname);
          sitemapXML += generateUrlXML(`https://www.glow-leds.com${dynamicUrl}`);
        });
      } else {
        sitemapXML += generateUrlXML(`https://www.glow-leds.com${url}`);
      }
    });

    sitemapXML += "</urlset>";

    fs.writeFileSync(path.join(__dirname, "../sitemap.xml"), sitemapXML);
  } catch (error) {
    console.error("An error occurred while generating the sitemap:", error);
  }
}

generateSitemap();
