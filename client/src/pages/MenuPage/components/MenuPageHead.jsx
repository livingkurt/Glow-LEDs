import React from "react";
import { Helmet } from "react-helmet";

const MenuPageHead = ({ name }) => {
  return (
    <Helmet>
      <title>
        {name}
        {" | Glow LEDs"}
      </title>
      <meta property="og:title" content={`${name}| Glow LEDs`} />
      <meta name="twitter:title" content={`${name}| Glow LEDs`} />
      <link rel="canonical" href="https://www.glow-leds.com/featured" />
      <meta property="og:url" content="https://www.glow-leds.com/featured" />
      <meta
        name="description"
        content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
      />
      <meta
        property="og:description"
        content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
      />
      <meta
        name="twitter:description"
        content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
      />
    </Helmet>
  );
};

export default MenuPageHead;
