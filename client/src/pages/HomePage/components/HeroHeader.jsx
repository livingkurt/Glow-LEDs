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
import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroHeader = ({ slideshow }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
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
              <img
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
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h3" gutterBottom>
                  {slide.label}
                </Typography>
                <Typography variant="subtitle1" gutterBottom mb={1}>
                  {slide.fact}
                </Typography>
                <Link to={slide.link}>
                  <Button variant="contained" onClick={() => navigate(slide.link)}>
                    Shop Now
                  </Button>
                </Link>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

HeroHeader.propTypes = {
  slideshow: PropTypes.array,
};

HeroHeader.defaultProps = {
  slideshow: [],
};

export default HeroHeader;
