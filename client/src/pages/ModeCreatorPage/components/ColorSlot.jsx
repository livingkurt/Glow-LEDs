import { Draggable } from "@hello-pangea/dnd";
import { Box, Typography, Fade, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import { useState } from "react";
import ColorControls from "./ColorControls";

const EmptySlot = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      border: "2px dashed",
      borderColor: "grey.300",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

const ColorSlot = ({ color, index, onRemove, onUpdate, microlight }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [controlsAnchor, setControlsAnchor] = useState(null);

  if (!color) return <EmptySlot index={index} />;

  const handleOptionsClick = event => {
    event.stopPropagation();
    setControlsAnchor(event.currentTarget);
  };

  const handleControlsClose = () => {
    setControlsAnchor(null);
  };

  const handleRemove = event => {
    event.stopPropagation();
    onRemove(index);
  };

  const getLevelLabel = () => {
    const parts = [];
    if (color.brightness !== undefined) {
      parts.push(`B:${color.brightness}`);
    }
    if (color.saturation !== undefined) {
      parts.push(`S:${color.saturation}`);
    }
    return parts.join(" • ");
  };

  return (
    <Draggable draggableId={`slot-${index}-${color._id}`} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            width: 60,
            height: 60,
            position: "relative",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: color.colorCode,
              opacity: snapshot.isDragging ? 0.5 : 1,
              cursor: "grab",
              position: "relative",
              boxShadow: theme => `0 4px 8px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"}`,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme =>
                  `0 6px 12px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)"}`,
              },
            }}
          >
            <Fade in={isHovered}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                {(microlight?.brightness_control || microlight?.saturation_control) && (
                  <Typography
                    onClick={handleOptionsClick}
                    variant="caption"
                    sx={{
                      color: "white",
                      fontWeight: "medium",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {"Options"}
                  </Typography>
                )}
              </Box>
            </Fade>
          </Box>

          <Fade in={isHovered}>
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                bgcolor: "background.paper",
                boxShadow: 1,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Fade>

          {(color.brightness !== undefined || color.saturation !== undefined) && (
            <Box
              sx={{
                position: "absolute",
                bottom: -24,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                bgcolor: "background.paper",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                boxShadow: 1,
                color: "text.secondary",
                fontWeight: "medium",
              }}
            >
              {getLevelLabel()}
            </Box>
          )}

          <ColorControls
            color={color}
            onUpdate={updatedColor => onUpdate(index, updatedColor)}
            microlight={microlight}
            anchorEl={controlsAnchor}
            onClose={handleControlsClose}
          />
        </Box>
      )}
    </Draggable>
  );
};

ColorSlot.propTypes = {
  color: PropTypes.shape({
    _id: PropTypes.string,
    colorCode: PropTypes.string,
    brightness: PropTypes.number,
    saturation: PropTypes.number,
  }),
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  microlight: PropTypes.shape({
    brightness_control: PropTypes.bool,
    saturation_control: PropTypes.bool,
    brightness_levels: PropTypes.number,
    saturation_levels: PropTypes.number,
  }),
};

ColorSlot.defaultProps = {
  color: null,
  microlight: {
    brightness_control: false,
    saturation_control: false,
    brightness_levels: 4,
    saturation_levels: 4,
  },
};

export default ColorSlot;
