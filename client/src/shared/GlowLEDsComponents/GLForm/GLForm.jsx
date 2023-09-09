import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import GLAutocomplete from "../GLAutocomplete/GLAutocomplete";
import { DropdownDisplayV2 } from "../../SharedComponents";
import ImageWizard from "../../SharedComponents/ImageWizard";
import { determine_shown_fields, formatDate, getValueByStringPath } from "./glFormHelpers";
import GoogleAutocomplete from "../../../pages/PlaceOrderPage/components/GoogleAutocomplete";
import config from "../../../config";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import GLTabPanel from "../GLTabPanel/GLTabPanel";

const GLForm = ({ formData, onChange, state, loading, formErrors, setFormErrors, classes }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    setFormErrors({ ...formErrors });
  }, []);

  const [localState, setLocalState] = useState({});

  useEffect(() => {
    // console.log({ state });
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
    debouncedOnChange({ [fieldName]: value });
  };

  const getEmptyObjectFromSchema = schema => {
    const emptyObject = {};
    Object.keys(schema).forEach(key => {
      const field = schema[key];
      if (field.type === "text") {
        emptyObject[key] = "";
      }
      // Add more conditions for other field types if needed
    });
    return emptyObject;
  };

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      {Object.keys(formData).map(fieldName => {
        const fieldData = formData[fieldName];
        let fieldState = localState[fieldName] ?? {};
        if (fieldData.type === "image_upload") {
          console.log({ state, fieldState, fieldName });
        }

        if (loading) {
          if (fieldData.type === "checkbox") {
            return (
              <Skeleton
                key={fieldName}
                variant="circle"
                width={200}
                height={20}
                style={{ marginTop: 25, marginRight: 16 }}
              />
            );
          } else {
            return <Skeleton key={fieldName} variant="rectangular" height={40} style={{ marginTop: 22 }} />;
          }
        } else if (determine_shown_fields(fieldData, current_user)) {
          switch (fieldData.type) {
            case "autocomplete_single":
              const selectedOption = fieldData.valueAttribute
                ? fieldData.options.find(opt => opt[fieldData.valueAttribute] === fieldState)
                : fieldState;
              return (
                <GLAutocomplete
                  key={fieldName}
                  autoComplete="new-password"
                  customClasses={classes}
                  isOptionEqualToValue={(option, value) => {
                    return option.short_name === value.short_name;
                  }}
                  helperText={formErrors && formErrors[fieldName]}
                  // isOptionEqualToValue={(option, value) => option.short_name === value.short_name}
                  error={formErrors && !!formErrors[fieldName]}
                  margin="normal"
                  value={selectedOption || ""}
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
                  getOptionSelected={(option, value) =>
                    fieldData.getOptionSelected ? fieldData.getOptionLabel(option) : option._id === value._id
                  }
                  name={fieldName}
                  label={fieldData.label}
                  onChange={(event, value) => {
                    const savedValue = fieldData.getOptionValue ? fieldData.getOptionValue(value) : value;
                    handleInputChange(fieldName, savedValue);
                  }}
                />
              );
            case "image_upload":
              return (
                <>
                  <ImageWizard
                    fieldData={fieldData}
                    fieldState={fieldState}
                    fieldName={fieldName}
                    onChange={value => handleInputChange(fieldName, value)}
                  />
                </>
              );
            case "autocomplete_multiple":
              return (
                <DropdownDisplayV2
                  key={fieldName}
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
                  getOptionSelected={(option, value) => option._id === value._id}
                  fieldName={fieldName}
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
                  key={fieldName}
                  control={
                    <Checkbox
                      name={fieldName}
                      size="large"
                      onChange={e => handleInputChange(fieldName, e.target.checked)}
                      checked={!!fieldState}
                      error={formErrors && !!formErrors[fieldName]}
                    />
                  }
                  label={fieldData.label}
                />
              );
            case "autocomplete_address":
              return (
                <GoogleAutocomplete
                  key={fieldName}
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
                <TextField
                  helperText={formErrors && formErrors[fieldName]}
                  error={formErrors && !!formErrors[fieldName]}
                  autoComplete="new-password"
                  className={classes.outlinedInput}
                  InputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={fieldName}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  variant="outlined"
                  value={fieldState || ""}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "number":
              return (
                <TextField
                  helperText={formErrors && formErrors[fieldName]}
                  autoComplete="new-password"
                  error={formErrors && !!formErrors[fieldName]}
                  className={classes.outlinedInput}
                  InputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={fieldName}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  variant="outlined"
                  value={fieldState || ""}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "date":
              const formattedDate = formatDate(fieldState);
              return (
                <TextField
                  helperText={formErrors && formErrors[fieldName]}
                  autoComplete="new-password"
                  error={formErrors && !!formErrors[fieldName]}
                  className={classes.outlinedInput}
                  InputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={fieldName}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  variant="outlined"
                  value={formattedDate || ""}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "text_multiline":
              return (
                <TextField
                  helperText={formErrors && formErrors[fieldName]}
                  autoComplete="new-password"
                  error={formErrors && !!formErrors[fieldName]}
                  className={classes.outlinedInput}
                  InputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  FormHelperTextProps={{
                    className: formErrors && !!formErrors[fieldName] ? classes.errorHelperText : classes.helperText,
                  }}
                  key={fieldName}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  multiline
                  variant="outlined"
                  value={fieldState || ""}
                  onChange={e => handleInputChange(fieldName, e.target.value)}
                />
              );
            case "object":
              return (
                <Paper className="p-10px mv-10px">
                  <Typography component="h6" variant="h6" className="ta-c">
                    {fieldData.title}
                  </Typography>
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
                <Paper className="p-10px mv-10px">
                  <Typography component="h6" variant="h6" className="ta-c mb-15px">
                    {fieldData.title}
                  </Typography>
                  <AppBar position="sticky" color="transparent">
                    <Tabs
                      variant="scrollable"
                      value={tabIndex}
                      onChange={(event, newValue) => {
                        setTabIndex(newValue);
                      }}
                    >
                      {fieldState.length > 0 && fieldState.map((item, index) => <Tab label={item.label} />)}
                    </Tabs>
                  </AppBar>
                  <Box sx={{ m: 3 }} />
                  {fieldState.length > 0 &&
                    fieldState.map((item, index) => (
                      <GLTabPanel value={tabIndex} index={index}>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            const newArray = [...fieldState];
                            newArray.splice(index, 1);
                            onChange({ [fieldName]: newArray });
                            setTabIndex(prevIndex => {
                              if (prevIndex === newArray.length) {
                                return newArray.length - 1;
                              }
                              return prevIndex > index ? prevIndex - 1 : prevIndex;
                            });
                          }}
                        >
                          <Close />
                        </IconButton>
                        {/* Move Up Button */}
                        <IconButton
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
                        </IconButton>

                        {/* Move Down Button */}
                        <IconButton
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
                        </IconButton>
                        <GLForm
                          formData={fieldData.itemSchema.fields}
                          state={item}
                          onChange={newItem => {
                            const newArray = [...fieldState];
                            newArray[index] = newItem;
                            onChange({ [fieldName]: newArray });
                          }}
                          loading={loading}
                        />
                      </GLTabPanel>
                    ))}

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
                </Paper>
              );

            default:
              return <div></div>;
          }
        }
      })}
    </>
  );
};

GLForm.propTypes = {
  formData: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      options: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      label: PropTypes.string,
      labelProp: PropTypes.string,
      getOptionLabel: PropTypes.func,
      onEdit: PropTypes.func,
      setGeneratedAddress: PropTypes.func,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  nesting: PropTypes.any,
  index: PropTypes.any,
  setFormErrors: PropTypes.func,
  formErrors: PropTypes.object,
  classes: PropTypes.object,
};

GLForm.defaultProps = {
  setFormErrors: () => {},
  formErrors: {},
  classes: {},
};

export default GLForm;
