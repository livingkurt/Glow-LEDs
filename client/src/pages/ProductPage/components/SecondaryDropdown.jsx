import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { determine_secondary_product_name } from "../productHelpers";

const SecondaryDropdown = ({ label, color_code, onChange, value, options, defaultValue, product }) => {
  console.log({ label, color_code, onChange, value, options, defaultValue, product });
  return (
    <div className="ai-c h-25px mb-25px">
      <InputLabel className="mv-0px mr-10px title_font">{label}</InputLabel>
      <div className="ai-c">
        {color_code && <canvas className="mh-1rem w-60px h-20px br-7px" style={{ backgroundColor: color_code }} />}
        <FormControl>
          <Select
            onChange={onChange}
            value={value}
            defaultValue={{ name: "Choose" }}
            className="w-100per"
            style={{ backgroundColor: "white" }}
          >
            <MenuItem key={0} value={{ name: "Choose" }}>
              Choose Design:
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {determine_secondary_product_name(option.name, product)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SecondaryDropdown;
