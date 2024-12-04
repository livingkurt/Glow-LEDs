import { Box, Grid, Typography } from "@mui/material";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ColorPalette from "./ColorPalette";
import { isMobile } from "react-device-detect";
import ColorSlot from "./ColorSlot";
import { useDispatch } from "react-redux";
import { set_mode } from "../../../slices/modeSlice";

const AvailableColors = ({ selectedMicrolight, mode, handleDragEnd, handleColorClick }) => {
  const dispatch = useDispatch();
  return (
    <Box>
      {mode?.microlight && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {"Available Colors"}
              </Typography>
              <ColorPalette colors={selectedMicrolight.colors} onColorClick={handleColorClick} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                {"Selected Colors ("}
                {selectedMicrolight.colors_per_mode} {"max)"}
              </Typography>

              {isMobile && (
                <Typography variant="subtitle2" gutterBottom>
                  {"Click on a color slot for controls"}
                </Typography>
              )}
              {!isMobile && (
                <Typography variant="subtitle2" gutterBottom>
                  {"Hover over a color slot for controls"}
                </Typography>
              )}

              <Droppable droppableId="color-slots" direction="horizontal">
                {provided => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
                      gap: 2,
                      px: 1, // Changed from px: 2 to px: 1 to match ColorPalette
                      minHeight: 80,
                    }}
                  >
                    {Array(selectedMicrolight.colors_per_mode)
                      .fill(null)
                      .map((_, i) => mode?.colors[i] || null)
                      .map((color, index) => (
                        <ColorSlot
                          key={`slot-${index}`}
                          color={color}
                          index={index}
                          onRemove={index => {
                            const newColors = [...mode.colors];
                            newColors.splice(index, 1);
                            dispatch(set_mode({ colors: newColors }));
                          }}
                          onUpdate={(index, updatedColor) => {
                            const newColors = [...mode.colors];
                            newColors[index] = updatedColor;
                            dispatch(set_mode({ colors: newColors }));
                          }}
                          onDuplicate={index => {
                            const newColors = [...mode.colors];
                            if (newColors.length < selectedMicrolight.colors_per_mode) {
                              newColors.splice(index + 1, 0, { ...newColors[index] });
                              dispatch(set_mode({ colors: newColors }));
                            }
                          }}
                          microlight={selectedMicrolight}
                        />
                      ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          </Grid>
        </DragDropContext>
      )}
    </Box>
  );
};

export default AvailableColors;
