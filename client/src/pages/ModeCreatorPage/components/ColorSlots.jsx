import { Droppable } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import ColorSlot from "./ColorSlot";
import PropTypes from "prop-types";

const ColorSlots = ({ selectedColors, maxSlots, onRemove, onUpdate, microlight }) => {
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
            <ColorSlot
              key={`slot-${index}`}
              color={color}
              index={index}
              onRemove={onRemove}
              onUpdate={onUpdate}
              microlight={microlight}
            />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

ColorSlots.propTypes = {
  selectedColors: PropTypes.array.isRequired,
  maxSlots: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  microlight: PropTypes.object,
};

export default ColorSlots;
