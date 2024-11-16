import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useProductBundlesGridPage } from "./useProductBundlesGridPage";
import ProductBundleCard from "./components/ProductBundleCard";
import ProductBundlesGridPageSkeletons from "./components/ProductsGridPageSkeletons";
import ProductBundlesGridPageFilters from "./components/ProductsGridPageFilters";
import { sortOptions } from "../ProductsGridPage/productGridPageHelpers";

const ProductBundlesGridPage = () => {
  const {
    selectedTags,
    selectedAffiliate,
    sort,
    bundles,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleAffiliateChange,
    handleSortChange,
    clearAllFilters,
    allAffiliates,
  } = useProductBundlesGridPage();

  if (isLoading) return <ProductBundlesGridPageSkeletons />;
  if (isError) return <Typography>{"Error loading bundles"}</Typography>;

  return (
    <Box>
      <Helmet>
        <title>{"Product Bundles | Glow LEDs"}</title>
        <meta property="og:title" content="Product Bundles | Glow LEDs" />
        <meta name="twitter:title" content="Product Bundles | Glow LEDs" />
        <link rel="canonical" href="https://www.glow-leds.com/bundles" />
        <meta property="og:url" content="https://www.glow-leds.com/bundles" />
        <meta
          name="description"
          content="Discover curated product bundles from our sponsored glovers. Each bundle is carefully crafted to enhance your gloving experience."
        />
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2}>
          {"Product Bundles"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
          {"Discover curated product collections from our sponsored glovers"}
        </Typography>

        <ProductBundlesGridPageFilters
          selectedTags={selectedTags}
          selectedAffiliate={selectedAffiliate}
          sort={sort}
          allTags={allTags}
          handleTagChange={handleTagChange}
          handleAffiliateChange={handleAffiliateChange}
          handleSortChange={handleSortChange}
          clearAllFilters={clearAllFilters}
          affiliates={allAffiliates}
          sortOptions={sortOptions}
        />

        <Grid container spacing={2}>
          {bundles.length > 0 ? (
            bundles.map((bundle, index) => (
              <Grid item key={bundle._id} xs={12} sm={6} md={4} lg={3}>
                <ProductBundleCard bundle={bundle} affiliate={bundle.affiliate} index={index} />
              </Grid>
            ))
          ) : (
            <>
              <Typography variant="h5" textAlign="center" width="100%" mt={4} gutterBottom>
                {"No bundles found for matching criteria"}
              </Typography>
              <Typography variant="subtitle2" textAlign="center" width="100%">
                {"Try removing some filters to find what you're looking for"}
              </Typography>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductBundlesGridPage;
