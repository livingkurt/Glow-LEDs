import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import * as API from "../../../api";
import { useNavigate } from "react-router-dom";
import { setPromoCode } from "../../../utils/helpers/universal_helpers";

const BundleItemCard = ({ item, bundle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const my_cart = useSelector(state => state.carts.cartPage.my_cart);
  const { current_user } = useSelector(state => state.users.userPage);

  const handleQuickAdd = () => {
    dispatch(
      API.addToCart({
        cart: my_cart,
        cartItems: [{ ...item, quantity: 1 }],
        type: "add_to_cart",
      })
    );
    setPromoCode(dispatch, bundle.affiliate?.public_code?.promo_code);
  };

  return (
    <Box sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ position: "relative", paddingTop: "100%" }}>
            <GLLazyImage
              src={item.display_image_object?.link}
              alt={item.name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              {item.name}
            </Typography>
            {item.product.fact && (
              <Typography variant="body1" color="text.secondary_light" gutterBottom>
                {item.product.fact}
              </Typography>
            )}
            <Typography variant="h6">
              {"Price: "}
              {sale_price_switch({
                product: item,
                cartItem: false,
                background: "dark",
                isWholesaler: current_user?.isWholesaler,
              })}
            </Typography>
            {item.product.short_description && (
              <Typography variant="body2" color="text.secondary_light" paragraph>
                {item.product.short_description}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
              <GLButtonV2 variant="contained" color="primary" onClick={handleQuickAdd} startIcon={<Add />}>
                {"Add to Cart"}
              </GLButtonV2>
              <GLButtonV2
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/products/${item.product.pathname}`)}
              >
                {"View Product"}
              </GLButtonV2>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

BundleItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    fact: PropTypes.string,
    short_description: PropTypes.string,
    product: PropTypes.shape({
      fact: PropTypes.string,
      short_description: PropTypes.string,
      pathname: PropTypes.string,
    }),
    display_image_object: PropTypes.shape({
      link: PropTypes.string,
    }),
    price: PropTypes.number,
  }).isRequired,
  bundle: PropTypes.object.isRequired,
};

export default BundleItemCard;
