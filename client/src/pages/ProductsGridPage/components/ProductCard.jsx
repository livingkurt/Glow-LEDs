import { useState } from "react";
import { Card, CardContent, Typography, Rating, Box, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { random } from "lodash";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import GLPrice from "../../../shared/GlowLEDsComponents/GLPrice/GLPrice";

const ProductCard = ({ product, promo_code, goHorizontal = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handlePrevImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % product.images.length);
  };

  return (
    <Link
      to={`/products/${product.pathname}${promo_code ? `?code=${promo_code}` : ""}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          bgcolor: "transparent",
          height: "100%",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
          },
          borderRadius: "1rem",
          display: goHorizontal && isMobile ? "flex" : "block",
          flexDirection: goHorizontal && isMobile ? "row" : "column",
        }}
        elevation={0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
            width: goHorizontal && isMobile ? "50%" : "100%",
            borderRadius: "1rem",
            transition: "border-radius 0.3s ease-in-out",
            "&:hover": {
              borderRadius: goHorizontal && isMobile ? 0 : "1rem 1rem 0 0",
            },
            aspectRatio: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <GLLazyImage
              src={product.images[currentImageIndex].link}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s ease-in-out",
                opacity: 1,
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                product.images.length > 1
                  ? `url(${product.images[(currentImageIndex + 1) % product.images.length].link})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 0.3s ease-in-out",
              opacity: isHovered ? 1 : 0,
            }}
          />
          {isHovered && product.images.length > 1 && !isMobile && (
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
        </Box>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" color="white" gutterBottom>
              {product.name}
            </Typography>
            {product.rating ? <Rating value={product.rating} readOnly size={isMobile ? "small" : "medium"} /> : null}
          </Box>
          <Typography variant="body1" color="white">
            <GLPrice product={product} />
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
