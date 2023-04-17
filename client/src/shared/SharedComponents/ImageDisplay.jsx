import { Box, Stack, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageDisplay = ({ images, set_images }) => {
  const remove_image = image_index => {
    set_images(
      images.filter((image, index) => {
        return image_index !== index;
      })
    );
  };

  const move = (startIndex, endIndex) => {
    const newImages = Array.from(images);
    const [removed] = newImages.splice(startIndex, 1);
    newImages.splice(endIndex, 0, removed);
    set_images(newImages);
  };

  return (
    <div>
      <DragDropContext
        onDragEnd={result => {
          if (!result.destination) {
            return;
          }

          move(result.source.index, result.destination.index);
        }}
      >
        <Droppable droppableId="imageList">
          {(provided, snapshot) => (
            <Box display="flex" flexWrap="wrap" {...provided.droppableProps} ref={provided.innerRef}>
              {images.map((picture, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      sx={{
                        backgroundColor: "primary.main",
                        width: "100%",
                        borderRadius: "15px",
                        marginBottom: "1rem"
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <img
                          alt="product"
                          style={{
                            width: "100%",
                            package_height: "auto",
                            maxWidth: "100px",
                            maxHeight: "100px",
                            borderRadius: "15px"
                          }}
                          className="mv-10px ml-10px"
                          src={picture.link}
                        />
                        <Typography style={{ color: "white" }}>{picture.link}</Typography>
                        <Stack direction="column" justifyContent="flex-end">
                          <IconButton onClick={() => remove_image(index)} aria-label="Delete">
                            <Delete style={{ color: "white", fontSize: "20px" }} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageDisplay;
