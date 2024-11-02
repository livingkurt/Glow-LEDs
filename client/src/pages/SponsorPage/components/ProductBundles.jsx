import PropTypes from "prop-types";
import * as API from "../../../api";
import { Typography, Box, Button, Divider } from "@mui/material";
import { showInfo } from "../../../slices/snackbarSlice";
import CartItemCard from "./CartItemCard";
import { open_edit_cart_modal } from "../../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductBundles = ({ affiliate }) => {
  const dispatch = useDispatch();

  const { my_cart } = useSelector(state => state.carts.cartPage);

  const { current_user } = useSelector(state => state.users.userPage);

  return (
    <div>
      {affiliate.bundles && affiliate.bundles.length > 0 && (
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            {"Product Bundles by "}
            {affiliate.artist_name}
          </Typography>
        </Box>
      )}
      {affiliate.bundles &&
        affiliate.bundles.length > 0 &&
        affiliate.bundles.map(bundle => (
          <Box sx={{ my: 2 }} key={bundle._id}>
            {bundle.title && (
              <Box>
                <Typography variant="h5" align="center" gutterBottom>
                  {bundle.title}
                </Typography>
              </Box>
            )}
            {bundle.subtitle && (
              <Box>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  {bundle.subtitle}
                </Typography>
              </Box>
            )}
            {bundle.short_description && (
              <Box>
                <Typography variant="body1" align="center" gutterBottom>
                  {bundle.short_description}
                </Typography>
              </Box>
            )}
            {bundle?.cartItems?.length > 0 && (
              <Box
                sx={{
                  pb: 2,
                  px: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    minWidth: "100%",
                    "&::-webkit-scrollbar": {
                      height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {bundle?.cartItems?.length > 0 &&
                    bundle?.cartItems?.map((item, index) => (
                      <Box
                        key={item._id}
                        sx={{
                          m: 2,
                          mb: 4,
                          maxWidth: "250px",
                          width: "100%",
                        }}
                      >
                        <CartItemCard item={item} />
                      </Box>
                    ))}
                </Box>
                <Box display="flex" gap={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(API.addToCart({ cart: my_cart, cartItems: bundle.cartItems, type: "add_to_cart" }));

                      const code = sessionStorage.getItem("promo_code");
                      if (!code) {
                        sessionStorage.setItem("promo_code", affiliate.public_code?.promo_code);
                        dispatch(
                          showInfo({
                            message: `Code ${affiliate.public_code?.promo_code.toUpperCase()} Added to Checkout`,
                          })
                        );
                      }
                    }}
                  >
                    {"Add Bundle to Cart"}
                  </Button>
                  {(current_user.isAdmin || current_user?.affiliate === affiliate?._id) && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => dispatch(open_edit_cart_modal(bundle))}
                    >
                      {"Edit Bundle"}
                    </Button>
                  )}
                </Box>
                <Divider sx={{ my: 4, borderColor: "#fff" }} />
              </Box>
            )}
          </Box>
        ))}
    </div>
  );
};

ProductBundles.propTypes = {
  affiliate: PropTypes.object.isRequired,
};

export default ProductBundles;
