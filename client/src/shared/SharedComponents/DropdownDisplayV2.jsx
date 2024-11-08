import TextField from "@mui/material/TextField";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";

import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { Box, Icon, List, Paper, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GLIconButton from "../GlowLEDsComponents/GLIconButton/GLIconButton";

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
    <Box sx={{ p: 1 }}>
      <Paper elevation={5} sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" align="left" fontSize={16}>
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
                      tagValue.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
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
                            deleteIcon={<Icon style={{ color: "white" }}>{"clear"}</Icon>}
                            {...tagProps}
                          />
                        );
                      })
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
                              secondaryAction={
                                <>
                                  {onEdit && (
                                    <GLIconButton tooltip="Edit" edge="end" onClick={() => onEdit(item)}>
                                      <EditIcon sx={{ color: "white" }} />
                                    </GLIconButton>
                                  )}
                                  <GLIconButton
                                    edge="end"
                                    tooltip="Delete"
                                    onClick={() =>
                                      onChange(value.filter(selectedItem => selectedItem._id !== item._id))
                                    }
                                  >
                                    <DeleteIcon sx={{ color: "white" }} />
                                  </GLIconButton>
                                </>
                              }
                            >
                              <ListItemText primary={item[labelProp]} />
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
      </Paper>
    </Box>
  );
};

DropdownDisplayV2.propTypes = {
  options: PropTypes.array,
  value: PropTypes.array,
  getOptionLabel: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  labelProp: PropTypes.string,
  onChange: PropTypes.func,
  showItems: PropTypes.bool,
  onEdit: PropTypes.func,
};

DropdownDisplayV2.defaultProps = {
  options: [],
  value: [],
  getOptionLabel: option => option.name,
  isOptionEqualToValue: (option, value) => option._id === value._id,
  fieldName: "",
  label: "",
  labelProp: "name",
  onChange: () => {},
  showItems: false,
  onEdit: () => {},
};

export default DropdownDisplayV2;
