import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { Box, Container, Grid, Typography, List } from "@mui/material";
import { useDispatch } from "react-redux";
import { Add } from "@mui/icons-material";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import ProductImages from "../ProductPage/components/ProductImages";
import { sale_price_switch } from "../../utils/react_helper_functions";
import * as API from "../../api";
import useProductBundlePage from "./useProductBundlePage";
import { EditCartModal } from "../CartsPage/components";
import { open_edit_cart_modal } from "../../slices/cartSlice";
import BundleItemsList from "./components/BundleItemsList";
import ProductBundlePageSkeleton from "./components/ProductBundlePageSkeleton";
import BundleItemCard from "./components/BundleItemCard";
import { generateGradient, setPromoCode } from "../../utils/helpers/universal_helpers";
import HeroVideo from "../HomePage/components/HeroVideo";
import BundleOptionsModal from "./components/BundleOptionsModal";

const ProductBundlePage = () => {
  const dispatch = useDispatch();
  const { bundle, current_user, my_cart, loadingProductBundle } = useProductBundlePage();
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  const hasItemsWithOptions = useMemo(() => {
    if (!bundle?.cartItems) return false;
    return bundle.cartItems.some(item => item.currentOptions && item.currentOptions.length > 0);
  }, [bundle?.cartItems]);

  const handleAddToCart = () => {
    if (hasItemsWithOptions) {
      setIsOptionsModalOpen(true);
    } else {
      addItemsToCart(bundle.cartItems);
    }
  };

  const addItemsToCart = cartItems => {
    dispatch(API.addToCart({ cart: my_cart, cartItems, type: "add_to_cart" }));
    setPromoCode(dispatch, bundle.affiliate?.public_code?.promo_code);
  };

  const handleOptionsConfirm = updatedItems => {
    addItemsToCart(updatedItems);
  };

  const gradient = useMemo(() => generateGradient(), []);

  if (loadingProductBundle) return <ProductBundlePageSkeleton />;

  return (
    <Box>
      {bundle && (
        <>
          <Box display="flex" justifyContent="space-between" p={2}>
            <GLBreadcrumbs
              items={[
                { name: "ALL BUNDLES", to: "/bundles" },
                { name: bundle.affiliate?.artist_name?.toUpperCase(), to: `/sponsors/${bundle.affiliate?.pathname}` },
                { name: bundle.title?.toUpperCase() },
              ]}
            />
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
                {bundle?.images?.length ? (
                  <ProductImages images={bundle?.images} originalImages={bundle?.images} />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1",
                      background: gradient,
                      borderRadius: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 3,
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        color: "white",
                        textAlign: "center",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {bundle.title}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h4" gutterBottom sx={{ typography: { sm: "h4", xs: "h5" } }}>
                    {bundle.title}
                  </Typography>
                </Box>

                {bundle.subtitle && (
                  <Typography variant="h6" color="text.secondary_dark" gutterBottom>
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
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {"Bundle Items"}
                    </Typography>
                    <List>
                      {bundle.cartItems.map((item, idx) => (
                        <BundleItemsList key={item._id || idx} item={item} idx={idx} bundle={bundle} />
                      ))}
                    </List>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          {bundle?.video && <HeroVideo video={bundle?.video} />}
          <Box
            mt={4}
            sx={{
              color: "white",
              backgroundColor: "#333333",
            }}
          >
            <Container maxWidth="xl">
              <Box sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                  {"Bundle Items"}
                </Typography>
                <Container maxWidth="lg">
                  {bundle.cartItems.map((item, idx) => (
                    <BundleItemCard key={item._id || idx} item={item} bundle={bundle} />
                  ))}
                </Container>
              </Box>
            </Container>
          </Box>

          <BundleOptionsModal
            isOpen={isOptionsModalOpen}
            onClose={() => setIsOptionsModalOpen(false)}
            bundleItems={bundle?.cartItems || []}
            onConfirm={handleOptionsConfirm}
          />
          <EditCartModal />
        </>
      )}
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
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        currentOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            values: PropTypes.array,
          })
        ),
        selectedOptions: PropTypes.array,
      })
    ),
    affiliate: PropTypes.shape({
      artist_name: PropTypes.string,
      pathname: PropTypes.string,
      public_code: PropTypes.shape({
        promo_code: PropTypes.string,
      }),
    }),
  }),
};

ProductBundlePage.defaultProps = {
  bundle: null,
};

export default ProductBundlePage;
