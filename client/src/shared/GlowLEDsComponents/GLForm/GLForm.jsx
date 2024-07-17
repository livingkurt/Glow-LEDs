import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { DropdownDisplayV2 } from "../../SharedComponents";
import ImageWizard from "../../SharedComponents/ImageWizard";
import {
  determine_shown_fields,
  formatDate,
  formatDateTime,
  formatDateTimeLocal,
  getEmptyObjectFromSchema,
  getValueByStringPath,
} from "./glFormHelpers";
import GoogleAutocomplete from "../../../pages/PlaceOrderPage/components/GoogleAutocomplete";
import config from "../../../config";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import GLColorPicker from "./components/GLColorPicker";
import GLArray from "./components/GLArray";
import GLAutocomplete from "../GLAutocomplete/GLAutocomplete";
import GLTextFieldV2 from "../GLTextFieldV2/GLTextFieldV2";

const GLForm = ({ formData, onChange, state, loading, formErrors, setFormErrors, classes, mode }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    setFormErrors({ ...formErrors });
  }, []);

  const [localState, setLocalState] = useState({});

  useEffect(() => {
    setLocalState(state);
  }, [state]);

  const determineOptions = (fieldData, fieldState) => {
    if (typeof fieldData.options === "string") {
      return getValueByStringPath(fieldState, fieldData.options);
    } else {
      return fieldData.options || [];
    }
  };

  const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

  const handleInputChange = (fieldName, value) => {
    setLocalState(prevState => ({ ...prevState, [fieldName]: value }));
    debouncedOnChange({ [fieldName]: value }, fieldName);
  };

  const [tabIndex, setTabIndex] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const [highlightedOption, setHighlightedOption] = useState(null);

  const handleEnterKeyPress = (event, fieldData, fieldName) => {
    if (event.key === "Enter") {
      const selectedOption =
        highlightedOption ||
        fieldData.options.find(opt =>
          fieldData.getOptionLabel
            ? fieldData.getOptionLabel(opt) === inputValue
            : opt[fieldData.labelProp] === inputValue
        );
      if (selectedOption) {
        const savedValue = fieldData.getOptionValue ? fieldData.getOptionValue(selectedOption) : selectedOption;
        handleInputChange(fieldName, savedValue);
      } else {
        handleInputChange(fieldName, inputValue);
      }
    }
  };

  return (
    <>
      {Object.keys(formData).map(fieldName => {
        const fieldData = formData[fieldName];
        let fieldState = localState[fieldName] ?? {};
        if (loading) {
          if (fieldData.type === "checkbox") {
            return (
              <Skeleton
                key={`${fieldName}-${fieldData.type}`}
                variant="circle"
                width={200}
                height={20}
                style={{ marginTop: 25, marginRight: 16 }}
              />
            );
          } else if (fieldData.type === "array" || fieldData.type === "object") {
            return (
              <Skeleton
                key={`${fieldName}-${fieldData.type}`}
                variant="rectangular"
                height={500}
                style={{ marginTop: 22 }}
              />
            );
          } else {
            return (
              <Skeleton
                key={`${fieldName}-${fieldData.type}`}
                variant="rectangular"
                height={40}
                style={{ marginTop: 22 }}
              />
            );
          }
        } else if (determine_shown_fields(fieldData, current_user, mode)) {
          switch (fieldData.type) {
            case "autocomplete_single":
              const selected = fieldData.valueAttribute
                ? fieldData.options.find(opt => opt[fieldData.valueAttribute] === fieldState)
                : fieldState;

              return (
                <Box display={"flex"} flexDirection={"column"} gap={1} justifyContent={"space-between"}>
                  <GLAutocomplete
                    key={`${fieldName}-${fieldData.type}`}
                    autoComplete="new-password"
                    freeSolo
                    customClasses={classes}
                    helperText={formErrors && formErrors[fieldName]}
                    error={formErrors && !!formErrors[fieldName]}
                    margin="normal"
                    loading={!fieldData.loading}
                    value={selected || ""}
                    disabled={fieldData.disabled}
                    options={(!fieldData.loading && determineOptions(fieldData, localState)) || []}
                    getOptionLabel={option =>
                      option
                        ? fieldData.getOptionLabel
                          ? fieldData.getOptionLabel(option)
                          : option[fieldData.labelProp]
                        : ""
                    }
                    optionDisplay={option =>
                      fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]
                    }
                    isOptionEqualToValue={fieldData.isOptionEqualToValue}
                    name={fieldName}
                    label={fieldData.label}
                    onChange={(event, value) => {
                      const savedValue = fieldData.getOptionValue ? fieldData.getOptionValue(value) : value;
                      handleInputChange(fieldName, savedValue);
                    }}
                    inputValue={inputValue}
                    onHighlightChange={(event, option, reason) => {
                      if (reason === "keyboard" || reason === "auto") {
                        setHighlightedOption(option);
                      }
                    }}
                    onInputChange={(event, newInputValue, reason) => {
                      if (reason === "input") {
                        setInputValue(newInputValue);
                        setHighlightedOption(null); // Clear highlighted option when user types
                      }
                    }}
                    onKeyDown={event => {
                      handleEnterKeyPress(event, fieldData, fieldName);
                    }}
                  />
                  {fieldData.showEditButton && (
                    <>
                      {selected?.name && (
                        <Button
                          variant={"contained"}
                          fullWidth
                          onClick={() => {
                            fieldData.onEditButtonClick(selected);
                          }}
                        >
                          Edit {selected?.name}
                        </Button>
                      )}
                      <Button
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                        onClick={() => {
                          fieldData.onCreateNewButtonClick({
                            _id: null,
                            name: `${selected.name} Copy`,
                            pathname: `${selected.pathname}_copy`,
                            ...selected,
                          });
                        }}
                      >
                        New Based On {selected?.name}
                      </Button>
                    </>
                  )}
                </Box>
              );
            case "image_upload":
              return (
                <ImageWizard
                  fieldData={fieldData}
                  fieldState={fieldState}
                  fieldName={fieldName}
                  onChange={value => {
                    if (Array.isArray(fieldState)) {
                      handleInputChange(fieldName, value);
                    } else if (typeof fieldState === "object") {
                      handleInputChange(fieldName, value);
                    }
                  }}
                />
              );
            case "autocomplete_multiple":
              return (
                <DropdownDisplayV2
                  key={`${fieldName}-${fieldData.type}`}
                  margin="normal"
                  value={fieldState || ""}
                  options={fieldData.options || []}
                  getOptionLabel={option =>
                    option
                      ? fieldData.getOptionLabel
                        ? fieldData.getOptionLabel(option)
                        : option[fieldData.labelProp]
                      : ""
                  }
                  optionDisplay={option =>
                    fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]
                  }
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  fieldName={fieldName}
                  disabled={fieldData.disabled}
                  labelProp={fieldData.labelProp}
                  label={fieldData.label}
                  onChange={value => handleInputChange(fieldName, value)}
                  onEdit={fieldData.onEdit}
                  showItems
                />
              );
            case "checkbox":
              return (
                <FormControlLabel
                  key={`${fieldName}-${fieldData.type}`}
                  control={
                    <Checkbox
                      name={fieldName}
                      size="large"
                      onChange={e => handleInputChange(fieldName, e.target.checked)}
                      checked={!!fieldState}
                      // error={formErrors && !!formErrors[fieldName]}
                    />
                  }
                  label={fieldData.label}
                />
              );
            case "title":
              return (
                <Typography key={`${fieldName}-${fieldData.type}`} variant={fieldData.variant} align={fieldData.align}>
                  {fieldData.label}
                </Typography>
              );
            case "autocomplete_address":
              return (
                <GoogleAutocomplete
                  key={`${fieldName}-${fieldData.type}`}
                  name={fieldName}
                  helperText={formErrors && formErrors[fieldName]}
                  error={formErrors && !!formErrors[fieldName]}
                  label={fieldData.label}
                  margin="normal"
                  size="small"
                  variant="outlined"
                  className={classes.outlinedInput}
                  fullWidth
                  // autoComplete="new-password"
                  InputProps={{
                    // autocomplete: "new-password",
                    // form: {
                    //   autocomplete: "off",
                    // },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  apiKey={config.REACT_APP_GOOGLE_PLACES_KEY}
                  value={fieldState || ""}
                  options={{
                    types: ["address"],
                  }}
                  onPlaceSelected={place => {
                    fieldData.setGeneratedAddress(place);
                  }}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "text":
              return (
                <GLTextFieldV2
                  helperText={formErrors && formErrors[fieldName]}
                  error={formErrors && !!formErrors[fieldName]}
                  autoComplete="new-password"
                  className={classes.outlinedInput}
                  disabled={fieldData.disabled}
                  InputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={`${fieldName}-${fieldData.type}`}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  upperCase={fieldData.upperCase}
                  lowerCase={fieldData.lowerCase}
                  noSpace={fieldData.noSpace}
                  restrictCharacters={fieldData?.restrictCharacters}
                  variant="outlined"
                  value={typeof fieldState === "object" && Object.keys(fieldState).length === 0 ? "" : fieldState}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "number":
              return (
                <GLTextFieldV2
                  helperText={formErrors && formErrors[fieldName]}
                  autoComplete="new-password"
                  error={formErrors && !!formErrors[fieldName]}
                  className={classes.outlinedInput}
                  disabled={fieldData.disabled}
                  InputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={`${fieldName}-${fieldData.type}`}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  variant="outlined"
                  value={typeof fieldState === "object" && Object.keys(fieldState).length === 0 ? "" : fieldState}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "date":
              const formattedDate = formatDate(fieldState);

              return (
                <GLTextFieldV2
                  helperText={formErrors && formErrors[fieldName]}
                  autoComplete="new-password"
                  error={formErrors && !!formErrors[fieldName]}
                  className={classes.outlinedInput}
                  disabled={fieldData.disabled}
                  InputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={`${fieldName}-${fieldData.type}`}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  variant="outlined"
                  value={
                    (formattedDate !== null && formattedDate !== undefined) || Object.keys(formattedDate).length > 0
                      ? formattedDate
                      : ""
                  }
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "datetime":
              return (
                <GLTextFieldV2
                  helperText={formErrors && formErrors[fieldName]}
                  autoComplete="new-password"
                  error={formErrors && !!formErrors[fieldName]}
                  className={classes.outlinedInput}
                  disabled={fieldData.disabled}
                  InputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    shrink: true, // Always keep the label shrunk
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={`${fieldName}-${fieldData.type}`}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={"datetime-local"}
                  label={fieldData.label}
                  variant="outlined"
                  value={formatDateTimeLocal(fieldState)}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "text_multiline":
              return (
                <GLTextFieldV2
                  helperText={formErrors && formErrors[fieldName]}
                  autoComplete="new-password"
                  error={formErrors && !!formErrors[fieldName]}
                  className={classes.outlinedInput}
                  disabled={fieldData.disabled}
                  InputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={`${fieldName}-${fieldData.type}`}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  upperCase={fieldData.upperCase}
                  lowerCase={fieldData.lowerCase}
                  noSpace={fieldData.noSpace}
                  multiline
                  variant="outlined"
                  value={typeof fieldState === "object" && Object.keys(fieldState).length === 0 ? "" : fieldState}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "object":
              const selectedOption = fieldData.valueAttribute
                ? fieldData.options.find(opt => opt[fieldData.valueAttribute] === fieldState)
                : fieldState;
              return (
                <Paper className="p-10px mv-10px" key={`${fieldName}-${fieldData.type}`} elevation={5}>
                  <Typography component="h6" variant="h6" className="ta-c">
                    {fieldData.title}
                  </Typography>
                  {fieldData.selectable && (
                    <GLAutocomplete
                      key={`${fieldName}-${fieldData.type}`}
                      autoComplete="new-password"
                      customClasses={classes}
                      disabled={fieldData.disabled}
                      // isOptionEqualToValue={(option, value) => {
                      //   return option.short_name === value.short_name;
                      // }}
                      helperText={formErrors && formErrors[fieldName]}
                      error={formErrors && !!formErrors[fieldName]}
                      margin="normal"
                      value={selectedOption || ""}
                      // value={fieldState || ""}
                      options={determineOptions(fieldData, localState) || []}
                      getOptionLabel={option =>
                        option
                          ? fieldData.getOptionLabel
                            ? fieldData.getOptionLabel(option)
                            : option[fieldData.labelProp]
                          : ""
                      }
                      optionDisplay={option =>
                        fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]
                      }
                      isOptionEqualToValue={fieldData.isOptionEqualToValue}
                      name={fieldName}
                      label={fieldData.label}
                      onChange={(event, value) => {
                        const savedValue = fieldData.getOptionValue ? fieldData.getOptionValue(value) : value;
                        handleInputChange(fieldName, savedValue);
                      }}
                    />
                  )}
                  <GLForm
                    formData={fieldData.fields}
                    state={fieldState}
                    onChange={newObjectState => {
                      onChange({
                        [fieldName]: { ...fieldState, ...newObjectState },
                      });
                    }}
                    loading={loading}
                  />
                </Paper>
              );
            case "array":
              return (
                <GLArray
                  key={`${fieldName}-${fieldData.type}`}
                  fieldName={fieldName}
                  fieldState={fieldState}
                  fieldData={fieldData}
                  tabIndex={tabIndex}
                  setTabIndex={setTabIndex}
                  onChange={onChange}
                  loading={loading}
                  getEmptyObjectFromSchema={getEmptyObjectFromSchema}
                />
              );
            case "color_picker":
              return (
                <GLColorPicker
                  key={`${fieldName}-${fieldData.type}`}
                  fieldName={fieldName}
                  fieldState={fieldState}
                  fieldData={fieldData}
                  handleInputChange={handleInputChange}
                  localState={localState}
                  setLocalState={setLocalState}
                />
              );
            default:
              return <div></div>;
          }
        }
      })}
    </>
  );
};

GLForm.defaultProps = {
  setFormErrors: () => {},
  formErrors: {},
  classes: {},
  loading: false,
};

export default GLForm;
