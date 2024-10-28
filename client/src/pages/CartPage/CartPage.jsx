import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GLCartItem from "../../shared/GlowLEDsComponents/GLCartItem/GLCartItem";
import { Helmet } from "react-helmet";
import { determineItemsTotal } from "../../utils/helper_functions";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Grid, List, ListItem, Divider, useTheme, Paper } from "@mui/material";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import * as API from "../../api";
import { showInfo } from "../../slices/snackbarSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartPage = useSelector(state => state.carts.cartPage);
  const theme = useTheme();

  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const { data: currentContent } = API.useCurrentContentQuery();

  const product_protection_details = currentContent?.home_page?.product_protection_details;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const checkoutHandler = () => {
    if (cartItems.length === 0) {
      dispatch(showInfo({ message: "Cannot proceed to checkout without any items in cart" }));
      return;
    }
    if (current_user.hasOwnProperty("first_name")) {
      navigate("/secure/checkout/place_order");
    } else {
      navigate("/checkout/place_order");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>{"Cart | Glow LEDs "}</title>
        <meta property="og:title" content="Cart" />
        <meta name="twitter:title" content="Cart" />
        <link rel="canonical" href="https://www.glow-leds.com/checkout/cart" />
        <meta property="og:url" content="https://www.glow-leds.com/checkout/cart" />
      </Helmet>
      <Typography variant="h4" gutterBottom>
        {"Cart"}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: 4 }}>
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={9}>
                <Typography variant="subtitle1">{"Product"}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mb: 2, bgcolor: "white" }} />
            {cartItems.length === 0 ? (
              <Typography variant="body1">{"Cart is empty"}</Typography>
            ) : (
              <List disablePadding>
                {cartItems.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                    <GLCartItem orderItems={cartItems} item={item} index={index} showQuantity />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={5} display="flex" flexDirection="column">
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: theme.palette.background.block, color: "white" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                {"Subtotal"}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {"$"}
                {determineItemsTotal(cartItems, current_user?.isWholesaler).toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="body2" gutterBottom>
              {"Taxes and shipping calculated at checkout"}
            </Typography>
            <GLButtonV2
              onClick={checkoutHandler}
              variant="primary"
              fullWidth
              sx={{
                fontSize: "1.6rem",
                padding: 1.5,
                mt: 2,
              }}
            >
              {"CHECKOUT"}
            </GLButtonV2>
          </Paper>
          {product_protection_details?.length > 0 && (
            <Box
              sx={{
                mt: 2,
                color: "white",
                overflow: "hidden", // This ensures the inner content doesn't overflow the rounded corners
              }}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                {product_protection_details.map((detail, index) => (
                  <Box key={index}>
                    <Box sx={{ textAlign: "left", width: "100%" }}>
                      <Typography variant="subtitle1" gutterBottom mb={1}>
                        {detail.title}
                      </Typography>
                      <Typography variant="body2">{detail.description}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
