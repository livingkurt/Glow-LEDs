import React, { useEffect, useState } from "react";
import { Box, Grid, MenuItem, Select, Typography, Paper } from "@mui/material";
import GLForm from "../../../shared/GlowLEDsComponents/GLForm/GLForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import { toTitleCase } from "../../../utils/helper_functions";

const MODULE_TYPES = [
  { value: "heading", label: "Heading" },
  { value: "subheading", label: "Subheading" },
  { value: "body", label: "Body" },
  { value: "images", label: "Images" },
  { value: "image", label: "Image" },
  { value: "button", label: "Button" },
  { value: "html", label: "HTML" },
  { value: "divider", label: "Divider" },
  { value: "spacer", label: "Spacer" },
  { value: "line_break", label: "Line Break" },
  { value: "title_image", label: "Title Image" },
  { value: "video", label: "Video" },
];

const EmailTemplateEditor = ({ initialModules = [], onChange }) => {
  const [modules, setModules] = useState(initialModules.map(module => ({ ...module, content: { ...module.content } })));
  console.log({ modules });

  useEffect(() => {
    if (JSON.stringify(modules) !== JSON.stringify(initialModules)) {
      onChange(modules);
    }
  }, [modules, onChange, initialModules]);

  const addModule = type => {
    const newModule = { type, content: {} };
    if (type === "images") {
      newModule.content.images = [];
    }
    setModules([...modules, newModule]);
  };
  const updateModule = (index, content) => {
    const newModules = modules.map((module, i) => {
      if (i === index) {
        const updatedContent = { ...module.content, ...content };
        if (module.type === "images" && !Array.isArray(updatedContent.images)) {
          updatedContent.images = Array.isArray(updatedContent.images) ? updatedContent.images : [];
        }
        return { ...module, content: updatedContent };
      }
      return module;
    });
    setModules(newModules);
  };

  const deleteModule = index => {
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
  };

  const duplicateModule = index => {
    const moduleToDuplicate = modules[index];
    const newModule = { ...moduleToDuplicate, content: { ...moduleToDuplicate.content } };
    const newModules = [...modules.slice(0, index + 1), newModule, ...modules.slice(index + 1)];
    setModules(newModules);
  };

  const handleDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setModules(items);
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
                console.log({ newContent });
                updateModule(index, newContent);
              }}
            />
          </Paper>
        )}
      </Draggable>
    );
  };

  const getFormDataForModule = moduleType => {
    switch (moduleType) {
      case "title_image":
        return {
          image: {
            type: "image_upload",
            label: "Title Image",
            labelProp: "image",
            album: "Email Title Images",
          },
        };
      case "heading":
        return {
          text: { type: "text", label: "Heading Text" },
          size: {
            type: "autocomplete_single",
            label: "Heading Size",
            getOptionLabel: option => {
              if (typeof option === "string") {
                return option;
              }
            },
            options: ["h1", "h2", "h3", "h4", "h5", "h6"],
          },
        };
      case "images":
        return {
          images: {
            type: "image_upload",
            label: "Images",
            labelProp: "image",
            album: "Email Images",
            forceArray: true,
          },
          link: { type: "text", label: "Images Link" },
        };
      case "image":
        return {
          image: {
            type: "image_upload",
            label: "Image",
            labelProp: "image",
            album: "Email Images",
          },
          link: { type: "text", label: "Image Link" },
        };
      case "video":
        return {
          video_link: { type: "text", label: "Video Link" },
          link: { type: "text", label: "Link" },
        };

      case "body":
        return {
          text: { type: "text_multiline", label: "Body Text" },
        };
      case "button":
        return {
          text: { type: "text", label: "Button Text" },
          link: { type: "text", label: "Button Link" },
        };
      case "line_break":
        return {
          line_break: {
            type: "image_upload",
            label: "Line Break",
            labelProp: "line_break",
            album: ` Line Break`,
          },
        };
      default:
        return {};
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Email Template Editor
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={2}>
            <Select fullWidth displayEmpty value="" onChange={e => addModule(e.target.value)}>
              <MenuItem value="" disabled>
                Add new module
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailTemplateEditor;
