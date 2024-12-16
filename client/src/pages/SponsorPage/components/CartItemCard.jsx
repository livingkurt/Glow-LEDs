import React, { useState } from "react";

import random from "lodash/random";
import { useSelector, useDispatch } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatDate } from "../../../utils/helpers/universal_helpers";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import * as API from "../../../api";
import { showInfo } from "../../../slices/snackbarSlice";
import PropTypes from "prop-types";
import GLPrice from "../../../shared/GlowLEDsComponents/GLPrice/GLPrice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { my_cart } = useSelector(state => state.carts.cartPage);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleQuickAddToCart = () => {
    dispatch(API.addToCart({ cart: my_cart, cartItems: [item], type: "add_to_cart" }));
    const code = sessionStorage.getItem("promo_code");
    if (!code) {
      sessionStorage.setItem("promo_code", code);
      dispatch(showInfo({ message: `Code ${code.toUpperCase()} Added to Checkout` }));
    }
  };

  const processedOptions = item.selectedOptions?.map(option => ({
    ...option,
    normalizedColorCode: option.filament?.color_code || option.colorCode,
  }));

  const renderOptions = () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
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

  return (
    <Card
      sx={{
        bgcolor: "transparent",
        height: "100%",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
        },
        borderRadius: "1rem",
        position: "relative",
      }}
      elevation={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "1rem 1rem 0 0",
          aspectRatio: 1,
        }}
      >
        <GLLazyImage
          src={item.display_image_object?.link}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        {isHovered && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            sx={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              whiteSpace: "nowrap",
            }}
            onClick={handleQuickAddToCart}
          >
            {"Quick Add"}
          </Button>
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" color="white" gutterBottom>
          {item.quantity > 1 ? `${item.quantity}x ` : ""}
          {item.name}
        </Typography>
        {renderOptions()}
        {item.isPreOrder && (
          <Typography
            variant="body2"
            fontWeight={800}
            mt={1}
            display="flex"
            alignItems="center"
            sx={{ color: "white" }}
          >
            <ShoppingBagIcon sx={{ mb: 0.25, mr: 0.5 }} />
            {"Pre-Order: Estimated Availability "}
            {formatDate(item.preOrderReleaseDate)}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1" color="white" mt={1}>
            <GLPrice product={item} />
          </Typography>
          <Typography variant="body1" color="white" mt={1}>
            {"Qty: "}
            {item.quantity}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

CartItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItemCard;
