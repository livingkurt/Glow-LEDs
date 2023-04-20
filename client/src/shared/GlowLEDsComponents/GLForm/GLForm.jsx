import { Checkbox, FormControlLabel, Skeleton, TextField } from "@mui/material";
import { useSelector } from "react-redux";

import GLAutocomplete from "../GLAutocomplete/GLAutocomplete";
import { DropdownDisplayV2 } from "../../SharedComponents";
import ImageWizard from "../../SharedComponents/ImageWizard";
import { determine_shown_fields, formatDate } from "./glFormHelpers";

const GLForm = ({ formData, onChange, state, loading, nesting, index }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

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
        } else if (determine_shown_fields(fieldData, current_user)) {
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
