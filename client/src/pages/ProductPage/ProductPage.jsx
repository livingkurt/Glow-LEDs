import React, { useState } from "react";
import { Box, Container, FormHelperText, Grid, Rating, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ProductPageHead from "./components/ProductPageHead";
import { EditProductModal } from "../ProductsPage/components";
import ProductPageLoading from "./components/ProductPageLoading";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import HeroVideo from "../HomePage/components/HeroVideo";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { determineInStock, productPageBreadCrumbs } from "./productHelpers";
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
import CompatibleChips from "./components/CompatibleChips";
import ContributorsDisplay from "./components/ContributorsDisplay";
import { sale_price_switch } from "../../utils/react_helper_functions";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { customizedProduct, current_user, my_cart, productPageLoading, product, isAddonChecked } = useProductPage();
  const [validationErrors, setValidationErrors] = useState({});

  const validateOptions = () => {
    const errors = {};
    customizedProduct.currentOptions?.forEach((option, index) => {
      if (!option.isAddOn && !customizedProduct.selectedOptions[index]?.name) {
        errors[index] = `Please select a ${option.name}`;
      } else if (option.isAddOn && isAddonChecked && !customizedProduct.selectedOptions[index]?.name) {
        errors[index] = `Please select an option for ${option.name}`;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddToCart = () => {
    if (validateOptions()) {
      dispatch(API.addToCart({ cart: my_cart, cartItem: customizedProduct, type: "add_to_cart" }));
    }
  };

  const updateValidationError = (index, error) => {
    setValidationErrors(prev => ({
      ...prev,
      [index]: error,
    }));
  };

  return (
    <Box>
      <ProductPageHead product={product} />
      <ProductPageLoading loading={productPageLoading}>
        {product && (
          <>
            <Box display="flex" justifyContent={"space-between"} p={2}>
              <GLBreadcrumbs
                items={
                  current_user.isWholesaler
                    ? productPageBreadCrumbs(product)
                    : productPageBreadCrumbs(product).filter(item => item.name !== "WHOLESALE")
                }
              />
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
                  <ProductImages
                    images={customizedProduct?.images}
                    originalImages={customizedProduct?.original_images}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography variant="h4" gutterBottom sx={{ typography: { sm: "h4", xs: "h5" } }}>
                    {product.name}
                  </Typography>

                  {product.numReviews > 0 && (
                    <Box display="flex" alignItems="center" mb={2}>
                      <Rating value={product.rating} precision={0.5} readOnly />
                      <Typography variant="body2" ml={1}>
                        ({product.numReviews} reviews)
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="body1" gutterBottom mt={2} mb={2}>
                    {customizedProduct.fact}
                  </Typography>
                  <Typography variant="h6" gutterBottom mt={2} mb={2} sx={{ typography: { sm: "h5", xs: "h6" } }}>
                    Price:{" "}
                    {sale_price_switch({
                      product: customizedProduct,
                      cartItem: false,
                      background: "dark",
                      isWholesaler: current_user?.isWholesaler,
                    })}
                  </Typography>
                  <Typography variant="body1" gutterBottom mt={2} mb={2}>
                    {customizedProduct.short_description}
                  </Typography>
                  <CompatibleChips chips={customizedProduct.chips} />
                  {customizedProduct.currentOptions?.map((option, index) => (
                    <Box key={index}>
                      <CustomizationOption
                        index={index}
                        option={option}
                        selectedOption={customizedProduct?.selectedOptions[index]}
                        updateValidationError={updateValidationError}
                      />
                      {validationErrors[index] && (
                        <FormHelperText>
                          <Box
                            sx={{
                              display: "inline-block",
                              bgcolor: "#8c444b",
                              py: 1,
                              px: 1.5,
                              borderRadius: "10px",
                              color: "white",
                            }}
                          >
                            <Typography variant="subtitle2" fontWeight={800}>
                              {validationErrors[index]}
                            </Typography>
                          </Box>
                        </FormHelperText>
                      )}
                    </Box>
                  ))}
                  <Typography variant="subtitle1">Quantity</Typography>
                  <GLSelect
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
                      className={product.count_in_stock > 0 ? "bob" : ""}
                      sx={{
                        fontSize: "1.6rem",
                        padding: 2,
                      }}
                      size="large"
                      onClick={handleAddToCart}
                      disabled={product.count_in_stock <= 0}
                    >
                      {determineInStock(customizedProduct)}
                    </GLButtonV2>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            <Box mt={4}>
              <Grid container spacing={2}>
                {!product.navigation_buttons_hidden && (
                  <Grid item xs={12}>
                    <NavigationButtons />
                  </Grid>
                )}
                {!product?.hero_video?.hidden && product?.hero_video?.video && (
                  <Grid item xs={12} mt={-2}>
                    <HeroVideo video={product?.hero_video?.video} video_hidden={product?.hero_video?.hidden} />
                  </Grid>
                )}
                <Grid item xs={12} mt={!product?.hero_video?.hidden && product?.hero_video?.video ? -4 : 0}>
                  <ProductProtectionDetails transparent={false} />
                </Grid>
                {!product?.features?.image_grid_1_hidden && product?.features?.image_grid_1.length > 0 && (
                  <Grid item xs={12} id="features">
                    <Container maxWidth="xl">
                      <ImageGrid
                        image_grid={product?.features?.image_grid_1}
                        image_grid_hidden={product?.features?.image_grid_1_hidden}
                      />
                    </Container>
                  </Grid>
                )}
                {product?.features?.hero_image_1 && (
                  <Grid item xs={12}>
                    <HeroImage image={product?.features?.hero_image_1} />
                  </Grid>
                )}
              </Grid>
              <Container maxWidth="xl">
                <Grid container spacing={2}>
                  {product?.features?.hero_fact_1 && (
                    <Grid item xs={12} mt={2}>
                      <HeroFact heroFact={product?.features?.hero_fact_1} />
                    </Grid>
                  )}
                  {!product?.features?.image_grid_2_hidden && product?.features?.image_grid_2.length > 0 && (
                    <Grid item xs={12}>
                      <ImageGrid
                        image_grid={product?.features?.image_grid_2}
                        image_grid_hidden={product?.features?.image_grid_2_hidden}
                      />
                    </Grid>
                  )}
                  {product?.features?.hero_fact_2 && (
                    <Grid item xs={12}>
                      <HeroFact heroFact={product?.features?.hero_fact_2} />
                    </Grid>
                  )}
                </Grid>
              </Container>
              <Container maxWidth="xl">
                <Grid container spacing={2}>
                  {product?.features?.lifestyle_images.length > 0 && !product?.features?.lifestyle_images_hidden && (
                    <Grid item xs={12} mt={2}>
                      <LifestyleImageGrid lifestyleImages={product?.features?.lifestyle_images} />
                    </Grid>
                  )}
                  {product?.not_sure && !product?.not_sure.hidden && (
                    <Grid item xs={12}>
                      <CompareModels notSure={product?.not_sure} />
                    </Grid>
                  )}
                  {product?.tech_specs && !product?.tech_specs.hidden && (
                    <Grid item xs={12} id="tech-specs">
                      <TechSpecs tech_specs={product?.tech_specs} />
                    </Grid>
                  )}
                  {product?.in_the_box && !product?.in_the_box.hidden && (
                    <Grid item xs={12}>
                      <InTheBox in_the_box={product?.in_the_box} />
                    </Grid>
                  )}
                  {product?.elevate_your_experience && !product?.elevate_your_experience.hidden && (
                    <Grid item xs={12}>
                      <ElevateYourExperience elevateYourExperience={product.elevate_your_experience} />
                    </Grid>
                  )}
                  {product?.product_support && !product?.product_support.hidden && (
                    <Grid item xs={12} id="support">
                      <ProductSupport productSupport={product.product_support} />
                    </Grid>
                  )}
                  {product?.contributors?.length > 0 && (
                    <Grid item xs={12}>
                      <ContributorsDisplay contributors={product.contributors} />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <SupportBanner />
                  </Grid>
                  <Grid item xs={12}>
                    <RecentlyViewed currentProduct={product} />
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
