import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductPageHead from "./components/ProductPageHead";
import { EditProductModal } from "../ProductsPage/components";

import { detailsProductPage } from "./productPageSlice";
import ProductPageLoading from "./components/ProductPageLoading";
import { useParams } from "react-router-dom";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import ProductDetails from "./components/ProductDetails";
import HeroVideo from "../HomePage/components/HeroVideo";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { productPageBreadCrumbs } from "./productHelpers";
import { openEditProductModal } from "../ProductsPage/productsPageSlice";
import NavigationButtons from "./components/NavigationButtons";

const ProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProductPage({ pathname: params.pathname }));
  }, [dispatch, params.pathname]);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const productPage = useSelector(state => state.products.productPage);
  const { customizedProduct, product, productPageLoading } = productPage;

  const { name, numReviews, rating, category, subcategory, pathname, facts, price, images, currentOptions } =
    customizedProduct;

  return (
    <Box>
      <ProductPageHead />
      <ProductPageLoading loading={productPageLoading}>
        <Box display="flex" justifyContent={"space-between"} p={2}>
          <GLBreadcrumbs items={productPageBreadCrumbs(product)} />
          {current_user?.isAdmin && (
            <Box className="br-10px">
              <GLButtonV2 variant="contained" color="secondary" onClick={e => dispatch(openEditProductModal(product))}>
                Edit Product
              </GLButtonV2>
            </Box>
          )}
        </Box>
        <ProductDetails
          images={images}
          name={name}
          numReviews={numReviews}
          rating={rating}
          category={category}
          subcategory={subcategory}
          pathname={pathname}
          facts={facts}
          currentOptions={currentOptions}
          price={price}
          customizedProduct={customizedProduct}
          product={product}
          my_cart={my_cart}
        />
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NavigationButtons />
            </Grid>
            <Grid item xs={12}>
              <HeroVideo video={product.video} video_hidden={!!product.video} />
            </Grid>
            <Grid item xs={12}>
              <ProductProtectionDetails />
            </Grid>
            <Grid item xs={12}>
              {/* Image Grid 1*/}
            </Grid>
            <Grid item xs={12}>
              {/* Hero Image 1*/}
            </Grid>
            <Grid item xs={12}>
              {/* Hero Fact 1*/}
            </Grid>
            <Grid item xs={12}>
              {/* Image Grid 2*/}
            </Grid>
            <Grid item xs={12}>
              {/* Hero Fact 2*/}
            </Grid>
            <Grid item xs={12}>
              {/* Lifestyle Image Grid */}
            </Grid>
            <Grid item xs={12}>
              {/* Compare Models */}
            </Grid>
            <Grid item xs={12}>
              {/* Tech Specs */}
            </Grid>
            <Grid item xs={12}>
              {/* In The Box */}
            </Grid>
            <Grid item xs={12}>
              {/* Elevate Your Experience */}
            </Grid>
            <Grid item xs={12}>
              {/* Product Support */}
            </Grid>

            <Grid item xs={12}>
              <SupportBanner />
            </Grid>
            <Grid item xs={12}>
              {/* Recently Viewed */}
            </Grid>
          </Grid>
        </Box>
      </ProductPageLoading>

      <EditProductModal />
    </Box>
  );
};

export default ProductPage;
