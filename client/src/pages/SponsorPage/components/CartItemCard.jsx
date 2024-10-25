import React, { useState } from "react";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme, IconButton, Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { random } from "lodash";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import { useSelector, useDispatch } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatDate } from "../../../utils/helpers/universal_helpers";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import * as API from "../../../api";
import { showInfo } from "../../../slices/snackbarSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { current_user } = useSelector(state => state.users.userPage);
  const { my_cart } = useSelector(state => state.carts.cartPage);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handlePrevImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? item.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % item.images.length);
  };

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
        {isHovered && item.images && item.images.length > 1 && !isMobile && (
          <>
            <IconButton
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
                zIndex: 2,
              }}
              onClick={handlePrevImage}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
                zIndex: 2,
              }}
              onClick={handleNextImage}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
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
            Quick Add
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
            Pre-Order: Estimated Availability {formatDate(item.preOrderReleaseDate)}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1" color="white" mt={1}>
            {sale_price_switch({
              product: item,
              cartItem: true,
              background: "dark",
              isWholesaler: current_user?.isWholesaler,
            })}
          </Typography>
          <Typography variant="body1" color="white" mt={1}>
            Qty: {item.quantity}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
