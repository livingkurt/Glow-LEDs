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
import DiscoverMoreHero from "./components/DiscoverMoreHero";
import GetTheMost from "./components/GetTheMost.jsx";

const HomePage = () => {
  const {
    slideshow,
    featured_products,
    learn_more_products,
    learn_highlights,
    isLoading,
    discover_more,
    get_more_out_of,
    support_banner,
  } = useHomePage();
  return (
    <Box>
      {!isLoading && (
        <>
          <HomePageHead />
          <HeroHeader slideshow={slideshow} />
          <Container maxWidth="lg">
            <Box pt={{ xs: 2, sm: 4 }} pb={{ xs: 2 }}>
              <FeaturedProducts featured_products={featured_products} />
              <LearnMoreProducts learn_more_products={learn_more_products} />
            </Box>
          </Container>
          <LearnHighlights learn_highlights={learn_highlights} />
          <DiscoverMoreHero discover_more={discover_more} />
          <Container maxWidth="lg">
            <Box my={{ xs: 2, sm: 4 }}>
              <GetTheMost get_more_out_of={get_more_out_of} />
              <ProductProtectionDetails />
              <SupportBanner support_banner={support_banner} />
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};

export default HomePage;
