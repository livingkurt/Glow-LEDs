import { useEffect, useState } from "react";

import GLForm from "../../../shared/GlowLEDsComponents/GLForm/GLForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import { toTitleCase } from "../../../utils/helper_functions";
import { homePageFields } from "./contentFormFields";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const MODULE_TYPES = [
  { value: "slideshow", label: "Slideshow" },
  { value: "featured_products", label: "Featured Products" },
  { value: "featured_product_bundles", label: "Featured Bundles" },
  { value: "featured_modes", label: "Featured Modes" },
  { value: "learn_more_products", label: "Learn More Products" },
  { value: "learn_highlights", label: "Learn Highlights" },
  { value: "discover_more", label: "Discover More" },
  { value: "get_more_out_of", label: "Get More Out Of" },
  { value: "hero_video", label: "Hero Video" },
  { value: "sponsors", label: "Sponsors" },
  { value: "product_protection_details", label: "Product Protection" },
  { value: "support_banner", label: "Support Banner" },
];

const HomePageEditor = ({ initialModules = [], onChange, formFieldsData }) => {
  const [modules, setModules] = useState(initialModules);

  // Update modules when initialModules changes
  useEffect(() => {
    setModules(initialModules);
  }, [initialModules]);

  // Only trigger onChange when modules are actually changed by user actions
  const handleModulesChange = newModules => {
    setModules(newModules);
    onChange(newModules);
  };

  const addModule = type => {
    const newModule = { type, content: {}, hidden: false };
    handleModulesChange([...modules, newModule]);
  };

  const updateModule = (index, content) => {
    const newModules = modules.map((module, i) => {
      if (i === index) {
        return { ...module, content: { ...module.content, ...content } };
      }
      return module;
    });
    handleModulesChange(newModules);
  };

  const deleteModule = index => {
    const newModules = modules.filter((_, i) => i !== index);
    handleModulesChange(newModules);
  };

  const duplicateModule = index => {
    const moduleToDuplicate = modules[index];
    const newModule = { ...moduleToDuplicate, content: { ...moduleToDuplicate.content } };
    const newModules = [...modules.slice(0, index + 1), newModule, ...modules.slice(index + 1)];
    handleModulesChange(newModules);
  };

  const handleDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleModulesChange(items);
  };
  const getFormDataForModule = moduleType => {
    const homePageFormFields = homePageFields(formFieldsData).fields;

    // For objects, we need to get their fields directly
    if (homePageFormFields[moduleType]?.type === "object") {
      return homePageFormFields[moduleType].fields;
    }

    // For direct field types (text, checkbox, etc)
    return { [moduleType]: homePageFormFields[moduleType] } || {};
  };

  const renderModule = (module, index) => {
    const formData = getFormDataForModule(module.type);

    return (
      <Draggable key={index} draggableId={`module-${index}`} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            elevation={3}
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: snapshot.isDragging ? "secondary.main" : "background.paper",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">{toTitleCase(module.type)}</Typography>
              <Box>
                <GLIconButton tooltip="Duplicate" onClick={() => duplicateModule(index)}>
                  <ContentCopyIcon />
                </GLIconButton>
                <GLIconButton tooltip="Delete" onClick={() => deleteModule(index)}>
                  <DeleteIcon />
                </GLIconButton>
              </Box>
            </Box>
            <GLForm
              formData={formData}
              state={module.content}
              onChange={newContent => {
                updateModule(index, newContent);
              }}
            />
          </Paper>
        )}
      </Draggable>
    );
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {"Home Page Editor"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={2}>
            <Select fullWidth displayEmpty value="" onChange={e => addModule(e.target.value)}>
              <MenuItem value="" disabled>
                {"Add new module"}
              </MenuItem>
              {MODULE_TYPES.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="modules">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {modules.map((module, index) => renderModule(module, index))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Box mb={2}>
            <Select fullWidth displayEmpty value="" onChange={e => addModule(e.target.value)}>
              <MenuItem value="" disabled>
                {"Add new module"}
              </MenuItem>
              {MODULE_TYPES.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

HomePageEditor.propTypes = {
  initialModules: PropTypes.array,
  onChange: PropTypes.func,
  formFieldsData: PropTypes.object,
};

HomePageEditor.defaultProps = {
  initialModules: [],
  onChange: () => {},
  formFieldsData: {},
};

export default HomePageEditor;
