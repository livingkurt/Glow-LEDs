import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import { Navigation, Pagination, A11y, EffectFade, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const HeroHeader = ({ slideshow, slideshow_hidden }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return !slideshow_hidden ? (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
        }}
        style={{
          "--swiper-navigation-color": "#ffffff50",
          "--swiper-pagination-color": "#ffffff50",
          "--swiper-scrollbar-color": "#ffffff50",
          position: "relative",
          width: "100%",
          height: "auto",
          zIndex: 0,
        }}
        effect="fade"
        modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
        allowTouchMove={false}
        fadeEffect={{
          crossFade: true,
        }}
      >
        {slideshow?.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: "relative" }}>
              <GLLazyImage
                src={slide.image?.link}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: isMobile ? "9/16" : "16/9",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: "#fff",
                  padding: isMobile ? "30px 20px" : "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left", // Ensure text is always left-aligned
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)", // Add a gradient background for better text visibility
                }}
              >
                <Typography
                  variant={isMobile ? "h5" : "h3"}
                  gutterBottom
                  sx={{
                    mb: 1,
                  }}
                >
                  {slide.label}
                </Typography>
                <Typography
                  variant={isMobile ? "body2" : "subtitle1"}
                  gutterBottom
                  sx={{
                    mb: 2,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    maxWidth: "80%", // Limit the width of the fact text
                  }}
                >
                  {slide.fact}
                </Typography>
                <Link to={slide.link} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(slide.link)}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    {slide.button_text || "Shop Now"}
                  </Button>
                </Link>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  ) : null;
};

HeroHeader.propTypes = {
  slideshow: PropTypes.array,
  slideshow_hidden: PropTypes.bool,
};

HeroHeader.defaultProps = {
  slideshow: [],
  slideshow_hidden: false,
};

export default HeroHeader;
