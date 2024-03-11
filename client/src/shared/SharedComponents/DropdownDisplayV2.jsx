import TextField from "@mui/material/TextField";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Icon, List, Paper, Typography } from "@mui/material";
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
  isOptionEqualToValue,
  fieldName,
  label,
  labelProp,
  onChange,
  showItems,
  onEdit,
}) => {
  const handleDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(value);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onChange(items);
  };

  return (
    <Paper sx={{ width: "100%" }} elevation={5} className="p-20px mv-10px">
      <Typography variant={"h6"} align={"left"} fontSize={16}>
        {label}
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Autocomplete
                multiple
                value={Array.isArray(value) ? value : []}
                options={Array.isArray(options) ? options : []}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                onChange={(e, value) => onChange(value)}
                name={fieldName}
                renderInput={params => (
                  <TextField {...params} fullWidth variant="outlined" label={label} margin="normal" />
                )}
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
                          backgroundColor: "primary.dark",
                        },
                      }}
                      deleteIcon={<Icon style={{ color: "white" }}>clear</Icon>}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
              {showItems && value && Array.isArray(value) && (
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
                              backgroundColor: "primary.dark",
                            },
                            borderRadius: 5,
                            my: 1,
                          }}
                        >
                          <ListItemText primary={item[labelProp]} />
                          <ListItemSecondaryAction>
                            {onEdit && (
                              <IconButton edge="end" onClick={() => onEdit(item)}>
                                <EditIcon sx={{ color: "white" }} />
                              </IconButton>
                            )}
                            <IconButton
                              edge="end"
                              onClick={() => onChange(value.filter(selectedItem => selectedItem._id !== item._id))}
                            >
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
    </Paper>
  );
};

export default DropdownDisplayV2;
