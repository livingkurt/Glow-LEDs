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
            // p: 2,
          }}
        >
          {colors.map((color, index) => (
            <Box key={color._id} sx={{ position: "relative" }}>
              <Draggable draggableId={color._id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        position: snapshot.isDragging ? "absolute" : "relative",
                        zIndex: snapshot.isDragging ? 1000 : 1,
                      }}
                    >
                      <Tooltip title={color.name} arrow placement="top">
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            backgroundColor: color.colorCode,
                            boxShadow: 4,
                            cursor: "grab",
                            margin: "0 auto",
                          }}
                        />
                      </Tooltip>
                    </Box>
                    {/* Static copy that stays in place */}
                    {snapshot.isDragging && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          backgroundColor: color.colorCode,
                          boxShadow: 4,
                          margin: "0 auto",
                          opacity: 1,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </>
                )}
              </Draggable>
            </Box>
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
