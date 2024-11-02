import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { random } from "lodash";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const ProductBundleCard = ({ bundle, goHorizontal = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handlePrevImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? bundle.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % bundle.images.length);
  };

  return (
    <Link to={`/bundles/${bundle.pathname}`} style={{ textDecoration: "none" }}>
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
              src={bundle.images[currentImageIndex]?.link}
              alt={bundle.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s ease-in-out",
                opacity: 1,
              }}
            />
          </Box>
          {isHovered && bundle.images?.length > 1 && !isMobile && (
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
              {bundle.title}
            </Typography>
            {bundle.subtitle && (
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {bundle.subtitle}
              </Typography>
            )}
            <Typography variant="body2" color="white" gutterBottom>
              {"By "}
              {bundle.affiliate.artist_name}
            </Typography>
          </Box>
          {bundle.short_description && (
            <Typography variant="body2" color="text.secondary">
              {bundle.short_description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

ProductBundleCard.propTypes = {
  bundle: PropTypes.object.isRequired,
  goHorizontal: PropTypes.bool,
};

ProductBundleCard.defaultProps = {
  goHorizontal: true,
};

export default ProductBundleCard;
