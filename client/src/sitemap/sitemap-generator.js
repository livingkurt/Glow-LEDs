const fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");
const { routes } = require("../utils/helpers/routes");

function generateUrlXML(url, lastmod = null) {
  let xml = `
    <url>
      <loc>${url}</loc>`;
  if (lastmod) {
    xml += `
      <lastmod>${lastmod}</lastmod>`;
  }
  xml += `
    </url>`;
  return xml;
}

async function generateSitemap() {
  try {
    const { data } = await axios.put(`https://www.glow-leds.com/api/versions/sitemap`);

    const paramsConfig = {
      "/products/:pathname": data.products,
      "/sponsors/:pathname": data.sponsors,
      "/teams/:pathname": data.teams,
      "/learn/:pathname": data.articles,
      "/events/:pathname": data.events,
      "/menu/:pathname": data.contents,
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
          sitemapXML += generateUrlXML(`https://www.glow-leds.com${dynamicUrl}`, value.lastmod);
        });
      } else {
        sitemapXML += generateUrlXML(`https://www.glow-leds.com${url}`);
      }
    });

    sitemapXML += "</urlset>";
    console.log({ path: path.join(__dirname, "../../public/sitemap.xml") });

    fs.writeFileSync(path.join(__dirname, "../../public/sitemap.xml"), sitemapXML);
  } catch (error) {
    console.error("An error occurred while generating the sitemap:", error);
  }
}

generateSitemap();
