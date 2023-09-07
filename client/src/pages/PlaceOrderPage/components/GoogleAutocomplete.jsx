import { TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

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

  return <TextField inputProps={{ ref }} {...rest} id="autocomplete_single" />;
};

export default forwardRef((props, ref) => <ReactGoogleAutocomplete {...props} refProp={ref} />);
