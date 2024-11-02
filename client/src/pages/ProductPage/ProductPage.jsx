import React, { useEffect, useState } from "react";
import { Box, Container, FormHelperText, Grid, Rating, Typography, useTheme } from "@mui/material";
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
import IconFeatures from "./components/IconFeatures";
import LineBreak from "./components/LineBreak";
import { formatDate } from "../../utils/helpers/universal_helpers";
import PasswordPromptModal from "./components/PasswordPromptModal";

const ProductPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { customizedProduct, current_user, my_cart, productPageLoading, product, isAddonChecked, isPasswordProtected } =
    useProductPage();
  const [validationErrors, setValidationErrors] = useState({});
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(isPasswordProtected);

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
      dispatch(API.addToCart({ cart: my_cart, cartItems: [customizedProduct], type: "add_to_cart" }));
    }
  };

  const updateValidationError = (index, error) => {
    setValidationErrors(prev => ({
      ...prev,
      [index]: error,
    }));
  };

  useEffect(() => {
    if (product && product.isPasswordProtected) {
      setShowPasswordPrompt(true);
    } else {
      setShowPasswordPrompt(false);
    }
  }, [product]);

  if (showPasswordPrompt) {
    return (
      <PasswordPromptModal productId={product._id} onUnlock={() => setShowPasswordPrompt(false)} product={product} />
    );
  }

  return (
    <Box>
      <ProductPageHead product={product} />
      <ProductPageLoading loading={productPageLoading}>
        {product && (
          <>
            <Box display="flex" justifyContent="space-between" p={2}>
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
                    {"Edit Product"}
                  </GLButtonV2>
                </Box>
              )}
            </Box>
            <Container maxWidth="xl" sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <ProductImages
                    images={customizedProduct?.images}
                    originalImages={customizedProduct?.original_images}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4" gutterBottom sx={{ typography: { sm: "h4", xs: "h5" } }}>
                      {product.name}
                    </Typography>
                    {customizedProduct.isPreOrder && (
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          ml: 1,
                          bgcolor: product.primary_color || theme.palette.primary.main,
                          px: 1,
                          py: 0.5,
                          mb: 1,
                          borderRadius: 1,
                          fontSize: "1.2rem",
                          fontWeight: 800,
                          color: theme.palette.getContrastText(product?.primary_color || theme.palette.primary.main),
                        }}
                      >
                        {"New In"}
                      </Typography>
                    )}
                  </Box>
                  {product.numReviews > 0 && (
                    <Box display="flex" alignItems="center" mb={2}>
                      <Rating value={product.rating} precision={0.5} readOnly />
                      <Typography variant="body2" ml={1}>
                        {"("}
                        {product.numReviews} {"reviews)"}
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="body1" gutterBottom mt={2} mb={2}>
                    {customizedProduct.fact}
                  </Typography>
                  <Typography variant="h6" gutterBottom mt={2} mb={2} sx={{ typography: { sm: "h5", xs: "h6" } }}>
                    {"Price:"}{" "}
                    {sale_price_switch({
                      product: customizedProduct,
                      cartItem: false,
                      background: "dark",
                      isWholesaler: current_user?.isWholesaler,
                    })}
                    {customizedProduct.isPreOrder && (
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          ml: 1,
                          bgcolor: theme.palette.primary.main,
                          px: 0.5,
                          py: 0.5,
                          fontSize: "1.2rem",
                          borderRadius: 1,
                          fontWeight: 800,
                          color: theme.palette.getContrastText(theme.palette.primary.main),
                        }}
                      >
                        {"Pre-Order"}
                      </Typography>
                    )}
                  </Typography>

                  {customizedProduct.isPreOrder && (
                    <Typography variant="body2" gutterBottom mt={1} mb={2}>
                      {"Estimated Availability: "}
                      {formatDate(customizedProduct.preOrderReleaseDate)}
                    </Typography>
                  )}

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
                  <Typography variant="subtitle1">
                    {"Quantity "}
                    {customizedProduct.set_of ? `(Set of ${customizedProduct.set_of})` : ""}
                  </Typography>
                  <GLSelect
                    value={customizedProduct?.quantity}
                    onChange={e => dispatch(setQuantity(e.target.value))}
                    placeholder="Select Quantity"
                    size="small"
                    options={[...Array(customizedProduct.max_display_quantity).keys()].map(value => ({
                      name: value + 1,
                    }))}
                    getOptionLabel={option => option.name}
                    valueKey="name"
                    fullWidth
                  />
                  {product.isPreOrder && (
                    <Typography variant="body2" fontWeight={800} mt={1}>
                      {"Pre-Order: Estimated Availability"}{" "}
                      {new Date(product.preOrderReleaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                  )}
                  <Box mt={2}>
                    <GLButtonV2
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={product.count_in_stock > 0 || product.isPreOrder ? "bob" : ""}
                      sx={{
                        fontSize: "1.6rem",
                        padding: 2,
                      }}
                      size="large"
                      onClick={handleAddToCart}
                      disabled={!product.isPreOrder && product.count_in_stock <= 0}
                    >
                      {product.isPreOrder ? "Pre-Order Now" : determineInStock(customizedProduct)}
                    </GLButtonV2>
                  </Box>

                  {product?.icon_specs && !product.icon_specs_hidden && (
                    <IconFeatures icon_specs={product.icon_specs} />
                  )}
                </Grid>
              </Grid>
            </Container>
            {!product?.navigation_buttons_hidden && (
              <Box mb={-4}>
                <NavigationButtons navigation={product?.navigation} primary_color={product.primary_color} />
              </Box>
            )}
            <Box
              mt={4}
              sx={{
                color: product.text_color ? product.text_color : "white",
                backgroundColor: product.background_color ? product.background_color : "#333333",
              }}
            >
              <Grid container spacing={2}>
                {!product?.hero_video?.hidden && product?.hero_video?.video && (
                  <Grid item xs={12} mt={-2}>
                    <HeroVideo video={product?.hero_video?.video} video_hidden={product?.hero_video?.hidden} />
                  </Grid>
                )}
                {product?.hero_image && (
                  <Grid item xs={12}>
                    <HeroImage image={product?.hero_image} />
                  </Grid>
                )}
                <Grid item xs={12} mt={!product?.hero_video?.hidden && product?.hero_video?.video ? -4 : 0}>
                  <ProductProtectionDetails transparent={false} primary_color={product.primary_color} />
                </Grid>
                {product?.header_image?.link && (
                  <Grid item xs={12} id="features">
                    <Container maxWidth="xl">
                      <LineBreak line_break={product?.line_break} />
                      <Box>
                        <img
                          src={product?.title_image?.link}
                          alt={product?.name || "Header image"}
                          style={{
                            marginTop: `${product?.line_break ? 40 : 0}px`,
                            marginBottom: `${product?.line_break ? 20 : 0}px`,
                            width: "100%",
                            height: "auto",
                            maxWidth: "100%",
                            display: "block",
                          }}
                        />
                      </Box>
                      <Typography variant="h4" gutterBottom color={product.secondary_color} textAlign="center">
                        {product?.subtitle_text}
                      </Typography>
                      <LineBreak line_break={product?.line_break} />
                    </Container>
                  </Grid>
                )}
                {!product?.features?.image_grid_1_hidden && product?.features?.image_grid_1.length > 0 && (
                  <Grid item xs={12} id="features">
                    <Container maxWidth="xl">
                      <ImageGrid
                        image_grid={product?.features?.image_grid_1}
                        image_grid_hidden={product?.features?.image_grid_1_hidden}
                        text_color={product.text_color}
                        header_text_color={product.header_text_color}
                      />
                    </Container>
                  </Grid>
                )}
              </Grid>
              <Container maxWidth="xl">
                <Grid container spacing={2}>
                  {product?.features?.hero_fact_1 && (
                    <Grid item xs={12} mt={2}>
                      <LineBreak line_break={product?.line_break} />
                      <HeroFact
                        heroFact={product?.features?.hero_fact_1}
                        text_color={product.text_color}
                        secondary_color={product.secondary_color}
                        line_break={product?.line_break}
                        header_text_color={product.header_text_color}
                      />
                      <LineBreak line_break={product?.line_break} />
                    </Grid>
                  )}
                  {product?.features?.hero_image_1 && (
                    <Grid item xs={12}>
                      <HeroImage image={product?.features?.hero_image_1} />
                    </Grid>
                  )}
                  {!product?.features?.image_grid_2_hidden && product?.features?.image_grid_2.length > 0 && (
                    <Grid item xs={12}>
                      <ImageGrid
                        image_grid={product?.features?.image_grid_2}
                        image_grid_hidden={product?.features?.image_grid_2_hidden}
                        text_color={product.text_color}
                        header_text_color={product.header_text_color}
                      />
                    </Grid>
                  )}
                  {product?.features?.hero_fact_2 && (
                    <Grid item xs={12}>
                      <LineBreak line_break={product?.line_break} />
                      <HeroFact
                        heroFact={product?.features?.hero_fact_2}
                        text_color={product.text_color}
                        secondary_color={product.secondary_color}
                        line_break={product?.line_break}
                        header_text_color={product.header_text_color}
                      />
                      <LineBreak line_break={product?.line_break} />
                    </Grid>
                  )}
                  {product?.features?.hero_image_2 && (
                    <Grid item xs={12}>
                      <HeroImage image={product?.features?.hero_image_2} />
                    </Grid>
                  )}
                  {product?.features?.lifestyle_images.length > 0 && !product?.features?.lifestyle_images_hidden && (
                    <Grid item xs={12} mt={2}>
                      <LifestyleImageGrid lifestyleImages={product?.features?.lifestyle_images} />
                    </Grid>
                  )}
                  {product?.features?.hero_image_3 && (
                    <Grid item xs={12}>
                      <HeroImage image={product?.features?.hero_image_3} />
                    </Grid>
                  )}
                </Grid>
              </Container>
              <Container maxWidth="xl">
                <Grid container spacing={2}>
                  {product?.not_sure && !product?.not_sure.hidden && (
                    <Grid item xs={12}>
                      <CompareModels notSure={product?.not_sure} />
                    </Grid>
                  )}
                  {product?.tech_specs && !product?.tech_specs.hidden && (
                    <Grid item xs={12} id="tech-specs">
                      <LineBreak line_break={product?.line_break} />
                      <TechSpecs
                        tech_specs={product?.tech_specs}
                        text_color={product.text_color}
                        primary_color={product.primary_color}
                        header_text_color={product.header_text_color}
                      />
                    </Grid>
                  )}
                  {product?.in_the_box && !product?.in_the_box.hidden && (
                    <Grid item xs={12}>
                      <InTheBox
                        in_the_box={product?.in_the_box}
                        text_color={product.text_color}
                        header_text_color={product.header_text_color}
                      />
                    </Grid>
                  )}
                  {product?.elevate_your_experience && !product?.elevate_your_experience.hidden && (
                    <Grid item xs={12}>
                      <ElevateYourExperience
                        elevateYourExperience={product.elevate_your_experience}
                        text_color={product.text_color}
                        header_text_color={product.header_text_color}
                      />
                    </Grid>
                  )}
                  {product?.product_support && !product?.product_support.hidden && (
                    <Grid item xs={12} id="support">
                      <ProductSupport
                        productSupport={product.product_support}
                        text_color={product.text_color}
                        header_text_color={product.header_text_color}
                      />
                    </Grid>
                  )}
                  {product?.contributors?.length > 0 && (
                    <Grid item xs={12}>
                      <ContributorsDisplay
                        contributors={product.contributors}
                        text_color={product.text_color}
                        secondary_color={product.secondary_color}
                        header_text_color={product.header_text_color}
                      />
                      <LineBreak line_break={product?.line_break} />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <SupportBanner
                      text_color={product.text_color}
                      header_text_color={product.header_text_color}
                      primary_color={product.primary_color}
                    />
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
