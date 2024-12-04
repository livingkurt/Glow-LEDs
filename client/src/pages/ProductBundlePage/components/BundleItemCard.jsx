import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import * as API from "../../../api";
import { useNavigate } from "react-router-dom";
import { setPromoCode } from "../../../utils/helpers/universal_helpers";
import BundleOptionsModal from "./BundleOptionsModal";
import GLPrice from "../../../shared/GlowLEDsComponents/GLPrice/GLPrice";

const BundleItemCard = ({ item, bundle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const my_cart = useSelector(state => state.carts.cartPage.my_cart);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  const handleQuickAdd = () => {
    if (item.currentOptions && item.currentOptions.length > 0) {
      setIsOptionsModalOpen(true);
    } else {
      addToCart([{ ...item, quantity: 1 }]);
    }
  };

  const addToCart = cartItems => {
    dispatch(
      API.addToCart({
        cart: my_cart,
        cartItems,
        type: "add_to_cart",
      })
    );
    setPromoCode(dispatch, bundle.affiliate?.public_code?.promo_code);
  };

  const handleOptionsConfirm = updatedItems => {
    addToCart(updatedItems);
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
            <Typography variant="h6" display="flex" alignItems="center" gap={1}>
              {"Price: "}
              <GLPrice product={item} />
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

      <BundleOptionsModal
        isOpen={isOptionsModalOpen}
        onClose={() => setIsOptionsModalOpen(false)}
        bundleItems={[item]}
        onConfirm={handleOptionsConfirm}
      />
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
    currentOptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.array,
      })
    ),
    selectedOptions: PropTypes.array,
  }).isRequired,
  bundle: PropTypes.object.isRequired,
};

export default BundleItemCard;
