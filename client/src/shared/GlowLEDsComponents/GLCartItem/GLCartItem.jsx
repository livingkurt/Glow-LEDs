import { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import { setCartDrawer } from "../../../slices/cartSlice";
import GLSelect from "../GLSelect/GLSelect";
import GLIconButton from "../GLIconButton/GLIconButton";
import * as API from "../../../api";
import { generateProductUrl } from "../../../utils/helpers/product_helpers";
import GLLazyImage from "../GLLazyImage/GLLazyImage";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { formatDate } from "../../../utils/helpers/universal_helpers";
import { isSafari } from "react-device-detect";
import GLPrice from "../GLPrice/GLPrice";
import GLProductOptions from "../GLProductOptions/GLProductOptions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const GLCartItem = ({ item, index, showQuantity, isOrderItem = false }) => {
  console.log({ item });
  const { current_user } = useSelector(state => state.users.userPage);
  const { my_cart } = useSelector(state => state.carts.cartPage);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const closeMenu = useCallback(() => dispatch(setCartDrawer(false)), [dispatch]);

  const productUrl = generateProductUrl(item);

  const renderQuantityAndDelete = () =>
    showQuantity && !isOrderItem ? (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          options={Array.from(
            {
              length: current_user?.isWholesaler ? 500 : Math.max(item?.max_display_quantity || 1, item?.quantity || 1),
            },
            (_, i) => ({
              name: i + 1,
            })
          )}
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
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <GLLazyImage
          src={item?.display_image_object?.link}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
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
              fontWeight: isSafari ? 699 : 700,
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
            <GLProductOptions selectedOptions={item.selectedOptions} currentOptions={item.currentOptions} />
          </Grid>
          {!isOrderItem && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <GLPrice product={item} />
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
            <Grid item>
              {" "}
              <GLProductOptions selectedOptions={item.selectedOptions} currentOptions={item.currentOptions} />
            </Grid>
            <Grid item>
              {item.isPreOrder && (
                <Typography variant="body2" fontWeight={800} mt={1} display="flex" alignItems="center">
                  <ShoppingBagIcon sx={{ mb: 0.25, mr: 0.5 }} />
                  {"Pre-Order: Estimated Availability "}
                  {formatDate(item.preOrderReleaseDate)}
                </Typography>
              )}
            </Grid>
            {!isOrderItem && (
              <Grid item>
                <Typography variant="body2">
                  <GLPrice product={item} />
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

GLCartItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  showQuantity: PropTypes.bool,
  isOrderItem: PropTypes.bool,
};

GLCartItem.defaultProps = {
  isOrderItem: false,
  showQuantity: true,
};

export default GLCartItem;
