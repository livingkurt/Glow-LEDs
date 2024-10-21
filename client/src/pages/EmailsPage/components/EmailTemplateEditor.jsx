import React, { useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import GLForm from "../../../shared/GlowLEDsComponents/GLForm/GLForm";

const MODULE_TYPES = [
  { value: "Heading", label: "Heading" },
  { value: "Subheading", label: "Subheading" },
  { value: "Body", label: "Body" },
  { value: "Images", label: "Images" },
  { value: "Image", label: "Image" },
  { value: "Button", label: "Button" },
  { value: "HTML", label: "HTML" },
  { value: "Divider", label: "Divider" },
  { value: "Spacer", label: "Spacer" },
  { value: "Line Break", label: "Line Break" },
  { value: "Title Image", label: "Title Image" },
];

const EmailTemplateEditor = ({ initialModules = [], onChange }) => {
  const [modules, setModules] = useState(initialModules);

  useEffect(() => {
    if (JSON.stringify(modules) !== JSON.stringify(initialModules)) {
      onChange(modules);
    }
  }, [modules, onChange, initialModules]);
  const addModule = type => {
    setModules([...modules, { type, content: {} }]);
  };

  const updateModule = (index, content) => {
    const newModules = [...modules];
    newModules[index].content = content;
    setModules(newModules);
  };

  const deleteModule = index => {
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
  };

  const moveModule = (index, direction) => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === modules.length - 1)) {
      return;
    }

    const newModules = [...modules];
    const swap = direction === "up" ? index - 1 : index + 1;
    [newModules[index], newModules[swap]] = [newModules[swap], newModules[index]];
    setModules(newModules);
  };

  const renderModule = (module, index) => {
    const formData = getFormDataForModule(module.type);
    return (
      <Box key={index} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={1}>
        <GLForm formData={formData} state={module.content} onChange={newContent => updateModule(index, newContent)} />
        <Box mt={2}>
          <Button onClick={() => moveModule(index, "up")} disabled={index === 0}>
            Move Up
          </Button>
          <Button onClick={() => moveModule(index, "down")} disabled={index === modules.length - 1}>
            Move Down
          </Button>
          <Button onClick={() => deleteModule(index)} color="error">
            Delete
          </Button>
        </Box>
      </Box>
    );
  };

  const getFormDataForModule = moduleType => {
    switch (moduleType) {
      case "Title Image":
        return {
          image: {
            type: "image_upload",
            label: "Title Image",
            labelProp: "image",
            album: "Email Title Images",
          },
        };
      case "Heading":
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
            options: ["h1", "h2", "h3"],
          },
        };
      case "Images":
        return {
          image: {
            type: "image_upload",
            label: "Image",
            labelProp: "image",
            album: "Email Images",
            forceArray: true,
          },
        };
      case "Image":
        return {
          image: {
            type: "image_upload",
            label: "Image",
            labelProp: "image",
            album: "Email Images",
          },
        };

      case "Subheading":
        return {
          text: { type: "text", label: "Subheading Text" },
        };
      case "Body":
        return {
          text: { type: "text", label: "Body Text" },
        };
      case "Button":
        return {
          text: { type: "text", label: "Button Text" },
          link: { type: "text", label: "Button Link" },
        };
      case "Line Break":
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
          {modules.map((module, index) => renderModule(module, index))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailTemplateEditor;
