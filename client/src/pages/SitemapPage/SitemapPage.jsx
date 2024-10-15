import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";
import { useSitemapQuery } from "../../api/allRecordsApi";

const SitemapPage = () => {
  const { data: sitemap, isLoading } = useSitemapQuery();
  console.log({ sitemap });

  const staticPages = [
    { path: "/", title: "Home" },
    { path: "/account/change_password", title: "Change Password" },
    { path: "/account/password_reset", title: "Password Reset" },
    { path: "/account/reset_password", title: "Reset Password" },
    { path: "/checkout/place_order", title: "Place Order" },
    { path: "/checkout/cart", title: "Cart" },
    { path: "/products", title: "All Products" },
    { path: "/sponsors", title: "Sponsors" },
    { path: "/teams", title: "Teams" },
    { path: "/learn", title: "Learn" },
    { path: "/academy", title: "Academy" },
    { path: "/support_center", title: "Support Center" },
    { path: "/terms", title: "Terms and Conditions" },
    { path: "/about", title: "About" },
    { path: "/sitemap", title: "Sitemap" },
    { path: "/palettes", title: "Palettes" },
  ];

  const renderLinks = links => (
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.path}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Sitemap | Glow LEDs</title>
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
        <h1 style={{ textAlign: "center" }}>Glow LEDs Sitemap</h1>
        <div className="wrap jc-b">
          <div>
            <h2 style={{ textAlign: "left" }}>Main Pages</h2>
            {renderLinks(staticPages)}
          </div>

          <div>
            <h2 style={{ textAlign: "left" }}>Products</h2>
            {sitemap.products && (
              <ul className="products_list">
                {sitemap.products.map(product => (
                  <li key={product._id}>
                    <Link to={`/products/${product.pathname}`}>{product.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 style={{ textAlign: "left" }}>Sponsors</h2>
            {sitemap.affiliates &&
              renderLinks(
                sitemap.affiliates.map(sponsor => ({ path: `/sponsors/${sponsor.pathname}`, title: sponsor.name }))
              )}
          </div>

          <div>
            <h2 style={{ textAlign: "left" }}>Teams</h2>
            {sitemap.teams &&
              renderLinks(sitemap.teams.map(team => ({ path: `/teams/${team.pathname}`, title: team.name })))}
          </div>

          <div>
            <h2 style={{ textAlign: "left" }}>Learn</h2>
            {sitemap.articles &&
              renderLinks(
                sitemap.articles.map(article => ({ path: `/learn/${article.pathname}`, title: article.name }))
              )}
          </div>

          <div>
            <h2 style={{ textAlign: "left" }}>Tutorials</h2>
            {sitemap.tutorials &&
              renderLinks(
                sitemap.tutorials.map(tutorial => ({ path: `/tutorials/${tutorial.pathname}`, title: tutorial.name }))
              )}
          </div>

          <div>
            <h2 style={{ textAlign: "left" }}>Events</h2>
            {sitemap.events &&
              renderLinks(sitemap.events.map(event => ({ path: `/events/${event.pathname}`, title: event.name })))}
          </div>

          <div>
            <h2 style={{ textAlign: "left" }}>Menu</h2>
            {sitemap.currentContent &&
              renderLinks(
                sitemap.currentContent.menus.map(content => ({
                  path: `/menu/${content.pathname}`,
                  title: content.name,
                }))
              )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SitemapPage;
