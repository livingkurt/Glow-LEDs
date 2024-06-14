import { Box, Container } from "@mui/material";
import React from "react";
import HomePageHead from "./components/HomePageHead";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import SupportBanner from "../../shared/SupportBanner/SupportBanner.jsx";
import LearnHighlights from "./components/LearnHighlights";
import HeroHeader from "./components/HeroHeader";
import FeaturedProducts from "./components/FeaturedProducts";
import LearnMoreProducts from "./components/LearnMoreProducts";
import useHomePage from "./useHomePage";
import DiscoverMoreHero from "./components/DiscoverMoreHero";
import GetTheMost from "./components/GetTheMost.jsx";
import HeroVideo from "./components/HeroVideo.jsx";

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
    video,
    featured_products_hidden,
    slideshow_hidden,
    video_hidden,
    learn_more_products_hidden,
  } = useHomePage();
  return (
    <Box>
      {!isLoading && (
        <>
          <HomePageHead />
          <HeroHeader slideshow={slideshow} slideshow_hidden={slideshow_hidden} />

          <Container maxWidth="lg">
            <Box pt={{ xs: 2, sm: 4 }} pb={{ xs: 2 }}>
              <FeaturedProducts
                featured_products={featured_products}
                featured_products_hidden={featured_products_hidden}
              />
            </Box>
          </Container>
          <HeroVideo video={video} video_hidden={video_hidden} />
          <Container maxWidth="lg">
            <Box pt={{ xs: 2, sm: 2 }} pb={{ xs: 2 }}>
              <LearnMoreProducts
                learn_more_products={learn_more_products}
                learn_more_products_hidden={learn_more_products_hidden}
              />
            </Box>
          </Container>
          <LearnHighlights learn_highlights={learn_highlights} />
          <DiscoverMoreHero discover_more={discover_more} />
          <Container maxWidth="lg">
            <Box my={{ xs: 2, sm: 4 }}>
              <GetTheMost get_more_out_of={get_more_out_of} />
              <ProductProtectionDetails />
              <SupportBanner />
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};

export default HomePage;
