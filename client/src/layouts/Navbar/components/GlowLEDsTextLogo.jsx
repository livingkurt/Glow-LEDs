import React from "react";
import { Link } from "react-router-dom";

const GlowLEDsTextLogo = () => {
  return (
    <div className="logo_text jc-c mh-auto ai-c">
      <Link to="/" aria-label="Home Page">
        <div className="logo_2 h-80px w-80px none" aria-label="Home Page" role="button">
          <img
            className="zoom logo_s"
            src="/images/optimized_images/logo_images/glow_logo_optimized.png"
            alt="Glow LEDs Logo"
            title="Small Logo"
          />
        </div>
      </Link>
      <Link to="/" aria-label="Home Page">
        <div className="row pos-rel">
          <label className="glow_leds_text" data-testid="glow_leds_title">
            Glow LEDs
          </label>

          <label className="tm" style={{ color: "#9a9898" }}>
            ™
          </label>
          <label className="make_it_glow_text fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px">
            Make it Glow
          </label>
        </div>
      </Link>
    </div>
  );
};

export default GlowLEDsTextLogo;
