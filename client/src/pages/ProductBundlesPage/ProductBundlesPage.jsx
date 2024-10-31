import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Box, Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import * as API from "../../api";
import CartItemCard from "../SponsorPage/components/CartItemCard";
import { useAffiliatesQuery } from "../../api/allRecordsApi";
import ProductBundles from "../SponsorPage/components/ProductBundles";

const ProductBundlesPage = () => {
  const affiliateQuery = useAffiliatesQuery();
  console.log({ affiliateQuery });

  const allBundles = affiliateQuery.isLoading
    ? []
    : affiliateQuery.data
        .filter(affiliate => affiliate.product_bundles && affiliate.product_bundles.length > 0)
        .filter(affiliate => affiliate.sponsor)
        .filter(affiliate => affiliate.active)
        .flatMap(affiliate =>
          affiliate.product_bundles
            .filter(bundle => bundle.cart && bundle.cart.cartItems.length > 0)
            .map(bundle => ({
              ...bundle,
              affiliate,
            }))
        );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
        <meta
          property="og:description"
          content="Discover curated product bundles from our sponsored glovers. Each bundle is carefully crafted to enhance your gloving experience."
        />
        <meta
          name="twitter:description"
          content="Discover curated product bundles from our sponsored glovers. Each bundle is carefully crafted to enhance your gloving experience."
        />
      </Helmet>

      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {"Product Bundles"}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 4 }}>
        {"Discover curated product collections from our sponsored glovers"}
      </Typography>

      {allBundles.map(bundle => (
        <ProductBundles affiliate={bundle.affiliate} key={bundle._id} />
      ))}
    </Container>
  );
};

export default ProductBundlesPage;
