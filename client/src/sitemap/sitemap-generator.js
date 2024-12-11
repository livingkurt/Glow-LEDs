import fs from "fs";
import path from "path";
import process from "process";
import axios from "axios";
import { routes } from "../utils/helpers/routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

function generateUrlJSX(url) {
  return `<li>
    <Link to="${url}">{"${url}"}</Link>
  </li>`;
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
      "/tutorials/:pathname": data.tutorials,
      "/bundles/:pathname": data.bundles,
      "/modes/:pathname": data.modes,
    };

    let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>';
    sitemapXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    let sitemapJSX = `import { Link } from "react-router-dom";
                    import { Helmet } from "react-helmet";
                    import { Container } from "@mui/material";

                    const SitemapPage = () => {
                      return (
                        <Container maxWidth="xl" sx={{ py: 2 }}>
                          <Helmet>
                            <title>{"Sitemap | Glow LEDs"}</title>
                            <meta property="og:title" content="Sitemap" />
                            <meta name="twitter:title" content="Sitemap" />
                            <link rel="canonical" href="https://www.glow-leds.com/sitemap" />
                            <meta property="og:url" content="https://www.glow-leds.com/sitemap" />
                            <meta
                              name="description"
                              content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
                            />
                            <meta
                              property="og:description"
                              content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
                            />
                            <meta
                              name="twitter:description"
                              content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
                            />
                          </Helmet>
                          <div className="inner_content">
                            <h1 style={{ textAlign: "center" }}>{"Glow LEDs Sitemap"}</h1>
                            <div>
                              <ul style={{ listStyle: "none", padding: 0 }}>`;

    routes.forEach(route => {
      let url = route.path;

      // Handle dynamic routes
      if (url.includes(":")) {
        const param = url.split(":")[1];
        const values = paramsConfig[url];

        values?.forEach(value => {
          const dynamicUrl = url.replace(`:${param}`, value.pathname);
          sitemapXML += generateUrlXML(`https://www.glow-leds.com${dynamicUrl}`, value.lastmod);
          sitemapJSX += generateUrlJSX(dynamicUrl);
        });
      } else {
        sitemapXML += generateUrlXML(`https://www.glow-leds.com${url}`);
        sitemapJSX += generateUrlJSX(url);
      }
    });

    sitemapXML += "</urlset>";
    sitemapJSX += `</ul>
                  </div>
                </div>
              </Container>
            );
          };

          export default SitemapPage;
          `;

    fs.writeFileSync(path.join(__dirname, "../../public/sitemap.xml"), sitemapXML);
    fs.writeFileSync(path.join(__dirname, "../pages/SitemapPage/SitemapPage.jsx"), sitemapJSX);
    // Run Prettier on the SitemapPage file
    const prettier = await import("prettier");
    const prettierConfig = await prettier.resolveConfig(process.cwd());

    const formattedSitemapJSX = await prettier.format(sitemapJSX, {
      ...prettierConfig,
      parser: "babel",
    });

    fs.writeFileSync(path.join(__dirname, "../pages/SitemapPage/SitemapPage.jsx"), formattedSitemapJSX);
  } catch (error) {
    console.error("An error occurred while generating the sitemap:", error);
  }
}

generateSitemap();
