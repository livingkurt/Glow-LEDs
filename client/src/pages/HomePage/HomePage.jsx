import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Container } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { setDisplay } from "../../slices/glowLedsSlice";
import { openLoginModal } from "../../slices/userSlice";
import { showSuccess } from "../../slices/snackbarSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import * as API from "../../api";
import HomePageHead from "./components/HomePageHead";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import { Navigation, Pagination, A11y, EffectFade, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import SupportBanner from "./components/SupportBanner";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: currentContent } = API.useCurrentContentQuery();

  const [searchParams] = useSearchParams();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const register = searchParams.get("register");
    const login = searchParams.get("login");
    if (register === "true") {
      dispatch(openLoginModal({ register: true }));
    } else if (login === "true") {
      dispatch(openLoginModal());
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      sessionStorage.setItem("promo_code", code);
      dispatch(showSuccess({ message: `Code ${code} Added to Checkout` }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      dispatch(setDisplay(false));
    }
  };

  return (
    <Box>
      <HomePageHead />

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
          {currentContent?.home_page?.slideshow?.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ position: "relative" }}>
                <img
                  src={slide.image?.link}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16/9",
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
                  <Typography variant="subtitle1" gutterBottom>
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
      <Container style={{ maxWidth: "1600px", padding: "40px" }}>
        <Typography variant="h4" component="h2" align="left" gutterBottom>
          Featured Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            minWidth: "100%", // Add this line to make the section fill the entire space
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            },
          }}
        >
          {currentContent?.home_page?.featured_products?.map(product => (
            <Box
              key={product.id}
              sx={{
                minWidth: "365px",
                maxWidth: "300px",
                marginRight: "20px",
                "&:last-child": {
                  marginRight: 0,
                },
              }}
            >
              <Card
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "20px",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                <CardMedia
                  component="img"
                  image={product?.images_object[0]?.link}
                  alt={product.name}
                  sx={{ borderRadius: "20px" }}
                />
                <CardContent sx={{ width: "100%", padding: "10px" }}>
                  <Typography variant="subtitle2" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">${product?.price?.toFixed(2)}</Typography>
                  <Button variant="contained" sx={{ marginTop: "10px" }}>
                    Add To Cart
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
        <Box my={2}>
          <ProductProtectionDetails />
        </Box>
      </Container>
      <img
        alt="Kurt"
        title="Founder Picture"
        style={{
          width: "100%",
          height: "auto",
        }}
        src="https://thumbs2.imgbox.com/74/18/uf9lTIoK_t.jpeg"
      />
      <SupportBanner />
    </Box>
  );
};

export default HomePage;
