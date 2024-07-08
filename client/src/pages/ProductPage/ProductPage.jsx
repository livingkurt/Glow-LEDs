import React from "react";
import { Box, Container, Grid, Rating, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ProductPageHead from "./components/ProductPageHead";
import { EditProductModal } from "../ProductsPage/components";
import ProductPageLoading from "./components/ProductPageLoading";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import HeroVideo from "../HomePage/components/HeroVideo";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { determineInStock, isOptionCountDifferent, productPageBreadCrumbs } from "./productHelpers";
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
import * as API from "../../api";
import ProductImages from "./components/ProductImages";
import CustomizationOption from "./components/CustomizationOption";
import { setQuantity } from "./productPageSlice";
import GLSelect from "../../shared/GlowLEDsComponents/GLSelect/GLSelect";

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
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <ProductImages images={images} />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography variant="h4" gutterBottom sx={{ typography: { sm: "h4", xs: "h5" } }}>
                    {product.name}
                  </Typography>

                  {/* Rating and Reviews */}
                  {product.numReviews > 0 && (
                    <Box display="flex" alignItems="center" mb={2}>
                      <Rating value={product.rating} precision={0.5} readOnly />
                      <Typography variant="body2" ml={1}>
                        ({product.numReviews} reviews)
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="subtitle1" gutterBottom mt={2} mb={2}>
                    {product.fact}
                  </Typography>
                  <Typography variant="h6" gutterBottom mt={2} mb={2} sx={{ typography: { sm: "h5", xs: "h6" } }}>
                    Price: ${product.price}
                  </Typography>
                  {currentOptions?.map((option, index) => (
                    <CustomizationOption
                      key={index}
                      index={index}
                      option={option}
                      selectedOption={customizedProduct?.selectedOptions[index]}
                    />
                  ))}

                  <GLSelect
                    label="Quantity"
                    value={customizedProduct?.quantity}
                    onChange={e => dispatch(setQuantity(e.target.value))}
                    placeholder="Select Quantity"
                    size="small"
                    options={[...Array(customizedProduct.max_quantity).keys()].map(value => ({ name: value + 1 }))}
                    getOptionLabel={option => option.name}
                    valueKey="name"
                    fullWidth
                  />
                  <Box mt={2}>
                    <GLButtonV2
                      variant="contained"
                      color="primary"
                      fullWidth
                      className="bob"
                      sx={{
                        fontSize: "1.6rem",
                        padding: 2,
                      }}
                      size="large"
                      onClick={() => {
                        dispatch(API.addToCart({ cart: my_cart, cartItem: customizedProduct, type: "add_to_cart" }));
                      }}
                      tooltip={
                        isOptionCountDifferent(product, customizedProduct) &&
                        "You must select all options to Add To Cart"
                      }
                      disabled={isOptionCountDifferent(product, customizedProduct)}
                    >
                      {determineInStock(customizedProduct)}
                    </GLButtonV2>
                  </Box>
                </Grid>
              </Grid>
            </Container>
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
                  <Container maxWidth="xl">
                    <ImageGrid image_grid={product?.features?.image_grid_1} />
                  </Container>
                </Grid>
                <Grid item xs={12}>
                  <HeroImage image={product?.features?.hero_image_1} />
                </Grid>
              </Grid>
              <Container maxWidth="xl">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <HeroFact heroFact={product?.features?.hero_fact_1} />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageGrid image_grid={product?.features?.image_grid_2} />
                  </Grid>
                  <Grid item xs={12}>
                    <HeroFact heroFact={product?.features?.hero_fact_2} />
                  </Grid>
                </Grid>
              </Container>
              <Container maxWidth="xl">
                <Grid container spacing={2}>
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
              </Container>
            </Box>
          </>
        )}
      </ProductPageLoading>

      <EditProductModal />
    </Box>
  );
};

export default ProductPage;
