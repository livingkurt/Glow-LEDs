import * as React from "react";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";

const ChooseShipping = ({ shippingRates, onChange, carrier }) => {
  const [value, setValue] = React.useState("");

  const handleChange = event => {
    setValue(event.target.value);
    // onChange(event.target.value, service);
  };

  return (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="h2" sx={{ color: "white" }}>
          <strong>Choose a shipping option:</strong>
        </FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          {shippingRates
            .filter(r => r.carrier === carrier)
            .map(rate => (
              <FormControlLabel
                key={rate.id}
                value={rate.id}
                control={<Radio sx={{ color: "white" }} />}
                label={`${rate.service} - ${rate.carrier} - $${rate.rate}`}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ChooseShipping;
