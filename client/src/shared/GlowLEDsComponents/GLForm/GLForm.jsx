import { Autocomplete, Checkbox, FormControlLabel, Skeleton, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { toCapitalize } from "../../../utils/helper_functions";
import GLAutocomplete from "../GLAutocomplete/GLAutocomplete";
import ImageUploader from "../../SharedComponents/ImageUploader";
import { DropdownDisplayV2, ImageDisplay } from "../../SharedComponents";
import ImageWizard from "../../SharedComponents/ImageWizard";

const GLForm = ({ formData, onChange, state, loading, nesting, index }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const determine_shown_fields = fieldData => {
    let result = true;
    if (fieldData.type !== "array_of_objects") {
      result = false;
    }
    if (fieldData.type !== "objects") {
      result = false;
    }
    if (fieldData.permissions) {
      if (!current_user?.isAdmin && fieldData?.permissions?.includes("admin")) {
        result = false;
      }
      if (current_user?.isAdmin && fieldData?.permissions?.includes("admin")) {
        result = true;
      }
    } else {
      result = true;
    }
    return result;
  };

  return (
    <>
      {Object.keys(formData).map(fieldName => {
        const fieldData = formData[fieldName];
        let fieldState = state[fieldName];

        if (loading) {
          if (fieldData.type === "checkbox") {
            return <Skeleton key={fieldName} variant="circle" width={200} height={20} style={{ marginTop: 25, marginRight: 16 }} />;
          } else {
            return <Skeleton key={fieldName} variant="rectangular" height={40} style={{ marginTop: 22 }} />;
          }
        } else if (determine_shown_fields(fieldData)) {
          switch (fieldData.type) {
            case "autocomplete_single":
              return (
                <GLAutocomplete
                  key={fieldName}
                  margin="normal"
                  value={fieldState || ""}
                  options={fieldData.options || []}
                  getOptionLabel={option =>
                    option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
                  }
                  optionDisplay={option => (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp])}
                  getOptionSelected={(option, value) => option._id === value._id}
                  name={fieldName}
                  label={fieldData.label}
                  onChange={(event, value) => onChange({ [fieldName]: value })}
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
                  onChange={value => onChange({ [fieldName]: value })}
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
                      onChange={e => onChange({ [fieldName]: e.target.checked })}
                      checked={!!fieldState}
                    />
                  }
                  label={fieldData.label}
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
                  onChange={e => onChange({ [fieldName]: e.target.value })}
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
                  onChange={e => onChange({ [fieldName]: e.target.value })}
                />
              );
            case "date":
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
                  onChange={e => onChange({ [fieldName]: e.target.value })}
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
                  onChange={e => onChange({ [fieldName]: e.target.value })}
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
