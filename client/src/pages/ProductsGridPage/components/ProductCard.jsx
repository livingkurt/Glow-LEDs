import React from "react";
import { Card, CardContent, CardMedia, Typography, Rating, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { random } from "lodash";

const ProductCard = ({ product }) => {
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
        }}
        elevation={0}
      >
        <Box sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={product.images[0].link}
            alt={product.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1rem",
              transition: "border-radius 0.3s ease-in-out",
              "&:hover": {
                borderRadius: "1rem 1rem 0 0",
              },
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" color="white">
            {product.name}
          </Typography>
          <Typography variant="body1" color="white">
            ${product.price.toFixed(2)}
          </Typography>
          {product.rating ? <Rating value={product.rating} readOnly /> : null}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
