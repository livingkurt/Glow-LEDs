import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid, Chip, ListItem, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { setCartDrawer } from "../../slices/cartSlice";
import { sale_price_switch } from "../../utils/react_helper_functions";
import GLSelect from "../GlowLEDsComponents/GLSelect/GLSelect";
import GLIconButton from "../GlowLEDsComponents/GLIconButton/GLIconButton";
import * as API from "../../api";
const CartItem = ({ item, index, showQuantity }) => {
  const { current_user } = useSelector(state => state.users.userPage);
  const { my_cart } = useSelector(state => state.carts.cartPage);
  const dispatch = useDispatch();
  const theme = useTheme();
  const closeMenu = useCallback(() => dispatch(setCartDrawer(false)), [dispatch]);
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
              src={item?.display_image_object?.link}
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
        {showQuantity ? (
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
        ) : item.quantity ? (
          <Typography variant="body2">Quantity: {item.quantity}</Typography>
        ) : null}
      </Grid>
    </ListItem>
  );
};

export default CartItem;
