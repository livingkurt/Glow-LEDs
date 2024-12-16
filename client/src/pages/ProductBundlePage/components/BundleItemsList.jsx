import React, { useState } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";

import { setPromoCode } from "../../../utils/helpers/universal_helpers";
import BundleOptionsModal from "./BundleOptionsModal";
import GLPrice from "../../../shared/GlowLEDsComponents/GLPrice/GLPrice";
import Add from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

const BundleItemsList = ({ item, idx, bundle }) => {
  const dispatch = useDispatch();
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
    <React.Fragment key={item._id || idx}>
      <ListItem sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        <Box>
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary_dark">
            {`Quantity: ${item.quantity}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">
            <GLPrice product={item} />
          </Typography>
          <GLButtonV2 variant="contained" color="primary" onClick={handleQuickAdd} sx={{ whiteSpace: "nowrap" }}>
            <Add /> {"Add to Cart"}
          </GLButtonV2>
        </Box>
      </ListItem>
      {idx < bundle.cartItems.length - 1 && <Divider />}

      <BundleOptionsModal
        isOpen={isOptionsModalOpen}
        onClose={() => setIsOptionsModalOpen(false)}
        bundleItems={[item]}
        onConfirm={handleOptionsConfirm}
      />
    </React.Fragment>
  );
};

BundleItemsList.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  bundle: PropTypes.object.isRequired,
};

export default BundleItemsList;
