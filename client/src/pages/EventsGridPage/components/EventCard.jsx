import React, { useState } from "react";
import { Card, CardContent, Typography, Rating, Box, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { random } from "lodash";
import { sale_price_switch } from "../../../utils/react_helper_functions";
import { useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const EventCard = ({ event }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { current_user } = useSelector(state => state.users.userPage);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handlePrevImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? event.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % event.images.length);
  };

  return (
    <Link to={`/collections/all/events/${event.pathname}`} style={{ textDecoration: "none" }}>
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
            paddingTop: isMobile ? "50%" : "100%",
            overflow: "hidden",
            flexShrink: 0,
            width: isMobile ? "50%" : "100%",
            borderRadius: "1rem",
            transition: "border-radius 0.3s ease-in-out",
            "&:hover": {
              borderRadius: isMobile ? 0 : "1rem 1rem 0 0",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${event.images[currentImageIndex].link})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 0.3s ease-in-out",
              opacity: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                event.images.length > 1
                  ? `url(${event.images[(currentImageIndex + 1) % event.images.length].link})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 0.3s ease-in-out",
              opacity: isHovered ? 1 : 0,
            }}
          />
          {isHovered && event.images.length > 1 && !isMobile && (
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
            <Typography variant={isMobile ? "body1" : "h6"} color="white" gutterBottom>
              {event.name}
            </Typography>
            {event.rating ? <Rating value={event.rating} readOnly size={isMobile ? "small" : "medium"} /> : null}
          </Box>
          <Typography variant={isMobile ? "body2" : "body1"} color="white">
            {sale_price_switch({
              event,
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

export default EventCard;
