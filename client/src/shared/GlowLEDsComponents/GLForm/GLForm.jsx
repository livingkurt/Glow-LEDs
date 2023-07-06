import { Checkbox, FormControlLabel, Skeleton, TextField } from "@mui/material";
import { useSelector } from "react-redux";

import GLAutocomplete from "../GLAutocomplete/GLAutocomplete";
import { DropdownDisplayV2 } from "../../SharedComponents";
import ImageWizard from "../../SharedComponents/ImageWizard";
import { determine_shown_fields, formatDate, getValueByStringPath } from "./glFormHelpers";
import GoogleAutocomplete from "../../../pages/PlaceOrderPage/components/GoogleAutocomplete";
import config from "../../../config";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

const GLForm = ({ formData, onChange, state, loading, nesting, index }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

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
    debouncedOnChange({ [fieldName]: value });
  };

  return (
    <>
      {Object.keys(formData).map(fieldName => {
        const fieldData = formData[fieldName];
        let fieldState = localState[fieldName] ?? {};

        if (loading) {
          if (fieldData.type === "checkbox") {
            return <Skeleton key={fieldName} variant="circle" width={200} height={20} style={{ marginTop: 25, marginRight: 16 }} />;
          } else {
            return <Skeleton key={fieldName} variant="rectangular" height={40} style={{ marginTop: 22 }} />;
          }
        } else if (determine_shown_fields(fieldData, current_user)) {
          switch (fieldData.type) {
            case "autocomplete_single":
              return (
                <GLAutocomplete
                  key={fieldName}
                  margin="normal"
                  value={fieldState || ""}
                  options={determineOptions(fieldData, localState) || []}
                  getOptionLabel={option =>
                    option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
                  }
                  optionDisplay={option => (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp])}
                  getOptionSelected={(option, value) => option._id === value._id}
                  name={fieldName}
                  label={fieldData.label}
                  onChange={(event, value) => handleInputChange(fieldName, value)}
                />
              );
            case "image_upload":
              return (
                <>
                  <ImageWizard fieldData={fieldData} fieldState={fieldState} fieldName={fieldName} onChange={onChange} />
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
                    option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
                  }
                  optionDisplay={option => (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp])}
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
                  placeholder={"Enter a Location"}
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  apiKey={config.REACT_APP_GOOGLE_PLACES_KEY}
                  value={fieldState || ""}
                  options={{
                    types: ["address"]
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
            default:
              return <div></div>;
          }
        }
      })}
    </>
  );
};

export default GLForm;
