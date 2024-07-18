import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const ProductPageHead = () => {
  const productsPage = useSelector(state => state.products.productsPage);
  const { product } = productsPage;
  const { pathname, images, meta_description, meta_title } = product;

  console.log({ images });

  return (
    <Helmet>
      <title>{meta_title + " | Glow LEDs"}</title>
      <meta property="og:title" content={meta_title} />
      <meta name="twitter:title" content={meta_title} />
      <link rel="canonical" href={`https://www.glow-leds.com/collections/all/products/${pathname}`} />
      <meta property="og:url" content={`https://www.glow-leds.com/collections/all/products/${pathname}`} />

      {images && <meta property="og:image" content={"https://www.glow-leds.com/" + images[0]?.link} />}

      {images && <meta property="og:image:secure_url" content={"https://www.glow-leds.com/" + images[0]?.link} />}
      {images && <meta name="twitter:image" content={"https://www.glow-leds.com/" + images[0]?.link} />}

      <meta
        name="description"
        content={
          meta_description
            ? meta_description
            : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        }
      />

      <meta
        property="og:description"
        content={
          meta_description
            ? meta_description
            : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        }
      />

      <meta
        name="twitter:description"
        content={
          meta_description
            ? meta_description
            : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
        }
      />
    </Helmet>
  );
};

export default ProductPageHead;
