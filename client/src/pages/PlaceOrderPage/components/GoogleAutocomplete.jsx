import { TextField } from "@mui/material";
import React, { forwardRef } from "react";

import { usePlacesWidget } from "react-google-autocomplete";

function ReactGoogleAutocomplete(props) {
  const { onPlaceSelected, apiKey, libraries, inputAutocompleteValue, options, googleMapsScriptBaseUrl, refProp, language, ...rest } =
    props;

  const { ref } = usePlacesWidget({
    ref: refProp,
    googleMapsScriptBaseUrl,
    onPlaceSelected,
    apiKey,
    libraries,
    inputAutocompleteValue,
    options,
    language
  });

  return <TextField inputProps={{ ref }} {...rest} id="autocomplete_single" />;
}

export default forwardRef((props, ref) => <ReactGoogleAutocomplete {...props} refProp={ref} />);
