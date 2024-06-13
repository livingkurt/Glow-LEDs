import { Box, Container } from "@mui/material";
import React from "react";
import HomePageHead from "./components/HomePageHead";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import SupportBanner from "./components/SupportBanner";
import LearnHighlights from "./components/LearnHighlights";
import HeroHeader from "./components/HeroHeader";
import FeaturedProducts from "./components/FeaturedProducts";
import LearnMoreProducts from "./components/LearnMoreProducts";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const { slideshow, featured_products, learn_more_products, learn_highlights, isLoading } = useHomePage();

  return (
    <Box>
      {!isLoading && (
        <>
          <HomePageHead />
          <HeroHeader slideshow={slideshow} />
          <Container style={{ maxWidth: "1600px", padding: "40px" }}>
            <FeaturedProducts featured_products={featured_products} />
            <LearnMoreProducts learn_more_products={learn_more_products} />
          </Container>
          <LearnHighlights learn_highlights={learn_highlights} />
          <Container style={{ maxWidth: "1600px", padding: "20px" }}>
            <Box my={2}>
              <ProductProtectionDetails />
            </Box>
            <SupportBanner />
          </Container>
        </>
      )}
    </Box>
  );
};

export default HomePage;
