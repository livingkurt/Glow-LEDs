import React from "react";
import { Helmet } from "react-helmet";

const HomePageHead = () => {
  return (
    <Helmet>
      <title>{"Glow LEDs | Your Complete Gloving Supply Hub"}</title>
      <meta property="og:title" content="Glow LEDs | Your Complete Gloving Supply Hub" />
      <meta name="twitter:title" content="Glow LEDs | Your Complete Gloving Supply Hub" />
      <link rel="canonical" href="https://www.glow-leds.com/" />
      <meta property="og:url" content="https://www.glow-leds.com" />
      <meta
        name="description"
        content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
      />

      <meta
        property="og:description"
        content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
      />
      <meta
        name="twitter:description"
        content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
      />
      <meta
        property="og:image"
        content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
      />
      <meta
        property="og:image:secure_url"
        content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
      />

      <meta
        name="twitter:image"
        content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
      />
    </Helmet>
  );
};

export default HomePageHead;
