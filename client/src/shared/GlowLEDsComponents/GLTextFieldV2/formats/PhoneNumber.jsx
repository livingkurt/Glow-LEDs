import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const PhoneNumberFormat = props => {
  const { inputRef, onChange, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
      format="(###) ### - ####"
      allowEmptyFormatting
      mask="•"
    />
  );
};

PhoneNumberFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PhoneNumberFormat;
