import React from "react";
import { Helmet } from "react-helmet";

const AboutPageHeader = () => {
  return (
    <Helmet>
      <title>{"About | Glow LEDs"}</title>
      <meta property="og:title" content="About" />
      <meta name="twitter:title" content="About" />
      <link rel="canonical" href="https://www.glow-leds.com/about" />
      <meta property="og:url" content="https://www.glow-leds.com/about" />
      <meta name="description" content="Learn how Glow LEDs got started and more in our About Page" />
      <meta property="og:description" content="Learn how Glow LEDs got started and more in our About Page" />
      <meta name="twitter:description" content="Learn how Glow LEDs got started and more in our About Page" />
    </Helmet>
  );
};

export default AboutPageHeader;
