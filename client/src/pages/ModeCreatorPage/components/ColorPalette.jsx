import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Box } from "@mui/material";

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
            <Draggable key={color._id} draggableId={`palette-${color._id}`} index={index} isDragDisabled={false}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: color.colorCode,
                    opacity: snapshot.isDragging ? 0.5 : 1,
                    cursor: "grab",
                    margin: "0 auto",
                  }}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default ColorPalette;
