import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../shared/Hooks/windowDimensions";
import { GLButton } from "../shared/GlowLEDsComponents";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../api";
import { Box } from "@mui/material";
import { toCapitalize } from "../utils/helper_functions";

const Banner = () => {
  const { width } = useWindowDimensions();

  const contentPage = useSelector(state => state.contents.contentPage);
  const { contents } = contentPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const { environment, database } = placeOrder;

  return (
    <div>
      {(database === "local" || database === "staging") && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          className="banner"
          style={{ backgroundColor: "#ac4545", height: 30 }}
        >
          <div>
            {`------------------------- `}
            {toCapitalize(environment)} Environment {toCapitalize(database)} Database
            {` -------------------------`}
          </div>
        </Box>
      )}
      <div className="banner">
        <div className="max-w-1500px m-auto jc-b">
          {contents.length > 0 && contents[0] && contents[0].banner && (
            <div className={`row ${width < 600 ? "m-auto" : "ml-10px"}`}>
              {contents[0].banner.button && contents[0].banner.link && (
                <Link to={contents[0].banner.link && contents[0].banner.link}>
                  <GLButton className="banner-button">{contents[0].banner.label}</GLButton>
                </Link>
              )}
            </div>
          )}
          {width > 600 && (
            <div className="row mt-3px social_media_banner">
              <div className="ml-10px">
                <a
                  href="https://www.facebook.com/Glow-LEDscom-100365571740684"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook zoom" />
                </a>
              </div>
              <div className="ml-10px">
                <a
                  href="https://www.instagram.com/glow_leds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram zoom" />
                </a>
              </div>
              <div className="ml-10px">
                <a
                  href="https://www.tiktok.com/@glow_leds?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <i className="fab fa-tiktok zoom" />
                </a>
              </div>
              <div className="mh-10px">
                <a
                  href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube"
                >
                  <i className="fab fa-youtube zoom" />
                </a>
              </div>
              <div className="">
                <a
                  href="https://soundcloud.com/ntre/tracks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i className="fab fa-soundcloud" />
                </a>
              </div>
              <div className="mh-10px mr-10px">
                <a
                  href="https://twitter.com/glow_leds"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Soundcloud"
                >
                  <i className="fab fa-twitter zoom" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
