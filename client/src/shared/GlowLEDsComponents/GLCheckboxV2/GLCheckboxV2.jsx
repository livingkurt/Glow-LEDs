import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const GLCheckboxV2 = ({ onChecked, value, label, ...otherProps }) => {
  return (
    <FormControlLabel
      style={{ color: "white" }}
      control={
        <Checkbox
          checked={value}
          onChange={onChecked}
          color="info"
          size="large"
          sx={{
            color: "white",
          }}
          {...otherProps}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={label}
    />
  );
};

export default GLCheckboxV2;
