import PropTypes from "prop-types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Tooltip } from "@mui/material";
import React from "react";

const ColorPalette = ({ colors }) => {
  return (
    <Droppable
      droppableId="color-palette"
      direction="horizontal"
      isDropDisabled={true}
      renderClone={(provided, snapshot, rubric) => {
        const color = colors[rubric.source.index];
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              position: "relative",
              zIndex: 1000,
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
        );
      }}
    >
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
            gap: 2,
          }}
        >
          {colors.map((color, index) => {
            const isDraggingFromThisWith = snapshot.draggingFromThisWith === color._id;
            return (
              <React.Fragment key={color._id}>
                {isDraggingFromThisWith ? (
                  // Render a static copy when the item is being dragged from this list
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: color.colorCode,
                      boxShadow: 4,
                      margin: "0 auto",
                    }}
                  />
                ) : (
                  <Draggable draggableId={color._id} index={index}>
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
                    )}
                  </Draggable>
                )}
              </React.Fragment>
            );
          })}
          {/* Conditionally render placeholder */}
          {!snapshot.draggingFromThisWith && provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

ColorPalette.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ColorPalette;
