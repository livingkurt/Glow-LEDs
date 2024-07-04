import React from "react";
import { Helmet } from "react-helmet";

const FAQPageHead = () => {
  return (
    <Helmet>
      <title>Frequently Asked Questions | Glow LEDs</title>
      <meta property="og:title" content="Frequently Asked Questions" />
      <meta name="twitter:title" content="Frequently Asked Questions" />
      <link rel="canonical" href="https://www.glow-leds.com/pages/faq" />
      <meta property="og:url" content="https://www.glow-leds.com/pages/faq" />
      <meta
        name="description"
        content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
      />
      <meta
        property="og:description"
        content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
      />
      <meta
        name="twitter:description"
        content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
      />
    </Helmet>
  );
};

export default FAQPageHead;
