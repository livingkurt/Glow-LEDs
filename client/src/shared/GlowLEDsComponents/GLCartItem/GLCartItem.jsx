import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid, Chip, ListItem, useTheme, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { setCartDrawer } from "../../../slices/cartSlice";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import GLSelect from "../GLSelect/GLSelect";
import GLIconButton from "../GLIconButton/GLIconButton";
import * as API from "../../../api";
import { generateProductUrl } from "../../../utils/helpers/product_helpers";
import GLLazyImage from "../GLLazyImage/GLLazyImage";

const GLCartItem = ({ item, index, showQuantity, isOrderItem = false }) => {
  const { current_user } = useSelector(state => state.users.userPage);
  const { my_cart } = useSelector(state => state.carts.cartPage);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const closeMenu = useCallback(() => dispatch(setCartDrawer(false)), [dispatch]);

  const processedOptions = item.selectedOptions?.map(option => ({
    ...option,
    normalizedColorCode: option.filament?.color_code || option.colorCode,
  }));

  const productUrl = generateProductUrl(item);

  const renderOptions = () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {processedOptions?.map((option, optionIndex) => {
        const bgColor = option.normalizedColorCode || theme.palette.background.default;
        if (!option.name) return null;
        return (
          <Chip
            key={optionIndex}
            label={`${item.currentOptions[optionIndex]?.name}: ${option?.name}`}
            size="small"
            sx={{
              backgroundColor: option.name === "Clear" ? "transparent" : bgColor,
              border: option.name === "Clear" ? "1px solid white !important" : "none !important",
              color: option.name === "Clear" ? "white" : theme.palette.getContrastText(bgColor),
              fontSize: "1rem",
              fontWeight: "500",
            }}
          />
        );
      })}
    </Box>
  );

  const renderQuantityAndDelete = () =>
    showQuantity && !isOrderItem ? (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {console.log({
          quantity: item?.quantity,
          max_display_quantity: item?.max_display_quantity,
        })}
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
          options={[
            ...Array(current_user?.isWholesaler ? 500 : Math.max(item?.max_display_quantity, item?.quantity)).keys(),
          ].map(value => ({
            name: value + 1,
          }))}
          width="70px"
          getOptionLabel={option => option.name}
          valueKey="name"
        />
        <GLIconButton
          onClick={() => dispatch(API.deleteCartItem({ item_index: index, type: "add_to_cart" }))}
          size="large"
          tooltip="Remove"
        >
          <DeleteIcon color="white" />
        </GLIconButton>
      </Box>
    ) : null;

  const renderImage = () => (
    <Link to={productUrl}>
      <Box
        onClick={closeMenu}
        position="relative"
        sx={{
          width: isOrderItem ? 60 : 80,
          height: isOrderItem ? 60 : 80,
        }}
      >
        <GLLazyImage
          src={item?.display_image_object?.link}
          alt={item.name}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />

        {isOrderItem && item.quantity > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {item.quantity}
          </Box>
        )}
      </Box>
    </Link>
  );

  return (
    <ListItem
      divider
      sx={{
        py: 2,
        "&.MuiListItem-divider": {
          borderColor: isOrderItem ? "default" : "white",
        },
      }}
    >
      {isMobile ? (
        <Grid container spacing={2} alignItems="start" flexWrap="wrap">
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item>{renderImage()}</Grid>
            <Grid item xs>
              <Typography variant={isOrderItem ? "body1" : "subtitle2"} component={Link} to={productUrl}>
                {item.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {renderOptions()}
          </Grid>
          {!isOrderItem && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {sale_price_switch({
                    product: item,
                    cartItem: true,
                    background: "light",
                    isWholesaler: current_user?.isWholesaler,
                  })}
                </Typography>
                {renderQuantityAndDelete()}
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container spacing={2} alignItems="center" flexWrap="nowrap">
          <Grid item>{renderImage()}</Grid>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item>
              <Typography variant={isOrderItem ? "body1" : "subtitle2"} component={Link} to={productUrl}>
                {item.quantity > 1 ? `${item.quantity}x` : ""} {item.name}
              </Typography>
            </Grid>
            <Grid item>{renderOptions()}</Grid>
            {!isOrderItem && (
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
            )}
          </Grid>
          {!isOrderItem && (
            <Grid item mt={-2.5}>
              {renderQuantityAndDelete()}
            </Grid>
          )}
        </Grid>
      )}
    </ListItem>
  );
};

export default GLCartItem;
