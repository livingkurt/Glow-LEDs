import React from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import ProductPageHead from "./components/ProductPageHead";
import { EditProductModal } from "../ProductsPage/components";
import ProductPageLoading from "./components/ProductPageLoading";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import ProductDetails from "./components/ProductDetails";
import HeroVideo from "../HomePage/components/HeroVideo";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { productPageBreadCrumbs } from "./productHelpers";
import { openEditProductModal } from "../ProductsPage/productsPageSlice";
import NavigationButtons from "./components/NavigationButtons";
import ImageGrid from "./components/ImageGrid";
import useProductPage from "./useProductPage";
import HeroImage from "./components/HeroImage";
import HeroFact from "./components/HeroFact";
import LifestyleImageGrid from "./components/LifestyleImages";
import CompareModels from "./components/CompareModels";
import TechSpecs from "./components/TechSpecs";
import InTheBox from "./components/InTheBox";
import ElevateYourExperience from "./components/ElevateYourExperience";
import ProductSupport from "./components/ProductSupport";
import RecentlyViewed from "./components/RecentlyViewed";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { customizedProduct, current_user, my_cart, productPageLoading, product } = useProductPage();

  const { images, currentOptions } = customizedProduct;

  return (
    <Box>
      <ProductPageHead />
      <ProductPageLoading loading={productPageLoading}>
        {product && (
          <>
            <Box display="flex" justifyContent={"space-between"} p={2}>
              <GLBreadcrumbs items={productPageBreadCrumbs(product)} />
              {current_user?.isAdmin && (
                <Box className="br-10px">
                  <GLButtonV2
                    variant="contained"
                    color="secondary"
                    onClick={e => dispatch(openEditProductModal(product))}
                  >
                    Edit Product
                  </GLButtonV2>
                </Box>
              )}
            </Box>
            <ProductDetails
              images={images}
              currentOptions={currentOptions}
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
                <Grid item xs={12} id="features">
                  <ImageGrid image_grid={product?.features?.image_grid_1} />
                </Grid>
                <Grid item xs={12}>
                  <HeroImage image={product?.features?.hero_image_1} />
                </Grid>
                <Grid item xs={12}>
                  <HeroFact heroFact={product?.features?.hero_fact_1} />
                </Grid>
                <Grid item xs={12}>
                  <ImageGrid image_grid={product?.features?.image_grid_2} />
                </Grid>
                <Grid item xs={12}>
                  <HeroFact heroFact={product?.features?.hero_fact_2} />
                </Grid>
                <Grid item xs={12}>
                  <LifestyleImageGrid lifestyleImages={product?.features?.lifestyle_images} />
                </Grid>
                <Grid item xs={12}>
                  <CompareModels notSure={product?.not_sure} />
                </Grid>
                <Grid item xs={12} id="tech-specs">
                  <TechSpecs tech_specs={product?.tech_specs} />
                </Grid>
                <Grid item xs={12}>
                  <InTheBox in_the_box={product?.in_the_box} />
                </Grid>
                <Grid item xs={12}>
                  <ElevateYourExperience elevateYourExperience={product.elevate_your_experience} />
                </Grid>
                <Grid item xs={12} id="support">
                  <ProductSupport productSupport={product.product_support} />
                </Grid>
                <Grid item xs={12}>
                  <SupportBanner />
                </Grid>
                <Grid item xs={12}>
                  <RecentlyViewed />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </ProductPageLoading>

      <EditProductModal />
    </Box>
  );
};

export default ProductPage;
