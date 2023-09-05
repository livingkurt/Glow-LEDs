import { TextField } from "@mui/material";
import React, { forwardRef } from "react";

import { usePlacesWidget } from "react-google-autocomplete";
import { makeStyles } from "@mui/styles";

// Define your styles
const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: "white",
    color: "black", // Optional, if you want to change text color
  },
  label: {
    // color: "white", // Optional, if you want to change label color
  },
}));

const ReactGoogleAutocomplete = ({
  onPlaceSelected,
  apiKey,
  libraries,
  inputAutocompleteValue,
  options,
  googleMapsScriptBaseUrl,
  refProp,
  language,
  ...rest
}) => {
  const classes = useStyles();

  const { ref } = usePlacesWidget({
    ref: refProp,
    googleMapsScriptBaseUrl,
    onPlaceSelected,
    apiKey,
    libraries,
    inputAutocompleteValue,
    options,
    language,
  });

  return (
    <TextField
      inputProps={{ ref }}
      {...rest}
      id="autocomplete_single"
      InputProps={{
        className: classes.input,
      }}
      InputLabelProps={{
        className: classes.label,
      }}
    />
  );
};

export default forwardRef((props, ref) => <ReactGoogleAutocomplete {...props} refProp={ref} />);
