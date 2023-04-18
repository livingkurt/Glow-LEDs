import TextField from "@mui/material/TextField";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Icon, List } from "@mui/material";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DropdownDisplayV2 = ({
  options,
  value,
  getOptionLabel,
  getOptionSelected,
  fieldName,
  label,
  labelProp,
  onChange,
  showItems,
  onEdit
}) => {
  const handleDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(value);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onChange(items);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Autocomplete
                multiple
                value={value}
                options={options}
                getOptionLabel={getOptionLabel}
                getOptionSelected={getOptionSelected}
                onChange={(e, value) => onChange(value)}
                name={fieldName}
                renderInput={params => <TextField {...params} fullWidth variant="outlined" label={label} margin="normal" />}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      key={option._id}
                      label={option[labelProp]}
                      onDelete={() => {
                        const newValue = [...value];
                        newValue.splice(index, 1);
                        onChange(newValue);
                      }}
                      sx={{
                        fontSize: "12px",
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark"
                        }
                      }}
                      deleteIcon={<Icon style={{ color: "white" }}>clear</Icon>}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
              {showItems && (
                <List>
                  {value.map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={item._id}
                          sx={{
                            backgroundColor: snapshot.isDragging ? "secondary.main" : "primary.main",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "primary.dark"
                            },
                            borderRadius: 5,
                            my: 1
                          }}
                        >
                          <ListItemText primary={item[labelProp]} />
                          <ListItemSecondaryAction>
                            {onEdit && (
                              <IconButton edge="end" onClick={() => onEdit(item)}>
                                <EditIcon sx={{ color: "white" }} />
                              </IconButton>
                            )}
                            <IconButton edge="end" onClick={() => onChange(value.filter(selectedItem => selectedItem._id !== item._id))}>
                              <DeleteIcon sx={{ color: "white" }} />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default DropdownDisplayV2;

// {
//   /* <Chip
// ref={provided.innerRef}
// {...provided.draggableProps}
// {...provided.dragHandleProps}
// key={item._id}
// label={item.name}
// onDelete={() => onChange(value.filter(selectedItem => selectedItem._id !== item._id))}
// sx={{
//   width: "100%",
//   fontSize: "14px",
// backgroundColor: snapshot.isDragging ? "secondary.main" : "primary.main",
// color: "white",
// display: "flex", // Make the Chip component a flex container
// justifyContent: "space-between", // Set the label to the left and the delete icon to the right
// "&:hover": {
//   backgroundColor: "primary.dark"
// },
//   ...provided.draggableProps.style
// }}
// deleteIcon={<Icon style={{ color: "white" }}>clear</Icon>}
// icon={<Edit onClick={() => onEdit(item)} style={{ color: "white" }} />}
// /> */
// }
// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import Box from "@mui/material/Box";
// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";

// const DropdownDisplayV2 = ({ options, value, getOptionLabel, getOptionSelected }) => {
//   console.log({ value, options });
//   const [selectedItems, setSelectedItems] = useState(value);

//   const handleSelect = (event, value) => {
//     setSelectedItems([...selectedItems, value]);
//   };

//   const handleDelete = item => {
//     setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Autocomplete
//         multiple
//         // value={value}
//         // options={options}
//         options={["Option 1", "Option 2", "Option 3"]}
//         // getOptionLabel={getOptionLabel}
//         // getOptionSelected={getOptionSelected}
//         onChange={handleSelect}
//         renderInput={params => (
//           <TextField {...params} fullWidth variant="outlined" label="Select Items" margin="normal" placeholder="Type to search" />
//         )}
//       />
//       <Stack sx={{ mt: 1 }} spacing={1} direction="column">
//         {selectedItems.map(item => (
//           <Chip key={item} label={item} onDelete={() => handleDelete(item)} sx={{ width: "100%" }} />
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default DropdownDisplayV2;
