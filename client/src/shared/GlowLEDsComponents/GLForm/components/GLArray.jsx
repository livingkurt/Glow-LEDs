import React from "react";
import { AppBar, Tabs, Tab, Paper, Typography, Box, Button, IconButton } from "@mui/material";
import { Close, ArrowBack, ArrowForward, FileCopy } from "@mui/icons-material";
import GLForm from "../GLForm"; // Import GLForm, adjust the path accordingly
import GLTabPanel from "../../GLTabPanel/GLTabPanel"; // Import GLTabPanel, adjust the path accordingly
import GLIconButton from "../../GLIconButton/GLIconButton";

const GLArray = ({
  fieldName,
  fieldState,
  fieldData,
  tabIndex,
  setTabIndex,
  onChange,
  loading,
  getEmptyObjectFromSchema,
  nestingLevel,
  nestingColors,
}) => {
  return (
    <Paper
      className="p-10px mv-10px"
      elevation={5}
      style={{
        backgroundColor: nestingColors[nestingLevel % nestingColors.length],
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <Typography component="h6" variant="h6" className="ta-c mb-15px">
        {fieldData.title}
      </Typography>
      <Paper style={{ backgroundColor: "#4e5061" }}>
        <AppBar position="sticky" color="transparent">
          <Tabs
            variant="scrollable"
            value={tabIndex}
            style={{ color: "lightgray" }}
            TabIndicatorProps={{ style: { backgroundColor: "white" } }}
            onChange={(event, newValue) => {
              setTabIndex(newValue);
            }}
          >
            {fieldState.length > 0 &&
              fieldState.map((item, index) => (
                <Tab
                  value={index}
                  label={typeof fieldData.label === "function" ? fieldData.label(item) : item[fieldData.label]}
                  style={{ color: tabIndex === index ? "white" : "lightgray" }}
                />
              ))}
          </Tabs>
        </AppBar>
      </Paper>
      <Box sx={{ m: 3 }} />
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          const emptyItem = getEmptyObjectFromSchema(fieldData.itemSchema.fields);
          const newArray = [...fieldState, { ...emptyItem }];
          onChange({ [fieldName]: [...fieldState, { ...emptyItem }] });
          setTabIndex(newArray.length - 1);
        }}
      >
        Add Item
      </Button>
      <Box sx={{ m: 3 }} />
      {fieldState.length > 0 &&
        fieldState.map((item, index) => (
          <GLTabPanel value={tabIndex} index={index} key={index}>
            <GLIconButton
              tooltip="Delete"
              color="secondary"
              onClick={() => {
                const newArray = [...fieldState];
                newArray.splice(index, 1);
                onChange({ [fieldName]: newArray }, "delete", index);
                setTabIndex(prevIndex => {
                  if (prevIndex === newArray.length) {
                    return newArray.length - 1;
                  }
                  return prevIndex > index ? prevIndex - 1 : prevIndex;
                });
              }}
            >
              <Close />
            </GLIconButton>
            <GLIconButton
              tooltip="Move Left"
              color="primary"
              onClick={() => {
                if (index > 0) {
                  const newArray = [...fieldState];
                  [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
                  onChange({ [fieldName]: newArray });
                  setTabIndex(index - 1);
                }
              }}
            >
              <ArrowBack />
            </GLIconButton>
            <GLIconButton
              tooltip="Move Right"
              color="primary"
              onClick={() => {
                if (index < fieldState.length - 1) {
                  const newArray = [...fieldState];
                  [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
                  onChange({ [fieldName]: newArray });
                  setTabIndex(index + 1);
                }
              }}
            >
              <ArrowForward />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              color="primary"
              onClick={() => {
                const newArray = [...fieldState];
                // Clone the item you want to duplicate
                const clone = { ...newArray[index] };

                // Modify the name by appending 'Copy' at the end
                clone[fieldData.label] = `${clone[fieldData.label]} Copy`;

                // Insert the clone back into the array
                newArray.splice(index + 1, 0, clone);

                onChange({ [fieldName]: newArray }, "duplicate", index);
                setTabIndex(index + 1); // Optional: Move the tab index to the new copy
              }}
            >
              <FileCopy /> {/* Assuming you import FileCopy from Material-UI */}
            </GLIconButton>
            <GLForm
              formData={fieldData.itemSchema.fields}
              state={item}
              onChange={newItem => {
                const newArray = [...fieldState];
                newArray[index] = {
                  ...newArray[index],
                  ...newItem,
                };

                Object.keys(newItem).forEach(nestedFieldName => {
                  const fullFieldName = `${fieldName}.${nestedFieldName}.${index}`;
                  onChange({ [fieldName]: newArray }, fullFieldName, index);
                });
              }}
              loading={loading}
              nestingLevel={nestingLevel + 1}
            />
          </GLTabPanel>
        ))}
    </Paper>
  );
};

export default GLArray;
