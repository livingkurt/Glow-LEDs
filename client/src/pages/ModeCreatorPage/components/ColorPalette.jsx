import PropTypes from "prop-types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Tooltip } from "@mui/material";

const ColorPalette = ({ colors }) => {
  return (
    <Droppable droppableId="color-palette" direction="horizontal" isDropDisabled>
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
            gap: 2,
            p: 2,
          }}
        >
          {colors.map((color, index) => (
            <Draggable key={color._id} draggableId={color._id} index={index}>
              {(provided, snapshot) => (
                <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Tooltip title={color.name} arrow placement="top">
                    <Box
                      sx={{
                        width: 60,
                        boxShadow: 4,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: color.colorCode,
                        opacity: snapshot.isDragging ? 0.5 : 1,
                        cursor: "grab",
                        margin: "0 auto",
                      }}
                    />
                  </Tooltip>
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

ColorPalette.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ColorPalette;
