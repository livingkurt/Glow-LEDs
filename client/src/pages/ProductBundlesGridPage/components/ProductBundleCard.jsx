import { useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import random from "lodash/random";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import { generateGradientFromIndex } from "../../../utils/helpers/universal_helpers";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const ProductBundleCard = ({ bundle, affiliate, goHorizontal = true, index }) => {
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
              background: !bundle?.images?.length ? generateGradientFromIndex(index) : "none",
            }}
          >
            {bundle?.images?.length ? (
              <GLLazyImage
                src={bundle?.images?.[currentImageIndex]?.link}
                alt={bundle.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity 0.3s ease-in-out",
                  opacity: 1,
                }}
              />
            ) : (
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  textAlign: "center",
                  padding: 2,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {bundle.title}
              </Typography>
            )}
          </Box>
          {/* Only show navigation buttons if there are images */}
          {isHovered && bundle?.images?.length > 1 && !isMobile && (
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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="white">
                {"By "}
                {affiliate.artist_name}
              </Typography>
              <Typography variant="body2" color="white">
                {"$"}
                {bundle.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

ProductBundleCard.propTypes = {
  bundle: PropTypes.object.isRequired,
  goHorizontal: PropTypes.bool,
  affiliate: PropTypes.object,
  index: PropTypes.number,
};

ProductBundleCard.defaultProps = {
  goHorizontal: true,
  affiliate: {},
  index: 0,
};

export default ProductBundleCard;
