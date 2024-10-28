import React from "react";
import { Helmet } from "react-helmet";

const ColorPalettePage = () => {
  return (
    <div className="column jc-c">
      <Helmet>
        <title>{"Check Email | Glow LEDs"}</title>
        <meta property="og:title" content="Check Email" />
        <meta name="twitter:title" content="Check Email" />
        <link rel="canonical" href="https://www.glow-leds.com/account/checkemail" />
        <meta property="og:url" content="https://www.glow-leds.com/account/checkemail" />
      </Helmet>
    </div>
  );
};
export default ColorPalettePage;
