import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import GLIconButton from "../GlowLEDsComponents/GLIconButton/GLIconButton";
import Box from "@mui/material/Box";
import Delete from "@mui/icons-material/Delete";
import FileCopy from "@mui/icons-material/FileCopy";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ImageDisplay = ({ images, onChange }) => {
  const remove_image = image_index => {
    const updatedImages = images.filter((image, index) => {
      return image_index !== index;
    });

    onChange(updatedImages); // Make sure to pass an object
  };

  const move = (startIndex, endIndex) => {
    const newImages = Array.from(images);
    const [removed] = newImages.splice(startIndex, 1);
    newImages.splice(endIndex, 0, removed);

    onChange(newImages); // Make sure to pass an object
  };

  const copyToClipboard = link => {
    navigator.clipboard.writeText(link);
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
              {images &&
                Array.isArray(images) &&
                images.map((picture, index) => (
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
                          marginBottom: "1rem",
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
                              borderRadius: "15px",
                            }}
                            className="mv-10px ml-10px"
                            src={picture.link}
                          />

                          <Typography style={{ color: "white" }}>{picture.link}</Typography>
                          <Stack direction="row" justifyContent="flex-end">
                            <GLIconButton onClick={() => copyToClipboard(picture.link)} tooltip="Copy">
                              <FileCopy style={{ color: "white", fontSize: "20px" }} />
                            </GLIconButton>
                            <GLIconButton onClick={() => remove_image(index)} tooltip="Delete">
                              <Delete style={{ color: "white", fontSize: "20px" }} />
                            </GLIconButton>
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

ImageDisplay.propTypes = {
  images: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ImageDisplay;
