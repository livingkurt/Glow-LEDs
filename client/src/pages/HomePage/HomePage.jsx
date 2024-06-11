import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Container } from "@mui/material";
import { styled } from "@mui/system";
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

const StyledSwiper = styled(Swiper)({
  width: "100%",
  height: "auto",
  zIndex: 0, // Add this line to set the z-index
});

const SlideImage = styled("img")({
  width: "100%",
  height: "auto",
  aspectRatio: "16/9", // Adjust the aspect ratio as needed
  objectFit: "cover",
});

const FeaturedProductCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "20px",
  padding: "20px",
  color: "white",
  backgroundColor: "transparent",
});

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const wrapperRef = useRef(null);

  const contentPage = useSelector(state => state.contents.contentPage);
  const { contents } = contentPage;
  const productsPage = useSelector(state => state.products.productsPage);
  const { ourPickProducts } = productsPage;

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

  useEffect(() => {
    dispatch(API.getOurPicksProducts());
  }, []);

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
        <StyledSwiper
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
            zIndex: 1,
          }}
          effect="fade"
          modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
          allowTouchMove={false}
          fadeEffect={{
            crossFade: true,
          }}
        >
          {contents[0]?.home_page?.slideshow.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ position: "relative" }}>
                <SlideImage src={slide.image} alt={`Slide ${index + 1}`} />
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
                  <Link to={slide.link}>
                    <Button variant="contained" onClick={() => navigate(slide.link)}>
                      Shop Now
                    </Button>
                  </Link>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </StyledSwiper>
        {/* <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Innovators of Gloving and Flow Art Technology
          </Typography>
        </Box> */}
      </Box>
      <Container style={{ maxWidth: "1600px", padding: "40px" }}>
        <Typography variant="h4" component="h2" align="left" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {ourPickProducts?.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <FeaturedProductCard elevation={5}>
                <CardMedia
                  component="img"
                  image={product.images_object[0]?.link}
                  alt={product.name}
                  sx={{ borderRadius: "20px" }}
                />
                <CardContent sx={{ width: "100%", padding: "0px", paddingTop: 5 }}>
                  <Typography variant="subtitle2" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2">${product.price.toFixed(2)}</Typography>
                  <Button variant="contained" sx={{ marginTop: "10px" }}>
                    Add To Cart
                  </Button>
                </CardContent>
              </FeaturedProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ padding: "40px" }}>
        <Typography variant="body1" align="center" sx={{ marginBottom: "20px" }}>
          Here at Glow LEDs we aim to be the biggest innovators in the gloving industry.
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: "20px" }}>
          Some of our most popular inventions include EXO Diffusers, Decals, Diffuser Caps and Glowskinz! We've even put
          our own spin on gloves and batteries! Plus we're one of the few places where you can order Custom gloving
          accessories.
        </Typography>
        <Typography variant="body1" align="center">
          We are ran by a very small team of people who are dedicated to listening to the community and creating what's
          most wanted. Our products are made by hand to order, so every order is made with love.
        </Typography>
      </Box>

      {/* Sections for other homepage content */}
    </Box>
  );
};

export default HomePage;
