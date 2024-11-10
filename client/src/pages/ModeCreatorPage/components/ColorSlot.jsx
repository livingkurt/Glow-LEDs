import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const EmptySlot = ({ index }) => (
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

const ColorSlot = ({ color, index, onRemove }) => {
  if (!color) return <EmptySlot index={index} />;

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
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: color.colorCode,
              opacity: snapshot.isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
          />
          <IconButton
            size="small"
            onClick={() => onRemove(index)}
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              bgcolor: "background.paper",
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Draggable>
  );
};

const ColorSlots = ({ selectedColors, maxSlots, onRemove }) => {
  const slots = Array(maxSlots)
    .fill(null)
    .map((_, i) => selectedColors[i] || null);

  return (
    <Droppable droppableId="color-slots" direction="horizontal">
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            minHeight: 80,
          }}
        >
          {slots.map((color, index) => (
            <ColorSlot key={`slot-${index}`} color={color} index={index} onRemove={onRemove} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default ColorSlots;
