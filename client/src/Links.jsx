import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import useWindowDimensions from "./shared/Hooks/windowDimensions";
import { hslToHex } from "./utils/helper_functions";
import { API_Content } from "./utils";
import config from "./config";

const Links = props => {
  const [multiplier, set_multiplier] = useState(0);
  const [content, set_content] = useState([]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      get_display_content();
    }
    return () => (clean = false);
  }, []);

  const get_display_content = async () => {
    const { data } = await API_Content.get_display_content();

    if (data) {
      set_content(data[0]);
      set_multiplier(360 / data[0].links.length);
    }
  };

  const { width, height } = useWindowDimensions();

  let num = -multiplier;
  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
        <meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
        <meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
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
      <div id="profile">
        {/* {width > 600 && (
					<div className="w-100per jc-c">
						<div className=" h-150px w-150px">
							<img
								className="zoom w-100per h-auto"
								src="/images/optimized_images/logo_images/glow_logo_optimized.png"
								alt="Glow LEDs Logo"
								title="Big Logo"
							/>
						</div>
					</div>
				)} */}
        <div className=" jc-c mh-auto ai-c">
          {/* {width < 600 && ( */}
          <a href="https://www.glow-leds.com">
            <div
              className={`${width >= 500 ? "h-125px w-125px" : ""} ${width < 500 && width > 400 ? "h-100px w-100px" : ""} ${
                width <= 400 ? "h-80px w-80px" : ""
              } `}
            >
              <img
                className="zoom w-100per h-auto"
                src="/images/optimized_images/logo_images/glow_logo_optimized.png"
                alt="Glow LEDs Logo"
                title="Small Logo"
              />
            </div>
          </a>
          {/* )} */}
          <a href="https://www.glow-leds.com">
            {/* <div className="pos-rel"> */}
            <div className="row pos-rel">
              <label className={`glow_leds_text_links ${width < 500 && width > 400 ? "fs-50px" : ""} ${width < 500 ? "fs-40px" : ""} `}>
                Glow LEDs
              </label>

              <label className="tm" style={{ color: "#9a9898" }}>
                ™
              </label>
              {/* <label className="make_it_glow_text_links fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px"> */}
              <label
                className={`glow_leds_text_links mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px  ${width > 500 ? "fs-18px" : ""} ${
                  width < 500 && width > 400 ? "fs-16px" : ""
                } ${width < 500 ? "fs-14px" : ""} `}
              >
                Make it Glow
              </label>
            </div>
          </a>
        </div>
      </div>
      <Router>
        <div id="links">
          {content &&
            content.links &&
            content.links.map(link => {
              num += multiplier;
              return link.link && link.link.substring(0, 1) === "/" ? (
                <a
                  className="link special_font"
                  rel="noreferrer"
                  aria-label={link.label}
                  key={link.label}
                  style={{
                    borderColor: hslToHex(num, 100, 100),
                    webkitBoxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`,
                    mozBoxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`,
                    boxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`
                  }}
                  href={`${config.NODE_ENV === "production" ? "https://www.glow-leds.com" : "http://localhost:3000"}${link.link}`}
                >
                  {link.icon && <i className={link.icon} />} {link.label}
                </a>
              ) : (
                <a
                  className="link special_font"
                  rel="noreferrer"
                  aria-label={link.label}
                  key={link.label}
                  style={{
                    borderColor: hslToHex(num, 100, 100),
                    webkitBoxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`,
                    mozBoxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`,
                    boxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`
                  }}
                  href={link.link}
                >
                  {link.icon && <i className={link.icon} />} {link.label}
                </a>
              );
            })}
        </div>
      </Router>
    </div>
  );
};
export default Links;
