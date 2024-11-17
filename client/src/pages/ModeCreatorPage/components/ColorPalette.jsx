import PropTypes from "prop-types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Tooltip, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";

const ColorPalette = ({ colors, onColorClick }) => {
  const renderColor = (color, index) => {
    const colorBox = (
      <Box sx={{ textAlign: "center" }}>
        {isMobile && (
          <>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 0.5,
                fontSize: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {color.name}
            </Typography>
          </>
        )}
        <Tooltip title={!isMobile ? color.name : undefined}>
          <Box
            onClick={isMobile ? () => onColorClick(color) : undefined}
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: color.colorCode,
              boxShadow: 4,
              cursor: isMobile ? "pointer" : "grab",
              margin: "0 auto",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Tooltip>
      </Box>
    );

    if (isMobile) {
      return (
        <Box
          key={color._id}
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {colorBox}
        </Box>
      );
    }

    return (
      <Draggable key={color._id} draggableId={color._id} index={index}>
        {provided => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {colorBox}
          </Box>
        )}
      </Draggable>
    );
  };

  if (isMobile) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
          gap: 2,
          px: 1,
        }}
      >
        {colors.map((color, index) => renderColor(color, index))}
      </Box>
    );
  }

  return (
    <Droppable droppableId="color-palette" direction="horizontal" isDropDisabled={true}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: 2,
            px: 1,
          }}
        >
          {colors.map((color, index) => renderColor(color, index))}
          {!snapshot.draggingFromThisWith && provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

ColorPalette.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object).isRequired,
  onColorClick: PropTypes.func,
};

ColorPalette.defaultProps = {
  onColorClick: () => {},
};

export default ColorPalette;
