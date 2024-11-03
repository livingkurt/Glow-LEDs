import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import ProductPageLoading from "../ProductPage/components/ProductPageLoading";
import ProductImages from "../ProductPage/components/ProductImages";
import { sale_price_switch } from "../../utils/react_helper_functions";
import * as API from "../../api";
import useProductBundlePage from "./useProductBundlePage";
import { showInfo } from "../../slices/snackbarSlice";
import { EditCartModal } from "../CartsPage/components";
import { open_edit_cart_modal } from "../../slices/cartSlice";
import BundleItems from "./components/BundleItems";
import BundleItemsList from "./components/BundleItemsList";
import { Add } from "@mui/icons-material";

const ProductBundlePage = () => {
  const dispatch = useDispatch();
  const { bundle, current_user, my_cart, loading } = useProductBundlePage();

  const handleAddToCart = () => {
    dispatch(API.addToCart({ cart: my_cart, cartItems: bundle.cartItems, type: "add_to_cart" }));

    const code = sessionStorage.getItem("promo_code");
    if (!code) {
      sessionStorage.setItem("promo_code", bundle.affiliate?.public_code?.promo_code);
      dispatch(
        showInfo({
          message: `Code ${bundle.affiliate?.public_code?.promo_code.toUpperCase()} Added to Checkout`,
        })
      );
    }
  };
  console.log({ bundle: bundle?.images });

  return (
    <Box>
      <ProductPageLoading loading={loading}>
        {bundle && (
          <>
            <Box display="flex" justifyContent="space-between" p={2}>
              <GLBreadcrumbs items={[{ name: "ALL BUNDLES", to: "/bundles" }, { name: bundle.title?.toUpperCase() }]} />
              {(current_user.isAdmin || current_user?.affiliate === bundle?.affiliate?._id) && (
                <Box className="br-10px">
                  <GLButtonV2
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(open_edit_cart_modal(bundle))}
                  >
                    {"Edit Bundle"}
                  </GLButtonV2>
                </Box>
              )}
            </Box>

            <Container maxWidth="xl" sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <ProductImages images={bundle?.images} originalImages={bundle?.images} />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4" gutterBottom sx={{ typography: { sm: "h4", xs: "h5" } }}>
                      {bundle.title}
                    </Typography>
                  </Box>

                  {bundle.subtitle && (
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {bundle.subtitle}
                    </Typography>
                  )}

                  {bundle.affiliate && (
                    <Typography variant="subtitle1" gutterBottom>
                      {"By "} {bundle.affiliate.artist_name}
                    </Typography>
                  )}

                  <Typography variant="body1" gutterBottom mt={2} mb={2}>
                    {bundle.short_description}
                  </Typography>

                  <Typography variant="h6" gutterBottom mt={2} mb={2} sx={{ typography: { sm: "h5", xs: "h6" } }}>
                    {"Price: "}
                    {sale_price_switch({
                      product: {
                        price: bundle.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
                      },
                      cartItem: false,
                      background: "dark",
                      isWholesaler: current_user?.isWholesaler,
                    })}
                  </Typography>

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
                      startIcon={<Add />}
                      onClick={handleAddToCart}
                    >
                      {"Add Bundle to Cart"}
                    </GLButtonV2>
                    <BundleItemsList items={bundle.cartItems} isWholesaler={current_user?.isWholesaler} />
                  </Box>
                </Grid>
              </Grid>
            </Container>

            <Box
              mt={4}
              sx={{
                color: "white",
                backgroundColor: "#333333",
              }}
            >
              <Container maxWidth="xl">
                <BundleItems items={bundle.cartItems} />
              </Container>
            </Box>
          </>
        )}
      </ProductPageLoading>
      <EditCartModal />
    </Box>
  );
};

ProductBundlePage.propTypes = {
  bundle: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    short_description: PropTypes.string,
    image: PropTypes.shape({
      link: PropTypes.string,
    }),
    cartItems: PropTypes.array,
    affiliate: PropTypes.shape({
      artist_name: PropTypes.string,
    }),
  }),
};

ProductBundlePage.defaultProps = {
  bundle: null,
};

export default ProductBundlePage;
