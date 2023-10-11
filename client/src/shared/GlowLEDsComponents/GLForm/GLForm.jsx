import { Checkbox, FormControlLabel, Paper, Skeleton, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import GLAutocomplete from "../GLAutocomplete/GLAutocomplete";
import { DropdownDisplayV2 } from "../../SharedComponents";
import ImageWizard from "../../SharedComponents/ImageWizard";
import { determine_shown_fields, formatDate, getEmptyObjectFromSchema, getValueByStringPath } from "./glFormHelpers";
import GoogleAutocomplete from "../../../pages/PlaceOrderPage/components/GoogleAutocomplete";
import config from "../../../config";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import GLColorPicker from "./components/GLColorPicker";
import GLArray from "./components/GLArray";

const GLForm = ({ formData, onChange, state, loading, formErrors, setFormErrors, classes }) => {
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

  return (
    <>
      {Object.keys(formData).map(fieldName => {
        const fieldData = formData[fieldName];
        let fieldState = localState[fieldName] ?? {};
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
          } else if (fieldData.type === "array" || fieldData.type === "object") {
            return <Skeleton key={fieldName} variant="rectangular" height={500} style={{ marginTop: 22 }} />;
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
                      // error={formErrors && !!formErrors[fieldName]}
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
                <GLArray
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

GLForm.propTypes = {
  formData: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      options: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      labelProp: PropTypes.string,
      getOptionLabel: PropTypes.func,
      onEdit: PropTypes.func,
      setGeneratedAddress: PropTypes.func,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  loading: PropTypes.bool,
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
  loading: false,
};

export default GLForm;
