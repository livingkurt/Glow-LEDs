import { Draggable } from "@hello-pangea/dnd";
import { Box, Typography, Fade, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import { useState } from "react";
import ColorControls from "./ColorControls";
import { ContentCopy } from "@mui/icons-material";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import { isMobile } from "react-device-detect";

const EmptySlot = () => (
  <Box sx={{ textAlign: "center", display: !isMobile ? "flex" : "", justifyContent: "center", alignItems: "center" }}>
    {isMobile && (
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 0.5,
          fontSize: "1rem",
          visibility: "hidden",
          height: "1.5rem", // Maintains space while being invisible
        }}
      >
        {"placeholder"}
      </Typography>
    )}
    <Box display="flex" justifyContent="center" alignItems="center">
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
    </Box>
  </Box>
);

const ColorSlot = ({ color, index, onRemove, onUpdate, microlight, onDuplicate, snapshot }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [controlsAnchor, setControlsAnchor] = useState(null);
  const [activeControl, setActiveControl] = useState(null);

  if (!color) return <EmptySlot index={index} />;

  const handleOptionsClick = event => {
    event.stopPropagation();
    setControlsAnchor(event.target.closest("[data-color-slot]"));
  };

  const handleControlsClose = () => {
    setControlsAnchor(null);
    setIsHovered(false);
  };

  const handleRemove = event => {
    event?.stopPropagation();
    onRemove(index);
    setActiveControl(null);
    setControlsAnchor(null); // Add this line to close the dialog
  };

  const handleDuplicate = event => {
    event?.stopPropagation();
    onDuplicate(index);
    setActiveControl(null);
    setControlsAnchor(null); // Add this line to close the dialog
  };

  const getLevelLabel = () => {
    const parts = [`Base Color: ${color.name}`];

    if (color.saturation !== undefined) {
      const sLevel =
        color.saturation === 0 ? 0 : Math.ceil((color.saturation / 100) * (microlight.saturation_levels || 4));
      parts.push(`Saturation Level: ${sLevel}`);
    }
    if (color.brightness !== undefined) {
      const bLevel =
        color.brightness === 0 ? 0 : Math.ceil((color.brightness / 100) * (microlight.brightness_levels || 4));
      parts.push(`Brightness Level: ${bLevel}`);
    }

    return parts.join("\n");
  };

  const colorBox = (
    <Box sx={{ textAlign: "center" }}>
      {isMobile && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 0.5,
            fontSize: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "wrap",
            maxWidth: "100%",
          }}
        >
          {color.name}
        </Typography>
      )}
      <Box
        onClick={isMobile ? handleOptionsClick : undefined}
        sx={{
          width: 60,
          height: 60,
          position: "relative",
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {!isMobile ? (
          <Tooltip
            title={
              <Typography>
                {getLevelLabel()
                  .split("\n")
                  .map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
              </Typography>
            }
            arrow
            placement="bottom"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: color.colorCode,
                opacity: snapshot?.isDragging ? 0.5 : 1,
                cursor: isMobile ? "pointer" : "grab",
                position: "relative",
                boxShadow: theme =>
                  `0 4px 8px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"}`,
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
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontSize: "1rem",
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
          </Tooltip>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: color.colorCode,
              cursor: "pointer",
              position: "relative",
              boxShadow: theme => `0 4px 8px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"}`,
            }}
          />
        )}

        {!isMobile && (
          <Fade in={isHovered}>
            <Box
              sx={{
                position: "absolute",
                top: -8,
                right: -3,
                display: "flex",
                gap: 0.5,
              }}
            >
              <GLIconButton
                size="small"
                tooltip="Duplicate"
                onClick={handleDuplicate}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <ContentCopy fontSize="small" />
              </GLIconButton>
              <GLIconButton
                size="small"
                tooltip="Remove"
                onClick={handleRemove}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <ClearIcon fontSize="small" />
              </GLIconButton>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Box
          data-color-slot
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex", // Add these properties
            justifyContent: "center", // to center align
            alignItems: "center", // the content
          }}
        >
          {colorBox}
        </Box>
      ) : (
        <Draggable draggableId={`slot-${index}-${color._id}`} index={index}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              data-color-slot
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              {colorBox}
            </Box>
          )}
        </Draggable>
      )}
      <ColorControls
        color={color}
        onUpdate={updatedColor => onUpdate(index, updatedColor)}
        microlight={microlight}
        anchorEl={controlsAnchor}
        index={index}
        onClose={handleControlsClose}
        onRemove={isMobile ? handleRemove : undefined}
        onDuplicate={isMobile ? handleDuplicate : undefined}
        activeControl={activeControl}
        setActiveControl={setActiveControl}
      />
    </>
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
  onDuplicate: PropTypes.func.isRequired,
};

ColorSlot.defaultProps = {
  color: null,
  microlight: {
    brightness_control: false,
    saturation_control: false,
    brightness_levels: 4,
    saturation_levels: 4,
  },
  onDuplicate: () => {},
};

export default ColorSlot;
