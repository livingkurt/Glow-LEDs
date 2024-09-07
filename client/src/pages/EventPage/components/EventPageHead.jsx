import React from "react";
import { Helmet } from "react-helmet";

const EventPageHead = ({ product }) => {
  const { pathname, images, seo } = product;

  return (
    <Helmet>
      <title>{seo?.meta_title + " | Glow LEDs"}</title>
      <meta property="og:title" content={seo?.meta_title} />
      <meta name="twitter:title" content={seo?.meta_title} />
      <link rel="canonical" href={`https://www.glow-leds.com/collections/all/products/${pathname}`} />
      <meta property="og:url" content={`https://www.glow-leds.com/collections/all/products/${pathname}`} />

      {images && <meta property="og:image" content={"https://www.glow-leds.com/" + images[0]?.link} />}

      {images && <meta property="og:image:secure_url" content={"https://www.glow-leds.com/" + images[0]?.link} />}
      {images && <meta name="twitter:image" content={"https://www.glow-leds.com/" + images[0]?.link} />}

      <meta
        name="description"
        content={
          seo?.meta_description
            ? seo?.meta_description
            : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        }
      />

      <meta
        property="og:description"
        content={
          seo?.meta_description
            ? seo?.meta_description
            : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        }
      />

      <meta
        name="twitter:description"
        content={
          seo?.meta_description
            ? seo?.meta_description
            : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        }
      />
      <meta name="keywords" content={seo?.meta_keywords}></meta>
    </Helmet>
  );
};

export default EventPageHead;
