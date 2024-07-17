import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { determineItemsTotal } from "../../utils/helper_functions";
import { setCartDrawer } from "../../slices/cartSlice";
import { checkoutHandler, determine_wholesale_proceed } from "./cartHelpers";
import * as API from "../../api";
import { sale_price_switch } from "../../utils/react_helper_functions";
import { RecentlyViewed, TopCategories } from "./components";
import { getCartQuantity } from "../../helpers/sharedHelpers";
import GLSelect from "../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current_user } = useSelector(state => state.users.userPage);
  const { my_cart, cartDrawer } = useSelector(state => state.carts.cartPage);
  const { cartItems } = my_cart;
  const { contents } = useSelector(state => state.contents.contentPage);

  const closeMenu = useCallback(() => dispatch(setCartDrawer(false)), [dispatch]);

  const handleCheckout = useCallback(
    () => checkoutHandler(dispatch, navigate, current_user, closeMenu),
    [dispatch, navigate, current_user, closeMenu]
  );

  const wholesaleProceed = useCallback(
    () => determine_wholesale_proceed(current_user, cartItems),
    [current_user, cartItems]
  );

  const CartItem = ({ item, index }) => {
    const theme = useTheme();

    return (
      <ListItem
        divider
        sx={{
          py: 2,
          "&.MuiListItem-divider": {
            borderColor: "white", // This sets the divider color to white
          },
        }}
      >
        <Grid container spacing={2} alignItems="center" flexWrap="nowrap">
          <Grid item>
            <Link to={`/collections/all/products/${item.pathname}`}>
              <Box
                onClick={closeMenu}
                component="img"
                src={item?.display_image}
                alt={item.name}
                sx={{ width: 80, height: 80, borderRadius: 2 }}
              />
            </Link>
          </Grid>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="subtitle1" component={Link} to={`/collections/all/products/${item.pathname}`}>
                {item.name}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {item.selectedOptions?.map((option, optionIndex) => {
                  const bgColor = option.colorCode || theme.palette.background.default;
                  return (
                    <Chip
                      key={optionIndex}
                      label={`${item.currentOptions[optionIndex].name}: ${option.name}`}
                      size="small"
                      sx={{
                        backgroundColor: bgColor,
                        color: theme.palette.getContrastText(bgColor),
                        fontSize: "1rem",
                        fontWeight: "500",
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {sale_price_switch({
                  product: item,
                  cartItem: true,
                  background: "light",
                  isWholesaler: current_user?.isWholesaler,
                })}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GLSelect
              value={item.quantity}
              onChange={e => {
                const updatedCartItems = [...my_cart.cartItems];
                const itemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);
                updatedCartItems[itemIndex] = {
                  ...updatedCartItems[itemIndex],
                  quantity: parseInt(e.target.value),
                };
                dispatch(API.updateQuantity({ ...my_cart, cartItems: updatedCartItems }));
              }}
              size="small"
              options={[...Array(current_user?.isWholesaler ? 500 : item.max_quantity).keys()].map(value => ({
                name: value + 1,
              }))}
              width="70px"
              getOptionLabel={option => option.name}
              valueKey="name"
            />
            <GLIconButton
              onClick={() => dispatch(API.deleteCartItem({ item_index: index, type: "add_to_cart" }))}
              size="small"
              sx={{ mt: 2 }}
              tooltip="Remove"
            >
              <DeleteIcon color="white" />
            </GLIconButton>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  return (
    <Drawer
      anchor="right"
      transitionDuration={700}
      open={cartDrawer}
      onClose={event => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
          return;
        }
        closeMenu();
      }}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 600 }, backgroundColor: "#333333", color: "white" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box height="50px" width="50px" mr={1}>
              <img
                className="zoom logo_s"
                src="/images/optimized_images/logo_images/glow_logo_optimized.png"
                alt="Glow LEDs Logo"
                title="Small Logo"
              />
            </Box>
            <Typography variant="h6">Cart ({getCartQuantity(cartItems)})</Typography>
          </Box>
          <IconButton onClick={closeMenu} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider color="white" />
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {cartItems && cartItems.length === 0 ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1">Cart is Empty</Typography>
              <RecentlyViewed closeMenu={closeMenu} />
              <TopCategories
                category_items={contents.length > 0 && contents[0].home_page?.slideshow}
                closeMenu={closeMenu}
              />
            </Box>
          ) : (
            <List>
              {cartItems?.map((item, index) => (
                <CartItem key={index} item={item} index={index} />
              ))}
            </List>
          )}
        </Box>
        <Divider color="white" />
        <Box sx={{ p: 2, background: "linear-gradient(180deg, #333333 0%, #4d5061 100%)" }}>
          <Box display={"flex"} justifyContent={"space-between"} sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1">
              ${determineItemsTotal(cartItems, current_user?.isWholesaler).toFixed(2)} USD
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Taxes and shipping calculated at checkout
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"} gap={2} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={closeMenu}
              component={Link}
              to="/checkout/cart"
              sx={{
                fontSize: "1.6rem",
                padding: 1.5,
              }}
            >
              View Cart
            </Button>
            {current_user?.isWholesaler ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                disabled={!wholesaleProceed()}
                sx={{
                  fontSize: "1.6rem",
                  padding: 1.5,
                }}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                sx={{
                  fontSize: "1.6rem",
                  padding: 1.5,
                }}
              >
                Proceed to Checkout
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
