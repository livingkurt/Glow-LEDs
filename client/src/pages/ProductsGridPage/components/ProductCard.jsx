import React, { useState } from "react";
import { Card, CardContent, Typography, Rating, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { random } from "lodash";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { current_user } = useSelector(state => state.users.userPage);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link to={`/collections/all/products/${product._id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          bgcolor: "transparent",
          height: "100%",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
          },
          borderRadius: "1rem",
          display: isMobile ? "flex" : "block",
          flexDirection: isMobile ? "row" : "column",
        }}
        elevation={0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: isMobile ? "30%" : "100%",
            overflow: "hidden",
            flexShrink: 0,
            width: isMobile ? "30%" : "100%",
            backgroundImage: `url(${product.images[0].link})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1rem",
            transition: "background-image 0.3s ease-in-out, border-radius 0.3s ease-in-out",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: product.images.length > 1 ? `url(${product.images[1].link})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            },
            "&:hover": {
              borderRadius: isMobile ? 0 : "1rem 1rem 0 0",
            },
          }}
        />
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography variant={isMobile ? "body1" : "h6"} color="white" gutterBottom>
              {product.name}
            </Typography>
            {product.rating ? <Rating value={product.rating} readOnly size={isMobile ? "small" : "medium"} /> : null}
          </Box>
          <Typography variant={isMobile ? "body2" : "body1"} color="white">
            {sale_price_switch({
              product,
              cartItem: false,
              background: "dark",
              isWholesaler: current_user?.isWholesaler,
            })}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
